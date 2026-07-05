import { execFile } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { finished } from "node:stream/promises";
import { promisify } from "node:util";
import { NextResponse } from "next/server";
import { getFfmpegPath } from "@/lib/media-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 10 * 1024;
const DOWNLOAD_TIMEOUT_MS = 45_000;
const AUDIO_CONVERSION_TIMEOUT_MS = 60_000;
const MP4_CONVERSION_TIMEOUT_MS = 90_000;
const MIN_VIDEO_BYTES = 1024;
const execFileAsync = promisify(execFile);

type DownloadBody = Record<string, unknown>;

function isRequestTooLarge(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;
  const bytes = Number.parseInt(contentLength, 10);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function isInstagramPublicationUrl(value: string) {
  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const section = parsed.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
    return hostname === "instagram.com" && ["reel", "reels", "p", "tv"].includes(section || "");
  } catch {
    return false;
  }
}

function isLocalOrPrivateHost(hostname: string) {
  const normalized = hostname.toLowerCase();
  if (normalized === "localhost" || normalized.endsWith(".local")) return true;
  if (normalized === "127.0.0.1" || normalized === "::1") return true;
  if (normalized.startsWith("10.") || normalized.startsWith("192.168.")) return true;
  if (normalized.startsWith("172.")) {
    const b = Number(normalized.split(".")[1]);
    return b >= 16 && b <= 31;
  }
  return false;
}

function parseMediaUrl(value: string):
  | { ok: true; url: string }
  | { ok: false; status: number; errorCode: string; error: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      ok: false,
      status: 400,
      errorCode: "MISSING_DOWNLOAD_URL",
      error: "No se recibió una URL de descarga válida.",
    };
  }

  if (trimmed.startsWith("blob:")) {
    return {
      ok: false,
      status: 400,
      errorCode: "INVALID_DOWNLOAD_URL_BLOB",
      error: "La vista previa del navegador no puede usarse como enlace de descarga.",
    };
  }

  if (trimmed.startsWith("data:")) {
    return {
      ok: false,
      status: 400,
      errorCode: "INVALID_DOWNLOAD_URL_DATA",
      error: "La vista previa embebida no puede usarse como enlace de descarga.",
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      ok: false,
      status: 400,
      errorCode: "MISSING_DOWNLOAD_URL",
      error: "No se recibió una URL de descarga válida.",
    };
  }

  if (isInstagramPublicationUrl(trimmed)) {
    return {
      ok: false,
      status: 400,
      errorCode: "INVALID_DOWNLOAD_URL_INSTAGRAM_PAGE",
      error: "Se recibió la URL de la publicación, no la URL directa del archivo.",
    };
  }

  if (parsed.protocol !== "https:" || parsed.username || parsed.password || isLocalOrPrivateHost(parsed.hostname)) {
    return {
      ok: false,
      status: 400,
      errorCode: "MISSING_DOWNLOAD_URL",
      error: "No se recibió una URL de descarga válida.",
    };
  }

  return { ok: true, url: parsed.toString() };
}

function jsonDownloadError(errorCode: string, error: string, status = 400) {
  return NextResponse.json({ success: false, errorCode, error }, { status });
}

function sanitizeFilename(value: string): string {
  const cleaned = value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "clipnexo-instagram";
}

function getDownloadFilename(value: unknown, extension: "mp4" | "mp3") {
  const input = typeof value === "string" ? sanitizeFilename(value) : "";
  const fallback = `clipnexo-instagram.${extension}`;
  const filename = input || fallback;
  const withoutKnownExtension = filename.replace(/\.(?:mp4|mp3)$/i, "");
  return filename.toLowerCase().endsWith(`.${extension}`)
    ? filename
    : `${withoutKnownExtension}.${extension}`;
}

function hasMp4Signature(bytes: Uint8Array) {
  const maxOffset = Math.min(bytes.length - 4, 64);
  for (let index = 0; index <= maxOffset; index += 1) {
    if (
      bytes[index] === 0x66 &&
      bytes[index + 1] === 0x74 &&
      bytes[index + 2] === 0x79 &&
      bytes[index + 3] === 0x70
    ) {
      return true;
    }
  }
  return false;
}

function looksLikeBlockedText(bytes: Uint8Array) {
  const sample = new TextDecoder("utf-8", { fatal: false })
    .decode(bytes.slice(0, Math.min(bytes.length, 256)))
    .trimStart()
    .toLowerCase();

  return (
    sample.startsWith("<!doctype") ||
    sample.startsWith("<html") ||
    sample.startsWith("{") ||
    sample.startsWith("[") ||
    sample.includes("login") ||
    sample.includes("blocked") ||
    sample.includes("forbidden")
  );
}

function isAllowedVideoContentType(contentType: string) {
  const normalized = contentType.toLowerCase();
  return (
    normalized.includes("video/") ||
    normalized.includes("mp4") ||
    normalized.includes("application/octet-stream") ||
    normalized.includes("binary/octet-stream")
  );
}

function isInvalidTextContentType(contentType: string) {
  const normalized = contentType.toLowerCase();
  return (
    normalized.includes("text/html") ||
    normalized.includes("application/json") ||
    normalized.includes("text/plain") ||
    normalized.includes("application/xml") ||
    normalized.includes("text/xml")
  );
}

async function validateVideoResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const contentLengthHeader = response.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : 0;
  const reader = response.body?.getReader();

  if (!reader) {
    return {
      ok: false as const,
      error: "Instagram no devolvió un archivo de video válido.",
      errorCode: "INVALID_MEDIA_RESPONSE",
    };
  }

  const firstRead = await reader.read();
  const firstChunk = firstRead.value;

  if (
    firstRead.done ||
    !firstChunk ||
    firstChunk.length === 0 ||
    isInvalidTextContentType(contentType) ||
    !isAllowedVideoContentType(contentType) ||
    (Number.isFinite(contentLength) && contentLength > 0 && contentLength < MIN_VIDEO_BYTES) ||
    looksLikeBlockedText(firstChunk) ||
    !hasMp4Signature(firstChunk)
  ) {
    await reader.cancel().catch(() => undefined);
    return {
      ok: false as const,
      error: "Instagram no devolvió un archivo de video válido.",
      errorCode: "INVALID_MEDIA_RESPONSE",
    };
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(firstChunk);

      try {
        while (true) {
          const next = await reader.read();
          if (next.done) break;
          if (next.value) controller.enqueue(next.value);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });

  return { ok: true as const, stream, contentLength };
}

export async function POST(req: Request) {
  if (isRequestTooLarge(req)) {
    return NextResponse.json(
      { success: false, error: "Cuerpo demasiado grande.", errorCode: "REQUEST_TOO_LARGE" },
      { status: 413 }
    );
  }

  const body = (await req.json().catch(() => null)) as DownloadBody | null;
  if (!body) {
    return NextResponse.json(
      { success: false, error: "Cuerpo JSON invalido.", errorCode: "INVALID_JSON" },
      { status: 400 }
    );
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[instagram-download-body]", body);
  }

  const type = firstString(body.type);
  const format = firstString(body.format);
  const isAudioDownload = type === "audio" || format === "mp3";

  const audioUrl = firstString(body.audioUrl);
  const combinedUrl = firstString(body.combinedUrl);
  const videoUrl = firstString(body.videoUrl);

  const mediaUrl = isAudioDownload
    ? firstString(audioUrl, combinedUrl, body.url, body.mediaUrl, body.downloadUrl, body.formatUrl)
    : firstString(combinedUrl || body.url, body.url, body.mediaUrl, body.downloadUrl, body.formatUrl);

  if (process.env.NODE_ENV !== "production") {
    console.log("[instagram-download-media-url]", mediaUrl);
  }

  const parsedMediaUrl = parseMediaUrl(mediaUrl);
  if (!parsedMediaUrl.ok) {
    return jsonDownloadError(parsedMediaUrl.errorCode, parsedMediaUrl.error, parsedMediaUrl.status);
  }

  const fileUrl = parsedMediaUrl.url;

  let audioSourceUrl: string | null = null;
  if (audioUrl && audioUrl !== fileUrl) {
    const parsedAudio = parseMediaUrl(audioUrl);
    if (parsedAudio.ok) {
      audioSourceUrl = parsedAudio.url;
    }
  }

  if (!audioSourceUrl && combinedUrl && combinedUrl !== fileUrl) {
    const parsedCombined = parseMediaUrl(combinedUrl);
    if (parsedCombined.ok) {
      audioSourceUrl = parsedCombined.url;
    }
  }

  const filename = getDownloadFilename(body.filename, isAudioDownload ? "mp3" : "mp4");

  if (process.env.NODE_ENV !== "production") {
    console.log("[instagram-download-request]", {
      mediaUrl: fileUrl,
      audioUrl: audioSourceUrl,
      combinedUrl,
      videoUrl,
      filename: body.filename,
      type,
      format,
    });
  }

  return isAudioDownload
    ? doAudioDownload(fileUrl, filename)
    : doDownload(fileUrl, filename, audioSourceUrl);
}

async function fetchValidatedVideo(fileUrl: string, timeoutMs = DOWNLOAD_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(fileUrl, {
      method: "GET",
      headers: {
        Accept: "video/mp4,video/*,*/*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Referer: "https://www.instagram.com/",
        Origin: "https://www.instagram.com",
      },
      signal: controller.signal,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-download-response]", {
        status: response.status,
        contentType: response.headers.get("content-type"),
        contentLength: response.headers.get("content-length"),
      });
    }

    if (!response.ok || !response.body) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-download-cdn-failed]", { status: response.status, fileUrl });
      }

      return {
        ok: false as const,
        response: NextResponse.json(
          {
            success: false,
            error: "Instagram bloqueó la descarga mediante proxy.",
            errorCode: "INSTAGRAM_CDN_PROXY_BLOCKED",
          },
          { status: 502 }
        ),
      };
    }

    const validation = await validateVideoResponse(response);
    if (!validation.ok) {
      return {
        ok: false as const,
        response: NextResponse.json(
          {
            success: false,
            error: validation.error,
            errorCode: validation.errorCode,
          },
          { status: 502 }
        ),
      };
    }

    return validation;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-download-cdn-error]", error instanceof Error ? error.message : String(error));
    }

    return {
      ok: false as const,
      response: NextResponse.json(
        {
          success: false,
          error: "Instagram bloqueó la descarga mediante proxy.",
          errorCode: "INSTAGRAM_CDN_PROXY_BLOCKED",
        },
        { status: 502 }
      ),
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function writeWebStreamToFile(stream: ReadableStream<Uint8Array>, filePath: string) {
  const reader = stream.getReader();
  const writer = createWriteStream(filePath);

  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      if (next.value && !writer.write(next.value)) {
        await new Promise<void>((resolve, reject) => {
          writer.once("drain", resolve);
          writer.once("error", reject);
        });
      }
    }

    writer.end();
    await finished(writer);
  } catch (error) {
    writer.destroy();
    throw error;
  } finally {
    reader.releaseLock();
  }
}

async function probeFile(filePath: string): Promise<{
  hasVideo: boolean;
  hasAudio: boolean;
  videoCodec: string;
  audioCodec: string;
  streams: Array<{ codec_type: string; codec_name: string }>;
}> {
  try {
    const { stdout } = await execFileAsync(
      "ffprobe",
      ["-v", "error", "-show_entries", "stream=codec_name,codec_type", "-of", "json", filePath],
      { timeout: 10_000, maxBuffer: 1024 * 256 }
    );
    const data = JSON.parse(stdout);
    const streams: Array<{ codec_type: string; codec_name: string }> = data.streams || [];
    const videoStream = streams.find((s) => s.codec_type === "video");
    const audioStream = streams.find((s) => s.codec_type === "audio");

    return {
      hasVideo: Boolean(videoStream),
      hasAudio: Boolean(audioStream),
      videoCodec: videoStream?.codec_name || "",
      audioCodec: audioStream?.codec_name || "",
      streams,
    };
  } catch {
    return { hasVideo: false, hasAudio: false, videoCodec: "", audioCodec: "", streams: [] };
  }
}

async function downloadToTempFile(fileUrl: string, destPath: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);

  try {
    const response = await fetch(fileUrl, {
      method: "GET",
      headers: {
        Accept: "video/mp4,video/*,audio/mpeg,audio/*,*/*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Referer: "https://www.instagram.com/",
        Origin: "https://www.instagram.com",
      },
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error(`Download failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const writer = createWriteStream(destPath);

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value && !writer.write(value)) {
          await new Promise<void>((resolve, reject) => {
            writer.once("drain", resolve);
            writer.once("error", reject);
          });
        }
      }
      writer.end();
      await finished(writer);
    } finally {
      reader.releaseLock();
    }

    return await stat(destPath);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function doDownload(fileUrl: string, filename: string, audioSourceUrl: string | null) {
  const validation = await fetchValidatedVideo(fileUrl);
  if (!validation.ok) return validation.response;

  const ffmpegPath = await getFfmpegPath();

  if (!ffmpegPath) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp4-no-ffmpeg] Streaming original source directly.");
    }

    const headers = new Headers({
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    });

    if (validation.contentLength > 0) {
      headers.set("Content-Length", String(validation.contentLength));
    }

    return new Response(validation.stream, {
      status: 200,
      headers,
    });
  }

  const tempDir = await mkdtemp(path.join(tmpdir(), "clipnexo-instagram-mp4-"));
  const sourcePath = path.join(tempDir, "source.mp4");
  const audioPath = path.join(tempDir, "audio.mp3");
  const outputPath = path.join(tempDir, "output.mp4");

  try {
    await writeWebStreamToFile(validation.stream, sourcePath);

    const sourceSize = (await stat(sourcePath)).size;
    if (sourceSize < MIN_VIDEO_BYTES) {
      return jsonDownloadError(
        "INVALID_MEDIA_RESPONSE",
        "Instagram no devolvió un archivo de video válido.",
        502
      );
    }

    const sourceProbe = await probeFile(sourcePath);

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-source-probe]", {
        hasVideo: sourceProbe.hasVideo,
        videoCodec: sourceProbe.videoCodec,
        hasAudio: sourceProbe.hasAudio,
        audioCodec: sourceProbe.audioCodec,
        streamCount: sourceProbe.streams.length,
      });
    }

    let ffmpegArgs: string[];
    let needsMuxtemp = false;

    if (sourceProbe.hasAudio) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-has-audio] Using explicit audio map 0:a:0.");
      }
      ffmpegArgs = [
        "-y",
        "-i", sourcePath,
        "-map", "0:v:0",
        "-map", "0:a:0",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        outputPath,
      ];
    } else if (audioSourceUrl) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-no-audio] Downloading alternate audio source:", audioSourceUrl);
      }

      try {
        await downloadToTempFile(audioSourceUrl, audioPath);
        const audioStat = await stat(audioPath);
        if (audioStat.size > 0) {
          needsMuxtemp = true;

          if (process.env.NODE_ENV !== "production") {
            console.log("[instagram-mp4-audio-downloaded]", { size: audioStat.size });
          }

          ffmpegArgs = [
            "-y",
            "-i", sourcePath,
            "-i", audioPath,
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "23",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "128k",
            "-shortest",
            "-movflags", "+faststart",
            outputPath,
          ];
        } else {
          ffmpegArgs = [
            "-y",
            "-i", sourcePath,
            "-map", "0:v:0",
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "23",
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            outputPath,
          ];
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.log("[instagram-mp4-audio-download-failed]", err instanceof Error ? err.message : String(err));
        }
        ffmpegArgs = [
          "-y",
          "-i", sourcePath,
          "-map", "0:v:0",
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-crf", "23",
          "-pix_fmt", "yuv420p",
          "-movflags", "+faststart",
          outputPath,
        ];
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-no-audio] No audio source available, producing video-only MP4.");
      }
      ffmpegArgs = [
        "-y",
        "-i", sourcePath,
        "-map", "0:v:0",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        outputPath,
      ];
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp4-transcode] Running ffmpeg...");
    }

    await execFileAsync(
      ffmpegPath,
      ffmpegArgs,
      { timeout: MP4_CONVERSION_TIMEOUT_MS, maxBuffer: 1024 * 1024 * 4 }
    );

    const outputStat = await stat(outputPath);
    if (outputStat.size <= 0) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-transcode-failed] Output file is empty.");
      }
      return jsonDownloadError(
        "MP4_TRANSCODE_FAILED",
        "No se pudo preparar el video MP4 compatible.",
        502
      );
    }

    const outputProbe = await probeFile(outputPath);

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-final-mp4-probe]", {
        hasVideo: outputProbe.hasVideo,
        videoCodec: outputProbe.videoCodec,
        hasAudio: outputProbe.hasAudio,
        audioCodec: outputProbe.audioCodec,
      });
    }

    if (!outputProbe.hasAudio && (sourceProbe.hasAudio || needsMuxtemp)) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-audio-mux-failed] Audio was expected but not present in output.");
      }
      return jsonDownloadError(
        "MP4_AUDIO_MUX_FAILED",
        "No se pudo integrar el audio en el MP4 final.",
        502
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp4-transcode]", {
        sourceSize,
        outputSize: outputStat.size,
        hasAudio: outputProbe.hasAudio,
        success: true,
      });
    }

    const mp4Bytes = await readFile(outputPath);

    return new Response(new Uint8Array(mp4Bytes), {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        "Content-Length": String(mp4Bytes.byteLength),
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp4-transcode]", {
        error: error instanceof Error ? error.message : String(error),
        success: false,
      });
    }

    return jsonDownloadError(
      "MP4_TRANSCODE_FAILED",
      "No se pudo preparar el video MP4. Intenta con otro enlace público.",
      502
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
  }
}

async function doAudioDownload(fileUrl: string, filename: string) {
  const ffmpegPath = await getFfmpegPath();
  if (!ffmpegPath) {
    return jsonDownloadError(
      "MP3_NOT_AVAILABLE",
      "La conversión a MP3 aún no está disponible en el servidor.",
      501
    );
  }

  const validation = await fetchValidatedVideo(fileUrl);
  if (!validation.ok) return validation.response;

  const tempDir = await mkdtemp(path.join(tmpdir(), "clipnexo-instagram-"));
  const inputPath = path.join(tempDir, "source.mp4");
  const outputPath = path.join(tempDir, "audio.mp3");

  try {
    await writeWebStreamToFile(validation.stream, inputPath);

    try {
      await execFileAsync(
        "ffprobe",
        ["-v", "error", "-show_entries", "stream=codec_type", "-of", "json", inputPath],
        { timeout: 10_000, maxBuffer: 1024 * 256 }
      );

      await execFileAsync(
        ffmpegPath,
        ["-y", "-i", inputPath, "-vn", "-codec:a", "libmp3lame", "-q:a", "2", outputPath],
        { timeout: AUDIO_CONVERSION_TIMEOUT_MS, maxBuffer: 1024 * 1024 * 2 }
      );
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp3-conversion-error]", error instanceof Error ? error.message : String(error));
      }

      return jsonDownloadError(
        "NO_AUDIO_STREAM",
        "Este video no tiene audio disponible para convertir a MP3.",
        502
      );
    }

    const outputStat = await stat(outputPath);
    if (outputStat.size <= 0) {
      return jsonDownloadError(
        "MP3_CONVERSION_FAILED",
        "No se pudo generar un archivo MP3 válido.",
        502
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp3-conversion]", { inputPath, outputPath, success: true });
    }

    const mp3Bytes = await readFile(outputPath);

    return new Response(new Uint8Array(mp3Bytes), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        "Content-Length": String(mp3Bytes.byteLength),
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-mp3-conversion]", {
        inputPath,
        outputPath,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return jsonDownloadError(
      "MP3_CONVERSION_FAILED",
      "No se pudo generar el MP3 de Instagram.",
      502
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
  }
}
