"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type TimerMode = "work" | "shortBreak" | "longBreak";

const strings = {
  es: {
    work: "Trabajo",
    shortBreak: "Descanso corto",
    longBreak: "Descanso largo",
    completedCycles: "Ciclos completados",
    start: "Iniciar",
    pause: "Pausar",
    reset: "Reiniciar",
    min: "min",
    privacy: "El temporizador funciona en tu navegador. No se guardan datos.",
  },
  en: {
    work: "Work",
    shortBreak: "Short break",
    longBreak: "Long break",
    completedCycles: "Completed cycles",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    min: "min",
    privacy: "The timer runs in your browser. No data is stored.",
  },
  pt: {
    work: "Trabalho",
    shortBreak: "Pausa curta",
    longBreak: "Pausa longa",
    completedCycles: "Ciclos completados",
    start: "Iniciar",
    pause: "Pausar",
    reset: "Reiniciar",
    min: "min",
    privacy: "O temporizador funciona no seu navegador. Nenhum dado é armazenado.",
  },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Web Audio not supported
  }
}

export default function PomodoroTimer({ lang }: Props) {
  const t = strings[lang];

  const [mode, setMode] = useState<TimerMode>("work");
  const [durations, setDurations] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = durations[mode] * 60;
  const elapsed = totalSeconds - secondsLeft;
  const progress = totalSeconds > 0 ? (elapsed / totalSeconds) * 100 : 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearTimer();
        setIsRunning(false);
        setFlash(true);
        playBeep();
        if (mode === "work") {
          setCycles((c) => c + 1);
        }
        setTimeout(() => setFlash(false), 800);
        return 0;
      }
      return prev - 1;
    });
  }, [clearTimer, mode]);

  const handleStart = useCallback(() => {
    if (isRunning) return;
    if (secondsLeft <= 0) {
      setSecondsLeft(durations[mode] * 60);
    }
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [isRunning, secondsLeft, durations, mode, tick]);

  const handlePause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const handleReset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(durations[mode] * 60);
    setFlash(false);
  }, [clearTimer, durations, mode]);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      clearTimer();
      setIsRunning(false);
      setMode(newMode);
      setSecondsLeft(durations[newMode] * 60);
      setFlash(false);
    },
    [clearTimer, durations]
  );

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const handleDurationChange = (field: keyof typeof durations, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 120) {
      const newDurations = { ...durations, [field]: num };
      setDurations(newDurations);
      if (mode === field) {
        setSecondsLeft(num * 60);
        clearTimer();
        setIsRunning(false);
      }
    }
  };

  const modeButtons: { key: TimerMode; label: string }[] = [
    { key: "work", label: t.work },
    { key: "shortBreak", label: t.shortBreak },
    { key: "longBreak", label: t.longBreak },
  ];

  const ringCircumference = 2 * Math.PI * 90;
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference;

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Mode selector */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {modeButtons.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => switchMode(key)}
              aria-pressed={mode === key}
              style={{
                flex: "1 1 auto",
                minWidth: "100px",
                minHeight: "44px",
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "10px",
                border: mode === key ? "2px solid #4f46e5" : "1px solid #d9dce7",
                backgroundColor: mode === key ? "#eef2ff" : "#ffffff",
                color: mode === key ? "#4f46e5" : "#374151",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Duration inputs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {modeButtons.map(({ key, label }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 120px", minWidth: "120px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {label} ({t.min})
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={durations[key]}
                onChange={(e) => handleDurationChange(key, e.target.value)}
                aria-label={`${label} ${t.min}`}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  minHeight: "44px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Timer display */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "32px 20px",
            backgroundColor: flash ? "#fef2f2" : "#f9f9f9",
            borderRadius: "16px",
            border: flash ? "2px solid #fca5a5" : "1px solid #eee",
            transition: "background-color 0.15s, border-color 0.15s",
          }}
        >
          {/* Progress ring */}
          <div style={{ position: "relative", width: "200px", height: "200px" }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={mode === "work" ? "#4f46e5" : mode === "shortBreak" ? "#22c55e" : "#f97316"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 100 100)"
                style={{ transition: "stroke-dashoffset 0.3s" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: flash ? "#dc2626" : "#111",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "1px",
                  transition: "color 0.15s",
                }}
              >
                {formatTime(secondsLeft)}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginTop: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {mode === "work" ? t.work : mode === "shortBreak" ? t.shortBreak : t.longBreak}
              </span>
            </div>
          </div>

          {/* Progress bar (alternative, simpler) */}
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "#e5e7eb",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: mode === "work" ? "#4f46e5" : mode === "shortBreak" ? "#22c55e" : "#f97316",
                  borderRadius: "3px",
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            {isRunning ? (
              <button
                type="button"
                className="tool-button-secondary"
                onClick={handlePause}
                style={{ minHeight: "44px", minWidth: "120px" }}
              >
                {t.pause}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStart}
                style={{
                  minHeight: "44px",
                  minWidth: "120px",
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                  color: "#ffffff",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 10px 18px rgba(79, 70, 229, 0.22)",
                }}
              >
                {t.start}
              </button>
            )}
            <button
              type="button"
              className="tool-button-secondary"
              onClick={handleReset}
              style={{ minHeight: "44px", minWidth: "120px" }}
            >
              {t.reset}
            </button>
          </div>
        </div>

        {/* Cycle counter */}
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0fdf4",
            borderRadius: "10px",
            border: "1px solid #bbf7d0",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "14px", color: "#15803d", fontWeight: 600 }}>
            {t.completedCycles}: <strong style={{ fontSize: "20px" }}>{cycles}</strong>
          </span>
        </div>

        {/* Privacy notice */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            fontSize: "13px",
            color: "#92400e",
            lineHeight: "1.5",
          }}
        >
          {t.privacy}
        </div>
      </div>
    </div>
  );
}
