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
  tiktokBio: "/generador-bio-tiktok",
  tiktokIdeas: "/ideas-para-tiktok",
  tiktokHooks: "/ganchos-virales-tiktok",
  tiktokCaptions: "/generador-captions-tiktok",
  tiktokHashtags: "/generador-hashtags-tiktok",
  shortVideoTitleHashtag: "/generador-titulos-hashtags-videos-cortos",
  tools: "/herramientas",
  socialMediaTextGenerator: "/crear-textos-redes-sociales",
  youtubeTagGenerator: "/generador-etiquetas-youtube",
  youtubeTagExtractor: "/extractor-etiquetas-youtube",
  youtubeHashtagGenerator: "/generador-hashtags-youtube",
  youtubeHashtagExtractor: "/extractor-hashtags-youtube",
  youtubeTitleGenerator: "/generador-titulos-youtube",
  youtubeTitleExtractor: "/extractor-titulos-youtube",
  youtubeTitleLengthChecker: "/comprobar-longitud-titulo-youtube",
  youtubeDescriptionGenerator: "/generador-descripciones-youtube",
  youtubeDescriptionExtractor: "/extractor-descripcion-youtube",
  youtubeTitleCapitalization: "/mayusculas-titulos-youtube",
  youtubeEmbedCodeGenerator: "/generador-codigo-insercion-youtube",
  youtubeTimestampLinkGenerator: "/generador-enlaces-tiempo-youtube",
  youtubeSubscribeLinkGenerator: "/generador-enlaces-suscripcion-youtube",
  youtubeThumbnailDownloader: "/descargar-miniaturas-youtube",
  youtubeMoneyCalculator: "/calculadora-dinero-youtube",
  youtubeViewRatioCalculator: "/calculadora-proporcion-vistas-youtube",
  instagramCaptionGenerator: "/generador-captions-instagram",
  instagramHashtagGenerator: "/generador-hashtags-instagram",
  instagramBioGenerator: "/generador-bio-instagram",
  instagramReelsIdeas: "/ideas-para-reels",
  instagramReelsHooks: "/ganchos-para-reels",
  facebookPostGenerator: "/generador-posts-facebook",
  facebookAdGenerator: "/generador-anuncios-facebook",
  marketplaceTextGenerator: "/generador-textos-marketplace",
  shortVideoScriptGenerator: "/generador-guiones-videos-cortos",
  socialMediaCharacterCounter: "/contador-caracteres-redes-sociales",
};

function buildInternalPath(routeKey: RouteKey, lang: string) {
  const segment = INTERNAL_ROUTE_SEGMENTS[routeKey];
  if (!segment) return null;

  return `/${normalizeLang(lang)}${segment}`;
}

function getRouteKeyFromInternalPath(pathname: string, lang: string): RouteKey | null {
  for (const routeKey of Object.keys(INTERNAL_ROUTE_SEGMENTS) as RouteKey[]) {
    if (buildInternalPath(routeKey, lang) === pathname) {
      return routeKey;
    }
  }

  return null;
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

  // Skip middleware if this is an internal rewrite to avoid infinite loops
  if (request.headers.get("x-is-rewrite") === "true") {
    return NextResponse.next();
  }

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

  if (normalizedPathname === "/share-target") {
    return NextResponse.next();
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

  const routeKey =
    getRouteKeyFromPath(normalizedPathname) ??
    getRouteKeyFromInternalPath(normalizedPathname, lang);

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

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-is-rewrite", "true");

      const response = NextResponse.rewrite(rewriteUrl, {
        request: {
          headers: requestHeaders,
        },
      });
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
