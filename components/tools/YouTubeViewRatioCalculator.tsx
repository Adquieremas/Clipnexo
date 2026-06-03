"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy: Record<string, {
  views: string;
  subs: string;
  resultsHeading: string;
  footer: string;
  waiting: string;
  status: { low: string; neutral: string; good: string; high: string };
  description: string;
  goodRange: string;
}> = {
  es: {
    views: "Vistas promedio por video",
    subs: "Total de suscriptores",
    resultsHeading: "Proporción vistas / suscriptores",
    footer: "Mide qué tan activa es tu comunidad en relación a tus suscriptores.",
    waiting: "Esperando datos...",
    status: { low: "Bajo", neutral: "Aceptable", good: "Bueno", high: "Excelente" },
    description: "Una proporción alta indica que tu audiencia es leal y tus videos llegan bien.",
    goodRange: "> 15% es bueno, > 30% es excelente",
  },
  en: {
    views: "Average views per video",
    subs: "Total subscribers",
    resultsHeading: "View-to-sub ratio",
    footer: "Measures how active your community is relative to your subscribers.",
    waiting: "Waiting for data...",
    status: { low: "Low", neutral: "Fair", good: "Good", high: "Excellent" },
    description: "A high ratio means your audience is loyal and your videos reach well.",
    goodRange: "> 15% is good, > 30% is excellent",
  },
  pt: {
    views: "Visualizações médias por vídeo",
    subs: "Total de inscritos",
    resultsHeading: "Proporção visualizações / inscritos",
    footer: "Mede o quão ativa é sua comunidade em relação aos seus inscritos.",
    waiting: "Aguardando dados...",
    status: { low: "Baixo", neutral: "Aceitável", good: "Bom", high: "Excelente" },
    description: "Uma proporção alta indica que sua audiência é leal e seus vídeos alcançam bem.",
    goodRange: "> 15% é bom, > 30% é excelente",
  },
};

function getStatus(ratio: number) {
  if (ratio < 5) return 0;
  if (ratio < 15) return 1;
  if (ratio < 30) return 2;
  return 3;
}

export default function YouTubeViewRatioCalculator({ lang }: Props) {
  const t = copy[lang] || copy.es;
  const [views, setViews] = useState("");
  const [subs, setSubs] = useState("");

  const v = parseFloat(views.replace(/,/g, "")) || 0;
  const s = parseFloat(subs.replace(/,/g, "")) || 0;

  const ratio = s > 0 && v > 0 ? (v / s) * 100 : 0;
  const hasData = s > 0 && v > 0;
  const statusIdx = hasData ? getStatus(ratio) : -1;
  const statusLabels = [t.status.low, t.status.neutral, t.status.good, t.status.high];

  const statusColors = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];
  const barColors = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];
  const barColor = hasData ? barColors[statusIdx] : "#e5e7eb";
  const statusColor = hasData ? statusColors[statusIdx] : "#9ca3af";
  const fillPercent = Math.min((ratio / 50) * 100, 100);

  return (
    <div className="tool-card">
      <div className="tool-grid two">
        <label className="tool-field">
          <span>{t.views}</span>
          <input
            type="text"
            inputMode="numeric"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            placeholder="5,000"
          />
        </label>
        <label className="tool-field">
          <span>{t.subs}</span>
          <input
            type="text"
            inputMode="numeric"
            value={subs}
            onChange={(e) => setSubs(e.target.value)}
            placeholder="50,000"
          />
        </label>
      </div>

      <div
        style={{
          marginTop: 24,
          background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
          borderRadius: 18,
          padding: 32,
          textAlign: "center",
          color: "#ffffff",
          boxShadow: "0 12px 28px rgba(79, 70, 229, 0.25)",
        }}
      >
        <h3
          style={{
            margin: "0 0 4px",
            fontSize: 15,
            fontWeight: 700,
            opacity: 0.85,
            letterSpacing: "0.02em",
          }}
        >
          {t.resultsHeading}
        </h3>

        <p
          style={{
            margin: "16px 0 4px",
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {hasData ? `${ratio.toFixed(1)}%` : "—"}
        </p>

        <p
          style={{
            margin: "8px 0 0",
            fontSize: 18,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            opacity: hasData ? 1 : 0.4,
          }}
        >
          {hasData ? statusLabels[statusIdx] : t.waiting}
        </p>

        {/* Mini bar chart */}
        <div
          style={{
            marginTop: 20,
            width: "100%",
            height: 8,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 999,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Threshold markers */}
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: 0,
              bottom: 0,
              borderLeft: "2px solid rgba(255,255,255,0.3)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: 0,
              bottom: 0,
              borderLeft: "2px solid rgba(255,255,255,0.3)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "60%",
              top: 0,
              bottom: 0,
              borderLeft: "2px solid rgba(255,255,255,0.3)",
              zIndex: 0,
            }}
          />
          {/* Fill */}
          <div
            style={{
              width: `${fillPercent}%`,
              height: "100%",
              background: "#ffffff",
              borderRadius: 999,
              transition: "width 0.3s ease",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* Threshold labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            fontSize: 10,
            opacity: 0.6,
          }}
        >
          <span>5%</span>
          <span>15%</span>
          <span>30%</span>
          <span>50%+</span>
        </div>

        {/* Description */}
        {hasData && (
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 13,
              opacity: 0.8,
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: 320,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {t.description}
          </p>
        )}

        <p
          style={{
            margin: "12px 0 0",
            fontSize: 11,
            opacity: 0.55,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {t.footer}
        </p>
      </div>
    </div>
  );
}
