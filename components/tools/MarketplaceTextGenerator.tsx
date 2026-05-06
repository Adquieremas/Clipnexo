"use client";

import { useState } from "react";
import ResultCard from "@/components/tools/ResultCard";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const conditions = {
  es: ["nuevo", "usado", "como nuevo"],
  en: ["new", "used", "like new"],
  pt: ["novo", "usado", "como novo"],
} as const;

const tones = {
  es: ["directo", "amable", "vendedor"],
  en: ["direct", "friendly", "sales"],
  pt: ["direto", "amável", "vendedor"],
} as const;

const copy = {
  es: {
    product: "Producto",
    productPlaceholder: "Ejemplo: iPhone 13 Pro 128GB",
    price: "Precio (opcional)",
    condition: "Estado",
    tone: "Tono",
    generate: "Generar textos",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Tus descripciones aparecerán aquí",
    emptyText: "Escribe el producto que quieres vender para generar 5 descripciones listas para Marketplace.",
    fallback: "el producto",
    texts: [
      "Vendo {product} en estado {condition}. El precio es {price}. Interesados escribir al DM. Solo ofertas serias.",
      "¡Oportunidad! Pongo a la venta mi {product}. Está {condition} y funciona perfecto. Precio: {price}. Entrego en puntos céntricos.",
      "¿Buscas un {product}? Tengo este disponible en estado {condition}. Lo dejo en {price}. Está muy bien cuidado, mira las fotos.",
      "Remato {product} por motivo de viaje. Estado {condition}. Precio {price} (negociable). Escríbeme para más detalles.",
      "Disponible {product} ({condition}). Super precio: {price}. Listo para entregar. Aprovecha que se va rápido.",
    ],
  },
  en: {
    product: "Product",
    productPlaceholder: "Example: iPhone 13 Pro 128GB",
    price: "Price (optional)",
    condition: "Condition",
    tone: "Tone",
    generate: "Generate texts",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    emptyTitle: "Your descriptions will appear here",
    emptyText: "Enter the product you want to sell to generate 5 descriptions ready for Marketplace.",
    fallback: "the product",
    texts: [
      "Selling {product} in {condition} condition. Price is {price}. DM me if interested. Serious offers only.",
      "Great opportunity! I'm selling my {product}. It's {condition} and works perfectly. Price: {price}. Can meet in central locations.",
      "Looking for a {product}? I have this one available in {condition} condition. Selling for {price}. Well-maintained, check the photos.",
      "Selling {product} quickly due to moving. Condition {condition}. Price {price} (negotiable). DM for more details.",
      "Available {product} ({condition}). Great price: {price}. Ready to go. Grab it before it's gone.",
    ],
  },
  pt: {
    product: "Produto",
    productPlaceholder: "Exemplo: iPhone 13 Pro 128GB",
    price: "Preço (opcional)",
    condition: "Estado",
    tone: "Tom",
    generate: "Gerar textos",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    emptyTitle: "Suas descrições aparecerão aqui",
    emptyText: "Digite o produto que deseja vender para gerar 5 descrições prontas para o Marketplace.",
    fallback: "o produto",
    texts: [
      "Vendo {product} em estado {condition}. O preço é {price}. Interessados chamar no DM. Apenas ofertas sérias.",
      "Oportunidade! Vendo meu {product}. Está {condition} e funciona perfeitamente. Preço: {price}. Entrego em locais centrais.",
      "Procurando um {product}? Tenho este disponível em estado {condition}. Faço por {price}. Muito bem cuidado, veja as fotos.",
      "Venda rápida de {product} por motivo de mudança. Estado {condition}. Preço {price} (negociável). Chame para mais detalhes.",
      "Disponível {product} ({condition}). Preço ótimo: {price}. Pronto para entregar. Aproveite que sai rápido.",
    ],
  },
} as const;

export default function MarketplaceTextGenerator({ lang }: Props) {
  const t = copy[lang];
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<string>(conditions[lang][0]);
  const [tone, setTone] = useState<string>(tones[lang][0]);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const p = product || t.fallback;
    const pr = price || (lang === "es" ? "a tratar" : lang === "en" ? "negotiable" : "a combinar");
    
    setResults(t.texts.map((text) => 
      text.replaceAll("{product}", p)
          .replaceAll("{condition}", condition)
          .replaceAll("{price}", pr)
    ));
  };

  const clear = () => {
    setProduct("");
    setPrice("");
    setCondition(conditions[lang][0]);
    setTone(tones[lang][0]);
    setResults([]);
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
          <span>{t.price}</span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="$$$"
          />
        </label>

        <label className="tool-field">
          <span>{t.condition}</span>
          <select value={condition} onChange={(event) => setCondition(event.target.value)}>
            {conditions[lang].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field" style={{ gridColumn: "span 2" }}>
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
      </div>

      {results.length ? (
        <div className="tool-results">
          {results.map((text, index) => (
            <ResultCard key={index} text={text} copyLabel={t.copy} copiedLabel={t.copied} />
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
