import type { Metadata } from "next";
import {
  getAlternateRoutes,
  getLocalizedRoute,
  normalizeLang,
  type RouteKey,
} from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

type BuildSeoMetadataOptions = {
  title: string;
  description: string;
  routeKey: RouteKey;
  lang: string;
  robots?: Metadata["robots"];
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
};

export const metadataBase = new URL(SITE_URL);

export function getAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`;
}

export function getSeoLanguages(routeKey: RouteKey) {
  const routes = getAlternateRoutes(routeKey);

  return {
    es: getAbsoluteUrl(routes.es),
    en: getAbsoluteUrl(routes.en),
    pt: getAbsoluteUrl(routes.pt),
    "x-default": getAbsoluteUrl(routes.es),
  };
}

export function buildSeoMetadata({
  title,
  description,
  routeKey,
  lang,
  robots = {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph,
  twitter,
}: BuildSeoMetadataOptions): Metadata {
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getAbsoluteUrl(getLocalizedRoute(routeKey, currentLang));
  const locale = currentLang === "es" ? "es_ES" : currentLang === "pt" ? "pt_BR" : "en_US";

  return {
    metadataBase,
    title,
    description,
    robots,
    alternates: {
      canonical: canonicalUrl,
      languages: getSeoLanguages(routeKey),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Clipnexo",
      locale,
      type: "website",
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...twitter,
    },
  };
}
