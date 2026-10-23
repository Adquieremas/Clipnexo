import { getBlogSitemapXml } from "@/lib/sitemap-data";

export function GET() {
  return new Response(getBlogSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
