"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
import ResultCard from "./ResultCard";

type LangLabels = {
  topic: string;
  network: string;
  tone: string;
  generate: string;
  clear: string;
  results: string;
  copyAll: string;
  characters: string;
  words: string;
  toneOptions: { value: string; label: string }[];
};

const labels: Record<string, LangLabels> = {
  es: {
    topic: "Tema o idea",
    network: "Red social",
    tone: "Tono",
    generate: "Generar textos",
    clear: "Limpiar",
    results: "Textos generados",
    copyAll: "Copiar todos",
    characters: "caracteres",
    words: "palabras",
    toneOptions: [
      { value: "profesional", label: "Profesional" },
      { value: "divertido", label: "Divertido" },
      { value: "vendedor", label: "Vendedor" },
      { value: "emocional", label: "Emocional" },
      { value: "educativo", label: "Educativo" },
      { value: "directo", label: "Directo" },
    ],
  },
  en: {
    topic: "Topic or idea",
    network: "Social network",
    tone: "Tone",
    generate: "Generate texts",
    clear: "Clear",
    results: "Generated texts",
    copyAll: "Copy all",
    characters: "characters",
    words: "words",
    toneOptions: [
      { value: "profesional", label: "Professional" },
      { value: "divertido", label: "Fun" },
      { value: "vendedor", label: "Sales" },
      { value: "emocional", label: "Emotional" },
      { value: "educativo", label: "Educational" },
      { value: "directo", label: "Direct" },
    ],
  },
  pt: {
    topic: "Tema ou ideia",
    network: "Rede social",
    tone: "Tom",
    generate: "Gerar textos",
    clear: "Limpar",
    results: "Textos gerados",
    copyAll: "Copiar todos",
    characters: "caracteres",
    words: "palavras",
    toneOptions: [
      { value: "profesional", label: "Profissional" },
      { value: "divertido", label: "Divertido" },
      { value: "vendedor", label: "Vendedor" },
      { value: "emocional", label: "Emocional" },
      { value: "educativo", label: "Educativo" },
      { value: "directo", label: "Direto" },
    ],
  },
};

type NetworkTemplates = Record<string, string[]>;

const templates: Record<string, NetworkTemplates> = {
  es: {
    Facebook: [
      "¿Sabías que {topic}? Te cuento más en este post.",
      "Hoy quiero hablar de {topic}. ¿A ti qué te parece?",
      "{topic} es algo que me apasiona. Comparto mi experiencia.",
      "Si te interesa {topic}, esto te va a encantar.",
      "Nuevo post sobre {topic}. Espero que te sea útil.",
      "¿Qué opinas de {topic}? Déjame tu comentario.",
    ],
    Instagram: [
      "{topic} ✨ Algo que tienes que conocer.",
      "Todo sobre {topic} en un solo post. Guárdalo para después.",
      "{topic} es tendencia. No te lo pierdas.",
      "Si te gusta {topic}, esto es para ti.",
      "La guía definitiva de {topic} que estabas esperando.",
    ],
    "Twitter/X": [
      "{topic}: lo que necesitas saber en pocas palabras.",
      "Hablando de {topic}... ¿tú qué crees?",
      "{topic} es clave. Aquí te explico por qué.",
      "Un hilo sobre {topic} que vale la pena leer.",
      "{topic} en 2026. Esto es lo que importa.",
    ],
    LinkedIn: [
      "He estado reflexionando sobre {topic} y quería compartir mi perspectiva.",
      "El impacto de {topic} en nuestra industria es innegable.",
      "Comparto algunas ideas sobre {topic} que pueden ser útiles.",
      "¿Cómo afecta {topic} a tu negocio? Aquí te cuento.",
      "Mi experiencia con {topic} y lo que he aprendido.",
    ],
    TikTok: [
      "Esto de {topic} te va a sorprender.",
      "POV: descubres {topic} y cambia todo.",
      "{topic} explicado en segundos.",
      "¿Conoces {topic}? Te cuento los detalles.",
      "Lo que nadie te dice de {topic}.",
    ],
    General: [
      "Descubre todo sobre {topic}.",
      "Si te interesa {topic}, esto te va a gustar.",
      "Todo lo que necesitas saber de {topic}.",
      "Una introducción a {topic} que no te puedes perder.",
      "Hablamos de {topic} porque es importante.",
    ],
  },
  en: {
    Facebook: [
      "Did you know about {topic}? Let me tell you more.",
      "Today I want to talk about {topic}. What do you think?",
      "{topic} is something I'm passionate about. Sharing my experience.",
      "If you're into {topic}, you'll love this.",
      "New post about {topic}. Hope you find it useful.",
    ],
    Instagram: [
      "{topic} ✨ Something you need to know.",
      "Everything about {topic} in one post. Save it for later.",
      "{topic} is trending. Don't miss out.",
      "If you like {topic}, this is for you.",
      "The ultimate guide to {topic} you've been waiting for.",
    ],
    "Twitter/X": [
      "{topic}: what you need to know in a few words.",
      "Thinking about {topic}... what do you think?",
      "{topic} is key. Here's why.",
      "A thread about {topic} worth reading.",
      "{topic} in 2026. Here's what matters.",
    ],
    LinkedIn: [
      "I've been thinking about {topic} and wanted to share my perspective.",
      "The impact of {topic} on our industry is undeniable.",
      "Sharing some thoughts on {topic} that might be useful.",
      "How does {topic} affect your business? Here's what I think.",
      "My experience with {topic} and what I've learned.",
    ],
    TikTok: [
      "This thing about {topic} will surprise you.",
      "POV: you discover {topic} and everything changes.",
      "{topic} explained in seconds.",
      "Do you know {topic}? Details in this video.",
      "What nobody tells you about {topic}.",
    ],
    General: [
      "Discover everything about {topic}.",
      "If you're into {topic}, you'll like this.",
      "Everything you need to know about {topic}.",
      "An intro to {topic} you can't miss.",
      "Let's talk about {topic} because it matters.",
    ],
  },
  pt: {
    Facebook: [
      "Sabia que {topic}? Conto mais neste post.",
      "Hoje quero falar sobre {topic}. O que você acha?",
      "{topic} é algo que me apaixona. Compartilho minha experiência.",
      "Se você se interessa por {topic}, vai adorar isso.",
      "Novo post sobre {topic}. Espero que seja útil.",
    ],
    Instagram: [
      "{topic} ✨ Algo que você precisa conhecer.",
      "Tudo sobre {topic} em um post. Salve para depois.",
      "{topic} é tendência. Não perca.",
      "Se você gosta de {topic}, isso é para você.",
      "O guia definitivo de {topic} que você esperava.",
    ],
    "Twitter/X": [
      "{topic}: o que você precisa saber em poucas palavras.",
      "Falando de {topic}... o que você acha?",
      "{topic} é chave. Aqui explico por quê.",
      "Uma thread sobre {topic} que vale a pena ler.",
      "{topic} em 2026. Aqui está o que importa.",
    ],
    LinkedIn: [
      "Estive refletindo sobre {topic} e queria compartilhar minha perspectiva.",
      "O impacto de {topic} na nossa indústria é inegável.",
      "Compartilho algumas ideias sobre {topic} que podem ser úteis.",
      "Como {topic} afeta seu negócio? Conto aqui.",
      "Minha experiência com {topic} e o que aprendi.",
    ],
    TikTok: [
      "Isso de {topic} vai te surpreender.",
      "POV: você descobre {topic} e tudo muda.",
      "{topic} explicado em segundos.",
      "Conhece {topic}? Conto os detalhes.",
      "O que ninguém te conta sobre {topic}.",
    ],
    General: [
      "Descubra tudo sobre {topic}.",
      "Se você se interessa por {topic}, vai gostar disso.",
      "Tudo o que você precisa saber sobre {topic}.",
      "Uma introdução a {topic} que você não pode perder.",
      "Falamos de {topic} porque é importante.",
    ],
  },
};

export default function SocialMediaTextGenerator({ lang }: { lang: string }) {
  const [topic, setTopic] = useState("");
  const [network, setNetwork] = useState("General");
  const [tone, setTone] = useState("profesional");
  const [results, setResults] = useState<string[]>([]);

  const currentLabels = labels[lang] || labels.es;
  const currentTemplates = templates[lang] || templates.es;

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const networkTemplates = currentTemplates[network] || currentTemplates.General;
    const generated = networkTemplates.map((t) => t.replace(/\{topic\}/g, topic.trim()));
    setResults(generated);
  };

  const handleClear = () => {
    setTopic("");
    setResults([]);
  };

  return (
    <div className="tool-card" style={{ marginTop: 16 }}>
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          {currentLabels.topic}
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={currentLabels.topic}
          />
        </label>

        <label className="tool-field">
          {currentLabels.network}
          <select value={network} onChange={(e) => setNetwork(e.target.value)}>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter/X">Twitter/X</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
            <option value="General">General</option>
          </select>
        </label>

        <label className="tool-field">
          {currentLabels.tone}
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            {currentLabels.toneOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tool-actions">
        <button
          type="button"
          className="tool-button"
          onClick={handleGenerate}
          disabled={!topic.trim()}
        >
          {currentLabels.generate}
        </button>
        <button type="button" className="tool-button-secondary" onClick={handleClear}>
          {currentLabels.clear}
        </button>
      </div>

      {results.length > 0 && (
        <div className="tool-results">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "21px",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {currentLabels.results}
            </h3>
            <CopyButton text={results.join("\n\n")} label={currentLabels.copyAll} />
          </div>
          {results.map((r, i) => (
            <div key={i}>
              <ResultCard text={r} />
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {r.length} {currentLabels.characters} ·{" "}
                {r.split(/\s+/).filter(Boolean).length} {currentLabels.words}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
