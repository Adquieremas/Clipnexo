"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const strings = {
  es: {
    title: "Generador de esquemas",
    topicLabel: "Tema",
    topicPlaceholder: "Ejemplo: Cambio climático...",
    paperTypeLabel: "Tipo de trabajo",
    depthLabel: "Profundidad",
    generate: "Generar esquema",
    regenerating: "Generando...",
    result: "Esquema generado",
    paperTypes: {
      essay: "Ensayo",
      thesis: "Tesis",
      report: "Informe",
      "research-paper": "Artículo de investigación",
    },
    depths: {
      basic: "Básico",
      detailed: "Detallado",
    },
    noTopic: "Por favor ingresa un tema para generar un esquema.",
  },
  en: {
    title: "Outline Generator",
    topicLabel: "Topic",
    topicPlaceholder: "Example: Climate change...",
    paperTypeLabel: "Paper type",
    depthLabel: "Depth",
    generate: "Generate outline",
    regenerating: "Generating...",
    result: "Generated outline",
    paperTypes: {
      essay: "Essay",
      thesis: "Thesis",
      report: "Report",
      "research-paper": "Research paper",
    },
    depths: {
      basic: "Basic",
      detailed: "Detailed",
    },
    noTopic: "Please enter a topic to generate an outline.",
  },
  pt: {
    title: "Gerador de esquemas",
    topicLabel: "Tópico",
    topicPlaceholder: "Exemplo: Mudanças climáticas...",
    paperTypeLabel: "Tipo de trabalho",
    depthLabel: "Profundidade",
    generate: "Gerar esquema",
    regenerating: "Gerando...",
    result: "Esquema gerado",
    paperTypes: {
      essay: "Ensaio",
      thesis: "Tese",
      report: "Relatório",
      "research-paper": "Artigo de pesquisa",
    },
    depths: {
      basic: "Básico",
      detailed: "Detalhado",
    },
    noTopic: "Por favor, insira um tópico para gerar um esquema.",
  },
};

type PaperType = "essay" | "thesis" | "report" | "research-paper";
type Depth = "basic" | "detailed";

function generateOutline(
  topic: string,
  paperType: PaperType,
  depth: Depth,
  lang: SupportedLang
): string {
  const isEn = lang === "en";
  const isEs = lang === "es";

  const intro = isEn
    ? "Introduction"
    : isEs
    ? "Introducción"
    : "Introdução";
  const conclusion = isEn
    ? "Conclusion"
    : isEs
    ? "Conclusión"
    : "Conclusão";
  const refs = isEn
    ? "References"
    : isEs
    ? "Referencias"
    : "Referências";

  const bodySections: Record<PaperType, string[]> = {
    essay: isEn
      ? [
          "Hook / Attention grabber",
          "Background information on " + topic,
          "Thesis statement",
          "Main argument — supporting evidence",
          "Counterargument and rebuttal",
          "Synthesis of ideas",
          "Restate thesis",
          "Summary of main points",
          "Final thought / call to action",
        ]
      : isEs
      ? [
          "Gancho / Llamada de atención",
          "Información de fondo sobre " + topic,
          "Declaración de tesis",
          "Argumento principal — evidencia de apoyo",
          "Contraargumento y refutación",
          "Síntesis de ideas",
          "Reafirmar tesis",
          "Resumen de puntos principales",
          "Reflexión final / llamado a la acción",
        ]
      : [
          "Gancho / Chamariz",
          "Informações de fundo sobre " + topic,
          "Declaração de tese",
          "Argumento principal — evidências de apoio",
          "Contra-argumento e refutação",
          "Síntese de ideias",
          "Reafirmar tese",
          "Resumo dos pontos principais",
          "Consideração final / chamada para ação",
        ],
    thesis: isEn
      ? [
          "Research question / Problem statement",
          "Literature review on " + topic,
          "Research gap identification",
          "Theoretical framework",
          "Methodology overview",
          "Data collection methods",
          "Data analysis approach",
          "Results / Findings",
          "Discussion of findings",
          "Implications and limitations",
          "Future research directions",
          "Summary of contributions",
        ]
      : isEs
      ? [
          "Pregunta de investigación / Planteamiento del problema",
          "Revisión de la literatura sobre " + topic,
          "Identificación de vacíos de investigación",
          "Marco teórico",
          "Resumen de metodología",
          "Métodos de recolección de datos",
          "Enfoque de análisis de datos",
          "Resultados / Hallazgos",
          "Discusión de hallazgos",
          "Implicaciones y limitaciones",
          "Direcciones futuras de investigación",
          "Resumen de contribuciones",
        ]
      : [
          "Pergunta de pesquisa / Declaração do problema",
          "Revisão da literatura sobre " + topic,
          "Identificação de lacunas de pesquisa",
          "Estrutura teórica",
          "Visão geral da metodologia",
          "Métodos de coleta de dados",
          "Abordagem de análise de dados",
          "Resultados / Descobertas",
          "Discussão dos resultados",
          "Implicações e limitações",
          "Direções futuras de pesquisa",
          "Resumo das contribuições",
        ],
    report: isEn
      ? [
          "Executive summary",
          "Background / Context of " + topic,
          "Objectives",
          "Methodology / Approach",
          "Findings / Data presentation",
          "Analysis and interpretation",
          "Recommendations",
          "Implementation plan",
          "Conclusion",
          "Appendices",
        ]
      : isEs
      ? [
          "Resumen ejecutivo",
          "Antecedentes / Contexto de " + topic,
          "Objetivos",
          "Metodología / Enfoque",
          "Hallazgos / Presentación de datos",
          "Análisis e interpretación",
          "Recomendaciones",
          "Plan de implementación",
          "Conclusión",
          "Apéndices",
        ]
      : [
          "Resumo executivo",
          "Antecedentes / Contexto de " + topic,
          "Objetivos",
          "Metodologia / Abordagem",
          "Descobertas / Apresentação de dados",
          "Análise e interpretação",
          "Recomendações",
          "Plano de implementação",
          "Conclusão",
          "Apêndices",
        ],
    "research-paper": isEn
      ? [
          "Title and abstract",
          "Introduction to " + topic,
          "Research problem and hypothesis",
          "Literature review",
          "Methodology",
          "Results / Data analysis",
          "Discussion",
          "Limitations",
          "Conclusion and future work",
        ]
      : isEs
      ? [
          "Título y resumen",
          "Introducción a " + topic,
          "Problema de investigación e hipótesis",
          "Revisión de la literatura",
          "Metodología",
          "Resultados / Análisis de datos",
          "Discusión",
          "Limitaciones",
          "Conclusión y trabajo futuro",
        ]
      : [
          "Título e resumo",
          "Introdução a " + topic,
          "Problema de pesquisa e hipótese",
          "Revisão da literatura",
          "Metodologia",
          "Resultados / Análise de dados",
          "Discussão",
          "Limitações",
          "Conclusão e trabalhos futuros",
        ],
  };

  const sections = bodySections[paperType];

  if (depth === "basic") {
    const basicSections: string[] = [];
    basicSections.push(`I. ${intro}`);
    const mid = Math.floor(sections.length / 2);
    basicSections.push(`II. ${sections[0]}`);
    basicSections.push(`III. ${sections[mid]}`);
    basicSections.push(`IV. ${sections[sections.length - 1]}`);
    basicSections.push(`V. ${conclusion}`);
    return basicSections.join("\n");
  }

  const lines: string[] = [];
  lines.push(`I. ${intro}`);
  sections.forEach((s, i) => {
    lines.push(`  ${String.fromCharCode(65 + i)}. ${s}`);
    if (depth === "detailed") {
      lines.push(`    1. Supporting detail for "${s.split(" — ")[0] || s}"`);
      lines.push(`    2. Example / evidence`);
    }
  });
  const finalLetter = String.fromCharCode(65 + sections.length);
  lines.push(`${finalLetter}. ${conclusion}`);
  if (depth === "detailed") {
    const refLetter = String.fromCharCode(66 + sections.length);
    lines.push(`${refLetter}. ${refs}`);
  }
  return lines.join("\n");
}

export default function OutlineGenerator({ lang }: Props) {
  const t = strings[lang];
  const [topic, setTopic] = useState("");
  const [paperType, setPaperType] = useState<PaperType>("essay");
  const [depth, setDepth] = useState<Depth>("basic");
  const [outline, setOutline] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(t.noTopic);
      setOutline("");
      return;
    }
    setError("");
    setOutline(generateOutline(topic.trim(), paperType, depth, lang));
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
            <span>{t.paperTypeLabel}</span>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value as PaperType)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.paperTypes) as PaperType[]).map((k) => (
                <option key={k} value={k}>
                  {t.paperTypes[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="tool-field">
            <span>{t.depthLabel}</span>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value as Depth)}
              style={{
                padding: "10px 14px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                outline: "none",
                width: "100%",
              }}
            >
              {(Object.keys(t.depths) as Depth[]).map((k) => (
                <option key={k} value={k}>
                  {t.depths[k]}
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

        {outline && (
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
            <pre
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#111",
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
              }}
            >
              {outline}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
