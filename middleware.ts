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

function removeTrailingSlash(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function buildRedirectResponse(request: NextRequest, pathname: string) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname;
  return NextResponse.redirect(redirectUrl, 308);
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

  const normalizedPathname = removeTrailingSlash(pathname);

  if (normalizedPathname !== pathname) {
    return buildRedirectResponse(request, normalizedPathname);
  }

  if (normalizedPathname === "/") {
    return buildRedirectResponse(request, "/es");
  }

  const segments = normalizedPathname.split("/").filter(Boolean);
  const rawLang = segments[0] || "es";
  const lang = normalizeLang(rawLang);

  if (rawLang !== lang) {
    const correctedPath = `/${lang}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
    return buildRedirectResponse(request, correctedPath);
  }

  if (segments.length === 1) {
    const response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    response.headers.set("x-lang", lang);
    return response;
  }

  const routeKey = getRouteKeyFromPath(normalizedPathname);

  if (routeKey) {
    const canonicalVisiblePath = getLocalizedRoute(routeKey, lang);
    const internalPath = buildInternalPath(routeKey, lang);

    if (canonicalVisiblePath && normalizedPathname !== canonicalVisiblePath) {
      if (normalizedPathname === internalPath || normalizedPathname !== canonicalVisiblePath) {
        return buildRedirectResponse(request, canonicalVisiblePath);
      }
    }

    if (internalPath && normalizedPathname === canonicalVisiblePath && internalPath !== canonicalVisiblePath) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = internalPath;

      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set("x-lang", lang);
      return response;
    }
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