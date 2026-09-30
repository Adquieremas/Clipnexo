export type DownloadFileType = "video" | "audio";

type DownloadFileOptions = {
  fileUrl: string;
  fileType: DownloadFileType;
  filename?: string;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

const MAX_FILENAME_LENGTH = 80;

function sanitizeFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Drop anything that isn't a plain ASCII letter, digit, space or hyphen \u2014
    // this removes emoji, hashtags (#), ampersands and other symbols that
    // some mobile OS download managers mishandle or reject in filenames.
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, MAX_FILENAME_LENGTH)
    .replace(/-+$/g, "");
}

function getExtensionFromType(fileType: DownloadFileType) {
  return fileType === "audio" ? "mp3" : "mp4";
}

function getDefaultFilename(fileType: DownloadFileType) {
  return fileType === "audio" ? "clipnexo-audio.mp3" : "clipnexo-video.mp4";
}

function ensureExtension(filename: string, fileType: DownloadFileType) {
  const extension = getExtensionFromType(fileType);
  const lower = filename.toLowerCase();

  if (lower.endsWith(`.${extension}`)) {
    return filename;
  }

  return `${filename}.${extension}`;
}

export function buildDownloadFilename(
  title: string | undefined,
  fileType: DownloadFileType
) {
  if (!title?.trim()) {
    return getDefaultFilename(fileType);
  }

  const safeTitle = sanitizeFilename(title.trim());
  if (!safeTitle) {
    return getDefaultFilename(fileType);
  }

  return ensureExtension(safeTitle, fileType);
}

export async function downloadFile({
  fileUrl,
  fileType,
  filename,
}: DownloadFileOptions) {
  if (!isBrowser()) {
    throw new Error("Download can only run in the browser.");
  }

  if (!fileUrl?.trim()) {
    throw new Error("Missing file URL.");
  }

  const finalFilename = filename?.trim()
    ? ensureExtension(filename.trim(), fileType)
    : getDefaultFilename(fileType);

  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}.`);
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  try {
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = finalFilename;
    anchor.rel = "noopener";
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  } finally {
    window.URL.revokeObjectURL(blobUrl);
  }
}

export function openFileInNewTab(fileUrl: string) {
  if (!isBrowser()) {
    throw new Error("This action can only run in the browser.");
  }

  if (!fileUrl?.trim()) {
    throw new Error("Missing file URL.");
  }

  window.open(fileUrl, "_blank", "noopener,noreferrer");
}