"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import ResultCard from "@/components/tools/ResultCard";
import { buildHashtags, compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const platforms = {
  es: ["TikTok", "Reels", "Shorts", "General"],
  en: ["TikTok", "Reels", "Shorts", "General"],
  pt: ["TikTok", "Reels", "Shorts", "Geral"],
} as const;

const tones = {
  es: ["viral", "educativo", "vendedor", "curioso", "tutorial"],
  en: ["viral", "educational", "sales", "curious", "tutorial"],
  pt: ["viral", "educativo", "vendedor", "curioso", "tutorial"],
} as const;

const copy = {
  es: {
    topic: "Tema del video",
    topicPlaceholder: "Ejemplo: rutina para editar más rápido",
    platform: "Plataforma",
    tone: "Tono",
    generate: "Generar títulos y hashtags",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    copyTitles: "Copiar títulos",
    copyHashtags: "Copiar hashtags",
    copyAll: "Copiar todo",
    titlesHeading: "Títulos",
    hashtagsHeading: "Hashtags",
    emptyTitle: "Tus títulos y hashtags aparecerán aquí",
    emptyText: "Escribe un tema, elige plataforma y genera ideas listas para copiar.",
    fallback: "tu video",
    hashtagExtras: [
      "tiktok",
      "reels",
      "shorts",
      "videoscortos",
      "parati",
      "fyp",
      "viral",
      "contenido",
      "creadores",
      "tips",
      "tutorial",
      "ideas",
      "socialmedia",
      "creatividad",
      "clipnexo",
      "publicar",
      "audiencia",
      "engagement",
      "tendencias",
      "nuevovideo",
    ],
    titles: [
      "La forma más simple de entender {topic}",
      "Esto cambió mis resultados con {topic}",
      "No hagas {topic} sin ver esto",
      "Guía rápida para mejorar {topic}",
      "Tres ideas para avanzar con {topic}",
      "El error que frena {topic}",
      "Cómo empezar con {topic} desde cero",
      "Lo que aprendí sobre {topic}",
      "Un tip rápido para dominar {topic}",
      "Antes de probar {topic}, mira esto",
    ],
  },
  en: {
    topic: "Video topic",
    topicPlaceholder: "Example: routine to edit faster",
    platform: "Platform",
    tone: "Tone",
    generate: "Generate titles and hashtags",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    copyTitles: "Copy titles",
    copyHashtags: "Copy hashtags",
    copyAll: "Copy all",
    titlesHeading: "Titles",
    hashtagsHeading: "Hashtags",
    emptyTitle: "Your titles and hashtags will appear here",
    emptyText: "Enter a topic, choose a platform and generate ideas ready to copy.",
    fallback: "your video",
    hashtagExtras: [
      "tiktok",
      "reels",
      "shorts",
      "shortvideo",
      "fyp",
      "viral",
      "content",
      "creator",
      "tips",
      "tutorial",
      "ideas",
      "socialmedia",
      "creativity",
      "clipnexo",
      "posting",
      "audience",
      "engagement",
      "trends",
      "newvideo",
      "contentcreator",
    ],
    titles: [
      "The simplest way to understand {topic}",
      "This changed my results with {topic}",
      "Do not try {topic} before watching this",
      "Quick guide to improve {topic}",
      "Three ideas to make progress with {topic}",
      "The mistake that slows down {topic}",
      "How to start {topic} from scratch",
      "What I learned about {topic}",
      "A quick tip to master {topic}",
      "Before trying {topic}, watch this",
    ],
  },
  pt: {
    topic: "Tema do vídeo",
    topicPlaceholder: "Exemplo: rotina para editar mais rápido",
    platform: "Plataforma",
    tone: "Tom",
    generate: "Gerar títulos e hashtags",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    copyTitles: "Copiar títulos",
    copyHashtags: "Copiar hashtags",
    copyAll: "Copiar tudo",
    titlesHeading: "Títulos",
    hashtagsHeading: "Hashtags",
    emptyTitle: "Seus títulos e hashtags aparecerão aqui",
    emptyText: "Digite um tema, escolha a plataforma e gere ideias prontas para copiar.",
    fallback: "seu vídeo",
    hashtagExtras: [
      "tiktok",
      "reels",
      "shorts",
      "videoscurtos",
      "paravoce",
      "fyp",
      "viral",
      "conteudo",
      "criadores",
      "dicas",
      "tutorial",
      "ideias",
      "socialmedia",
      "criatividade",
      "clipnexo",
      "publicar",
      "audiencia",
      "engajamento",
      "tendencias",
      "novovideo",
    ],
    titles: [
      "A forma mais simples de entender {topic}",
      "Isso mudou meus resultados com {topic}",
      "Não faça {topic} sem ver isto",
      "Guia rápido para melhorar {topic}",
      "Três ideias para avançar com {topic}",
      "O erro que atrapalha {topic}",
      "Como começar {topic} do zero",
      "O que aprendi sobre {topic}",
      "Uma dica rápida para dominar {topic}",
      "Antes de tentar {topic}, veja isto",
    ],
  },
} as const;

export default function ShortVideoTitleHashtagGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<string>(platforms[lang][0]);
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [titles, setTitles] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    setTitles(t.titles.map((title) => `${title.replaceAll("{topic}", cleanTopic)} (${tone})`));
    setHashtags(buildHashtags(cleanTopic, platform, 20, [...t.hashtagExtras]));
  };

  const clear = () => {
    setTopic("");
    setPlatform(platforms[lang][0]);
    setTone(tones[lang][0]);
    setTitles([]);
    setHashtags([]);
  };

  const titleText = titles.join("\n");
  const hashtagText = hashtags.join(" ");
  const allText = `${t.titlesHeading}\n${titleText}\n\n${t.hashtagsHeading}\n${hashtagText}`;

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.topic}</span>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder={t.topicPlaceholder}
          />
        </label>

        <label className="tool-field">
          <span>{t.platform}</span>
          <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
            {platforms[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
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
      </div>

      <div className="tool-actions">
        <button type="button" className="tool-button" onClick={generate}>
          {t.generate}
        </button>
        <CopyButton text={titleText} label={t.copyTitles} copiedLabel={t.copied} disabled={!titles.length} />
        <CopyButton text={hashtagText} label={t.copyHashtags} copiedLabel={t.copied} disabled={!hashtags.length} />
        <CopyButton text={allText} label={t.copyAll} copiedLabel={t.copied} disabled={!titles.length} />
        <button type="button" className="tool-button-secondary" onClick={clear}>
          {t.clear}
        </button>
      </div>

      {titles.length ? (
        <div className="tool-combined-results">
          <section>
            <h3>{t.titlesHeading}</h3>
            <div className="tool-results">
              {titles.map((title) => (
                <ResultCard key={title} text={title} copyLabel={t.copy} copiedLabel={t.copied} />
              ))}
            </div>
          </section>

          <section>
            <h3>{t.hashtagsHeading}</h3>
            <div className="hashtag-list">
              {hashtags.map((hashtag) => (
                <span key={hashtag}>{hashtag}</span>
              ))}
            </div>
          </section>
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
