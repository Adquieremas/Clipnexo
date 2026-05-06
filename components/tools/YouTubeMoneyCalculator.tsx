"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    views: "Vistas diarias / totales",
    rpm: "RPM estimado (USD)",
    pct: "% Vistas monetizadas",
    resultsHeading: "Ingresos Estimados",
    footer: "Esta es una estimación aproximada y no garantiza ingresos reales.",
    currency: "$",
  },
  en: {
    views: "Daily / Total views",
    rpm: "Estimated RPM (USD)",
    pct: "% Monetized views",
    resultsHeading: "Estimated Earnings",
    footer: "This is a rough estimate and does not guarantee real income.",
    currency: "$",
  },
  pt: {
    views: "Visualizações diárias / totais",
    rpm: "RPM estimado (USD)",
    pct: "% Visualizações monetizadas",
    resultsHeading: "Ganhos Estimados",
    footer: "Esta é uma estimativa aproximada e não garante rendimentos reais.",
    currency: "$",
  },
} as const;

export default function YouTubeMoneyCalculator({ lang }: Props) {
  const t = copy[lang];
  const [views, setViews] = useState("");
  const [rpm, setRpm] = useState("2.5");
  const [percentage, setPercentage] = useState("50");

  const v = parseFloat(views) || 0;
  const r = parseFloat(rpm) || 0;
  const p = parseFloat(percentage) || 0;

  const estimated = (v / 1000) * r * (p / 100);

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
          <span>{t.views}</span>
          <input
            type="number"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            placeholder="100,000"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="tool-field">
            <span>{t.rpm}</span>
            <input
              type="number"
              step="0.1"
              value={rpm}
              onChange={(e) => setRpm(e.target.value)}
            />
          </label>
          <label className="tool-field">
            <span>{t.pct}</span>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center shadow-xl mt-8">
        <h3 className="text-xl font-bold opacity-90 mb-2">{t.resultsHeading}</h3>
        <p className="text-5xl font-black tracking-tight">
          {t.currency}
          {estimated.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-sm opacity-80 mt-6 font-medium italic">
          {t.footer}
        </p>
      </div>
    </div>
  );
}