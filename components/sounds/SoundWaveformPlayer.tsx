"use client";

import { useEffect, useRef, useState } from "react";
import type { SupportedLang } from "@/lib/routes";
import { WHATSAPP_CHANNEL_URL } from "@/lib/site";
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
  whatsapp: string;
  threads: string;
  facebook: string;
  instagram: string;
  reddit: string;
  joinChannel: string;
  instagramCopied: string;
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
    whatsapp: "WhatsApp",
    threads: "Threads",
    facebook: "Facebook",
    instagram: "Instagram",
    reddit: "Reddit",
    joinChannel: "Únete a nuestro canal de WhatsApp",
    instagramCopied: "Enlace copiado. Pégalo en tu historia o mensaje de Instagram.",
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
    whatsapp: "WhatsApp",
    threads: "Threads",
    facebook: "Facebook",
    instagram: "Instagram",
    reddit: "Reddit",
    joinChannel: "Join our WhatsApp channel",
    instagramCopied: "Link copied. Paste it in your Instagram story or message.",
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
    whatsapp: "WhatsApp",
    threads: "Threads",
    facebook: "Facebook",
    instagram: "Instagram",
    reddit: "Reddit",
    joinChannel: "Entre no nosso canal do WhatsApp",
    instagramCopied: "Link copiado. Cole no seu story ou mensagem do Instagram.",
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
  const [shareOpen, setShareOpen] = useState(false);
  const [instagramHint, setInstagramHint] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [shareOpen]);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
  };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setInstagramHint(true);
      setTimeout(() => setInstagramHint(false), 4000);
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
    setShareOpen(false);
  };

  const shareText = encodeURIComponent(`${sound.title} - ${pageUrl}`);
  const shareUrl = encodeURIComponent(pageUrl);
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${shareText}`,
    threads: `https://www.threads.net/intent/post?text=${shareText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    reddit: `https://www.reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent(sound.title)}`,
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
        <div className="sound-share-wrap" ref={shareRef}>
          <button
            type="button"
            className="sound-detail-btn"
            onClick={() => setShareOpen((open) => !open)}
            aria-expanded={shareOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="M8.2 10.8 15.8 6.4M8.2 13.2l7.6 4.4" strokeLinecap="round" />
            </svg>
            {t.share}
          </button>

          {shareOpen && (
            <div className="sound-share-menu">
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="sound-share-item" onClick={() => setShareOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#25D366" }}>
                  <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.03h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.42 3.6-8.02 8.03-8.02 2.14 0 4.15.84 5.67 2.35a7.96 7.96 0 0 1 2.34 5.68c0 4.42-3.6 8.14-8.03 8.14Zm4.4-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                {t.whatsapp}
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="sound-share-item" onClick={() => setShareOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#1877F2" }}>
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                </svg>
                {t.facebook}
              </a>
              <a href={shareLinks.threads} target="_blank" rel="noopener noreferrer" className="sound-share-item" onClick={() => setShareOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.2 2c-4.9 0-8.6 2.9-8.6 8.1v3.8c0 5.2 3.7 8.1 8.6 8.1 4.5 0 7.9-2.4 8.5-6.6l.03-.2h-2.6l-.03.15c-.4 2.6-2.4 4.1-5.9 4.1-3.6 0-5.9-2-5.9-5.6v-.5c1 .6 2.4.9 4 .9 3.6 0 6.3-1.9 6.3-5.1 0-2.9-2.2-4.9-5.6-4.9-2.5 0-4.5 1.1-5.5 2.9l2.2 1.3c.6-1 1.6-1.6 3-1.6 1.6 0 2.7.8 2.7 2.1 0 1.3-1.3 2-3.1 2-1.2 0-2.3-.3-3.2-1l-.1-.07v-1.5c0-3.4 1.9-5.1 5.3-5.1 3.1 0 5 1.5 5.5 4h2.6C19.9 4 16.7 2 12.2 2Z" />
                </svg>
                {t.threads}
              </a>
              <a href={shareLinks.reddit} target="_blank" rel="noopener noreferrer" className="sound-share-item" onClick={() => setShareOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#FF4500" }}>
                  <path d="M22 12c0-1.1-.9-2-2-2-.5 0-1 .2-1.3.5-1.3-.9-3.1-1.5-5-1.6l.9-4 2.8.6c0 .8.7 1.5 1.5 1.5.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5c-.6 0-1.1.3-1.3.8l-3.1-.7c-.2 0-.3 0-.4.2l-1 4.6c-1.9.1-3.6.7-4.9 1.6-.3-.3-.8-.5-1.3-.5-1.1 0-2 .9-2 2 0 .8.4 1.4 1.1 1.8 0 .2-.1.3-.1.5 0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5c0-.2 0-.3-.1-.5.7-.4 1.1-1.1 1.1-1.8ZM8.5 13.5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1Zm6.3 2.9c-.7.7-1.9 1-2.8 1s-2.1-.3-2.8-1c-.1-.1-.1-.3 0-.5.1-.1.3-.1.5 0 .5.5 1.5.7 2.3.7s1.8-.2 2.3-.7c.1-.1.3-.1.5 0 .1.2.1.4 0 .5Zm-.3-1.9c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1Z" />
                </svg>
                {t.reddit}
              </a>
              <button type="button" className="sound-share-item" onClick={handleInstagramShare}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#E4405F" }}>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2.1.26 2.6.46.6.24 1.1.55 1.6 1.04.5.5.8 1 1.04 1.6.2.5.4 1.4.46 2.6.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 2.1-.46 2.6a4.4 4.4 0 0 1-1.04 1.6 4.4 4.4 0 0 1-1.6 1.04c-.5.2-1.4.4-2.6.46-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2.1-.26-2.6-.46a4.4 4.4 0 0 1-1.6-1.04 4.4 4.4 0 0 1-1.04-1.6c-.2-.5-.4-1.4-.46-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-2.1.46-2.6.24-.6.55-1.1 1.04-1.6.5-.5 1-.8 1.6-1.04.5-.2 1.4-.4 2.6-.46C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.17 0-3.54 0-4.79.07-.98.05-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.06 1.25-.07 1.62-.07 4.79s0 3.54.07 4.79c.05.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.25.06 1.62.07 4.79.07s3.54 0 4.79-.07c.98-.05 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.06-1.25.07-1.62.07-4.79s0-3.54-.07-4.79c-.05-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.25-.06-1.62-.07-4.79-.07Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.7-2a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
                </svg>
                {t.instagram}
              </button>
            </div>
          )}
          {instagramHint && <p className="sound-share-hint">{t.instagramCopied}</p>}
        </div>
        <button type="button" className="sound-detail-btn" onClick={handleCopyLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
          {copied ? t.linkCopied : t.copyLink}
        </button>
      </div>

      <a
        href={WHATSAPP_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sound-whatsapp-channel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.03h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.42 3.6-8.02 8.03-8.02 2.14 0 4.15.84 5.67 2.35a7.96 7.96 0 0 1 2.34 5.68c0 4.42-3.6 8.14-8.03 8.14Zm4.4-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
        </svg>
        {t.joinChannel}
      </a>

      <details className="sound-detail-embed">
        <summary>{t.embed}</summary>
        <textarea className="sound-detail-embed-code" readOnly value={embedSnippet} onClick={(e) => e.currentTarget.select()} />
      </details>

      <p className="sound-detail-license">{t.license}</p>
    </div>
  );
}
