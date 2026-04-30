export type SupportedLang = "es" | "en" | "pt";

export type RouteKey =
  | "home"
  | "video"
  | "mp3"
  | "guide"
  | "withoutWatermark"
  | "tiktokBio"
  | "tiktokIdeas"
  | "tiktokHooks"
  | "tiktokCaptions"
  | "tiktokHashtags"
  | "shortVideoTitleHashtag"
  | "about"
  | "blog"
  | "contact"
  | "privacy"
  | "terms"
  | "dmca";

const TRAILING_SLASH_REGEX = /\/$/;

export const supportedLangs: readonly SupportedLang[] = ["es", "en", "pt"];

export const localizedRoutes: Readonly<Record<RouteKey, Readonly<Record<SupportedLang, string>>>> = {
  home: {
    es: "/es",
    en: "/en",
    pt: "/pt",
  },
  video: {
    es: "/es/descargar-tiktok",
    en: "/en/tiktok-video-downloader",
    pt: "/pt/baixar-videos-do-tiktok",
  },
  mp3: {
    es: "/es/descargar-tiktok-mp3",
    en: "/en/tiktok-to-mp3",
    pt: "/pt/baixar-mp3-do-tiktok",
  },
  guide: {
    es: "/es/como-descargar-videos-de-tiktok",
    en: "/en/how-to-download-tiktok-videos",
    pt: "/pt/como-baixar-videos-do-tiktok",
  },
  withoutWatermark: {
    es: "/es/descargar-tiktok-sin-marca",
    en: "/en/download-tiktok-without-watermark",
    pt: "/pt/baixar-tiktok-sem-marca-dagua",
  },
  tiktokBio: {
    es: "/es/generador-bio-tiktok",
    en: "/en/tiktok-bio-generator",
    pt: "/pt/gerador-bio-tiktok",
  },
  tiktokIdeas: {
    es: "/es/ideas-para-tiktok",
    en: "/en/tiktok-video-ideas",
    pt: "/pt/ideias-para-tiktok",
  },
  tiktokHooks: {
    es: "/es/ganchos-virales-tiktok",
    en: "/en/tiktok-hook-generator",
    pt: "/pt/ganchos-virais-tiktok",
  },
  tiktokCaptions: {
    es: "/es/generador-captions-tiktok",
    en: "/en/tiktok-caption-generator",
    pt: "/pt/gerador-legendas-tiktok",
  },
  tiktokHashtags: {
    es: "/es/generador-hashtags-tiktok",
    en: "/en/tiktok-hashtag-generator",
    pt: "/pt/gerador-hashtags-tiktok",
  },
  shortVideoTitleHashtag: {
    es: "/es/generador-titulos-hashtags-videos-cortos",
    en: "/en/short-video-title-hashtag-generator",
    pt: "/pt/gerador-titulos-hashtags-videos-curtos",
  },
  about: {
    es: "/es/acerca-de",
    en: "/en/acerca-de",
    pt: "/pt/acerca-de",
  },
  blog: {
    es: "/es/blog",
    en: "/en/blog",
    pt: "/pt/blog",
  },
  contact: {
    es: "/es/contacto",
    en: "/en/contacto",
    pt: "/pt/contacto",
  },
  privacy: {
    es: "/es/politica-de-privacidad",
    en: "/en/politica-de-privacidad",
    pt: "/pt/politica-de-privacidad",
  },
  terms: {
    es: "/es/terminos-de-servicio",
    en: "/en/terminos-de-servicio",
    pt: "/pt/terminos-de-servicio",
  },
  dmca: {
    es: "/es/dmca",
    en: "/en/dmca",
    pt: "/pt/dmca",
  },
};

export const seoRoutes = localizedRoutes;

export const indexableRouteKeys: readonly RouteKey[] = [
  "home",
  "video",
  "mp3",
  "guide",
  "withoutWatermark",
  "tiktokBio",
  "tiktokIdeas",
  "tiktokHooks",
  "tiktokCaptions",
  "tiktokHashtags",
  "shortVideoTitleHashtag",
  "about",
];

function normalizePath(pathname: string): string {
  const normalized = pathname.trim().toLowerCase().replace(TRAILING_SLASH_REGEX, "");
  return normalized || "/";
}

export function normalizeLang(lang: string): SupportedLang {
  const normalized = lang.trim().toLowerCase();

  if (normalized === "en" || normalized === "pt") {
    return normalized;
  }

  return "es";
}

export function getLocalizedRoute(routeKey: RouteKey, lang: string): string {
  const currentLang = normalizeLang(lang);
  return localizedRoutes[routeKey][currentLang];
}

export function getAlternateRoutes(routeKey: RouteKey): Record<SupportedLang, string> {
  return localizedRoutes[routeKey];
}

export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const normalizedPath = normalizePath(pathname);

  for (const routeKey of Object.keys(localizedRoutes) as RouteKey[]) {
    const routesByLang = localizedRoutes[routeKey];

    for (const lang of Object.keys(routesByLang) as SupportedLang[]) {
      const candidate = normalizePath(routesByLang[lang]);

      if (candidate === normalizedPath) {
        return routeKey;
      }
    }
  }

  return null;
}
