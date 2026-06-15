"use client";

import { useState, useCallback, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type ParaphraseStyle = "clear" | "formal" | "simple" | "academic";

const strings = {
  es: {
    placeholder: "Escribe o pega el texto que quieres parafrasear...",
    styleLabel: "Estilo",
    clear: "Claro",
    formal: "Formal",
    simple: "Simple",
    academic: "Académico",
    paraphrase: "Parafrasear",
    pasteText: "Pegar texto",
    copyResult: "Copiar resultado",
    copyStats: "Copiar estadísticas",
    downloadTxt: "Descargar TXT",
    clearBtn: "Limpiar",
    resultTitle: "Texto parafraseado",
    originalChars: "Caracteres originales",
    paraphrasedChars: "Caracteres parafraseados",
    originalWords: "Palabras originales",
    paraphrasedWords: "Palabras parafraseadas",
    reduction: "Reducción",
    privacy: "Tu texto se procesa en tu navegador. No se guarda ni se envía a servidores.",
    noText: "Escribe o pega un texto para parafrasear.",
    textTooShort: "El texto es demasiado corto para parafrasearlo. Usa al menos 50 caracteres.",
    pasteError: "No se pudo acceder al portapapeles. Pega el texto manualmente.",
    copied: "Resultado copiado",
    statsCopied: "Estadísticas copiadas",
    noResult: "Parafrasea un texto primero.",
    downloaded: "Descargado",
    disclaimer: "Usa esta herramienta como apoyo para mejorar tu redacción. No la uses para copiar trabajos ajenos.",
  },
  en: {
    placeholder: "Type or paste the text you want to paraphrase...",
    styleLabel: "Style",
    clear: "Clear",
    formal: "Formal",
    simple: "Simple",
    academic: "Academic",
    paraphrase: "Paraphrase",
    pasteText: "Paste text",
    copyResult: "Copy result",
    copyStats: "Copy stats",
    downloadTxt: "Download TXT",
    clearBtn: "Clear",
    resultTitle: "Paraphrased text",
    originalChars: "Original characters",
    paraphrasedChars: "Paraphrased characters",
    originalWords: "Original words",
    paraphrasedWords: "Paraphrased words",
    reduction: "Reduction",
    privacy: "Your text is processed in your browser. It is not saved or sent to servers.",
    noText: "Type or paste a text to paraphrase.",
    textTooShort: "The text is too short to paraphrase. Use at least 50 characters.",
    pasteError: "Could not access clipboard. Paste text manually.",
    copied: "Result copied",
    statsCopied: "Stats copied",
    noResult: "Paraphrase a text first.",
    downloaded: "Downloaded",
    disclaimer: "Use this tool as support to improve your writing. Do not use it to copy others' work.",
  },
  pt: {
    placeholder: "Digite ou cole o texto que deseja parafrasear...",
    styleLabel: "Estilo",
    clear: "Claro",
    formal: "Formal",
    simple: "Simples",
    academic: "Acadêmico",
    paraphrase: "Parafrasear",
    pasteText: "Colar texto",
    copyResult: "Copiar resultado",
    copyStats: "Copiar estatísticas",
    downloadTxt: "Baixar TXT",
    clearBtn: "Limpar",
    resultTitle: "Texto parafraseado",
    originalChars: "Caracteres originais",
    paraphrasedChars: "Caracteres parafraseados",
    originalWords: "Palavras originais",
    paraphrasedWords: "Palavras parafraseadas",
    reduction: "Redução",
    privacy: "Seu texto é processado no navegador. Não é salvo nem enviado a servidores.",
    noText: "Digite ou cole um texto para parafrasear.",
    textTooShort: "O texto é muito curto para parafrasear. Use pelo menos 50 caracteres.",
    pasteError: "Não foi possível acessar a área de transferência. Cole manualmente.",
    copied: "Resultado copiado",
    statsCopied: "Estatísticas copiadas",
    noResult: "Parafraseie um texto primeiro.",
    downloaded: "Baixado",
    disclaimer: "Use esta ferramenta como apoio para melhorar sua redação. Não a use para copiar trabalhos de terceiros.",
  },
};

const SYNONYMS_ES: Record<string, string[]> = {
  "importante": ["relevante", "significativo", "crucial", "fundamental", "esencial"],
  "bueno": ["adecuado", "favorable", "positivo", "conveniente", "óptimo"],
  "malo": ["negativo", "desfavorable", "perjudicial", "adverso", "nocivo"],
  "grande": ["amplio", "extenso", "considerable", "notable", "significativo"],
  "pequeño": ["reducido", "limitado", "menor", "escaso", "mínimo"],
  "hacer": ["realizar", "efectuar", "elaborar", "llevar a cabo", "ejecutar"],
  "decir": ["mencionar", "expresar", "señalar", "indicar", "manifestar"],
  "tener": ["poseer", "disponer de", "contar con", "presentar"],
  "ver": ["observar", "apreciar", "notar", "percibir", "distinguir"],
  "mucho": ["abundante", "numeroso", "considerable", "cuantioso"],
};

const SYNONYMS_EN: Record<string, string[]> = {
  "important": ["relevant", "significant", "crucial", "essential", "fundamental"],
  "good": ["adequate", "favorable", "positive", "beneficial", "suitable"],
  "bad": ["negative", "unfavorable", "harmful", "adverse"],
  "big": ["large", "extensive", "considerable", "substantial"],
  "small": ["reduced", "limited", "minor", "minimal"],
  "make": ["create", "produce", "develop", "generate", "build"],
  "say": ["mention", "express", "state", "indicate", "note"],
  "have": ["possess", "hold", "contain", "feature"],
  "see": ["observe", "notice", "perceive", "identify"],
  "many": ["numerous", "various", "multiple", "several"],
};

const SYNONYMS_PT: Record<string, string[]> = {
  "importante": ["relevante", "significativo", "crucial", "fundamental", "essencial"],
  "bom": ["adequado", "favorável", "positivo", "conveniente", "ótimo"],
  "ruim": ["negativo", "desfavorável", "prejudicial", "adverso"],
  "grande": ["amplo", "extenso", "considerável", "notável"],
  "pequeno": ["reduzido", "limitado", "menor", "mínimo"],
  "fazer": ["realizar", "efetuar", "elaborar", "executar", "produzir"],
  "dizer": ["mencionar", "expressar", "indicar", "afirmar", "declarar"],
  "ter": ["possuir", "dispor de", "contar com", "apresentar"],
  "ver": ["observar", "notar", "perceber", "identificar"],
  "muito": ["bastante", "diversos", "numeroso", "considerável"],
};

function getSynonyms(lang: SupportedLang): Record<string, string[]> {
  if (lang === "pt") return SYNONYMS_PT;
  if (lang === "en") return SYNONYMS_EN;
  return SYNONYMS_ES;
}

function paraphraseSentence(
  sentence: string,
  style: ParaphraseStyle,
  lang: SupportedLang
): string {
  let result = sentence.trim();
  if (!result) return result;

  const synonyms = getSynonyms(lang);

  // Replace some common words with synonyms (only one per sentence to avoid weirdness)
  const words = result.split(/\s+/);
  const replaceableWords: Record<string, string[]> = {};

  for (const [key, syns] of Object.entries(synonyms)) {
    const idx = words.findIndex(
      (w) => w.toLowerCase().replace(/[^a-záéíóúàâêôãõçüñ]/g, "") === key
    );
    if (idx >= 0 && !replaceableWords[key]) {
      replaceableWords[key] = syns;
    }
  }

  if (Object.keys(replaceableWords).length > 0) {
    const keys = Object.keys(replaceableWords);
    const keyToReplace = keys[Math.floor(Math.random() * keys.length)];
    const syns = replaceableWords[keyToReplace];
    const replacement = syns[Math.floor(Math.random() * syns.length)];
    const regex = new RegExp(`\\b${keyToReplace}\\b`, "i");
    result = result.replace(regex, replacement);
  }

  // Shuffle word order of middle words slightly for longer sentences
  const wordArr = result.split(/\s+/);
  if (wordArr.length > 6 && wordArr.length <= 20) {
    const start = 2;
    const end = wordArr.length - 2;
    if (end - start >= 2) {
      const midWords = wordArr.slice(start, end);
      // Simple shuffle: swap adjacent pairs
      for (let i = 0; i < midWords.length - 1; i += 2) {
        [midWords[i], midWords[i + 1]] = [midWords[i + 1], midWords[i]];
      }
      result = [...wordArr.slice(0, start), ...midWords, ...wordArr.slice(end)].join(" ");
    }
  }

  // Style adjustments
  if (style === "formal") {
    result = result.replace(/\b(es muy|es bastante|es súper)\b/gi, "es considerablemente");
    result = result.replace(/\b(muy)\b/gi, "notablemente");
    result = result.replace(/\b(bastante)\b/gi, "considerablemente");
  }

  // Clean double spaces
  result = result.replace(/\s{2,}/g, " ").trim();

  return result;
}

function paraphraseText(text: string, style: ParaphraseStyle, lang: SupportedLang): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length === 0 && text.trim()) {
    return paraphraseSentence(text, style, lang);
  }

  const paraphrased = sentences.map((s) => paraphraseSentence(s, style, lang));
  let result = paraphrased.join(" ");

  // Clean up
  result = result.replace(/\s{2,}/g, " ").trim();

  // Add remaining text after last punctuation
  const lastPunctIdx = text.search(/[.!?][^.!?]*$/);
  if (lastPunctIdx >= 0) {
    const remaining = text.substring(text.lastIndexOf(text.match(/[.!?]/g)?.pop() || "") + 1).trim();
    if (remaining) {
      result += " " + remaining;
    }
  }

  return result;
}

export default function TextParaphraser({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState("");
  const [style, setStyle] = useState<ParaphraseStyle>("clear");
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const originalChars = text.length;
  const originalWords = text.trim() ? text.trim().split(/\s+/).length : 0;
  const paraphrasedChars = result.length;
  const paraphrasedWords = result.trim() ? result.trim().split(/\s+/).length : 0;
  const reductionPct =
    originalChars > 0
      ? Math.round(((originalChars - paraphrasedChars) / originalChars) * 100)
      : 0;

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  const handleParaphrase = useCallback(() => {
    setFeedback(null);
    if (!text.trim()) {
      showFeedback(t.noText);
      return;
    }
    if (text.length < 50) {
      showFeedback(t.textTooShort);
      return;
    }
    const paraphrased = paraphraseText(text, style, lang);
    setResult(paraphrased);
  }, [text, style, lang, showFeedback, t]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      showFeedback(t.pasteError);
    }
  }, [showFeedback, t]);

  const handleCopyResult = useCallback(async () => {
    if (!result) {
      showFeedback(t.noResult);
      return;
    }
    try {
      await navigator.clipboard.writeText(result);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noResult);
    }
  }, [result, showFeedback, t]);

  const handleCopyStats = useCallback(async () => {
    if (!result) {
      showFeedback(t.noResult);
      return;
    }
    const statsLines = [
      `${t.originalChars}: ${originalChars}`,
      `${t.paraphrasedChars}: ${paraphrasedChars}`,
      `${t.originalWords}: ${originalWords}`,
      `${t.paraphrasedWords}: ${paraphrasedWords}`,
      `${t.reduction}: ${reductionPct}%`,
    ];
    try {
      await navigator.clipboard.writeText(statsLines.join("\n"));
      showFeedback(t.statsCopied);
    } catch {
      showFeedback(t.noResult);
    }
  }, [result, originalChars, paraphrasedChars, originalWords, paraphrasedWords, reductionPct, showFeedback, t]);

  const handleDownloadTxt = useCallback(() => {
    if (!result) {
      showFeedback(t.noResult);
      return;
    }
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clipnexo-parafraseo.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [result, showFeedback, t]);

  const handleClear = useCallback(() => {
    setText("");
    setResult("");
    setFeedback(null);
    setStyle("clear");
    textareaRef.current?.focus();
  }, []);

  const statCards = [
    { label: t.originalChars, value: originalChars.toLocaleString() },
    { label: t.paraphrasedChars, value: result ? paraphrasedChars.toLocaleString() : "—" },
    { label: t.originalWords, value: originalWords.toLocaleString() },
    { label: t.paraphrasedWords, value: result ? paraphrasedWords.toLocaleString() : "—" },
    { label: t.reduction, value: result ? `${reductionPct}%` : "—" },
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

        {/* Style selector + Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px", minWidth: "160px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.styleLabel}
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as ParaphraseStyle)}
              aria-label={t.styleLabel}
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
              <option value="simple">{t.simple}</option>
              <option value="academic">{t.academic}</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <button type="button" className="tool-button-secondary" onClick={handlePaste} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.pasteText}</button>
          <button
            type="button"
            onClick={handleParaphrase}
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
            {t.paraphrase}
          </button>
          <button type="button" className="tool-button-secondary" onClick={handleClear} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.clearBtn}</button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback.includes(t.copied) || feedback.includes(t.statsCopied) || feedback.includes(t.downloaded) ? "#f0fdf4" : "#fef2f2",
              color: feedback.includes(t.copied) || feedback.includes(t.statsCopied) || feedback.includes(t.downloaded) ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Result box */}
        {result && (
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
              {result}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button type="button" className="tool-button-secondary" onClick={handleCopyResult} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.copyResult}</button>
              <button type="button" className="tool-button-secondary" onClick={handleCopyStats} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.copyStats}</button>
              <button type="button" className="tool-button-secondary" onClick={handleDownloadTxt} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.downloadTxt}</button>
            </div>
          </div>
        )}

        {/* Statistics */}
        {result && (
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

        {/* Disclaimer */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#fefce8",
          border: "1px solid #fde68a",
          fontSize: "13px",
          color: "#854d0e",
          lineHeight: "1.5",
        }}>
          {t.disclaimer}
        </div>

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
