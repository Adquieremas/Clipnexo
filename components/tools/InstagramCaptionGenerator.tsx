"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import { buildHashtags, compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const tones = {
  es: ["cercano", "profesional", "divertido", "vendedor", "emocional"],
  en: ["friendly", "professional", "fun", "sales", "emotional"],
  pt: ["próximo", "profissional", "divertido", "vendedor", "emocional"],
} as const;

const objectives = {
  es: ["vender", "educar", "inspirar", "entretener", "anunciar"],
  en: ["sell", "educate", "inspire", "entertain", "announce"],
  pt: ["vender", "educar", "inspirar", "entreter", "anunciar"],
} as const;

const copy = {
  es: {
    topic: "Tema del post",
    topicPlaceholder: "Ejemplo: consejos para viajar solo",
    tone: "Tono",
    objective: "Objetivo",
    includeHashtags: "Hashtags",
    includeEmojis: "Emojis",
    generate: "Generar captions",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus captions aparecerán aquí",
    emptyText: "Escribe el tema del post y elige las opciones para generar.",
    fallback: "este post",
    yes: "Sí",
    no: "No",
    hashtagExtras: ["instagram", "reels", "post", "creadores", "viral", "marketing"],
    captions: [
      "Una forma simple de entender {topic} sin complicarte.",
      "Guarda este post si quieres mejorar en {topic}.",
      "Esto me ayudó a ver {topic} con más claridad.",
      "Pequeños cambios que pueden mejorar {topic}.",
      "Si te interesa {topic}, este consejo es para ti.",
      "La parte de {topic} que muchos pasan por alto.",
      "Prueba esto la próxima vez que trabajes en {topic}.",
      "Una idea rápida para avanzar con {topic} hoy.",
    ],
  },
  en: {
    topic: "Post topic",
    topicPlaceholder: "Example: tips for solo travel",
    tone: "Tone",
    objective: "Goal",
    includeHashtags: "Hashtags",
    includeEmojis: "Emojis",
    generate: "Generate captions",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your captions will appear here",
    emptyText: "Enter the post topic and choose options to generate.",
    fallback: "this post",
    yes: "Yes",
    no: "No",
    hashtagExtras: ["instagram", "reels", "post", "creator", "viral", "marketing"],
    captions: [
      "A simple way to understand {topic} without overcomplicating it.",
      "Save this post if you want to get better at {topic}.",
      "This helped me see {topic} more clearly.",
      "Small changes that can improve {topic}.",
      "If you care about {topic}, this tip is for you.",
      "The part of {topic} many people overlook.",
      "Try this next time you work on {topic}.",
      "A quick idea to make progress with {topic} today.",
    ],
  },
  pt: {
    topic: "Tema do post",
    topicPlaceholder: "Exemplo: dicas para viajar sozinho",
    tone: "Tom",
    objective: "Objetivo",
    includeHashtags: "Hashtags",
    includeEmojis: "Emojis",
    generate: "Gerar legendas",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas legendas aparecerão aqui",
    emptyText: "Digite o tema do post e escolha as opções para gerar.",
    fallback: "este post",
    yes: "Sim",
    no: "Não",
    hashtagExtras: ["instagram", "reels", "post", "criadores", "viral", "marketing"],
    captions: [
      "Uma forma simples de entender {topic} sem complicação.",
      "Salve este post se você quer melhorar em {topic}.",
      "Isso me ajudou a ver {topic} com mais clareza.",
      "Pequenas mudanças que podem melhorar {topic}.",
      "Se você se interessa por {topic}, esta dica é para você.",
      "A parte de {topic} que muita gente ignora.",
      "Teste isto na próxima vez que trabalhar em {topic}.",
      "Uma ideia rápida para avançar em {topic} hoje.",
    ],
  },
} as const;

export default function InstagramCaptionGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [objective, setObjective] = useState<string>(objectives[lang][0]);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    const emojis = includeEmojis ? " ✨📸" : "";
    const hashtags = includeHashtags
      ? `\n\n${buildHashtags(cleanTopic, tone, 6, [...t.hashtagExtras]).slice(0, 6).join(" ")}`
      : "";

    setResults(
      t.captions.map((caption) => `${caption.replaceAll("{topic}", cleanTopic)}${emojis}${hashtags}`)
    );
  };

  const clear = () => {
    setTopic("");
    setTone(tones[lang][0]);
    setObjective(objectives[lang][0]);
    setIncludeHashtags(true);
    setIncludeEmojis(true);
    setResults([]);
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
          <span>{t.tone}</span>
          <select value={tone} onChange={(event) => setTone(event.target.value)}>
            {tones[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field">
          <span>{t.objective}</span>
          <select value={objective} onChange={(event) => setObjective(event.target.value)}>
            {objectives[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field">
          <span>{t.includeEmojis}</span>
          <select
            value={includeEmojis ? "yes" : "no"}
            onChange={(event) => setIncludeEmojis(event.target.value === "yes")}
          >
            <option value="yes">{t.yes}</option>
            <option value="no">{t.no}</option>
          </select>
        </label>

        <label className="tool-field">
          <span>{t.includeHashtags}</span>
          <select
            value={includeHashtags ? "yes" : "no"}
            onChange={(event) => setIncludeHashtags(event.target.value === "yes")}
          >
            <option value="yes">{t.yes}</option>
            <option value="no">{t.no}</option>
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

      {results.length ? (
        <div className="tool-results">
          {results.map((caption, index) => (
            <ResultCard key={index} text={caption} copyLabel={t.copy} copiedLabel={t.copied} />
          ))}
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
