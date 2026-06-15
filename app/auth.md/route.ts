import { NextResponse } from "next/server";

export async function GET() {
  const content = `# auth.md

Clipnexo is a free online platform for downloading TikTok videos and creating social media content.

## Agent audience

This auth.md is intended for AI agents, automated crawlers, and developer tools that need to interact with Clipnexo programmatically.

## Public access

All Clipnexo tools and downloads are available without authentication. No API key or registration is required to use the core functionality.

## Rate limiting

Clipnexo may apply rate limiting to prevent abuse. Respect the \`Retry-After\` header if you receive a 429 response.

## Contact

For questions about automated access or integration, contact: Hola@clipnexo.com
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
