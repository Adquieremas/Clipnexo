"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import { compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const contentTypes = {
  es: ["educativo", "viral", "tutorial", "ventas", "entretenimiento", "storytelling"],
  en: ["educational", "viral", "tutorial", "sales", "entertainment", "storytelling"],
  pt: ["educativo", "viral", "tutorial", "vendas", "entretenimento", "storytelling"],
} as const;

const copy = {
  es: {
    topic: "Nicho o tema",
    topicPlaceholder: "Ejemplo: skincare para piel grasa",
    type: "Tipo de contenido",
    generate: "Generar ideas",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus ideas aparecerán aquí",
    emptyText: "Escribe un nicho y elige un tipo de contenido para empezar.",
    fallback: "tu nicho",
    titleLabel: "Idea",
    formatLabel: "Formato",
    templates: [
      ["Errores comunes en {topic}", "Muestra tres errores frecuentes y cómo evitarlos con ejemplos rápidos."],
      ["Antes y después de {topic}", "Compara una situación inicial con un resultado mejor después de aplicar un consejo."],
      ["Mito sobre {topic}", "Desmonta una creencia común y explica la alternativa correcta."],
      ["Guía rápida de {topic}", "Resume un proceso simple en pasos que se puedan entender en menos de un minuto."],
      ["Lo que nadie te dice de {topic}", "Presenta un aprendizaje útil desde una experiencia real o caso práctico."],
      ["Checklist para {topic}", "Convierte el tema en una lista breve que la audiencia pueda guardar."],
      ["Reto de 7 días sobre {topic}", "Propón una acción diaria sencilla para motivar comentarios y seguimiento."],
      ["Historia real de {topic}", "Cuenta una situación concreta con inicio, problema y solución."],
      ["Herramientas para {topic}", "Recomienda recursos, hábitos o pasos que ayuden a resolver una necesidad."],
      ["Pregunta frecuente de {topic}", "Responde una duda típica con una explicación corta y accionable."],
    ],
  },
  en: {
    topic: "Niche or topic",
    topicPlaceholder: "Example: skincare for oily skin",
    type: "Content type",
    generate: "Generate ideas",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your ideas will appear here",
    emptyText: "Enter a niche and choose a content type to begin.",
    fallback: "your niche",
    titleLabel: "Idea",
    formatLabel: "Format",
    templates: [
      ["Common mistakes in {topic}", "Show three frequent mistakes and how to avoid them with quick examples."],
      ["Before and after {topic}", "Compare a starting point with a better result after applying one tip."],
      ["A myth about {topic}", "Challenge a common belief and explain the better alternative."],
      ["Quick guide to {topic}", "Summarize a simple process in steps people can understand in under a minute."],
      ["What nobody tells you about {topic}", "Share a useful lesson from a real experience or practical case."],
      ["Checklist for {topic}", "Turn the topic into a short list your audience can save."],
      ["7-day {topic} challenge", "Suggest one simple daily action to encourage comments and follow-up."],
      ["Real story about {topic}", "Tell a specific situation with a beginning, problem and solution."],
      ["Tools for {topic}", "Recommend resources, habits or steps that solve a real need."],
      ["FAQ about {topic}", "Answer a typical question with a short, actionable explanation."],
    ],
  },
  pt: {
    topic: "Nicho ou tema",
    topicPlaceholder: "Exemplo: skincare para pele oleosa",
    type: "Tipo de conteúdo",
    generate: "Gerar ideias",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas ideias aparecerão aqui",
    emptyText: "Digite um nicho e escolha um tipo de conteúdo para começar.",
    fallback: "seu nicho",
    titleLabel: "Ideia",
    formatLabel: "Formato",
    templates: [
      ["Erros comuns em {topic}", "Mostre três erros frequentes e como evitá-los com exemplos rápidos."],
      ["Antes e depois de {topic}", "Compare uma situação inicial com um resultado melhor após aplicar uma dica."],
      ["Mito sobre {topic}", "Questione uma crença comum e explique a alternativa correta."],
      ["Guia rápido de {topic}", "Resuma um processo simples em passos fáceis de entender em menos de um minuto."],
      ["O que ninguém fala sobre {topic}", "Compartilhe um aprendizado útil de uma experiência real ou caso prático."],
      ["Checklist para {topic}", "Transforme o tema em uma lista curta que a audiência possa salvar."],
      ["Desafio de 7 dias sobre {topic}", "Proponha uma ação diária simples para incentivar comentários e retorno."],
      ["História real de {topic}", "Conte uma situação específica com início, problema e solução."],
      ["Ferramentas para {topic}", "Recomende recursos, hábitos ou passos que resolvam uma necessidade."],
      ["Pergunta frequente sobre {topic}", "Responda uma dúvida comum com explicação curta e prática."],
    ],
  },
} as const;

export default function TikTokIdeasGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<string>(contentTypes[lang][0]);
  const [results, setResults] = useState<Array<{ title: string; description: string }>>([]);

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    const ideas = t.templates.map(([title, description]) => ({
      title: title.replaceAll("{topic}", cleanTopic),
      description: `${description} ${type ? `${t.formatLabel}: ${type}.` : ""}`,
    }));

    setResults(ideas);
  };

  const clear = () => {
    setTopic("");
    setType(contentTypes[lang][0]);
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
          <span>{t.type}</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            {contentTypes[lang].map((item) => (
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
          {results.map((idea, index) => (
            <ResultCard
              key={idea.title}
              title={`${t.titleLabel} ${index + 1}: ${idea.title}`}
              text={idea.title}
              description={idea.description}
              copyLabel={t.copy}
              copiedLabel={t.copied}
            />
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
