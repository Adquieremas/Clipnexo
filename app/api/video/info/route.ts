import { NextResponse } from "next/server";
import {
  ClipnexoApiError,
  fetchVideoInfoFromConfiguredApi,
  getClipnexoApiErrorStatus,
  getFriendlyClipnexoApiError,
} from "@/lib/clipnexo-api";

const MAX_REQUEST_BYTES = 10 * 1024;

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;

  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
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

    const body = await req.json();
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

    const data = await fetchVideoInfoFromConfiguredApi(url);
    return NextResponse.json(data);
  } catch (error) {
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
        error: "No se pudo obtener información del video",
        errorCode: "VIDEO_INFO_FAILED",
      },
      { status: 500 }
    );
  }
}
