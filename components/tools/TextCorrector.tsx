"use client";

import { useState, useCallback, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type Issue = {
  type: "doubleSpace" | "repeatedPunctuation" | "longSentence" | "excessCaps" | "repeatedWord";
  message: string;
  positions: number[];
};

const strings = {
  es: {
    placeholder: "Escribe o pega el texto que quieres revisar...",
    review: "Revisar texto",
    pasteText: "Pegar texto",
    copyCorrected: "Copiar corregido",
    clear: "Limpiar",
    applyFixes: "Aplicar correcciones",
    findingsTitle: "Hallazgos",
    doubleSpaces: "Dobles espacios",
    repeatedPunctuation: "Puntuación repetida",
    longSentences: "Oraciones muy largas (&gt;40 palabras)",
    excessCaps: "Uso excesivo de mayúsculas",
    repeatedWords: "Palabras consecutivas repetidas",
    issuesFound: "Problemas encontrados",
    correctionsMade: "Correcciones realizadas",
    correctedText: "Texto corregido",
    noIssues: "No se encontraron problemas en el texto.",
    noText: "Escribe o pega un texto para revisar.",
    textTooShort: "El texto es muy corto. Escribe al menos 20 caracteres.",
    pasteError: "No se pudo acceder al portapapeles. Pega el texto manualmente.",
    copied: "Texto copiado",
    noResult: "Primero revisa y corrige un texto.",
    disclaimer: "Esta es una revisión básica. Revisa siempre el texto final.",
    privacy: "Tu texto se analiza en tu navegador. No se guarda ni se envía a servidores.",
    atPosition: "en posición",
    fixApplied: "Correcciones aplicadas",
  },
  en: {
    placeholder: "Type or paste the text you want to check...",
    review: "Review text",
    pasteText: "Paste text",
    copyCorrected: "Copy corrected",
    clear: "Clear",
    applyFixes: "Apply fixes",
    findingsTitle: "Findings",
    doubleSpaces: "Double spaces",
    repeatedPunctuation: "Repeated punctuation",
    longSentences: "Very long sentences (&gt;40 words)",
    excessCaps: "Excessive use of capital letters",
    repeatedWords: "Repeated consecutive words",
    issuesFound: "Issues found",
    correctionsMade: "Corrections made",
    correctedText: "Corrected text",
    noIssues: "No issues found in the text.",
    noText: "Type or paste text to review.",
    textTooShort: "The text is too short. Write at least 20 characters.",
    pasteError: "Could not access clipboard. Paste manually.",
    copied: "Text copied",
    noResult: "First review and correct a text.",
    disclaimer: "This is a basic review. Always check the final text.",
    privacy: "Your text is analyzed in your browser. It is not saved or sent to servers.",
    atPosition: "at position",
    fixApplied: "Fixes applied",
  },
  pt: {
    placeholder: "Digite ou cole o texto que deseja revisar...",
    review: "Revisar texto",
    pasteText: "Colar texto",
    copyCorrected: "Copiar corrigido",
    clear: "Limpar",
    applyFixes: "Aplicar correções",
    findingsTitle: "Resultados",
    doubleSpaces: "Espaços duplos",
    repeatedPunctuation: "Pontuação repetida",
    longSentences: "Frases muito longas (&gt;40 palavras)",
    excessCaps: "Uso excessivo de maiúsculas",
    repeatedWords: "Palavras consecutivas repetidas",
    issuesFound: "Problemas encontrados",
    correctionsMade: "Correções realizadas",
    correctedText: "Texto corrigido",
    noIssues: "Nenhum problema encontrado no texto.",
    noText: "Digite ou cole um texto para revisar.",
    textTooShort: "O texto é muito curto. Escreva pelo menos 20 caracteres.",
    pasteError: "Não foi possível acessar a área de transferência. Cole manualmente.",
    copied: "Texto copiado",
    noResult: "Primeiro revise e corrija um texto.",
    disclaimer: "Esta é uma revisão básica. Sempre revise o texto final.",
    privacy: "Seu texto é analisado no navegador. Não é salvo nem enviado a servidores.",
    atPosition: "na posição",
    fixApplied: "Correções aplicadas",
  },
};

function findDoubleSpaces(text: string): number[] {
  const positions: number[] = [];
  let match: RegExpExecArray | null;
  const regex = /  +/g;
  while ((match = regex.exec(text)) !== null) {
    positions.push(match.index);
  }
  return positions;
}

function findRepeatedPunctuation(text: string): number[] {
  const positions: number[] = [];
  const regex = /([!?.])\1+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    positions.push(match.index);
  }
  return positions;
}

function findLongSentences(text: string): number[] {
  const positions: number[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let pos = 0;
  for (const s of sentences) {
    const wordCount = s.trim() ? s.trim().split(/\s+/).length : 0;
    if (wordCount > 40) {
      positions.push(pos);
    }
    pos += s.length + 1;
  }
  return positions;
}

function findExcessCaps(text: string): number[] {
  const positions: number[] = [];
  const words = text.split(/\s+/);
  let pos = 0;
  for (const w of words) {
    if (w.length > 2 && w === w.toUpperCase() && /[A-Z]{3,}/.test(w)) {
      // Check if entire text is caps (skip)
      const upperCount = (text.match(/[A-Z]/g) || []).length;
      const lowerCount = (text.match(/[a-z]/g) || []).length;
      if (lowerCount > 0 && upperCount > lowerCount * 0.7) {
        // More than 70% caps relative to lowercase, flag individual words
        positions.push(pos);
      }
    }
    pos += w.length + 1;
  }
  return positions;
}

function findRepeatedWords(text: string): number[] {
  const positions: number[] = [];
  const words = text.split(/\s+/);
  let pos = 0;
  for (let i = 0; i < words.length - 1; i++) {
    const current = words[i].toLowerCase().replace(/[^a-záéíóúàâêôãõçüñ]/g, "");
    const next = words[i + 1].toLowerCase().replace(/[^a-záéíóúàâêôãõçüñ]/g, "");
    if (current && next && current === next && current.length > 1) {
      positions.push(pos);
    }
    pos += words[i].length + 1;
  }
  return positions;
}

function applyFixes(text: string): { corrected: string; fixesApplied: number } {
  let result = text;
  let fixes = 0;

  // Fix double spaces
  const doubleSpaces = findDoubleSpaces(result);
  result = result.replace(/  +/g, " ");
  fixes += doubleSpaces.length;

  // Fix repeated punctuation
  const rp = findRepeatedPunctuation(result);
  result = result.replace(/([!?.])\1+/g, "$1");
  fixes += rp.length;

  // Fix repeated consecutive words
  result = result.replace(/\b(\w+)\s+\1\b/gi, (match, word) => {
    fixes++;
    return word;
  });

  // Clean trailing/leading spaces
  result = result.replace(/\s{2,}/g, " ").trim();

  return { corrected: result, fixesApplied: fixes };
}

export default function TextCorrector({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [correctedText, setCorrectedText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fixesApplied, setFixesApplied] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  const handleReview = useCallback(() => {
    setFeedback(null);
    setCorrectedText("");
    setFixesApplied(0);

    if (!text.trim()) {
      showFeedback(t.noText);
      return;
    }
    if (text.length < 20) {
      showFeedback(t.textTooShort);
      return;
    }

    const foundIssues: Issue[] = [];

    const doubleSpacePositions = findDoubleSpaces(text);
    if (doubleSpacePositions.length > 0) {
      foundIssues.push({
        type: "doubleSpace",
        message: t.doubleSpaces,
        positions: doubleSpacePositions,
      });
    }

    const repeatedPunctPositions = findRepeatedPunctuation(text);
    if (repeatedPunctPositions.length > 0) {
      foundIssues.push({
        type: "repeatedPunctuation",
        message: t.repeatedPunctuation,
        positions: repeatedPunctPositions,
      });
    }

    const longSentencePositions = findLongSentences(text);
    if (longSentencePositions.length > 0) {
      foundIssues.push({
        type: "longSentence",
        message: t.longSentences,
        positions: longSentencePositions,
      });
    }

    const excessCapsPositions = findExcessCaps(text);
    if (excessCapsPositions.length > 0) {
      foundIssues.push({
        type: "excessCaps",
        message: t.excessCaps,
        positions: excessCapsPositions,
      });
    }

    const repeatedWordPositions = findRepeatedWords(text);
    if (repeatedWordPositions.length > 0) {
      foundIssues.push({
        type: "repeatedWord",
        message: t.repeatedWords,
        positions: repeatedWordPositions,
      });
    }

    setIssues(foundIssues);
    if (foundIssues.length === 0) {
      setCorrectedText(text);
    }
  }, [text, showFeedback, t]);

  const handleApplyFixes = useCallback(() => {
    if (!text.trim()) return;
    const { corrected, fixesApplied: fixes } = applyFixes(text);
    setCorrectedText(corrected);
    setFixesApplied(fixes);
    setFeedback(null);
  }, [text]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      showFeedback(t.pasteError);
    }
  }, [showFeedback, t]);

  const handleCopyCorrected = useCallback(async () => {
    if (!correctedText) {
      showFeedback(t.noResult);
      return;
    }
    try {
      await navigator.clipboard.writeText(correctedText);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noResult);
    }
  }, [correctedText, showFeedback, t]);

  const handleClear = useCallback(() => {
    setText("");
    setIssues([]);
    setCorrectedText("");
    setFixesApplied(0);
    setFeedback(null);
    textareaRef.current?.focus();
  }, []);

  const totalIssues = issues.reduce((sum, issue) => sum + issue.positions.length, 0);

  const getIssueColor = (type: Issue["type"]) => {
    switch (type) {
      case "doubleSpace": return "#ef4444";
      case "repeatedPunctuation": return "#f59e0b";
      case "longSentence": return "#6366f1";
      case "excessCaps": return "#ec4899";
      case "repeatedWord": return "#10b981";
      default: return "#6b7280";
    }
  };

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

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <button type="button" className="tool-button-secondary" onClick={handlePaste} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.pasteText}</button>
          <button
            type="button"
            onClick={handleReview}
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
            {t.review}
          </button>
          <button type="button" className="tool-button-secondary" onClick={handleClear} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.clear}</button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback.includes(t.copied) || feedback.includes(t.fixApplied) ? "#f0fdf4" : "#fef2f2",
              color: feedback.includes(t.copied) || feedback.includes(t.fixApplied) ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Findings */}
        {issues.length > 0 && (
          <div style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            border: "1px solid #eee",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: "0 0 12px" }}>
              {t.findingsTitle} ({totalIssues})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {issues.map((issue, idx) => (
                <div key={idx} style={{
                  padding: "12px 16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: `2px solid ${getIssueColor(issue.type)}20`,
                  fontSize: "14px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: getIssueColor(issue.type),
                    }} />
                    <strong style={{ color: "#111" }}>{issue.message}</strong>
                    <span style={{ color: "#6b7280", fontSize: "13px" }}>
                      ({issue.positions.length})
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", paddingLeft: "18px" }}>
                    {issue.positions.slice(0, 5).map((pos, i) => (
                      <span key={i}>{i > 0 ? ", " : ""}{t.atPosition} {pos}</span>
                    ))}
                    {issue.positions.length > 5 && (
                      <span> +{issue.positions.length - 5} más</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px" }}>
              <button
                type="button"
                onClick={handleApplyFixes}
                style={{
                  minHeight: "44px",
                  padding: "10px 24px",
                  background: "linear-gradient(90deg, #10b981, #6366f1)",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {t.applyFixes}
              </button>
            </div>
          </div>
        )}

        {/* No issues found */}
        {issues.length === 0 && correctedText && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            fontSize: "14px",
            color: "#166534",
            fontWeight: 500,
          }}>
            {t.noIssues}
          </div>
        )}

        {/* Corrected text */}
        {correctedText && (
          <div style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            border: "1px solid #eee",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: "0 0 12px" }}>
              {t.correctedText}
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
              {correctedText}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <button type="button" className="tool-button-secondary" onClick={handleCopyCorrected} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "220px" }}>{t.copyCorrected}</button>
              {fixesApplied > 0 && (
                <span style={{ fontSize: "13px", color: "#166534", fontWeight: 500 }}>
                  {fixesApplied} {t.correctionsMade.toLowerCase()}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {issues.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "12px",
          }}>
            <div style={{
              padding: "14px",
              backgroundColor: "#fef2f2",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #fecaca",
            }}>
              <span style={{ display: "block", fontSize: "11px", color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                {t.issuesFound}
              </span>
              <strong style={{ fontSize: "22px", color: "#991b1b" }}>{totalIssues}</strong>
            </div>
            {fixesApplied > 0 && (
              <div style={{
                padding: "14px",
                backgroundColor: "#f0fdf4",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #bbf7d0",
              }}>
                <span style={{ display: "block", fontSize: "11px", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  {t.correctionsMade}
                </span>
                <strong style={{ fontSize: "22px", color: "#166534" }}>{fixesApplied}</strong>
              </div>
            )}
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
