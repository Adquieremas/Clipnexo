"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Pega el texto, descripción o título aquí",
    placeholder: "Copia aquí el contenido del que deseas extraer las etiquetas...",
    extract: "Extraer Etiquetas",
    clear: "Limpiar",
    resultsHeading: "Etiquetas extraídas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus etiquetas aparecerán aquí",
    emptyText: "Pega un texto para analizar y extraer las etiquetas automáticas de YouTube.",
  },
  en: {
    label: "Paste text, description or title here",
    placeholder: "Paste here the content you want to extract tags from...",
    extract: "Extract Tags",
    clear: "Clear",
    resultsHeading: "Extracted tags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your tags will appear here",
    emptyText: "Paste a text to analyze and extract automatic YouTube tags.",
  },
  pt: {
    label: "Cole o texto, descrição ou título aqui",
    placeholder: "Cole aqui o conteúdo do qual deseja extrair as tags...",
    extract: "Extrair Tags",
    clear: "Limpar",
    resultsHeading: "Tags extraídas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas tags aparecerão aqui",
    emptyText: "Cole um texto para analisar e extrair as tags automáticas do YouTube.",
  },
} as const;

export default function YouTubeTagExtractor({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handleExtract = () => {
    if (!text.trim()) return;
    const words = text.split(/[\s,.-]+/).filter((w) => w.length > 3);
    const unique = [...new Set(words)];
    setTags(unique.slice(0, 30).join(", "));
  };

  const handleClear = () => {
    setText("");
    setTags("");
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

      {tags ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={tags} label={t.copy} copiedLabel={t.copied} />
            </div>
            <textarea
              readOnly
              value={tags}
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none font-medium text-gray-700"
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