export type InstagramContentType = "reel" | "video" | "image" | "carousel";

export type InstagramMediaItem = {
  type: "video" | "image";
  url: string;
  downloadUrl?: string | null;
  thumbnail?: string | null;
  width?: number | null;
  height?: number | null;
  ext?: string | null;
  duration?: number | null;
};

export type InstagramMediaFormat = {
  format_id?: string | null;
  ext?: string | null;
  mimeType?: string | null;
  url?: string | null;
  resolution?: string | null;
  width?: number | null;
  height?: number | null;
  vcodec?: string | null;
  acodec?: string | null;
  filesize?: number | null;
  filesize_approx?: number | null;
  format_note?: string | null;
};

export type InstagramVideoOption = {
  label: string;
  quality: "mp4" | "hd";
  url: string;
  ext: "mp4";
  width?: number | null;
  height?: number | null;
};

export type InstagramAudioOption = {
  label: string;
  quality: "mp3";
  url: string;
  ext: "mp3";
};

export type InstagramInfoSuccess = {
  success: true;
  source: "instagram";
  provider: string;
  type: InstagramContentType;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  uploader: string;
  hashtags: string[];
  items: InstagramMediaItem[];
  formats: InstagramMediaFormat[];
  shortcode?: string | null;
  downloadUrl?: string | null;
  videoUrl?: string | null;
  videoOptions?: InstagramVideoOption[];
  audioOptions?: InstagramAudioOption[];
  audioUrl?: string | null;
  combinedUrl?: string | null;
  videoOnly?: boolean;
  audioAvailable?: boolean;
  mp3Available?: boolean;
  webpage_url?: string | null;
};

export type InstagramInfoError = {
  success: false;
  error: string;
  errorCode: string;
  details?: Record<string, unknown>;
};

export type InstagramInfoResponse = InstagramInfoSuccess | InstagramInfoError;
