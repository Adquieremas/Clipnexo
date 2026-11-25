"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type TimeListener = (currentTime: number, duration: number) => void;

type SoundPlayerContextValue = {
  playingId: string | null;
  play: (id: string, url: string, onEnded?: () => void) => void;
  pause: () => void;
  toggle: (id: string, url: string, onEnded?: () => void) => void;
  seek: (id: string, time: number) => void;
  subscribeTime: (listener: TimeListener) => () => void;
};

const SoundPlayerContext = createContext<SoundPlayerContextValue | null>(null);

export function SoundPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const listenersRef = useRef<Set<TimeListener>>(new Set());
  const [playingId, setPlayingId] = useState<string | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.addEventListener("timeupdate", () => {
        listenersRef.current.forEach((fn) => fn(audio.currentTime, audio.duration || 0));
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlayingId(null);
  }, []);

  const play = useCallback(
    (id: string, url: string, onEnded?: () => void) => {
      const audio = ensureAudio();
      audio.pause();
      audio.src = url;
      audio.currentTime = 0;
      audio.onended = () => {
        setPlayingId(null);
        onEnded?.();
      };
      audio
        .play()
        .then(() => setPlayingId(id))
        .catch(() => setPlayingId(null));
    },
    [ensureAudio]
  );

  const toggle = useCallback(
    (id: string, url: string, onEnded?: () => void) => {
      if (playingId === id) {
        pause();
      } else {
        play(id, url, onEnded);
      }
    },
    [playingId, play, pause]
  );

  const seek = useCallback(
    (id: string, time: number) => {
      if (playingId !== id || !audioRef.current) return;
      audioRef.current.currentTime = time;
    },
    [playingId]
  );

  const subscribeTime = useCallback((listener: TimeListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return (
    <SoundPlayerContext.Provider value={{ playingId, play, pause, toggle, seek, subscribeTime }}>
      {children}
    </SoundPlayerContext.Provider>
  );
}

export function useSoundPlayer() {
  const ctx = useContext(SoundPlayerContext);
  if (!ctx) throw new Error("useSoundPlayer must be used within SoundPlayerProvider");
  return ctx;
}
