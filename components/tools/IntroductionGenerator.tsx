"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const strings = {
  es: {
    title: "Generador de introducciones",
    topicLabel: "Tema",
    topicPlaceholder: "Ejemplo: La contaminación ambiental...",
    toneLabel: "Tono",
    lengthLabel: "Extensión",
    generate: "Generar introducción",
    result: "Introducción generada",
    tones: {
      formal: "Formal",
      explanatory: "Explicativo",
      mixed: "Mixto",
    },
    lengths: {
      short: "Corta (3 oraciones)",
      medium: "Media (5 oraciones)",
      long: "Larga (7 oraciones)",
    },
    noTopic: "Por favor ingresa un tema para generar una introducción.",
  },
  en: {
    title: "Introduction Generator",
    topicLabel: "Topic",
    topicPlaceholder: "Example: Environmental pollution...",
    toneLabel: "Tone",
    lengthLabel: "Length",
    generate: "Generate introduction",
    result: "Generated introduction",
    tones: {
      formal: "Formal",
      explanatory: "Explanatory",
      mixed: "Mixed",
    },
    lengths: {
      short: "Short (3 sentences)",
      medium: "Medium (5 sentences)",
      long: "Long (7 sentences)",
    },
    noTopic: "Please enter a topic to generate an introduction.",
  },
  pt: {
    title: "Gerador de introduções",
    topicLabel: "Tópico",
    topicPlaceholder: "Exemplo: A poluição ambiental...",
    toneLabel: "Tom",
    lengthLabel: "Extensão",
    generate: "Gerar introdução",
    result: "Introdução gerada",
    tones: {
      formal: "Formal",
      explanatory: "Explicativo",
      mixed: "Misto",
    },
    lengths: {
      short: "Curta (3 frases)",
      medium: "Média (5 frases)",
      long: "Longa (7 frases)",
    },
    noTopic: "Por favor, insira um tópico para gerar uma introdução.",
  },
};

type Tone = "formal" | "explanatory" | "mixed";
type Length = "short" | "medium" | "long";

const lengthMap: Record<Length, number> = {
  short: 3,
  medium: 5,
  long: 7,
};

function generateIntroduction(
  topic: string,
  tone: Tone,
  length: Length,
  lang: SupportedLang
): string {
  const isEn = lang === "en";
  const isEs = lang === "es";
  const numSentences = lengthMap[length];

  const sentencePools: Record<Tone, string[]> = {
    formal: isEn
      ? [
          `In recent years, ${topic} has emerged as a critical area of study and debate.`,
          `The significance of ${topic} cannot be overstated in the current global context.`,
          `Scholars and practitioners alike have increasingly turned their attention to ${topic}.`,
          `This paper aims to provide a comprehensive examination of ${topic}.`,
          `Understanding ${topic} requires a multidisciplinary approach and careful analysis.`,
          `${topic} presents both opportunities and challenges that merit thorough investigation.`,
          `The following analysis will explore the key dimensions of ${topic}.`,
        ]
      : isEs
      ? [
          `En los últimos años, ${topic} se ha convertido en un área crítica de estudio y debate.`,
          `La importancia de ${topic} no se puede subestimar en el contexto global actual.`,
          `Académicos y profesionales han centrado cada vez más su atención en ${topic}.`,
          `Este trabajo tiene como objetivo proporcionar un examen exhaustivo de ${topic}.`,
          `Comprender ${topic} requiere un enfoque multidisciplinario y un análisis cuidadoso.`,
          `${topic} presenta tanto oportunidades como desafíos que merecen una investigación exhaustiva.`,
          `El siguiente análisis explorará las dimensiones clave de ${topic}.`,
        ]
      : [
          `Nos últimos anos, ${topic} emergiu como uma área crítica de estudo e debate.`,
          `A importância de ${topic} não pode ser subestimada no contexto global atual.`,
          `Acadêmicos e profissionais têm cada vez mais voltado sua atenção para ${topic}.`,
          `Este trabalho tem como objetivo fornecer um exame abrangente de ${topic}.`,
          `Compreender ${topic} requer uma abordagem multidisciplinar e análise cuidadosa.`,
          `${topic} apresenta tanto oportunidades quanto desafios que merecem investigação aprofundada.`,
          `A análise a seguir explorará as dimensões-chave de ${topic}.`,
        ],
    explanatory: isEn
      ? [
          `${topic} is a topic that affects many aspects of our daily lives.`,
          `To understand ${topic}, it helps to first look at its basic components.`,
          `Simply put, ${topic} refers to the way different elements interact and influence outcomes.`,
          `Let us break down what ${topic} really means and why it matters.`,
          `By exploring ${topic}, we can gain valuable insights into how things work.`,
          `Many people encounter ${topic} without fully understanding its implications.`,
          `This introduction will walk through the fundamentals of ${topic}.`,
        ]
      : isEs
      ? [
          `${topic} es un tema que afecta muchos aspectos de nuestra vida diaria.`,
          `Para entender ${topic}, ayuda mirar primero sus componentes básicos.`,
          `En términos simples, ${topic} se refiere a la forma en que diferentes elementos interactúan e influyen en los resultados.`,
          `Analicemos qué significa realmente ${topic} y por qué es importante.`,
          `Al explorar ${topic}, podemos obtener información valiosa sobre cómo funcionan las cosas.`,
          `Muchas personas se encuentran con ${topic} sin comprender completamente sus implicaciones.`,
          `Esta introducción recorrerá los fundamentos de ${topic}.`,
        ]
      : [
          `${topic} é um tópico que afeta muitos aspectos de nossas vidas diárias.`,
          `Para entender ${topic}, é útil primeiro olhar para seus componentes básicos.`,
          `Simplificando, ${topic} se refere à forma como diferentes elementos interagem e influenciam resultados.`,
          `Vamos analisar o que ${topic} realmente significa e por que é importante.`,
          `Ao explorar ${topic}, podemos obter insights valiosos sobre como as coisas funcionam.`,
          `Muitas pessoas encontram ${topic} sem compreender totalmente suas implicações.`,
          `Esta introdução percorrerá os fundamentos de ${topic}.`,
        ],
    mixed: isEn
      ? [
          `${topic} has become a cornerstone of contemporary discussion.`,
          `At its heart, ${topic} challenges us to think differently about the world around us.`,
          `While the concept may seem straightforward, its implications are far-reaching.`,
          `This introduction will lay the groundwork for a deeper exploration of ${topic}.`,
          `By blending theory with real-world examples, we can better appreciate ${topic}.`,
          `${topic} invites us to ask important questions and seek meaningful answers.`,
          `The journey into ${topic} begins with understanding its core principles.`,
        ]
      : isEs
      ? [
          `${topic} se ha convertido en un pilar de la discusión contemporánea.`,
          `En esencia, ${topic} nos desafía a pensar de manera diferente sobre el mundo que nos rodea.`,
          `Aunque el concepto puede parecer sencillo, sus implicaciones son de gran alcance.`,
          `Esta introducción sentará las bases para una exploración más profunda de ${topic}.`,
          `Combinando teoría con ejemplos del mundo real, podemos apreciar mejor ${topic}.`,
          `${topic} nos invita a hacer preguntas importantes y buscar respuestas significativas.`,
          `El viaje hacia ${topic} comienza con la comprensión de sus principios fundamentales.`,
        ]
      : [
          `${topic} tornou-se um pilar da discussão contemporânea.`,
          `Em sua essência, ${topic} nos desafia a pensar diferente sobre o mundo ao nosso redor.`,
          `Embora o conceito possa parecer simples, suas implicações são de longo alcance.`,
          `Esta introdução estabelecerá as bases para uma exploração mais profunda de ${topic}.`,
          `Combinando teoria com exemplos do mundo real, podemos apreciar melhor ${topic}.`,
          `${topic} nos convida a fazer perguntas importantes e buscar respostas significativas.`,
          `A jornada em ${topic} começa com a compreensão de seus princípios fundamentais.`,
        ],
  };

  const pool = sentencePools[tone];
  const selected: string[] = [];
  for (let i = 0; i < numSentences; i++) {
    selected.push(pool[i % pool.length]);
  }

  // Capitalize first letter if needed, ensure proper ending
  return selected
    .map((s) => {
      let str = s.trim();
      if (!str.endsWith(".")) str += ".";
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
}

export default function IntroductionGenerator({ lang }: Props) {
  const t = strings[lang];
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [length, setLength] = useState<Length>("medium");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(t.noTopic);
      setIntroduction("");
      return;
    }
    setError("");
    setIntroduction(generateIntroduction(topic.trim(), tone, length, lang));
  };

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="tool-grid">
          <label className="tool-field" style={{ gridColumn: "span 2" }}>
            <span>{t.topicLabel}</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError("");
              }}
              placeholder={t.topicPlaceholder}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <label className="tool-field">
            <span>{t.toneLabel}</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.tones) as Tone[]).map((k) => (
                <option key={k} value={k}>
                  {t.tones[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="tool-field">
            <span>{t.lengthLabel}</span>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.lengths) as Length[]).map((k) => (
                <option key={k} value={k}>
                  {t.lengths[k]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fef2f2",
              borderRadius: "8px",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div className="tool-actions">
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleGenerate}
          >
            {t.generate}
          </button>
        </div>

        {introduction && (
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
                marginBottom: "10px",
              }}
            >
              {t.result}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#111",
              }}
            >
              {introduction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
