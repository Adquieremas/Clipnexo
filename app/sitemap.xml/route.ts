import { getSitemapIndexXml } from "@/lib/sitemap-data";

export function GET() {
  return new Response(getSitemapIndexXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
