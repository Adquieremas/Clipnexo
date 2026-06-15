"use client";

import { useState, useCallback } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type StyleKey = "professional" | "creative" | "short" | "funny" | "gamer" | "personalBrand";

const strings = {
  es: {
    keywordLabel: "Palabra clave o nombre",
    keywordPlaceholder: "Ej: Carlos, diseño, música",
    styleLabel: "Estilo",
    professional: "Profesional",
    creative: "Creativo",
    short: "Corto",
    funny: "Divertido",
    gamer: "Gamer",
    personalBrand: "Marca personal",
    generate: "Generar",
    copy: "Copiar",
    copyAll: "Copiar todos",
    regenerate: "Regenerar",
    copied: "Copiado",
    allCopied: "Todos copiados",
    noKeyword: "Ingresa una palabra clave para generar nombres de usuario.",
    privacy: "La generación se realiza en tu navegador. No se guardan datos.",
  },
  en: {
    keywordLabel: "Keyword or name",
    keywordPlaceholder: "e.g. Alex, design, music",
    styleLabel: "Style",
    professional: "Professional",
    creative: "Creative",
    short: "Short",
    funny: "Funny",
    gamer: "Gamer",
    personalBrand: "Personal brand",
    generate: "Generate",
    copy: "Copy",
    copyAll: "Copy all",
    regenerate: "Regenerate",
    copied: "Copied",
    allCopied: "All copied",
    noKeyword: "Enter a keyword to generate usernames.",
    privacy: "Generation is done in your browser. No data is stored.",
  },
  pt: {
    keywordLabel: "Palavra-chave ou nome",
    keywordPlaceholder: "Ex: Carlos, design, música",
    styleLabel: "Estilo",
    professional: "Profissional",
    creative: "Criativo",
    short: "Curto",
    funny: "Divertido",
    gamer: "Gamer",
    personalBrand: "Marca pessoal",
    generate: "Gerar",
    copy: "Copiar",
    copyAll: "Copiar todos",
    regenerate: "Regenerar",
    copied: "Copiado",
    allCopied: "Todos copiados",
    noKeyword: "Insira uma palavra-chave para gerar nomes de usuário.",
    privacy: "A geração é feita no seu navegador. Nenhum dado é armazenado.",
  },
};

const ADJECTIVES = [
  "pro", "lab", "hub", "studio", "lab", "official", "team", "inc", "co",
  "zone", "box", "net", "io", "fx", "max", "prime", "elite", "neo", "ultra",
  "super", "mega", "hyper", "digital", "virtual", "quantum", "cosmic", "zen",
  "real", "the", "mr", "dr", "its", "hey", "ok", "go",
];

const GAMER_WORDS = [
  "killer", "sniper", "shadow", "blade", "storm", "phantom", "ghost",
  "dragon", "titan", "warrior", "assassin", "void", "rage", "beast",
  "demon", "chaos", "frost", "thunder", "venom", "z3ro",
];

const FUNNY_WORDS = [
  "potato", "noodle", "pickle", "banana", "waffle", "taco", "burrito",
  "muffin", "pancake", "sushi", "ninja", "panda", "llama", "sloth",
  "unicorn", "zombie", "alien", "robot", "chicken", "walrus",
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .replace(/^_+|_+$/g, "");
}

function generateUsernames(keyword: string, style: StyleKey, count: number): string[] {
  const base = slugify(keyword) || "user";
  const results: Set<string> = new Set();

  const strategies: (() => string)[] = [];

  switch (style) {
    case "professional":
      strategies.push(
        () => `${base}`,
        () => `${base}_${pickRandom(ADJECTIVES)}`,
        () => `${pickRandom(ADJECTIVES)}_${base}`,
        () => `${base}${randomInt(10, 99)}`,
        () => `${base}.${pickRandom(ADJECTIVES)}`,
        () => `${base}${pickRandom(ADJECTIVES)}`,
        () => `${pickRandom(ADJECTIVES)}${base}`,
        () => `${base}_pro`,
        () => `official.${base}`,
      );
      break;
    case "creative":
      strategies.push(
        () => `${base}_${pickRandom(ADJECTIVES)}`,
        () => `${pickRandom(ADJECTIVES)}.${base}`,
        () => `${base}__${pickRandom(ADJECTIVES)}`,
        () => `the_${base}`,
        () => `${base}_lab`,
        () => `${base}_world`,
        () => `${pickRandom(ADJECTIVES)}_${base}_${pickRandom(ADJECTIVES)}`,
        () => `${base}_${randomInt(100, 999)}`,
        () => `hey_${base}`,
      );
      break;
    case "short":
      strategies.push(
        () => `${base}`,
        () => `${base}${randomInt(0, 99)}`,
        () => `${base}_`,
        () => `${base[0]}${base}`,
        () => `_${base}`,
        () => `${base}x`,
        () => `${base}io`,
        () => `go${base}`,
        () => `${base}e`,
      );
      break;
    case "funny":
      strategies.push(
        () => `${pickRandom(FUNNY_WORDS)}_${base}`,
        () => `${base}_${pickRandom(FUNNY_WORDS)}`,
        () => `the_${pickRandom(FUNNY_WORDS)}_${base}`,
        () => `${base}${randomInt(10, 99)}_${pickRandom(FUNNY_WORDS)}`,
        () => `${pickRandom(FUNNY_WORDS)}${randomInt(10, 99)}`,
        () => `${base}_not_${base}`,
        () => `real_${base}`,
        () => `${base}_${base}`,
        () => `${pickRandom(FUNNY_WORDS)}.${base}`,
      );
      break;
    case "gamer":
      strategies.push(
        () => `${pickRandom(GAMER_WORDS)}_${base}`,
        () => `${base}_${pickRandom(GAMER_WORDS)}`,
        () => `x${base}x`,
        () => `${pickRandom(GAMER_WORDS)}${randomInt(10, 99)}`,
        () => `${base}${pickRandom(GAMER_WORDS)}`,
        () => `${pickRandom(GAMER_WORDS)}_${randomInt(100, 999)}`,
        () => `${base}_${pickRandom(GAMER_WORDS)}_${randomInt(10, 99)}`,
        () => `${pickRandom(GAMER_WORDS)}${base}`,
        () => `${base[0]}_${pickRandom(GAMER_WORDS)}`,
      );
      break;
    case "personalBrand":
      strategies.push(
        () => `${base}`,
        () => `${base}${randomInt(10, 99)}`,
        () => `${base}.${pickRandom(ADJECTIVES)}`,
        () => `${base}_official`,
        () => `its${base}`,
        () => `the${base}`,
        () => `${base}_${pickRandom(ADJECTIVES)}`,
        () => `hey${base}`,
        () => `${base}co`,
      );
      break;
  }

  while (results.size < count) {
    const fn = pickRandom(strategies);
    const username = fn();
    if (username.length >= 2 && username.length <= 30) {
      results.add(username);
    }
  }

  return Array.from(results).slice(0, count);
}

export default function UsernameGenerator({ lang }: Props) {
  const t = strings[lang];

  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<StyleKey>("professional");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const handleGenerate = useCallback(() => {
    setFeedback(null);
    if (!keyword.trim()) {
      showFeedback(t.noKeyword);
      return;
    }
    const result = generateUsernames(keyword.trim(), style, 20);
    setUsernames(result);
  }, [keyword, style, showFeedback, t]);

  const handleCopyOne = useCallback(
    async (username: string, idx: number) => {
      try {
        await navigator.clipboard.writeText(username);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
      } catch {
        // fallback
      }
    },
    []
  );

  const handleCopyAll = useCallback(async () => {
    if (usernames.length === 0) return;
    try {
      await navigator.clipboard.writeText(usernames.join("\n"));
      showFeedback(t.allCopied);
    } catch {
      // fallback
    }
  }, [usernames, showFeedback, t]);

  const styleButtons: { key: StyleKey; label: string }[] = [
    { key: "professional", label: t.professional },
    { key: "creative", label: t.creative },
    { key: "short", label: t.short },
    { key: "funny", label: t.funny },
    { key: "gamer", label: t.gamer },
    { key: "personalBrand", label: t.personalBrand },
  ];

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Keyword input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.keywordLabel}
          </label>
          <textarea
            aria-label={t.keywordLabel}
            placeholder={t.keywordPlaceholder}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: "100%",
              minHeight: "70px",
              padding: "14px 16px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.6",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Style selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.styleLabel}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {styleButtons.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStyle(key)}
                aria-pressed={style === key}
                style={{
                  minHeight: "44px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: style === key ? "2px solid #4f46e5" : "1px solid #d1d5db",
                  backgroundColor: style === key ? "#eef2ff" : "#ffffff",
                  color: style === key ? "#4f46e5" : "#374151",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={handleGenerate}
            style={{
              minHeight: "44px",
              flex: "1 0 auto",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #4f46e5, #ec4899)",
              color: "#ffffff",
              borderRadius: "10px",
              border: "none",
              fontWeight: 800,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 10px 18px rgba(79, 70, 229, 0.22)",
            }}
          >
            {usernames.length > 0 ? t.regenerate : t.generate}
          </button>
          {usernames.length > 0 && (
            <>
              <button
                type="button"
                className="tool-button-secondary"
                onClick={handleCopyAll}
                style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
              >
                {t.copyAll}
              </button>
              <button
                type="button"
                className="tool-button-secondary"
                onClick={handleGenerate}
                style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
              >
                {t.regenerate}
              </button>
            </>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#f0fdf4",
              color: "#166534",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Username grid */}
        {usernames.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "8px",
            }}
          >
            {usernames.map((name, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  padding: "10px 14px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111",
                    fontFamily: "monospace",
                    letterSpacing: "0.3px",
                  }}
                >
                  @{name}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyOne(name, idx)}
                  aria-label={`${t.copy} ${name}`}
                  style={{
                    minHeight: "36px",
                    minWidth: "60px",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: copiedIdx === idx ? "#f0fdf4" : "#ffffff",
                    color: copiedIdx === idx ? "#15803d" : "#374151",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {copiedIdx === idx ? t.copied : t.copy}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Privacy notice */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            fontSize: "13px",
            color: "#92400e",
            lineHeight: "1.5",
          }}
        >
          {t.privacy}
        </div>
      </div>
    </div>
  );
}
