"use client";

import { useState, useCallback, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type SummaryType = "short" | "medium" | "detailed" | "custom";
type ToneType = "clear" | "formal" | "academic" | "simple";

const strings = {
  es: {
    placeholder: "Pega o escribe el texto que quieres resumir...",
    maxCharsLabel: "Máximo de caracteres",
    summaryTypeLabel: "Tipo de resumen",
    toneLabel: "Tono",
    short: "Corto",
    medium: "Medio",
    detailed: "Detallado",
    custom: "Personalizado",
    clear: "Claro",
    formal: "Formal",
    academic: "Académico",
    simple: "Simple",
    summarize: "Resumir texto",
    pasteText: "Pegar texto",
    copyText: "Copiar resumen",
    copyStats: "Copiar estadísticas",
    downloadTxt: "Descargar TXT",
    clearText: "Limpiar",
    resultTitle: "Resumen generado",
    originalChars: "Caracteres originales",
    summaryChars: "Caracteres del resumen",
    originalWords: "Palabras originales",
    summaryWords: "Palabras del resumen",
    reduction: "Reducción aproximada",
    selectedLimit: "Límite elegido",
    privacy: "Tu texto se procesa en tu navegador. No se guarda ni se envía a servidores.",
    noText: "Pega o escribe un texto para resumir.",
    textTooShort: "El texto es demasiado corto para resumirlo.",
    limitTooLow: "El límite es muy bajo. Usa al menos 100 caracteres para obtener un resumen útil.",
    alreadyWithinLimit: "El texto ya está dentro del límite indicado.",
    pasteError: "No se pudo acceder al portapapeles. Pega el texto manualmente.",
    copied: "Resumen copiado",
    statsCopied: "Estadísticas copiadas",
    noTextToCopy: "No hay resumen para copiar",
    noStats: "Genera un resumen primero para ver estadísticas.",
  },
  en: {
    placeholder: "Paste or write the text you want to summarize...",
    maxCharsLabel: "Max characters",
    summaryTypeLabel: "Summary type",
    toneLabel: "Tone",
    short: "Short",
    medium: "Medium",
    detailed: "Detailed",
    custom: "Custom",
    clear: "Clear",
    formal: "Formal",
    academic: "Academic",
    simple: "Simple",
    summarize: "Summarize text",
    pasteText: "Paste text",
    copyText: "Copy summary",
    copyStats: "Copy stats",
    downloadTxt: "Download TXT",
    clearText: "Clear",
    resultTitle: "Generated summary",
    originalChars: "Original characters",
    summaryChars: "Summary characters",
    originalWords: "Original words",
    summaryWords: "Summary words",
    reduction: "Approximate reduction",
    selectedLimit: "Selected limit",
    privacy: "Your text is processed in your browser. It is not saved or sent to servers.",
    noText: "Paste or write a text to summarize.",
    textTooShort: "The text is too short to summarize.",
    limitTooLow: "The limit is too low. Use at least 100 characters for a useful summary.",
    alreadyWithinLimit: "The text is already within the selected limit.",
    pasteError: "Could not access clipboard. Paste text manually.",
    copied: "Summary copied",
    statsCopied: "Stats copied",
    noTextToCopy: "No summary to copy",
    noStats: "Generate a summary first to see stats.",
  },
  pt: {
    placeholder: "Cole ou escreva o texto que deseja resumir...",
    maxCharsLabel: "Máximo de caracteres",
    summaryTypeLabel: "Tipo de resumo",
    toneLabel: "Tom",
    short: "Curto",
    medium: "Médio",
    detailed: "Detalhado",
    custom: "Personalizado",
    clear: "Claro",
    formal: "Formal",
    academic: "Acadêmico",
    simple: "Simples",
    summarize: "Resumir texto",
    pasteText: "Colar texto",
    copyText: "Copiar resumo",
    copyStats: "Copiar estatísticas",
    downloadTxt: "Baixar TXT",
    clearText: "Limpar",
    resultTitle: "Resumo gerado",
    originalChars: "Caracteres originais",
    summaryChars: "Caracteres do resumo",
    originalWords: "Palavras originais",
    summaryWords: "Palavras do resumo",
    reduction: "Redução aproximada",
    selectedLimit: "Limite escolhido",
    privacy: "Seu texto é processado no navegador. Ele não é salvo nem enviado a servidores.",
    noText: "Cole ou escreva um texto para resumir.",
    textTooShort: "O texto é muito curto para resumir.",
    limitTooLow: "O limite é muito baixo. Use pelo menos 100 caracteres para obter um resumo útil.",
    alreadyWithinLimit: "O texto já está dentro do limite indicado.",
    pasteError: "Não foi possível acessar a área de transferência. Cole manualmente.",
    copied: "Resumo copiado",
    statsCopied: "Estatísticas copiadas",
    noTextToCopy: "Não há resumo para copiar",
    noStats: "Gere um resumo primeiro para ver estatísticas.",
  },
};

function splitSentences(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const raw = cleaned.split(/(?<=[.!?])\s+/);
  return raw.filter((s) => s.trim().length > 0);
}

function scoreSentence(
  sentence: string,
  index: number,
  totalSentences: number,
  importantWords: Set<string>
): number {
  let score = 0;
  if (index === 0) score += 3;
  if (index === 1) score += 2;
  if (index === totalSentences - 1) score += 1;
  if (index === totalSentences - 2) score += 1;
  const words = sentence.toLowerCase().replace(/[^a-záéíóúàâêôãõçüñ\s]/g, "").split(/\s+/).filter((w) => w.length > 2);
  const totalWords = words.length;
  if (totalWords === 0) return score;
  let matchCount = 0;
  for (const w of words) {
    if (importantWords.has(w)) matchCount++;
  }
  score += (matchCount / totalWords) * 5;
  const lengthPenalty = totalWords > 40 ? -1 : 0;
  score += lengthPenalty;
  return score;
}

function summarizeText(
  text: string,
  maxChars: number,
  summaryType: SummaryType
): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return "";

  const words = text.toLowerCase().replace(/[^a-záéíóúàâêôãõçüñ\s]/g, "").split(/\s+/).filter((w) => w.length > 3);
  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  const avgFreq = Object.values(freq).reduce((a, b) => a + b, 0) / (Object.keys(freq).length || 1);
  const importantWords = new Set<string>();
  for (const [w, c] of Object.entries(freq)) {
    if (c >= avgFreq && w.length > 3) importantWords.add(w);
  }

  const scored = sentences.map((s, i) => ({
    sentence: s,
    score: scoreSentence(s, i, sentences.length, importantWords),
    index: i,
  }));

  scored.sort((a, b) => b.score - a.score);

  const sentenceLimits: Record<SummaryType, number> = {
    short: 3,
    medium: 5,
    detailed: 8,
    custom: Math.max(3, Math.ceil(sentences.length * 0.4)),
  };

  const maxSentences = sentenceLimits[summaryType];
  let result = "";
  let selected = 0;

  scored.sort((a, b) => a.index - b.index);

  for (const item of scored) {
    if (selected >= maxSentences && summaryType !== "custom") break;
    const candidate = item.sentence;
    const tentative = result ? result + " " + candidate : candidate;

    if (tentative.length <= maxChars) {
      result = tentative;
      selected++;
    } else {
      const remaining = maxChars - result.length - 1;
      if (remaining > 20) {
        const truncated = candidate.substring(0, remaining - 3).trimEnd() + "...";
        const finalTentative = result ? result + " " + truncated : truncated;
        if (finalTentative.length <= maxChars) {
          result = finalTentative;
          selected++;
        }
      }
      break;
    }
  }

  return result.trim();
}

export default function TextSummarizer({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState("");
  const [maxChars, setMaxChars] = useState("500");
  const [summaryType, setSummaryType] = useState<SummaryType>("medium");
  const [tone, setTone] = useState<ToneType>("clear");
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const limitNum = parseInt(maxChars, 10);
  const limitValid = !isNaN(limitNum) && limitNum >= 100 && limitNum <= 10000;

  const originalChars = text.length;
  const originalWords = text.trim() ? text.trim().split(/\s+/).length : 0;
  const summaryChars = summary.length;
  const summaryWords = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const reductionPct =
    originalChars > 0 ? Math.round(((originalChars - summaryChars) / originalChars) * 100) : 0;

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  const handleSummarize = useCallback(() => {
    setFeedback(null);
    if (!text.trim()) {
      showFeedback(t.noText);
      return;
    }
    if (originalChars < 100) {
      showFeedback(t.textTooShort);
      return;
    }
    if (!limitValid) {
      showFeedback(t.limitTooLow);
      return;
    }
    if (originalChars <= limitNum) {
      showFeedback(t.alreadyWithinLimit);
      setSummary(text);
      return;
    }

    const result = summarizeText(text, limitNum, summaryType);
    if (!result) {
      showFeedback(t.textTooShort);
      return;
    }
    setSummary(result);
  }, [text, originalChars, limitValid, limitNum, summaryType, showFeedback, t]);

  const handleCopySummary = useCallback(async () => {
    if (!summary) {
      showFeedback(t.noTextToCopy);
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noTextToCopy);
    }
  }, [summary, showFeedback, t]);

  const handleCopyStats = useCallback(async () => {
    if (!summary) {
      showFeedback(t.noStats);
      return;
    }
    const statsLines = [
      `${t.originalChars}: ${originalChars}`,
      `${t.summaryChars}: ${summaryChars}`,
      `${t.originalWords}: ${originalWords}`,
      `${t.summaryWords}: ${summaryWords}`,
      `${t.reduction}: ${reductionPct}%`,
      `${t.selectedLimit}: ${limitValid ? limitNum : "-"}`,
    ];
    try {
      await navigator.clipboard.writeText(statsLines.join("\n"));
      showFeedback(t.statsCopied);
    } catch {
      showFeedback(t.noStats);
    }
  }, [summary, originalChars, summaryChars, originalWords, summaryWords, reductionPct, limitValid, limitNum, showFeedback, t]);

  const handleDownloadTxt = useCallback(() => {
    if (!summary) {
      showFeedback(t.noTextToCopy);
      return;
    }
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clipnexo-resumen.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [summary, showFeedback, t]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      showFeedback(t.pasteError);
    }
  }, [showFeedback, t]);

  const handleClear = useCallback(() => {
    setText("");
    setSummary("");
    setFeedback(null);
    setMaxChars("500");
    setSummaryType("medium");
    setTone("clear");
    textareaRef.current?.focus();
  }, []);

  const statCards = [
    { label: t.originalChars, value: originalChars.toLocaleString() },
    { label: t.summaryChars, value: summary ? summaryChars.toLocaleString() : "—" },
    { label: t.originalWords, value: originalWords.toLocaleString() },
    { label: t.summaryWords, value: summary ? summaryWords.toLocaleString() : "—" },
    { label: t.reduction, value: summary ? `${reductionPct}%` : "—" },
    { label: t.selectedLimit, value: maxChars ? `${limitNum.toLocaleString()}` : "—" },
  ];

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          aria-label={t.placeholder}
          style={{
            width: "100%",
            minHeight: "240px",
            padding: "20px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "2px solid #e5e7eb",
            outline: "none",
            transition: "border-color 0.2s",
            fontFamily: "inherit",
            lineHeight: "1.7",
            resize: "vertical",
            boxSizing: "border-box",
          }}
          placeholder={t.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Settings row */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "flex-end",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.maxCharsLabel}
            </label>
            <input
              type="number"
              min="100"
              max="10000"
              value={maxChars}
              onChange={(e) => setMaxChars(e.target.value)}
              aria-label={t.maxCharsLabel}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.summaryTypeLabel}
            </label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value as SummaryType)}
              aria-label={t.summaryTypeLabel}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <option value="short">{t.short}</option>
              <option value="medium">{t.medium}</option>
              <option value="detailed">{t.detailed}</option>
              <option value="custom">{t.custom}</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.toneLabel}
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneType)}
              aria-label={t.toneLabel}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
                minHeight: "44px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <option value="clear">{t.clear}</option>
              <option value="formal">{t.formal}</option>
              <option value="academic">{t.academic}</option>
              <option value="simple">{t.simple}</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}>
          <button type="button" className="tool-button-secondary" onClick={handlePaste} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.pasteText}</button>
          <button
            type="button"
            onClick={handleSummarize}
            style={{
              minHeight: "44px",
              flex: "1 0 auto",
              maxWidth: "200px",
              padding: "10px 24px",
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
              color: "white",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            {t.summarize}
          </button>
          <button type="button" className="tool-button-secondary" onClick={handleClear} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.clearText}</button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback.includes(t.copied) || feedback.includes(t.statsCopied) ? "#f0fdf4" : "#fef2f2",
              color: feedback.includes(t.copied) || feedback.includes(t.statsCopied) ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Result box */}
        {summary && (
          <div style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            border: "1px solid #eee",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: "0 0 12px" }}>
              {t.resultTitle}
            </h3>
            <div style={{
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#111",
              whiteSpace: "pre-wrap",
              marginBottom: "12px",
            }}>
              {summary}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button type="button" className="tool-button-secondary" onClick={handleCopySummary} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.copyText}</button>
              <button type="button" className="tool-button-secondary" onClick={handleCopyStats} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.copyStats}</button>
              <button type="button" className="tool-button-secondary" onClick={handleDownloadTxt} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.downloadTxt}</button>
            </div>
          </div>
        )}

        {/* Statistics */}
        {summary && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "12px",
          }}>
            {statCards.map((s, i) => (
              <div key={i} style={{
                padding: "14px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #eee",
              }}>
                <span style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  {s.label}
                </span>
                <strong style={{ fontSize: "20px", color: "#111" }}>{s.value}</strong>
              </div>
            ))}
          </div>
        )}

        {/* Privacy notice */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#fffbeb",
          border: "1px solid #fde68a",
          fontSize: "13px",
          color: "#92400e",
          lineHeight: "1.5",
        }}>
          {t.privacy}
        </div>
      </div>
    </div>
  );
}
