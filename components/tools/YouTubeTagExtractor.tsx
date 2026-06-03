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
    extract: "Extraer etiquetas",
    clear: "Limpiar",
    resultsHeading: "Etiquetas extraídas",
    tagsCount: "etiquetas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus etiquetas aparecerán aquí",
    emptyText: "Pega un texto para analizar y extraer las etiquetas automáticas de YouTube.",
  },
  en: {
    label: "Paste text, description or title here",
    placeholder: "Paste here the content you want to extract tags from...",
    extract: "Extract tags",
    clear: "Clear",
    resultsHeading: "Extracted tags",
    tagsCount: "tags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your tags will appear here",
    emptyText: "Paste a text to analyze and extract automatic YouTube tags.",
  },
  pt: {
    label: "Cole o texto, descrição ou título aqui",
    placeholder: "Cole aqui o conteúdo do qual deseja extrair as tags...",
    extract: "Extrair tags",
    clear: "Limpar",
    resultsHeading: "Tags extraídas",
    tagsCount: "tags",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas tags aparecerão aqui",
    emptyText: "Cole um texto para analisar e extrair as tags automáticas do YouTube.",
  },
} as const;

function extractTags(text: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  // Extract hashtags first
  const hashtags = text.match(/#[\wáéíóúãõâêôàç]+/gi) || [];
  for (const h of hashtags) {
    const lower = h.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(h);
    }
  }

  // Extract quoted phrases (multi-word tags)
  const phrases = text.match(/"([^"]+)"|'([^']+)'/g) || [];
  for (const p of phrases) {
    const clean = p.replace(/["']/g, "").trim();
    if (clean.length > 3) {
      const lower = clean.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        result.push(clean);
      }
    }
  }

  // Extract individual words > 3 chars, excluding common words
  const common = new Set([
    "que", "para", "con", "por", "del", "las", "los", "mas", "pero",
    "this", "that", "with", "from", "have", "what", "when", "more",
    "que", "para", "com", "por", "das", "dos", "nas", "nos", "mais",
    "the", "and", "are", "not", "you", "all", "can", "has", "was",
  ]);

  const tokens = text
    .replace(/#[\wáéíóúãõâêôàç]+/gi, "")
    .replace(/["'](.*?)["']/g, "")
    .split(/[\s,.;:!?()\[\]{}<>/\\|@$%^&*+=~`"\-]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 3 && !common.has(w.toLowerCase()) && !/^\d+$/.test(w));

  for (const w of tokens) {
    const lower = w.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(w);
    }
  }

  return result.slice(0, 30);
}

export default function YouTubeTagExtractor({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleExtract = () => {
    if (!text.trim()) return;
    setTags(extractTags(text));
  };

  const handleClear = () => {
    setText("");
    setTags([]);
  };

  const tagsText = tags.join(", ");

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.label}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
          />
        </label>
      </div>

      <div className="tool-actions">
        <button
          type="button"
          className="tool-button"
          onClick={handleExtract}
          disabled={!text.trim()}
        >
          {t.extract}
        </button>
        <button type="button" className="tool-button-secondary" onClick={handleClear}>
          {t.clear}
        </button>
      </div>

      {tags.length > 0 ? (
        <div className="tool-combined-results">
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "21px",
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {t.resultsHeading}
              </h3>
              <CopyButton text={tagsText} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                marginTop: 8,
              }}
            >
              {tags.length} {t.tagsCount}
            </div>
            <div className="hashtag-list" style={{ marginTop: 12 }}>
              {tags.map((tag, i) => (
                <span key={i}>{tag}</span>
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
