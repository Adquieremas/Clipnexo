import type { MetadataRoute } from "next";
import { indexableRouteKeys, seoRoutes, supportedLangs, type RouteKey } from "@/lib/routes";
import { getAbsoluteUrl, getSeoLanguages } from "@/lib/seo";

const lastModified = new Date("2026-05-06T00:00:00.000Z");

function getPriority(routeKey: RouteKey): number {
  if (routeKey === "home") return 1.0;
  if (["video", "mp3", "withoutWatermark"].includes(routeKey)) return 0.95;
  if (routeKey === "tools") return 0.9;
  if (["about", "privacy", "terms", "dmca", "contact", "blog"].includes(routeKey)) return 0.5;
  return 0.8; // Default for tools
}

export default function sitemap(): MetadataRoute.Sitemap {
  return supportedLangs.flatMap((lang) =>
    indexableRouteKeys.map((routeKey) => ({
      url: getAbsoluteUrl(seoRoutes[routeKey][lang]),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: getPriority(routeKey),
      alternates: {
        languages: getSeoLanguages(routeKey),
      },
    }))
  );
}
