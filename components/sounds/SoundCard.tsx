"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { SupportedLang } from "@/lib/routes";
import { useSoundPlayer } from "./SoundPlayerProvider";
import { useSoundFavorites } from "./useSoundFavorites";
import { deterministicBars, formatDuration } from "./waveform-utils";

export type SoundCardData = {
  id: string;
  title: string;
  categoryId: string;
  categoryLabel: string;
  audioUrl: string;
  durationMs: number;
  playCount: number;
};

type Copy = {
  play: string;
  pause: string;
  download: string;
  share: string;
  favorite: string;
  unfavorite: string;
  copied: string;
};

const copyByLang: Record<SupportedLang, Copy> = {
  es: { play: "Reproducir", pause: "Pausar", download: "Descargar", share: "Compartir", favorite: "Agregar a favoritos", unfavorite: "Quitar de favoritos", copied: "Enlace copiado" },
  en: { play: "Play", pause: "Pause", download: "Download", share: "Share", favorite: "Add to favorites", unfavorite: "Remove from favorites", copied: "Link copied" },
  pt: { play: "Reproduzir", pause: "Pausar", download: "Baixar", share: "Compartilhar", favorite: "Adicionar aos favoritos", unfavorite: "Remover dos favoritos", copied: "Link copiado" },
};

// Deterministic decorative waveform bars derived from the sound id, so the
// same sound always renders the same shape without decoding any audio.
function waveformBars(id: string): number[] {
  return deterministicBars(id, 24);
}

export default function SoundCard({
  sound,
  lang,
  pageUrl,
  titleHref,
}: {
  sound: SoundCardData;
  lang: SupportedLang;
  pageUrl: string;
  titleHref?: string;
}) {
  const t = copyByLang[lang];
  const { playingId, toggle } = useSoundPlayer();
  const { isFavorite, toggleFavorite } = useSoundFavorites();
  const bars = useMemo(() => waveformBars(sound.id), [sound.id]);
  const isPlaying = playingId === sound.id;
  const favorite = isFavorite(sound.id);

  const handlePlay = () => {
    toggle(sound.id, sound.audioUrl);
    if (!isPlaying) {
      fetch(`/api/sounds/${sound.id}/play`, { method: "POST" }).catch(() => {});
    }
  };

  const handleShare = async () => {
    const shareData = { title: sound.title, url: pageUrl };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed; fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
  };

  return (
    <div className="sound-card">
      <div className="sound-card-top">
        <button
          type="button"
          className={`sound-card-play${isPlaying ? " sound-card-play-active" : ""}`}
          onClick={handlePlay}
          aria-label={isPlaying ? t.pause : t.play}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="sound-card-waveform" aria-hidden="true">
          {bars.map((height, i) => (
            <span
              key={i}
              className={`sound-card-bar${isPlaying ? " sound-card-bar-active" : ""}`}
              style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>

        <span className="sound-card-duration">{formatDuration(sound.durationMs)}</span>
      </div>

      <div className="sound-card-body">
        <span className="sound-card-category">{sound.categoryLabel}</span>
        <h3 className="sound-card-title">
          {titleHref ? <Link href={titleHref}>{sound.title}</Link> : sound.title}
        </h3>
      </div>

      <div className="sound-card-actions">
        <button
          type="button"
          className={`sound-card-icon-btn${favorite ? " sound-card-icon-btn-active" : ""}`}
          onClick={() => toggleFavorite(sound.id)}
          aria-label={favorite ? t.unfavorite : t.favorite}
          aria-pressed={favorite}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-10-9.2C.5 8.2 2.3 5 5.6 5c1.9 0 3.4 1 4.4 2.5C11 6 12.5 5 14.4 5 17.7 5 19.5 8.2 22 11.8 19.5 16.4 12 21 12 21Z" />
          </svg>
        </button>
        <a
          href={`/api/sounds/${sound.id}/download`}
          className="sound-card-icon-btn"
          aria-label={t.download}
          download
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button type="button" className="sound-card-icon-btn" onClick={handleShare} aria-label={t.share}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="M8.2 10.8 15.8 6.4M8.2 13.2l7.6 4.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
