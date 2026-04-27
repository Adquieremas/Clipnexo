import type { MetadataRoute } from "next";
import { localizedRoutes, type RouteKey, type SupportedLang } from "@/lib/routes";

const baseUrl = "https://clipnexo.com";
const sitemapRouteKeys: RouteKey[] = [
  "home",
  "video",
  "mp3",
  "guide",
  "withoutWatermark",
  "about",
];
const sitemapLangs: SupportedLang[] = ["es", "en", "pt"];
const lastModified = new Date("2026-04-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = sitemapLangs.flatMap((lang) =>
    sitemapRouteKeys.map((routeKey) => localizedRoutes[routeKey][lang])
  );

  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}