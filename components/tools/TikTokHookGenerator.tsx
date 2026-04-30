"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import { compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const styles = {
  es: ["curioso", "urgente", "educativo", "polémico suave", "vendedor", "emocional"],
  en: ["curious", "urgent", "educational", "soft controversy", "sales", "emotional"],
  pt: ["curioso", "urgente", "educativo", "polêmico suave", "vendedor", "emocional"],
} as const;

const copy = {
  es: {
    topic: "Tema del video",
    topicPlaceholder: "Ejemplo: ahorrar dinero cada semana",
    style: "Estilo",
    generate: "Generar ganchos",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus ganchos aparecerán aquí",
    emptyText: "Escribe un tema y elige un estilo para crear frases iniciales.",
    fallback: "este tema",
    hooks: [
      "Si estás haciendo {topic}, mira esto primero.",
      "Nadie te explica {topic} de esta forma.",
      "El error más común con {topic} es este.",
      "Tres señales de que necesitas mejorar {topic}.",
      "Esto cambió mi forma de ver {topic}.",
      "Guarda esto si quieres entender {topic}.",
      "Antes de probar {topic}, evita esto.",
      "La forma más simple de empezar con {topic}.",
      "Lo que aprendí después de fallar con {topic}.",
      "Si tienes poco tiempo, usa este tip de {topic}.",
      "La verdad incómoda sobre {topic}.",
      "Haz esto hoy para mejorar {topic}.",
      "No necesitas complicarte para lograr {topic}.",
      "Este detalle puede cambiar tus resultados en {topic}.",
      "Te explico {topic} sin vueltas.",
    ],
  },
  en: {
    topic: "Video topic",
    topicPlaceholder: "Example: saving money every week",
    style: "Style",
    generate: "Generate hooks",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your hooks will appear here",
    emptyText: "Enter a topic and choose a style to create opening lines.",
    fallback: "this topic",
    hooks: [
      "If you are doing {topic}, watch this first.",
      "Nobody explains {topic} like this.",
      "The most common mistake with {topic} is this.",
      "Three signs you need to improve {topic}.",
      "This changed how I think about {topic}.",
      "Save this if you want to understand {topic}.",
      "Before trying {topic}, avoid this.",
      "The simplest way to start with {topic}.",
      "What I learned after failing at {topic}.",
      "If you have little time, use this {topic} tip.",
      "The uncomfortable truth about {topic}.",
      "Do this today to improve {topic}.",
      "You do not need to overcomplicate {topic}.",
      "This detail can change your results with {topic}.",
      "Let me explain {topic} clearly.",
    ],
  },
  pt: {
    topic: "Tema do vídeo",
    topicPlaceholder: "Exemplo: economizar dinheiro toda semana",
    style: "Estilo",
    generate: "Gerar ganchos",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus ganchos aparecerão aqui",
    emptyText: "Digite um tema e escolha um estilo para criar frases iniciais.",
    fallback: "este tema",
    hooks: [
      "Se você está fazendo {topic}, veja isto primeiro.",
      "Ninguém explica {topic} desta forma.",
      "O erro mais comum em {topic} é este.",
      "Três sinais de que você precisa melhorar {topic}.",
      "Isso mudou minha forma de ver {topic}.",
      "Salve isto se quiser entender {topic}.",
      "Antes de tentar {topic}, evite isto.",
      "A forma mais simples de começar com {topic}.",
      "O que aprendi depois de errar em {topic}.",
      "Se você tem pouco tempo, use esta dica de {topic}.",
      "A verdade incômoda sobre {topic}.",
      "Faça isto hoje para melhorar {topic}.",
      "Você não precisa complicar para evoluir em {topic}.",
      "Este detalhe pode mudar seus resultados em {topic}.",
      "Vou explicar {topic} sem enrolação.",
    ],
  },
} as const;

export default function TikTokHookGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<string>(styles[lang][0]);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    const styleIndex = (styles[lang] as readonly string[]).indexOf(style);
    const offset = Math.max(0, styleIndex) * 2;
    const orderedHooks = [...t.hooks.slice(offset), ...t.hooks.slice(0, offset)];

    setResults(orderedHooks.map((hook) => hook.replaceAll("{topic}", cleanTopic)));
  };

  const clear = () => {
    setTopic("");
    setStyle(styles[lang][0]);
    setResults([]);
  };

  return (
    <div className="tool-card">
      <div className="tool-grid two">
        <label className="tool-field">
          <span>{t.topic}</span>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder={t.topicPlaceholder}
          />
        </label>

        <label className="tool-field">
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
          {results.map((hook) => (
            <ResultCard key={hook} text={hook} copyLabel={t.copy} copiedLabel={t.copied} />
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
