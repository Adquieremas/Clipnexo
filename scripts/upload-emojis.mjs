import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const SRC = "/Users/dilmer/Desktop/2 Emojis En PNG";
const BUCKET = process.env.R2_BUCKET_NAME;
const required = ["R2_ACCOUNT_ID","R2_ACCESS_KEY_ID","R2_SECRET_ACCESS_KEY","R2_BUCKET_NAME"];
for (const k of required) { if (!process.env[k]) { console.error("Missing", k); process.exit(1); } }

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
});

const files = readdirSync(SRC).filter(f => f.toLowerCase().endsWith(".png")).sort((a,b)=>{
  const na = parseInt(a.match(/\((\d+)\)/)?.[1]||"0",10);
  const nb = parseInt(b.match(/\((\d+)\)/)?.[1]||"0",10);
  return na-nb;
});

function isObjectNotFound(error) {
  return error?.$metadata?.httpStatusCode === 404 || error?.name === "NotFound" || error?.name === "NoSuchKey";
}

let uploaded=0, skipped=0, errors=0;
for (const filename of files) {
  const n = filename.match(/\((\d+)\)/)?.[1] || "0";
  const key = `emojis/alexius/emojis-by-alexius-${n}.png`;
  try {
    let exists = false;
    try {
      await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
      exists = true;
    } catch (e) {
      if (!isObjectNotFound(e)) throw e;
    }
    if (exists) {
      skipped++;
      console.log(`SKIP ${key}`);
      continue;
    }
    const body = readFileSync(path.join(SRC, filename));
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: "image/png", CacheControl: "public, max-age=31536000, immutable" }));
    uploaded++;
    console.log(`OK ${key}`);
  } catch (e) {
    errors++;
    console.error(`ERR ${filename}: ${e.message}`);
  }
}
console.log(`SUMMARY uploaded=${uploaded} skipped=${skipped} errors=${errors} total=${files.length}`);
