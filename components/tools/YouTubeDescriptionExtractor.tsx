"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Pega la descripción de YouTube aquí",
    placeholder: "Copia aquí la descripción completa del video...",
    extract: "Extraer Datos",
    clear: "Limpiar",
    resultsHeading: "Datos extraídos",
    mainText: "Texto Principal",
    links: "Enlaces",
    hashtags: "Hashtags",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus datos aparecerán aquí",
    emptyText: "Pega una descripción para separar el texto, los enlaces y los hashtags automáticamente.",
  },
  en: {
    label: "Paste YouTube description here",
    placeholder: "Paste here the full video description...",
    extract: "Extract Data",
    clear: "Clear",
    resultsHeading: "Extracted data",
    mainText: "Main Text",
    links: "Links",
    hashtags: "Hashtags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your data will appear here",
    emptyText: "Paste a description to automatically separate text, links, and hashtags.",
  },
  pt: {
    label: "Cole a descrição do YouTube aqui",
    placeholder: "Cole aqui a descrição completa do vídeo...",
    extract: "Extrair Dados",
    clear: "Limpar",
    resultsHeading: "Dados extraídos",
    mainText: "Texto Principal",
    links: "Links",
    hashtags: "Hashtags",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus dados aparecerão aqui",
    emptyText: "Cole uma descrição para separar o texto, os links e os hashtags automaticamente.",
  },
} as const;

export default function YouTubeDescriptionExtractor({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [extracted, setExtracted] = useState({ text: "", links: "", tags: "" });

  const handleExtract = () => {
    if (!text.trim()) return;
    const linksMatches = text.match(/https?:\/\/\S+/g) || [];
    const tagsMatches = text.match(/#[a-zA-Z0-9_]+/g) || [];
    let mainText = text
      .replace(/https?:\/\/\S+/g, "")
      .replace(/#[a-zA-Z0-9_]+/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    setExtracted({
      text: mainText,
      links: linksMatches.join("\n"),
      tags: tagsMatches.join(" "),
    });
  };

  const handleClear = () => {
    setText("");
    setExtracted({ text: "", links: "", tags: "" });
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
            className="w-full h-40 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
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

      {extracted.text || extracted.links || extracted.tags ? (
        <div className="tool-combined-results">
          <h3 className="mb-4 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
          
          <section className="tool-result-card">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold text-gray-700">{t.mainText}</h4>
              <CopyButton text={extracted.text} label={t.copy} copiedLabel={t.copied} />
            </div>
            <textarea
              readOnly
              value={extracted.text}
              className="w-full h-32 p-3 bg-white border border-gray-100 rounded-xl outline-none resize-none text-gray-600 text-sm"
            />
          </section>

          <section className="tool-result-card mt-4">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold text-gray-700">{t.links}</h4>
              <CopyButton text={extracted.links} label={t.copy} copiedLabel={t.copied} />
            </div>
            <textarea
              readOnly
              value={extracted.links}
              className="w-full h-24 p-3 bg-white border border-gray-100 rounded-xl outline-none resize-none text-blue-600 text-sm"
            />
          </section>

          <section className="tool-result-card mt-4">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold text-gray-700">{t.hashtags}</h4>
              <CopyButton text={extracted.tags} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div className="hashtag-list">
              {extracted.tags.split(" ").filter(t => t.startsWith("#")).map((tag, idx) => (
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