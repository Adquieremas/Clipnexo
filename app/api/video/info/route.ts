import { NextResponse } from "next/server";
import { getClipnexoApiBaseUrl, isLocalOrPrivateHostname } from "@/lib/clipnexo-api";
import { getTikTokInfoWithFallback } from "@/lib/tiktok-metadata";

const MAX_REQUEST_BYTES = 10 * 1024;
const DEFAULT_TIMEOUT_MS = 20_000;
const UPSTREAM_TIMEOUT_MS = 12_000;
const SHORT_REDIRECT_TIMEOUT_MS = 4_000;
const SUPPORTED_TIKTOK_HOSTS = ["tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"];
const UNSUPPORTED_TIKTOK_PHOTO_ERROR =
  "Por ahora Clipnexo solo admite videos de TikTok. Las publicaciones de fotos o carruseles aún no están disponibles.";
const REQUEST_TIMEOUT_ERROR =
  "TikTok tardó demasiado en responder. Intenta con otro enlace de video.";

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;

  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

function parseValidTikTokUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    if (parsed.username || parsed.password || isLocalOrPrivateHostname(parsed.hostname)) return null;

    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return SUPPORTED_TIKTOK_HOSTS.includes(hostname) ? parsed : null;
  } catch {
    return null;
  }
}

function getUpstreamInfoEndpoint() {
  return `${getClipnexoApiBaseUrl().replace(/\/+$/, "")}/api/video/info`;
}

async function readJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function logProxyDebug(message: string, detail: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") return;
  console.info(`[clipnexo-proxy] ${message}`, detail);
}

function getNormalizedTikTokHostname(url: URL) {
  return url.hostname.replace(/^www\./, "").toLowerCase();
}

function isSupportedTikTokHost(url: URL) {
  return SUPPORTED_TIKTOK_HOSTS.includes(getNormalizedTikTokHostname(url));
}

function isShortTikTokUrl(url: URL) {
  const hostname = getNormalizedTikTokHostname(url);
  return hostname === "vm.tiktok.com" || hostname === "vt.tiktok.com";
}

function hasUnsupportedTikTokPath(url: URL) {
  const pathname = url.pathname.toLowerCase();

  if (
    pathname.includes("/photo/") ||
    pathname.includes("/tag/") ||
    pathname.includes("/music/")
  ) {
    return true;
  }

  return !pathname.includes("/video/") && !isShortTikTokUrl(url);
}

function unsupportedTikTokPhotoResponse() {
  return NextResponse.json(
    {
      success: false,
      error: UNSUPPORTED_TIKTOK_PHOTO_ERROR,
      errorCode: "UNSUPPORTED_TIKTOK_PHOTO",
    },
    { status: 400 }
  );
}

function requestTimeoutResponse(timeoutMs: number) {
  return NextResponse.json(
    {
      success: false,
      error: REQUEST_TIMEOUT_ERROR,
      errorCode: "REQUEST_TIMEOUT",
      debug:
        process.env.NODE_ENV !== "production"
          ? { endpoint: getUpstreamInfoEndpoint(), timeoutMs }
          : undefined,
    },
    { status: 504 }
  );
}

function getRemainingTimeoutMs(startedAt: number) {
  return Math.max(0, DEFAULT_TIMEOUT_MS - (Date.now() - startedAt));
}

async function resolveTikTokRedirect(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    return response.url ? new URL(response.url) : null;
  } catch (error) {
    logProxyDebug("short TikTok redirect resolution failed", {
      url,
      timeoutMs,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(req: Request) {
  const startedAt = Date.now();

  try {
    if (isRequestTooLarge(req)) {
      return NextResponse.json(
        {
          success: false,
          error: "El cuerpo de la solicitud es demasiado grande",
          errorCode: "REQUEST_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    const body = await req.json().catch(() => null);
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes enviar un enlace válido",
          errorCode: "EMPTY_URL",
        },
        { status: 400 }
      );
    }

    let parsedUrl = parseValidTikTokUrl(url);
    if (!parsedUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "El enlace enviado no es válido o no pertenece a TikTok",
          errorCode: "INVALID_TIKTOK_URL",
        },
        { status: 400 }
      );
    }

    if (isShortTikTokUrl(parsedUrl)) {
      const redirectTimeoutMs = Math.min(SHORT_REDIRECT_TIMEOUT_MS, getRemainingTimeoutMs(startedAt));
      if (redirectTimeoutMs > 0) {
        const redirectedUrl = await resolveTikTokRedirect(parsedUrl.toString(), redirectTimeoutMs);

        if (redirectedUrl && isSupportedTikTokHost(redirectedUrl)) {
          parsedUrl = redirectedUrl;
        }
      }
    }

    if (hasUnsupportedTikTokPath(parsedUrl)) {
      return unsupportedTikTokPhotoResponse();
    }

    const safeUrl = parsedUrl.toString();
    const endpoint = getUpstreamInfoEndpoint();
    const upstreamTimeoutMs = Math.min(UPSTREAM_TIMEOUT_MS, getRemainingTimeoutMs(startedAt));
    if (upstreamTimeoutMs <= 0) {
      return requestTimeoutResponse(DEFAULT_TIMEOUT_MS);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), upstreamTimeoutMs);

    logProxyDebug("video info request", {
      endpoint,
      url: safeUrl,
      envSource: process.env.NEXT_PUBLIC_CLIPNEXO_API_URL ? "env" : "fallback",
    });

    let upstreamResponse: Response | null = null;
    let upstreamBody: Awaited<ReturnType<typeof readJsonSafely>>;
    let upstreamError: unknown = null;

    try {
      upstreamResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: safeUrl }),
        signal: controller.signal,
      });

      upstreamBody = await readJsonSafely(upstreamResponse);

      logProxyDebug("video info upstream response", {
        endpoint,
        status: upstreamResponse.status,
        body: upstreamBody,
      });
    } catch (error) {
      upstreamError = error;
      logProxyDebug("video info upstream failed", {
        endpoint,
        timeoutMs: upstreamTimeoutMs,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!upstreamResponse || !upstreamResponse.ok || !upstreamBody || upstreamBody.success === false) {
      const remainingTimeoutMs = getRemainingTimeoutMs(startedAt);
      if (remainingTimeoutMs <= 0) {
        return requestTimeoutResponse(DEFAULT_TIMEOUT_MS);
      }

      const fallbackResult = await getTikTokInfoWithFallback(safeUrl, remainingTimeoutMs);
      if (fallbackResult.success) {
        return NextResponse.json(fallbackResult);
      }

      return NextResponse.json(
        {
          success: false,
          error: fallbackResult.error,
          errorCode: fallbackResult.errorCode,
          details: fallbackResult.details,
          debug:
            process.env.NODE_ENV !== "production"
              ? {
                  endpoint,
                  status: upstreamResponse?.status,
                  upstreamBody,
                  upstreamError: upstreamError instanceof Error ? upstreamError.message : upstreamError,
                  fallback: fallbackResult.details,
                }
              : undefined,
        },
        { status: fallbackResult.errorCode === "REQUEST_TIMEOUT" ? 504 : 502 }
      );
    }

    return NextResponse.json(upstreamBody);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return requestTimeoutResponse(DEFAULT_TIMEOUT_MS);
    }

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo obtener información del video",
        errorCode: "VIDEO_INFO_FAILED",
        debug:
          process.env.NODE_ENV !== "production"
            ? {
                endpoint: getUpstreamInfoEndpoint(),
                error: error instanceof Error ? error.message : String(error),
              }
            : undefined,
      },
      { status: 502 }
    );
  }
}
