"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const tones = {
  es: ["Amigable", "Profesional", "Informativo", "Divertido", "Urgente"],
  en: ["Friendly", "Professional", "Informative", "Fun", "Urgent"],
  pt: ["Amigável", "Profissional", "Informativo", "Divertido", "Urgente"],
} as const;

const objectives = {
  es: ["Compartir info", "Vender", "Generar debate", "Inspirar", "Anunciar"],
  en: ["Share info", "Sell", "Generate debate", "Inspire", "Announce"],
  pt: ["Compartilhar info", "Vender", "Gerar debate", "Inspirar", "Anunciar"],
} as const;

const copy = {
  es: {
    topic: "Tema del post",
    topicPlaceholder: "Ejemplo: beneficios del yoga en casa",
    tone: "Tono",
    objective: "Objetivo",
    generate: "Generar posts",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus posts aparecerán aquí",
    emptyText: "Escribe el tema de tu publicación para generar 8 opciones ideales para Facebook.",
    fallback: "este tema",
    posts: [
      "¿Sabías que {topic} puede cambiar tu forma de ver las cosas? Aquí te cuento por qué. 👇",
      "Si estás buscando mejorar en {topic}, este post es para ti. No te pierdas estos consejos.",
      "Hablemos de {topic}. Es algo que a muchos nos interesa y hoy quiero compartir mi experiencia.",
      "¡Atención! Si te importa {topic}, tienes que leer esto ahora mismo. 🚀",
      "A veces lo más simple es lo más efectivo, especialmente con {topic}. ¿Qué opinas?",
      "Hoy quiero compartir 3 razones por las que {topic} es fundamental en mi día a día. 💎",
      "¿Alguna vez te has preguntado cómo {topic} afecta tu rutina? Te lo explico aquí.",
      "Resumen rápido sobre {topic}: lo que necesitas saber hoy para avanzar.",
    ],
  },
  en: {
    topic: "Post Topic",
    topicPlaceholder: "Example: benefits of yoga at home",
    tone: "Tone",
    objective: "Goal",
    generate: "Generate posts",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your posts will appear here",
    emptyText: "Enter your post topic to generate 8 ideal options for Facebook.",
    fallback: "this topic",
    posts: [
      "Did you know that {topic} can change the way you see things? Here is why. 👇",
      "If you're looking to improve in {topic}, this post is for you. Don't miss these tips.",
      "Let's talk about {topic}. It's something many of us are interested in and today I want to share my experience.",
      "Attention! If you care about {topic}, you have to read this right now. 🚀",
      "Sometimes the simplest thing is the most effective, especially with {topic}. What do you think?",
      "Today I want to share 3 reasons why {topic} is fundamental in my daily life. 💎",
      "Have you ever wondered how {topic} affects your routine? I'll explain it here.",
      "Quick summary of {topic}: what you need to know today to move forward.",
    ],
  },
  pt: {
    topic: "Tema do post",
    topicPlaceholder: "Exemplo: benefícios do yoga em casa",
    tone: "Tom",
    objective: "Objetivo",
    generate: "Gerar posts",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Seus posts aparecerão aqui",
    emptyText: "Digite o tema da sua publicação para gerar 8 opções ideais para o Facebook.",
    fallback: "este tema",
    posts: [
      "Você sabia que {topic} pode mudar sua forma de ver as coisas? Aqui eu te conto o porquê. 👇",
      "Se você está buscando melhorar em {topic}, este post é para você. Não perca estas dicas.",
      "Vamos falar sobre {topic}. É algo que interessa a muitos de nós e hoje quero compartilhar minha experiência.",
      "Atenção! Se você se importa com {topic}, precisa ler isto agora mesmo. 🚀",
      "Às vezes o mais simples é o mais eficaz, especialmente com {topic}. O que você acha?",
      "Hoje quero compartilhar 3 razões pelas quais {topic} é fundamental no meu dia a dia. 💎",
      "Você já se perguntou como {topic} afeta sua rotina? Eu explico aqui.",
      "Resumo rápido sobre {topic}: o que você precisa saber hoje para avançar.",
    ],
  },
} as const;

export default function FacebookPostGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [objective, setObjective] = useState<string>(objectives[lang][0]);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = topic || t.fallback;
    setResults(t.posts.map((post) => post.replaceAll("{topic}", cleanTopic)));
  };

  const clear = () => {
    setTopic("");
    setTone(tones[lang][0]);
    setObjective(objectives[lang][0]);
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
          {results.map((post, index) => (
            <ResultCard key={index} text={post} copyLabel={t.copy} copiedLabel={t.copied} />
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
