import { NextResponse } from "next/server";
import { normalizeInstagramMediaUrl, parseInstagramUrl, getInstagramInfoWithYtDlp } from "@/lib/instagram-metadata";
import { getInstagramErrorStatus } from "@/lib/clipnexo-api";
import { isFfmpegAvailable } from "@/lib/media-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 10 * 1024;

function toMediaUrl(value: string | null | undefined) {
  return normalizeInstagramMediaUrl(value) || null;
}

function isInstagramAudioMediaUrl(value: string) {
  try {
    const parsed = new URL(value);
    const pathLower = parsed.pathname.toLowerCase();

    if (pathLower.includes("/m78/")) return true;
    if (pathLower.includes("/audio/")) return true;

    const efg = parsed.searchParams.get("efg") || "";
    if (efg) {
      try {
        const decoded = Buffer.from(decodeURIComponent(efg), "base64").toString("utf8").toLowerCase();
        if (decoded.includes("audio")) return true;
        if (decoded.includes("mp4a")) return true;
      } catch {}
    }

    const bytestot = parsed.searchParams.get("bytestot") || "";
    if (bytestot && pathLower.includes("video") === false && pathLower.includes("image") === false) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function isInstagramVideoOnlyUrl(value: string) {
  try {
    const parsed = new URL(value);
    const pathLower = parsed.pathname.toLowerCase();
    const searchLower = parsed.search.toLowerCase();

    if (searchLower.includes("dash") || pathLower.includes("dash")) return true;
    if (searchLower.includes("vp9")) return true;

    const efg = parsed.searchParams.get("efg") || "";
    if (efg) {
      try {
        const decoded = Buffer.from(decodeURIComponent(efg), "base64").toString("utf8").toLowerCase();
        if (decoded.includes("video") && !decoded.includes("audio")) return true;
        if (decoded.includes("vp9")) return true;
      } catch {}
    }

    return false;
  } catch {
    return false;
  }
}

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;
  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

type CandidateUrl = { url: string; type: "video" | "audio" | "unknown"; contentType: string };

async function getInstagramWithPlaywright(url: string, shortcode: string) {
  const { chromium } = await import("playwright");

  const cookiesFile = process.env.INSTAGRAM_COOKIES_PATH || "./instagram.cookies.txt";

  const cookies: Array<{ name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "None" }> = [];

  try {
    const { readFileSync, existsSync } = await import("node:fs");
    if (existsSync(cookiesFile)) {
      const content = readFileSync(cookiesFile, "utf-8");
      const lines = content.split("\n");
      const wanted = ["sessionid", "csrftoken", "ds_user_id", "mid", "ig_did"];
      for (const line of lines) {
        if (line.startsWith("#") || !line.trim()) continue;
        const parts = line.split("\t");
        if (parts.length < 7) continue;
        const [domain, , cpath, secure, expires, name, value] = parts;
        const cookieName = name.trim();
        if (wanted.includes(cookieName)) {
          cookies.push({
            name: cookieName,
            value: value.trim(),
            domain: domain.trim(),
            path: cpath.trim(),
            expires: Number(expires) || -1,
            httpOnly: false,
            secure: secure.trim() === "TRUE",
            sameSite: "None" as const,
          });
        }
      }
    }
  } catch {}

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  try {
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 720 },
    });

    if (cookies.length > 0) {
      await context.addCookies(cookies);
    }

    const page = await context.newPage();

    const candidates: CandidateUrl[] = [];
    let imageUrl: string | null = null;
    let description = "";
    let uploader = "";

    page.on("response", async (response) => {
      const respUrl = response.url();
      const mediaUrl = toMediaUrl(respUrl);
      if (!mediaUrl) return;

      const isMediaDomain = respUrl.includes("fbcdn.net") || respUrl.includes("cdninstagram.com");
      if (!isMediaDomain) return;

      const contentType = response.headers()["content-type"] || "";

      if (respUrl.includes(".mp4") || respUrl.includes(".m4a") || contentType.includes("video/") || contentType.includes("audio/")) {
        let candidateType: CandidateUrl["type"] = "unknown";
        if (isInstagramAudioMediaUrl(respUrl)) {
          candidateType = "audio";
        } else if (respUrl.includes(".mp4") || contentType.includes("video/")) {
          candidateType = "video";
        } else if (respUrl.includes(".m4a") || contentType.includes("audio/")) {
          candidateType = "audio";
        }

        const exists = candidates.some((c) => c.url === mediaUrl);
        if (!exists) {
          candidates.push({ url: mediaUrl, type: candidateType, contentType });
        }
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);

    const videoCandidates = candidates.filter((c) => c.type === "video");
    const audioCandidates = candidates.filter((c) => c.type === "audio");
    const unknownCandidates = candidates.filter((c) => c.type === "unknown");

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-playwright-candidates]", {
        videoCount: videoCandidates.length,
        audioCount: audioCandidates.length,
        unknownCount: unknownCandidates.length,
        videoFirst: videoCandidates[0]?.url?.slice(0, 140) || "none",
        audioFirst: audioCandidates[0]?.url?.slice(0, 140) || "none",
        unknownFirst: unknownCandidates[0]?.url?.slice(0, 140) || "none",
      });
    }

    let videoUrl: string | null = null;
    let audioUrl: string | null = null;

    if (videoCandidates.length > 0) {
      videoUrl = videoCandidates[0].url;
    }

    if (audioCandidates.length > 0) {
      audioUrl = audioCandidates[0].url;
    }

    if (!videoUrl && unknownCandidates.length > 0) {
      for (const candidate of unknownCandidates) {
        if (!isInstagramAudioMediaUrl(candidate.url)) {
          videoUrl = candidate.url;
          break;
        }
      }
    }

    if (!audioUrl && unknownCandidates.length > 0) {
      for (const candidate of unknownCandidates) {
        if (isInstagramAudioMediaUrl(candidate.url)) {
          audioUrl = candidate.url;
          break;
        }
      }
    }

    if (!videoUrl) {
      try {
        const src = await page.$eval("video", (el: HTMLVideoElement) => el.src);
        videoUrl = toMediaUrl(src);
      } catch {}
    }

    if (!videoUrl) {
      try {
        const src = await page.$eval("video source", (el: HTMLSourceElement) => el.src);
        videoUrl = toMediaUrl(src);
      } catch {}
    }

    if (!videoUrl) {
      try {
        const ogVideo = await page.$eval('meta[property="og:video"]', (el: HTMLMetaElement) => el.content);
        videoUrl = toMediaUrl(ogVideo);
      } catch {}
    }

    if (!videoUrl) {
      try {
        const secureUrl = await page.$eval('meta[property="og:video:secure_url"]', (el: HTMLMetaElement) => el.content);
        videoUrl = toMediaUrl(secureUrl);
      } catch {}
    }

    if (!videoUrl) {
      const html = await page.content();
      const match = html.match(/"video_url"\s*:\s*"(https?:\/\/[^"]+)"/);
      if (match?.[1]) videoUrl = toMediaUrl(match[1]);
    }

    try {
      const ogImage = await page.$eval('meta[property="og:image"]', (el: HTMLMetaElement) => el.content);
      imageUrl = toMediaUrl(ogImage);
    } catch {}

    try {
      description = await page.$eval('meta[property="og:description"]', (el: HTMLMetaElement) => el.content);
    } catch {}

    try {
      uploader = (await page.$eval("header a", (el: HTMLElement) => el.textContent?.trim())) || "";
    } catch {}

    await context.close();

    const videoOnly = videoUrl ? isInstagramVideoOnlyUrl(videoUrl) : false;
    const audioAvailable = Boolean(audioUrl) || (!videoOnly && Boolean(videoUrl));

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-info-result]", {
        shortcode,
        videoUrl: videoUrl?.slice(0, 160) || "none",
        audioUrl: audioUrl?.slice(0, 160) || "none",
        videoOnly,
        audioAvailable,
        candidatesTotal: candidates.length,
      });
    }

    if (!videoUrl && !imageUrl) {
      return {
        success: false,
        error: "No se pudo encontrar contenido multimedia en esta pagina de Instagram.",
        errorCode: "INSTAGRAM_PROVIDERS_FAILED",
      };
    }

    const isReel = url.includes("/reel/");
    const type = videoUrl ? (isReel ? "reel" : "video") : "image";
    const items: Array<{ type: "video" | "image"; url: string; downloadUrl: string; thumbnail: string | null; width: null; height: null; ext: string; duration: number | null }> = [];

    if (videoUrl) {
      items.push({ type: "video", url: videoUrl, downloadUrl: videoUrl, thumbnail: imageUrl || null, width: null, height: null, ext: "mp4", duration: null });
    }
    if (imageUrl && !videoUrl) {
      items.push({ type: "image", url: imageUrl, downloadUrl: imageUrl, thumbnail: imageUrl, width: null, height: null, ext: "jpg", duration: null });
    }

    const hashtags = (description.match(/#[\p{L}\p{N}_]+/gu) || []).filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
    const mp3Available = audioAvailable && await isFfmpegAvailable();

    const combinedUrl: string | null = (!videoOnly && videoUrl) ? videoUrl : null;

    return {
      success: true,
      source: "instagram",
      provider: "playwright",
      type,
      downloadUrl: videoUrl || imageUrl || null,
      shortcode,
      title: description || "Instagram content",
      description: description || "",
      thumbnail: imageUrl || "",
      duration: 0,
      uploader,
      hashtags,
      items,
      formats: [],
      videoOptions: videoUrl
        ? [
            {
              label: "MP4",
              quality: "mp4",
              url: videoUrl,
              ext: "mp4",
              width: null,
              height: null,
            },
          ]
        : [],
      audioOptions: audioUrl
        ? [
            {
              label: "MP3",
              quality: "mp3",
              url: audioUrl,
              ext: "mp3",
            },
          ]
        : [],
      audioUrl,
      mp3Available,
      videoUrl: videoUrl || null,
      combinedUrl,
      videoOnly,
      audioAvailable,
      webpage_url: url,
    };
  } finally {
    await browser.close();
  }
}

export async function POST(req: Request) {
  if (isRequestTooLarge(req)) {
    return NextResponse.json(
      { success: false, error: "Cuerpo demasiado grande.", errorCode: "REQUEST_TOO_LARGE" },
      { status: 413 }
    );
  }

  const body = await req.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url.trim() : "";

  if (!url) {
    return NextResponse.json(
      { success: false, error: "Debes enviar un enlace de Instagram.", errorCode: "EMPTY_URL" },
      { status: 400 }
    );
  }

  const parsed = parseInstagramUrl(url);
  if ("errorCode" in parsed) {
    return NextResponse.json(parsed, { status: getInstagramErrorStatus(parsed.errorCode) });
  }

  const [ytResult, playwrightResult] = await Promise.allSettled([
    getInstagramInfoWithYtDlp(parsed.url, parsed.kind).catch(() => null),
    getInstagramWithPlaywright(parsed.url, parsed.shortcode),
  ]);

  const ytData = ytResult.status === "fulfilled" && ytResult.value?.success && ytResult.value.audioAvailable
    ? { audioUrl: ytResult.value.audioUrl || null, combinedUrl: ytResult.value.combinedUrl || null, formats: ytResult.value.formats }
    : null;

  if (process.env.NODE_ENV !== "production" && ytData) {
    console.log("[instagram-yt-dlp-ok]", {
      audioUrl: ytData.audioUrl?.slice(0, 140) || "none",
      combinedUrl: ytData.combinedUrl?.slice(0, 140) || "none",
    });
  }

  if (playwrightResult.status === "rejected") {
    console.error("[instagram/info] Playwright failed:", playwrightResult.reason instanceof Error ? playwrightResult.reason.message : String(playwrightResult.reason));
    return NextResponse.json(
      { success: false, error: "No se pudo obtener la informacion de Instagram.", errorCode: "INSTAGRAM_PROVIDERS_FAILED" },
      { status: 502 }
    );
  }

  const result = playwrightResult.value;

  if (result.success) {
    if (ytData) {
      const audioUrl = result.audioUrl || ytData.audioUrl;
      const combinedUrl = result.combinedUrl || ytData.combinedUrl;
      const hasAudio = Boolean(audioUrl || combinedUrl);

      const finalResult = {
        ...result,
        audioUrl,
        combinedUrl,
        audioAvailable: hasAudio || result.audioAvailable,
        videoOnly: hasAudio ? false : result.videoOnly,
        mp3Available: hasAudio ? await isFfmpegAvailable() : result.mp3Available,
        provider: hasAudio ? "playwright+yt-dlp" : result.provider,
        formats: Array.isArray(ytData.formats) && ytData.formats.length > 0 ? ytData.formats : result.formats,
      };

      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-selected-sources]", {
          previewUrl: result.thumbnail?.slice(0, 120),
          videoUrl: finalResult.videoUrl?.slice(0, 140) || "none",
          audioUrl: finalResult.audioUrl?.slice(0, 140) || "none",
          combinedUrl: finalResult.combinedUrl?.slice(0, 140) || "none",
          videoOnly: finalResult.videoOnly,
          audioAvailable: finalResult.audioAvailable,
        });
      }

      return NextResponse.json(finalResult, { status: 200 });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-selected-sources]", {
        previewUrl: result.thumbnail?.slice(0, 120),
        videoUrl: result.videoUrl?.slice(0, 140) || "none",
        audioUrl: result.audioUrl?.slice(0, 140) || "none",
        combinedUrl: result.combinedUrl?.slice(0, 140) || "none",
        videoOnly: result.videoOnly,
        audioAvailable: result.audioAvailable,
      });
    }

    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json(result, {
    status: getInstagramErrorStatus(result.errorCode || "INSTAGRAM_PROVIDERS_FAILED"),
  });
}
