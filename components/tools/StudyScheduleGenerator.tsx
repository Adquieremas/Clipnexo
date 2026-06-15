"use client";

import { useState, useCallback } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type ScheduleEntry = {
  day: string;
  subject: string;
  timeBlock: string;
};

const strings = {
  es: {
    subjectsLabel: "Materias (separadas por coma)",
    daysLabel: "Días",
    mon: "Lun",
    tue: "Mar",
    wed: "Mié",
    thu: "Jue",
    fri: "Vie",
    sat: "Sáb",
    sun: "Dom",
    hoursPerDay: "Horas por día",
    blockDuration: "Duración de bloque",
    generate: "Generar horario",
    copy: "Copiar horario",
    download: "Descargar TXT",
    clear: "Limpiar",
    day: "Día",
    subject: "Materia",
    timeBlock: "Bloque",
    noEntries: "Selecciona materias, días y haz clic en Generar horario.",
    copied: "Horario copiado",
    downloaded: "Horario descargado",
    privacy: "La generación se realiza en tu navegador. No se guardan datos.",
    subjectsPlaceholder: "Ej: Matemáticas, Historia, Inglés, Física",
  },
  en: {
    subjectsLabel: "Subjects (comma separated)",
    daysLabel: "Days",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
    hoursPerDay: "Hours per day",
    blockDuration: "Block duration",
    generate: "Generate schedule",
    copy: "Copy schedule",
    download: "Download TXT",
    clear: "Clear",
    day: "Day",
    subject: "Subject",
    timeBlock: "Block",
    noEntries: "Select subjects, days and click Generate schedule.",
    copied: "Schedule copied",
    downloaded: "Schedule downloaded",
    privacy: "Generation is done in your browser. No data is stored.",
    subjectsPlaceholder: "e.g. Math, History, English, Physics",
  },
  pt: {
    subjectsLabel: "Matérias (separadas por vírgula)",
    daysLabel: "Dias",
    mon: "Seg",
    tue: "Ter",
    wed: "Qua",
    thu: "Qui",
    fri: "Sex",
    sat: "Sáb",
    sun: "Dom",
    hoursPerDay: "Horas por dia",
    blockDuration: "Duração do bloco",
    generate: "Gerar horário",
    copy: "Copiar horário",
    download: "Baixar TXT",
    clear: "Limpar",
    day: "Dia",
    subject: "Matéria",
    timeBlock: "Bloco",
    noEntries: "Selecione matérias, dias e clique em Gerar horário.",
    copied: "Horário copiado",
    downloaded: "Horário baixado",
    privacy: "A geração é feita no seu navegador. Nenhum dado é armazenado.",
    subjectsPlaceholder: "Ex: Matemática, História, Inglês, Física",
  },
};

const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const BLOCK_OPTIONS = [30, 45, 60, 90];

function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function StudyScheduleGenerator({ lang }: Props) {
  const t = strings[lang];

  const [subjectsInput, setSubjectsInput] = useState("");
  const [selectedDays, setSelectedDays] = useState<Set<DayKey>>(new Set(["mon", "tue", "wed", "thu", "fri"]));
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [blockMinutes, setBlockMinutes] = useState("60");
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const toggleDay = useCallback((day: DayKey) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  }, []);

  const generateSchedule = useCallback(() => {
    setFeedback(null);
    const subjects = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const days = DAYS.filter((d) => selectedDays.has(d));

    if (subjects.length === 0 || days.length === 0) {
      showFeedback(t.noEntries);
      return;
    }

    const totalHours = parseInt(hoursPerDay, 10) || 4;
    const blockMins = parseInt(blockMinutes, 10) || 60;
    const totalMinutesPerDay = totalHours * 60;
    const blocksPerDay = Math.floor(totalMinutesPerDay / blockMins);

    const entries: ScheduleEntry[] = [];
    let subjectIndex = 0;

    for (const day of days) {
      for (let b = 0; b < blocksPerDay; b++) {
        const startMin = b * blockMins;
        const endMin = startMin + blockMins;
        const timeBlock = `${t.timeBlock} ${b + 1}: ${minutesToTime(startMin)} - ${minutesToTime(endMin)}`;
        entries.push({
          day: t[day],
          subject: subjects[subjectIndex % subjects.length],
          timeBlock,
        });
        subjectIndex++;
      }
    }

    setSchedule(entries);
  }, [subjectsInput, selectedDays, hoursPerDay, blockMinutes, showFeedback, t]);

  const clearAll = useCallback(() => {
    setSubjectsInput("");
    setSelectedDays(new Set(["mon", "tue", "wed", "thu", "fri"]));
    setHoursPerDay("4");
    setBlockMinutes("60");
    setSchedule([]);
    setFeedback(null);
  }, []);

  const handleCopy = useCallback(async () => {
    if (schedule.length === 0) {
      showFeedback(t.noEntries);
      return;
    }
    const text = schedule
      .map((e) => `${e.day} | ${e.subject} | ${e.timeBlock}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noEntries);
    }
  }, [schedule, showFeedback, t]);

  const handleDownload = useCallback(() => {
    if (schedule.length === 0) {
      showFeedback(t.noEntries);
      return;
    }
    const text = schedule
      .map((e) => `${e.day} | ${e.subject} | ${e.timeBlock}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clipnexo-horario.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [schedule, showFeedback, t]);

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Subjects input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.subjectsLabel}
          </label>
          <textarea
            aria-label={t.subjectsLabel}
            placeholder={t.subjectsPlaceholder}
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "14px 16px",
              fontSize: "14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.6",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Days selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.daysLabel}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                aria-pressed={selectedDays.has(day)}
                style={{
                  minHeight: "44px",
                  minWidth: "60px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: selectedDays.has(day) ? "2px solid #4f46e5" : "1px solid #d1d5db",
                  backgroundColor: selectedDays.has(day) ? "#eef2ff" : "#ffffff",
                  color: selectedDays.has(day) ? "#4f46e5" : "#374151",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t[day]}
              </button>
            ))}
          </div>
        </div>

        {/* Hours per day & block duration */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px", minWidth: "160px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.hoursPerDay}
            </label>
            <input
              type="number"
              min="1"
              max="16"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              aria-label={t.hoursPerDay}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px", minWidth: "160px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.blockDuration}
            </label>
            <select
              value={blockMinutes}
              onChange={(e) => setBlockMinutes(e.target.value)}
              aria-label={t.blockDuration}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                width: "100%",
              }}
            >
              {BLOCK_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={generateSchedule}
            style={{
              minHeight: "44px",
              flex: "1 0 auto",
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
            {t.generate}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleCopy}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
          >
            {t.copy}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={handleDownload}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
          >
            {t.download}
          </button>
          <button
            type="button"
            className="tool-button-secondary"
            onClick={clearAll}
            style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}
          >
            {t.clear}
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback === t.copied || feedback === t.downloaded ? "#f0fdf4" : "#fef2f2",
              color: feedback === t.copied || feedback === t.downloaded ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Schedule output */}
        {schedule.length > 0 && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600 }}>
                      {t.day}
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600 }}>
                      {t.subject}
                    </th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#374151", fontWeight: 600 }}>
                      {t.timeBlock}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((entry, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 600, color: "#111" }}>
                        {entry.day}
                      </td>
                      <td style={{ padding: "8px 12px", color: "#374151" }}>
                        {entry.subject}
                      </td>
                      <td style={{ padding: "8px 12px", color: "#6b7280", fontSize: "13px" }}>
                        {entry.timeBlock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
