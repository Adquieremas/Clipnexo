import { getSoundsSitemapXml } from "@/lib/sitemap-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await getSoundsSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
