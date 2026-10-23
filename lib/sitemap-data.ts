import type { MetadataRoute } from "next";
import {
  indexableRouteKeys,
  seoRoutes,
  supportedLangs,
  type RouteKey,
  type SupportedLang,
} from "@/lib/routes";
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
    case "studentsTools":
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

function getLanguageOrder(url: string): number {
  const pathname = new URL(url).pathname;
  return supportedLangs.findIndex(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
}

function getStaticRoutes(): MetadataRoute.Sitemap {
  return supportedLangs
    .flatMap((lang) =>
      indexableRouteKeys.map((routeKey) => ({
        url: getAbsoluteUrl(seoRoutes[routeKey][lang]),
        lastModified: defaultLastModified,
        changeFrequency: getChangeFrequency(routeKey),
        priority: getPriority(routeKey),
        alternates: {
          languages: getSeoLanguages(routeKey),
        },
      }))
    )
    .sort((a, b) => {
      const languageDifference = getLanguageOrder(a.url) - getLanguageOrder(b.url);
      if (languageDifference !== 0) {
        return languageDifference;
      }

      return a.url < b.url ? -1 : a.url > b.url ? 1 : 0;
    });
}

function getBlogRoutes(): MetadataRoute.Sitemap {
  return blogPosts
    .flatMap((post) =>
      (supportedLangs as SupportedLang[]).map((lang) => {
        const alternates: Record<string, string> = {};
        for (const currentLang of supportedLangs as SupportedLang[]) {
          alternates[currentLang] = getAbsoluteUrl(
            `/${currentLang}/blog/${post.slugs[currentLang]}`
          );
        }
        alternates["x-default"] = getAbsoluteUrl(`/es/blog/${post.slugs.es}`);

        return {
          url: getAbsoluteUrl(`/${lang}/blog/${post.slugs[lang]}`),
          lastModified: new Date(post.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: { languages: alternates },
        };
      })
    )
    .sort((a, b) => {
      const languageDifference = getLanguageOrder(a.url) - getLanguageOrder(b.url);
      if (languageDifference !== 0) {
        return languageDifference;
      }

      return a.url < b.url ? -1 : a.url > b.url ? 1 : 0;
    });
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });
}

function serializeUrlSet(entries: MetadataRoute.Sitemap): string {
  const urls = entries.map((entry) => {
    const lines = ["  <url>", `    <loc>${escapeXml(entry.url)}</loc>`];

    if (entry.lastModified) {
      const lastModified =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      lines.push(`    <lastmod>${escapeXml(lastModified)}</lastmod>`);
    }
    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
    }
    if (entry.priority !== undefined) {
      lines.push(`    <priority>${entry.priority}</priority>`);
    }
    for (const [lang, href] of Object.entries(entry.alternates?.languages ?? {})) {
      if (!href) continue;
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`
      );
    }

    lines.push("  </url>");
    return lines.join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

export function getSitemapIndexXml(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${escapeXml(getAbsoluteUrl("/sitemap-pages.xml"))}</loc></sitemap>`,
    `  <sitemap><loc>${escapeXml(getAbsoluteUrl("/sitemap-blog.xml"))}</loc></sitemap>`,
    "</sitemapindex>",
    "",
  ].join("\n");
}

export function getPagesSitemapXml(): string {
  return serializeUrlSet(getStaticRoutes());
}

export function getBlogSitemapXml(): string {
  return serializeUrlSet(getBlogRoutes());
}
