"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const strings = {
  es: {
    title: "Convertidor de mayúsculas/minúsculas",
    placeholder: "Escribe o pega tu texto aquí...",
    uppercase: "MAYÚSCULAS",
    lowercase: "minúsculas",
    titleCase: "Título",
    sentenceCase: "Oración",
    result: "Resultado",
    copied: "Copiado",
    copy: "Copiar",
    clear: "Limpiar",
  },
  en: {
    title: "Case Converter",
    placeholder: "Type or paste your text here...",
    uppercase: "UPPERCASE",
    lowercase: "lowercase",
    titleCase: "Title Case",
    sentenceCase: "Sentence case",
    result: "Result",
    copied: "Copied",
    copy: "Copy",
    clear: "Clear",
  },
  pt: {
    title: "Conversor de maiúsculas/minúsculas",
    placeholder: "Digite ou cole seu texto aqui...",
    uppercase: "MAIÚSCULAS",
    lowercase: "minúsculas",
    titleCase: "Título",
    sentenceCase: "Frase",
    result: "Resultado",
    copied: "Copiado",
    copy: "Copiar",
    clear: "Limpar",
  },
};

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

function toSentenceCase(str: string): string {
  return str.replace(/(?:^|\.\s+)([a-z])/g, (match) => match.toUpperCase());
}

export default function CaseConverter({ lang }: Props) {
  const t = strings[lang];
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = (converter: (s: string) => string) => {
    setOutput(converter(input));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <textarea
          style={{
            width: "100%",
            minHeight: "160px",
            padding: "20px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "2px solid #eee",
            outline: "none",
            transition: "border-color 0.2s",
            fontFamily: "inherit",
          }}
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              minWidth: "100px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              color: "#111",
            }}
            onClick={() => handleConvert((s) => s.toUpperCase())}
          >
            {t.uppercase}
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              minWidth: "100px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              color: "#111",
            }}
            onClick={() => handleConvert((s) => s.toLowerCase())}
          >
            {t.lowercase}
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              minWidth: "100px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              color: "#111",
            }}
            onClick={() => handleConvert(toTitleCase)}
          >
            {t.titleCase}
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              minWidth: "100px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              color: "#111",
            }}
            onClick={() => handleConvert(toSentenceCase)}
          >
            {t.sentenceCase}
          </button>
        </div>

        {output && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "12px",
                color: "#666",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {t.result}
            </span>
            <p style={{ margin: 0, fontSize: "16px", color: "#111", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {output}
            </p>
          </div>
        )}

        <div className="tool-actions">
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleCopy}
          >
            {copied ? t.copied : t.copy}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={() => {
              setInput("");
              setOutput("");
            }}
          >
            {t.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
