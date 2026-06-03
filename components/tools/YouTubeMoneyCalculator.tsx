"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy: Record<string, {
  views: string;
  rpm: string;
  pct: string;
  resultsHeading: string;
  footer: string;
  currency: string;
  perDay: string;
  perMonth: string;
  daily: string;
  monthly: string;
}> = {
  es: {
    views: "Vistas al mes",
    rpm: "RPM estimado (USD)",
    pct: "% Vistas monetizadas",
    resultsHeading: "Ingresos estimados",
    footer: "Esta es una estimación aproximada y no garantiza ingresos reales.",
    currency: "$",
    perDay: "Por día",
    perMonth: "Por mes",
    daily: "diarios",
    monthly: "mensuales",
  },
  en: {
    views: "Views per month",
    rpm: "Estimated RPM (USD)",
    pct: "% Monetized views",
    resultsHeading: "Estimated earnings",
    footer: "This is a rough estimate and does not guarantee real income.",
    currency: "$",
    perDay: "Per day",
    perMonth: "Per month",
    daily: "daily",
    monthly: "monthly",
  },
  pt: {
    views: "Visualizações por mês",
    rpm: "RPM estimado (USD)",
    pct: "% Visualizações monetizadas",
    resultsHeading: "Ganhos estimados",
    footer: "Esta é uma estimativa aproximada e não garante rendimentos reais.",
    currency: "$",
    perDay: "Por dia",
    perMonth: "Por mês",
    daily: "diários",
    monthly: "mensais",
  },
};

export default function YouTubeMoneyCalculator({ lang }: Props) {
  const t = copy[lang] || copy.es;
  const [views, setViews] = useState("");
  const [rpm, setRpm] = useState("2.5");
  const [percentage, setPercentage] = useState("50");

  const v = parseFloat(views) || 0;
  const r = parseFloat(rpm) || 0;
  const p = parseFloat(percentage) || 0;

  const monthly = (v / 1000) * r * (p / 100);
  const daily = monthly / 30;

  return (
    <div className="tool-card">
      <div className="tool-grid two">
        <label className="tool-field">
          <span>{t.views}</span>
          <input
            type="number"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            placeholder="100,000"
          />
        </label>

        <label className="tool-field">
          <span>{t.rpm}</span>
          <input
            type="number"
            step="0.1"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
          />
        </label>

        <label className="tool-field" style={{ gridColumn: "1 / -1" }}>
          <span>{t.pct}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            style={{
              width: "100%",
              height: 8,
              borderRadius: 999,
              accentColor: "#4f46e5",
              cursor: "pointer",
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#4f46e5",
              marginTop: 4,
            }}
          >
            {percentage}%
          </span>
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
            margin: "12px 0 4px",
            fontSize: 40,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {t.currency}
          {monthly.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            opacity: 0.7,
            fontWeight: 500,
          }}
        >
          {t.perMonth}
        </p>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {t.currency}
              {daily.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 12,
                opacity: 0.65,
                fontWeight: 500,
              }}
            >
              {t.perDay}
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                opacity: 0.65,
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              RPM: {t.currency}
              {r.toFixed(2)} · {p}% {t.daily === "diarios" ? "monetizadas" : t.daily === "daily" ? "monetized" : "monetizadas"}
            </p>
          </div>
        </div>

        <p
          style={{
            margin: "20px 0 0",
            fontSize: 12,
            opacity: 0.65,
            fontStyle: "italic",
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
