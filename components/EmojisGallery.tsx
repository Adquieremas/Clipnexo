"use client";

import { useMemo, useState } from "react";
import { EMOJIS, getEmojiUrl, type EmojiItem } from "@/lib/emojis-data";
import type { SupportedLang } from "@/lib/routes";

type Props = { lang: SupportedLang };

const UI = {
  es: {
    search: "Buscar emoji por número...",
    download: "Descargar",
    copy: "Copiar URL",
    copied: "Copiada",
    copyFailed: "No se pudo copiar",
    showing: "Mostrando",
    of: "de",
    emojis: "emojis",
    noResults: "No se encontraron emojis con ese número.",
    loadMore: "Mostrar más",
  },
  en: {
    search: "Search emoji by number...",
    download: "Download",
    copy: "Copy URL",
    copied: "Copied",
    copyFailed: "Copy failed",
    showing: "Showing",
    of: "of",
    emojis: "emojis",
    noResults: "No emojis found for that number.",
    loadMore: "Show more",
  },
  pt: {
    search: "Buscar emoji por número...",
    download: "Baixar",
    copy: "Copiar URL",
    copied: "Copiada",
    copyFailed: "Falha ao copiar",
    showing: "Mostrando",
    of: "de",
    emojis: "emojis",
    noResults: "Nenhum emoji encontrado para esse número.",
    loadMore: "Mostrar mais",
  },
} as const;

const PAGE_SIZE = 48;

function EmojiCard({ emoji, lang }: { emoji: EmojiItem; lang: SupportedLang }) {
  const t = UI[lang];
  const url = getEmojiUrl(emoji.r2Key);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    setCopied(false);
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 12,
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface-raised)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={emoji.name}
          loading="lazy"
          width={128}
          height={128}
          style={{ width: "72%", height: "auto", maxHeight: "72%", objectFit: "contain", display: "block" }}
        />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
        {emoji.name}
      </div>
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <a
          href={`/api/emojis/${emoji.id}/download`}
          download={`${emoji.id}.png`}
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 12,
            padding: "7px 8px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface-raised)",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          {t.download}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            flex: 1,
            fontSize: 12,
            padding: "7px 8px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: copied ? "var(--accent-soft)" : "var(--surface-raised)",
            color: copied ? "var(--accent)" : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {copied ? t.copied : copyFailed ? t.copyFailed : t.copy}
        </button>
      </div>
    </div>
  );
}

export default function EmojisGallery({ lang }: Props) {
  const t = UI[lang];
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const rawQuery = query.trim();
    if (!rawQuery) return EMOJIS;
    const q = rawQuery.replace(/[^0-9]/g, "");
    if (!q) return [];
    return EMOJIS.filter((e) => String(e.n).includes(q));
  }, [query]);

  const shown = filtered.slice(0, visible);

  return (
    <section>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
          placeholder={t.search}
          aria-label={t.search}
          style={{
            flex: "1 1 260px",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-primary)",
            fontSize: 14,
          }}
        />
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          {t.showing} {shown.length} {t.of} {filtered.length} {t.emojis}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", padding: "24px 0" }}>{t.noResults}</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {shown.map((emoji) => (
              <EmojiCard key={emoji.id} emoji={emoji} lang={lang} />
            ))}
          </div>
          {visible < filtered.length && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {t.loadMore}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
