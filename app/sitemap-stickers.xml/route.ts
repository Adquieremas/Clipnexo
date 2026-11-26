import { getStickersSitemapXml } from "@/lib/sitemap-data";

export function GET() {
  return new Response(getStickersSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
