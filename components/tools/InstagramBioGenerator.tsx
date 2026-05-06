"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const niches = {
  es: ["Personal", "Negocio", "Creador", "Marca", "Servicios", "Tienda"],
  en: ["Personal", "Business", "Creator", "Brand", "Services", "Store"],
  pt: ["Pessoal", "Negócio", "Criador", "Marca", "Serviços", "Loja"],
} as const;

const tones = {
  es: ["Profesional", "Divertido", "Minimalista", "Inspirador", "Directo"],
  en: ["Professional", "Fun", "Minimalist", "Inspirational", "Direct"],
  pt: ["Profissional", "Divertido", "Minimalista", "Inspirador", "Direto"],
} as const;

const copy = {
  es: {
    brand: "Nombre o marca",
    brandPlaceholder: "Ejemplo: Juan Pérez o Clipnexo",
    niche: "Nicho",
    tone: "Tono",
    includeCta: "Incluir CTA",
    generate: "Generar bios",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus bios aparecerán aquí",
    emptyText: "Escribe tu nombre o marca y elige el tono para generar ideas.",
    yes: "Sí",
    no: "No",
    cta: "👇 ¡Escríbeme!",
    bios: [
      "📍 Basado en {location}\n🚀 Ayudándote con {topic}\n✨ {niche} | {tone}",
      "👋 Hola, soy {brand}\n💡 Compartiendo tips sobre {topic}\n📩 Contacto en el link",
      "✨ {brand} | {niche}\n🌟 Pasión por {topic}\n👇 Mira más aquí",
      "🔥 {topic} Lover\n💎 {niche} en {location}\n⚡️ Sígueme para más",
      "📚 Aprendiendo y enseñando {topic}\n🌈 {tone} Vibes\n✨ Bienvenidos a mi mundo",
      "🛠 Especialista en {topic}\n🎯 Resultados reales\n💼 {niche}",
      "🌍 Amante de {topic}\n📸 Momentos y consejos\n✨ {tone}",
      "✨ {brand}\n🌱 {topic} & {niche}\n🚀 Creciendo juntos",
    ],
  },
  en: {
    brand: "Name or brand",
    brandPlaceholder: "Example: John Doe or Clipnexo",
    niche: "Niche",
    tone: "Tone",
    includeCta: "Include CTA",
    generate: "Generate bios",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your bios will appear here",
    emptyText: "Enter your name or brand and choose options to generate ideas.",
    yes: "Yes",
    no: "No",
    cta: "👇 Let's talk!",
    bios: [
      "📍 Based in {location}\n🚀 Helping you with {topic}\n✨ {niche} | {tone}",
      "👋 Hi, I'm {brand}\n💡 Sharing tips on {topic}\n📩 Contact me below",
      "✨ {brand} | {niche}\n🌟 Passion for {topic}\n👇 See more here",
      "🔥 {topic} Lover\n💎 {niche} in {location}\n⚡️ Follow for more",
      "📚 Learning and teaching {topic}\n🌈 {tone} Vibes\n✨ Welcome to my world",
      "🛠 {topic} Specialist\n🎯 Real results\n💼 {niche}",
      "🌍 {topic} Lover\n📸 Moments and tips\n✨ {tone}",
      "✨ {brand}\n🌱 {topic} & {niche}\n🚀 Growing together",
    ],
  },
  pt: {
    brand: "Nome ou marca",
    brandPlaceholder: "Exemplo: João Silva ou Clipnexo",
    niche: "Nicho",
    tone: "Tom",
    includeCta: "Incluir CTA",
    generate: "Gerar bios",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas bios aparecerão aqui",
    emptyText: "Digite seu nome ou marca e escolha as opções para gerar ideias.",
    yes: "Sim",
    no: "Não",
    cta: "👇 Fale comigo!",
    bios: [
      "📍 Baseado em {location}\n🚀 Ajudando você com {topic}\n✨ {niche} | {tone}",
      "👋 Olá, sou {brand}\n💡 Compartilhando dicas sobre {topic}\n📩 Contato no link",
      "✨ {brand} | {niche}\n🌟 Paixão por {topic}\n👇 Veja mais aqui",
      "🔥 {topic} Lover\n💎 {niche} em {location}\n⚡️ Siga para mais",
      "📚 Aprendendo e ensinando {topic}\n🌈 {tone} Vibes\n✨ Bem-vindos ao meu mundo",
      "🛠 Especialista em {topic}\n🎯 Resultados reais\n💼 {niche}",
      "🌍 Amante de {topic}\n📸 Momentos e dicas\n✨ {tone}",
      "✨ {brand}\n🌱 {topic} & {niche}\n🚀 Crescendo juntos",
    ],
  },
} as const;

export default function InstagramBioGenerator({ lang }: Props) {
  const t = copy[lang];
  const [brand, setBrand] = useState("");
  const [niche, setNiche] = useState<string>(niches[lang][0]);
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [includeCta, setIncludeCta] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const brandName = brand || (lang === "es" ? "Mi Marca" : lang === "en" ? "My Brand" : "Minha Marca");
    const topic = niche;
    const location = lang === "es" ? "España/LATAM" : lang === "en" ? "Worldwide" : "Brasil/Portugal";
    
    setResults(
      t.bios.map((bio) => {
        let text = bio
          .replaceAll("{brand}", brandName)
          .replaceAll("{topic}", topic)
          .replaceAll("{niche}", niche)
          .replaceAll("{tone}", tone)
          .replaceAll("{location}", location);
        
        if (includeCta) {
          text += `\n${t.cta}`;
        }
        return text;
      })
    );
  };

  const clear = () => {
    setBrand("");
    setNiche(niches[lang][0]);
    setTone(tones[lang][0]);
    setIncludeCta(true);
    setResults([]);
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.brand}</span>
          <input
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder={t.brandPlaceholder}
          />
        </label>

        <label className="tool-field">
          <span>{t.niche}</span>
          <select value={niche} onChange={(event) => setNiche(event.target.value)}>
            {niches[lang].map((item) => (
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

        <label className="tool-field">
          <span>{t.includeCta}</span>
          <select
            value={includeCta ? "yes" : "no"}
            onChange={(event) => setIncludeCta(event.target.value === "yes")}
          >
            <option value="yes">{t.yes}</option>
            <option value="no">{t.no}</option>
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
        <div className="tool-results" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {results.map((bio, index) => (
            <ResultCard key={index} text={bio} copyLabel={t.copy} copiedLabel={t.copied} />
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
