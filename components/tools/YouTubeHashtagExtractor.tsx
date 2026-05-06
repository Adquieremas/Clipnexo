"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Pega el texto o descripción aquí",
    placeholder: "Copia aquí el contenido del que deseas extraer los hashtags...",
    extract: "Extraer Hashtags",
    clear: "Limpiar",
    resultsHeading: "Hashtags extraídos",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus hashtags aparecerán aquí",
    emptyText: "Pega un texto para analizar y extraer todos los hashtags que contenga.",
  },
  en: {
    label: "Paste text or description here",
    placeholder: "Paste here the content you want to extract hashtags from...",
    extract: "Extract Hashtags",
    clear: "Clear",
    resultsHeading: "Extracted hashtags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your hashtags will appear here",
    emptyText: "Paste a text to analyze and extract all the hashtags it contains.",
  },
  pt: {
    label: "Cole o texto ou descrição aqui",
    placeholder: "Cole aqui o conteúdo do qual deseja extrair os hashtags...",
    extract: "Extrair Hashtags",
    clear: "Limpar",
    resultsHeading: "Hashtags extraídos",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus hashtags aparecerão aqui",
    emptyText: "Cole um texto para analisar e extrair todos os hashtags que ele contém.",
  },
} as const;

export default function YouTubeHashtagExtractor({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handleExtract = () => {
    if (!text.trim()) return;
    const matches = text.match(/#[a-zA-Z0-9_]+/g) || [];
    const unique = [...new Set(matches)];
    setTags(unique.join(" "));
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
            <div className="hashtag-list">
              {tags.split(" ").map((tag, idx) => (
                <span key={idx}>{tag}</span>
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