#!/usr/bin/env node
/**
 * Bulk-upload audio files from sounds-upload/ to R2 (under sounds/<category>/)
 * and register their metadata in the D1 sound library.
 *
 * Usage:
 *   node --env-file=.env.local scripts/upload-sounds.mjs [--remote] [--dry-run]
 *
 * Folder layout: sounds-upload/<category-id>/file.mp3
 * Files placed directly in sounds-upload/ (no subfolder) are filed under "otros".
 * <category-id> must match an id in db/schema.sql's sound_categories table.
 *
 * Safe to re-run: files are de-duplicated by content hash, and existing R2
 * keys are never overwritten.
 *
 * Every file is transcoded to a standard 128kbps MP3 before upload (via
 * ffmpeg, which must be installed and on PATH) regardless of source format
 * or bitrate, so storage/bandwidth stay predictable across the whole
 * library. Set SKIP_TRANSCODE=1 to upload source bytes as-is instead.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { parseFile } from "music-metadata";
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const ROOT = process.cwd();
const UPLOAD_DIR = path.join(ROOT, "sounds-upload");
const D1_DB_NAME = "clipnexo-sounds";
const VALID_EXTENSIONS = new Set([".mp3", ".wav", ".ogg", ".m4a", ".wma", ".flac", ".aac"]);
const MIME_BY_EXT = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
  ".wma": "audio/x-ms-wma",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
};
const KNOWN_CATEGORIES = new Set(["memes", "efectos", "musica", "notificaciones", "transiciones", "otros"]);
const TARGET_BITRATE = "128k";
const SKIP_TRANSCODE = process.env.SKIP_TRANSCODE === "1";

const args = process.argv.slice(2);
const isRemote = args.includes("--remote");
const isDryRun = args.includes("--dry-run");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}. Run with: node --env-file=.env.local scripts/upload-sounds.mjs`);
    process.exit(1);
  }
  return value;
}

function slugify(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "sonido";
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

/**
 * Transcode any input audio file to a standard-bitrate MP3 for storage, and
 * read back its real duration. Requires ffmpeg/ffprobe on PATH.
 * @returns {{ buffer: Buffer, durationMs: number }}
 */
function transcodeToMp3(sourcePath) {
  const tmpDir = mkdtempSync(path.join(tmpdir(), "clipnexo-sounds-transcode-"));
  const outPath = path.join(tmpDir, "out.mp3");
  try {
    execFileSync(
      "ffmpeg",
      ["-y", "-i", sourcePath, "-vn", "-ar", "44100", "-ac", "2", "-b:a", TARGET_BITRATE, outPath],
      { stdio: ["ignore", "ignore", "pipe"] }
    );

    let durationMs = 0;
    try {
      const durationOut = execFileSync(
        "ffprobe",
        ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", outPath],
        { encoding: "utf-8" }
      ).trim();
      durationMs = Math.round(parseFloat(durationOut) * 1000) || 0;
    } catch {
      // duration stays 0 if ffprobe fails; non-fatal
    }

    return { buffer: readFileSync(outPath), durationMs };
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function runD1(sqlFilePath) {
  const target = isRemote ? "--remote" : "--local";
  return execFileSync(
    "npx",
    ["wrangler", "d1", "execute", D1_DB_NAME, target, `--file=${sqlFilePath}`, "--json"],
    { encoding: "utf-8", maxBuffer: 1024 * 1024 * 50 }
  );
}

function parseWranglerJson(out) {
  // `wrangler d1 execute --remote --json` prints progress text (upload
  // status, warnings) before the JSON array; --local doesn't. Strip
  // anything before the first '[' so both modes parse the same way.
  const jsonStart = out.indexOf("[");
  if (jsonStart === -1) throw new Error(`No JSON found in wrangler output: ${out.slice(0, 200)}`);
  return JSON.parse(out.slice(jsonStart));
}

function queryD1(sql) {
  const tmpDir = mkdtempSync(path.join(tmpdir(), "clipnexo-sounds-"));
  const file = path.join(tmpDir, "query.sql");
  writeFileSync(file, sql);
  try {
    const out = runD1(file);
    const parsed = parseWranglerJson(out);
    return parsed[0]?.results ?? [];
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function sqlEscape(value) {
  return String(value).replace(/'/g, "''");
}

function collectFiles() {
  const entries = [];
  if (!statSync(UPLOAD_DIR, { throwIfNoEntry: false })) {
    console.error(`Folder not found: ${UPLOAD_DIR}`);
    process.exit(1);
  }

  for (const item of readdirSync(UPLOAD_DIR, { withFileTypes: true })) {
    if (item.isDirectory()) {
      const category = item.name;
      if (!KNOWN_CATEGORIES.has(category)) {
        console.warn(`WARN: "${category}/" is not a known category id (${[...KNOWN_CATEGORIES].join(", ")}). Files inside will be skipped.`);
        continue;
      }
      const dir = path.join(UPLOAD_DIR, item.name);
      for (const file of readdirSync(dir, { withFileTypes: true })) {
        if (file.isFile() && VALID_EXTENSIONS.has(path.extname(file.name).toLowerCase())) {
          entries.push({ category, filePath: path.join(dir, file.name), filename: file.name });
        }
      }
    } else if (item.isFile() && VALID_EXTENSIONS.has(path.extname(item.name).toLowerCase())) {
      entries.push({ category: "otros", filePath: path.join(UPLOAD_DIR, item.name), filename: item.name });
    }
  }
  return entries;
}

async function main() {
  requireEnv("R2_ACCOUNT_ID");
  requireEnv("R2_ACCESS_KEY_ID");
  requireEnv("R2_SECRET_ACCESS_KEY");
  const bucket = requireEnv("R2_BUCKET_NAME");

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  const files = collectFiles();
  console.log(`Found ${files.length} audio file(s) in sounds-upload/ (${isRemote ? "remote" : "local"} D1, ${isDryRun ? "dry-run" : "live"}).`);
  if (files.length === 0) return;

  console.log("Loading existing catalog from D1 for de-duplication...");
  const existingHashes = new Set(queryD1("SELECT content_hash FROM sounds;").map((r) => r.content_hash));
  const existingIds = new Set(queryD1("SELECT id FROM sounds;").map((r) => r.id));

  const inserts = [];
  let uploaded = 0;
  let skippedDuplicate = 0;
  let errors = 0;

  for (const { category, filePath, filename } of files) {
    try {
      const buffer = readFileSync(filePath);
      const hash = sha256(buffer);

      if (existingHashes.has(hash)) {
        console.log(`SKIP (duplicate content): ${filename}`);
        skippedDuplicate += 1;
        continue;
      }

      const sourceExt = path.extname(filename).toLowerCase();
      let slug = slugify(filename);
      let id = slug;
      let suffix = 2;
      while (existingIds.has(id)) {
        id = `${slug}-${suffix}`;
        suffix += 1;
      }
      existingIds.add(id);

      const title = slug
        .split("-")
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ");

      // Transcode to a standard MP3 for storage (size optimization), unless
      // explicitly disabled. Duration is always measured from real audio
      // (ffprobe on the transcoded file, or music-metadata on the source).
      let uploadBuffer = buffer;
      let ext = sourceExt;
      let durationMs = 0;

      if (SKIP_TRANSCODE || isDryRun) {
        // Dry-run skips the (slow) real transcode and only estimates
        // duration, so a preview over hundreds of files stays fast.
        try {
          const metadata = await parseFile(filePath);
          durationMs = Math.round((metadata.format.duration ?? 0) * 1000);
        } catch (err) {
          console.warn(`WARN: could not read duration for ${filename}: ${err.message}`);
        }
        if (!SKIP_TRANSCODE) ext = ".mp3"; // preview the post-transcode key even though we didn't transcode
      } else {
        const transcoded = transcodeToMp3(filePath);
        uploadBuffer = transcoded.buffer;
        durationMs = transcoded.durationMs;
        ext = ".mp3";
      }

      const r2Key = `sounds/${category}/${id}${ext}`;
      const mimeType = SKIP_TRANSCODE ? (MIME_BY_EXT[ext] ?? "application/octet-stream") : "audio/mpeg";
      const sizeNote = uploadBuffer.length !== buffer.length
        ? ` (${(buffer.length / 1024).toFixed(0)}KB -> ${(uploadBuffer.length / 1024).toFixed(0)}KB)`
        : "";

      if (isDryRun) {
        console.log(`DRY-RUN would upload: ${filename} -> ${r2Key} (${durationMs}ms)${sizeNote}`);
      } else {
        let alreadyInR2 = false;
        try {
          await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: r2Key }));
          alreadyInR2 = true;
        } catch {
          alreadyInR2 = false;
        }

        if (!alreadyInR2) {
          await s3.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: r2Key,
              Body: uploadBuffer,
              ContentType: mimeType,
            })
          );
        }

        inserts.push(
          `INSERT INTO sounds (id, title, category_id, r2_key, source_filename, content_hash, duration_ms, file_size, mime_type, tags) VALUES ('${sqlEscape(id)}', '${sqlEscape(title)}', '${sqlEscape(category)}', '${sqlEscape(r2Key)}', '${sqlEscape(filename)}', '${sqlEscape(hash)}', ${durationMs}, ${uploadBuffer.length}, '${sqlEscape(mimeType)}', '[]');`
        );
        inserts.push(`INSERT INTO sound_stats (sound_id, play_count, download_count) VALUES ('${sqlEscape(id)}', 0, 0);`);
      }

      existingHashes.add(hash);
      uploaded += 1;
      console.log(`OK: ${filename} -> ${r2Key}${sizeNote}`);
    } catch (err) {
      errors += 1;
      console.error(`ERROR processing ${filename}: ${err.message}`);
    }
  }

  if (!isDryRun && inserts.length > 0) {
    const tmpDir = mkdtempSync(path.join(tmpdir(), "clipnexo-sounds-insert-"));
    const file = path.join(tmpDir, "insert.sql");
    writeFileSync(file, inserts.join("\n"));
    try {
      runD1(file);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped (duplicate): ${skippedDuplicate}`);
  console.log(`Errors: ${errors}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
