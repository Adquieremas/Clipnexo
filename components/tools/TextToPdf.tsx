"use client";

import { useState, useCallback, useRef } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type FontSize = "12" | "14" | "16" | "18";
type Alignment = "left" | "center" | "justify";

const strings = {
  es: {
    placeholder: "Escribe o pega el texto que quieres convertir a PDF...",
    titleLabel: "Título del documento (opcional)",
    titlePlaceholder: "Título del documento",
    fontSizeLabel: "Tamaño de fuente",
    alignmentLabel: "Alineación",
    left: "Izquierda",
    center: "Centro",
    justify: "Justificado",
    generatePdf: "Generar PDF",
    pasteText: "Pegar texto",
    clear: "Limpiar",
    noText: "Escribe o pega un texto para generar el PDF.",
    noTextTitle: "Sin título",
    privacy: "El PDF se genera en tu navegador. No se envía tu texto a servidores.",
    legal: "El documento generado es solo para uso personal.",
    pasteError: "No se pudo acceder al portapapeles. Pega el texto manualmente.",
    downloading: "Generando PDF...",
    previewTitle: "Vista previa",
    chars: "Caracteres",
    words: "Palabras",
    viewInNewTab: "También puedes abrir una vista previa e imprimir con Ctrl+P (Cmd+P en Mac).",
  },
  en: {
    placeholder: "Type or paste the text you want to convert to PDF...",
    titleLabel: "Document title (optional)",
    titlePlaceholder: "Document title",
    fontSizeLabel: "Font size",
    alignmentLabel: "Alignment",
    left: "Left",
    center: "Center",
    justify: "Justify",
    generatePdf: "Generate PDF",
    pasteText: "Paste text",
    clear: "Clear",
    noText: "Type or paste a text to generate the PDF.",
    noTextTitle: "Untitled",
    privacy: "The PDF is generated in your browser. Your text is not sent to servers.",
    legal: "The generated document is for personal use only.",
    pasteError: "Could not access clipboard. Paste text manually.",
    downloading: "Generating PDF...",
    previewTitle: "Preview",
    chars: "Characters",
    words: "Words",
    viewInNewTab: "You can also open a preview and print with Ctrl+P (Cmd+P on Mac).",
  },
  pt: {
    placeholder: "Digite ou cole o texto que deseja converter em PDF...",
    titleLabel: "Título do documento (opcional)",
    titlePlaceholder: "Título do documento",
    fontSizeLabel: "Tamanho da fonte",
    alignmentLabel: "Alinhamento",
    left: "Esquerda",
    center: "Centro",
    justify: "Justificado",
    generatePdf: "Gerar PDF",
    pasteText: "Colar texto",
    clear: "Limpar",
    noText: "Digite ou cole um texto para gerar o PDF.",
    noTextTitle: "Sem título",
    privacy: "O PDF é gerado no navegador. Seu texto não é enviado a servidores.",
    legal: "O documento gerado é apenas para uso pessoal.",
    pasteError: "Não foi possível acessar a área de transferência. Cole manualmente.",
    downloading: "Gerando PDF...",
    previewTitle: "Visualização",
    chars: "Caracteres",
    words: "Palavras",
    viewInNewTab: "Você também pode abrir uma visualização e imprimir com Ctrl+P (Cmd+P no Mac).",
  },
};

export default function TextToPdf({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState<FontSize>("14");
  const [alignment, setAlignment] = useState<Alignment>("left");
  const [feedback, setFeedback] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  const handleGeneratePdf = useCallback(() => {
    if (!text.trim()) {
      showFeedback(t.noText);
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showFeedback(t.noText);
      return;
    }

    const docTitle = title.trim() || t.noTextTitle;
    const fontSizeNum = parseInt(fontSize, 10);
    const textAlign = alignment;
    const safeText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${docTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: ${fontSizeNum}px;
      line-height: 1.8;
      color: #111;
      padding: 40px 48px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      font-size: ${fontSizeNum + 6}px;
      font-weight: 700;
      margin-bottom: 24px;
      text-align: center;
      color: #1a1a1a;
    }
    .content {
      text-align: ${textAlign};
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    @media print {
      body { padding: 0; }
      @page { margin: 2cm; }
    }
  </style>
</head>
<body>
  <h1>${docTitle}</h1>
  <div class="content">${safeText}</div>
  <script>
    // Auto-trigger print dialog after a short delay
    setTimeout(() => {
      window.print();
    }, 500);
  </script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  }, [text, title, fontSize, alignment, lang, showFeedback, t]);

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
    setTitle("");
    setFontSize("14");
    setAlignment("left");
    setFeedback(null);
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Title field */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.titleLabel}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePlaceholder}
            aria-label={t.titleLabel}
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

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          aria-label={t.placeholder}
          style={{
            width: "100%",
            minHeight: "300px",
            padding: "20px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "2px solid #e5e7eb",
            outline: "none",
            transition: "border-color 0.2s",
            fontFamily: "Georgia, Times New Roman, serif",
            lineHeight: "1.8",
            resize: "vertical",
            boxSizing: "border-box",
          }}
          placeholder={t.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Settings row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.fontSizeLabel}
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as FontSize)}
              aria-label={t.fontSizeLabel}
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
              <option value="12">12 px</option>
              <option value="14">14 px</option>
              <option value="16">16 px</option>
              <option value="18">18 px</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.alignmentLabel}
            </label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value as Alignment)}
              aria-label={t.alignmentLabel}
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
              <option value="left">{t.left}</option>
              <option value="center">{t.center}</option>
              <option value="justify">{t.justify}</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <button type="button" className="tool-button-secondary" onClick={handlePaste} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.pasteText}</button>
          <button
            type="button"
            onClick={handleGeneratePdf}
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
            {t.generatePdf}
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
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Preview hint */}
        {text.trim() && (
          <>
            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "12px",
            }}>
              <div style={{
                padding: "14px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #eee",
              }}>
                <span style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  {t.chars}
                </span>
                <strong style={{ fontSize: "22px", color: "#111" }}>{chars.toLocaleString()}</strong>
              </div>
              <div style={{
                padding: "14px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #eee",
              }}>
                <span style={{ display: "block", fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  {t.words}
                </span>
                <strong style={{ fontSize: "22px", color: "#111" }}>{words.toLocaleString()}</strong>
              </div>
            </div>
          </>
        )}

        {/* Print hint */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#f0f7ff",
          border: "1px solid #dbeafe",
          fontSize: "13px",
          color: "#1e40af",
          lineHeight: "1.5",
        }}>
          {t.viewInNewTab}
        </div>

        {/* Legal notice */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#fefce8",
          border: "1px solid #fde68a",
          fontSize: "13px",
          color: "#854d0e",
          lineHeight: "1.5",
        }}>
          {t.legal}
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
