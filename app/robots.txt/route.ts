import { getAbsoluteUrl } from "@/lib/seo";

export async function GET() {
  const content = `User-Agent: *
Allow: /

Sitemap: ${getAbsoluteUrl("/sitemap.xml")}
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
