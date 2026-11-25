import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponseInit } from "@/lib/rate-limit";
import { getSoundById, incrementSoundStat } from "@/lib/sounds-db";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rate = checkRateLimit(request, {
    key: "sound-play",
    limit: 60,
    windowMs: 60_000,
  });
  if (!rate.allowed) {
    return NextResponse.json({ error: "rate_limited" }, rateLimitResponseInit(rate));
  }

  const sound = await getSoundById(id);
  if (!sound) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  await incrementSoundStat(id, "play_count");
  return NextResponse.json({ ok: true });
}
