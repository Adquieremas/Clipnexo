"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const strings = {
  es: {
    title: "Generador de títulos para trabajos",
    topicLabel: "Tema",
    topicPlaceholder: "Ejemplo: Inteligencia artificial...",
    styleLabel: "Estilo",
    generate: "Generar títulos",
    result: "Títulos generados",
    styles: {
      formal: "Formal",
      creative: "Creativo",
      mixed: "Mixto",
    },
    noTopic: "Por favor ingresa un tema para generar títulos.",
  },
  en: {
    title: "Assignment Title Generator",
    topicLabel: "Topic",
    topicPlaceholder: "Example: Artificial intelligence...",
    styleLabel: "Style",
    generate: "Generate titles",
    result: "Generated titles",
    styles: {
      formal: "Formal",
      creative: "Creative",
      mixed: "Mixed",
    },
    noTopic: "Please enter a topic to generate titles.",
  },
  pt: {
    title: "Gerador de títulos para trabalhos",
    topicLabel: "Tópico",
    topicPlaceholder: "Exemplo: Inteligência artificial...",
    styleLabel: "Estilo",
    generate: "Gerar títulos",
    result: "Títulos gerados",
    styles: {
      formal: "Formal",
      creative: "Criativo",
      mixed: "Misto",
    },
    noTopic: "Por favor, insira um tópico para gerar títulos.",
  },
};

type Style = "formal" | "creative" | "mixed";

function generateTitles(topic: string, style: Style, lang: SupportedLang): string[] {
  const isEn = lang === "en";
  const isEs = lang === "es";

  const templates: Record<Style, string[]> = {
    formal: isEn
      ? [
          "A Comprehensive Analysis of {topic}",
          "The Impact of {topic} on Modern Society",
          "{topic}: A Critical Review",
          "Understanding {topic}: Implications and Applications",
          "The Role of {topic} in the 21st Century",
          "An Investigation into {topic}",
          "{topic}: Current Trends and Future Directions",
          "Evaluating the Effectiveness of {topic}",
          "{topic} in Context: A Scholarly Perspective",
          "The Evolution and Significance of {topic}",
        ]
      : isEs
      ? [
          "Un análisis exhaustivo de {topic}",
          "El impacto de {topic} en la sociedad moderna",
          "{topic}: Una revisión crítica",
          "Comprendiendo {topic}: Implicaciones y aplicaciones",
          "El papel de {topic} en el siglo XXI",
          "Una investigación sobre {topic}",
          "{topic}: Tendencias actuales y direcciones futuras",
          "Evaluando la efectividad de {topic}",
          "{topic} en contexto: Una perspectiva académica",
          "La evolución y significado de {topic}",
        ]
      : [
          "Uma análise abrangente de {topic}",
          "O impacto de {topic} na sociedade moderna",
          "{topic}: Uma revisão crítica",
          "Compreendendo {topic}: Implicações e aplicações",
          "O papel de {topic} no século XXI",
          "Uma investigação sobre {topic}",
          "{topic}: Tendências atuais e direções futuras",
          "Avaliando a eficácia de {topic}",
          "{topic} em contexto: Uma perspectiva acadêmica",
          "A evolução e o significado de {topic}",
        ],
    creative: isEn
      ? [
          "{topic}: The Untold Story",
          "Beyond {topic}: What You Need to Know",
          "Rethinking {topic}: A New Perspective",
          "The {topic} Paradox",
          "{topic} Uncovered: Surprising Insights",
          "Navigating the World of {topic}",
          "{topic} Demystified",
          "The Art and Science of {topic}",
          "{topic} Reimagined",
          "Exploring the Depths of {topic}",
        ]
      : isEs
      ? [
          "{topic}: La historia no contada",
          "Más allá de {topic}: Lo que necesitas saber",
          "Repensando {topic}: Una nueva perspectiva",
          "La paradoja de {topic}",
          "{topic} revelado: Perspectivas sorprendentes",
          "Navegando el mundo de {topic}",
          "{topic} desmitificado",
          "El arte y la ciencia de {topic}",
          "{topic} reinventado",
          "Explorando las profundidades de {topic}",
        ]
      : [
          "{topic}: A história não contada",
          "Além de {topic}: O que você precisa saber",
          "Repensando {topic}: Uma nova perspectiva",
          "O paradoxo de {topic}",
          "{topic} revelado: Percepções surpreendentes",
          "Navegando pelo mundo de {topic}",
          "{topic} desmistificado",
          "A arte e a ciência de {topic}",
          "{topic} reimaginado",
          "Explorando as profundezas de {topic}",
        ],
    mixed: isEn
      ? [
          "{topic}: A Comprehensive Exploration",
          "The {topic} Revolution: Challenges and Opportunities",
          "Decoding {topic}: An Interdisciplinary Approach",
          "{topic} in the Modern Era: A Deep Dive",
          "From Theory to Practice: {topic}",
          "{topic}: Bridging Gaps and Building Futures",
          "The Many Faces of {topic}",
          "{topic}: Innovation, Impact, and Insight",
          "Connecting the Dots: {topic}",
          "{topic} Revisited: Old Questions, New Answers",
        ]
      : isEs
      ? [
          "{topic}: Una exploración exhaustiva",
          "La revolución de {topic}: Desafíos y oportunidades",
          "Descifrando {topic}: Un enfoque interdisciplinario",
          "{topic} en la era moderna: Una inmersión profunda",
          "De la teoría a la práctica: {topic}",
          "{topic}: Uniendo brechas y construyendo futuros",
          "Las múltiples caras de {topic}",
          "{topic}: Innovación, impacto y perspectiva",
          "Conectando los puntos: {topic}",
          "{topic} revisitado: Viejas preguntas, nuevas respuestas",
        ]
      : [
          "{topic}: Uma exploração abrangente",
          "A revolução de {topic}: Desafios e oportunidades",
          "Decodificando {topic}: Uma abordagem interdisciplinar",
          "{topic} na era moderna: Um mergulho profundo",
          "Da teoria à prática: {topic}",
          "{topic}: Unindo lacunas e construindo futuros",
          "As muitas faces de {topic}",
          "{topic}: Inovação, impacto e percepção",
          "Conectando os pontos: {topic}",
          "{topic} revisitado: Velhas perguntas, novas respostas",
        ],
  };

  return templates[style].map((tmpl) => {
    if (style === "formal") {
      return tmpl.replace(/\{topic\}/g, topic.charAt(0).toUpperCase() + topic.slice(1));
    }
    const lowerTopic = topic.charAt(0).toLowerCase() + topic.slice(1);
    const upperTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
    return tmpl
      .replace(/\{topic\}/g, (_, offset) => {
        if (offset === 0) return upperTopic;
        return lowerTopic;
      })
      .replace(/^./, (c) => c.toUpperCase());
  });
}

export default function AssignmentTitleGenerator({ lang }: Props) {
  const t = strings[lang];
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<Style>("formal");
  const [titles, setTitles] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(t.noTopic);
      setTitles([]);
      return;
    }
    setError("");
    setTitles(generateTitles(topic.trim(), style, lang));
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
            <span>{t.styleLabel}</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.styles) as Style[]).map((k) => (
                <option key={k} value={k}>
                  {t.styles[k]}
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

        {titles.length > 0 && (
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
                marginBottom: "12px",
              }}
            >
              {t.result}
            </span>
            <ol
              style={{
                margin: 0,
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {titles.map((title, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "15px",
                    color: "#111",
                    lineHeight: 1.5,
                  }}
                >
                  {title}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
