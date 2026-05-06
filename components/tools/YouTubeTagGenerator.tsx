"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    topic: "Palabra clave",
    topicPlaceholder: "Ejemplo: recetas saludables, tutorial de piano...",
    count: "Cantidad de etiquetas",
    generate: "Generar Etiquetas",
    clear: "Limpiar",
    resultsHeading: "Etiquetas sugeridas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus etiquetas aparecerán aquí",
    emptyText: "Escribe un tema o palabra clave para generar ideas optimizadas para YouTube.",
  },
  en: {
    topic: "Keyword",
    topicPlaceholder: "Example: healthy recipes, piano tutorial...",
    count: "Number of tags",
    generate: "Generate Tags",
    clear: "Clear",
    resultsHeading: "Suggested tags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your tags will appear here",
    emptyText: "Enter a topic or keyword to generate optimized ideas for YouTube.",
  },
  pt: {
    topic: "Palavra-chave",
    topicPlaceholder: "Exemplo: receitas saudáveis, tutorial de piano...",
    count: "Quantidade de tags",
    generate: "Gerar Tags",
    clear: "Limpar",
    resultsHeading: "Tags sugeridas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas tags aparecerão aqui",
    emptyText: "Digite um tema ou palavra-chave para gerar ideias otimizadas para o YouTube.",
  },
} as const;

export default function YouTubeTagGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("20");
  const [tags, setTags] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const baseTags = [
      topic,
      topic + " tutorial",
      topic + " 2024",
      "how to " + topic,
      "como hacer " + topic,
      topic + " tips",
      topic + " guide",
      "best " + topic,
      topic + " review",
      topic + " ideas",
      topic + " training",
      topic + " results",
    ];
    const n = parseInt(count) || 20;
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(baseTags[i % baseTags.length] + (i >= baseTags.length ? " " + (Math.floor(i / baseTags.length) + 1) : ""));
    }
    setTags(result.join(", "));
  };

  const handleClear = () => {
    setTopic("");
    setTags("");
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "1 / -1" }}>
          <span>{t.topic}</span>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.topicPlaceholder}
          />
        </label>
        <label className="tool-field">
          <span>{t.count}</span>
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={handleGenerate}>
          {t.generate}
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