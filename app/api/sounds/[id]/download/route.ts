import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponseInit } from "@/lib/rate-limit";
import { getSoundAudioUrl, getSoundById, incrementSoundStat } from "@/lib/sounds-db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rate = checkRateLimit(request, {
    key: "sound-download",
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.allowed) {
    return NextResponse.json({ error: "rate_limited" }, rateLimitResponseInit(rate));
  }

  const sound = await getSoundById(id);
  if (!sound) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  await incrementSoundStat(id, "download_count");

  // Stream the file through this same-origin route (instead of redirecting
  // to media.clipnexo.com) so the `download` attribute on the client actually
  // forces a save-to-disk instead of being dropped on a cross-origin hop.
  const upstream = await fetch(getSoundAudioUrl(sound.r2_key));
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }

  const extension = sound.r2_key.split(".").pop() || "mp3";
  const safeFilename = sound.id.replace(/[^a-zA-Z0-9-_]/g, "") || "sound";

  const headers = new Headers();
  headers.set("Content-Type", sound.mime_type || "audio/mpeg");
  headers.set("Content-Disposition", `attachment; filename="${safeFilename}.${extension}"`);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("Cache-Control", "private, no-store");

  return new NextResponse(upstream.body, { status: 200, headers });
}
