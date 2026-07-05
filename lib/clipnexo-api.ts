const DEFAULT_API_BASE_URL = "https://api.clipnexo.com";
const API_BASE_URL = process.env.NEXT_PUBLIC_CLIPNEXO_API_URL?.trim() || DEFAULT_API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 45_000;

export type ClipnexoVideoFormat = {
  format_id?: string | null;
  ext?: string | null;
  resolution?: string | null;
  width?: number | null;
  height?: number | null;
  fps?: number | null;
  vcodec?: string | null;
  acodec?: string | null;
  filesize?: number | null;
  filesize_approx?: number | null;
  format_note?: string | null;
};

export type ClipnexoVideoInfoResponse = {
  success: true;
  source?: string;
  title?: string | null;
  duration?: number | null;
  thumbnail?: string | null;
  uploader?: string | null;
  webpage_url?: string | null;
  extractor?: string | null;
  formats?: ClipnexoVideoFormat[];
};

type ClipnexoApiErrorBody = {
  success?: false;
  error?: string;
  errorCode?: string;
};

export class ClipnexoApiError extends Error {
  code: string;
  status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = "ClipnexoApiError";
    this.code = code;
    this.status = status;
  }
}

function normalizeBaseUrl(value: string | undefined) {
  const trimmedValue = value?.trim() || DEFAULT_API_BASE_URL;

  let parsed: URL;

  try {
    parsed = new URL(trimmedValue);
  } catch {
    throw new ClipnexoApiError(
      "NEXT_PUBLIC_CLIPNEXO_API_URL is invalid.",
      "API_URL_INVALID"
    );
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new ClipnexoApiError(
      "NEXT_PUBLIC_CLIPNEXO_API_URL must use http or https.",
      "API_URL_INVALID_PROTOCOL"
    );
  }

  if (isLocalOrPrivateHostname(parsed.hostname)) {
    throw new ClipnexoApiError(
      "NEXT_PUBLIC_CLIPNEXO_API_URL cannot point to a local or private host.",
      "API_URL_PRIVATE"
    );
  }

  return parsed.toString().replace(/\/+$/, "");
}

export function getClipnexoApiBaseUrl() {
  return normalizeBaseUrl(API_BASE_URL);
}

export function buildClipnexoApiEndpoint(path: string) {
  const baseUrl = normalizeBaseUrl(API_BASE_URL);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

function shouldUseSameOriginProxy() {
  return typeof window !== "undefined";
}

function createTimeoutSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeoutId),
  };
}

async function readJsonSafely<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map((part) => Number.parseInt(part, 10));

  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }

  const [a, b] = parts;

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

export function isLocalOrPrivateHostname(hostname: string) {
  const normalized = hostname.replace(/^\[|\]$/g, "").toLowerCase();

  if (normalized.includes(":")) {
    return (
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe80")
    );
  }

  return (
    normalized === "localhost" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local") ||
    isPrivateIpv4(normalized)
  );
}

export function assertPublicHttpUrl(value: string) {
  let parsed: URL;

  try {
    parsed = new URL(value.trim());
  } catch {
    throw new ClipnexoApiError("Invalid video URL.", "INVALID_URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new ClipnexoApiError("Unsupported video URL protocol.", "INVALID_URL");
  }

  if (parsed.username || parsed.password || isLocalOrPrivateHostname(parsed.hostname)) {
    throw new ClipnexoApiError("Private video URLs are not allowed.", "PRIVATE_URL");
  }

  return parsed.toString();
}

async function requestVideoInfo(endpoint: string, safeUrl: string, timeoutMs: number) {
  const timeout = createTimeoutSignal(timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: safeUrl }),
      signal: timeout.signal,
    });

    const data = await readJsonSafely<ClipnexoVideoInfoResponse | ClipnexoApiErrorBody>(
      response
    );

    if (!response.ok || !data || data.success === false) {
      const errorBody = data as ClipnexoApiErrorBody | null;

      throw new ClipnexoApiError(
        errorBody?.error || "Could not get video information.",
        errorBody?.errorCode || "VIDEO_INFO_FAILED",
        response.status
      );
    }

    return data as ClipnexoVideoInfoResponse;
  } catch (error) {
    if (error instanceof ClipnexoApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ClipnexoApiError("The video info request timed out.", "REQUEST_TIMEOUT");
    }

    throw new ClipnexoApiError("The Clipnexo API is unavailable.", "API_UNAVAILABLE");
  } finally {
    timeout.clear();
  }
}

export async function fetchVideoInfoFromConfiguredApi(
  url: string,
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const safeUrl = assertPublicHttpUrl(url);
  return requestVideoInfo(buildClipnexoApiEndpoint("/api/video/info"), safeUrl, timeoutMs);
}

export async function getVideoInfo(url: string, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const safeUrl = assertPublicHttpUrl(url);
  const endpoint = shouldUseSameOriginProxy()
    ? "/api/video/info"
    : buildClipnexoApiEndpoint("/api/video/info");

  return requestVideoInfo(endpoint, safeUrl, timeoutMs);
}

export async function healthCheck(timeoutMs = 10_000) {
  const endpoint = buildClipnexoApiEndpoint("/health");
  const timeout = createTimeoutSignal(timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      signal: timeout.signal,
    });

    const data = await readJsonSafely<{ ok?: boolean; service?: string }>(response);

    if (!response.ok || !data?.ok) {
      throw new ClipnexoApiError("Clipnexo API health check failed.", "HEALTH_FAILED");
    }

    return data;
  } finally {
    timeout.clear();
  }
}

export function getFriendlyClipnexoApiError(error: unknown) {
  if (!(error instanceof ClipnexoApiError)) {
    return "No se pudo obtener información del video";
  }

  if (
    ["INVALID_URL", "PRIVATE_URL", "INVALID_URL_FORMAT", "PRIVATE_URL_BLOCKED"].includes(
      error.code
    )
  ) {
    return "El enlace no es válido";
  }

  if (
    [
      "API_URL_MISSING",
      "API_URL_INVALID",
      "API_URL_INVALID_PROTOCOL",
      "API_URL_PRIVATE",
    ].includes(error.code)
  ) {
    return "La API de Clipnexo no está configurada";
  }

  if (["API_UNAVAILABLE", "REQUEST_TIMEOUT", "INFO_TIMEOUT"].includes(error.code)) {
    return "Servicio temporalmente no disponible";
  }

  return "No se pudo obtener información del video";
}

export function getClipnexoApiErrorStatus(error: ClipnexoApiError) {
  if (["EMPTY_URL", "INVALID_URL", "PRIVATE_URL"].includes(error.code)) {
    return 400;
  }

  return error.status || 502;
}

const DOWNLOAD_TIMEOUT_MS = 45_000;

export function buildInstagramInfoEndpoint() {
  return buildClipnexoApiEndpoint("/api/instagram/info");
}

export function buildInstagramDownloadEndpoint() {
  return buildClipnexoApiEndpoint("/api/instagram/download");
}

export async function proxyInstagramInfoRequest(url: string, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const endpoint = buildInstagramInfoEndpoint();
  const timeout = createTimeoutSignal(timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: timeout.signal,
    });

    return response;
  } catch {
    throw new ClipnexoApiError("Clipnexo API is unavailable.", "API_UNAVAILABLE");
  } finally {
    timeout.clear();
  }
}

export async function proxyInstagramDownloadRequest(body: Record<string, unknown>, timeoutMs = DOWNLOAD_TIMEOUT_MS) {
  const endpoint = buildInstagramDownloadEndpoint();
  const timeout = createTimeoutSignal(timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: timeout.signal,
    });

    return response;
  } catch {
    throw new ClipnexoApiError("Clipnexo API is unavailable.", "API_UNAVAILABLE");
  } finally {
    timeout.clear();
  }
}

export function getInstagramErrorStatus(errorCode: string) {
  if (["EMPTY_URL", "INVALID_INSTAGRAM_URL", "UNSUPPORTED_INSTAGRAM_STORY"].includes(errorCode)) {
    return 400;
  }

  if (errorCode === "REQUEST_TIMEOUT") {
    return 504;
  }

  if (errorCode === "INSTAGRAM_PROVIDER_NOT_INSTALLED") {
    return 503;
  }

  if (errorCode === "INSTAGRAM_PROVIDER_UNAVAILABLE") {
    return 503;
  }

  if (errorCode === "INSTAGRAM_LOGIN_REQUIRED") {
    return 403;
  }

  if (errorCode === "INSTAGRAM_UPSTREAM_BLOCKED") {
    return 403;
  }

  return 502;
}
