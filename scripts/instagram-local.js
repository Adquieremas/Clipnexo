/* eslint-disable @typescript-eslint/no-require-imports */
// Local Instagram API using Playwright - runs on Mac
const { chromium } = require("playwright");
const express = require("express");
const fs = require("fs");
const path = require("path");

const COOKIES_FILE = path.join(__dirname, "..", "instagram.cookies.txt");
const PORT = 3002;

function parseCookies() {
  if (!fs.existsSync(COOKIES_FILE)) return [];
  const content = fs.readFileSync(COOKIES_FILE, "utf-8");
  const lines = content.split("\n");
  const cookies = [];
  const wanted = ["sessionid", "csrftoken", "ds_user_id", "mid", "ig_did"];

  for (const line of lines) {
    if (line.startsWith("#") || !line.trim()) continue;
    const parts = line.split("\t");
    if (parts.length < 7) continue;
    const [domain, flag, cpath, secure, expires, name, value] = parts;
    if (wanted.includes(name.trim())) {
      cookies.push({
        name: name.trim(),
        value: value.trim(),
        domain: domain.trim(),
        path: cpath.trim(),
        expires: Number(expires) || -1,
        httpOnly: false,
        secure: secure.trim() === "TRUE",
        sameSite: "None",
      });
    }
  }
  return cookies;
}

async function getInstagramInfo(url) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 720 },
    });

    const cookies = parseCookies();
    if (cookies.length > 0) {
      await context.addCookies(cookies);
      console.log(`[instagram] ${cookies.length} cookies loaded`);
    }

    const page = await context.newPage();
    let videoUrl = null;
    let imageUrl = null;
    let description = "";
    let uploader = "";

    page.on("response", async (response) => {
      const url = response.url();
      if (
        !videoUrl &&
        (url.includes("fbcdn.net") || url.includes("cdninstagram.com")) &&
        url.includes(".mp4")
      ) {
        videoUrl = url;
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for dynamic content
    await page.waitForTimeout(3000);

    // Try video element
    try {
      const src = await page.$eval("video", (el) => el.src);
      if (src) videoUrl = src;
    } catch {}

    // Try og:video meta
    if (!videoUrl) {
      try {
        videoUrl = await page.$eval('meta[property="og:video"]', (el) => el.content);
      } catch {}
    }

    // Try page content
    if (!videoUrl) {
      const html = await page.content();
      const match = html.match(/"video_url"\s*:\s*"([^"]+)"/);
      if (match) videoUrl = match[1];
    }

    // Image
    try {
      imageUrl = await page.$eval('meta[property="og:image"]', (el) => el.content);
    } catch {}

    // Description
    try {
      description = await page.$eval('meta[property="og:description"]', (el) => el.content);
    } catch {}

    // Uploader
    try {
      uploader = await page.$eval("header a", (el) => el.textContent?.trim()) || "";
    } catch {}

    await context.close();

    if (!videoUrl && !imageUrl) {
      return { success: false, error: "No content found", errorCode: "INSTAGRAM_PROVIDERS_FAILED" };
    }

    const isReel = url.includes("/reel/");
    const items = [];
    if (videoUrl) {
      items.push({ type: "video", url: videoUrl, thumbnail: imageUrl || null, width: null, height: null, ext: "mp4", duration: null });
    }
    if (imageUrl && !videoUrl) {
      items.push({ type: "image", url: imageUrl, thumbnail: imageUrl, width: null, height: null, ext: "jpg", duration: null });
    }

    console.log(`[instagram] SUCCESS: ${videoUrl ? "video" : "image"} found`);

    return {
      success: true,
      source: "instagram",
      provider: "playwright",
      type: videoUrl ? (isReel ? "reel" : "video") : "image",
      title: description || "Instagram content",
      description: description || "",
      thumbnail: imageUrl || "",
      duration: 0,
      uploader,
      hashtags: (description.match(/#[\p{L}\p{N}_]+/gu) || []).filter((v, i, a) => a.indexOf(v) === i),
      items,
      formats: [],
      audioUrl: null,
      webpage_url: url,
    };
  } finally {
    await browser.close();
  }
}

const app = express();
app.use(express.json());

app.post("/api/instagram/info", async (req, res) => {
  const url = req.body?.url;
  if (!url) return res.status(400).json({ success: false, error: "Missing URL", errorCode: "EMPTY_URL" });

  try {
    const result = await getInstagramInfo(url);
    res.json(result);
  } catch (e) {
    console.error("[instagram] Error:", e.message);
    res.status(502).json({ success: false, error: "Instagram request failed", errorCode: "INSTAGRAM_PROVIDERS_FAILED" });
  }
});

app.listen(PORT, () => {
  console.log(`Instagram local API on http://localhost:${PORT}`);
  console.log(`Cookies: ${fs.existsSync(COOKIES_FILE) ? "FOUND" : "MISSING"}`);
});
