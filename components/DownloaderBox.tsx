"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DownloadHistory from "@/components/DownloadHistory";
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
  hasResultContent as hasResultContentUtil,
  isTikTokUrl,
} from "@/lib/downloader-utils";
import { getLocalizedRoute } from "@/lib/routes";

type Props = {
  lang: string;
  type?: "video" | "mp3";
  initialUrl?: string;
  shared?: boolean;
  shareError?: boolean;
};

export default function DownloaderBox({
  lang,
  type = "video",
  initialUrl = "",
  shared = false,
  shareError = false,
}: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("info");
  const [isMobile, setIsMobile] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const [downloadingType, setDownloadingType] = useState<"video" | "audio" | null>(null);
  const [historyItems, setHistoryItems] = useState<DownloadHistoryItem[]>([]);

  const autoPasteTriedRef = useRef(false);

  const translations: Record<string, any> = {
    es: {
      title: type === "mp3" ? "TikTok a MP3" : "Descargador de Videos TikTok",
      subtitle:
        type === "mp3"
          ? "Convierte videos de TikTok a MP3 y descarga audio en segundos."
          : "Descarga videos de TikTok sin marca de agua",
      placeholder: "Pega aquí el enlace de TikTok...",
      button: type === "mp3" ? "DESCARGAR MP3" : "DESCARGAR",
      loading: "Procesando enlace...",
      errorVideo: "No se pudo cargar el video",
      genericError: "Ocurrió un error. Inténtalo nuevamente.",
      downloadVideo: "Descargar Video",
      downloadAudio: "Descargar Audio (MP3)",
      downloadingVideo: "Preparando video...",
      downloadingAudio: "Preparando audio...",
      downloadStartedVideo: "La descarga del video ha comenzado.",
      downloadStartedAudio: "La descarga del audio ha comenzado.",
      previewTitle: "Vista previa del video",
      descriptionTitle: "Descripción",
      hashtagsTitle: "Hashtags",
      paste: "Pegar enlace",
      pasteLoading: "Pegando...",
      clear: "Limpiar",
      success: "Video encontrado correctamente. Ya puedes descargarlo.",
      emptyTitle:
        type === "mp3"
          ? "Convierte TikTok a MP3 en segundos"
          : "Descarga videos de TikTok en segundos",
      emptyText:
        type === "mp3"
          ? "Pega el enlace de TikTok, procesa el contenido y descarga el audio listo para tu celular o PC."
          : "Pega el enlace de TikTok para ver la vista previa, los metadatos del video y los botones de descarga.",
      guideCta: "¿No sabes cómo usar Clipnexo? Mira la guía paso a paso aquí.",
      invalidUrl: "Pega un enlace válido de TikTok.",
      clipboardError: "No se pudo pegar desde el portapapeles.",
      clipboardSuccess: "Enlace pegado correctamente.",
      clipboardEmpty: "No se encontró un enlace en el portapapeles.",
      mobileHint:
        type === "mp3"
          ? "En celular puedes pegar el enlace, convertirlo y descargar el audio en segundos."
          : "En celular puedes pegar el enlace y descargar el video sin salir de la app.",
      mobilePasteHint: "Toca el campo o el botón Pegar para usar el enlace copiado.",
      sharedSuccess: "Enlace compartido de TikTok recibido correctamente.",
      sharedError: "No se recibió un enlace válido de TikTok.",
    },
    en: {
      title: type === "mp3" ? "TikTok to MP3" : "TikTok Video Downloader",
      subtitle:
        type === "mp3"
          ? "Convert TikTok videos to MP3 and download audio in seconds."
          : "Download TikTok videos without watermark",
      placeholder: "Paste TikTok link here...",
      button: type === "mp3" ? "DOWNLOAD MP3" : "DOWNLOAD",
      loading: "Processing link...",
      errorVideo: "Could not load video",
      genericError: "Something went wrong. Please try again.",
      downloadVideo: "Download Video",
      downloadAudio: "Download Audio (MP3)",
      downloadingVideo: "Preparing video...",
      downloadingAudio: "Preparing audio...",
      downloadStartedVideo: "The video download has started.",
      downloadStartedAudio: "The audio download has started.",
      previewTitle: "Video preview",
      descriptionTitle: "Description",
      hashtagsTitle: "Hashtags",
      paste: "Paste link",
      pasteLoading: "Pasting...",
      clear: "Clear",
      success: "Video found successfully. You can download it now.",
      emptyTitle:
        type === "mp3"
          ? "Convert TikTok to MP3 in seconds"
          : "Download TikTok videos in seconds",
      emptyText:
        type === "mp3"
          ? "Paste the TikTok link, process the content, and download the audio ready for your phone or PC."
          : "Paste the TikTok link to view the preview, video metadata, and download buttons.",
      guideCta: "Not sure how to use Clipnexo? View the step-by-step guide here.",
      invalidUrl: "Paste a valid TikTok link.",
      clipboardError: "Could not paste from clipboard.",
      clipboardSuccess: "Link pasted successfully.",
      clipboardEmpty: "No valid link was found in the clipboard.",
      mobileHint:
        type === "mp3"
          ? "On mobile you can paste the link, convert it and download the audio in seconds."
          : "On mobile you can paste the link and download the video without leaving the app.",
      mobilePasteHint: "Tap the field or the Paste button to use your copied link.",
      sharedSuccess: "Shared TikTok link received successfully.",
      sharedError: "No valid TikTok link was received.",
    },
    pt: {
      title: type === "mp3" ? "TikTok para MP3" : "Baixar vídeos do TikTok",
      subtitle:
        type === "mp3"
          ? "Converta vídeos do TikTok em MP3 e baixe o áudio em segundos."
          : "Baixe vídeos do TikTok sem marca d’água",
      placeholder: "Cole o link do TikTok aqui...",
      button: type === "mp3" ? "BAIXAR MP3" : "BAIXAR",
      loading: "Processando link...",
      errorVideo: "Não foi possível carregar o vídeo",
      genericError: "Ocorreu um erro. Tente novamente.",
      downloadVideo: "Baixar Vídeo",
      downloadAudio: "Baixar Áudio (MP3)",
      downloadingVideo: "Preparando vídeo...",
      downloadingAudio: "Preparando áudio...",
      downloadStartedVideo: "O download do vídeo começou.",
      downloadStartedAudio: "O download do áudio começou.",
      previewTitle: "Pré-visualização do vídeo",
      descriptionTitle: "Descrição",
      hashtagsTitle: "Hashtags",
      paste: "Colar link",
      pasteLoading: "Colando...",
      clear: "Limpar",
      success: "Vídeo encontrado com sucesso. Agora você pode baixá-lo.",
      emptyTitle:
        type === "mp3"
          ? "Converta TikTok para MP3 em segundos"
          : "Baixe vídeos do TikTok em segundos",
      emptyText:
        type === "mp3"
          ? "Cole o link do TikTok, processe o conteúdo e baixe o áudio pronto para o celular ou PC."
          : "Cole o link do TikTok para ver a prévia, os metadados do vídeo e os botões de download.",
      guideCta: "Não sabe como usar o Clipnexo? Veja o guia passo a passo aqui.",
      invalidUrl: "Cole um link válido do TikTok.",
      clipboardError: "Não foi possível colar da área de transferência.",
      clipboardSuccess: "Link colado com sucesso.",
      clipboardEmpty: "Nenhum link válido foi encontrado na área de transferência.",
      mobileHint:
        type === "mp3"
          ? "No celular você pode colar o link, converter e baixar o áudio em segundos."
          : "No celular você pode colar o link e baixar o vídeo sem sair do app.",
      mobilePasteHint: "Toque no campo ou no botão Colar para usar o link copiado.",
      sharedSuccess: "Link compartilhado do TikTok recebido com sucesso.",
      sharedError: "Nenhum link válido do TikTok foi recebido.",
    },
  };

  const t = translations[lang] || translations.es;
  const guideUrl = getLocalizedRoute("guide", lang);

  const previewVideo = getPreviewVideo(result);
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
    setHistoryItems(getDownloadHistory());
  }, []);

  useEffect(() => {
    if (initialUrl.trim()) {
      setUrl(initialUrl.trim());
      setStatusType("success");
      setStatusMessage(t.sharedSuccess);
      return;
    }

    if (shared && shareError) {
      setStatusType("error");
      setStatusMessage(t.sharedError);
    }
  }, [initialUrl, shared, shareError, t.sharedError, t.sharedSuccess]);

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
    setResult(null);
    setStatusType("info");
    setStatusMessage(t.loading);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type }),
      });

      const data = await res.json();
      setResult(data);

      if (!res.ok || data?.error) {
        setStatusType("error");
        setStatusMessage(data?.error || t.errorVideo);
      } else {
        setStatusType("success");
        setStatusMessage(t.success);

        const updatedHistory = addDownloadHistoryItem({
          url,
          type,
          title: data?.title || data?.description || data?.desc || "",
          description: data?.description || data?.desc || data?.title || "",
          thumbnail: data?.cover || data?.thumbnail || data?.image || "",
          videoUrl: data?.video || data?.play || data?.videoUrl || "",
          audioUrl: data?.audio || "",
        });

        setHistoryItems(updatedHistory);
      }
    } catch {
      setResult({ error: true });
      setStatusType("error");
      setStatusMessage(t.genericError);
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

      await downloadFile({
        fileUrl,
        fileType,
        filename: generatedFilename,
      });

      setStatusType("success");
      setStatusMessage(
        fileType === "video" ? t.downloadStartedVideo : t.downloadStartedAudio
      );
    } catch {
      setStatusType("error");
      setStatusMessage(t.genericError);
    } finally {
      setDownloadingType(null);
    }
  };

  const handleReuseHistory = (item: DownloadHistoryItem) => {
    setUrl(item.url);
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
        maxWidth: "1040px",
        margin: "0 auto 40px auto",
        textAlign: "center",
        background: "transparent",
        color: "inherit",
      }}
    >
      <div
        style={{
          maxWidth: hasResultContent ? "1040px" : "640px",
          margin: "0 auto",
          background: "white",
          padding: isMobile ? "16px" : "25px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          transition: "max-width 0.25s ease",
        }}
      >
        <input
          type="text"
          placeholder={t.placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={handleInputFocus}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "15px",
            color: "black",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => handlePaste(true)}
            disabled={isBusy}
            style={{
              flex: "1 1 160px",
              padding: "12px",
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
              flex: "1 1 160px",
              padding: "12px",
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
          onClick={handleDownload}
          disabled={isBusy}
          style={{
            width: "100%",
            padding: "15px",
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

        {!loading && !result && (
          <div
            style={{
              marginTop: "16px",
              textAlign: "left",
              border: "1px dashed #cbd5e1",
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <p
              style={{
                margin: "0 0 6px 0",
                fontSize: "15px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              {t.emptyTitle}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#475569",
              }}
            >
              {t.emptyText}
            </p>

            {isMobile && (
              <p
                style={{
                  margin: "10px 0 0 0",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#64748b",
                }}
              >
                {t.mobileHint}
              </p>
            )}

            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#64748b",
              }}
            >
              {t.mobilePasteHint}
            </p>

            <p
              style={{
                margin: "10px 0 0 0",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              <a
                href={guideUrl}
                style={{
                  color: "#2563eb",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {t.guideCta}
              </a>
            </p>
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
                  padding: "16px",
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
                          controls
                          playsInline
                          poster={previewImage || undefined}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            background: "#000",
                            maxHeight: isMobile ? "360px" : "420px",
                          }}
                        >
                          <source src={previewVideo} />
                          {t.errorVideo}
                        </video>
                      ) : (
                        <img
                          src={previewImage}
                          alt={t.previewTitle}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            objectFit: "cover",
                            maxHeight: isMobile ? "360px" : "420px",
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
                    {type !== "mp3" && result?.video && (
                      <button
                        onClick={() => forceDownload(result.video, "video.mp4", "video")}
                        disabled={isBusy}
                        style={{
                          padding: "12px",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
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
                        onClick={() => forceDownload(result.audio, "audio.mp3", "audio")}
                        disabled={isBusy}
                        style={{
                          padding: "12px",
                          background: "#16a34a",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
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

      <DownloadHistory
        lang={lang}
        items={historyItems}
        onReuse={handleReuseHistory}
        onRemove={handleRemoveHistory}
        onClear={handleClearHistory}
      />
    </section>
  );
}