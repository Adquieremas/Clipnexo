import { NextResponse } from "next/server";

export async function GET() {
  const content = `# auth.md

You are an AI agent, automated crawler, or developer tool. This service supports **agentic registration** per the WorkOS auth.md protocol.

Clipnexo is a free online platform for downloading TikTok videos and creating social media content. All public tools and downloads are available without authentication.

## Discovery

1. Fetch Protected Resource Metadata:

   \`\`\`http
   GET /.well-known/oauth-protected-resource
   \`\`\`

2. Fetch Authorization Server Metadata:

   \`\`\`http
   GET /.well-known/oauth-authorization-server
   \`\`\`

3. Read the platform overview:

   \`\`\`http
   GET /llms.txt
   \`\`\`

## Registration

Clipnexo does not require authentication for any of its public tools and download APIs. Registration is not needed.

Available identity types: \`none\` — all resources are public.

## Using the API

\`\`\`http
POST /api/download
Content-Type: application/json

{
  "url": "https://www.tiktok.com/@user/video/123456789",
  "type": "video"
}
\`\`\`

No authorization header is required. The response includes the download URLs:

\`\`\`json
{
  "video": "https://cdn.clipnexo.com/video.mp4",
  "audio": "https://cdn.clipnexo.com/audio.mp3"
}
\`\`\`

## Credential use

No credentials are required. All API endpoints are accessible without authentication.

## Rate limits

If you receive a 429 response, respect the \`Retry-After\` header and back off before retrying.

## Contact

For questions about automated access or integration: Hola@clipnexo.com

## Attribution

Preferred brand name: Clipnexo. Official website: https://clipnexo.com
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
