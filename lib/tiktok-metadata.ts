const TIKWM_ENDPOINT = "https://www.tikwm.com/api/";
const MAX_TIKTOK_METADATA_MS = 30_000;
const TIKTOK_TIMEOUT_ERROR = "TikTok tardó demasiado en responder. Intenta con otro enlace de video.";

type TikTokMetadataRecord = {
  success: true;
  source: string;
  title?: string | null;
  duration?: number | null;
  thumbnail?: string | null;
  uploader?: string | null;
  webpage_url?: string | null;
  extractor?: string | null;
  formats?: unknown[];
  video?: string;
  audio?: string;
  raw?: Record<string, unknown>;
};

type TikTokMetadataError = {
  success: false;
  error: string;
  errorCode: string;
  details?: Record<string, unknown>;
};

export type TikTokMetadataResult = TikTokMetadataRecord | TikTokMetadataError;

function summarizeText(text: string | undefined, maxLength = 400) {
  if (!text?.trim()) return "";
  return text.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeString(value: unknown) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned ? cleaned : null;
}

function firstString(value: unknown): string {
  if (!Array.isArray(value)) return "";

  const first = value.find((item) => typeof item === "string" && item.trim().length > 0);
  return typeof first === "string" ? first : "";
}

function normalizeDuration(value: unknown) {
  const asNumber = typeof value === "number" ? value : Number(value);
  return Number.isFinite(asNumber) ? asNumber : null;
}

function normalizeUploader(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value && typeof value === "object") {
    const candidate = (value as Record<string, unknown>).nickname || (value as Record<string, unknown>).name || (value as Record<string, unknown>).unique_id;
    return normalizeString(candidate);
  }
  return null;
}

function resolveTikWmMediaUrl(value: unknown) {
  const path = normalizeString(value);
  if (!path) return undefined;

  try {
    const url = new URL(path, TIKWM_ENDPOINT);
    if (url.protocol === "https:" && !url.username && !url.password) {
      return url.href;
    }
  } catch {
    return undefined;
  }
}

function mapTikWmPayload(payload: Record<string, unknown>, url: string) {
  const data = payload.data && typeof payload.data === "object" ? (payload.data as Record<string, unknown>) : {};
  const author = data.author && typeof data.author === "object" ? (data.author as Record<string, unknown>) : {};
  const contentDesc = firstString(data.content_desc);
  const video = resolveTikWmMediaUrl(data.play) || resolveTikWmMediaUrl(data.hdplay);

  if (!video || (Array.isArray(data.images) && data.images.length > 0)) {
    return {
      success: false as const,
      error: "TikWM no devolvió un archivo de video.",
      errorCode: "TIKWM_NO_VIDEO",
    } satisfies TikTokMetadataError;
  }

  return {
    success: true as const,
    source: "tikwm",
    title: normalizeString(data.title) || normalizeString(data.desc) || normalizeString(contentDesc),
    duration: normalizeDuration(data.duration),
    thumbnail: resolveTikWmMediaUrl(data.cover) || resolveTikWmMediaUrl(data.ai_dynamic_cover) || resolveTikWmMediaUrl(data.thumbnail),
    uploader: normalizeUploader(author.nickname || author.name || author.unique_id),
    webpage_url: normalizeString(data.webpage_url) || url,
    extractor: "tikwm",
    video,
    audio: resolveTikWmMediaUrl(data.music),
    formats: [],
    raw: data,
  } satisfies TikTokMetadataRecord;
}

export async function getTikTokInfoFromTikWm(
  url: string,
  timeoutMs = MAX_TIKTOK_METADATA_MS
): Promise<TikTokMetadataResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${TIKWM_ENDPOINT}?url=${encodeURIComponent(url)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      signal: controller.signal,
    });

    const rawBody = await response.text();
    if (!response.ok) {
      return {
        success: false as const,
        error: "El proveedor alternativo TikWM devolvió un error.",
        errorCode: "TIKWM_FAILED",
        details: {
          status: response.status,
          body: summarizeText(rawBody, 400),
        },
      } satisfies TikTokMetadataError;
    }

    const payload = JSON.parse(rawBody) as Record<string, unknown>;
    if (!payload || payload.code !== 0 || !payload.data || typeof payload.data !== "object") {
      return {
        success: false as const,
        error: "TikWM no devolvió metadata válida.",
        errorCode: "TIKWM_INVALID_RESPONSE",
        details: {
          body: summarizeText(rawBody, 400),
        },
      } satisfies TikTokMetadataError;
    }

    return mapTikWmPayload(payload, url);
  } catch (error) {
    if (controller.signal.aborted) {
      return {
        success: false as const,
        error: TIKTOK_TIMEOUT_ERROR,
        errorCode: "REQUEST_TIMEOUT",
      } satisfies TikTokMetadataError;
    }

    return {
      success: false as const,
      error: "TikWM falló al resolver la metadata de TikTok.",
      errorCode: "TIKWM_FAILED",
      details: {
        message: error instanceof Error ? error.message : String(error),
      },
    } satisfies TikTokMetadataError;
  } finally {
    clearTimeout(timeoutId);
  }
}
