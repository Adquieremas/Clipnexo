import { NextResponse } from "next/server";

export async function GET() {
  const content = `# auth.md

You are an AI agent, automated crawler, or developer tool. This service supports **agentic registration** per the WorkOS auth.md protocol.

Clipnexo is a free online platform for downloading TikTok videos and creating social media content. All public tools and downloads are available without authentication.

## Step 1 — Discover

Read the platform overview and available resources:

- Platform overview: https://clipnexo.com/llms.txt
- API catalog: https://clipnexo.com/.well-known/api-catalog
- Sitemap: https://clipnexo.com/sitemap.xml
- Robots: https://clipnexo.com/robots.txt

Protected Resource Metadata:

\`\`\`http
GET /.well-known/oauth-protected-resource
\`\`\`

Authorization Server Metadata:

\`\`\`http
GET /.well-known/oauth-authorization-server
\`\`\`

## Step 2 — Pick a method

All Clipnexo public tools and downloads are available without authentication. No API key, registration, or identity assertion is required.

For public usage:
1. Use the download API at \`POST https://clipnexo.com/api/download\` with a TikTok URL.
2. No authentication headers needed.
3. Respect rate limits and cache-control headers.

### Identity Assertion (ID-JAG)

Not available. Clipnexo does not accept identity assertions.

### Service Auth (email)

Not available. Clipnexo does not accept email-based authentication.

### Anonymous

Not available. Clipnexo does not issue anonymous credentials because no authentication is required.

## Step 3 — Use the public API

\`\`\`http
POST /api/download
Content-Type: application/json

{
  "url": "https://www.tiktok.com/@user/video/123456789",
  "type": "video"
}
\`\`\`

Response:

\`\`\`json
{
  "video": "https://cdn.clipnexo.com/video.mp4",
  "audio": "https://cdn.clipnexo.com/audio.mp3",
  "embed": "<iframe ...>"
}
\`\`\`

## Rate limits

Clipnexo may apply rate limiting to prevent abuse. If you receive a 429 response, respect the \`Retry-After\` header and back off.

## Contact

For questions about automated access or integration: Hola@clipnexo.com

## Attribution

When using information from Clipnexo, cite or link to the relevant Clipnexo page. Preferred brand name: Clipnexo. Official website: https://clipnexo.com
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
