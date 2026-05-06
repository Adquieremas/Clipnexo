"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const contentTypes = {
  es: ["Educativo", "Entretenimiento", "Detrás de escena", "Venta", "Inspiración"],
  en: ["Educational", "Entertainment", "Behind the scenes", "Sales", "Inspiration"],
  pt: ["Educativo", "Entretenimento", "Bastidores", "Vendas", "Inspiração"],
} as const;

const copy = {
  es: {
    topic: "Tema o nicho",
    topicPlaceholder: "Ejemplo: cocina saludable",
    type: "Tipo de contenido",
    generate: "Generar ideas",
    clear: "Limpiar",
    copy: "Copiar idea",
    copied: "Copiado",
    emptyTitle: "Tus ideas aparecerán aquí",
    emptyText: "Escribe un tema para generar 10 ideas creativas para tus Reels.",
    explanation: "Explicación",
    cta: "CTA sugerido",
    ideas: [
      { title: "El mayor error en {topic}", text: "Muestra un error común que comete la gente al empezar con {topic}.", cta: "¿Te ha pasado esto? Cuéntame abajo." },
      { title: "3 tips rápidos para {topic}", text: "Comparte tres consejos que se puedan aplicar en menos de 1 minuto.", cta: "Guarda este Reel para después." },
      { title: "Día en la vida con {topic}", text: "Un vlog corto mostrando cómo integras {topic} en tu rutina diaria.", cta: "Sígueme para más contenido así." },
      { title: "Mito vs Realidad: {topic}", text: "Desmiente un mito popular sobre {topic} con datos reales.", cta: "¿Lo sabías? Deja un ❤️ si no." },
      { title: "Herramienta secreta para {topic}", text: "Muestra una app o recurso que facilite el trabajo con {topic}.", cta: "Link en mi bio para probarlo." },
      { title: "Transformación con {topic}", text: "Muestra un antes y después real usando {topic}.", cta: "¿Qué te parece el cambio?" },
      { title: "Respondiendo dudas de {topic}", text: "Toma un comentario real y responde en video de forma clara.", cta: "Deja tu duda aquí para el próximo video." },
      { title: "POV: Estás usando {topic}", text: "Usa una tendencia de audio para mostrar una situación graciosa con {topic}.", cta: "Etiqueta a alguien que pase por esto." },
      { title: "Lo que nadie te dice de {topic}", text: "Revela un secreto o curiosidad poco conocida sobre el nicho.", cta: "Comparte con un amigo." },
      { title: "Tutorial express de {topic}", text: "Enseña a hacer algo muy específico de {topic} paso a paso.", cta: "Suscríbete para aprender más." },
    ]
  },
  en: {
    topic: "Topic or niche",
    topicPlaceholder: "Example: healthy cooking",
    type: "Content type",
    generate: "Generate ideas",
    clear: "Clear",
    copy: "Copy idea",
    copied: "Copied",
    emptyTitle: "Your ideas will appear here",
    emptyText: "Enter a topic to generate 10 creative ideas for your Reels.",
    explanation: "Explanation",
    cta: "Suggested CTA",
    ideas: [
      { title: "The biggest mistake in {topic}", text: "Show a common mistake people make when starting with {topic}.", cta: "Has this happened to you? Tell me below." },
      { title: "3 quick tips for {topic}", text: "Share three tips that can be applied in less than 1 minute.", cta: "Save this Reel for later." },
      { title: "Day in the life with {topic}", text: "A short vlog showing how you integrate {topic} into your daily routine.", cta: "Follow for more content like this." },
      { title: "Myth vs Reality: {topic}", text: "Debunk a popular myth about {topic} with real facts.", cta: "Did you know this? Leave a ❤️ if not." },
      { title: "Secret tool for {topic}", text: "Show an app or resource that makes working with {topic} easier.", cta: "Link in my bio to try it." },
      { title: "Transformation with {topic}", text: "Show a real before and after using {topic}.", cta: "What do you think of the change?" },
      { title: "Answering {topic} questions", text: "Take a real comment and answer it clearly in the video.", cta: "Leave your question here for the next video." },
      { title: "POV: You're using {topic}", text: "Use a trending audio to show a funny situation with {topic}.", cta: "Tag someone who goes through this." },
      { title: "What no one tells you about {topic}", text: "Reveal a secret or little-known fact about the niche.", cta: "Share with a friend." },
      { title: "Express {topic} tutorial", text: "Teach how to do something very specific in {topic} step by step.", cta: "Subscribe to learn more." },
    ]
  },
  pt: {
    topic: "Tema ou nicho",
    topicPlaceholder: "Exemplo: cozinha saudável",
    type: "Tipo de conteúdo",
    generate: "Gerar ideias",
    clear: "Limpar",
    copy: "Copiar ideia",
    copied: "Copiado",
    emptyTitle: "Suas ideias aparecerão aqui",
    emptyText: "Digite um tema para gerar 10 ideias criativas para seus Reels.",
    explanation: "Explicação",
    cta: "CTA sugerido",
    ideas: [
      { title: "O maior erro em {topic}", text: "Mostre um erro comum que as pessoas cometem ao começar com {topic}.", cta: "Isso já aconteceu com você? Comenta aqui embaixo." },
      { title: "3 dicas rápidas para {topic}", text: "Compartilhe três dicas que podem ser aplicadas em menos de 1 minuto.", cta: "Salve este Reel para depois." },
      { title: "Um dia na vida com {topic}", text: "Um vlog curto mostrando como você integra {topic} na sua rotina diária.", cta: "Siga para mais conteúdos assim." },
      { title: "Mito vs Realidade: {topic}", text: "Desminta um mito popular sobre {topic} com dados reais.", cta: "Você sabia? Deixe um ❤️ se não." },
      { title: "Ferramenta secreta para {topic}", text: "Mostre um app ou recurso que facilite o trabalho com {topic}.", cta: "Link na minha bio para testar." },
      { title: "Transformação com {topic}", text: "Mostre um antes e depois real usando {topic}.", cta: "O que achou da mudança?" },
      { title: "Respondendo dúvidas de {topic}", text: "Pegue um comentário real e responda em vídeo de forma clara.", cta: "Deixe sua dúvida aqui para o próximo vídeo." },
      { title: "POV: Você está usando {topic}", text: "Use um áudio em alta para mostrar uma situação engraçada com {topic}.", cta: "Marque alguém que passa por isso." },
      { title: "O que ninguém te conta sobre {topic}", text: "Revele um segredo ou curiosidade pouco conhecida sobre o nicho.", cta: "Compartilhe com um amigo." },
      { title: "Tutorial express de {topic}", text: "Ensine a fazer algo muito específico de {topic} passo a passo.", cta: "Inscreva-se para aprender mais." },
    ]
  },
} as const;

export default function ReelsIdeasGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<string>(contentTypes[lang][0]);
  const [results, setResults] = useState<Array<{ title: string; text: string; cta: string }>>([]);

  const generate = () => {
    const cleanTopic = topic || (lang === "es" ? "tu nicho" : lang === "en" ? "your niche" : "seu nicho");
    setResults(
      t.ideas.map((idea) => ({
        title: idea.title.replaceAll("{topic}", cleanTopic),
        text: idea.text.replaceAll("{topic}", cleanTopic),
        cta: idea.cta,
      }))
    );
  };

  const clear = () => {
    setTopic("");
    setContentType(contentTypes[lang][0]);
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
          <span>{t.type}</span>
          <select value={contentType} onChange={(event) => setContentType(event.target.value)}>
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
        <div className="tool-results" style={{ display: "grid", gap: "24px" }}>
          {results.map((idea, index) => (
            <div
              key={index}
              style={{
                padding: "24px",
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "1px solid #eee",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111", margin: 0 }}>
                {idea.title}
              </h3>
              <div>
                <strong style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: "#666" }}>
                  {t.explanation}
                </strong>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6", color: "#444" }}>
                  {idea.text}
                </p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#f0f7ff", borderRadius: "8px" }}>
                <strong style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#2563eb" }}>
                  {t.cta}
                </strong>
                <p style={{ margin: 0, fontSize: "15px", fontStyle: "italic", color: "#1e40af" }}>
                  {idea.cta}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                <CopyButton
                  text={`${idea.title}\n${idea.text}\n${idea.cta}`}
                  label={t.copy}
                  copiedLabel={t.copied}
                />
              </div>
            </div>
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
