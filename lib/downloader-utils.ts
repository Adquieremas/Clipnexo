export type DownloaderResult = {
  success?: boolean;
  source?: string;
  play?: string | null;
  video?: string | null;
  videoUrl?: string | null;
  cover?: string | null;
  thumbnail?: string | null;
  image?: string | null;
  description?: string | null;
  desc?: string | null;
  title?: string | null;
  text?: string | null;
  hashtags?: string[] | string;
  audio?: string;
  duration?: number | null;
  uploader?: string | null;
  webpage_url?: string | null;
  extractor?: string | null;
  formats?: unknown[];
  errorCode?: string;
  error?: string | boolean;
  [key: string]: unknown;
} | null;

export function isTikTokUrl(value: string) {
  try {
    const parsed = new URL(value.trim());
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();

    return ["tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"].includes(hostname);
  } catch {
    return false;
  }
}

function isMediaUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function getVideoDownloadUrls(result: DownloaderResult) {
  return Array.from(new Set([
    result?.video,
    result?.play,
    result?.videoUrl,
    ...(Array.isArray(result?.alternateVideoUrls) ? result.alternateVideoUrls : []),
  ].filter(isMediaUrl)));
}

export function getPreviewVideo(result: DownloaderResult) {
  return [result?.play, ...getVideoDownloadUrls(result)].find(isMediaUrl) ?? null;
}

export function getPreviewImage(result: DownloaderResult) {
  return result?.cover || result?.thumbnail || result?.image || null;
}

export function getDescriptionText(result: DownloaderResult) {
  return result?.description || result?.desc || result?.title || result?.text || "";
}

export function getHashtagList(result: DownloaderResult): string[] {
  if (Array.isArray(result?.hashtags)) {
    return result.hashtags;
  }

  if (typeof result?.hashtags === "string") {
    return result.hashtags.split(" ").filter(Boolean);
  }

  if (typeof result?.desc === "string") {
    return result.desc.split(" ").filter((item: string) => item.startsWith("#"));
  }

  if (typeof result?.description === "string") {
    return result.description.split(" ").filter((item: string) => item.startsWith("#"));
  }

  return [];
}

export function hasResultContent(result: DownloaderResult) {
  const previewVideo = getPreviewVideo(result);
  const previewImage = getPreviewImage(result);
  const descriptionText = getDescriptionText(result);
  const hashtagList = getHashtagList(result);

  return Boolean(
    result &&
      (previewVideo ||
        previewImage ||
        descriptionText ||
        hashtagList.length > 0 ||
        result?.video ||
        result?.audio)
  );
}
