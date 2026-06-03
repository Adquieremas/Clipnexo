#!/usr/bin/env node

const API = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const KEY = process.env.INDEXNOW_KEY || "918041f42fff459996f397f98a5e3508";
const KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION ||
  "https://clipnexo.com/918041f42fff459996f397f98a5e3508.txt";
const HOST = process.env.INDEXNOW_HOST || "clipnexo.com";

function validate(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname === HOST;
  } catch {
    return false;
  }
}

async function submit(urls) {
  const unique = [...new Set(urls.map((u) => u.trim()))].filter(Boolean);
  const valid = unique.filter(validate);
  const rejected = unique.filter((u) => !validate(u));

  if (valid.length === 0) {
    console.log("❌ No valid URLs");
    if (rejected.length) console.log("Rejected:", rejected);
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: valid.slice(0, 100),
  };

  console.log(`\n📤 Submitting ${payload.urlList.length} URL(s) to IndexNow...\n`);

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const msgs = {
      200: "✅ OK — URLs submitted successfully",
      202: "✅ Accepted — request received",
      400: "❌ Bad request — check payload",
      403: "❌ Forbidden — verify key and keyLocation",
      422: "❌ Unprocessable — URL invalid or wrong host",
      429: "⚠️  Too many requests — retry later",
    };

    console.log(`Status: ${res.status} — ${msgs[res.status] || "Unexpected"}`);
    console.log("Submitted:", payload.urlList.length);
    if (rejected.length) console.log("Rejected:", rejected.length);
    payload.urlList.forEach((u) => console.log("  ", u));
  } catch (err) {
    console.error("❌ Request failed:", err.message);
  }
}

function blogUrls() {
  const es = [
    "mejor-descargador-tiktok-sin-marca-agua",
    "clipnexo-vs-snaptik",
    "clipnexo-vs-ssstik",
    "como-descargar-tiktok-sin-marca-agua",
    "tiktok-a-mp3-extraer-audio",
    "herramientas-creadores-contenido-redes-sociales",
    "como-elegir-hashtags-tiktok-reels-shorts",
    "como-crear-captions-instagram-tiktok",
  ];
  const en = [
    "best-tiktok-downloader-without-watermark",
    "clipnexo-vs-snaptik",
    "clipnexo-vs-ssstik",
    "how-to-download-tiktok-without-watermark",
    "tiktok-to-mp3-extract-audio",
    "tools-for-social-media-content-creators",
    "how-to-choose-hashtags-tiktok-reels-shorts",
    "how-to-write-instagram-tiktok-captions",
  ];
  const pt = [
    "melhor-baixador-tiktok-sem-marca-dagua",
    "clipnexo-vs-snaptik",
    "clipnexo-vs-ssstik",
    "como-baixar-tiktok-sem-marca-dagua",
    "tiktok-para-mp3-extrair-audio",
    "ferramentas-criadores-conteudo-redes-sociais",
    "como-escolher-hashtags-tiktok-reels-shorts",
    "como-criar-legendas-instagram-tiktok",
  ];

  const urls = [];
  for (let i = 0; i < es.length; i++) {
    urls.push(`https://clipnexo.com/es/blog/${es[i]}`);
    urls.push(`https://clipnexo.com/en/blog/${en[i]}`);
    urls.push(`https://clipnexo.com/pt/blog/${pt[i]}`);
  }
  return urls;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--blog")) {
    const urls = blogUrls();
    await submit(urls);
    return;
  }

  const urls = args.filter((a) => !a.startsWith("--"));
  if (urls.length === 0) {
    console.log("Usage: npm run indexnow -- <url> [<url>...]");
    console.log("       npm run indexnow:blog");
    process.exit(0);
  }

  await submit(urls);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
