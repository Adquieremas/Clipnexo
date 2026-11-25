"use client";

import { useEffect, useRef, useState } from "react";
import type { SupportedLang } from "@/lib/routes";
import { useSoundFavorites } from "./useSoundFavorites";
import { useSoundPlayer } from "./SoundPlayerProvider";
import { decodeWaveformPeaks, deterministicBars, formatDuration } from "./waveform-utils";

type Copy = {
  play: string;
  pause: string;
  download: string;
  share: string;
  copyLink: string;
  linkCopied: string;
  favorite: string;
  unfavorite: string;
  embed: string;
  plays: string;
  downloads: string;
  license: string;
};

const copyByLang: Record<SupportedLang, Copy> = {
  es: {
    play: "Reproducir",
    pause: "Pausar",
    download: "Descargar MP3",
    share: "Compartir",
    copyLink: "Copiar enlace",
    linkCopied: "¡Enlace copiado!",
    favorite: "Agregar a favoritos",
    unfavorite: "Quitar de favoritos",
    embed: "Código para insertar (iframe)",
    plays: "reproducciones",
    downloads: "descargas",
    license: "Uso libre para tus videos y proyectos personales o comerciales. Sé responsable con el contenido que compartes.",
  },
  en: {
    play: "Play",
    pause: "Pause",
    download: "Download MP3",
    share: "Share",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    favorite: "Add to favorites",
    unfavorite: "Remove from favorites",
    embed: "Embed code (iframe)",
    plays: "plays",
    downloads: "downloads",
    license: "Free to use in your personal or commercial videos and projects. Please use content responsibly.",
  },
  pt: {
    play: "Reproduzir",
    pause: "Pausar",
    download: "Baixar MP3",
    share: "Compartilhar",
    copyLink: "Copiar link",
    linkCopied: "Link copiado!",
    favorite: "Adicionar aos favoritos",
    unfavorite: "Remover dos favoritos",
    embed: "Código para incorporar (iframe)",
    plays: "reproduções",
    downloads: "downloads",
    license: "Uso livre para seus vídeos e projetos pessoais ou comerciais. Use o conteúdo com responsabilidade.",
  },
};

export default function SoundWaveformPlayer({
  sound,
  lang,
  pageUrl,
  embedUrl,
}: {
  sound: { id: string; title: string; audioUrl: string; durationMs: number; playCount: number; downloadCount: number };
  lang: SupportedLang;
  pageUrl: string;
  embedUrl: string;
}) {
  const t = copyByLang[lang];
  const { playingId, toggle, seek, subscribeTime } = useSoundPlayer();
  const { isFavorite, toggleFavorite } = useSoundFavorites();
  const isPlaying = playingId === sound.id;
  const favorite = isFavorite(sound.id);

  const [peaks, setPeaks] = useState<number[]>(() => deterministicBars(sound.id, 64));
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    decodeWaveformPeaks(sound.audioUrl, 64)
      .then((real) => {
        if (!cancelled) setPeaks(real);
      })
      .catch(() => {
        // keep the deterministic placeholder if decoding isn't supported/fails
      });
    return () => {
      cancelled = true;
    };
  }, [sound.audioUrl, sound.id]);

  useEffect(() => {
    return subscribeTime((currentTime, duration) => {
      if (duration > 0) setProgress(currentTime / duration);
    });
  }, [subscribeTime]);

  const handlePlay = () => {
    toggle(sound.id, sound.audioUrl);
    if (!isPlaying) {
      fetch(`/api/sounds/${sound.id}/play`, { method: "POST" }).catch(() => {});
    }
  };

  const handleWaveformClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = waveformRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    if (!isPlaying) {
      toggle(sound.id, sound.audioUrl);
      fetch(`/api/sounds/${sound.id}/play`, { method: "POST" }).catch(() => {});
    }
    seek(sound.id, ratio * (sound.durationMs / 1000));
    setProgress(ratio);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: sound.title, url: pageUrl });
        return;
      } catch {
        // user cancelled; fall through to clipboard copy
      }
    }
    handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
  };

  const activeBars = isPlaying ? Math.round(progress * peaks.length) : 0;
  const embedSnippet = `<iframe src="${embedUrl}" width="320" height="120" style="border:0;border-radius:12px;overflow:hidden" title="${sound.title}" loading="lazy"></iframe>`;

  return (
    <div className="sound-detail-player">
      <div className="sound-detail-player-controls">
        <button
          type="button"
          className={`sound-detail-play${isPlaying ? " sound-detail-play-active" : ""}`}
          onClick={handlePlay}
          aria-label={isPlaying ? t.pause : t.play}
        >
          {isPlaying ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div
          className="sound-detail-waveform"
          ref={waveformRef}
          onClick={handleWaveformClick}
          role="slider"
          aria-label={sound.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
        >
          {peaks.map((height, i) => (
            <span
              key={i}
              className={`sound-detail-bar${i < activeBars ? " sound-detail-bar-played" : ""}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <span className="sound-detail-duration">{formatDuration(sound.durationMs)}</span>
      </div>

      <h1 className="sound-detail-title">{sound.title}</h1>

      <div className="sound-detail-stats">
        <span>{sound.playCount.toLocaleString(lang)} {t.plays}</span>
        <span>{sound.downloadCount.toLocaleString(lang)} {t.downloads}</span>
      </div>

      <div className="sound-detail-actions">
        <a href={`/api/sounds/${sound.id}/download`} className="sound-detail-btn sound-detail-btn-primary" download>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.download}
        </a>
        <button
          type="button"
          className={`sound-detail-btn${favorite ? " sound-detail-btn-active" : ""}`}
          onClick={() => toggleFavorite(sound.id)}
          aria-pressed={favorite}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-10-9.2C.5 8.2 2.3 5 5.6 5c1.9 0 3.4 1 4.4 2.5C11 6 12.5 5 14.4 5 17.7 5 19.5 8.2 22 11.8 19.5 16.4 12 21 12 21Z" />
          </svg>
          {favorite ? t.unfavorite : t.favorite}
        </button>
        <button type="button" className="sound-detail-btn" onClick={handleShare}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="M8.2 10.8 15.8 6.4M8.2 13.2l7.6 4.4" strokeLinecap="round" />
          </svg>
          {t.share}
        </button>
        <button type="button" className="sound-detail-btn" onClick={handleCopyLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
          {copied ? t.linkCopied : t.copyLink}
        </button>
      </div>

      <details className="sound-detail-embed">
        <summary>{t.embed}</summary>
        <textarea className="sound-detail-embed-code" readOnly value={embedSnippet} onClick={(e) => e.currentTarget.select()} />
      </details>

      <p className="sound-detail-license">{t.license}</p>
    </div>
  );
}
