import { getPagesSitemapXml } from "@/lib/sitemap-data";

export function GET() {
  return new Response(getPagesSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
