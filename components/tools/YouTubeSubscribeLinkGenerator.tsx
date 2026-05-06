"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    url: "URL del canal de YouTube",
    urlPlaceholder: "https://www.youtube.com/@usuario",
    generate: "Generar Enlace de Suscripción",
    clear: "Limpiar",
    resultsHeading: "Enlace generado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tu enlace aparecerá aquí",
    emptyText: "Pega la URL de tu canal para generar un enlace que solicite suscripción automática.",
  },
  en: {
    url: "YouTube Channel URL",
    urlPlaceholder: "https://www.youtube.com/@username",
    generate: "Generate Subscription Link",
    clear: "Clear",
    resultsHeading: "Generated link",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your link will appear here",
    emptyText: "Paste your channel URL to generate a link that prompts for automatic subscription.",
  },
  pt: {
    url: "URL do canal do YouTube",
    urlPlaceholder: "https://www.youtube.com/@usuario",
    generate: "Gerar Link de Inscrição",
    clear: "Limpar",
    resultsHeading: "Link gerado",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seu link aparecerá aqui",
    emptyText: "Cole a URL do seu canal para gerar um link que solicita inscrição automática.",
  },
} as const;

export default function YouTubeSubscribeLinkGenerator({ lang }: Props) {
  const t = copy[lang];
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) return;
    const connector = url.includes("?") ? "&" : "?";
    setLink(url.trim() + connector + "sub_confirmation=1");
  };

  const handleClear = () => {
    setUrl("");
    setLink("");
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.url}</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.urlPlaceholder}
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

      {link ? (
        <div className="tool-combined-results">
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-xl font-bold text-gray-800">{t.resultsHeading}</h3>
              <CopyButton text={link} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div className="truncate font-mono text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700">
              {link}
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