"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import { buildHashtags, compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const categories = {
  es: ["Belleza", "Fitness", "Negocios", "Educación", "Tecnología", "Comida", "Viajes", "Moda", "Música", "Marca personal"],
  en: ["Beauty", "Fitness", "Business", "Education", "Technology", "Food", "Travel", "Fashion", "Music", "Personal brand"],
  pt: ["Beleza", "Fitness", "Negócios", "Educação", "Tecnologia", "Comida", "Viagens", "Moda", "Música", "Marca pessoal"],
} as const;

const counts = [10, 15, 20, 30] as const;

const copy = {
  es: {
    topic: "Tema o palabra clave",
    topicPlaceholder: "Ejemplo: maquillaje natural",
    category: "Nicho o categoría",
    count: "Cantidad de hashtags",
    generate: "Generar hashtags",
    clear: "Limpiar",
    copyAll: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Tus hashtags aparecerán aquí",
    emptyText: "Escribe un tema y selecciona cuántas etiquetas necesitas.",
    fallback: "contenido",
    extras: [
      "tiktok",
      "parati",
      "fyp",
      "viral",
      "creadores",
      "videoscortos",
      "contenido",
      "tips",
      "aprende",
      "inspiracion",
      "tendencias",
      "comunidad",
      "tutorial",
      "ideas",
      "creatividad",
      "latam",
      "online",
      "clipnexo",
      "reels",
      "shorts",
      "nuevovideo",
      "crecerentiktok",
      "estrategia",
      "contenidooriginal",
      "publicar",
      "socialmedia",
      "marca",
      "audiencia",
      "engagement",
      "descubre",
    ],
  },
  en: {
    topic: "Topic or keyword",
    topicPlaceholder: "Example: natural makeup",
    category: "Niche or category",
    count: "Number of hashtags",
    generate: "Generate hashtags",
    clear: "Clear",
    copyAll: "Copy all",
    copied: "Copied",
    emptyTitle: "Your hashtags will appear here",
    emptyText: "Enter a topic and choose how many tags you need.",
    fallback: "content",
    extras: [
      "tiktok",
      "fyp",
      "viral",
      "creator",
      "shortvideo",
      "content",
      "tips",
      "learn",
      "inspiration",
      "trends",
      "community",
      "tutorial",
      "ideas",
      "creativity",
      "socialmedia",
      "reels",
      "shorts",
      "newvideo",
      "growontiktok",
      "strategy",
      "originalcontent",
      "posting",
      "brand",
      "audience",
      "engagement",
      "discover",
      "contentcreator",
      "smallbusiness",
      "dailycontent",
      "online",
    ],
  },
  pt: {
    topic: "Tema ou palavra-chave",
    topicPlaceholder: "Exemplo: maquiagem natural",
    category: "Nicho ou categoria",
    count: "Quantidade de hashtags",
    generate: "Gerar hashtags",
    clear: "Limpar",
    copyAll: "Copiar todos",
    copied: "Copiado",
    emptyTitle: "Suas hashtags aparecerão aqui",
    emptyText: "Digite um tema e escolha quantas etiquetas precisa.",
    fallback: "conteudo",
    extras: [
      "tiktok",
      "paravoce",
      "fyp",
      "viral",
      "criadores",
      "videoscurtos",
      "conteudo",
      "dicas",
      "aprenda",
      "inspiracao",
      "tendencias",
      "comunidade",
      "tutorial",
      "ideias",
      "criatividade",
      "online",
      "clipnexo",
      "reels",
      "shorts",
      "novovideo",
      "crescernotiktok",
      "estrategia",
      "conteudooriginal",
      "publicar",
      "socialmedia",
      "marca",
      "audiencia",
      "engajamento",
      "descubra",
      "criacaodeconteudo",
    ],
  },
} as const;

export default function TikTokHashtagGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState<string>(categories[lang][0]);
  const [count, setCount] = useState<number>(15);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const cleanTopic = compactTopic(topic, t.fallback);
    setResults(buildHashtags(cleanTopic, category, count, [...t.extras]));
  };

  const clear = () => {
    setTopic("");
    setCategory(categories[lang][0]);
    setCount(15);
    setResults([]);
  };

  const allText = results.join(" ");

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
          <span>{t.category}</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field">
          <span>{t.count}</span>
          <select value={count} onChange={(event) => setCount(Number(event.target.value))}>
            {counts.map((item) => (
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
        <CopyButton text={allText} label={t.copyAll} copiedLabel={t.copied} disabled={!results.length} />
        <button type="button" className="tool-button-secondary" onClick={clear}>
          {t.clear}
        </button>
      </div>

      {results.length ? (
        <div className="hashtag-list">
          {results.map((hashtag) => (
            <span key={hashtag}>{hashtag}</span>
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
