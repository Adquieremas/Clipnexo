import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import { isLocalOrPrivateHostname } from "@/lib/clipnexo-api";
import type {
  InstagramContentType,
  InstagramInfoError,
  InstagramInfoResponse,
  InstagramMediaFormat,
  InstagramMediaItem,
  InstagramVideoOption,
  InstagramAudioOption,
} from "@/lib/instagram-types";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = "/opt/homebrew/bin/yt-dlp";
const YT_DLP_FALLBACK_PATHS = ["/usr/local/bin/yt-dlp", "/usr/bin/yt-dlp", "yt-dlp"];
const MAX_TIMEOUT_MS = 25_000;
const YT_DLP_SOCKET_TIMEOUT = "30";

const UNSUPPORTED_STORY_ERROR =
  "Por ahora Clipnexo solo admite Reels, videos, fotos y carruseles publicos de Instagram.";
const INSTAGRAM_TIMEOUT_ERROR =
  "Instagram tardo demasiado en responder. Intenta con otro enlace publico.";
const INSTAGRAM_LOGIN_REQUIRED_ERROR =
  "Instagram requiere validacion adicional para este contenido. Intenta con otro enlace publico.";
const INSTAGRAM_BLOCKED_ERROR =
  "Instagram bloqueo temporalmente la obtencion de informacion. Intenta con otro enlace publico.";
const INSTAGRAM_COOKIES_NEEDED_ERROR =
  "Instagram requiere autenticacion. Configura INSTAGRAM_COOKIES_PATH en el backend con un archivo de cookies de Instagram exportado desde tu navegador.";

type InstagramUrlKind = "reel" | "post" | "tv" | "story";
type NormalizedInstagramType = InstagramContentType | "story" | "unknown";

type ValidInstagramUrl = {
  url: string;
  kind: InstagramUrlKind;
  shortcode: string;
};

type NormalizedInstagramUrl =
  | { valid: true; normalizedUrl: string; type: NormalizedInstagramType; shortcode: string }
  | { valid: false; normalizedUrl: string; type: NormalizedInstagramType; shortcode: string; errorCode: string };

function summarizeText(text: string | undefined, maxLength = 400) {
  if (!text?.trim()) return "";
  return text.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeString(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return cleaned ? cleaned : "";
}

export function normalizeInstagramMediaUrl(value: unknown) {
  const normalized = normalizeString(value);
  if (!normalized) return "";

  try {
    const parsed = new URL(normalized);
    if (!["http:", "https:"].includes(parsed.protocol)) return "";
    parsed.searchParams.delete("bytestart");
    parsed.searchParams.delete("byteend");
    return parsed.toString();
  } catch {
    return "";
  }
}

function normalizeNullableString(value: unknown) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function normalizeNumber(value: unknown) {
  const asNumber = typeof value === "number" ? value : Number(value);
  return Number.isFinite(asNumber) ? asNumber : 0;
}

function asRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    : [];
}

function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  return matches ? Array.from(new Set(matches)) : [];
}

function isSupportedInstagramHost(hostname: string) {
  return hostname.replace(/^www\./, "").toLowerCase() === "instagram.com";
}

function getShortcode(segment: string | undefined) {
  const s = segment?.trim() || "";
  return /^[A-Za-z0-9_-]+$/.test(s) ? s : "";
}

function normalizedUrlFor(kind: Exclude<InstagramUrlKind, "story">, shortcode: string) {
  const seg = kind === "post" ? "p" : kind;
  return `https://www.instagram.com/${seg}/${shortcode}/`;
}

export function normalizeInstagramUrl(input: string): NormalizedInstagramUrl {
  let parsed: URL;
  try {
    parsed = new URL(input.trim());
  } catch {
    return { valid: false, normalizedUrl: "", type: "unknown", shortcode: "", errorCode: "INVALID_INSTAGRAM_URL" };
  }

  if (!["http:", "https:"].includes(parsed.protocol))
    return { valid: false, normalizedUrl: "", type: "unknown", shortcode: "", errorCode: "INVALID_INSTAGRAM_URL" };

  if (parsed.username || parsed.password || isLocalOrPrivateHostname(parsed.hostname) || !isSupportedInstagramHost(parsed.hostname))
    return { valid: false, normalizedUrl: "", type: "unknown", shortcode: "", errorCode: "INVALID_INSTAGRAM_URL" };

  const segments = parsed.pathname.split("/").filter(Boolean);
  const section = segments[0]?.toLowerCase() || "";
  const shortcode = getShortcode(segments[1]);

  if (section === "stories") {
    return {
      valid: false,
      normalizedUrl: parsed.toString(),
      type: "story",
      shortcode: shortcode || getShortcode(segments[2]) || "",
      errorCode: "UNSUPPORTED_INSTAGRAM_STORY",
    };
  }

  if (!shortcode)
    return { valid: false, normalizedUrl: "", type: "unknown", shortcode: "", errorCode: "INVALID_INSTAGRAM_URL" };

  if (section === "reel" || section === "reels")
    return { valid: true, normalizedUrl: normalizedUrlFor("reel", shortcode), type: "reel", shortcode };

  if (section === "p")
    return { valid: true, normalizedUrl: normalizedUrlFor("post", shortcode), type: "unknown", shortcode };

  if (section === "tv")
    return { valid: true, normalizedUrl: normalizedUrlFor("tv", shortcode), type: "video", shortcode };

  return { valid: false, normalizedUrl: "", type: "unknown", shortcode: "", errorCode: "INVALID_INSTAGRAM_URL" };
}

export function parseInstagramUrl(value: string): ValidInstagramUrl | InstagramInfoError {
  const normalized = normalizeInstagramUrl(value);
  if (!normalized.valid) {
    return {
      success: false,
      error: normalized.errorCode === "UNSUPPORTED_INSTAGRAM_STORY" ? UNSUPPORTED_STORY_ERROR : "El enlace enviado no es valido o no pertenece a Instagram.",
      errorCode: normalized.errorCode,
    };
  }

  const kind: InstagramUrlKind = normalized.normalizedUrl.includes("/reel/") ? "reel"
    : normalized.normalizedUrl.includes("/tv/") ? "tv" : "post";

  return { url: normalized.normalizedUrl, kind, shortcode: normalized.shortcode };
}

function isLoginRequiredByInstagram(message: string) {
  const n = message.toLowerCase();
  return (
    n.includes("login") || n.includes("cookies") || n.includes("sign in") ||
    n.includes("not logged in") || n.includes("authentication") ||
    n.includes("requires account") || n.includes("requires login") ||
    n.includes("private") || n.includes("empty media response")
  );
}

function isBlockedByInstagram(message: string) {
  const n = message.toLowerCase();
  return (
    n.includes("blocked") || n.includes("temporarily unavailable") ||
    n.includes("not available") || n.includes("http error 401") ||
    n.includes("http error 403") || n.includes("http error 429") ||
    n.includes("rate-limit") || n.includes("rate limit")
  );
}

function getCookiesPath(): string | null {
  const envPath = process.env.INSTAGRAM_COOKIES_PATH?.trim();
  if (envPath && existsSync(envPath)) return envPath;

  const paths = ["/opt/clipnexo-api/instagram.cookies.txt", "./instagram.cookies.txt"];
  for (const p of paths) {
    if (existsSync(p)) return p;
  }
  return null;
}

function getYtDlpCommands(): string[] {
  const cmds: string[] = [];
  if (existsSync(YT_DLP_PATH)) cmds.push(YT_DLP_PATH);
  for (const p of YT_DLP_FALLBACK_PATHS) {
    if (p === "yt-dlp" || existsSync(p)) {
      if (!cmds.includes(p)) cmds.push(p);
    }
  }
  return cmds;
}

function formatFromYt(record: Record<string, unknown>): InstagramMediaFormat {
  const mediaUrl = normalizeInstagramMediaUrl(record.url) || normalizeString(record.url);

  return {
    format_id: normalizeNullableString(record.format_id),
    ext: normalizeNullableString(record.ext),
    mimeType: normalizeNullableString(record.mimeType) || normalizeNullableString(record.mimetype),
    url: normalizeNullableString(mediaUrl),
    resolution: normalizeNullableString(record.resolution),
    width: normalizeNumber(record.width) || null,
    height: normalizeNumber(record.height) || null,
    vcodec: normalizeNullableString(record.vcodec),
    acodec: normalizeNullableString(record.acodec),
    filesize: normalizeNumber(record.filesize) || null,
    filesize_approx: normalizeNumber(record.filesize_approx) || null,
    format_note: normalizeNullableString(record.format_note),
  };
}

function bestVideo(record: Record<string, unknown>): string {
  const u = normalizeInstagramMediaUrl(record.url) || normalizeString(record.url);
  const e = normalizeString(record.ext).toLowerCase();
  if (u && (e === "mp4" || normalizeString(record.vcodec).toLowerCase() !== "none")) return u;

  const fmts = asRecordArray(record.formats).map(formatFromYt).filter((f) => Boolean(f.url));
  const videos = fmts.filter((f) => {
    const v = (f.vcodec || "").toLowerCase();
    const x = (f.ext || "").toLowerCase();
    return x === "mp4" || (v && v !== "none");
  });
  videos.sort((a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0)));
  return videos[0]?.url || "";
}

function bestImage(record: Record<string, unknown>): string {
  return normalizeString(record.url) || normalizeString(record.display_url) ||
    normalizeString(record.thumbnail) || normalizeString(record.thumbnail_url);
}

function mediaItem(record: Record<string, unknown>): InstagramMediaItem | null {
  const hasVid = normalizeString(record.ext).toLowerCase() === "mp4" ||
    normalizeString(record.vcodec).toLowerCase() !== "none" ||
    asRecordArray(record.formats).some((f) => {
      const e = normalizeString(f.ext).toLowerCase();
      const v = normalizeString(f.vcodec).toLowerCase();
      return e === "mp4" || (v && v !== "none");
    });

  if (hasVid) {
    const vu = bestVideo(record);
    if (!vu) return null;
    return {
      type: "video", url: vu, downloadUrl: vu,
      thumbnail: normalizeNullableString(record.thumbnail) || normalizeNullableString(record.thumbnail_url),
      width: normalizeNumber(record.width) || null, height: normalizeNumber(record.height) || null,
      ext: normalizeNullableString(record.ext) || "mp4", duration: normalizeNumber(record.duration) || null,
    };
  }

  const iu = bestImage(record);
  if (!iu) return null;
  return {
    type: "image", url: iu, downloadUrl: iu,
    thumbnail: normalizeNullableString(record.thumbnail) || normalizeNullableString(record.thumbnail_url) || iu,
    width: normalizeNumber(record.width) || null, height: normalizeNumber(record.height) || null,
    ext: normalizeNullableString(record.ext) || "jpg", duration: null,
  };
}

function getVideoOptions(items: InstagramMediaItem[], formats: InstagramMediaFormat[]): InstagramVideoOption[] {
  const candidates = [
    ...items
      .filter((item) => item.type === "video")
      .map((item) => ({
        url: item.downloadUrl || item.url,
        width: item.width || null,
        height: item.height || null,
      })),
    ...formats
      .filter((format) => {
        const ext = (format.ext || "").toLowerCase();
        const mimeType = (format.mimeType || "").toLowerCase();
        const vcodec = (format.vcodec || "").toLowerCase();
        return Boolean(format.url) && (ext === "mp4" || mimeType === "video/mp4" || (vcodec && vcodec !== "none"));
      })
      .map((format) => ({
        url: format.url || "",
        width: format.width || null,
        height: format.height || null,
      })),
  ].filter((candidate) => Boolean(candidate.url));

  const unique = candidates.filter(
    (candidate, index, list) => list.findIndex((item) => item.url === candidate.url) === index
  );

  if (unique.length === 0) return [];

  const sorted = [...unique].sort(
    (a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0))
  );
  const best = sorted[0];

  return [
    {
      label: "MP4",
      quality: "mp4",
      url: best.url,
      ext: "mp4",
      width: best.width,
      height: best.height,
    },
  ];
}

function mapPayload(payload: Record<string, unknown>, urlInfo: ValidInstagramUrl): InstagramInfoResponse {
  const entries = asRecordArray(payload.entries);
  const srcs = entries.length > 0 ? entries : [payload];
  const items = srcs.map(mediaItem).filter((i): i is InstagramMediaItem => Boolean(i));

  if (items.length === 0) {
    return { success: false, error: "No se pudo obtener contenido de Instagram.", errorCode: "INSTAGRAM_PROVIDERS_FAILED" };
  }

  const desc = normalizeString(payload.description) || normalizeString(payload.title) || normalizeString(payload.fulltitle);
  const title = normalizeString(payload.title) || desc;
  const thumb = normalizeString(payload.thumbnail) || normalizeString(payload.thumbnail_url) ||
    items.find((i) => i.thumbnail)?.thumbnail || items[0]?.url || "";
  const fmts = asRecordArray(payload.formats).map(formatFromYt);
  const videoOptions = getVideoOptions(items, fmts);

  const audioOnlyFormats = fmts.filter((f) => {
    const v = (f.vcodec || "").toLowerCase();
    const a = (f.acodec || "").toLowerCase();
    return Boolean(f.url) && (v === "none" || !v) && a && a !== "none";
  });
  const audioOptions: InstagramAudioOption[] = audioOnlyFormats
    .filter((f) => Boolean(f.url))
    .map((f) => ({ label: "MP3", quality: "mp3", url: f.url!, ext: "mp3" }));
  const audioUrl = normalizeNullableString(audioOnlyFormats[0]?.url) || null;

  const videoWithAudioFormat = fmts.find((f) => {
    const v = (f.vcodec || "").toLowerCase();
    const a = (f.acodec || "").toLowerCase();
    return Boolean(f.url) && v && v !== "none" && a && a !== "none";
  });
  const combinedUrl = normalizeNullableString(videoWithAudioFormat?.url) || null;
  const videoOnly = !combinedUrl;
  const audioAvailable = Boolean(audioUrl || combinedUrl);

  let type: InstagramContentType;
  if (items.length > 1) type = "carousel";
  else if (urlInfo.kind === "reel") type = "reel";
  else if (items[0]?.type === "image") type = "image";
  else type = "video";

  return {
    success: true,
    source: "instagram", provider: "yt-dlp", type,
    title, description: desc, thumbnail: thumb,
    duration: normalizeNumber(payload.duration),
    uploader: normalizeString(payload.uploader) || normalizeString(payload.channel) || normalizeString(payload.creator),
    hashtags: extractHashtags(`${title} ${desc}`),
    items, formats: fmts,
    shortcode: urlInfo.shortcode,
    downloadUrl: items.find((item) => item.type === "video")?.downloadUrl || items[0]?.downloadUrl || null,
    videoUrl: items.find((item) => item.type === "video")?.url || null,
    videoOptions,
    audioOptions,
    audioUrl,
    combinedUrl,
    videoOnly,
    audioAvailable,
    mp3Available: audioAvailable,
    webpage_url: normalizeString(payload.webpage_url),
  };
}

async function executeYtDlp(command: string, url: string, cookiesPath: string | null, timeoutMs: number) {
  const args = ["--dump-single-json", "--no-playlist", "--socket-timeout", YT_DLP_SOCKET_TIMEOUT, "--no-warnings"];
  if (cookiesPath) args.push("--cookies", cookiesPath);
  args.push(url);

  return execFileAsync(command, args, {
    timeout: timeoutMs,
    maxBuffer: 1024 * 1024 * 8,
    env: { ...process.env, PYTHONUNBUFFERED: "1" },
  });
}

export async function getInstagramInfoWithYtDlp(
  url: string,
  kind: InstagramUrlKind,
  timeoutMs = MAX_TIMEOUT_MS
): Promise<InstagramInfoResponse> {
  const cmds = getYtDlpCommands();
  const cookiesPath = getCookiesPath();

  if (cmds.length === 0) {
    return { success: false, error: "yt-dlp no esta instalado en el servidor.", errorCode: "INSTAGRAM_PROVIDER_NOT_INSTALLED" };
  }

  if (!cookiesPath) {
    return {
      success: false,
      error: INSTAGRAM_COOKIES_NEEDED_ERROR,
      errorCode: "INSTAGRAM_LOGIN_REQUIRED",
    };
  }

  for (const cmd of cmds) {
    try {
      const { stdout, stderr } = await executeYtDlp(cmd, url, cookiesPath, timeoutMs);
      const trimmed = stdout.trim();
      if (!trimmed) {
        console.info("[instagram-yt-dlp] empty stdout", { stderr: summarizeText(stderr) });
        continue;
      }
      return mapPayload(JSON.parse(trimmed) as Record<string, unknown>, { url, kind, shortcode: getShortcode(new URL(url).pathname.split("/").filter(Boolean)[1]) });
    } catch (error) {
      const errStderr = error && typeof error === "object" && "stderr" in error
        ? String((error as { stderr?: unknown }).stderr || "") : "";

      const msg = error instanceof Error ? error.message : String(error);
      const combined = `${msg} ${errStderr}`;
      const code = error && typeof error === "object" && "code" in error
        ? String((error as { code?: unknown }).code || "") : "";

      if (code === "ENOENT" && cmd !== cmds[cmds.length - 1]) continue;

      if (code === "ENOENT") {
        return { success: false, error: "yt-dlp no esta instalado.", errorCode: "INSTAGRAM_PROVIDER_NOT_INSTALLED" };
      }
      if (msg.toLowerCase().includes("timed out")) {
        return { success: false, error: INSTAGRAM_TIMEOUT_ERROR, errorCode: "REQUEST_TIMEOUT" };
      }
      if (isLoginRequiredByInstagram(combined)) {
        return { success: false, error: INSTAGRAM_LOGIN_REQUIRED_ERROR, errorCode: "INSTAGRAM_LOGIN_REQUIRED" };
      }
      if (isBlockedByInstagram(combined)) {
        return { success: false, error: INSTAGRAM_BLOCKED_ERROR, errorCode: "INSTAGRAM_UPSTREAM_BLOCKED" };
      }
    }
  }

  return {
    success: false,
    error: "No se pudo obtener la informacion de Instagram.",
    errorCode: "INSTAGRAM_PROVIDERS_FAILED",
  };
}

export { summarizeText, normalizeString, normalizeNullableString, normalizeNumber, asRecordArray, extractHashtags };
