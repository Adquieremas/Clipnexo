import { NextRequest, NextResponse } from "next/server";
import {
  getLocalizedRoute,
  getRouteKeyFromPath,
  normalizeLang,
  type RouteKey,
} from "@/lib/routes";

const PUBLIC_FILE = /\.(.*)$/;

const INTERNAL_ROUTE_SEGMENTS: Partial<Record<RouteKey, string>> = {
  video: "/descargar-tiktok",
  mp3: "/descargar-tiktok-mp3",
  guide: "/como-descargar-videos-de-tiktok",
  withoutWatermark: "/descargar-tiktok-sin-marca",
};

function buildInternalPath(routeKey: RouteKey, lang: string) {
  const segment = INTERNAL_ROUTE_SEGMENTS[routeKey];
  if (!segment) return null;

  return `/${normalizeLang(lang)}${segment}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  const lang = normalizeLang(pathname.split("/")[1] || "es");
  const legacyWithoutWatermarkPath = `/${lang}/descargar-tiktok-sin-marca`;
  const translatedWithoutWatermarkPath = getLocalizedRoute("withoutWatermark", lang);

  if (
    pathname === legacyWithoutWatermarkPath &&
    pathname !== translatedWithoutWatermarkPath
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = translatedWithoutWatermarkPath;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const routeKey = getRouteKeyFromPath(pathname);

  const rewriteTarget = routeKey ? buildInternalPath(routeKey, lang) : null;

  if (rewriteTarget && rewriteTarget !== pathname) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = rewriteTarget;

    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("x-lang", lang);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  response.headers.set("x-lang", lang);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};