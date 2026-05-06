"use client";

import { useState, useEffect } from "react";
import CopyButton from "@/components/tools/CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const platforms = ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter/X", "LinkedIn"];

const copy = {
  es: {
    title: "Contador de caracteres",
    placeholder: "Escribe o pega tu texto aquí...",
    platform: "Plataforma",
    characters: "Caracteres",
    noSpaces: "Sin espacios",
    words: "Palabras",
    hashtags: "Hashtags",
    mentions: "Menciones",
    emojis: "Emojis",
    lines: "Líneas",
    recommendation: "Recomendación para {platform}",
    copy: "Copiar texto",
    clear: "Limpiar",
    copied: "Copiado",
    limits: {
      Instagram: "Límite: 2,200 caracteres.",
      TikTok: "Límite: 4,000 caracteres.",
      YouTube: "Límite: 5,000 caracteres.",
      Facebook: "Límite: 63,206 caracteres.",
      "Twitter/X": "Límite: 280 caracteres (Gratis).",
      LinkedIn: "Límite: 3,000 caracteres.",
    }
  },
  en: {
    title: "Character Counter",
    placeholder: "Type or paste your text here...",
    platform: "Platform",
    characters: "Characters",
    noSpaces: "No spaces",
    words: "Words",
    hashtags: "Hashtags",
    mentions: "Mentions",
    emojis: "Emojis",
    lines: "Lines",
    recommendation: "Recommendation for {platform}",
    copy: "Copy text",
    clear: "Clear",
    copied: "Copied",
    limits: {
      Instagram: "Limit: 2,200 characters.",
      TikTok: "Limit: 4,000 characters.",
      YouTube: "Limit: 5,000 characters.",
      Facebook: "Limit: 63,206 characters.",
      "Twitter/X": "Limit: 280 characters (Free).",
      LinkedIn: "Limit: 3,000 characters.",
    }
  },
  pt: {
    title: "Contador de caracteres",
    placeholder: "Digite ou cole seu texto aqui...",
    platform: "Plataforma",
    characters: "Caracteres",
    noSpaces: "Sem espaços",
    words: "Palavras",
    hashtags: "Hashtags",
    mentions: "Menções",
    emojis: "Emojis",
    lines: "Linhas",
    recommendation: "Recomendação para {platform}",
    copy: "Copiar texto",
    clear: "Limpar",
    copied: "Copiado",
    limits: {
      Instagram: "Limite: 2.200 caracteres.",
      TikTok: "Limite: 4.000 caracteres.",
      YouTube: "Limite: 5.000 caracteres.",
      Facebook: "Limite: 63.206 caracteres.",
      "Twitter/X": "Limite: 280 caracteres (Grátis).",
      LinkedIn: "Limite: 3.000 caracteres.",
    }
  },
} as const;

export default function SocialCharacterCounter({ lang }: Props) {
  const t = copy[lang];
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState(platforms[0]);
  const [stats, setStats] = useState({
    characters: 0,
    noSpaces: 0,
    words: 0,
    hashtags: 0,
    mentions: 0,
    emojis: 0,
    lines: 0,
  });

  useEffect(() => {
    const chars = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const hashtags = (text.match(/#/g) || []).length;
    const mentions = (text.match(/@/g) || []).length;
    const emojis = (text.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u26FF|\u2700-\u27BF/g) || []).length;
    const lines = text.trim() ? text.split("\n").length : 0;

    setStats({ characters: chars, noSpaces, words, hashtags, mentions, emojis, lines });
  }, [text]);

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="tool-grid">
           <label className="tool-field" style={{ gridColumn: "span 2" }}>
             <span>{t.platform}</span>
             <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
               {platforms.map((p) => (
                 <option key={p} value={p}>{p}</option>
               ))}
             </select>
           </label>
        </div>

        <textarea
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "20px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "2px solid #eee",
            outline: "none",
            transition: "border-color 0.2s",
            fontFamily: "inherit"
          }}
          placeholder={t.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
           {[
             { label: t.characters, value: stats.characters },
             { label: t.noSpaces, value: stats.noSpaces },
             { label: t.words, value: stats.words },
             { label: t.hashtags, value: stats.hashtags },
             { label: t.mentions, value: stats.mentions },
             { label: t.emojis, value: stats.emojis },
             { label: t.lines, value: stats.lines },
           ].map((stat, idx) => (
             <div key={idx} style={{ padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "8px", textAlign: "center", border: "1px solid #eee" }}>
                <span style={{ display: "block", fontSize: "12px", color: "#666", textTransform: "uppercase", marginBottom: "4px" }}>{stat.label}</span>
                <strong style={{ fontSize: "20px", color: "#111" }}>{stat.value}</strong>
             </div>
           ))}
        </div>

        <div style={{ padding: "16px", backgroundColor: "#fffbeb", borderRadius: "12px", border: "1px solid #fef3c7" }}>
           <strong style={{ color: "#92400e", fontSize: "14px" }}>{t.recommendation.replace("{platform}", platform)}</strong>
           <p style={{ margin: "4px 0 0", color: "#b45309", fontSize: "15px" }}>{(t.limits as any)[platform]}</p>
        </div>

        <div className="tool-actions">
           <CopyButton text={text} label={t.copy} copiedLabel={t.copied} />
           <button type="button" className="tool-button-secondary" onClick={() => setText("")}>
             {t.clear}
           </button>
        </div>
      </div>
    </div>
  );
}
