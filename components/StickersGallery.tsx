"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STICKERS } from "@/lib/stickers-data";
import { getMemePosterUrl, getMemeVideoUrl } from "@/lib/memes-data";
import { getLocalizedRoute, type SupportedLang } from "@/lib/routes";
import { getAbsoluteUrl } from "@/lib/seo";

type Props = { lang: SupportedLang };

const UI = {
  es: { search: "Buscar sticker por nombre...", download: "Descargar", copy: "Copiar URL", copied: "Copiada", copyFailed: "No se pudo copiar", showing: "Mostrando", of: "de", items: "stickers", noResults: "No se encontraron stickers con ese filtro.", play: "Reproducir sticker", whatsapp: "WhatsApp", whatsappShareText: (title: string, url: string) => `Mira este sticker: "${title}" ${url}` },
  en: { search: "Search sticker by name...", download: "Download", copy: "Copy URL", copied: "Copied", copyFailed: "Copy failed", showing: "Showing", of: "of", items: "stickers", noResults: "No stickers found for that filter.", play: "Play sticker", whatsapp: "WhatsApp", whatsappShareText: (title: string, url: string) => `Check out this sticker: "${title}" ${url}` },
  pt: { search: "Buscar figurinha por nome...", download: "Baixar", copy: "Copiar URL", copied: "Copiada", copyFailed: "Falha ao copiar", showing: "Mostrando", of: "de", items: "figurinhas", noResults: "Nenhuma figurinha encontrada para esse filtro.", play: "Reproduzir figurinha", whatsapp: "WhatsApp", whatsappShareText: (title: string, url: string) => `Veja essa figurinha: "${title}" ${url}` },
} as const;

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function StickersGallery({ lang }: Props) {
  const t = UI[lang];
  const basePath = getLocalizedRoute("stickersLibrary", lang);
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyFailedId, setCopyFailedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STICKERS;
    return STICKERS.filter((s) => s.title.toLowerCase().includes(q) || s.id.includes(q));
  }, [query]);

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setCopyFailedId(null);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    } catch {
      setCopiedId(null);
      setCopyFailedId(id);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search}
          aria-label={t.search}
          style={{ flex: "1 1 260px", minWidth: 0, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", fontSize: 15 }}
        />
        <span style={{ color: "var(--text-tertiary)", fontSize: 14 }}>{t.showing} {filtered.length} {t.of} {STICKERS.length} {t.items}</span>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", padding: "24px 0" }}>{t.noResults}</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map((sticker) => {
            const isActive = activeId === sticker.id;
            const videoUrl = getMemeVideoUrl(sticker);
            const detailHref = `${basePath}/${sticker.id}`;
            return (
              <article key={sticker.id} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)", overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "1 / 1", background: "#000" }}>
                  {isActive ? (
                    <video src={videoUrl} poster={getMemePosterUrl(sticker)} controls controlsList="nodownload" autoPlay playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveId(sticker.id)}
                      aria-label={`${t.play}: ${sticker.title}`}
                      style={{ width: "100%", height: "100%", padding: 0, border: 0, background: "transparent", cursor: "pointer", position: "relative", display: "block" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getMemePosterUrl(sticker)} alt={sticker.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.1))", color: "#fff", fontSize: 30 }}>▶</span>
                      <span style={{ position: "absolute", right: 8, bottom: 8, fontSize: 12, padding: "2px 6px", borderRadius: 6, background: "rgba(0,0,0,.72)", color: "#fff" }}>{formatDuration(sticker.durationMs)}</span>
                    </button>
                  )}
                </div>
                <div style={{ padding: 12 }}>
                  <Link href={detailHref} style={{ textDecoration: "none" }}>
                    <p title={sticker.title} style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.7em" }}>{sticker.title}</p>
                  </Link>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={`/api/memes/${sticker.id}/download`} download={`${sticker.id}.mp4`} style={{ flex: 1, textAlign: "center", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.download}</a>
                    <button type="button" onClick={() => handleCopy(sticker.id, videoUrl)} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: copiedId === sticker.id ? "var(--accent-soft)" : "var(--surface-raised)", color: copiedId === sticker.id ? "var(--accent)" : "var(--text-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{copiedId === sticker.id ? t.copied : copyFailedId === sticker.id ? t.copyFailed : t.copy}</button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(t.whatsappShareText(sticker.title, getAbsoluteUrl(detailHref)))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t.whatsapp}
                      title={t.whatsapp}
                      style={{ flex: "0 0 auto", display: "grid", placeItems: "center", width: 36, padding: "8px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "#25D366", textDecoration: "none" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.03h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.42 3.6-8.02 8.03-8.02 2.14 0 4.15.84 5.67 2.35a7.96 7.96 0 0 1 2.34 5.68c0 4.42-3.6 8.14-8.03 8.14Zm4.4-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
