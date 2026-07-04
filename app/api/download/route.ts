import { NextResponse } from "next/server";
import {
  ClipnexoApiError,
  getClipnexoApiErrorStatus,
  getFriendlyClipnexoApiError,
  getClipnexoApiBaseUrl,
  isLocalOrPrivateHostname,
} from "@/lib/clipnexo-api";

const MAX_REQUEST_BYTES = 10 * 1024;
const DEFAULT_TIMEOUT_MS = 30_000;
const SUPPORTED_TIKTOK_HOSTS = ["tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"];

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;

  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  return matches ? Array.from(new Set(matches)) : [];
}

function isValidTikTokUrl(url: string): boolean {
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
          error: "Debes enviar un enlace de TikTok",
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const upstreamResponse = await fetch(getUpstreamInfoEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    const data = await readJsonSafely(upstreamResponse);
    clearTimeout(timeoutId);

    if (!upstreamResponse.ok || !data || data.success === false) {
      throw new ClipnexoApiError(
        data?.error || "No se pudo obtener información del video",
        data?.errorCode || "VIDEO_INFO_FAILED",
        upstreamResponse.status
      );
    }

    const title = data.title?.trim() || "";

    return NextResponse.json({
      ...data,
      message: "Información del video obtenida correctamente",
      description: title,
      desc: title,
      cover: data.thumbnail || null,
      image: data.thumbnail || null,
      hashtags: extractHashtags(title),
      raw: {
        title,
        uploader: data.uploader || null,
        webpage_url: data.webpage_url || null,
        extractor: data.extractor || null,
      },
    });
  } catch (error) {
    console.error("DOWNLOAD API ERROR:", error);

    if (error instanceof ClipnexoApiError) {
      return NextResponse.json(
        {
          success: false,
          error: getFriendlyClipnexoApiError(error),
          errorCode: error.code,
        },
        { status: getClipnexoApiErrorStatus(error) }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Ocurrió un error interno al procesar la descarga",
        errorCode: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
