"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    url: "URL del video de YouTube",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    generate: "Buscar Miniaturas",
    clear: "Limpiar",
    resultsHeading: "Miniaturas encontradas",
    openImage: "Abrir imagen",
    quality: {
      max: "Máxima Calidad (HD)",
      high: "Alta Calidad",
    },
    emptyTitle: "Tus miniaturas aparecerán aquí",
    emptyText: "Pega la URL del video para extraer las miniaturas en diferentes calidades.",
  },
  en: {
    url: "YouTube Video URL",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    generate: "Find Thumbnails",
    clear: "Clear",
    resultsHeading: "Found thumbnails",
    openImage: "Open image",
    quality: {
      max: "Maximum Quality (HD)",
      high: "High Quality",
    },
    emptyTitle: "Your thumbnails will appear here",
    emptyText: "Paste the video URL to extract thumbnails in different qualities.",
  },
  pt: {
    url: "URL do vídeo do YouTube",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    generate: "Buscar Miniaturas",
    clear: "Limpar",
    resultsHeading: "Miniaturas encontradas",
    openImage: "Abrir imagem",
    quality: {
      max: "Máxima Qualidade (HD)",
      high: "Alta Qualidade",
    },
    emptyTitle: "Suas miniaturas aparecerão aqui",
    emptyText: "Cole a URL do vídeo para extrair as miniaturas em diferentes qualidades.",
  },
} as const;

export default function YouTubeThumbnailDownloader({ lang }: Props) {
  const t = copy[lang];
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleExtract = () => {
    if (!url.trim()) return;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
    setVideoId(match ? match[1] : "");
  };

  const handleClear = () => {
    setUrl("");
    setVideoId("");
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.url}</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.urlPlaceholder}
          />
        </label>
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={handleExtract}>
          {t.generate}
        </button>
        <button type="button" className="tool-button-secondary" onClick={handleClear}>
          {t.clear}
        </button>
      </div>

      {videoId ? (
        <div className="tool-combined-results">
          <h3 className="mb-4 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tool-result-card text-center flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-2 uppercase tracking-wide">
                {t.quality.max}
              </span>
              <img
                src={"https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"}
                alt="Thumbnail maxres"
                className="w-full rounded-xl shadow-sm border border-gray-100"
              />
              <a
                href={"https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"}
                target="_blank"
                rel="noreferrer"
                className="tool-button-secondary mt-4 w-full text-center no-underline flex items-center justify-center"
              >
                {t.openImage}
              </a>
            </div>
            <div className="tool-result-card text-center flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-2 uppercase tracking-wide">
                {t.quality.high}
              </span>
              <img
                src={"https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"}
                alt="Thumbnail hq"
                className="w-full rounded-xl shadow-sm border border-gray-100"
              />
              <a
                href={"https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"}
                target="_blank"
                rel="noreferrer"
                className="tool-button-secondary mt-4 w-full text-center no-underline flex items-center justify-center"
              >
                {t.openImage}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="tool-empty">
          <strong>{t.emptyTitle}</strong>
          <p>{t.emptyText}</p>
        </div>
      )}
    </div>
  );
}