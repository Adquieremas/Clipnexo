"use client";

import { useState, useCallback } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type PlatformKey = "tiktok" | "instagram" | "youtube" | "facebook" | "linkedin";
type DurationKey = "3" | "7" | "14" | "30";

type CalendarEntry = {
  day: number;
  topic: string;
  format: string;
  hook: string;
  cta: string;
};

const strings = {
  es: {
    nicheLabel: "Nicho o tema",
    nichePlaceholder: "Ej: fitness, cocina, tecnología, viajes...",
    platformLabel: "Plataforma",
    durationLabel: "Duración",
    threeDays: "3 días",
    sevenDays: "7 días",
    fourteenDays: "14 días",
    thirtyDays: "30 días",
    generate: "Generar calendario",
    copy: "Copiar calendario",
    download: "Descargar TXT",
    clear: "Limpiar",
    day: "Día",
    topic: "Tema",
    format: "Formato",
    hook: "Gancho",
    cta: "CTA",
    video: "Video",
    image: "Imagen",
    carousel: "Carrusel",
    text: "Texto",
    noData: "Ingresa un nicho/tema y haz clic en Generar calendario.",
    copied: "Calendario copiado",
    downloaded: "Calendario descargado",
    privacy: "La generación se realiza en tu navegador. No se guardan datos.",
  },
  en: {
    nicheLabel: "Niche or topic",
    nichePlaceholder: "e.g. fitness, cooking, tech, travel...",
    platformLabel: "Platform",
    durationLabel: "Duration",
    threeDays: "3 days",
    sevenDays: "7 days",
    fourteenDays: "14 days",
    thirtyDays: "30 days",
    generate: "Generate calendar",
    copy: "Copy calendar",
    download: "Download TXT",
    clear: "Clear",
    day: "Day",
    topic: "Topic",
    format: "Format",
    hook: "Hook",
    cta: "CTA",
    video: "Video",
    image: "Image",
    carousel: "Carousel",
    text: "Text",
    noData: "Enter a niche/topic and click Generate calendar.",
    copied: "Calendar copied",
    downloaded: "Calendar downloaded",
    privacy: "Generation is done in your browser. No data is stored.",
  },
  pt: {
    nicheLabel: "Nicho ou tema",
    nichePlaceholder: "Ex: fitness, culinária, tecnologia, viagens...",
    platformLabel: "Plataforma",
    durationLabel: "Duração",
    threeDays: "3 dias",
    sevenDays: "7 dias",
    fourteenDays: "14 dias",
    thirtyDays: "30 dias",
    generate: "Gerar calendário",
    copy: "Copiar calendário",
    download: "Baixar TXT",
    clear: "Limpar",
    day: "Dia",
    topic: "Tema",
    format: "Formato",
    hook: "Gancho",
    cta: "CTA",
    video: "Vídeo",
    image: "Imagem",
    carousel: "Carrossel",
    text: "Texto",
    noData: "Insira um nicho/tema e clique em Gerar calendário.",
    copied: "Calendário copiado",
    downloaded: "Calendário baixado",
    privacy: "A geração é feita no seu navegador. Nenhum dado é armazenado.",
  },
};

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const TOPIC_PATTERNS = [
  "Cómo empezar con {niche}",
  "Errores comunes en {niche}",
  "Top 5 consejos de {niche}",
  "Guía para principiantes de {niche}",
  "Tendencias de {niche} en 2025",
  "Herramientas esenciales para {niche}",
  "Tutorial rápido de {niche}",
  "Los secretos de {niche} que nadie cuenta",
  "Comparativa: mejores opciones en {niche}",
  "Preguntas frecuentes sobre {niche}",
  "Rutina diaria de un experto en {niche}",
  "Lo que desearía saber antes de empezar en {niche}",
  "Mitos vs realidad en {niche}",
  "Productos imprescindibles para {niche}",
  "Historias de éxito en {niche}",
  "El futuro de {niche}",
  "Cómo monetizar {niche}",
  "Datos curiosos sobre {niche}",
  "Entrevista con un profesional de {niche}",
  "Recursos gratuitos para aprender {niche}",
];

const EN_TOPIC_PATTERNS = [
  "How to start with {niche}",
  "Common mistakes in {niche}",
  "Top 5 tips for {niche}",
  "Beginners guide to {niche}",
  "2025 trends in {niche}",
  "Essential tools for {niche}",
  "Quick tutorial: {niche}",
  "Secrets of {niche} nobody tells you",
  "Comparison: best options in {niche}",
  "FAQ about {niche}",
  "Daily routine of a {niche} expert",
  "What I wish I knew before starting {niche}",
  "Myths vs reality in {niche}",
  "Must-have products for {niche}",
  "Success stories in {niche}",
  "The future of {niche}",
  "How to monetize {niche}",
  "Fun facts about {niche}",
  "Interview with a {niche} professional",
  "Free resources to learn {niche}",
];

const PT_TOPIC_PATTERNS = [
  "Como começar com {niche}",
  "Erros comuns em {niche}",
  "Top 5 dicas de {niche}",
  "Guia para iniciantes em {niche}",
  "Tendências de {niche} em 2025",
  "Ferramentas essenciais para {niche}",
  "Tutorial rápido de {niche}",
  "Segredos de {niche} que ninguém conta",
  "Comparativo: melhores opções em {niche}",
  "Perguntas frequentes sobre {niche}",
  "Rotina diária de um especialista em {niche}",
  "O que eu gostaria de saber antes de começar em {niche}",
  "Mitos vs realidade em {niche}",
  "Produtos indispensáveis para {niche}",
  "Histórias de sucesso em {niche}",
  "O futuro de {niche}",
  "Como monetizar {niche}",
  "Curiosidades sobre {niche}",
  "Entrevista com um profissional de {niche}",
  "Recursos gratuitos para aprender {niche}",
];

const HOOKS = {
  es: [
    "¿Sabías que...?",
    "El error que todos cometen...",
    "Esto cambia todo...",
    "No creerás lo que pasó...",
    "El truco que necesitas...",
    "Para y mira esto...",
    "Increíble pero cierto...",
    "Lo que nadie te dice sobre...",
    "Antes de que sea tarde...",
    "Te apuesto que no sabías...",
  ],
  en: [
    "Did you know...?",
    "The mistake everyone makes...",
    "This changes everything...",
    "You won't believe what happened...",
    "The trick you need...",
    "Stop and watch this...",
    "Unbelievable but true...",
    "What nobody tells you about...",
    "Before it's too late...",
    "I bet you didn't know...",
  ],
  pt: [
    "Você sabia que...?",
    "O erro que todo mundo comete...",
    "Isso muda tudo...",
    "Você não vai acreditar...",
    "O truque que você precisa...",
    "Pare e veja isso...",
    "Incrível mas verdade...",
    "O que ninguém te conta sobre...",
    "Antes que seja tarde...",
    "Aposto que você não sabia...",
  ],
};

const CTAS = {
  es: [
    "Guarda este video para después",
    "Sígueme para más contenido",
    "Comparte con alguien que lo necesite",
    "Comenta qué opinas",
    "Dale like si te sirvió",
    "Suscríbete para más tips",
    "Cuéntame tu experiencia",
    "Guarda y aplica estos consejos",
    "Etiqueta a un amigo",
    "Activa la campanita",
  ],
  en: [
    "Save this video for later",
    "Follow me for more content",
    "Share with someone who needs it",
    "Comment your thoughts",
    "Like if this helped you",
    "Subscribe for more tips",
    "Tell me your experience",
    "Save and apply these tips",
    "Tag a friend",
    "Turn on notifications",
  ],
  pt: [
    "Salve este vídeo para depois",
    "Siga-me para mais conteúdo",
    "Compartilhe com quem precisa",
    "Comente o que achou",
    "Curta se te ajudou",
    "Inscreva-se para mais dicas",
    "Conte sua experiência",
    "Salve e aplique essas dicas",
    "Marque um amigo",
    "Ative as notificações",
  ],
};

const FORMATS = {
  es: ["Video", "Imagen", "Carrusel", "Texto"],
  en: ["Video", "Image", "Carousel", "Text"],
  pt: ["Vídeo", "Imagem", "Carrossel", "Texto"],
};

export default function ContentCalendarGenerator({ lang }: Props) {
  const t = strings[lang];

  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState<PlatformKey>("tiktok");
  const [duration, setDuration] = useState<DurationKey>("7");
  const [calendar, setCalendar] = useState<CalendarEntry[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const getTopicPatterns = useCallback((): string[] => {
    if (lang === "en") return EN_TOPIC_PATTERNS;
    if (lang === "pt") return PT_TOPIC_PATTERNS;
    return TOPIC_PATTERNS;
  }, [lang]);

  const generateCalendar = useCallback(() => {
    setFeedback(null);
    if (!niche.trim()) {
      showFeedback(t.noData);
      return;
    }

    const days = parseInt(duration, 10);
    const topicPatterns = getTopicPatterns();
    const hooks = HOOKS[lang];
    const ctas = CTAS[lang];

    const usedPatterns = new Set<number>();
    const entries: CalendarEntry[] = [];

    for (let d = 1; d <= days; d++) {
      let idx: number;
      do {
        idx = randomInt(topicPatterns.length);
      } while (usedPatterns.has(idx) && usedPatterns.size < topicPatterns.length);
      usedPatterns.add(idx);
      if (usedPatterns.size >= topicPatterns.length) usedPatterns.clear();

      entries.push({
        day: d,
        topic: topicPatterns[idx].replace("{niche}", niche.trim()),
        format: FORMATS[lang][d % FORMATS[lang].length],
        hook: hooks[randomInt(hooks.length)],
        cta: ctas[randomInt(ctas.length)],
      });
    }

    setCalendar(entries);
  }, [niche, duration, lang, showFeedback, t, getTopicPatterns]);

  const clearAll = useCallback(() => {
    setNiche("");
    setPlatform("tiktok");
    setDuration("7");
    setCalendar([]);
    setFeedback(null);
  }, []);

  const handleCopy = useCallback(async () => {
    if (calendar.length === 0) {
      showFeedback(t.noData);
      return;
    }
    const text = calendar
      .map(
        (e) =>
          `${t.day} ${e.day}: ${e.topic}\n  ${t.format}: ${e.format}\n  ${t.hook}: ${e.hook}\n  ${t.cta}: ${e.cta}`
      )
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noData);
    }
  }, [calendar, showFeedback, t]);

  const handleDownload = useCallback(() => {
    if (calendar.length === 0) {
      showFeedback(t.noData);
      return;
    }
    const text = calendar
      .map(
        (e) =>
          `${t.day} ${e.day}: ${e.topic}\n  ${t.format}: ${e.format}\n  ${t.hook}: ${e.hook}\n  ${t.cta}: ${e.cta}`
      )
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clipnexo-calendario-contenido.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [calendar, showFeedback, t]);

  const platformOptions: { key: PlatformKey; label: string }[] = [
    { key: "tiktok", label: "TikTok" },
    { key: "instagram", label: "Instagram" },
    { key: "youtube", label: "YouTube" },
    { key: "facebook", label: "Facebook" },
    { key: "linkedin", label: "LinkedIn" },
  ];

  const durationOptions: { key: DurationKey; label: string }[] = [
    { key: "3", label: t.threeDays },
    { key: "7", label: t.sevenDays },
    { key: "14", label: t.fourteenDays },
    { key: "30", label: t.thirtyDays },
  ];

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Niche input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.nicheLabel}
          </label>
          <textarea
            aria-label={t.nicheLabel}
            placeholder={t.nichePlaceholder}
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            style={{
              width: "100%",
              minHeight: "70px",
              padding: "14px 16px",
              fontSize: "15px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.6",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Platform & duration */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 180px", minWidth: "180px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.platformLabel}
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformKey)}
              aria-label={t.platformLabel}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                width: "100%",
              }}
            >
              {platformOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 180px", minWidth: "180px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.durationLabel}
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value as DurationKey)}
              aria-label={t.durationLabel}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                width: "100%",
              }}
            >
              {durationOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={generateCalendar}
            style={{
              minHeight: "44px",
              flex: "1 0 auto",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #4f46e5, #ec4899)",
              color: "#ffffff",
              borderRadius: "10px",
              border: "none",
              fontWeight: 800,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 10px 18px rgba(79, 70, 229, 0.22)",
            }}
          >
            {t.generate}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleCopy}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "200px" }}
          >
            {t.copy}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleDownload}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "200px" }}
          >
            {t.download}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={clearAll}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
          >
            {t.clear}
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback === t.copied || feedback === t.downloaded ? "#f0fdf4" : "#fef2f2",
              color: feedback === t.copied || feedback === t.downloaded ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Calendar output */}
        {calendar.length > 0 && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <div style={{ overflowX: "auto", maxHeight: "600px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", position: "sticky", top: 0, backgroundColor: "#f9f9f9" }}>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "#374151", fontWeight: 600, width: "60px" }}>
                      {t.day}
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "180px" }}>
                      {t.topic}
                    </th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "#374151", fontWeight: 600, width: "100px" }}>
                      {t.format}
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "150px" }}>
                      {t.hook}
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600, minWidth: "150px" }}>
                      {t.cta}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((entry) => (
                    <tr key={entry.day} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, color: "#4f46e5", fontSize: "15px" }}>
                        {entry.day}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#111", fontWeight: 500 }}>
                        {entry.topic}
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor:
                              entry.format === FORMATS[lang][0]
                                ? "#eef2ff"
                                : entry.format === FORMATS[lang][1]
                                ? "#f0fdf4"
                                : entry.format === FORMATS[lang][2]
                                ? "#fdf2f8"
                                : "#fff7ed",
                            color:
                              entry.format === FORMATS[lang][0]
                                ? "#4f46e5"
                                : entry.format === FORMATS[lang][1]
                                ? "#15803d"
                                : entry.format === FORMATS[lang][2]
                                ? "#db2777"
                                : "#c2410c",
                          }}
                        >
                          {entry.format}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", color: "#374151", fontSize: "13px" }}>
                        {entry.hook}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#374151", fontSize: "13px" }}>
                        {entry.cta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Privacy notice */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            fontSize: "13px",
            color: "#92400e",
            lineHeight: "1.5",
          }}
        >
          {t.privacy}
        </div>
      </div>
    </div>
  );
}
