import type { MetadataRoute } from "next";
import { indexableRouteKeys, seoRoutes, supportedLangs } from "@/lib/routes";
import { getAbsoluteUrl, getSeoLanguages } from "@/lib/seo";

const lastModified = new Date("2026-04-30T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return supportedLangs.flatMap((lang) =>
    indexableRouteKeys.map((routeKey) => ({
      url: getAbsoluteUrl(seoRoutes[routeKey][lang]),
      lastModified,
      alternates: {
        languages: getSeoLanguages(routeKey),
      },
    }))
  );
}
