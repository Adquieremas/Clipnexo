"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    topic: "Tema o palabra clave",
    topicPlaceholder: "Ejemplo: fitness, tecnología, viajes...",
    count: "Cantidad de hashtags",
    generate: "Generar Hashtags",
    clear: "Limpiar",
    resultsHeading: "Hashtags sugeridos",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus hashtags aparecerán aquí",
    emptyText: "Escribe un tema para generar hashtags optimizados para YouTube Shorts y videos.",
  },
  en: {
    topic: "Topic or keyword",
    topicPlaceholder: "Example: fitness, technology, travel...",
    count: "Number of hashtags",
    generate: "Generate Hashtags",
    clear: "Clear",
    resultsHeading: "Suggested hashtags",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your hashtags will appear here",
    emptyText: "Enter a topic to generate optimized hashtags for YouTube Shorts and videos.",
  },
  pt: {
    topic: "Tema ou palavra-chave",
    topicPlaceholder: "Exemplo: fitness, tecnologia, viagens...",
    count: "Quantidade de hashtags",
    generate: "Gerar Hashtags",
    clear: "Limpar",
    resultsHeading: "Hashtags sugeridas",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas hashtags aparecerão aqui",
    emptyText: "Digite um tema para gerar hashtags otimizadas para YouTube Shorts e vídeos.",
  },
} as const;

export default function YouTubeHashtagGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("15");
  const [tags, setTags] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const cleanTopic = topic.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const baseTags = [
      "#" + cleanTopic,
      "#" + cleanTopic + "tips",
      "#" + cleanTopic + "viral",
      "#" + cleanTopic + "2024",
      "#youtube" + cleanTopic,
      "#" + cleanTopic + "shorts",
      "#trending" + cleanTopic,
      "#" + cleanTopic + "video",
      "#" + cleanTopic + "howto",
      "#" + cleanTopic + "best",
    ];
    const n = parseInt(count) || 15;
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(baseTags[i % baseTags.length] + (i >= baseTags.length ? Math.floor(i / baseTags.length) : ""));
    }
    setTags(result.join(" "));
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
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
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