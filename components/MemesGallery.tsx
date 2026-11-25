"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { MEMES, getMemePosterUrl, getMemeVideoUrl } from "@/lib/memes-data";
import { MEME_CATEGORIES, getMemeCategoryLabel, type MemeCategoryId } from "@/lib/memes-categories";
import { getLocalizedRoute, type SupportedLang } from "@/lib/routes";

type Props = { lang: SupportedLang; initialCategory?: string };

const UI = {
  es: { search: "Buscar meme por nombre...", download: "Descargar", copy: "Copiar URL", copied: "Copiada", copyFailed: "No se pudo copiar", showing: "Mostrando", of: "de", items: "memes", noResults: "No se encontraron memes con ese filtro.", loadMore: "Mostrar más", play: "Reproducir meme", all: "Todos" },
  en: { search: "Search meme by name...", download: "Download", copy: "Copy URL", copied: "Copied", copyFailed: "Copy failed", showing: "Showing", of: "of", items: "memes", noResults: "No memes found for that filter.", loadMore: "Show more", play: "Play meme", all: "All" },
  pt: { search: "Buscar meme por nome...", download: "Baixar", copy: "Copiar URL", copied: "Copiada", copyFailed: "Falha ao copiar", showing: "Mostrando", of: "de", items: "memes", noResults: "Nenhum meme encontrado para esse filtro.", loadMore: "Mostrar mais", play: "Reproduzir meme", all: "Todos" },
} as const;

const PAGE_SIZE = 24;

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MemesGallery({ lang, initialCategory }: Props) {
  const t = UI[lang];
  const basePath = getLocalizedRoute("memesLibrary", lang);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MemeCategoryId | "all">(
    MEME_CATEGORIES.some((c) => c.id === initialCategory) ? (initialCategory as MemeCategoryId) : "all"
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyFailedId, setCopyFailedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of MEMES) map.set(m.category, (map.get(m.category) ?? 0) + 1);
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMES.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (!q) return true;
      return m.title.toLowerCase().includes(q) || m.id.includes(q);
    });
  }, [query, category]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

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

  const chipStyle = (active: boolean): CSSProperties => ({
    padding: "8px 12px",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    background: active ? "var(--accent-soft)" : "var(--surface-raised)",
    color: active ? "var(--accent)" : "var(--text-secondary)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <button type="button" style={chipStyle(category === "all")} onClick={() => { setCategory("all"); setVisible(PAGE_SIZE); }}>
          {t.all} ({MEMES.length})
        </button>
        {MEME_CATEGORIES.map((c) => {
          const count = counts.get(c.id) ?? 0;
          if (count === 0) return null;
          return (
            <button key={c.id} type="button" style={chipStyle(category === c.id)} onClick={() => { setCategory(c.id); setVisible(PAGE_SIZE); }}>
              {getMemeCategoryLabel(c.id, lang)} ({count})
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
          placeholder={t.search}
          aria-label={t.search}
          style={{ flex: "1 1 260px", minWidth: 0, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", fontSize: 15 }}
        />
        <span style={{ color: "var(--text-tertiary)", fontSize: 14 }}>{t.showing} {shown.length} {t.of} {filtered.length} {t.items}</span>
      </div>

      {shown.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", padding: "24px 0" }}>{t.noResults}</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {shown.map((meme) => {
            const isActive = activeId === meme.id;
            const videoUrl = getMemeVideoUrl(meme);
            const detailHref = `${basePath}/${meme.id}`;
            return (
              <article key={meme.id} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)", overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#000" }}>
                  {isActive ? (
                    <video src={videoUrl} poster={getMemePosterUrl(meme)} controls controlsList="nodownload" autoPlay playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveId(meme.id)}
                      aria-label={`${t.play}: ${meme.title}`}
                      style={{ width: "100%", height: "100%", padding: 0, border: 0, background: "transparent", cursor: "pointer", position: "relative", display: "block" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getMemePosterUrl(meme)} alt={meme.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.1))", color: "#fff", fontSize: 34 }}>▶</span>
                      <span style={{ position: "absolute", right: 8, bottom: 8, fontSize: 12, padding: "2px 6px", borderRadius: 6, background: "rgba(0,0,0,.72)", color: "#fff" }}>{formatDuration(meme.durationMs)}</span>
                    </button>
                  )}
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", background: "var(--accent-soft)", padding: "2px 8px", borderRadius: 999 }}>
                      {getMemeCategoryLabel(meme.category, lang)}
                    </span>
                  </div>
                  <Link href={detailHref} style={{ textDecoration: "none" }}>
                    <p title={meme.title} style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.7em" }}>{meme.title}</p>
                  </Link>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={`/api/memes/${meme.id}/download`} download={`${meme.id}.mp4`} style={{ flex: 1, textAlign: "center", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.download}</a>
                    <button type="button" onClick={() => handleCopy(meme.id, videoUrl)} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: copiedId === meme.id ? "var(--accent-soft)" : "var(--surface-raised)", color: copiedId === meme.id ? "var(--accent)" : "var(--text-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{copiedId === meme.id ? t.copied : copyFailedId === meme.id ? t.copyFailed : t.copy}</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {canLoadMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} style={{ padding: "12px 20px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{t.loadMore}</button>
        </div>
      )}
    </div>
  );
}
