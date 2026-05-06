"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import ResultCard from "./ResultCard";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Pega el texto o lista de videos aquí",
    placeholder: "Copia aquí el contenido del que deseas extraer los títulos...",
    extract: "Extraer Títulos",
    clear: "Limpiar",
    resultsHeading: "Títulos extraídos",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus títulos aparecerán aquí",
    emptyText: "Pega un texto o lista de reproducción para identificar y limpiar los títulos de video.",
  },
  en: {
    label: "Paste text or video list here",
    placeholder: "Paste here the content you want to extract titles from...",
    extract: "Extract Titles",
    clear: "Clear",
    resultsHeading: "Extracted titles",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your titles will appear here",
    emptyText: "Paste a text or playlist to identify and clean up video titles.",
  },
  pt: {
    label: "Cole o texto ou lista de vídeos aqui",
    placeholder: "Cole aqui o conteúdo do qual deseja extrair os títulos...",
    extract: "Extrair Títulos",
    clear: "Limpar",
    resultsHeading: "Títulos extraídos",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus títulos aparecerão aqui",
    emptyText: "Cole um texto ou lista de reprodução para identificar e limpar os títulos de vídeo.",
  },
} as const;

export default function YouTubeTitleExtractor({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const handleExtract = () => {
    if (!text.trim()) return;
    const lines = text
      .split("\n")
      .map((l) => l.replace(/https?:\/\/\S+/g, "").trim())
      .filter((l) => l.length > 5);
    setTitles(lines);
  };

  const handleClear = () => {
    setText("");
    setTitles([]);
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.label}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </label>
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={handleExtract}>
          {t.extract}
        </button>
        <button type="button" className="tool-button-secondary" onClick={handleClear}>
          {t.clear}
        </button>
      </div>

      {titles.length > 0 ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={titles.join("\n")} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div className="tool-results">
              {titles.map((title, i) => (
                <ResultCard key={i} text={title} copiedLabel={t.copied} />
              ))}
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