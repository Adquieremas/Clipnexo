"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const objectives = {
  es: ["Ventas", "Leads", "Tráfico", "Mensajes", "Promoción"],
  en: ["Sales", "Leads", "Traffic", "Messages", "Promotion"],
  pt: ["Vendas", "Leads", "Tráfego", "Mensagens", "Promoção"],
} as const;

const copy = {
  es: {
    product: "Producto o servicio",
    productPlaceholder: "Ejemplo: curso de diseño web",
    audience: "Público objetivo (opcional)",
    audiencePlaceholder: "Ejemplo: emprendedores jóvenes",
    objective: "Objetivo",
    generate: "Generar anuncios",
    clear: "Limpiar",
    copy: "Copiar sección",
    copied: "Copiado",
    emptyTitle: "Tus anuncios aparecerán aquí",
    emptyText: "Escribe tu producto o servicio para generar 5 variaciones de anuncios.",
    titles: "Títulos atractivos",
    bodies: "Textos principales",
    ctas: "Llamadas a la acción (CTA)",
    data: {
      titles: [
        "Domina {product} hoy mismo",
        "La solución para {product} que buscabas",
        "¿Quieres mejorar en {product}?",
        "Oferta especial en {product}",
        "El secreto de {product} revelado",
      ],
      bodies: [
        "Descubre cómo {product} puede ayudarte a alcanzar tus metas rápidamente. Ideal para {audience}.",
        "Si estás cansado de no ver resultados con {product}, esto es para ti. Únete a miles de personas.",
        "Obtén acceso exclusivo a nuestro método de {product}. Diseñado especialmente para {audience}.",
        "No pierdas la oportunidad de transformar tu negocio con {product}. Calidad garantizada.",
        "¿Buscas expertos en {product}? Estás en el lugar correcto. Mira lo que tenemos para ti.",
      ],
      ctas: [
        "Más información",
        "Registrarme ahora",
        "Comprar ahora",
        "Enviar mensaje",
        "Ver oferta",
      ]
    }
  },
  en: {
    product: "Product or service",
    productPlaceholder: "Example: web design course",
    audience: "Target audience (optional)",
    audiencePlaceholder: "Example: young entrepreneurs",
    objective: "Goal",
    generate: "Generate ads",
    clear: "Clear",
    copy: "Copy section",
    copied: "Copied",
    emptyTitle: "Your ads will appear here",
    emptyText: "Enter your product or service to generate 5 ad variations.",
    titles: "Catchy Titles",
    bodies: "Primary Texts",
    ctas: "Calls to Action (CTA)",
    data: {
      titles: [
        "Master {product} today",
        "The {product} solution you were looking for",
        "Want to improve in {product}?",
        "Special offer on {product}",
        "The secret of {product} revealed",
      ],
      bodies: [
        "Discover how {product} can help you reach your goals quickly. Ideal for {audience}.",
        "If you're tired of not seeing results with {product}, this is for you. Join thousands of people.",
        "Get exclusive access to our {product} method. Specially designed for {audience}.",
        "Don't miss the chance to transform your business with {product}. Guaranteed quality.",
        "Looking for experts in {product}? You're in the right place. See what we have for you.",
      ],
      ctas: [
        "Learn more",
        "Sign up now",
        "Buy now",
        "Send message",
        "See offer",
      ]
    }
  },
  pt: {
    product: "Produto ou serviço",
    productPlaceholder: "Exemplo: curso de web design",
    audience: "Público-alvo (opcional)",
    audiencePlaceholder: "Exemplo: jovens empreendedores",
    objective: "Objetivo",
    generate: "Gerar anúncios",
    clear: "Limpar",
    copy: "Copiar seção",
    copied: "Copiado",
    emptyTitle: "Seus anúncios aparecerão aqui",
    emptyText: "Digite seu produto ou serviço para gerar 5 variações de anúncios.",
    titles: "Títulos atrativos",
    bodies: "Textos principais",
    ctas: "Chamadas para ação (CTA)",
    data: {
      titles: [
        "Domine {product} hoje mesmo",
        "A solução para {product} que você buscava",
        "Quer melhorar em {product}?",
        "Oferta especial em {product}",
        "O segredo de {product} revelado",
      ],
      bodies: [
        "Descubra como {product} pode te ajudar a atingir suas metas rapidamente. Ideal para {audience}.",
        "Se você está cansado de não ver resultados com {product}, isto é para você. Junte-se a milhares de pessoas.",
        "Tenha acesso exclusivo ao nosso método de {product}. Projetado especialmente para {audience}.",
        "Não perca a chance de transformar seu negócio com {product}. Qualidade garantida.",
        "Buscando especialistas em {product}? Você está no lugar certo. Veja o que temos para você.",
      ],
      ctas: [
        "Saiba mais",
        "Cadastre-se agora",
        "Comprar agora",
        "Enviar mensagem",
        "Ver oferta",
      ]
    }
  },
} as const;

export default function FacebookAdGenerator({ lang }: Props) {
  const t = copy[lang];
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [objective, setObjective] = useState<string>(objectives[lang][0]);
  const [results, setResults] = useState<{ titles: string[]; bodies: string[]; ctas: string[] } | null>(null);

  const generate = () => {
    const p = product || (lang === "es" ? "tu producto" : lang === "en" ? "your product" : "seu produto");
    const a = audience || (lang === "es" ? "tu público" : lang === "en" ? "your audience" : "seu público");
    
    setResults({
      titles: t.data.titles.map((title) => title.replaceAll("{product}", p)),
      bodies: t.data.bodies.map((body) => body.replaceAll("{product}", p).replaceAll("{audience}", a)),
      ctas: [...t.data.ctas],
    });
  };

  const clear = () => {
    setProduct("");
    setAudience("");
    setObjective(objectives[lang][0]);
    setResults(null);
  };

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.product}</span>
          <input
            value={product}
            onChange={(event) => setProduct(event.target.value)}
            placeholder={t.productPlaceholder}
          />
        </label>

        <label className="tool-field">
          <span>{t.audience}</span>
          <input
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            placeholder={t.audiencePlaceholder}
          />
        </label>

        <label className="tool-field">
          <span>{t.objective}</span>
          <select value={objective} onChange={(event) => setObjective(event.target.value)}>
            {objectives[lang].map((item) => (
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

      {results ? (
        <div className="tool-results" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[
            { label: t.titles, items: results.titles },
            { label: t.bodies, items: results.bodies },
            { label: t.ctas, items: results.ctas },
          ].map((section, idx) => (
            <div key={idx} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{section.label}</h3>
                <CopyButton text={section.items.join("\n\n")} label={t.copy} copiedLabel={t.copied} />
              </div>
              <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px", fontSize: "15px" }}>
                    {item}
                  </li>
                ))}
              </ul>
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
