import { NextResponse } from "next/server";
import { parseInstagramUrl } from "@/lib/instagram-metadata";
import { getInstagramErrorStatus, proxyInstagramInfoRequest } from "@/lib/clipnexo-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 10 * 1024;

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;
  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
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

  try {
    const backendResponse = await proxyInstagramInfoRequest(parsed.url);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => null);
      return NextResponse.json(
        errorData || { success: false, error: "No se pudo obtener la información de Instagram.", errorCode: "INSTAGRAM_PROVIDERS_FAILED" },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[instagram/info] Proxy error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      {
        success: false,
        error: "Servicio temporalmente no disponible. Inténtalo nuevamente en unos minutos.",
        errorCode: "INSTAGRAM_PROVIDERS_FAILED",
      },
      { status: 502 }
    );
  }
}
