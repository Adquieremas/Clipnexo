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
    topic: "Tema o palabra clave",
    topicPlaceholder: "Ejemplo: cocina vegana, tutorial de After Effects...",
    style: "Estilo del título",
    generate: "Generar Títulos",
    clear: "Limpiar",
    resultsHeading: "Títulos sugeridos",
    copyAll: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Tus títulos aparecerán aquí",
    emptyText: "Escribe un tema para generar títulos llamativos para tus videos de YouTube.",
    styles: {
      tutorial: "Tutorial",
      lista: "Lista / Top",
      viral: "Clickbait / Viral",
      educativo: "Educativo",
    },
  },
  en: {
    topic: "Topic or keyword",
    topicPlaceholder: "Example: vegan cooking, After Effects tutorial...",
    style: "Title style",
    generate: "Generate Titles",
    clear: "Clear",
    resultsHeading: "Suggested titles",
    copyAll: "Copy all",
    copied: "Copied",
    emptyTitle: "Your titles will appear here",
    emptyText: "Enter a topic to generate catchy titles for your YouTube videos.",
    styles: {
      tutorial: "Tutorial",
      lista: "List / Top",
      viral: "Clickbait / Viral",
      educativo: "Educational",
    },
  },
  pt: {
    topic: "Tema ou palavra-chave",
    topicPlaceholder: "Exemplo: cozinha vegana, tutorial de After Effects...",
    style: "Estilo do título",
    generate: "Gerar Títulos",
    clear: "Limpar",
    resultsHeading: "Títulos sugeridos",
    copyAll: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Seus títulos aparecerão aqui",
    emptyText: "Digite um tema para gerar títulos chamativos para seus vídeos do YouTube.",
    styles: {
      tutorial: "Tutorial",
      lista: "Lista / Top",
      viral: "Clickbait / Viral",
      educativo: "Educativo",
    },
  },
} as const;

export default function YouTubeTitleGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("tutorial");
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const items = [
      "Cómo hacer " + topic + " en 2024",
      topic + " para principiantes",
      "El secreto de " + topic + " que nadie te cuenta",
      "Todo lo que necesitas saber sobre " + topic,
      topic + " explicado en 5 minutos",
      "Guía definitiva de " + topic,
      "¿Vale la pena " + topic + "? Mi opinión honesta",
      "Por qué deberías empezar con " + topic + " hoy",
      "7 trucos de " + topic + " que debes conocer",
      "El mayor error al hacer " + topic,
    ];
    setResults(items);
  };

  const handleClear = () => {
    setTopic("");
    setResults([]);
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
          <span>{t.style}</span>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="tutorial">{t.styles.tutorial}</option>
            <option value="lista">{t.styles.lista}</option>
            <option value="viral">{t.styles.viral}</option>
            <option value="educativo">{t.styles.educativo}</option>
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

      {results.length > 0 ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={results.join("\n")} label={t.copyAll} copiedLabel={t.copied} />
            </div>
            <div className="tool-results">
              {results.map((r, i) => (
                <ResultCard key={i} text={r} copiedLabel={t.copied} />
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