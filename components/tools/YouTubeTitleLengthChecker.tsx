"use client";

import { useState } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

const copy = {
  es: {
    label: "Título de YouTube",
    placeholder: "Escribe o pega aquí tu título...",
    statusLabels: {
      short: "Corto",
      good: "Excelente",
      long: "Largo",
      veryLong: "Demasiado largo",
    },
    chars: "caracteres",
  },
  en: {
    label: "YouTube Title",
    placeholder: "Type or paste your title here...",
    statusLabels: {
      short: "Short",
      good: "Excellent",
      long: "Long",
      veryLong: "Too long",
    },
    chars: "characters",
  },
  pt: {
    label: "Título do YouTube",
    placeholder: "Digite ou cole aqui seu título...",
    statusLabels: {
      short: "Curto",
      good: "Excelente",
      long: "Longo",
      veryLong: "Muito longo",
    },
    chars: "caracteres",
  },
} as const;

export default function YouTubeTitleLengthChecker({ lang }: Props) {
  const t = copy[lang];
  const [title, setTitle] = useState("");
  const length = title.length;

  let status: string = t.statusLabels.short;
  let color = "#f59e0b"; // yellow-500
  if (length >= 40 && length <= 60) {
    status = t.statusLabels.good;
    color = "#10b981"; // green-500
  } else if (length > 60 && length <= 70) {
    status = t.statusLabels.long;
    color = "#f97316"; // orange-500
  } else if (length > 70) {
    status = t.statusLabels.veryLong;
    color = "#ef4444"; // red-500
  }

  return (
    <div className="tool-card">
      <div className="tool-grid">
        <label className="tool-field">
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
        className="flex justify-between items-center bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6"
        style={{ minHeight: "80px" }}
      >
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {t.chars}
          </span>
          <span className="text-2xl font-black text-gray-800">
            {length} <span className="text-gray-300 font-normal">/ 100</span>
          </span>
        </div>
        <div className="text-right">
          <span
            className="text-xl font-black uppercase tracking-tight"
            style={{ color }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}