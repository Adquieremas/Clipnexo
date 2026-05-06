"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    url: "URL del video de YouTube",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    minutes: "Minutos",
    seconds: "Segundos",
    generate: "Generar Enlace con Tiempo",
    clear: "Limpiar",
    resultsHeading: "Enlace generado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tu enlace aparecerá aquí",
    emptyText: "Pega la URL y define el tiempo exacto para generar el enlace compartido.",
  },
  en: {
    url: "YouTube Video URL",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    minutes: "Minutes",
    seconds: "Seconds",
    generate: "Generate Timestamp Link",
    clear: "Clear",
    resultsHeading: "Generated link",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your link will appear here",
    emptyText: "Paste the URL and set the exact time to generate the shared link.",
  },
  pt: {
    url: "URL do vídeo do YouTube",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    minutes: "Minutos",
    seconds: "Segundos",
    generate: "Gerar Link com Tempo",
    clear: "Limpar",
    resultsHeading: "Link gerado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seu link aparecerá aqui",
    emptyText: "Cole a URL e defina o tempo exato para gerar o link compartilhado.",
  },
} as const;

export default function YouTubeTimestampLinkGenerator({ lang }: Props) {
  const t = copy[lang];
  const [url, setUrl] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [link, setLink] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) return;
    const time = parseInt(minutes || "0") * 60 + parseInt(seconds || "0");
    const connector = url.includes("?") ? "&" : "?";
    setLink(url.trim() + connector + "t=" + time + "s");
  };

  const handleClear = () => {
    setUrl("");
    setMinutes("");
    setSeconds("");
    setLink("");
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
        <div className="grid grid-cols-2 gap-4">
          <label className="tool-field">
            <span>{t.minutes}</span>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="0"
              min="0"
            />
          </label>
          <label className="tool-field">
            <span>{t.seconds}</span>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="0"
              min="0"
              max="59"
            />
          </label>
        </div>
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={handleGenerate}>
          {t.generate}
        </button>
        <button type="button" className="tool-button-secondary" onClick={handleClear}>
          {t.clear}
        </button>
      </div>

      {link ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={link} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div className="truncate font-mono text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700">
              {link}
            </div>
          </section>
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