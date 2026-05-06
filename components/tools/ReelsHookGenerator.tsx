"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const styles = {
  es: ["Curiosidad", "Miedo/Urgencia", "Beneficio Directo", "Controversial", "Storytelling"],
  en: ["Curiosity", "Fear/Urgency", "Direct Benefit", "Controversial", "Storytelling"],
  pt: ["Curiosidade", "Medo/Urgência", "Benefício Direto", "Controversial", "Storytelling"],
} as const;

const copy = {
  es: {
    topic: "Tema del Reel",
    topicPlaceholder: "Ejemplo: cómo ganar seguidores",
    style: "Estilo del gancho",
    generate: "Generar ganchos",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus ganchos aparecerán aquí",
    emptyText: "Escribe el tema de tu Reel para generar 15 ganchos que capten la atención.",
    fallback: "este tema",
    hooks: [
      "Lo que nadie te dice sobre {topic}...",
      "Deja de hacer esto si quieres mejorar en {topic}.",
      "3 secretos de {topic} que cambiarán tu vida.",
      "¿Por qué nadie está hablando de {topic}?",
      "Cómo pasé de 0 a 100 con {topic} en una semana.",
      "El error número uno que cometes con {topic}.",
      "Si te gusta {topic}, tienes que ver esto.",
      "No vas a creer este truco sobre {topic}.",
      "La verdad honesta sobre {topic}.",
      "¿Quieres saber cómo dominar {topic}?",
      "Este es el mejor consejo sobre {topic} que recibirás.",
      "Día 1 probando {topic} y esto pasó...",
      "Lo que desearía haber sabido antes sobre {topic}.",
      "Guarda este video si te interesa {topic}.",
      "Haz esto la próxima vez que trabajes en {topic}.",
    ],
  },
  en: {
    topic: "Reel Topic",
    topicPlaceholder: "Example: how to get followers",
    style: "Hook style",
    generate: "Generate hooks",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your hooks will appear here",
    emptyText: "Enter your Reel topic to generate 15 attention-grabbing hooks.",
    fallback: "this topic",
    hooks: [
      "What no one tells you about {topic}...",
      "Stop doing this if you want to improve in {topic}.",
      "3 secrets of {topic} that will change your life.",
      "Why is no one talking about {topic}?",
      "How I went from 0 to 100 with {topic} in a week.",
      "The number one mistake you make with {topic}.",
      "If you like {topic}, you have to see this.",
      "You won't believe this trick about {topic}.",
      "The honest truth about {topic}.",
      "Want to know how to master {topic}?",
      "This is the best {topic} advice you'll ever get.",
      "Day 1 trying {topic} and this happened...",
      "What I wish I knew earlier about {topic}.",
      "Save this video if you care about {topic}.",
      "Do this next time you work on {topic}.",
    ],
  },
  pt: {
    topic: "Tema do Reel",
    topicPlaceholder: "Exemplo: como ganhar seguidores",
    style: "Estilo do gancho",
    generate: "Gerar ganchos",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus ganchos aparecerão aqui",
    emptyText: "Digite o tema do seu Reel para gerar 15 ganchos que chamam a atenção.",
    fallback: "este tema",
    hooks: [
      "O que ninguém te conta sobre {topic}...",
      "Pare de fazer isso se você quer melhorar em {topic}.",
      "3 segredos de {topic} que vão mudar sua vida.",
      "Por que ninguém está falando sobre {topic}?",
      "Como fui de 0 a 100 com {topic} em uma semana.",
      "O erro número um que você comete com {topic}.",
      "Se você gosta de {topic}, precisa ver isto.",
      "Você não vai acreditar neste truque sobre {topic}.",
      "A verdade honesta sobre {topic}.",
      "Quer saber como dominar {topic}?",
      "Este é o melhor conselho sobre {topic} que você vai receber.",
      "Dia 1 testando {topic} e isto aconteceu...",
      "O que eu gostaria de saber antes sobre {topic}.",
      "Salve este vídeo se você se interessa por {topic}.",
      "Faça isto na próxima vez que trabalhar em {topic}.",
    ],
  },
} as const;

export default function ReelsHookGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<string>(styles[lang][0]);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = topic || t.fallback;
    setResults(t.hooks.map((hook) => hook.replaceAll("{topic}", cleanTopic)));
  };

  const clear = () => {
    setTopic("");
    setStyle(styles[lang][0]);
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

        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.style}</span>
          <select value={style} onChange={(event) => setStyle(event.target.value)}>
            {styles[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
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
          {results.map((hook, index) => (
            <ResultCard key={index} text={hook} copyLabel={t.copy} copiedLabel={t.copied} />
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
