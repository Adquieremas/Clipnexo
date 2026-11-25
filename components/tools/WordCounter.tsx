"use client";

import { useState, useCallback, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type LimitType = "words" | "characters";

const strings = {
  es: {
    placeholder: "Escribe o pega tu texto aquí...",
    words: "Palabras",
    characters: "Caracteres",
    charactersNoSpaces: "Caracteres sin espacios",
    paragraphs: "Párrafos",
    lines: "Líneas",
    sentences: "Oraciones",
    readingTime: "Tiempo de lectura",
    speakingTime: "Tiempo de habla",
    avgWordsPerSentence: "Promedio de palabras por oración",
    readability: "Nivel de legibilidad",
    readabilityEasy: "Fácil",
    readabilityMedium: "Medio",
    readabilityHard: "Difícil",
    readabilityNote: "Estimación básica según la longitud promedio de las oraciones.",
    copyText: "Copiar texto",
    copyStats: "Copiar estadísticas",
    downloadTxt: "Descargar TXT",
    pasteText: "Pegar texto",
    clear: "Limpiar",
    copied: "Texto copiado",
    statsCopied: "Estadísticas copiadas",
    noText: "No hay texto para copiar",
    noTextStats: "No hay texto para exportar",
    pasteError: "No se pudo acceder al portapapeles. Pega el texto manualmente.",
    downloaded: "Descargado",
    checkLimit: "Comprobar límite",
    limitWords: "Límite de palabras",
    limitCharacters: "Límite de caracteres",
    limitUsed: "usado",
    limitRemaining: "Te quedan",
    limitExceeded: "Superaste el límite por",
    limitPlaceholder: "Ingresa un número",
    mostRepeatedWords: "Palabras más repetidas",
    word: "Palabra",
    repetitions: "Repeticiones",
    percentage: "Porcentaje",
    noWordsYet: "Escribe texto para ver palabras repetidas.",
    privacy: "Tu texto se analiza en tu navegador. No se guarda ni se envía a servidores.",
  },
  en: {
    placeholder: "Type or paste your text here...",
    words: "Words",
    characters: "Characters",
    charactersNoSpaces: "Characters (no spaces)",
    paragraphs: "Paragraphs",
    lines: "Lines",
    sentences: "Sentences",
    readingTime: "Reading time",
    speakingTime: "Speaking time",
    avgWordsPerSentence: "Avg words per sentence",
    readability: "Readability level",
    readabilityEasy: "Easy",
    readabilityMedium: "Medium",
    readabilityHard: "Hard",
    readabilityNote: "Basic estimate based on average sentence length.",
    copyText: "Copy text",
    copyStats: "Copy stats",
    downloadTxt: "Download TXT",
    pasteText: "Paste text",
    clear: "Clear",
    copied: "Text copied",
    statsCopied: "Stats copied",
    noText: "No text to copy",
    noTextStats: "No text to export",
    pasteError: "Could not access clipboard. Paste manually.",
    downloaded: "Downloaded",
    checkLimit: "Check limit",
    limitWords: "Word limit",
    limitCharacters: "Character limit",
    limitUsed: "used",
    limitRemaining: "You have",
    limitExceeded: "You exceeded the limit by",
    limitPlaceholder: "Enter a number",
    mostRepeatedWords: "Most repeated words",
    word: "Word",
    repetitions: "Repetitions",
    percentage: "Percentage",
    noWordsYet: "Type text to see repeated words.",
    privacy: "Your text is analyzed in your browser. It is not stored or sent to servers.",
  },
  pt: {
    placeholder: "Digite ou cole seu texto aqui...",
    words: "Palavras",
    characters: "Caracteres",
    charactersNoSpaces: "Caracteres sem espaços",
    paragraphs: "Parágrafos",
    lines: "Linhas",
    sentences: "Frases",
    readingTime: "Tempo de leitura",
    speakingTime: "Tempo de fala",
    avgWordsPerSentence: "Média de palavras por frase",
    readability: "Nível de legibilidade",
    readabilityEasy: "Fácil",
    readabilityMedium: "Médio",
    readabilityHard: "Difícil",
    readabilityNote: "Estimativa básica com base no comprimento médio das frases.",
    copyText: "Copiar texto",
    copyStats: "Copiar estatísticas",
    downloadTxt: "Baixar TXT",
    pasteText: "Colar texto",
    clear: "Limpar",
    copied: "Texto copiado",
    statsCopied: "Estatísticas copiadas",
    noText: "Não há texto para copiar",
    noTextStats: "Não há texto para exportar",
    pasteError: "Não foi possível acessar a área de transferência. Cole manualmente.",
    downloaded: "Baixado",
    checkLimit: "Verificar limite",
    limitWords: "Limite de palavras",
    limitCharacters: "Limite de caracteres",
    limitUsed: "usado",
    limitRemaining: "Restam",
    limitExceeded: "Você excedeu o limite em",
    limitPlaceholder: "Insira um número",
    mostRepeatedWords: "Palavras mais repetidas",
    word: "Palavra",
    repetitions: "Repetições",
    percentage: "Porcentagem",
    noWordsYet: "Digite texto para ver palavras repetidas.",
    privacy: "Seu texto é analisado no navegador. Não é armazenado nem enviado a servidores.",
  },
};

const STOP_WORDS_ES = new Set(["de", "la", "el", "los", "las", "un", "una", "y", "o", "en", "para", "por", "con", "que", "es", "a", "se", "del", "al", "su", "lo", "le", "no", "más", "pero", "ya", "este", "esta", "entre", "todo", "como", "solo", "sin", "cada", "puede", "tiene", "muy", "era", "son", "han", "fue", "ella", "ello", "sus", "ser", "haber", "tengo", "hace", "así", "también", "porque", "cuando", "donde", "quien", "cual", "ese", "esa", "eso", "esos", "esas", "uno", "dos", "tres", "bien", "mal", "tan", "qué", "sí", "ni", "te", "me", "nos", "se", "mi", "tu", "él"]);
const STOP_WORDS_EN = new Set(["the", "and", "of", "to", "in", "for", "is", "on", "with", "a", "an", "it", "as", "at", "by", "or", "be", "this", "that", "are", "was", "were", "been", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "can", "not", "no", "but", "its", "from", "all", "so", "if", "about", "than", "into", "also", "more", "some", "these", "those", "very", "just", "each", "which", "who", "what", "when", "where", "why", "how", "there", "their", "them", "they", "he", "she", "we", "you", "me", "my", "your", "his", "her", "our", "its", "up", "out", "off", "over", "after", "then", "once", "here"]);
const STOP_WORDS_PT = new Set(["de", "da", "do", "das", "dos", "e", "o", "a", "os", "as", "para", "por", "com", "que", "em", "um", "uma", "uns", "umas", "no", "na", "nos", "nas", "ao", "aos", "à", "às", "é", "são", "se", "mas", "ou", "como", "mais", "muito", "ele", "ela", "eles", "elas", "você", "nós", "eu", "tu", "meu", "minha", "seu", "sua", "tem", "têm", "pode", "foi", "era", "ser", "ter", "há", "entre", "todo", "tudo", "também", "porque", "quando", "onde", "quem", "qual", "esse", "essa", "isso", "esses", "essas", "aquele", "aquela", "aquilo", "já", "ainda", "bem", "mal", "assim", "depois", "antes", "sim", "não", "até"]);

function getStopWords(): Set<string> {
  return new Set([...STOP_WORDS_ES, ...STOP_WORDS_EN, ...STOP_WORDS_PT]);
}

export default function WordCounter({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [limitType, setLimitType] = useState<LimitType>("words");
  const [limitValue, setLimitValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const paragraphs = text.trim()
    ? text.split("\n").filter((p) => p.trim().length > 0).length
    : 0;
  const lines = text ? text.split("\n").length : 0;
  const sentenceMatches = text.trim() ? text.match(/[.!?]+/g) : null;
  const sentences = sentenceMatches ? sentenceMatches.length : (text.trim().length > 0 ? 1 : 0);
  const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;

  const readingMinutes = words / 200;
  const speakingMinutes = words / 150;
  const readingTime = readingMinutes < 1
    ? (readingMinutes > 0 ? "< 1 min" : "0 min")
    : `${Math.ceil(readingMinutes)} min`;
  const speakingTime = speakingMinutes < 1
    ? (speakingMinutes > 0 ? "< 1 min" : "0 min")
    : `${Math.ceil(speakingMinutes)} min`;

  let readabilityLabel = "";
  if (words === 0) {
    readabilityLabel = "—";
  } else if (avgWordsPerSentence <= 14) {
    readabilityLabel = t.readabilityEasy;
  } else if (avgWordsPerSentence <= 22) {
    readabilityLabel = t.readabilityMedium;
  } else {
    readabilityLabel = t.readabilityHard;
  }

  function getTopWords(): Array<{ word: string; count: number; pct: string }> {
    if (!text.trim()) return [];
    const stopWords = getStopWords();
    const wordList = text
      .toLowerCase()
      .replace(/[^a-záéíóúàâêôãõçüñ0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 0 && !stopWords.has(w));

    if (wordList.length === 0) return [];

    const freq: Record<string, number> = {};
    for (const w of wordList) {
      freq[w] = (freq[w] || 0) + 1;
    }

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const total = wordList.length;
    return sorted.map(([word, count]) => ({
      word,
      count,
      pct: ((count / total) * 100).toFixed(1),
    }));
  }

  const topWords = getTopWords();

  const limitNum = parseInt(limitValue, 10);
  const limitValid = !isNaN(limitNum) && limitNum > 0;
  const limitActual = limitType === "words" ? words : characters;
  const limitUsed = limitValid ? Math.min(limitActual, limitNum) : 0;
  const limitRemaining = limitValid ? Math.max(0, limitNum - limitActual) : 0;
  const limitExceeded = limitValid ? Math.max(0, limitActual - limitNum) : 0;
  const limitPct = limitValid ? Math.min((limitActual / limitNum) * 100, 100) : 0;
  const limitOver = limitValid && limitActual > limitNum;

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const handleCopyText = useCallback(async () => {
    if (!text.trim()) {
      showFeedback(t.noText);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noText);
    }
  }, [text, showFeedback, t]);

  const handleCopyStats = useCallback(async () => {
    if (!text.trim()) {
      showFeedback(t.noTextStats);
      return;
    }
    const statsLines = [
      `${t.words}: ${words}`,
      `${t.characters}: ${characters}`,
      `${t.charactersNoSpaces}: ${charactersNoSpaces}`,
      `${t.paragraphs}: ${paragraphs}`,
      `${t.lines}: ${lines}`,
      `${t.sentences}: ${sentences}`,
      `${t.readingTime}: ${readingTime}`,
      `${t.speakingTime}: ${speakingTime}`,
    ];
    try {
      await navigator.clipboard.writeText(statsLines.join("\n"));
      showFeedback(t.statsCopied);
    } catch {
      showFeedback(t.noText);
    }
  }, [text, words, characters, charactersNoSpaces, paragraphs, lines, sentences, readingTime, speakingTime, showFeedback, t]);

  const handleDownloadTxt = useCallback(() => {
    if (!text.trim()) {
      showFeedback(t.noTextStats);
      return;
    }
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clipnexo-texto.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [text, showFeedback, t]);

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
    setFeedback(null);
    setLimitValue("");
    textareaRef.current?.focus();
  }, []);

  const statCards = [
    { label: t.words, value: words },
    { label: t.characters, value: characters },
    { label: t.charactersNoSpaces, value: charactersNoSpaces },
    { label: t.paragraphs, value: paragraphs },
    { label: t.lines, value: lines },
    { label: t.sentences, value: sentences },
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
            border: "2px solid #474e5c",
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
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}>
          <button type="button" className="tool-button-secondary" onClick={handlePaste} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.pasteText}</button>
          <button type="button" className="tool-button-secondary" onClick={handleCopyText} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.copyText}</button>
          <button type="button" className="tool-button-secondary" onClick={handleCopyStats} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.copyStats}</button>
          <button type="button" className="tool-button-secondary" onClick={handleDownloadTxt} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.downloadTxt}</button>
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
              backgroundColor: feedback.includes("No") || feedback.includes("no") || feedback.includes("Não") ? "#3f1212" : "#123f20",
              color: feedback.includes("No") || feedback.includes("no") || feedback.includes("Não") ? "#ec8383" : "#87e8ac",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Primary metrics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "12px",
        }}>
          {statCards.map((s, i) => (
            <div key={i} style={{
              padding: "16px 12px",
              backgroundColor: "var(--surface)",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <span style={{ display: "block", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                {s.label}
              </span>
              <strong style={{ fontSize: "22px", color: "var(--text-primary)" }}>{s.value}</strong>
            </div>
          ))}
        </div>

        {/* Secondary metrics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "12px",
        }}>
          <div style={{ padding: "14px", backgroundColor: "#14273d", borderRadius: "10px", textAlign: "center", border: "1px solid #214b82" }}>
            <span style={{ display: "block", fontSize: "11px", color: "#b8d1f9", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {t.readingTime}
            </span>
            <strong style={{ fontSize: "18px", color: "#bbc8f7" }}>{readingTime}</strong>
          </div>
          <div style={{ padding: "14px", backgroundColor: "#143d21", borderRadius: "10px", textAlign: "center", border: "1px solid #218243" }}>
            <span style={{ display: "block", fontSize: "11px", color: "#bbf7d1", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {t.speakingTime}
            </span>
            <strong style={{ fontSize: "18px", color: "#bbf7d1" }}>{speakingTime}</strong>
          </div>
          <div style={{ padding: "14px", backgroundColor: "#29143d", borderRadius: "10px", textAlign: "center", border: "1px solid #4f2182" }}>
            <span style={{ display: "block", fontSize: "11px", color: "#dab8f9", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {t.avgWordsPerSentence}
            </span>
            <strong style={{ fontSize: "18px", color: "#dbbbf7" }}>
              {words === 0 ? "0" : avgWordsPerSentence.toFixed(1)}
            </strong>
          </div>
          <div style={{ padding: "14px", backgroundColor: "var(--surface)", borderRadius: "10px", textAlign: "center", border: "1px solid var(--border)" }}>
            <span style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {t.readability}
            </span>
            <strong style={{ fontSize: "18px", color: "var(--text-primary)" }}>{readabilityLabel}</strong>
            <span style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              {t.readabilityNote}
            </span>
          </div>
        </div>

        {/* Custom limit checker */}
        <div style={{
          padding: "20px",
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 12px" }}>
            {t.checkLimit}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
            <select
              aria-label={t.checkLimit}
              value={limitType}
              onChange={(e) => setLimitType(e.target.value as LimitType)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #48505c",
                fontSize: "14px",
                backgroundColor: "var(--surface)",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              <option value="words">{t.limitWords}</option>
              <option value="characters">{t.limitCharacters}</option>
            </select>
            <input
              type="number"
              min="1"
              placeholder={t.limitPlaceholder}
              value={limitValue}
              onChange={(e) => setLimitValue(e.target.value)}
              aria-label={t.limitPlaceholder}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #48505c",
                fontSize: "14px",
                width: "160px",
                minHeight: "44px",
                boxSizing: "border-box",
              }}
            />
          </div>
          {limitValid && (
            <div>
              {/* Progress bar */}
              <div style={{
                width: "100%",
                height: "10px",
                backgroundColor: "#24272d",
                borderRadius: "5px",
                overflow: "hidden",
                marginBottom: "8px",
              }}>
                <div style={{
                  width: `${limitPct}%`,
                  height: "100%",
                  backgroundColor: limitOver ? "#3f1212" : "#12133f",
                  borderRadius: "5px",
                  transition: "width 0.2s",
                }} />
              </div>
              <div style={{ fontSize: "14px", color: limitOver ? "#f6bcbc" : "var(--text-primary)", fontWeight: 500 }}>
                {limitUsed.toLocaleString()} / {limitNum.toLocaleString()} {limitType === "words" ? t.words.toLowerCase() : t.characters.toLowerCase()} {t.limitUsed}
                {limitOver ? (
                  <span style={{ color: "#f7baba", display: "block", marginTop: "4px" }}>
                    {t.limitExceeded} {limitExceeded.toLocaleString()} {limitType === "words" ? t.words.toLowerCase() : t.characters.toLowerCase()}.
                  </span>
                ) : (
                  <span style={{ color: "#d3d8df", display: "block", marginTop: "4px" }}>
                    {t.limitRemaining} {limitRemaining.toLocaleString()} {limitType === "words" ? t.words.toLowerCase() : t.characters.toLowerCase()}.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Most repeated words */}
        <div style={{
          padding: "20px",
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 12px" }}>
            {t.mostRepeatedWords}
          </h3>
          {topWords.length === 0 ? (
            <p style={{ color: "#d5d7dc", fontSize: "14px", margin: 0 }}>{t.noWordsYet}</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #474e5c" }}>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#d1d7e1", fontWeight: 600 }}>#</th>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#d1d7e1", fontWeight: 600 }}>{t.word}</th>
                    <th style={{ textAlign: "right", padding: "8px 12px", color: "#d1d7e1", fontWeight: 600 }}>{t.repetitions}</th>
                    <th style={{ textAlign: "right", padding: "8px 12px", color: "#d1d7e1", fontWeight: 600 }}>{t.percentage}</th>
                  </tr>
                </thead>
                <tbody>
                  {topWords.map((item, i) => (
                    <tr key={item.word} style={{ borderBottom: "1px solid #464e5d" }}>
                      <td style={{ padding: "8px 12px", color: "#d4d8dd" }}>{i + 1}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 600, color: "var(--text-primary)" }}>{item.word}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", color: "#d1d7e1" }}>{item.count}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", color: "#d1d7e1" }}>{item.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Privacy notice */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: "1.5",
        }}>
          {t.privacy}
        </div>
      </div>
    </div>
  );
}
