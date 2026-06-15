"use client";

import dynamic from "next/dynamic";
import type { SupportedLang } from "@/lib/routes";

const PdfToText = dynamic(() => import("./PdfToText"), {
  ssr: false,
  loading: () => (
    <div className="tool-card">
      <div style={{
        border: "2px dashed #d1d5db",
        borderRadius: "12px",
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#374151" }}>Cargando herramienta...</span>
      </div>
    </div>
  ),
});

type Props = {
  lang: SupportedLang;
};

export default function PdfToTextClient({ lang }: Props) {
  return <PdfToText lang={lang} />;
}
