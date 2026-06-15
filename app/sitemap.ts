import type { MetadataRoute } from "next";
import { indexableRouteKeys, seoRoutes, supportedLangs, type RouteKey, type SupportedLang } from "@/lib/routes";
import { getAbsoluteUrl, getSeoLanguages } from "@/lib/seo";
import { blogPosts } from "@/lib/blog-content";

const defaultLastModified = new Date("2026-06-02T00:00:00.000Z");

function getPriority(routeKey: RouteKey): number {
  switch (routeKey) {
    case "home":
      return 1.0;
    case "video":
    case "mp3":
    case "withoutWatermark":
      return 0.95;
    case "tools":
      return 0.9;
    case "tiktokTools":
    case "youtubeTools":
    case "instagramTools":
    case "facebookTools":
    case "shortVideoTools":
    case "socialMediaTools":
      return 0.85;
    case "blog":
      return 0.7;
    case "about":
    case "privacy":
    case "terms":
    case "dmca":
    case "contact":
      return 0.5;
    default:
      return 0.8;
  }
}

function getChangeFrequency(routeKey: RouteKey): "weekly" | "monthly" | "yearly" {
  if (["privacy", "terms", "dmca"].includes(routeKey)) {
    return "yearly";
  }
  return "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = supportedLangs.flatMap((lang) =>
    indexableRouteKeys.map((routeKey) => ({
      url: getAbsoluteUrl(seoRoutes[routeKey][lang]),
      lastModified: defaultLastModified,
      changeFrequency: getChangeFrequency(routeKey),
      priority: getPriority(routeKey),
      alternates: {
        languages: getSeoLanguages(routeKey),
      },
    }))
  );

  const blogRoutes = blogPosts.flatMap((post) =>
    (supportedLangs as SupportedLang[]).map((lang) => {
      const slug = post.slugs[lang];
      const url = getAbsoluteUrl(`/${lang}/blog/${slug}`);
      const alternates: Record<string, string> = {};
      for (const l of supportedLangs as SupportedLang[]) {
        alternates[l] = getAbsoluteUrl(`/${l}/blog/${post.slugs[l]}`);
      }
      alternates["x-default"] = getAbsoluteUrl(`/es/blog/${post.slugs.es}`);

      return {
        url,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: { languages: alternates },
      };
    })
  );

  return [...staticRoutes, ...blogRoutes];
}
