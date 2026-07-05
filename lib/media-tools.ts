import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

let cachedFfmpegPath: string | null | undefined;

function getFfmpegCandidates() {
  return [
    process.env.FFMPEG_PATH,
    "/opt/homebrew/bin/ffmpeg",
    "/usr/local/bin/ffmpeg",
    "/usr/bin/ffmpeg",
    "ffmpeg",
  ].filter((value): value is string => Boolean(value?.trim()));
}

export async function getFfmpegPath() {
  if (cachedFfmpegPath !== undefined) return cachedFfmpegPath;

  for (const command of getFfmpegCandidates()) {
    if (command !== "ffmpeg" && !existsSync(command)) continue;

    try {
      await execFileAsync(command, ["-version"], { timeout: 5_000, maxBuffer: 1024 * 256 });
      cachedFfmpegPath = command;
      return cachedFfmpegPath;
    } catch {}
  }

  cachedFfmpegPath = null;
  return cachedFfmpegPath;
}

export async function isFfmpegAvailable() {
  return Boolean(await getFfmpegPath());
}
