"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy: Record<string, {
  label: string;
  placeholder: string;
  upper: string;
  lower: string;
  title: string;
  sentence: string;
  resultsHeading: string;
  copy: string;
  copied: string;
  emptyTitle: string;
  emptyText: string;
  charCount: string;
}> = {
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
    charCount: "caracteres",
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
    charCount: "characters",
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
    charCount: "caracteres",
  },
};

function toTitleCase(str: string): string {
  const smallWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "by", "with", "from", "as", "is", "it", "its", "if",
    "de", "la", "el", "en", "y", "o", "a", "e", "do", "da", "dos", "das",
    "um", "uma", "uns", "umas", "com", "por", "para", "sem", "sob",
  ]);
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, i, arr) => {
      if (i === 0 || i === arr.length - 1 || !smallWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export default function YouTubeTitleCapitalization({ lang }: Props) {
  const t = copy[lang] || copy.es;
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const convert = (type: string) => {
    if (!title.trim()) return;
    switch (type) {
      case "upper":
        setResult(title.toUpperCase());
        break;
      case "lower":
        setResult(title.toLowerCase());
        break;
      case "title":
        setResult(toTitleCase(title));
        break;
      case "sentence":
        setResult(title.charAt(0).toUpperCase() + title.slice(1).toLowerCase());
        break;
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.label}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.placeholder}
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 18,
        }}
      >
        {[
          { key: "upper", label: t.upper },
          { key: "lower", label: t.lower },
          { key: "title", label: t.title },
          { key: "sentence", label: t.sentence },
        ].map((btn) => (
          <button
            key={btn.key}
            type="button"
            className="tool-button-secondary"
            onClick={() => convert(btn.key)}
            disabled={!title.trim()}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {result ? (
        <div className="tool-combined-results">
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: 21,
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {t.resultsHeading}
              </h3>
              <CopyButton text={result} label={t.copy} copiedLabel={t.copied} />
            </div>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 18,
                color: "#111827",
                fontWeight: 500,
                lineHeight: 1.5,
                padding: "14px 16px",
                background: "#f9fafb",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
              }}
            >
              {result}
            </p>
            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 6,
                display: "inline-block",
              }}
            >
              {result.length} {t.charCount}
            </span>
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
