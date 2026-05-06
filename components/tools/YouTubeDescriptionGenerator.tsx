"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    topic: "Tema o título del video",
    topicPlaceholder: "Ejemplo: Mi viaje a Japón, Review del iPhone 15...",
    link: "Enlace principal (opcional)",
    linkPlaceholder: "https://ejemplo.com",
    social: "Redes sociales (opcional)",
    socialPlaceholder: "@usuario en Instagram, Twitter...",
    generate: "Generar Descripción",
    clear: "Limpiar",
    resultsHeading: "Descripción generada",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tu descripción aparecerá aquí",
    emptyText: "Completa los campos para generar una descripción profesional para tu video.",
  },
  en: {
    topic: "Video topic or title",
    topicPlaceholder: "Example: My trip to Japan, iPhone 15 Review...",
    link: "Main link (optional)",
    linkPlaceholder: "https://example.com",
    social: "Social links (optional)",
    socialPlaceholder: "@username on Instagram, Twitter...",
    generate: "Generate Description",
    clear: "Clear",
    resultsHeading: "Generated description",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your description will appear here",
    emptyText: "Fill in the fields to generate a professional description for your video.",
  },
  pt: {
    topic: "Tema ou título do vídeo",
    topicPlaceholder: "Exemplo: Minha viagem ao Japão, Review do iPhone 15...",
    link: "Link principal (opcional)",
    linkPlaceholder: "https://exemplo.com",
    social: "Redes sociais (opcional)",
    socialPlaceholder: "@usuario no Instagram, Twitter...",
    generate: "Gerar Descrição",
    clear: "Limpar",
    resultsHeading: "Descrição gerada",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Sua descrição aparecerá aqui",
    emptyText: "Preencha os campos para gerar uma descrição profissional para seu vídeo.",
  },
} as const;

export default function YouTubeDescriptionGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");
  const [social, setSocial] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const desc =
      "En este video hablamos de " +
      topic +
      ". ¡Descubre todos los detalles y no olvides suscribirte!\n\n" +
      (link ? "🔗 Enlace mencionado:\n" + link + "\n\n" : "") +
      (social ? "📱 Sígueme en mis redes:\n" + social + "\n\n" : "") +
      "#" +
      topic.replace(/\s+/g, "").toLowerCase() +
      " #youtube #video #clipnexo";
    setResult(desc);
  };

  const handleClear = () => {
    setTopic("");
    setLink("");
    setSocial("");
    setResult("");
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.topic}</span>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.topicPlaceholder}
          />
        </label>
        <label className="tool-field">
          <span>{t.link}</span>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={t.linkPlaceholder}
          />
        </label>
        <label className="tool-field">
          <span>{t.social}</span>
          <textarea
            value={social}
            onChange={(e) => setSocial(e.target.value)}
            placeholder={t.socialPlaceholder}
            className="w-full h-24 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
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
              className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none font-medium text-gray-700"
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