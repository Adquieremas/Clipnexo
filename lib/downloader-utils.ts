export type DownloaderResult = {
  play?: string;
  video?: string;
  videoUrl?: string;
  cover?: string;
  thumbnail?: string;
  image?: string;
  description?: string;
  desc?: string;
  title?: string;
  text?: string;
  hashtags?: string[] | string;
  audio?: string;
  error?: string | boolean;
  [key: string]: unknown;
} | null;

export function isTikTokUrl(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized.includes("tiktok.com") || normalized.includes("vm.tiktok.com");
}

export function getPreviewVideo(result: DownloaderResult) {
  return result?.play || result?.video || result?.videoUrl || null;
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
