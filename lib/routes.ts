export type SupportedLang = "es" | "en" | "pt";

export type RouteKey =
  | "home"
  | "video"
  | "mp3"
  | "guide"
  | "withoutWatermark"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "dmca";

export const localizedRoutes: Record<RouteKey, Record<SupportedLang, string>> = {
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
  about: {
    es: "/es/acerca-de",
    en: "/en/acerca-de",
    pt: "/pt/acerca-de",
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
  const normalizedPath = pathname.trim().toLowerCase().replace(/\/$/, "") || "/";

  for (const routeKey of Object.keys(localizedRoutes) as RouteKey[]) {
    const routesByLang = localizedRoutes[routeKey];

    for (const lang of Object.keys(routesByLang) as SupportedLang[]) {
      const candidate = routesByLang[lang].replace(/\/$/, "") || "/";

      if (candidate === normalizedPath) {
        return routeKey;
      }
    }
  }

  return null;
}
