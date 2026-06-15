"use client";

import { useState, useCallback, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { SupportedLang } from "@/lib/routes";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs";

type Props = {
  lang: SupportedLang;
};

const MAX_FILE_SIZE_MB = 20;

const strings = {
  es: {
    dropLabel: "Selecciona un archivo PDF",
    dropText: "Arrastra un PDF aquí o haz clic para seleccionarlo",
    dropHint: "Solo archivos .pdf (máx. 20 MB)",
    extracting: "Cargando PDF...",
    extractingPage: "Extrayendo página",
    extractedTitle: "Texto extraído",
    noSelectable: "No se encontró texto seleccionable en este PDF. Es posible que sea un PDF escaneado o basado en imágenes.",
    noLegible: "No se pudo extraer texto legible de este PDF. Prueba con un PDF que tenga texto seleccionable.",
    errorReading: "No se pudo leer el archivo. Asegúrate de que sea un PDF válido.",
    fileTooBig: "El archivo es demasiado grande. Usa un PDF de máximo 20 MB.",
    notPdf: "El archivo seleccionado no es un PDF.",
    copyText: "Copiar texto",
    downloadTxt: "Descargar TXT",
    clear: "Limpiar",
    copied: "Texto copiado",
    noText: "No hay texto para copiar.",
    legal: "Usa solo archivos propios o documentos que tengas permiso de procesar.",
    privacy: "El archivo se procesa en tu navegador. No se sube a ningún servidor.",
    chars: "Caracteres extraídos",
    words: "Palabras extraídas",
    pages: "Páginas",
    fileName: "Archivo",
  },
  en: {
    dropLabel: "Select a PDF file",
    dropText: "Drag a PDF here or click to select one",
    dropHint: "Only .pdf files (max 20 MB)",
    extracting: "Loading PDF...",
    extractingPage: "Extracting page",
    extractedTitle: "Extracted text",
    noSelectable: "No selectable text was found in this PDF. It may be a scanned or image-based PDF.",
    noLegible: "Readable text could not be extracted from this PDF. Try a PDF with selectable text.",
    errorReading: "Could not read the file. Make sure it is a valid PDF.",
    fileTooBig: "The file is too large. Use a PDF up to 20 MB.",
    notPdf: "The selected file is not a PDF.",
    copyText: "Copy text",
    downloadTxt: "Download TXT",
    clear: "Clear",
    copied: "Text copied",
    noText: "No text to copy.",
    legal: "Use only your own files or documents you have permission to process.",
    privacy: "The file is processed in your browser. It is not uploaded to any server.",
    chars: "Extracted characters",
    words: "Extracted words",
    pages: "Pages",
    fileName: "File",
  },
  pt: {
    dropLabel: "Selecione um arquivo PDF",
    dropText: "Arraste um PDF aqui ou clique para selecionar",
    dropHint: "Apenas arquivos .pdf (máx. 20 MB)",
    extracting: "Carregando PDF...",
    extractingPage: "Extraindo página",
    extractedTitle: "Texto extraído",
    noSelectable: "Nenhum texto selecionável foi encontrado neste PDF. Ele pode ser um PDF escaneado ou baseado em imagens.",
    noLegible: "Não foi possível extrair texto legível deste PDF. Tente usar um PDF com texto selecionável.",
    errorReading: "Não foi possível ler o arquivo. Certifique-se de que é um PDF válido.",
    fileTooBig: "O arquivo é muito grande. Use um PDF de no máximo 20 MB.",
    notPdf: "O arquivo selecionado não é um PDF.",
    copyText: "Copiar texto",
    downloadTxt: "Baixar TXT",
    clear: "Limpar",
    copied: "Texto copiado",
    noText: "Não há texto para copiar.",
    legal: "Use apenas arquivos próprios ou documentos que você tenha permissão para processar.",
    privacy: "O arquivo é processado no navegador. Não é enviado a nenhum servidor.",
    chars: "Caracteres extraídos",
    words: "Palavras extraídas",
    pages: "Páginas",
    fileName: "Arquivo",
  },
};

function looksLikeRawPdf(text: string): boolean {
  const indicators = ["%PDF-", "/FlateDecode", "stream\n", "endstream", "endobj", "/Type /", "/Subtype /", "/Filter "];
  const count = indicators.filter((ind) => text.includes(ind)).length;
  if (count >= 3) return true;
  const totalChars = text.length;
  if (totalChars === 0) return false;
  const replacementChars = (text.match(/\uFFFD/g) || []).length;
  if (replacementChars > totalChars * 0.1) return true;
  const printableRatio = text.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/g, "").length / totalChars;
  if (totalChars > 100 && printableRatio < 0.4) return true;
  return false;
}

function cleanText(text: string): string {
  return text
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/g, "")
    .replace(/\s{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function PdfToText({ lang }: Props) {
  const t = strings[lang];
  const [fileName, setFileName] = useState<string>("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file) return;

      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        showFeedback(t.notPdf);
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        showFeedback(t.fileTooBig);
        return;
      }

      setFileName(file.name);
      setLoading(true);
      setExtractedText("");
      setCharCount(0);
      setWordCount(0);
      setPageCount(0);
      setFeedback(null);
      setStatusMsg(t.extracting);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPageCount(pdf.numPages);

        const allPages: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          setStatusMsg(`${t.extractingPage} ${i} ${lang === "pt" ? "de" : "of"} ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item) => {
              if ("str" in item) return item.str;
              return "";
            })
            .join(" ");

          if (pageText.trim()) {
            allPages.push(pageText.trim());
          }
        }

        setStatusMsg("");

        if (allPages.length === 0) {
          showFeedback(t.noSelectable);
          setLoading(false);
          return;
        }

        let combined = allPages.join("\n\n");

        if (looksLikeRawPdf(combined)) {
          showFeedback(t.noLegible);
          setLoading(false);
          return;
        }

        combined = cleanText(combined);

        if (!combined.trim()) {
          showFeedback(t.noSelectable);
          setLoading(false);
          return;
        }

        setExtractedText(combined);
        setCharCount(combined.length);
        setWordCount(combined.trim() ? combined.trim().split(/\s+/).length : 0);
      } catch {
        console.error("PDF extraction error");
        showFeedback(t.errorReading);
      }

      setLoading(false);
    },
    [showFeedback, t, lang]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleCopy = useCallback(async () => {
    if (!extractedText) {
      showFeedback(t.noText);
      return;
    }
    try {
      await navigator.clipboard.writeText(extractedText);
      showFeedback(t.copied);
    } catch {
      showFeedback(t.noText);
    }
  }, [extractedText, showFeedback, t]);

  const handleDownloadTxt = useCallback(() => {
    if (!extractedText) {
      showFeedback(t.noText);
      return;
    }
    const baseName = fileName.replace(/\.pdf$/i, "") || "documento";
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [extractedText, fileName, showFeedback, t]);

  const handleClear = useCallback(() => {
    setFileName("");
    setExtractedText("");
    setCharCount(0);
    setWordCount(0);
    setPageCount(0);
    setFeedback(null);
    setStatusMsg("");
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const hasText = extractedText.trim().length > 0;

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Drop area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={t.dropLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          style={{
            border: "2px dashed #d1d5db",
            borderRadius: "12px",
            padding: "40px 20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f9fafb",
            transition: "border-color 0.2s, background-color 0.2s",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
            (e.currentTarget as HTMLElement).style.backgroundColor = "#eef2ff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
            (e.currentTarget as HTMLElement).style.backgroundColor = "#f9fafb";
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#374151" }}>{t.dropText}</span>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{t.dropHint}</span>
          {fileName && (
            <span style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#6366f1",
              padding: "4px 12px",
              backgroundColor: "#eef2ff",
              borderRadius: "6px",
            }}>
              {fileName}
            </span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            aria-label={t.dropLabel}
            style={{ display: "none" }}
          />
        </div>

        {/* Status */}
        {loading && statusMsg && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#eef2ff",
              border: "1px solid #c7d2fe",
              fontSize: "14px",
              color: "#4338ca",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {statusMsg}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: feedback.includes(t.copied) ? "#f0fdf4" : "#fef2f2",
              color: feedback.includes(t.copied) ? "#166534" : "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Extracted text */}
        {hasText && (
          <>
            <div style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: "0 0 12px" }}>
                {t.extractedTitle}
              </h3>
              <textarea
                aria-label={t.extractedTitle}
                style={{
                  width: "100%",
                  minHeight: "200px",
                  maxHeight: "500px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#111",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box",
                  overflowY: "auto",
                }}
                value={extractedText}
                readOnly
              />
            </div>

            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
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
                  {t.pages}
                </span>
                <strong style={{ fontSize: "22px", color: "#111" }}>{pageCount}</strong>
              </div>
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
                <strong style={{ fontSize: "22px", color: "#111" }}>{charCount.toLocaleString()}</strong>
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
                <strong style={{ fontSize: "22px", color: "#111" }}>{wordCount.toLocaleString()}</strong>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <button type="button" className="tool-button-secondary" onClick={handleCopy} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.copyText}</button>
              <button type="button" className="tool-button-secondary" onClick={handleDownloadTxt} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{t.downloadTxt}</button>
              <button type="button" className="tool-button-secondary" onClick={handleClear} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.clear}</button>
            </div>
          </>
        )}

        {/* Empty state after load */}
        {!loading && !hasText && fileName && !feedback && (
          <div style={{
            padding: "14px 16px",
            borderRadius: "8px",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            fontSize: "14px",
            color: "#92400e",
            fontWeight: 500,
          }}>
            {t.noSelectable}
          </div>
        )}

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
