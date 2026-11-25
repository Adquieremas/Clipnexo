import { NextRequest, NextResponse } from "next/server";
import { EMOJIS, getEmojiUrl } from "@/lib/emojis-data";

const EMOJI_BY_ID = new Map(EMOJIS.map((e) => [e.id, e]));

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const emoji = EMOJI_BY_ID.get(id);
  if (!emoji) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const upstream = await fetch(getEmojiUrl(emoji.r2Key));
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "image/png");
  headers.set("Content-Disposition", `attachment; filename="${emoji.id}.png"`);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new NextResponse(upstream.body, { status: 200, headers });
}
