"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import ResultCard from "@/components/tools/ResultCard";
import { compactTopic } from "@/components/tools/tool-helpers";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const categories = {
  es: [
    "Belleza",
    "Fitness",
    "Negocios",
    "Educación",
    "Tecnología",
    "Comida",
    "Viajes",
    "Moda",
    "Música",
    "Marca personal",
  ],
  en: [
    "Beauty",
    "Fitness",
    "Business",
    "Education",
    "Technology",
    "Food",
    "Travel",
    "Fashion",
    "Music",
    "Personal brand",
  ],
  pt: [
    "Beleza",
    "Fitness",
    "Negócios",
    "Educação",
    "Tecnologia",
    "Comida",
    "Viagens",
    "Moda",
    "Música",
    "Marca pessoal",
  ],
} as const;

const tones = {
  es: ["profesional", "divertido", "minimalista", "vendedor", "creativo"],
  en: ["professional", "fun", "minimal", "sales", "creative"],
  pt: ["profissional", "divertido", "minimalista", "vendedor", "criativo"],
} as const;

const copy = {
  es: {
    keyword: "Nombre o palabra clave",
    keywordPlaceholder: "Ejemplo: Ana Fit, recetas fáciles",
    category: "Nicho o categoría",
    tone: "Tono",
    generate: "Generar bios",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    copyAll: "Copiar todo",
    emptyTitle: "Tus bios aparecerán aquí",
    emptyText: "Completa los campos y genera opciones cortas para tu perfil.",
    fallback: "tu contenido",
    connector: "en",
    bios: [
      "{topic} | Ideas simples de {category}",
      "{topic}: creando valor {tone}",
      "{category} claro, útil y directo",
      "Contenido de {category} para crecer mejor",
      "{topic} en modo {tone}",
      "Aprende {category} sin complicarte",
      "Tips rápidos de {category} cada semana",
      "{topic} para mentes curiosas",
      "Tu dosis diaria de {category}",
      "Creo contenido {tone} sobre {category}",
      "{topic}: simple, útil y real",
      "Más ideas de {category}, menos ruido",
    ],
  },
  en: {
    keyword: "Name or keyword",
    keywordPlaceholder: "Example: Ana Fit, easy recipes",
    category: "Niche or category",
    tone: "Tone",
    generate: "Generate bios",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    copyAll: "Copy all",
    emptyTitle: "Your bios will appear here",
    emptyText: "Fill in the fields and generate short options for your profile.",
    fallback: "your content",
    connector: "in",
    bios: [
      "{topic} | Simple {category} ideas",
      "{topic}: creating {tone} value",
      "Clear, useful {category} content",
      "{category} tips to grow smarter",
      "{topic} in a {tone} style",
      "Learn {category} without the noise",
      "Quick {category} tips every week",
      "{topic} for curious minds",
      "Your daily dose of {category}",
      "{tone} content about {category}",
      "{topic}: simple, useful and real",
      "More {category} ideas, less noise",
    ],
  },
  pt: {
    keyword: "Nome ou palavra-chave",
    keywordPlaceholder: "Exemplo: Ana Fit, receitas fáceis",
    category: "Nicho ou categoria",
    tone: "Tom",
    generate: "Gerar bios",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    copyAll: "Copiar tudo",
    emptyTitle: "Suas bios aparecerão aqui",
    emptyText: "Preencha os campos e gere opções curtas para seu perfil.",
    fallback: "seu conteúdo",
    connector: "em",
    bios: [
      "{topic} | Ideias simples de {category}",
      "{topic}: criando valor {tone}",
      "{category} claro, útil e direto",
      "Conteúdo de {category} para crescer melhor",
      "{topic} em modo {tone}",
      "Aprenda {category} sem complicação",
      "Dicas rápidas de {category} toda semana",
      "{topic} para mentes curiosas",
      "Sua dose diária de {category}",
      "Conteúdo {tone} sobre {category}",
      "{topic}: simples, útil e real",
      "Mais ideias de {category}, menos ruído",
    ],
  },
} as const;

export default function TikTokBioGenerator({ lang }: Props) {
  const t = copy[lang];
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string>(categories[lang][0]);
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const topic = compactTopic(keyword, t.fallback);
    const nextResults = t.bios.map((template) =>
      template
        .replaceAll("{topic}", topic)
        .replaceAll("{category}", category.toLowerCase())
        .replaceAll("{tone}", tone)
    );

    setResults(nextResults);
  };

  const clear = () => {
    setKeyword("");
    setCategory(categories[lang][0]);
    setTone(tones[lang][0]);
    setResults([]);
  };

  const allText = results.join("\n");

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.keyword}</span>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={t.keywordPlaceholder}
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
        <button type="button" className="tool-button-secondary" onClick={clear}>
          {t.clear}
        </button>
        <CopyButton text={allText} label={t.copyAll} copiedLabel={t.copied} disabled={!results.length} />
      </div>

      {results.length ? (
        <div className="tool-results">
          {results.map((bio) => (
            <ResultCard key={bio} text={bio} copyLabel={t.copy} copiedLabel={t.copied} />
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
