/* eslint-disable @typescript-eslint/no-require-imports */
const dns = require("node:dns").promises;
const net = require("node:net");
const { execFile } = require("node:child_process");
const fs = require("node:fs");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config({ quiet: true });

const app = express();
const port = Number.parseInt(process.env.PORT || "3001", 10);
const host = process.env.HOST || "127.0.0.1";
const isProduction = process.env.NODE_ENV === "production";
const ytDlpPath = "/home/opc/.local/bin/yt-dlp";
const tikwmEndpoint = process.env.TIKWM_ENDPOINT || "https://www.tikwm.com/api/";
const tikwmMinIntervalMs = Math.max(
  Number.parseInt(process.env.TIKWM_MIN_INTERVAL_MS || "1200", 10),
  1000
);
const maxInfoSeconds = Math.min(
  Math.max(Number.parseInt(process.env.MAX_INFO_SECONDS || "45", 10), 5),
  60
);
const instagramCookiesPath = process.env.INSTAGRAM_COOKIES_PATH || "/opt/clipnexo-api/instagram.cookies.txt";
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);
let tikwmQueue = Promise.resolve();
let tikwmLastRequestAt = 0;

// ── helpers ──────────────────────────────────────────────────────────

function jsonError(status, error, errorCode) {
  return { status, body: { success: false, error, errorCode } };
}

function summarizeText(value, maxLength = 500) {
  if (!value || typeof value !== "string") return undefined;
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized ? normalized.slice(0, maxLength) : undefined;
}

function normalizeString(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned ? cleaned : null;
}

function normalizeNumber(value) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractHashtags(text) {
  if (typeof text !== "string") return [];
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  return matches ? Array.from(new Set(matches)) : [];
}

function isTikTokUrl(parsedUrl) {
  const hostname = parsedUrl.hostname.replace(/^www\./, "").toLowerCase();
  return ["tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"].includes(hostname);
}

function createProviderFailure(providerName, errorCode, error, extra = {}) {
  return {
    providerName,
    errorCode,
    message: error?.message || error?.error?.message || String(error || "provider failed"),
    stderr: summarizeText(error?.stderr),
    timedOut: Boolean(error?.timedOut),
    ...extra,
  };
}

function logProviderFailure(failure) {
  console.warn("PROVIDER_FAILED", {
    providerName: failure.providerName,
    errorCode: failure.errorCode,
    message: failure.message,
    status: failure.status,
    stderr: failure.stderr,
    body: failure.body,
    timedOut: failure.timedOut,
  });
}

async function runTikWmQueued(task) {
  const run = tikwmQueue.then(async () => {
    const waitMs = Math.max(0, tikwmLastRequestAt + tikwmMinIntervalMs - Date.now());
    if (waitMs > 0) {
      await sleep(waitMs);
    }
    tikwmLastRequestAt = Date.now();
    return task();
  });

  tikwmQueue = run.catch(() => {});
  return run;
}

function getSafeProviderDetails(primary, fallback) {
  const details = {
    primary: "yt-dlp failed",
    fallback: "fallback provider failed",
  };

  if (!isProduction) {
    details.primaryError = primary;
    details.fallbackError = fallback;
  }

  return details;
}

function isPrivateIp(address) {
  const version = net.isIP(address);

  if (version === 4) {
    const parts = address.split(".").map((part) => Number.parseInt(part, 10));
    const [a, b] = parts;

    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }

  if (version === 6) {
    const normalized = address.toLowerCase();
    return (
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe80") ||
      normalized === "::" ||
      normalized.startsWith("::ffff:127.") ||
      normalized.startsWith("::ffff:10.") ||
      normalized.startsWith("::ffff:192.168.")
    );
  }

  return true;
}

function getValidHttpUrl(value) {
  if (typeof value !== "string") {
    throw jsonError(400, "Debes enviar una URL valida.", "INVALID_URL");
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed.length > 2048) {
    throw jsonError(400, "Debes enviar una URL valida.", "INVALID_URL");
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw jsonError(400, "La URL enviada no tiene un formato valido.", "INVALID_URL_FORMAT");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw jsonError(400, "Solo se aceptan URLs http o https.", "UNSUPPORTED_PROTOCOL");
  }

  if (!parsed.hostname || parsed.username || parsed.password) {
    throw jsonError(400, "La URL enviada no es segura para procesar.", "UNSAFE_URL");
  }

  return parsed;
}

async function assertPublicHostname(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();

  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw jsonError(400, "No se permiten URLs locales o privadas.", "PRIVATE_URL_BLOCKED");
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw jsonError(400, "No se permiten URLs locales o privadas.", "PRIVATE_URL_BLOCKED");
    }
    return;
  }

  let addresses;
  try {
    addresses = await dns.lookup(hostname, { all: true, verbatim: false });
  } catch {
    throw jsonError(400, "No se pudo resolver el dominio enviado.", "DNS_LOOKUP_FAILED");
  }

  if (!addresses.length || addresses.some((entry) => isPrivateIp(entry.address))) {
    throw jsonError(400, "No se permiten URLs locales o privadas.", "PRIVATE_URL_BLOCKED");
  }
}

// ── yt-dlp helpers ───────────────────────────────────────────────────

function execYtDlp(args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      ytDlpPath,
      args,
      {
        timeout: maxInfoSeconds * 1000,
        maxBuffer: 8 * 1024 * 1024,
        windowsHide: true,
        env: {
          ...process.env,
          PATH: `/home/opc/.local/bin:/usr/local/bin:${process.env.PATH || ""}`,
          PYTHONUNBUFFERED: "1",
          ...extraEnv,
        },
      },
      (error, stdout, stderr) => {
        if (error) {
          const timedOut = error.killed || error.signal === "SIGTERM";
          reject({ error, stderr, timedOut });
          return;
        }

        const jsonLine = stdout.trim();

        if (!jsonLine) {
          reject({ stderr: stderr || "yt-dlp returned an empty response" });
          return;
        }

        try {
          resolve(JSON.parse(jsonLine));
        } catch (parseError) {
          reject({ error: parseError, stderr: "yt-dlp returned invalid JSON" });
        }
      }
    );
  });
}

// ── TikTok ────────────────────────────────────────────────────────────

function runYtDlpInfo(url) {
  return execYtDlp([
    "--impersonate", "chrome",
    "--no-playlist",
    "--dump-single-json",
    "--socket-timeout", "30",
    url,
  ]);
}

function compactFormat(format) {
  return {
    format_id: format.format_id || null,
    ext: format.ext || null,
    resolution: format.resolution || null,
    width: Number.isFinite(format.width) ? format.width : null,
    height: Number.isFinite(format.height) ? format.height : null,
    fps: Number.isFinite(format.fps) ? format.fps : null,
    vcodec: format.vcodec || null,
    acodec: format.acodec || null,
    filesize: Number.isFinite(format.filesize) ? format.filesize : null,
    filesize_approx: Number.isFinite(format.filesize_approx) ? format.filesize_approx : null,
    format_note: format.format_note || null,
  };
}

function compactMetadata(info) {
  const formats = Array.isArray(info.formats)
    ? info.formats
        .filter((format) => format && typeof format === "object")
        .slice(0, 30)
        .map(compactFormat)
    : [];

  return {
    success: true,
    source: "yt-dlp",
    title: info.title || null,
    description: info.description || info.title || null,
    desc: info.description || info.title || null,
    duration: Number.isFinite(info.duration) ? info.duration : null,
    thumbnail: info.thumbnail || null,
    cover: info.thumbnail || null,
    image: info.thumbnail || null,
    uploader: info.uploader || info.channel || null,
    webpage_url: info.webpage_url || info.original_url || null,
    extractor: info.extractor || null,
    formats,
  };
}

async function getYtDlpProviderResult(url) {
  try {
    const info = await runYtDlpInfo(url);
    return compactMetadata(info);
  } catch (error) {
    throw createProviderFailure("yt-dlp", error?.timedOut ? "YT_DLP_TIMEOUT" : "YT_DLP_FAILED", error);
  }
}

function mapTikWmMetadata(payload, requestedUrl) {
  const data = payload?.data && typeof payload.data === "object" ? payload.data : null;
  if (!data) {
    throw createProviderFailure("tikwm", "TIKWM_INVALID_RESPONSE", new Error("Missing data object"));
  }

  const author = data.author && typeof data.author === "object" ? data.author : {};
  const musicInfo = data.music_info && typeof data.music_info === "object" ? data.music_info : {};
  const title = normalizeString(data.title) || normalizeString(data.desc) || null;
  const thumbnail =
    normalizeString(data.cover) ||
    normalizeString(data.origin_cover) ||
    normalizeString(data.ai_dynamic_cover) ||
    null;
  const videoUrl =
    normalizeString(data.hdplay) ||
    normalizeString(data.play) ||
    normalizeString(data.wmplay) ||
    null;
  const audioUrl = normalizeString(musicInfo.play) || normalizeString(data.music) || null;
  const uploader =
    normalizeString(author.nickname) ||
    normalizeString(author.unique_id) ||
    normalizeString(author.name) ||
    null;

  if (!title && !thumbnail && !videoUrl && !audioUrl) {
    throw createProviderFailure("tikwm", "TIKWM_EMPTY_METADATA", new Error("No usable metadata"));
  }

  return {
    success: true,
    source: "tikwm",
    title,
    description: title,
    desc: title,
    hashtags: extractHashtags(title || ""),
    duration: normalizeNumber(data.duration),
    thumbnail,
    cover: thumbnail,
    image: thumbnail,
    uploader,
    webpage_url: requestedUrl,
    extractor: "tikwm",
    play: videoUrl,
    video: videoUrl,
    videoUrl,
    audio: audioUrl,
    formats: [],
  };
}

async function fetchTikWmProviderResult(url) {
  const endpoint = `${tikwmEndpoint}?url=${encodeURIComponent(url)}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), maxInfoSeconds * 1000);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ClipnexoBot/0.1)",
      },
      signal: controller.signal,
    });

    const rawBody = await response.text();
    if (!response.ok) {
      throw createProviderFailure(
        "tikwm",
        "TIKWM_HTTP_ERROR",
        new Error(`TikWM returned HTTP ${response.status}`),
        { status: response.status, body: summarizeText(rawBody) }
      );
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      throw createProviderFailure("tikwm", "TIKWM_INVALID_JSON", error, {
        status: response.status,
        body: summarizeText(rawBody),
      });
    }

    if (payload?.code !== 0) {
      throw createProviderFailure("tikwm", "TIKWM_FAILED", new Error(payload?.msg || "TikWM failed"), {
        status: response.status,
        body: summarizeText(rawBody),
      });
    }

    return mapTikWmMetadata(payload, url);
  } catch (error) {
    if (error?.providerName) {
      throw error;
    }

    throw createProviderFailure(
      "tikwm",
      error?.name === "AbortError" ? "TIKWM_TIMEOUT" : "TIKWM_FAILED",
      error
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getTikWmProviderResult(url) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      return await runTikWmQueued(() => fetchTikWmProviderResult(url));
    } catch (error) {
      const isProviderRateLimit =
        error?.providerName === "tikwm" &&
        error?.errorCode === "TIKWM_FAILED" &&
        /limit|rate/i.test(`${error.message || ""} ${error.body || ""}`);

      if (!isProviderRateLimit || attempt === 2) {
        throw error;
      }

      await sleep(tikwmMinIntervalMs);
    }
  }

  throw createProviderFailure("tikwm", "TIKWM_FAILED", new Error("TikWM failed"));
}

async function getTikTokInfoWithFallback(url) {
  let primaryFailure;

  try {
    return await getYtDlpProviderResult(url);
  } catch (error) {
    primaryFailure = error;
    logProviderFailure(primaryFailure);
  }

  try {
    return await getTikWmProviderResult(url);
  } catch (error) {
    const fallbackFailure = error;
    logProviderFailure(fallbackFailure);

    throw {
      status: 502,
      body: {
        success: false,
        error: "No se pudo obtener la metadata de TikTok en este momento.",
        errorCode: "TIKTOK_PROVIDERS_FAILED",
        details: getSafeProviderDetails(primaryFailure, fallbackFailure),
      },
    };
  }
}

// ── Instagram ─────────────────────────────────────────────────────────

function isInstagramUrl(parsedUrl) {
  const hostname = parsedUrl.hostname.replace(/^www\./, "").toLowerCase();
  return hostname === "instagram.com";
}

function normalizeInstagramReelUrl(input) {
  let parsed;
  try { parsed = new URL(input.trim()); } catch { return null; }
  if (!["http:", "https:"].includes(parsed.protocol)) return null;
  if (!isInstagramUrl(parsed)) return null;

  const segments = parsed.pathname.split("/").filter(Boolean);
  const section = segments[0]?.toLowerCase() || "";
  const shortcode = segments[1] || "";

  if (!/^[A-Za-z0-9_-]+$/.test(shortcode)) return null;
  if (!["reel", "reels", "p", "tv"].includes(section)) return null;

  const canonicalSection = section === "reels" ? "reel" : section;
  return `https://www.instagram.com/${canonicalSection}/${shortcode}/`;
}

function classifyInstagramError(message, stderr) {
  const combined = `${message} ${stderr || ""}`.toLowerCase();
  const code = message.code || "";

  if (message.toLowerCase().includes("timed out")) return "REQUEST_TIMEOUT";
  if (code === "ENOENT") return "INSTAGRAM_PROVIDER_NOT_INSTALLED";

  if (
    combined.includes("login") ||
    combined.includes("cookies") ||
    combined.includes("empty media") ||
    combined.includes("not granting access") ||
    combined.includes("private")
  ) {
    return "INSTAGRAM_LOGIN_REQUIRED";
  }

  if (
    combined.includes("blocked") ||
    combined.includes("rate limit") ||
    combined.includes("401") ||
    combined.includes("403") ||
    combined.includes("429")
  ) {
    return "INSTAGRAM_UPSTREAM_BLOCKED";
  }

  return "INSTAGRAM_PROVIDERS_FAILED";
}

function compactInstagramPayload(payload) {
  const entries = Array.isArray(payload.entries) && payload.entries.length > 0 ? payload.entries : [payload];

  const items = [];
  for (const entry of entries) {
    const ext = (entry.ext || "").toLowerCase();
    const vcodec = (entry.vcodec || "").toLowerCase();
    const isVideo = ext === "mp4" || (vcodec && vcodec !== "none");

    if (isVideo) {
      const formats = (entry.formats || []).filter((f) => f.url);
      const videos = formats.filter((f) => {
        const ve = (f.ext || "").toLowerCase();
        const vv = (f.vcodec || "").toLowerCase();
        return ve === "mp4" || (vv && vv !== "none");
      });
      videos.sort((a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0)));
      const bestUrl = videos[0]?.url || entry.url || "";

      if (bestUrl) {
        items.push({
          type: "video",
          url: bestUrl,
          thumbnail: entry.thumbnail || entry.thumbnail_url || null,
          width: entry.width || null,
          height: entry.height || null,
          ext: entry.ext || "mp4",
          duration: entry.duration || null,
        });
      }
    } else {
      const imageUrl = entry.url || entry.display_url || entry.thumbnail || entry.thumbnail_url || "";
      if (imageUrl) {
        items.push({
          type: "image",
          url: imageUrl,
          thumbnail: entry.thumbnail || entry.thumbnail_url || imageUrl,
          width: entry.width || null,
          height: entry.height || null,
          ext: entry.ext || "jpg",
          duration: null,
        });
      }
    }
  }

  if (items.length === 0) return null;

  const hasVideo = items.some((i) => i.type === "video");
  const isReel = (payload.webpage_url || "").includes("/reel/");
  let type = hasVideo ? (isReel ? "reel" : "video") : "image";
  if (items.length > 1) type = "carousel";

  const title = payload.title || payload.fulltitle || "";
  const desc = payload.description || title || "";
  const hashtags = (desc.match(/#[\p{L}\p{N}_]+/gu) || []).filter((v, i, a) => a.indexOf(v) === i);

  const audioUrl = (() => {
    const fmts = (payload.formats || []).filter((f) => f.url);
    const audio = fmts.find((f) => {
      const a = (f.acodec || "").toLowerCase();
      const v = (f.vcodec || "").toLowerCase();
      const e = (f.ext || "").toLowerCase();
      return a && a !== "none" && v === "none" && e === "mp3";
    });
    return audio?.url || null;
  })();

  const formats = (payload.formats || [])
    .slice(0, 30)
    .map((f) => ({
      format_id: f.format_id || null,
      ext: f.ext || null,
      url: f.url || null,
      resolution: f.resolution || null,
      width: Number.isFinite(f.width) ? f.width : null,
      height: Number.isFinite(f.height) ? f.height : null,
      vcodec: f.vcodec || null,
      acodec: f.acodec || null,
      filesize: Number.isFinite(f.filesize) ? f.filesize : null,
      filesize_approx: Number.isFinite(f.filesize_approx) ? f.filesize_approx : null,
      format_note: f.format_note || null,
    }));

  return {
    success: true,
    source: "instagram",
    provider: "yt-dlp",
    type,
    title: title || desc || "Instagram content",
    description: desc || title || "",
    thumbnail: payload.thumbnail || payload.thumbnail_url || items[0]?.thumbnail || "",
    duration: Number.isFinite(payload.duration) ? payload.duration : 0,
    uploader: payload.uploader || payload.channel || payload.creator || "",
    hashtags,
    items,
    formats,
    audioUrl,
    webpage_url: payload.webpage_url || "",
  };
}

async function getInstagramProviderResult(safeUrl) {
  const args = ["--dump-single-json", "--no-playlist", "--socket-timeout", "30", "--no-warnings"];

  if (fs.existsSync(instagramCookiesPath)) {
    args.push("--cookies", instagramCookiesPath);
    console.log("[instagram] Using cookies from", instagramCookiesPath);
  } else {
    console.log("[instagram] No cookies file found at", instagramCookiesPath);
  }

  args.push(safeUrl);

  try {
    const payload = await execYtDlp(args);

    const compacted = compactInstagramPayload(payload);
    if (!compacted) {
      throw {
        status: 502,
        body: {
          success: false,
          error: "No se pudo extraer contenido de Instagram.",
          errorCode: "INSTAGRAM_PROVIDERS_FAILED",
        },
      };
    }

    return compacted;
  } catch (error) {
    if (error && error.status && error.body) throw error;

    const message = error?.error?.message || error?.message || String(error);
    const stderr = error?.stderr || "";
    const errorCode = classifyInstagramError(message, stderr);

    const messages = {
      INSTAGRAM_LOGIN_REQUIRED: "Instagram requiere validacion adicional para este contenido. Intenta con otro enlace publico. Asegurate de que las cookies esten actualizadas en el servidor.",
      INSTAGRAM_UPSTREAM_BLOCKED: "Instagram bloqueo temporalmente la obtencion de informacion. Intenta con otro enlace publico.",
      REQUEST_TIMEOUT: "Instagram tardo demasiado en responder. Intenta con otro enlace publico.",
      INSTAGRAM_PROVIDER_NOT_INSTALLED: "El proveedor de Instagram no esta instalado en el servidor.",
      INSTAGRAM_PROVIDERS_FAILED: "No se pudo obtener la informacion de Instagram en este momento.",
    };

    throw {
      status: errorCode === "INSTAGRAM_LOGIN_REQUIRED" ? 403 : errorCode === "REQUEST_TIMEOUT" ? 504 : 502,
      body: {
        success: false,
        error: messages[errorCode] || messages.INSTAGRAM_PROVIDERS_FAILED,
        errorCode,
      },
    };
  }
}

// ── Middleware ────────────────────────────────────────────────────────

app.set("trust proxy", "loopback");
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "16kb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const infoLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Routes ────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "clipnexo-api",
    version: "0.1.0",
    uptime: Math.round(process.uptime()),
    instagram_cookies: fs.existsSync(instagramCookiesPath),
  });
});

app.post("/api/video/info", infoLimiter, async (req, res) => {
  try {
    const parsedUrl = getValidHttpUrl(req.body?.url);
    await assertPublicHostname(parsedUrl);
    const safeUrl = parsedUrl.toString();

    if (isTikTokUrl(parsedUrl)) {
      res.json(await getTikTokInfoWithFallback(safeUrl));
      return;
    }

    res.json(await getYtDlpProviderResult(safeUrl));
  } catch (caught) {
    if (caught && typeof caught === "object" && "status" in caught && "body" in caught) {
      res.status(caught.status).json(caught.body);
      return;
    }

    if (caught?.timedOut) {
      res.status(504).json({
        success: false,
        error: "La consulta de metadata tardo demasiado.",
        errorCode: "INFO_TIMEOUT",
      });
      return;
    }

    console.error("VIDEO_INFO_ERROR", {
      message: caught?.error?.message || caught?.message || "unknown error",
      stderr: typeof caught?.stderr === "string" ? caught.stderr.slice(-500) : undefined,
    });

    res.status(502).json({
      success: false,
      error: "No se pudo obtener la metadata del video.",
      errorCode: "INFO_LOOKUP_FAILED",
    });
  }
});

app.post("/api/instagram/info", infoLimiter, async (req, res) => {
  try {
    const rawUrl = req.body?.url;
    if (!rawUrl || typeof rawUrl !== "string" || !rawUrl.trim()) {
      res.status(400).json({
        success: false,
        error: "Debes enviar un enlace de Instagram.",
        errorCode: "EMPTY_URL",
      });
      return;
    }

    const parsedUrl = getValidHttpUrl(rawUrl);

    if (!isInstagramUrl(parsedUrl)) {
      res.status(400).json({
        success: false,
        error: "El enlace enviado no es valido o no pertenece a Instagram.",
        errorCode: "INVALID_INSTAGRAM_URL",
      });
      return;
    }

    await assertPublicHostname(parsedUrl);
    const safeUrl = normalizeInstagramReelUrl(parsedUrl.toString());

    if (!safeUrl) {
      res.status(400).json({
        success: false,
        error: "El enlace de Instagram no es soportado. Usa enlaces de Reel, post o TV.",
        errorCode: "INVALID_INSTAGRAM_URL",
      });
      return;
    }

    console.log("[instagram/info]", safeUrl);
    res.json(await getInstagramProviderResult(safeUrl));
  } catch (caught) {
    if (caught && typeof caught === "object" && "status" in caught && "body" in caught) {
      res.status(caught.status).json(caught.body);
      return;
    }

    console.error("INSTAGRAM_INFO_ERROR", caught);
    res.status(502).json({
      success: false,
      error: "No se pudo obtener la informacion de Instagram.",
      errorCode: "INSTAGRAM_INFO_FAILED",
    });
  }
});

app.post("/api/instagram/download", async (req, res) => {
  try {
    const fileUrl = req.body?.url;
    const filename = req.body?.filename || "clipnexo-instagram.mp4";

    if (!fileUrl || typeof fileUrl !== "string" || !fileUrl.startsWith("http")) {
      res.status(400).json({
        success: false,
        error: "URL de descarga invalida.",
        errorCode: "INVALID_DOWNLOAD_URL",
      });
      return;
    }

    const parsed = new URL(fileUrl);
    if (isPrivateIp(parsed.hostname) || parsed.hostname === "localhost") {
      res.status(400).json({
        success: false,
        error: "URL de descarga no permitida.",
        errorCode: "PRIVATE_URL_BLOCKED",
      });
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45_000);

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: { "User-Agent": "Mozilla/5.0", Accept: "*/*" },
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        res.status(502).json({
          success: false,
          error: "No se pudo descargar el archivo de Instagram.",
          errorCode: "INSTAGRAM_DOWNLOAD_FAILED",
        });
        return;
      }

      res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Cache-Control", "no-store");

      response.body.pipe(res);
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (caught) {
    console.error("INSTAGRAM_DOWNLOAD_ERROR", caught);
    res.status(502).json({
      success: false,
      error: "No se pudo iniciar la descarga de Instagram.",
      errorCode: "INSTAGRAM_DOWNLOAD_FAILED",
    });
  }
});

// ── Error handlers ────────────────────────────────────────────────────

app.use((err, _req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      success: false,
      error: "El cuerpo JSON enviado no es valido.",
      errorCode: "INVALID_JSON",
    });
    return;
  }
  next(err);
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Ruta no encontrada.", errorCode: "NOT_FOUND" });
});

app.use((err, _req, res, _next) => {
  console.error("UNHANDLED_ERROR", err);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor.",
    errorCode: "INTERNAL_SERVER_ERROR",
  });
});

app.listen(port, host, () => {
  console.log(`clipnexo-api listening on http://${host}:${port}`);
  console.log(`Instagram cookies: ${fs.existsSync(instagramCookiesPath) ? "FOUND" : "MISSING"}`);
});
