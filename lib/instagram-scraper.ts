import type { InstagramInfoResponse, InstagramMediaItem } from "@/lib/instagram-types";
import { extractHashtags, normalizeInstagramMediaUrl, normalizeString } from "@/lib/instagram-metadata";

const INSTAGRAM_TIMEOUT_MS = 20_000;
const MAX_HTML_BYTES = 1024 * 1024 * 2;

const INSTAGRAM_LOGIN_REQUIRED_ERROR =
  "Instagram requiere validacion adicional para este contenido. Intenta con otro enlace publico.";
const INSTAGRAM_BLOCKED_ERROR =
  "Instagram bloqueo temporalmente la obtencion de informacion. Intenta con otro enlace publico.";
const INSTAGRAM_TIMEOUT_ERROR =
  "Instagram tardo demasiado en responder. Intenta con otro enlace publico.";

function extractMeta(html: string, property: string): string {
  const regex = new RegExp(
    `<meta\\s[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`,
    "i"
  );
  const match = html.match(regex);
  return match?.[1] || "";
}

function extractJsonLd(html: string): Record<string, unknown> | null {
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
  const match = html.match(regex);
  if (!match?.[1]) return null;

  try {
    return JSON.parse(match[1]) as Record<string, unknown>;
  } catch {
    try {
      const unescaped = match[1]
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      return JSON.parse(unescaped) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

function extractVideoUrlFromHtml(html: string): string | null {
  const ogVideo =
    extractMeta(html, "og:video") || extractMeta(html, "og:video:secure_url");
  if (ogVideo && ogVideo.startsWith("http")) return ogVideo;

  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const contentUrl = normalizeString(jsonLd.contentUrl);
    if (contentUrl && contentUrl.startsWith("http")) return contentUrl;
  }

  const videoMatch = html.match(
    /video_url["']?\s*:\s*["'](https?:\/\/[^"']+)["']/
  );
  if (videoMatch?.[1]) return videoMatch[1];

  const cdnMatch = html.match(
    /(https?:\/\/[^"'\s]+\.(?:fbcdn\.net|cdninstagram\.com)[^"'\s]*\.mp4[^"'\s]*)/
  );
  if (cdnMatch?.[1]) return cdnMatch[1];

  return null;
}

function extractImageUrlFromHtml(html: string): string | null {
  const ogImage = extractMeta(html, "og:image");
  if (ogImage && ogImage.startsWith("http")) return ogImage;

  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const thumbnailUrl = normalizeString(jsonLd.thumbnailUrl);
    if (thumbnailUrl && thumbnailUrl.startsWith("http")) return thumbnailUrl;
  }

  return null;
}

function extractDescriptionFromHtml(html: string): string {
  const ogDesc = extractMeta(html, "og:description");
  if (ogDesc) return ogDesc.trim();

  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const desc = normalizeString(jsonLd.description) || normalizeString(jsonLd.caption);
    if (desc) return desc.trim();
  }

  return "";
}

function extractTitleFromHtml(html: string): string {
  const ogTitle = extractMeta(html, "og:title");
  if (ogTitle) return ogTitle.trim();

  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const name = normalizeString(jsonLd.name) || normalizeString(jsonLd.headline);
    if (name) return name.trim();
  }

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch?.[1]) return titleMatch[1].trim();

  return "Instagram content";
}

function extractDurationFromHtml(html: string): number {
  const durationMatch = html.match(/duration["']?\s*[:=]\s*(\d+)/);
  if (durationMatch?.[1]) return Number(durationMatch[1]);

  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const dur = jsonLd.duration;
    if (typeof dur === "number") return dur;
    if (typeof dur === "string") {
      const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (match) {
        const hours = Number(match[1] || 0);
        const minutes = Number(match[2] || 0);
        const seconds = Number(match[3] || 0);
        return hours * 3600 + minutes * 60 + seconds;
      }
    }
  }

  return 0;
}

function extractUploaderFromHtml(html: string): string {
  const jsonLd = extractJsonLd(html);
  if (jsonLd) {
    const author =
      normalizeString((jsonLd.author as Record<string, unknown>)?.name) ||
      normalizeString(jsonLd.author);
    if (author) return author.trim();
  }

  const authorMatch = html.match(
    /"owner"\s*:\s*\{[^}]*"username"\s*:\s*"([^"]+)"/
  );
  if (authorMatch?.[1]) return authorMatch[1];

  return "";
}

function isLoginPage(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("login") ||
    lower.includes("not_logged_in") ||
    lower.includes("login_required") ||
    lower.includes("please log in") ||
    lower.includes("sign up to see") ||
    (html.length < 5000 && lower.includes("account"))
  );
}

function isBlocked(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("sorry, this page isn't available") ||
    lower.includes("the link you followed may be broken") ||
    html.length < 300
  );
}

async function fetchInstagramPage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), INSTAGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 401 || status === 403 || status === 429) {
        throw new Error("INSTAGRAM_UPSTREAM_BLOCKED");
      }
      throw new Error(`HTTP ${status}`);
    }

    const text = await response.text();

    if (text.length > MAX_HTML_BYTES) {
      return text.slice(0, MAX_HTML_BYTES);
    }

    return text;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("REQUEST_TIMEOUT");
    }
    if (
      error instanceof Error &&
      (error.message === "INSTAGRAM_UPSTREAM_BLOCKED" ||
        error.message === "REQUEST_TIMEOUT")
    ) {
      throw error;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getInstagramInfoViaScraper(
  url: string
): Promise<InstagramInfoResponse> {
  try {
    const html = await fetchInstagramPage(url);

    if (isBlocked(html)) {
      return {
        success: false,
        error: INSTAGRAM_BLOCKED_ERROR,
        errorCode: "INSTAGRAM_UPSTREAM_BLOCKED",
      };
    }

    if (isLoginPage(html)) {
      return {
        success: false,
        error: INSTAGRAM_LOGIN_REQUIRED_ERROR,
        errorCode: "INSTAGRAM_LOGIN_REQUIRED",
      };
    }

    const videoUrl = normalizeInstagramMediaUrl(extractVideoUrlFromHtml(html));
    const imageUrl = normalizeInstagramMediaUrl(extractImageUrlFromHtml(html));
    const description = extractDescriptionFromHtml(html);
    const title = extractTitleFromHtml(html);
    const duration = extractDurationFromHtml(html);
    const uploader = extractUploaderFromHtml(html);
    const hashtags = extractHashtags(description);

    if (!videoUrl && !imageUrl) {
      return {
        success: false,
        error:
          "No se pudo extraer contenido multimedia de este enlace de Instagram.",
        errorCode: "INSTAGRAM_PROVIDERS_FAILED",
      };
    }

    const isReel = url.includes("/reel/");
    const type = videoUrl ? (isReel ? "reel" : "video") : "image";

    const items: InstagramMediaItem[] = [];

    if (videoUrl) {
      items.push({
        type: "video",
        url: videoUrl,
        downloadUrl: videoUrl,
        thumbnail: imageUrl || null,
        width: null,
        height: null,
        ext: "mp4",
        duration: duration || null,
      });
    }

    if (imageUrl && !videoUrl) {
      items.push({
        type: "image",
        url: imageUrl,
        downloadUrl: imageUrl,
        thumbnail: imageUrl,
        width: null,
        height: null,
        ext: "jpg",
        duration: null,
      });
    }

    return {
      success: true,
      source: "instagram",
      provider: "scraper",
      type,
      title: title || description || "Instagram content",
      description: description || title || "",
      thumbnail: imageUrl || "",
      duration: duration || 0,
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
      audioOptions: [],
      downloadUrl: videoUrl || imageUrl,
      videoUrl: videoUrl || null,
      combinedUrl: null,
      audioUrl: null,
      videoOnly: videoUrl ? true : false,
      audioAvailable: false,
      mp3Available: false,
      webpage_url: url,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message === "INSTAGRAM_UPSTREAM_BLOCKED") {
      return {
        success: false,
        error: INSTAGRAM_BLOCKED_ERROR,
        errorCode: "INSTAGRAM_UPSTREAM_BLOCKED",
      };
    }

    if (message === "REQUEST_TIMEOUT") {
      return {
        success: false,
        error: INSTAGRAM_TIMEOUT_ERROR,
        errorCode: "REQUEST_TIMEOUT",
      };
    }

    return {
      success: false,
      error:
        "No se pudo obtener la informacion de Instagram en este momento.",
      errorCode: "INSTAGRAM_PROVIDERS_FAILED",
    };
  }
}
