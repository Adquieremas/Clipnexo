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
  /** Override the canonical path when the page isn't the routeKey's own base path (e.g. a dynamic slug page). */
  canonicalPath?: string;
  /** Override the hreflang alternate paths, keyed by language, when they differ from the routeKey's base path. */
  languagePaths?: { es: string; en: string; pt: string };
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
  canonicalPath,
  languagePaths,
}: BuildSeoMetadataOptions): Metadata {
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getAbsoluteUrl(canonicalPath ?? getLocalizedRoute(routeKey, currentLang));
  const locale = currentLang === "es" ? "es_ES" : currentLang === "pt" ? "pt_BR" : "en_US";
  const languages = languagePaths
    ? {
        es: getAbsoluteUrl(languagePaths.es),
        en: getAbsoluteUrl(languagePaths.en),
        pt: getAbsoluteUrl(languagePaths.pt),
        "x-default": getAbsoluteUrl(languagePaths.es),
      }
    : getSeoLanguages(routeKey);

  return {
    metadataBase,
    title,
    description,
    robots,
    alternates: {
      canonical: canonicalUrl,
      languages,
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
