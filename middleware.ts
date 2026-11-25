import { NextRequest, NextResponse } from "next/server";
import {
  getLocalizedRoute,
  getRouteKeyFromPath,
  normalizeLang,
  type RouteKey,
} from "@/lib/routes";

const PUBLIC_FILE = /\.(.*)$/;

const INTERNAL_ROUTE_SEGMENTS: Partial<Record<RouteKey, string>> = {
  tiktokBio: "/generador-bio-tiktok",
  tiktokIdeas: "/ideas-para-tiktok",
  tiktokHooks: "/ganchos-virales-tiktok",
  tiktokCaptions: "/generador-captions-tiktok",
  tiktokHashtags: "/generador-hashtags-tiktok",
  shortVideoTitleHashtag: "/generador-titulos-hashtags-videos-cortos",
  tools: "/herramientas",
  soundsLibrary: "/sonidos",
  emojiLibrary: "/emojis-gratis",
  memesLibrary: "/memes-gratis",
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
  tiktokTools: "/herramientas/tiktok",
  youtubeTools: "/herramientas/youtube",
  instagramTools: "/herramientas/instagram",
  facebookTools: "/herramientas/facebook",
  shortVideoTools: "/herramientas/videos-cortos",
  socialMediaTools: "/herramientas/redes-sociales",
  studentsTools: "/herramientas/estudiantes",
  wordCounter: "/contador-palabras-caracteres",
  caseConverter: "/convertidor-mayusculas-minusculas",
  outlineGenerator: "/generador-indice-trabajos",
  assignmentTitleGenerator: "/generador-titulos-trabajos",
  introductionGenerator: "/generador-introducciones",
  conclusionGenerator: "/generador-conclusiones",
  textSummarizer: "/resumidor-texto",
  textParaphraser: "/parafraseador-texto",
  apaCitationGenerator: "/generador-citas-apa",
  textCorrector: "/corrector-texto",
  pdfToText: "/pdf-a-texto",
  textToPdf: "/texto-a-pdf",
  pomodoroTimer: "/temporizador-pomodoro",
  gradeAverageCalculator: "/calculadora-promedio-notas",
  studyScheduleGenerator: "/generador-horario-estudio",
  usernameGenerator: "/generador-nombres-usuario",
  contentCalendarGenerator: "/generador-calendario-contenido",
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

// Permanently retired URLs (discontinued downloader feature). These return a
// real 410 Gone instead of bouncing to the homepage, so search engines treat
// them as intentionally removed rather than as a soft redirect loop.
const RETIRED_SEGMENTS = new Set<string>([
  "/descargar-tiktok",
  "/descargar-tiktok-mp3",
  "/descargar-tiktok-sin-marca",
  "/como-descargar-videos-de-tiktok",
  "/tiktok-video-downloader",
  "/tiktok-to-mp3",
  "/download-tiktok-without-watermark",
  "/how-to-download-tiktok-videos",
  "/baixar-videos-do-tiktok",
  "/baixar-mp3-do-tiktok",
  "/baixar-tiktok-sem-marca-dagua",
  "/como-baixar-videos-do-tiktok",
  "/descargar-instagram",
]);

function buildGoneResponse(lang: string) {
  const copy: Record<string, { title: string; text: string; tools: string; blog: string }> = {
    es: {
      title: "Esta página ya no está disponible",
      text: "La herramienta de descarga que buscabas fue retirada de Clipnexo. Explora nuestras herramientas gratuitas para creadores de contenido.",
      tools: "Ver herramientas",
      blog: "Ver blog",
    },
    en: {
      title: "This page is no longer available",
      text: "The download tool you're looking for was removed from Clipnexo. Explore our free tools for content creators.",
      tools: "View tools",
      blog: "View blog",
    },
    pt: {
      title: "Esta página não está mais disponível",
      text: "A ferramenta de download que você procurava foi removida do Clipnexo. Explore nossas ferramentas gratuitas para criadores de conteúdo.",
      tools: "Ver ferramentas",
      blog: "Ver blog",
    },
  };
  const t = copy[lang] || copy.es;
  const toolsPath = lang === "en" ? "/en/tools" : lang === "pt" ? "/pt/ferramentas" : "/es/herramientas";

  const html = `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><title>${t.title} | Clipnexo</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:80px auto;padding:0 20px;text-align:center;color:#111">
  <h1 style="font-size:28px;margin-bottom:12px">${t.title}</h1>
  <p style="color:#555;font-size:16px;line-height:1.6">${t.text}</p>
  <p style="margin-top:28px">
    <a href="${toolsPath}" style="margin-right:16px">${t.tools}</a>
    <a href="/${lang}/blog">${t.blog}</a>
  </p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 410,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

const HOMEPAGE_MARKDOWN = `# Clipnexo

Clipnexo is a free online platform of tools for content creators and video editors: generate hashtags, captions, bios, ideas, hooks and scripts for TikTok, YouTube, Instagram, Facebook, Reels and Shorts.

- Tools: https://clipnexo.com/es/herramientas
- Blog: https://clipnexo.com/es/blog

Full documentation: https://clipnexo.com/llms.txt
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware if this is an internal rewrite to avoid infinite loops
  if (request.headers.get("x-is-rewrite") === "true") {
    return NextResponse.next();
  }

  // Markdown for Agents — content negotiation
  if (request.headers.get("accept")?.includes("text/markdown")) {
    const isHomepage =
      pathname === "/" || pathname === "/es" || pathname === "/en" || pathname === "/pt";
    if (isHomepage) {
      const tokens = HOMEPAGE_MARKDOWN.split(/\s+/).length;
      return new NextResponse(HOMEPAGE_MARKDOWN, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": String(tokens),
        },
      });
    }
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/embed") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/auth.md" ||
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

  if (segments.length > 1) {
    const subPath = `/${segments.slice(1).join("/")}`;
    if (RETIRED_SEGMENTS.has(subPath)) {
      return buildGoneResponse(lang);
    }
  }

  if (segments.length === 1) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-lang", lang);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
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
      requestHeaders.set("x-lang", lang);

      const response = NextResponse.rewrite(rewriteUrl, {
        request: {
          headers: requestHeaders,
        },
      });
      response.headers.set("x-lang", lang);
      return response;
    }
  }

  // Per-language sound detail pages (/es/sonidos/[slug], /en/sounds/[slug],
  // /pt/sons/[slug]) share one internal folder (app/[lang]/sonidos/[slug]).
  // The generic routeKey rewrite above only matches the hub's own exact
  // path, so handle the extra slug segment explicitly here.
  const soundsCanonicalPrefix = getLocalizedRoute("soundsLibrary", lang);
  const soundsInternalPrefix = buildInternalPath("soundsLibrary", lang);

  if (soundsCanonicalPrefix && normalizedPathname.startsWith(`${soundsCanonicalPrefix}/`)) {
    if (soundsInternalPrefix && soundsInternalPrefix !== soundsCanonicalPrefix) {
      const rest = normalizedPathname.slice(soundsCanonicalPrefix.length);
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = `${soundsInternalPrefix}${rest}`;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-is-rewrite", "true");
      requestHeaders.set("x-lang", lang);

      const response = NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      });
      response.headers.set("x-lang", lang);
      return response;
    }
  } else if (
    soundsInternalPrefix &&
    soundsInternalPrefix !== soundsCanonicalPrefix &&
    normalizedPathname.startsWith(`${soundsInternalPrefix}/`)
  ) {
    const rest = normalizedPathname.slice(soundsInternalPrefix.length);
    return buildRedirectResponse(request, `${soundsCanonicalPrefix}${rest}`);
  }

  // Per-language meme detail pages (/es/memes-gratis/[slug], /en/free-memes/[slug],
  // /pt/memes-gratis/[slug]) share one internal folder (app/[lang]/memes-gratis/[slug]).
  const memesCanonicalPrefix = getLocalizedRoute("memesLibrary", lang);
  const memesInternalPrefix = buildInternalPath("memesLibrary", lang);

  if (memesCanonicalPrefix && normalizedPathname.startsWith(`${memesCanonicalPrefix}/`)) {
    if (memesInternalPrefix && memesInternalPrefix !== memesCanonicalPrefix) {
      const rest = normalizedPathname.slice(memesCanonicalPrefix.length);
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = `${memesInternalPrefix}${rest}`;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-is-rewrite", "true");
      requestHeaders.set("x-lang", lang);

      const response = NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      });
      response.headers.set("x-lang", lang);
      return response;
    }
  } else if (
    memesInternalPrefix &&
    memesInternalPrefix !== memesCanonicalPrefix &&
    normalizedPathname.startsWith(`${memesInternalPrefix}/`)
  ) {
    const rest = normalizedPathname.slice(memesInternalPrefix.length);
    return buildRedirectResponse(request, `${memesCanonicalPrefix}${rest}`);
  }

  const finalRequestHeaders = new Headers(request.headers);
  finalRequestHeaders.set("x-lang", lang);
  const response = NextResponse.next({
    request: {
      headers: finalRequestHeaders,
    },
  });

  response.headers.set("x-lang", lang);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
