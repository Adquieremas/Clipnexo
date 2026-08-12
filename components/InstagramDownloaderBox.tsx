"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DownloadHistory from "@/components/DownloadHistory";
import {
  addDownloadHistoryItem,
  clearDownloadHistory,
  getDownloadHistory,
  removeDownloadHistoryItem,
  type DownloadHistoryItem,
} from "@/lib/download-history";
import { getStatusStyles, type StatusType } from "@/lib/downloader-status";
import type { InstagramInfoSuccess } from "@/lib/instagram-types";
import { getLocalizedRoute } from "@/lib/routes";

type InstagramClientError = {
  success?: false;
  error: string;
  errorCode: string;
};

type Props = {
  lang: string;
  initialUrl?: string;
};

function isInstagramUrl(value: string) {
  try {
    const parsed = new URL(value.trim());
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return ["http:", "https:"].includes(parsed.protocol) && hostname === "instagram.com";
  } catch {
    return false;
  }
}

function isOriginalInstagramPageUrl(value: string) {
  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const section = parsed.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
    return hostname === "instagram.com" && ["reel", "reels", "p", "tv"].includes(section || "");
  } catch {
    return false;
  }
}

function isRealMediaDownloadUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("blob:") || trimmed.startsWith("data:")) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && !isOriginalInstagramPageUrl(trimmed);
  } catch {
    return false;
  }
}

function getInstagramVideoUrl(metadata: InstagramInfoSuccess) {
  if (isRealMediaDownloadUrl(metadata.videoUrl)) return metadata.videoUrl;
  if (isRealMediaDownloadUrl(metadata.downloadUrl)) return metadata.downloadUrl;

  const videoWithDownloadUrl = metadata.items.find(
    (item) => item.type === "video" && isRealMediaDownloadUrl(item.downloadUrl)
  );
  if (videoWithDownloadUrl?.downloadUrl) return videoWithDownloadUrl.downloadUrl;

  const videoWithUrl = metadata.items.find(
    (item) => item.type === "video" && isRealMediaDownloadUrl(item.url)
  );
  if (videoWithUrl?.url) return videoWithUrl.url;

  const mp4Format = metadata.formats.find(
    (format) => format.ext?.toLowerCase() === "mp4" && isRealMediaDownloadUrl(format.url)
  );
  if (mp4Format?.url) return mp4Format.url;

  const mp4MimeFormat = metadata.formats.find(
    (format) => format.mimeType?.toLowerCase() === "video/mp4" && isRealMediaDownloadUrl(format.url)
  );
  if (mp4MimeFormat?.url) return mp4MimeFormat.url;

  return "";
}

function sanitizeInstagramFilename(input: string) {
  const cleaned = input
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, "")
    .slice(0, 80);

  return cleaned || "instagram";
}

function extractInstagramShortcode(value: string | null | undefined) {
  if (!value) return "";

  try {
    const parsed = new URL(value);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const section = segments[0]?.toLowerCase();
    return ["reel", "reels", "p", "tv"].includes(section || "")
      ? sanitizeInstagramFilename(segments[1] || "")
      : "";
  } catch {
    return "";
  }
}

function getInstagramShortcode(metadata: InstagramInfoSuccess | null, inputUrl: string) {
  return (
    sanitizeInstagramFilename(metadata?.shortcode || "") ||
    extractInstagramShortcode(metadata?.webpage_url) ||
    extractInstagramShortcode(inputUrl) ||
    "video"
  );
}

function buildInstagramFilename(
  metadata: InstagramInfoSuccess | null,
  inputUrl: string,
  suffix: string,
  extension: string
) {
  const shortcode = getInstagramShortcode(metadata, inputUrl);
  const safeSuffix = sanitizeInstagramFilename(suffix);
  return `clipnexo-instagram-${shortcode}${safeSuffix ? `-${safeSuffix}` : ""}.${extension}`;
}

async function readJsonSafely<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default function InstagramDownloaderBox({ lang, initialUrl = "" }: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [result, setResult] = useState<InstagramInfoSuccess | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const [downloadingType, setDownloadingType] = useState<"video" | "audio" | null>(null);
  const [statusType, setStatusType] = useState<StatusType>("info");
  const [statusMessage, setStatusMessage] = useState("");
  const [historyItems, setHistoryItems] = useState<DownloadHistoryItem[]>([]);

  const translations: Record<string, Record<string, string>> = {
    es: {
      title: "Descargar videos y Reels de Instagram gratis",
      subtitle:
        "Pega el enlace de un Reel o video público de Instagram y descárgalo en MP4 o extrae el audio en MP3.",
      placeholder: "Pega aquí el enlace de Instagram",
      paste: "Pegar enlace",
      pasteLoading: "Pegando...",
      clear: "Limpiar",
      button: "Descargar",
      loading: "Procesando enlace...",
      ready: "Contenido listo. Elige una opción de descarga.",
      invalidUrl: "Pega un enlace válido de Instagram.",
      unsupportedStory:
        "Este enlace es de una historia. Por ahora Clipnexo solo admite Reels y videos públicos.",
      loginRequired: "Este contenido puede requerir sesión o no estar disponible públicamente.",
      upstreamBlocked:
        "Instagram no permitió obtener la información de este enlace. Intenta con otro Reel público.",
      providerUnavailable:
        "Por ahora Clipnexo admite Reels y videos públicos que Instagram permita leer.",
      providerNotInstalled: "El proveedor de Instagram aún no está instalado en el servidor.",
      providerNotImplemented: "El proveedor de Instagram aún no está conectado en el backend.",
      timeout: "Instagram tardó demasiado en responder. Intenta con otro enlace público.",
      infoFailed: "No se pudo obtener la información de Instagram en este momento.",
      downloadFailed: "No se pudo iniciar la descarga de Instagram.",
      invalidMediaResponse: "Instagram no devolvió un archivo de video válido. Intenta con otro enlace público.",
      downloadBlocked: "Instagram bloqueó la descarga directa por proxy. Abrimos el archivo en una nueva pestaña.",
      missingDownloadUrl: "No se encontró una URL real de descarga para este contenido.",
      mp3NotAvailable: "La descarga en MP3 aún no está disponible para Instagram.",
      mp3Failed: "No se pudo iniciar la descarga del audio MP3.",
      clipboardError: "No se pudo pegar desde el portapapeles.",
      clipboardEmpty: "No se encontró un enlace en el portapapeles.",
      clipboardSuccess: "Enlace pegado correctamente.",
      emptyTitle: "Descarga Reels y videos públicos en MP4 o MP3",
      emptyText:
        "Pega un enlace público de Instagram para ver la vista previa y descargar el video en MP4 o extraer el audio en MP3.",
      guideCta: "¿Primera vez? Ver cómo funciona →",
      previewTitle: "Vista previa del contenido",
      descriptionTitle: "Descripción",
      hashtagsTitle: "Hashtags",
      downloadVideo: "Descargar video MP4",
      downloadAudio: "Descargar audio MP3",
      downloadingVideo: "Preparando video...",
      downloadingAudio: "Preparando audio...",
      downloadStartedVideo: "La descarga del video MP4 ha comenzado.",
      downloadStartedAudio: "La descarga del audio MP3 ha comenzado.",
      legal:
        "Usa Clipnexo solo para descargar contenido propio, público o con autorización del titular. Respeta los derechos de autor y la privacidad de otras personas.",
    },
    en: {
      title: "Download Instagram videos and Reels free",
      subtitle:
        "Paste a public Instagram Reel or video link and download it as MP4 or extract the audio as MP3.",
      placeholder: "Paste Instagram link here",
      paste: "Paste link",
      pasteLoading: "Pasting...",
      clear: "Clear",
      button: "Download",
      loading: "Processing link...",
      ready: "Content ready. Choose a download option.",
      invalidUrl: "Paste a valid Instagram link.",
      unsupportedStory:
        "Stories are not supported yet. Clipnexo currently supports public Reels and videos.",
      loginRequired: "This content may require a session or may not be publicly available.",
      upstreamBlocked:
        "Instagram did not allow this link to be loaded. Try another public Reel.",
      providerUnavailable:
        "Clipnexo currently supports public Reels and videos that Instagram allows reading.",
      providerNotInstalled: "The Instagram provider is not installed on the server yet.",
      providerNotImplemented: "The Instagram provider is not connected in the backend yet.",
      timeout: "Instagram took too long to respond. Try another public link.",
      infoFailed: "Instagram information could not be loaded right now.",
      downloadFailed: "Instagram download could not be started.",
      invalidMediaResponse: "Instagram did not return a valid video file. Try another public link.",
      downloadBlocked: "Instagram blocked the proxy download. We opened the file in a new tab.",
      missingDownloadUrl: "Could not find a real download URL for this content.",
      mp3NotAvailable: "MP3 download is not available for Instagram yet.",
      mp3Failed: "MP3 audio download could not be started.",
      clipboardError: "Could not paste from clipboard.",
      clipboardEmpty: "No valid link was found in the clipboard.",
      clipboardSuccess: "Link pasted successfully.",
      emptyTitle: "Download public Reels and videos as MP4 or MP3",
      emptyText:
        "Paste a public Instagram link to view the preview and download the video as MP4 or extract the audio as MP3.",
      guideCta: "First time here? See how it works →",
      previewTitle: "Content preview",
      descriptionTitle: "Description",
      hashtagsTitle: "Hashtags",
      downloadVideo: "Download MP4 video",
      downloadAudio: "Download MP3 audio",
      downloadingVideo: "Preparing video...",
      downloadingAudio: "Preparing audio...",
      downloadStartedVideo: "MP4 video download has started.",
      downloadStartedAudio: "MP3 audio download has started.",
      legal:
        "Use Clipnexo only to download your own content, public content or content you have permission to save. Respect copyright and privacy.",
    },
    pt: {
      title: "Baixar vídeos e Reels do Instagram grátis",
      subtitle:
        "Cole o link de um Reel ou vídeo público do Instagram e baixe em MP4 ou extraia o áudio em MP3.",
      placeholder: "Cole o link do Instagram aqui",
      paste: "Colar link",
      pasteLoading: "Colando...",
      clear: "Limpar",
      button: "Baixar",
      loading: "Processando link...",
      ready: "Conteúdo pronto. Escolha uma opção de download.",
      invalidUrl: "Cole um link válido do Instagram.",
      unsupportedStory:
        "Stories ainda não são suportados. O Clipnexo atualmente suporta Reels e vídeos públicos.",
      loginRequired: "Este conteúdo pode exigir sessão ou não estar disponível publicamente.",
      upstreamBlocked:
        "O Instagram não permitiu obter as informações deste link. Tente outro Reel público.",
      providerUnavailable:
        "Por enquanto, o Clipnexo suporta Reels e vídeos públicos que o Instagram permita ler.",
      providerNotInstalled: "O provedor do Instagram ainda não está instalado no servidor.",
      providerNotImplemented: "O provedor do Instagram ainda não está conectado no backend.",
      timeout: "O Instagram demorou demais para responder. Tente outro link público.",
      infoFailed: "Não foi possível carregar as informações do Instagram agora.",
      downloadFailed: "Não foi possível iniciar o download do Instagram.",
      invalidMediaResponse: "O Instagram não retornou um arquivo de vídeo válido. Tente outro link público.",
      downloadBlocked: "O Instagram bloqueou o download por proxy. Abrimos o arquivo em uma nova aba.",
      missingDownloadUrl: "Não foi encontrada uma URL real de download para este conteúdo.",
      mp3NotAvailable: "O download em MP3 ainda não está disponível para Instagram.",
      mp3Failed: "Não foi possível iniciar o download do áudio MP3.",
      clipboardError: "Não foi possível colar da área de transferência.",
      clipboardEmpty: "Nenhum link válido foi encontrado na área de transferência.",
      clipboardSuccess: "Link colado com sucesso.",
      emptyTitle: "Baixe Reels e vídeos públicos em MP4 ou MP3",
      emptyText:
        "Cole um link público do Instagram para ver a prévia e baixar o vídeo em MP4 ou extrair o áudio em MP3.",
      guideCta: "Primeira vez? Veja como funciona →",
      previewTitle: "Pré-visualização do conteúdo",
      descriptionTitle: "Descrição",
      hashtagsTitle: "Hashtags",
      downloadVideo: "Baixar vídeo MP4",
      downloadAudio: "Baixar áudio MP3",
      downloadingVideo: "Preparando vídeo...",
      downloadingAudio: "Preparando áudio...",
      downloadStartedVideo: "O download do vídeo MP4 começou.",
      downloadStartedAudio: "O download do áudio MP3 começou.",
      legal:
        "Use o Clipnexo apenas para baixar conteúdo próprio, público ou com autorização do titular. Respeite direitos autorais e privacidade.",
    },
  };

  const t = translations[lang] || translations.es;
  const isBusy = loading || isPasting || downloadingType !== null;
  const statusStyles = useMemo(() => getStatusStyles(), []);
  const firstVideoItem = result?.items.find((item) => item.type === "video") || null;
  const firstImageItem = result?.items.find((item) => item.type === "image") || null;
  const videoDownloadUrl = result ? getInstagramVideoUrl(result) : "";
  const canDownloadMp3 = Boolean(result?.mp3Available && result?.audioAvailable);
  const previewVideo = result?.combinedUrl || firstVideoItem?.url || "";
  const previewImage = firstVideoItem?.thumbnail || firstImageItem?.url || result?.thumbnail || "";
  const isVideoOnly = result?.videoOnly || false;
  const guideUrl = getLocalizedRoute("guide", lang);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHistoryItems(getDownloadHistory().filter((item) => isInstagramUrl(item.url)));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handlePaste = async () => {
    setIsPasting(true);

    try {
      const text = await navigator.clipboard.readText();
      if (!text?.trim()) {
        setStatusType("error");
        setStatusMessage(t.clipboardEmpty);
        return;
      }

      setUrl(text.trim());
      setStatusType("success");
      setStatusMessage(t.clipboardSuccess);
    } catch {
      setStatusType("error");
      setStatusMessage(t.clipboardError);
    } finally {
      setIsPasting(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setStatusType("info");
    setStatusMessage("");
    setDownloadingType(null);
  };

  const handleInfoError = (error: InstagramClientError) => {
    const devSuffix = process.env.NODE_ENV !== "production" ? ` (${error.errorCode})` : "";
    const messagesByCode: Record<string, string> = {
      EMPTY_URL: t.invalidUrl,
      INVALID_INSTAGRAM_URL: t.invalidUrl,
      UNSUPPORTED_INSTAGRAM_STORY: t.unsupportedStory,
      INSTAGRAM_LOGIN_REQUIRED: t.loginRequired,
      INSTAGRAM_UPSTREAM_BLOCKED: t.upstreamBlocked,
      INSTAGRAM_PROVIDER_UNAVAILABLE: t.providerUnavailable,
      INSTAGRAM_PROVIDER_NOT_INSTALLED: t.providerNotInstalled,
      INSTAGRAM_PROVIDER_NOT_IMPLEMENTED: t.providerNotImplemented,
      REQUEST_TIMEOUT: t.timeout,
    };

    const message = messagesByCode[error.errorCode] || t.infoFailed;

    setStatusType("error");
    setStatusMessage(`${message}${devSuffix}`);
    setResult(null);
  };

  const handleDownloadInfo = async () => {
    if (isBusy) return;

    if (!url.trim() || !isInstagramUrl(url)) {
      setStatusType("error");
      setStatusMessage(t.invalidUrl);
      return;
    }

    setLoading(true);
    setResult(null);
    setStatusType("info");
    setStatusMessage(t.loading);

    try {
      const response = await fetch("/api/instagram/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await readJsonSafely<InstagramInfoSuccess | InstagramClientError>(response);
      if (!response.ok || !data || "success" in data && data.success === false) {
        handleInfoError({
          error: "error" in (data || {}) ? String((data as InstagramClientError).error) : t.infoFailed,
          errorCode:
            "errorCode" in (data || {})
              ? String((data as InstagramClientError).errorCode)
              : "INSTAGRAM_INFO_FAILED",
        });
        return;
      }

      const instagramResult = data as InstagramInfoSuccess;
      setResult(instagramResult);
      setStatusType("success");
      setStatusMessage(t.ready);

      const updatedHistory = addDownloadHistoryItem({
        url,
        type: "video",
        title: instagramResult.title || instagramResult.uploader || "Instagram",
        description: instagramResult.description || "",
        thumbnail: instagramResult.thumbnail || "",
        videoUrl: getInstagramVideoUrl(instagramResult),
        audioUrl: instagramResult.audioUrl || "",
      });
      setHistoryItems(updatedHistory.filter((item) => isInstagramUrl(item.url)));
    } catch {
      setStatusType("error");
      setStatusMessage(t.infoFailed);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const openDirectDownload = (fileUrl: string, filename: string) => {
    const opened = window.open(fileUrl, "_blank", "noopener,noreferrer");
    if (opened) return;

    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = filename;
    anchor.rel = "noopener noreferrer";
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const downloadViaProxy = async (
    fileUrl: string,
    filename: string,
    mediaType: "video" | "audio",
    format: "mp4" | "mp3" = "mp4",
    extraPayload: Record<string, string> = {}
  ) => {
    const body: Record<string, string> = { url: fileUrl, filename, type: mediaType, format, ...extraPayload };

    if (process.env.NODE_ENV !== "production") {
      console.log("[instagram-download-proxy]", body);
    }

    const response = await fetch("/api/instagram/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await readJsonSafely<InstagramClientError>(response);
      const errorCode = data?.errorCode || "";

      if (errorCode === "INSTAGRAM_CDN_PROXY_BLOCKED" && mediaType === "video") {
        openDirectDownload(fileUrl, filename);
        return "direct" as const;
      }

      if (errorCode === "INVALID_MEDIA_RESPONSE") {
        throw new Error("INVALID_MEDIA_RESPONSE");
      }

      if (errorCode === "MP3_NOT_AVAILABLE" || errorCode === "AUDIO_CONVERSION_NOT_AVAILABLE") {
        throw new Error("MP3_NOT_AVAILABLE");
      }

      throw new Error(`Download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    try {
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = filename;
      anchor.rel = "noopener";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } finally {
      window.URL.revokeObjectURL(blobUrl);
    }

    return "proxy" as const;
  };

  const handleDownloadVideo = async () => {
    if (isBusy || !result) return;

    if (!isRealMediaDownloadUrl(videoDownloadUrl)) {
      setStatusType("error");
      setStatusMessage(t.missingDownloadUrl);
      return;
    }

    const hasSeparateAudio = isRealMediaDownloadUrl(result.audioUrl) && result.audioUrl !== videoDownloadUrl;
    const combinedSourceUrl = result.combinedUrl;
    const audioPayload: Record<string, string> = {};

    if (hasSeparateAudio && result.audioUrl) {
      audioPayload.audioUrl = result.audioUrl;
    }
    if (combinedSourceUrl && combinedSourceUrl !== videoDownloadUrl) {
      audioPayload.combinedUrl = combinedSourceUrl;
    }
    audioPayload.videoUrl = videoDownloadUrl;

    setDownloadingType("video");
    setStatusType("info");
    setStatusMessage(t.downloadingVideo);

    try {
      const filename = buildInstagramFilename(result, url, "", "mp4");

      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp4-click]", {
          shortcode: result.shortcode,
          url: videoDownloadUrl,
          audioUrl: hasSeparateAudio ? result.audioUrl : "none",
          combinedUrl: combinedSourceUrl || "none",
          videoOnly: isVideoOnly,
          audioAvailable: result.audioAvailable,
          filename,
        });
      }

      const downloadMode = await downloadViaProxy(videoDownloadUrl, filename, "video", "mp4", audioPayload);

      setStatusType("success");
      setStatusMessage(downloadMode === "direct" ? t.downloadBlocked : t.downloadStartedVideo);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error && error.message === "INVALID_MEDIA_RESPONSE"
          ? t.invalidMediaResponse
          : error instanceof Error && error.message === "MP3_NOT_AVAILABLE"
          ? t.mp3NotAvailable
          : t.downloadFailed
      );
    } finally {
      setDownloadingType(null);
    }
  };

  const handleDownloadAudio = async () => {
    if (isBusy || !result) return;

    const hasSeparateAudio = isRealMediaDownloadUrl(result.audioUrl);
    const audioSourceForDownload = hasSeparateAudio ? result.audioUrl as string : videoDownloadUrl;

    if (!isRealMediaDownloadUrl(audioSourceForDownload)) {
      setStatusType("error");
      setStatusMessage(t.missingDownloadUrl);
      return;
    }

    if (!canDownloadMp3) {
      setStatusType("error");
      setStatusMessage(t.mp3NotAvailable);
      return;
    }

    setDownloadingType("audio");
    setStatusType("info");
    setStatusMessage(t.downloadingAudio);

    try {
      const filename = buildInstagramFilename(result, url, "audio", "mp3");

      if (process.env.NODE_ENV !== "production") {
        console.log("[instagram-mp3-click]", {
          shortcode: result.shortcode,
          audioUrl: audioSourceForDownload,
          combinedUrl: result.combinedUrl || "none",
          videoUrl: videoDownloadUrl,
          hasSeparateAudio,
          audioAvailable: result.audioAvailable,
          filename,
        });
      }

      const extraPayload: Record<string, string> = {};
      if (hasSeparateAudio && result.audioUrl) {
        extraPayload.audioUrl = result.audioUrl;
      }
      if (result.combinedUrl) {
        extraPayload.combinedUrl = result.combinedUrl;
      }

      await downloadViaProxy(
        audioSourceForDownload,
        filename,
        "audio",
        "mp3",
        extraPayload
      );

      setStatusType("success");
      setStatusMessage(t.downloadStartedAudio);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error && error.message === "MP3_NOT_AVAILABLE" ? t.mp3NotAvailable : t.mp3Failed
      );
    } finally {
      setDownloadingType(null);
    }
  };

  const handleReuseHistory = (item: DownloadHistoryItem) => {
    setUrl(item.url);
    setResult(null);
    setStatusType("info");
    setStatusMessage("");
  };

  const handleRemoveHistory = (id: string) => {
    setHistoryItems(removeDownloadHistoryItem(id).filter((item) => isInstagramUrl(item.url)));
  };

  const handleClearHistory = () => {
    clearDownloadHistory();
    setHistoryItems([]);
  };

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
        color: "inherit",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "clamp(16px, 3vw, 22px)",
          border: "1px solid #ebeaf3",
          borderRadius: "20px",
          boxShadow: "0 18px 50px rgba(79, 70, 229, 0.10)",
          transition: "max-width 0.25s ease",
        }}
      >
        <input
          type="text"
          placeholder={t.placeholder}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          style={{
            width: "100%",
            padding: "13px 14px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "12px",
            color: "black",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handlePaste}
            disabled={isBusy}
            style={{
              flex: "1 1 130px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#111",
              fontWeight: 600,
              cursor: isBusy ? "not-allowed" : "pointer",
              opacity: isBusy ? 0.7 : 1,
            }}
          >
            {isPasting ? t.pasteLoading : t.paste}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isBusy}
            style={{
              flex: "1 1 130px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#f9fafb",
              color: "#111",
              fontWeight: 600,
              cursor: isBusy ? "not-allowed" : "pointer",
              opacity: isBusy ? 0.7 : 1,
            }}
          >
            {t.clear}
          </button>
        </div>

        <button
          type="button"
          onClick={handleDownloadInfo}
          disabled={isBusy}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "8px",
            border: "none",
            color: "white",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
            cursor: isBusy ? "not-allowed" : "pointer",
            opacity: isBusy ? 0.85 : 1,
          }}
        >
          {loading ? t.loading : t.button}
        </button>

        {statusMessage && (
          <div
            style={{
              marginTop: "14px",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "left",
              lineHeight: 1.5,
              ...statusStyles[statusType],
            }}
          >
            {statusMessage}
          </div>
        )}

        {!loading && !result && (
          <div
            style={{
              marginTop: "12px",
              textAlign: "left",
              border: "none",
              background: "#fbfaff",
              borderRadius: "10px",
              padding: "11px 14px",
            }}
          >
            <p style={{ margin: "0 0 3px 0", fontSize: "15px", fontWeight: 700, color: "#111" }}>
              {t.emptyTitle}
            </p>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "#475569" }}>
              {t.emptyText}
            </p>
            <p style={{ margin: "7px 0 0 0", fontSize: "13px", lineHeight: 1.6 }}>
              <a
                href={guideUrl}
                style={{ color: "#6366f1", fontWeight: 500, textDecoration: "none" }}
              >
                {t.guideCta}
              </a>
            </p>
          </div>
        )}

        {result && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginTop: "16px",
              textAlign: "left",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                {t.previewTitle}
              </p>
              {previewVideo ? (
                <video
                  controls
                  playsInline
                  poster={previewImage || undefined}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    background: "#000",
                    maxHeight: "340px",
                  }}
                >
                  <source src={previewVideo} />
                </video>
              ) : (
                <Image
                  src={previewImage}
                  alt={t.previewTitle}
                  width={800}
                  height={1000}
                  unoptimized
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "cover",
                    maxHeight: "340px",
                  }}
                />
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: 0 }}>
              {result.description && (
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 6px 0" }}>
                    {t.descriptionTitle}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      wordBreak: "break-word",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {result.description}
                  </p>
                </div>
              )}

              {result.hashtags.length > 0 && (
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>
                    {t.hashtagsTitle}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {result.hashtags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        style={{
                          background: "#e0e7ff",
                          color: "#3730a3",
                          padding: "6px 10px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {videoDownloadUrl && (
                  <button
                    type="button"
                    onClick={handleDownloadVideo}
                    disabled={isBusy}
                    style={{
                      width: "100%",
                      minHeight: "44px",
                      padding: "11px 14px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      cursor: isBusy ? "not-allowed" : "pointer",
                      opacity: downloadingType === "video" ? 0.85 : 1,
                    }}
                  >
                    {downloadingType === "video" ? t.downloadingVideo : t.downloadVideo}
                  </button>
                )}

                {canDownloadMp3 && (
                  <button
                    type="button"
                    onClick={handleDownloadAudio}
                    disabled={isBusy}
                    style={{
                      width: "100%",
                      minHeight: "44px",
                      padding: "11px 14px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      cursor: isBusy ? "not-allowed" : "pointer",
                      opacity: downloadingType === "audio" ? 0.85 : 1,
                    }}
                  >
                    {downloadingType === "audio" ? t.downloadingAudio : t.downloadAudio}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <DownloadHistory
        lang={lang}
        compact
        items={historyItems}
        onReuse={handleReuseHistory}
        onRemove={handleRemoveHistory}
        onClear={handleClearHistory}
      />
    </section>
  );
}
