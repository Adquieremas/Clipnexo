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
    width: "Ancho (px)",
    height: "Alto (px)",
    start: "Inicio (segundos)",
    controls: "Mostrar controles",
    generate: "Generar Código",
    clear: "Limpiar",
    resultsHeading: "Código de inserción (Embed)",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tu código aparecerá aquí",
    emptyText: "Pega la URL del video para generar el código iframe personalizado.",
    invalidUrl: "URL de YouTube no válida.",
  },
  en: {
    url: "YouTube Video URL",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    width: "Width (px)",
    height: "Height (px)",
    start: "Start (seconds)",
    controls: "Show controls",
    generate: "Generate Code",
    clear: "Clear",
    resultsHeading: "Embed Code",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your code will appear here",
    emptyText: "Paste the video URL to generate the custom iframe code.",
    invalidUrl: "Invalid YouTube URL.",
  },
  pt: {
    url: "URL do vídeo do YouTube",
    urlPlaceholder: "https://www.youtube.com/watch?v=...",
    width: "Largura (px)",
    height: "Altura (px)",
    start: "Início (segundos)",
    controls: "Mostrar controles",
    generate: "Gerar Código",
    clear: "Limpar",
    resultsHeading: "Código de incorporação (Embed)",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seu código aparecerá aqui",
    emptyText: "Cole a URL do vídeo para gerar o código iframe personalizado.",
    invalidUrl: "URL do YouTube inválida.",
  },
} as const;

export default function YouTubeEmbedCodeGenerator({ lang }: Props) {
  const t = copy[lang];
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState("560");
  const [height, setHeight] = useState("315");
  const [start, setStart] = useState("");
  const [controls, setControls] = useState(true);
  const [code, setCode] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) return;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
    const videoId = match ? match[1] : "";
    if (videoId) {
      const src =
        "https://www.youtube.com/embed/" +
        videoId +
        "?controls=" +
        (controls ? 1 : 0) +
        (start ? "&start=" + start : "");
      setCode(
        '<iframe width="' +
          width +
          '" height="' +
          height +
          '" src="' +
          src +
          '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );
    } else {
      setCode(t.invalidUrl);
    }
  };

  const handleClear = () => {
    setUrl("");
    setCode("");
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="tool-field">
            <span>{t.width}</span>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </label>
          <label className="tool-field">
            <span>{t.height}</span>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="tool-field">
            <span>{t.start}</span>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer select-none mt-auto mb-3">
            <input
              type="checkbox"
              checked={controls}
              onChange={(e) => setControls(e.target.checked)}
              className="w-5 h-5 accent-blue-600"
            />
            {t.controls}
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

      {code ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={code} label={t.copy} copiedLabel={t.copied} />
            </div>
            <textarea
              readOnly
              value={code}
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none font-mono text-sm text-gray-700"
            />
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