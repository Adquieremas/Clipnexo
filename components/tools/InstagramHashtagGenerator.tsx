"use client";

import { useState } from "react";
import { buildHashtags, compactTopic } from "@/components/tools/tool-helpers";
import CopyButton from "@/components/tools/CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const niches = {
  es: ["Estilo de vida", "Marketing", "Fitness", "Viajes", "Comida", "Moda", "Tecnología", "Educación"],
  en: ["Lifestyle", "Marketing", "Fitness", "Travel", "Food", "Fashion", "Tech", "Education"],
  pt: ["Estilo de vida", "Marketing", "Fitness", "Viagens", "Comida", "Moda", "Tecnologia", "Educação"],
} as const;

const copy = {
  es: {
    topic: "Tema o palabra clave",
    topicPlaceholder: "Ejemplo: fotografía de paisajes",
    niche: "Nicho",
    amount: "Cantidad",
    generate: "Generar hashtags",
    clear: "Limpiar",
    copy: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Tus hashtags aparecerán aquí",
    emptyText: "Escribe un tema y elige el nicho para generar etiquetas relevantes.",
    fallback: "instagram",
  },
  en: {
    topic: "Topic or keyword",
    topicPlaceholder: "Example: landscape photography",
    niche: "Niche",
    amount: "Amount",
    generate: "Generate hashtags",
    clear: "Clear",
    copy: "Copy all",
    copied: "Copied",
    emptyTitle: "Your hashtags will appear here",
    emptyText: "Enter a topic and choose a niche to generate relevant tags.",
    fallback: "instagram",
  },
  pt: {
    topic: "Tema ou palavra-chave",
    topicPlaceholder: "Exemplo: fotografia de paisagens",
    niche: "Nicho",
    amount: "Quantidade",
    generate: "Gerar hashtags",
    clear: "Limpar",
    copy: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Suas hashtags aparecerão aqui",
    emptyText: "Digite um tema e escolha o nicho para gerar etiquetas relevantes.",
    fallback: "instagram",
  },
} as const;

export default function InstagramHashtagGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState<string>(niches[lang][0]);
  const [amount, setAmount] = useState(20);
  const [result, setResult] = useState("");

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    const hashtags = buildHashtags(cleanTopic, niche, amount, ["ig", "insta", "reels", "viral", "post", "photography"]);
    setResult(hashtags.join(" "));
  };

  const clear = () => {
    setTopic("");
    setNiche(niches[lang][0]);
    setAmount(20);
    setResult("");
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.topic}</span>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder={t.topicPlaceholder}
          />
        </label>

        <label className="tool-field">
          <span>{t.niche}</span>
          <select value={niche} onChange={(event) => setNiche(event.target.value)}>
            {niches[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field">
          <span>{t.amount}</span>
          <select value={amount} onChange={(event) => setAmount(Number(event.target.value))}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={generate}>
          {t.generate}
        </button>
        <button type="button" className="tool-button-secondary" onClick={clear}>
          {t.clear}
        </button>
      </div>

      {result ? (
        <div className="tool-results">
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "18px", lineHeight: "1.6", color: "#333", wordBreak: "break-word" }}>
              {result}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CopyButton text={result} label={t.copy} copiedLabel={t.copied} />
            </div>
          </div>
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
