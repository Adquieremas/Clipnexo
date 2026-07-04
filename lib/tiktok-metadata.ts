import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const YT_DLP_PATH = "/usr/local/bin/yt-dlp";
const TIKWM_ENDPOINT = "https://www.tikwm.com/api/";
const MAX_TIKTOK_METADATA_MS = 30_000;

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

function mapYtDlpPayload(payload: Record<string, unknown>) {
  return {
    success: true as const,
    source: "yt-dlp",
    title: normalizeString(payload.title),
    duration: normalizeDuration(payload.duration),
    thumbnail: normalizeString(payload.thumbnail) || normalizeString(payload.thumbnail_url),
    uploader: normalizeUploader(payload.uploader),
    webpage_url: normalizeString(payload.webpage_url),
    extractor: normalizeString(payload.extractor) || "yt-dlp",
    formats: Array.isArray(payload.formats) ? payload.formats : [],
    raw: payload,
  } satisfies TikTokMetadataRecord;
}

function mapTikWmPayload(payload: Record<string, unknown>, url: string) {
  const data = payload.data && typeof payload.data === "object" ? (payload.data as Record<string, unknown>) : {};
  const author = data.author && typeof data.author === "object" ? (data.author as Record<string, unknown>) : {};
  const contentDesc = firstString(data.content_desc);

  return {
    success: true as const,
    source: "tikwm",
    title: normalizeString(data.title) || normalizeString(data.desc) || normalizeString(contentDesc),
    duration: normalizeDuration(data.duration),
    thumbnail: normalizeString(data.cover) || normalizeString(data.ai_dynamic_cover) || normalizeString(data.thumbnail),
    uploader: normalizeUploader(author.nickname || author.name || author.unique_id),
    webpage_url: normalizeString(data.webpage_url) || url,
    extractor: "tikwm",
    formats: [],
    raw: data,
  } satisfies TikTokMetadataRecord;
}

async function getTikTokInfoWithYtDlp(url: string, timeoutMs = MAX_TIKTOK_METADATA_MS) {
  try {
    const { stdout, stderr } = await execFileAsync(
      YT_DLP_PATH,
      ["--impersonate", "chrome", "--no-playlist", "--dump-single-json", "--socket-timeout", "30", url],
      {
        timeout: timeoutMs,
        maxBuffer: 1024 * 1024 * 2,
        env: {
          ...process.env,
          PYTHONUNBUFFERED: "1",
        },
      }
    );

    const trimmed = stdout.trim();
    if (!trimmed) {
      return {
        success: false as const,
        error: "yt-dlp no devolvió metadata útil.",
        errorCode: "YT_DLP_EMPTY_OUTPUT",
        details: {
          stderr: summarizeText(stderr),
        },
      } satisfies TikTokMetadataError;
    }

    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    return mapYtDlpPayload(parsed);
  } catch (error) {
    const stderr = error && typeof error === "object" && "stderr" in error ? String((error as { stderr?: unknown }).stderr || "") : "";
    const message = error instanceof Error ? error.message : String(error);

    return {
      success: false as const,
      error: "yt-dlp falló al extraer la metadata de TikTok.",
      errorCode: "YT_DLP_FAILED",
      details: {
        message,
        stderr: summarizeText(stderr),
      },
    } satisfies TikTokMetadataError;
  }
}

async function getTikTokInfoWithTikWm(url: string, timeoutMs = MAX_TIKTOK_METADATA_MS) {
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

export async function getTikTokInfoWithFallback(url: string, timeoutMs = MAX_TIKTOK_METADATA_MS) {
  const primary = await getTikTokInfoWithYtDlp(url, timeoutMs);
  if (primary.success) {
    return primary;
  }

  const fallback = await getTikTokInfoWithTikWm(url, timeoutMs);
  if (fallback.success) {
    return fallback;
  }

  return {
    success: false as const,
    error: "No se pudo obtener la metadata de TikTok en este momento.",
    errorCode: "TIKTOK_PROVIDERS_FAILED",
    details: {
      primary: primary.errorCode,
      fallback: fallback.errorCode,
      ...(process.env.NODE_ENV !== "production"
        ? {
            primaryDetails: primary.details,
            fallbackDetails: fallback.details,
          }
        : {}),
    },
  } satisfies TikTokMetadataError;
}
