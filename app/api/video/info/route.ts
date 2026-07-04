import { NextResponse } from "next/server";
import { getClipnexoApiBaseUrl, isLocalOrPrivateHostname } from "@/lib/clipnexo-api";
import { getTikTokInfoWithFallback } from "@/lib/tiktok-metadata";

const MAX_REQUEST_BYTES = 10 * 1024;
const DEFAULT_TIMEOUT_MS = 30_000;
const SUPPORTED_TIKTOK_HOSTS = ["tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"];

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;

  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

function isValidTikTokUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    if (parsed.username || parsed.password || isLocalOrPrivateHostname(parsed.hostname)) return false;

    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return SUPPORTED_TIKTOK_HOSTS.includes(hostname);
  } catch {
    return false;
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

export async function POST(req: Request) {
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

    if (!isValidTikTokUrl(url)) {
      return NextResponse.json(
        {
          success: false,
          error: "El enlace enviado no es válido o no pertenece a TikTok",
          errorCode: "INVALID_TIKTOK_URL",
        },
        { status: 400 }
      );
    }

    const endpoint = getUpstreamInfoEndpoint();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    logProxyDebug("video info request", {
      endpoint,
      url,
      envSource: process.env.NEXT_PUBLIC_CLIPNEXO_API_URL ? "env" : "fallback",
    });

    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    const upstreamBody = await readJsonSafely(upstreamResponse);

    logProxyDebug("video info upstream response", {
      endpoint,
      status: upstreamResponse.status,
      body: upstreamBody,
    });

    clearTimeout(timeoutId);

    if (!upstreamResponse.ok || !upstreamBody || upstreamBody.success === false) {
      const fallbackResult = await getTikTokInfoWithFallback(url, DEFAULT_TIMEOUT_MS);
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
                  status: upstreamResponse.status,
                  upstreamBody,
                  fallback: fallbackResult.details,
                }
              : undefined,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(upstreamBody);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          success: false,
          error: "La solicitud de metadatos tardó demasiado",
          errorCode: "REQUEST_TIMEOUT",
          debug:
            process.env.NODE_ENV !== "production"
              ? { endpoint: getUpstreamInfoEndpoint(), timeoutMs: DEFAULT_TIMEOUT_MS }
              : undefined,
        },
        { status: 504 }
      );
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
