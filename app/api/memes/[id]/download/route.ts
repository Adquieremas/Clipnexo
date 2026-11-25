import { NextResponse } from "next/server";
import { MEMES } from "@/lib/memes-data";

type RouteParams = { params: Promise<{ id: string }> };

const MEME_BY_ID = new Map(MEMES.map((m) => [m.id, m]));

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const meme = MEME_BY_ID.get(id);
  if (!meme) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }

  const url = `https://media.clipnexo.com/${meme.r2Key}`;
  const upstream = await fetch(url);
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Unable to fetch meme" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${meme.id}.mp4"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
