import { getMemesSitemapXml } from "@/lib/sitemap-data";

export function GET() {
  return new Response(getMemesSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
