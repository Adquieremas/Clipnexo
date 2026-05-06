"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    views: "Vistas promedio por video",
    subs: "Total de suscriptores",
    resultsHeading: "Proporción de Vistas",
    footer: "Mide qué tan activa es tu comunidad en relación a tus suscriptores.",
    waiting: "Esperando datos...",
    status: {
      low: "Bajo",
      neutral: "Aceptable",
      good: "Bueno",
      high: "Excelente",
    },
  },
  en: {
    views: "Average views per video",
    subs: "Total subscribers",
    resultsHeading: "View-to-Sub Ratio",
    footer: "Measures how active your community is relative to your subscribers.",
    waiting: "Waiting for data...",
    status: {
      low: "Low",
      neutral: "Fair",
      good: "Good",
      high: "Excellent",
    },
  },
  pt: {
    views: "Visualizações médias por vídeo",
    subs: "Total de inscritos",
    resultsHeading: "Proporção de Visualizações",
    footer: "Mede o quão ativa é sua comunidade em relação aos seus inscritos.",
    waiting: "Aguardando dados...",
    status: {
      low: "Baixo",
      neutral: "Aceitável",
      good: "Bom",
      high: "Excelente",
    },
  },
} as const;

export default function YouTubeViewRatioCalculator({ lang }: Props) {
  const t = copy[lang];
  const [views, setViews] = useState("");
  const [subs, setSubs] = useState("");

  const v = parseFloat(views) || 0;
  const s = parseFloat(subs) || 0;

  let ratio = 0;
  let statusText: string = t.waiting;
  if (s > 0 && v > 0) {
    ratio = (v / s) * 100;
    if (ratio < 5) statusText = t.status.low;
    else if (ratio < 15) statusText = t.status.neutral;
    else if (ratio < 30) statusText = t.status.good;
    else statusText = t.status.high;
  }

  return (
    <div className="tool-card">
      <div className="tool-grid two">
        <label className="tool-field">
          <span>{t.views}</span>
          <input
            type="number"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            placeholder="5,000"
          />
        </label>
        <label className="tool-field">
          <span>{t.subs}</span>
          <input
            type="number"
            value={subs}
            onChange={(e) => setSubs(e.target.value)}
            placeholder="50,000"
          />
        </label>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center shadow-xl mt-8">
        <h3 className="text-xl font-bold opacity-90 mb-2">{t.resultsHeading}</h3>
        <p className="text-5xl font-black tracking-tight">{ratio.toFixed(1)}%</p>
        <p className="text-2xl font-black mt-2 uppercase tracking-wide">
          {statusText}
        </p>
        <p className="text-sm opacity-80 mt-6 font-medium italic">
          {t.footer}
        </p>
      </div>
    </div>
  );
}