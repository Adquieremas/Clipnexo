import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SRC = "/Users/dilmer/Desktop/stickers";
const OUT_DIR = "/tmp/clipnexo-stickers-opt";
const MANIFEST_PATH = path.join(OUT_DIR, "manifest.json");
let BUCKET;

function loadEnv() {
  const envPath = path.resolve(".env.local");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    const k = m[1];
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnv();

const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME"];
for (const k of required) { if (!process.env[k]) { console.error("Missing", k); process.exit(1); } }
BUCKET = process.env.R2_BUCKET_NAME;

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
});

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(path.join(OUT_DIR, "videos"), { recursive: true });
mkdirSync(path.join(OUT_DIR, "posters"), { recursive: true });

function slugify(name) {
  return name
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80) || "sticker";
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: opts.stdio ?? "pipe", encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed: ${r.stderr || r.stdout || r.status}`);
  }
  return r;
}

function isObjectNotFound(error) {
  return error?.$metadata?.httpStatusCode === 404 || error?.name === "NotFound" || error?.name === "NoSuchKey";
}

async function uploadIfMissingOrWrongContentType(key, filePath, contentType) {
  let existing;
  try {
    existing = await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (error) {
    if (!isObjectNotFound(error)) throw error;
  }

  if (existing?.ContentType === contentType) return false;

  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: readFileSync(filePath),
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));
  return true;
}

function ffprobeJson(file) {
  const r = run("ffprobe", ["-v", "error", "-show_entries", "format=duration,size", "-show_entries", "stream=codec_type,width,height", "-of", "json", file]);
  return JSON.parse(r.stdout);
}

const files = readdirSync(SRC)
  .filter((f) => /\.(mp4|mkv|mov)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, "es"));

const used = new Set();
const manifest = [];
let uploaded = 0, skipped = 0, errors = 0, optimized = 0;

for (let i = 0; i < files.length; i++) {
  const filename = files[i];
  const srcPath = path.join(SRC, filename);
  const base = filename.replace(/\.(mp4|mkv|mov)$/i, "").trim();
  let slug = slugify(base);
  if (used.has(slug)) {
    const hash = createHash("md5").update(filename).digest("hex").slice(0, 6);
    slug = `${slug}-${hash}`;
  }
  used.add(slug);

  const videoKey = `memes/clips/${slug}.mp4`;
  const posterKey = `memes/clips/${slug}.jpg`;
  const outVideo = path.join(OUT_DIR, "videos", `${slug}.mp4`);
  const outPoster = path.join(OUT_DIR, "posters", `${slug}.jpg`);

  try {
    if (!existsSync(outVideo)) {
      run("ffmpeg", [
        "-y", "-i", srcPath,
        "-vf", "scale='min(iw,720)':-2:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=30",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "28",
        "-c:a", "aac", "-b:a", "96k", "-ac", "2",
        "-movflags", "+faststart",
        "-pix_fmt", "yuv420p",
        outVideo,
      ], { stdio: "pipe" });
      optimized++;
    }
    if (!existsSync(outPoster)) {
      run("ffmpeg", [
        "-y", "-ss", "0.2", "-i", outVideo,
        "-frames:v", "1",
        "-vf", "scale='min(iw,480)':-2:force_original_aspect_ratio=decrease:force_divisible_by=2",
        "-q:v", "4",
        outPoster,
      ], { stdio: "pipe" });
    }

    const probe = ffprobeJson(outVideo);
    const duration = Math.round(parseFloat(probe.format?.duration || "0") * 1000);
    const size = parseInt(probe.format?.size || "0", 10);
    const vStream = (probe.streams || []).find((s) => s.codec_type === "video") || {};
    const width = vStream.width || 0;
    const height = vStream.height || 0;

    const videoUploaded = await uploadIfMissingOrWrongContentType(videoKey, outVideo, "video/mp4");
    const posterUploaded = await uploadIfMissingOrWrongContentType(posterKey, outPoster, "image/jpeg");

    if (videoUploaded || posterUploaded) uploaded++; else skipped++;

    manifest.push({ id: slug, title: base, r2Key: videoKey, posterKey, durationMs: duration, fileSize: size, width, height, sourceFilename: filename });
    console.log(`OK ${filename} -> ${slug}`);
  } catch (e) {
    errors++;
    console.error(`ERR ${filename}: ${e.message}`);
  }
}

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`SUMMARY uploaded=${uploaded} skipped=${skipped} errors=${errors} total=${files.length} optimized=${optimized}`);
console.log(`MANIFEST ${MANIFEST_PATH} items=${manifest.length}`);
