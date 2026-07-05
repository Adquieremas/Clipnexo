import { NextResponse } from "next/server";
import { proxyInstagramDownloadRequest } from "@/lib/clipnexo-api";

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
  if (!body) {
    return NextResponse.json(
      { success: false, error: "Cuerpo JSON invalido.", errorCode: "INVALID_JSON" },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await proxyInstagramDownloadRequest(body);

    const contentType = backendResponse.headers.get("content-type") || "";

    if (contentType.includes("video/mp4") || contentType.includes("audio/mpeg") || contentType.includes("application/octet-stream")) {
      const contentDisposition = backendResponse.headers.get("content-disposition");
      const headers = new Headers({
        "Content-Type": contentType.includes("audio/") ? "audio/mpeg" : "video/mp4",
        "Cache-Control": "no-store",
      });
      if (contentDisposition) {
        headers.set("Content-Disposition", contentDisposition);
      }

      const blob = await backendResponse.arrayBuffer();
      return new Response(new Uint8Array(blob), {
        status: backendResponse.status,
        headers,
      });
    }

    const data = await backendResponse.json().catch(() => null);
    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, error: "No se pudo procesar la descarga.", errorCode: "DOWNLOAD_FAILED" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[instagram/download] Proxy error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      {
        success: false,
        error: "Servicio temporalmente no disponible. Inténtalo nuevamente en unos minutos.",
        errorCode: "DOWNLOAD_FAILED",
      },
      { status: 502 }
    );
  }
}
