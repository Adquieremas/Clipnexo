"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DownloadHistory from "@/components/DownloadHistory";
import { getFriendlyClipnexoApiError, getVideoInfo } from "@/lib/clipnexo-api";
import {
  addDownloadHistoryItem,
  clearDownloadHistory,
  getDownloadHistory,
  removeDownloadHistoryItem,
  type DownloadHistoryItem,
} from "@/lib/download-history";
import { buildDownloadFilename, downloadFile } from "@/lib/download-manager";
import { getStatusStyles, type StatusType } from "@/lib/downloader-status";
import {
  getDescriptionText,
  getHashtagList,
  getPreviewImage,
  getPreviewVideo,
  getVideoDownloadUrls,
  hasResultContent as hasResultContentUtil,
  isTikTokUrl,
  type DownloaderResult,
} from "@/lib/downloader-utils";
import { getLocalizedRoute } from "@/lib/routes";

type Props = {
  lang: string;
  type?: "video" | "mp3";
  variant?: "default" | "home" | "tool";
  initialUrl?: string;
  shared?: boolean;
  shareError?: boolean;
  invalidPath?: boolean;
};

export default function DownloaderBox({
  lang,
  type = "video",
  variant = "default",
  initialUrl = "",
  shared = false,
  shareError = false,
  invalidPath = false,
}: Props) {
  const isHome = variant === "home";
  const isPolished = variant === "home" || variant === "tool";
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloaderResult>(null);
  const [failedPreview, setFailedPreview] = useState<string | null>(null);
  const [previewUnavailable, setPreviewUnavailable] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("info");
  const [isMobile, setIsMobile] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const [downloadingType, setDownloadingType] = useState<"video" | "audio" | null>(null);
  const [historyItems, setHistoryItems] = useState<DownloadHistoryItem[]>([]);

  const autoPasteTriedRef = useRef(false);

  const translations: Record<string, Record<string, string>> = {
    es: {
      title: type === "mp3" ? "TikTok a MP3" : "Descargador de Videos TikTok",
      subtitle:
        type === "mp3"
          ? "Convierte videos de TikTok a MP3 y descarga audio en segundos."
          : "Descarga videos de TikTok sin marca de agua",
      placeholder: isHome
        ? "Enlace de TikTok"
        : "Pega aquí el enlace de TikTok...",
      button:
        type === "mp3"
          ? isPolished
            ? "Descargar MP3"
            : "DESCARGAR MP3"
          : isPolished
          ? "Descargar"
          : "DESCARGAR",
      loading: "Procesando enlace...",
      errorVideo: "No se pudo cargar el video",
      videoInfoError: "No se pudo obtener información del video",
      serviceUnavailable: "Servicio temporalmente no disponible",
      genericError: "Ocurrió un error. Inténtalo nuevamente.",
      downloadFailed: "No se pudo completar la descarga. Vuelve a procesar el mismo enlace para obtener un archivo actualizado.",
      unsupportedPhoto:
        "Este enlace es de fotos/carrusel. Por ahora Clipnexo solo admite videos de TikTok.",
      requestTimeout: "TikTok tardó demasiado en responder. Intenta con otro video.",
      providersFailed: "No se pudo obtener la información del video en este momento.",
      downloadVideo: isPolished ? "Descargar video" : "Descargar Video",
      downloadAudio: "Descargar Audio (MP3)",
      downloadingVideo: "Preparando video...",
      downloadingAudio: "Preparando audio...",
      downloadStartedVideo: "La descarga del video ha comenzado.",
      downloadStartedAudio: "La descarga del audio ha comenzado.",
      previewTitle: "Vista previa del video",
      descriptionTitle: "Descripción",
      hashtagsTitle: "Hashtags",
      paste: "Pegar",
      pasteLoading: "Pegando...",
      clear: "Limpiar",
      success: "Información del video encontrada correctamente.",
      noDownload: "Se encontró el video, pero el archivo no está disponible para descargar.",
      guideCta: "Cómo descargar",
      invalidUrl: "Pega un enlace válido de TikTok.",
      clipboardError: "No se pudo pegar desde el portapapeles.",
      clipboardSuccess: "Enlace pegado correctamente.",
      clipboardEmpty: "No se encontró un enlace en el portapapeles.",
      sharedSuccess: "Enlace compartido de TikTok recibido correctamente.",
      sharedError: "No se recibió un enlace válido de TikTok.",
      invalidPathMessage: "Datos no encontrados. ¡Inténtalo de nuevo!",
    },
    en: {
      title: type === "mp3" ? "TikTok to MP3" : "TikTok Video Downloader",
      subtitle:
        type === "mp3"
          ? "Convert TikTok videos to MP3 and download audio in seconds."
          : "Download TikTok videos without watermark",
      placeholder: isHome
        ? "TikTok link"
        : "Paste TikTok link here...",
      button:
        type === "mp3"
          ? isPolished
            ? "Download MP3"
            : "DOWNLOAD MP3"
          : isPolished
          ? "Download"
          : "DOWNLOAD",
      loading: "Processing link...",
      errorVideo: "Could not load video",
      videoInfoError: "Could not get video information",
      serviceUnavailable: "Service temporarily unavailable",
      genericError: "Something went wrong. Please try again.",
      downloadFailed: "The download could not finish. Submit the same link again to get a fresh file.",
      unsupportedPhoto:
        "This is a photo/carousel link. Clipnexo currently only supports TikTok videos.",
      requestTimeout: "TikTok took too long to respond. Try another video.",
      providersFailed: "Could not get the video information right now.",
      downloadVideo: isPolished ? "Download video" : "Download Video",
      downloadAudio: "Download Audio (MP3)",
      downloadingVideo: "Preparing video...",
      downloadingAudio: "Preparing audio...",
      downloadStartedVideo: "The video download has started.",
      downloadStartedAudio: "The audio download has started.",
      previewTitle: "Video preview",
      descriptionTitle: "Description",
      hashtagsTitle: "Hashtags",
      paste: "Paste",
      pasteLoading: "Pasting...",
      clear: "Clear",
      success: "Video information found successfully.",
      noDownload: "The video was found, but the file is unavailable for download.",
      guideCta: "How to download",
      invalidUrl: "Paste a valid TikTok link.",
      clipboardError: "Could not paste from clipboard.",
      clipboardSuccess: "Link pasted successfully.",
      clipboardEmpty: "No valid link was found in the clipboard.",
      sharedSuccess: "Shared TikTok link received successfully.",
      sharedError: "No valid TikTok link was received.",
      invalidPathMessage: "Data not found. Please try again!",
    },
    pt: {
      title: type === "mp3" ? "TikTok para MP3" : "Baixar vídeos do TikTok",
      subtitle:
        type === "mp3"
          ? "Converta vídeos do TikTok em MP3 e baixe o áudio em segundos."
          : "Baixe vídeos do TikTok sem marca d’água",
      placeholder: isHome
        ? "Link do TikTok"
        : "Cole o link do TikTok aqui...",
      button:
        type === "mp3"
          ? isPolished
            ? "Baixar MP3"
            : "BAIXAR MP3"
          : isPolished
          ? "Baixar"
          : "BAIXAR",
      loading: "Processando link...",
      errorVideo: "Não foi possível carregar o vídeo",
      videoInfoError: "Não foi possível obter informações do vídeo",
      serviceUnavailable: "Serviço temporariamente indisponível",
      genericError: "Ocorreu um erro. Tente novamente.",
      downloadFailed: "Não foi possível concluir o download. Envie o mesmo link novamente para obter um arquivo atualizado.",
      unsupportedPhoto:
        "Este link é de fotos/carrossel. Por enquanto, o Clipnexo só aceita vídeos do TikTok.",
      requestTimeout: "O TikTok demorou demais para responder. Tente outro vídeo.",
      providersFailed: "Não foi possível obter as informações do vídeo neste momento.",
      downloadVideo: isPolished ? "Baixar vídeo" : "Baixar Vídeo",
      downloadAudio: "Baixar Áudio (MP3)",
      downloadingVideo: "Preparando vídeo...",
      downloadingAudio: "Preparando áudio...",
      downloadStartedVideo: "O download do vídeo começou.",
      downloadStartedAudio: "O download do áudio começou.",
      previewTitle: "Pré-visualização do vídeo",
      descriptionTitle: "Descrição",
      hashtagsTitle: "Hashtags",
      paste: "Colar",
      pasteLoading: "Colando...",
      clear: "Limpar",
      success: "Informações do vídeo encontradas com sucesso.",
      noDownload: "O vídeo foi encontrado, mas o arquivo não está disponível para download.",
      guideCta: "Como baixar",
      invalidUrl: "Cole um link válido do TikTok.",
      clipboardError: "Não foi possível colar da área de transferência.",
      clipboardSuccess: "Link colado com sucesso.",
      clipboardEmpty: "Nenhum link válido foi encontrado na área de transferência.",
      sharedSuccess: "Link compartilhado do TikTok recebido com sucesso.",
      sharedError: "Nenhum link válido do TikTok foi recebido.",
      invalidPathMessage: "Dados não encontrados. Tente novamente!",
    },
  };

  const t = translations[lang] || translations.es;
  const guideUrl = getLocalizedRoute("guide", lang);

  const preferredPreview = getPreviewVideo(result);
  const videoDownloadUrls = getVideoDownloadUrls(result);
  const downloadVideo = videoDownloadUrls[0];
  const previewVideo = previewUnavailable
    ? null
    : failedPreview === preferredPreview
      ? downloadVideo !== failedPreview ? downloadVideo : null
      : preferredPreview;
  const previewImage = getPreviewImage(result);
  const descriptionText = getDescriptionText(result);
  const hashtagList = getHashtagList(result);
  const hasResultContent = hasResultContentUtil(result);

  const isBusy = loading || isPasting || downloadingType !== null;

  const statusStyles = useMemo(() => getStatusStyles(), []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHistoryItems(getDownloadHistory());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (initialUrl.trim()) {
        setUrl(initialUrl.trim());
        setStatusType("success");
        setStatusMessage(t.sharedSuccess);
        return;
      }

      if (shared && shareError) {
        setStatusType("error");
        setStatusMessage(t.sharedError);
        return;
      }

      if (invalidPath) {
        setStatusType("error");
        setStatusMessage(t.invalidPathMessage);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [
    initialUrl,
    shared,
    shareError,
    invalidPath,
    t.sharedError,
    t.sharedSuccess,
    t.invalidPathMessage,
  ]);

  const readClipboardText = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
      throw new Error("Clipboard API not available");
    }
    return navigator.clipboard.readText();
  };

  const handlePaste = async (showSuccessMessage = true) => {
    setIsPasting(true);

    try {
      const text = await readClipboardText();

      if (!text?.trim()) {
        setStatusType("error");
        setStatusMessage(t.clipboardEmpty);
        return;
      }

      setUrl(text.trim());

      if (showSuccessMessage) {
        setStatusType("success");
        setStatusMessage(t.clipboardSuccess);
      }
    } catch {
      setStatusType("error");
      setStatusMessage(t.clipboardError);
    } finally {
      setIsPasting(false);
    }
  };

  const handleInputFocus = async () => {
    if (!isMobile || autoPasteTriedRef.current || url.trim()) return;

    autoPasteTriedRef.current = true;

    try {
      const text = await readClipboardText();
      if (text?.trim() && isTikTokUrl(text)) {
        setUrl(text.trim());
        setStatusType("info");
        setStatusMessage(t.clipboardSuccess);
      }
    } catch {
      // sin mensaje para no molestar al usuario
    }
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setStatusMessage("");
    setStatusType("info");
    setDownloadingType(null);
  };

  const handleDownload = async () => {
    if (isBusy) return;

    if (!url.trim() || !isTikTokUrl(url)) {
      setStatusType("error");
      setStatusMessage(t.invalidUrl);
      return;
    }

    setLoading(true);
    setFailedPreview(null);
    setPreviewUnavailable(false);
    setResult(null);
    setStatusType("info");
    setStatusMessage(t.loading);

    try {
      const data = await getVideoInfo(url);
      setResult(data);

      const hasDownload = Boolean(type === "mp3" ? data.audio : getVideoDownloadUrls(data).length > 0);
      setStatusType(hasDownload ? "success" : "error");
      setStatusMessage(
        hasDownload ? t.success : data.downloadErrorCode === "REQUEST_TIMEOUT" ? t.requestTimeout : t.noDownload
      );

      const updatedHistory = addDownloadHistoryItem({
        url,
        type,
        title: data?.title || "",
        description: data?.title || "",
        thumbnail: data?.thumbnail || "",
        videoUrl: "",
        audioUrl: "",
      });

      setHistoryItems(updatedHistory);
    } catch (error) {
      setStatusType("error");
      const friendlyMessage = getFriendlyClipnexoApiError(error);
      const errorCode =
        error && typeof error === "object" && "code" in error && typeof error.code === "string"
          ? error.code
          : undefined;
      const devSuffix = process.env.NODE_ENV !== "production" && errorCode ? ` (${errorCode})` : "";
      const specificMessage =
        errorCode === "UNSUPPORTED_TIKTOK_PHOTO"
          ? t.unsupportedPhoto
          : errorCode === "REQUEST_TIMEOUT"
          ? t.requestTimeout
          : errorCode === "TIKTOK_PROVIDERS_FAILED"
          ? t.providersFailed
          : "";

      setResult(specificMessage ? null : { error: true });

      let nextStatusMessage: string;

      if (specificMessage) {
        nextStatusMessage =
          process.env.NODE_ENV !== "production"
            ? `${specificMessage}${devSuffix}`
            : specificMessage;
      } else if (friendlyMessage === "El enlace no es válido") {
        nextStatusMessage = t.invalidUrl;
      } else if (friendlyMessage === "Servicio temporalmente no disponible") {
        nextStatusMessage =
          process.env.NODE_ENV !== "production"
            ? `${t.serviceUnavailable}${devSuffix}`
            : t.serviceUnavailable;
      } else {
        nextStatusMessage =
          process.env.NODE_ENV !== "production"
            ? `${t.videoInfoError}${devSuffix}`
            : t.videoInfoError || t.genericError;
      }

      setStatusMessage(nextStatusMessage);
    } finally {
      setLoading(false);
    }
  };

  const forceDownload = async (
    fileUrl: string,
    fallbackFilename: string,
    fileType: "video" | "audio"
  ) => {
    setDownloadingType(fileType);
    setStatusType("info");
    setStatusMessage(fileType === "video" ? t.downloadingVideo : t.downloadingAudio);

    try {
      const generatedFilename = buildDownloadFilename(
        result?.title || result?.description || result?.desc || fallbackFilename,
        fileType
      );

      const urls = fileType === "video" ? videoDownloadUrls : [fileUrl];
      for (const [index, candidate] of urls.entries()) {
        try {
          await downloadFile({ fileUrl: candidate, fileType, filename: generatedFilename });
          break;
        } catch (error) {
          if (index === urls.length - 1) throw error;
        }
      }

      setStatusType("success");
      setStatusMessage(
        fileType === "video" ? t.downloadStartedVideo : t.downloadStartedAudio
      );
    } catch {
      setStatusType("error");
      setStatusMessage(t.downloadFailed);
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
    setHistoryItems(removeDownloadHistoryItem(id));
  };

  const handleClearHistory = () => {
    clearDownloadHistory();
    setHistoryItems([]);
  };

  return (
    <section
      style={{
        maxWidth: isPolished ? "900px" : "1040px",
        margin: isPolished ? "0 auto" : "0 auto 40px auto",
        textAlign: "center",
        background: "transparent",
        color: "inherit",
      }}
    >
      <div>
        <form
          className="tiktok-download-form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleDownload();
          }}
        >
          <div className="tiktok-download-field">
            <input
              type="text"
              inputMode="url"
              aria-label={t.placeholder}
              placeholder={t.placeholder}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onFocus={handleInputFocus}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => handlePaste(true)}
              disabled={isBusy}
            >
              {isPasting ? t.pasteLoading : t.paste}
            </button>
          </div>
          <button type="submit" className="tiktok-download-submit" disabled={isBusy}>
            {loading ? t.loading : t.button}
          </button>
        </form>

        <div className="tiktok-download-actions">
          <a href={guideUrl}>{t.guideCta}</a>
          {url && (
            <button type="button" onClick={handleClear} disabled={isBusy}>
              {t.clear}
            </button>
          )}
        </div>

        {statusMessage && (
          <div
            role={statusType === "error" ? "alert" : "status"}
            style={{
              marginTop: "14px",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 600,
              textAlign: "left",
              lineHeight: 1.5,
              ...statusStyles[statusType],
            }}
          >
            {statusMessage}
          </div>
        )}

        {result && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {hasResultContent && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "minmax(0, 1.1fr) minmax(280px, 0.9fr)",
                  gap: isMobile ? "14px" : "16px",
                  textAlign: "left",
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: isPolished ? "14px" : "16px",
                }}
              >
                <div>
                  {(previewVideo || previewImage) && (
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#111",
                          margin: "0 0 10px 0",
                        }}
                      >
                        {t.previewTitle}
                      </p>

                      {previewVideo ? (
                        <video
                          key={previewVideo}
                          src={previewVideo}
                          controls
                          playsInline
                          preload="metadata"
                          onError={() => {
                            if (previewVideo === preferredPreview && downloadVideo !== previewVideo) {
                              setFailedPreview(previewVideo);
                            } else {
                              setPreviewUnavailable(true);
                            }
                          }}
                          poster={previewImage || undefined}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            background: "#000",
                            maxHeight: isMobile
                              ? isPolished
                                ? "380px"
                                : "420px"
                              : isPolished
                              ? "340px"
                              : "420px",
                          }}
                        >
                          {t.errorVideo}
                        </video>
                      ) : (
                        <img
                          src={previewImage || ""}
                          alt={t.previewTitle}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            objectFit: "cover",
                            maxHeight: isMobile
                              ? isPolished
                                ? "380px"
                                : "420px"
                              : isPolished
                              ? "340px"
                              : "420px",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    justifyContent: "space-between",
                    minWidth: 0,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {descriptionText && (
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#111",
                            margin: "0 0 6px 0",
                          }}
                        >
                          {t.descriptionTitle}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            color: "#374151",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            wordBreak: "break-word",
                            display: isPolished ? "-webkit-box" : undefined,
                            WebkitBoxOrient: isPolished ? "vertical" : undefined,
                            WebkitLineClamp: isPolished ? 3 : undefined,
                            overflow: isPolished ? "hidden" : undefined,
                          }}
                        >
                          {descriptionText}
                        </p>
                      </div>
                    )}

                    {hashtagList.length > 0 && (
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#111",
                            margin: "0 0 8px 0",
                          }}
                        >
                          {t.hashtagsTitle}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {hashtagList.map((tag: string, index: number) => (
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
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {type !== "mp3" && downloadVideo && (
                      <button
                        onClick={() => forceDownload(downloadVideo, "video.mp4", "video")}
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

                    {result?.audio && (
                      <button
                        onClick={() => forceDownload(result.audio || "", "audio.mp3", "audio")}
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

            {result?.error && (
              <p style={{ color: "red", marginTop: "10px" }}>{t.errorVideo}</p>
            )}
          </div>
        )}
      </div>

      {(!isPolished || historyItems.length > 0) && (
        <DownloadHistory
          lang={lang}
          compact={isPolished}
          items={historyItems}
          onReuse={handleReuseHistory}
          onRemove={handleRemoveHistory}
          onClear={handleClearHistory}
        />
      )}
    </section>
  );
}
