"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Título",
    placeholder: "Escribe tu título aquí...",
    upper: "MAYÚSCULAS",
    lower: "minúsculas",
    title: "Tipo Título",
    sentence: "Oración",
    resultsHeading: "Resultado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tu resultado aparecerá aquí",
    emptyText: "Escribe un título y elige un formato de capitalización.",
  },
  en: {
    label: "Title",
    placeholder: "Type your title here...",
    upper: "UPPERCASE",
    lower: "lowercase",
    title: "Title Case",
    sentence: "Sentence case",
    resultsHeading: "Result",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your result will appear here",
    emptyText: "Enter a title and choose a capitalization format.",
  },
  pt: {
    label: "Título",
    placeholder: "Digite seu título aqui...",
    upper: "MAIÚSCULAS",
    lower: "minúsculas",
    title: "Tipo Título",
    sentence: "Frase",
    resultsHeading: "Resultado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seu resultado aparecerá aqui",
    emptyText: "Digite um título e escolha um formato de capitalização.",
  },
} as const;

export default function YouTubeTitleCapitalization({ lang }: Props) {
  const t = copy[lang];
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const convert = (type: string) => {
    if (!title.trim()) return;
    if (type === "upper") setResult(title.toUpperCase());
    if (type === "lower") setResult(title.toLowerCase());
    if (type === "title")
      setResult(
        title.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        )
      );
    if (type === "sentence")
      setResult(title.charAt(0).toUpperCase() + title.slice(1).toLowerCase());
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.label}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.placeholder}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <button
          onClick={() => convert("upper")}
          className="tool-button-secondary"
          style={{ padding: "10px" }}
        >
          {t.upper}
        </button>
        <button
          onClick={() => convert("lower")}
          className="tool-button-secondary"
          style={{ padding: "10px" }}
        >
          {t.lower}
        </button>
        <button
          onClick={() => convert("title")}
          className="tool-button-secondary"
          style={{ padding: "10px" }}
        >
          {t.title}
        </button>
        <button
          onClick={() => convert("sentence")}
          className="tool-button-secondary"
          style={{ padding: "10px" }}
        >
          {t.sentence}
        </button>
      </div>

      {result ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={result} label={t.copy} copiedLabel={t.copied} />
            </div>
            <textarea
              readOnly
              value={result}
              className="w-full h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none font-medium text-gray-700"
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