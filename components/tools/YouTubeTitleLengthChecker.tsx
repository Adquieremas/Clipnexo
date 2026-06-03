"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy: Record<string, {
  label: string;
  placeholder: string;
  statusLabels: { short: string; good: string; long: string; veryLong: string };
  chars: string;
  idealRange: string;
}> = {
  es: {
    label: "Título de YouTube",
    placeholder: "Escribe o pega aquí tu título...",
    statusLabels: { short: "Corto", good: "Excelente", long: "Largo", veryLong: "Demasiado largo" },
    chars: "caracteres",
    idealRange: "El rango ideal es de 40 a 60 caracteres",
  },
  en: {
    label: "YouTube Title",
    placeholder: "Type or paste your title here...",
    statusLabels: { short: "Short", good: "Excellent", long: "Long", veryLong: "Too long" },
    chars: "characters",
    idealRange: "The ideal range is 40 to 60 characters",
  },
  pt: {
    label: "Título do YouTube",
    placeholder: "Digite ou cole aqui seu título...",
    statusLabels: { short: "Curto", good: "Excelente", long: "Longo", veryLong: "Muito longo" },
    chars: "caracteres",
    idealRange: "O intervalo ideal é de 40 a 60 caracteres",
  },
};

export default function YouTubeTitleLengthChecker({ lang }: Props) {
  const t = copy[lang] || copy.es;
  const [title, setTitle] = useState("");
  const length = title.length;

  let status: string;
  let color: string;
  let barColor: string;
  let fillPercent: number;

  if (length === 0) {
    status = "";
    color = "#9ca3af";
    barColor = "#e5e7eb";
    fillPercent = 0;
  } else if (length < 40) {
    status = t.statusLabels.short;
    color = "#f59e0b";
    barColor = "#f59e0b";
    fillPercent = (length / 100) * 100;
  } else if (length <= 60) {
    status = t.statusLabels.good;
    color = "#10b981";
    barColor = "#10b981";
    fillPercent = (length / 100) * 100;
  } else if (length <= 70) {
    status = t.statusLabels.long;
    color = "#f97316";
    barColor = "#f97316";
    fillPercent = (length / 100) * 100;
  } else {
    status = t.statusLabels.veryLong;
    color = "#ef4444";
    barColor = "#ef4444";
    fillPercent = Math.min((length / 100) * 100, 100);
  }

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field" style={{ gridColumn: "span 2" }}>
          <span>{t.label}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.placeholder}
          />
        </label>
      </div>

      <div
        style={{
          marginTop: 24,
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
        }}
      >
        {/* Top row: chars count + status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 4,
              }}
            >
              {t.chars}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#111827",
                lineHeight: 1,
              }}
            >
              {length}
              <span style={{ color: "#d1d5db", fontWeight: 400, fontSize: 20 }}>
                {" "}/ 100
              </span>
            </div>
          </div>

          {status && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              {status}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: 10,
            background: "#e5e7eb",
            borderRadius: 999,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Optimal range highlight (40-60) */}
          <div
            style={{
              position: "absolute",
              left: "40%",
              width: "20%",
              height: "100%",
              background: "rgba(16, 185, 129, 0.15)",
              borderRadius: 999,
              zIndex: 0,
            }}
          />
          {/* Fill bar */}
          <div
            style={{
              width: `${Math.min(fillPercent, 100)}%`,
              height: "100%",
              background: barColor,
              borderRadius: 999,
              transition: "width 0.2s ease, background 0.2s ease",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* Range markers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            fontSize: 11,
            color: "#9ca3af",
          }}
        >
          <span>0</span>
          <span style={{ color: "#10b981", fontWeight: 600, marginLeft: "28%" }}>
            40
          </span>
          <span style={{ color: "#10b981", fontWeight: 600, marginRight: "28%" }}>
            60
          </span>
          <span>100</span>
        </div>

        {/* Hint text */}
        {length > 0 && (
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 13,
              color: "#9ca3af",
              lineHeight: 1.5,
            }}
          >
            {t.idealRange}.
            {length < 40
              ? " " + (lang === "es" ? "Agrega más palabras clave." : lang === "pt" ? "Adicione mais palavras-chave." : "Add more keywords.")
              : length > 60
                ? " " + (lang === "es" ? "Los títulos largos se cortan en los resultados de búsqueda." : lang === "pt" ? "Títulos longos são cortados nos resultados de busca." : "Long titles get truncated in search results.")
                : ""}
          </p>
        )}
      </div>
    </div>
  );
}
