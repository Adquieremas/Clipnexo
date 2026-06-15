import { NextResponse } from "next/server";

export async function GET() {
  const content = `# auth.md

You are an AI agent, automated crawler, or developer tool. This service supports **agentic registration** per the WorkOS auth.md protocol.

Clipnexo is a free online platform for downloading TikTok videos and creating social media content. All public tools and downloads are available without authentication.

This document describes the complete registration flow. Follow the steps below.

## Step 1 — Discover

Fetch the Protected Resource Metadata:

\`\`\`http
GET /.well-known/oauth-protected-resource
\`\`\`

Fetch the Authorization Server Metadata:

\`\`\`http
GET /.well-known/oauth-authorization-server
\`\`\`

Read the platform overview:

\`\`\`http
GET /llms.txt
\`\`\`

## Step 2 — Pick a registration method

Clipnexo does not require authentication for any of its public tools and download APIs. No registration method is needed.

Supported identity types:
- **anonymous** — no identity assertion required; all resources are public

No credential is issued because no authentication is needed. The public API is accessible directly.

## Step 3 — Register

No registration is required. Skip to Step 4 to use the API.

If you were to register:

\`\`\`http
POST /agent/identity
Content-Type: application/json

{ "type": "anonymous" }
\`\`\`

Response (for public resources, no identity assertion is returned):

\`\`\`json
{
  "registration_id": "public",
  "registration_type": "anonymous",
  "identity_assertion": null,
  "pre_claim_scopes": ["public"]
}
\`\`\`

## Step 4 — Use the public API

All Clipnexo endpoints are accessible without an access token:

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
  "audio": "https://cdn.clipnexo.com/audio.mp3"
}
\`\`\`

No authorization header is required.

## Step 5 — Errors

| HTTP Status | Error Code | Meaning |
|-------------|------------|---------|
| 429 | rate_limited | Back off and respect Retry-After |
| 400 | invalid_request | Malformed request body |

Retry policy:
- 5xx — exponential backoff, retry the same request
- 4xx — do not retry the same payload; fix the input first
- 429 — respect Retry-After header, then retry

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
