"use client";

import { useState } from "react";
import CopyButton from "@/components/tools/CopyButton";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const platforms = ["TikTok", "Reels", "Shorts", "General"];
const durations = ["15s", "30s", "60s"];

const styles = {
  es: ["educativo", "viral", "venta", "historia", "tutorial"],
  en: ["educational", "viral", "sales", "story", "tutorial"],
  pt: ["educativo", "viral", "venda", "história", "tutorial"],
} as const;

const copy = {
  es: {
    topic: "Tema del video",
    topicPlaceholder: "Ejemplo: cómo hacer café frío",
    platform: "Plataforma",
    duration: "Duración",
    style: "Estilo",
    generate: "Generar guion",
    clear: "Limpiar",
    copy: "Copiar guion completo",
    copied: "Copiado",
    emptyTitle: "Tu guion aparecerá aquí",
    emptyText: "Escribe el tema de tu video para generar un guion completo con gancho y CTA.",
    hook: "Gancho (Hook)",
    body: "Desarrollo",
    closing: "Cierre",
    cta: "Llamada a la acción",
    caption: "Caption sugerido",
    hashtags: "Hashtags",
    data: {
      hook: "¡Atención! ¿Sabías esto sobre {topic}? Quédate que te explico.",
      body: "Para dominar {topic}, necesitas enfocarte en tres puntos clave. Primero, la base; segundo, la técnica; y finalmente, la consistencia. Si aplicas esto, verás resultados increíbles.",
      closing: "Así de fácil es mejorar en {topic} si sigues estos pasos.",
      cta: "Sígueme para más tips sobre {topic}.",
      caption: "Aprende a dominar {topic} en segundos. 🚀 #ShortVideo #Tips",
      hashtags: "#{topic} #Tutorial #Creadores #Viral"
    }
  },
  en: {
    topic: "Video topic",
    topicPlaceholder: "Example: how to make cold brew",
    platform: "Platform",
    duration: "Duration",
    style: "Style",
    generate: "Generate script",
    clear: "Clear",
    copy: "Copy full script",
    copied: "Copied",
    emptyTitle: "Your script will appear here",
    emptyText: "Enter your video topic to generate a full script with hook and CTA.",
    hook: "Hook",
    body: "Body",
    closing: "Closing",
    cta: "Call to Action",
    caption: "Suggested Caption",
    hashtags: "Hashtags",
    data: {
      hook: "Wait! Did you know this about {topic}? Stick around and I'll explain.",
      body: "To master {topic}, you need to focus on three key points. First, the foundation; second, the technique; and finally, consistency. If you apply this, you'll see incredible results.",
      closing: "That's how easy it is to get better at {topic} if you follow these steps.",
      cta: "Follow me for more {topic} tips.",
      caption: "Learn how to master {topic} in seconds. 🚀 #ShortVideo #Tips",
      hashtags: "#{topic} #Tutorial #Creators #Viral"
    }
  },
  pt: {
    topic: "Tema do vídeo",
    topicPlaceholder: "Exemplo: como fazer café gelado",
    platform: "Plataforma",
    duration: "Duração",
    style: "Estilo",
    generate: "Gerar roteiro",
    clear: "Limpar",
    copy: "Copiar roteiro completo",
    copied: "Copiado",
    emptyTitle: "Seu roteiro aparecerá aqui",
    emptyText: "Digite o tema do seu vídeo para gerar um roteiro completo com gancho e CTA.",
    hook: "Gancho (Hook)",
    body: "Desenvolvimento",
    closing: "Fechamento",
    cta: "Chamada para ação",
    caption: "Legenda sugerida",
    hashtags: "Hashtags",
    data: {
      hook: "Atenção! Você sabia disso sobre {topic}? Fica aqui que eu te explico.",
      body: "Para dominar {topic}, você precisa focar em três pontos-chave. Primeiro, a base; segundo, a técnica; e finalmente, a consistência. Se você aplicar isso, verá resultados incríveis.",
      closing: "É assim tão fácil melhorar em {topic} se você seguir estes passos.",
      cta: "Me siga para mais dicas sobre {topic}.",
      caption: "Aprenda a dominar {topic} em segundos. 🚀 #ShortVideo #Dicas",
      hashtags: "#{topic} #Tutorial #Criadores #Viral"
    }
  },
} as const;

export default function ShortVideoScriptGenerator({ lang }: Props) {
  const t = copy[lang];
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState(platforms[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [style, setStyle] = useState<string>(styles[lang][0]);
  const [result, setResult] = useState<any>(null);

  const generate = () => {
    const p = topic || (lang === "es" ? "tu tema" : lang === "en" ? "your topic" : "seu tema");
    setResult({
      hook: t.data.hook.replaceAll("{topic}", p),
      body: t.data.body.replaceAll("{topic}", p),
      closing: t.data.closing.replaceAll("{topic}", p),
      cta: t.data.cta.replaceAll("{topic}", p),
      caption: t.data.caption.replaceAll("{topic}", p),
      hashtags: t.data.hashtags.replaceAll("{topic}", p.replace(/\s/g, "")),
    });
  };

  const clear = () => {
    setTopic("");
    setPlatform(platforms[0]);
    setDuration(durations[0]);
    setStyle(styles[lang][0]);
    setResult(null);
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

        <label className="tool-field">
          <span>{t.platform}</span>
          <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field">
          <span>{t.duration}</span>
          <select value={duration} onChange={(event) => setDuration(event.target.value)}>
            {durations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.style}</span>
          <select value={style} onChange={(event) => setStyle(event.target.value)}>
            {styles[lang].map((item) => (
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

      {result ? (
        <div className="tool-results" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #eee" }}>
             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>{t.copy.split(" ")[1]}</h3>
                <CopyButton 
                  text={`${t.hook}: ${result.hook}\n\n${t.body}: ${result.body}\n\n${t.closing}: ${result.closing}\n\n${t.cta}: ${result.cta}\n\n${t.caption}: ${result.caption}\n\n${t.hashtags}: ${result.hashtags}`}
                  label={t.copy}
                  copiedLabel={t.copied} 
                />
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                   <strong style={{ color: "#2563eb", fontSize: "14px", textTransform: "uppercase" }}>{t.hook}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "16px", fontWeight: 600 }}>{result.hook}</p>
                </div>
                <div>
                   <strong style={{ color: "#666", fontSize: "14px", textTransform: "uppercase" }}>{t.body}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "16px" }}>{result.body}</p>
                </div>
                <div>
                   <strong style={{ color: "#666", fontSize: "14px", textTransform: "uppercase" }}>{t.closing}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "16px" }}>{result.closing}</p>
                </div>
                <div>
                   <strong style={{ color: "#059669", fontSize: "14px", textTransform: "uppercase" }}>{t.cta}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "16px", fontWeight: 600 }}>{result.cta}</p>
                </div>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "8px 0" }} />
                <div>
                   <strong style={{ color: "#666", fontSize: "14px", textTransform: "uppercase" }}>{t.caption}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "15px", fontStyle: "italic" }}>{result.caption}</p>
                </div>
                <div>
                   <strong style={{ color: "#666", fontSize: "14px", textTransform: "uppercase" }}>{t.hashtags}</strong>
                   <p style={{ margin: "4px 0 0", fontSize: "15px", color: "#2563eb" }}>{result.hashtags}</p>
                </div>
             </div>
          </div>
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
