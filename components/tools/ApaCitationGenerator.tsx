"use client";

import { useState, useCallback } from "react";
import type { SupportedLang } from "@/lib/routes";

type Props = {
  lang: SupportedLang;
};

type SourceType = "webpage" | "book" | "article" | "video";

const strings = {
  es: {
    sourceTypeLabel: "Tipo de fuente",
    webpage: "Página web",
    book: "Libro",
    article: "Artículo académico",
    video: "Video",
    authorLabel: "Autor(es)",
    authorPlaceholder: "Apellido, N.",
    authorNote: "Ej: García, M. o García, M. & López, J.",
    yearLabel: "Año",
    yearPlaceholder: "2025",
    titleLabel: "Título",
    titlePlaceholder: "Título del recurso",
    sourceLabel: "Fuente",
    sourcePlaceholderWebpage: "Nombre del sitio web",
    sourcePlaceholderBook: "Editorial",
    sourcePlaceholderArticle: "Nombre de la revista, volumen(número)",
    sourcePlaceholderVideo: "Plataforma (ej: YouTube)",
    urlLabel: "URL",
    urlPlaceholder: "https://...",
    accessDateLabel: "Fecha de consulta",
    accessDatePlaceholder: "1 de enero de 2025",
    generate: "Generar cita APA",
    clear: "Limpiar",
    copy: "Copiar cita",
    copied: "Cita copiada",
    resultTitle: "Cita APA generada",
    noCitation: "Completa los campos para generar la cita.",
    missingFields: "Faltan campos obligatorios: autor, año y título.",
    disclaimer: "Verifica siempre la referencia según la versión APA solicitada por tu institución.",
    citationIntro: "La cita en formato APA es una referencia bibliográfica estándar. Úsala en tu lista de referencias.",
  },
  en: {
    sourceTypeLabel: "Source type",
    webpage: "Webpage",
    book: "Book",
    article: "Academic article",
    video: "Video",
    authorLabel: "Author(s)",
    authorPlaceholder: "Last name, N.",
    authorNote: "Ex: Smith, J. or Smith, J. & Doe, M.",
    yearLabel: "Year",
    yearPlaceholder: "2025",
    titleLabel: "Title",
    titlePlaceholder: "Resource title",
    sourceLabel: "Source",
    sourcePlaceholderWebpage: "Website name",
    sourcePlaceholderBook: "Publisher",
    sourcePlaceholderArticle: "Journal name, volume(issue)",
    sourcePlaceholderVideo: "Platform (e.g., YouTube)",
    urlLabel: "URL",
    urlPlaceholder: "https://...",
    accessDateLabel: "Access date",
    accessDatePlaceholder: "January 1, 2025",
    generate: "Generate APA citation",
    clear: "Clear",
    copy: "Copy citation",
    copied: "Citation copied",
    resultTitle: "Generated APA citation",
    noCitation: "Fill in the fields to generate the citation.",
    missingFields: "Required fields missing: author, year, and title.",
    disclaimer: "Always verify the reference according to the APA version required by your institution.",
    citationIntro: "The APA formatted citation is a standard bibliographic reference. Use it in your reference list.",
  },
  pt: {
    sourceTypeLabel: "Tipo de fonte",
    webpage: "Página web",
    book: "Livro",
    article: "Artigo acadêmico",
    video: "Vídeo",
    authorLabel: "Autor(es)",
    authorPlaceholder: "Sobrenome, N.",
    authorNote: "Ex: Silva, J. ou Silva, J. & Souza, M.",
    yearLabel: "Ano",
    yearPlaceholder: "2025",
    titleLabel: "Título",
    titlePlaceholder: "Título do recurso",
    sourceLabel: "Fonte",
    sourcePlaceholderWebpage: "Nome do site",
    sourcePlaceholderBook: "Editora",
    sourcePlaceholderArticle: "Nome da revista, volume(número)",
    sourcePlaceholderVideo: "Plataforma (ex: YouTube)",
    urlLabel: "URL",
    urlPlaceholder: "https://...",
    accessDateLabel: "Data de acesso",
    accessDatePlaceholder: "1 de janeiro de 2025",
    generate: "Gerar citação APA",
    clear: "Limpar",
    copy: "Copiar citação",
    copied: "Citação copiada",
    resultTitle: "Citação APA gerada",
    noCitation: "Preencha os campos para gerar a citação.",
    missingFields: "Campos obrigatórios ausentes: autor, ano e título.",
    disclaimer: "Verifique sempre a referência de acordo com a versão APA solicitada por sua instituição.",
    citationIntro: "A citação em formato APA é uma referência bibliográfica padrão. Use-a em sua lista de referências.",
  },
};

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

function generateApaCitation(
  sourceType: SourceType,
  author: string,
  year: string,
  title: string,
  source: string,
  url: string,
  accessDate: string,
  lang: SupportedLang
): string {
  const t = strings[lang];
  const authorFormatted = author.trim();
  const yearFormatted = year.trim();
  const titleItalic = title.trim();
  const sourceFormatted = source.trim();
  const urlFormatted = url.trim();
  const accessDateFormatted = accessDate.trim();

  switch (sourceType) {
    case "webpage": {
      let citation = `${authorFormatted} (${yearFormatted}). _${titleItalic}_. ${sourceFormatted}.`;
      if (urlFormatted) {
        citation += ` ${urlFormatted}`;
      }
      if (accessDateFormatted) {
        const prefix = lang === "es" ? "Consultado el" : lang === "pt" ? "Acessado em" : "Retrieved";
        citation += ` ${prefix} ${accessDateFormatted}.`;
      }
      return citation;
    }
    case "book": {
      let citation = `${authorFormatted} (${yearFormatted}). _${toTitleCase(titleItalic)}_. ${sourceFormatted}.`;
      if (urlFormatted) {
        citation += ` ${urlFormatted}`;
      }
      return citation;
    }
    case "article": {
      let citation = `${authorFormatted} (${yearFormatted}). ${titleItalic}. _${sourceFormatted}_.`;
      if (urlFormatted) {
        citation += ` ${urlFormatted}`;
      }
      return citation;
    }
    case "video": {
      let citation = `${authorFormatted} (${yearFormatted}). ${titleItalic} [${t.video}]. ${sourceFormatted}.`;
      if (urlFormatted) {
        citation += ` ${urlFormatted}`;
      }
      if (accessDateFormatted) {
        const prefix = lang === "es" ? "Consultado el" : lang === "pt" ? "Acessado em" : "Retrieved";
        citation += ` ${prefix} ${accessDateFormatted}.`;
      }
      return citation;
    }
    default:
      return "";
  }
}

export default function ApaCitationGenerator({ lang }: Props) {
  const t = strings[lang];
  const [sourceType, setSourceType] = useState<SourceType>("webpage");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [accessDate, setAccessDate] = useState("");
  const [citation, setCitation] = useState("");
  const [copied, setCopied] = useState(false);

  const sourcePlaceholders: Record<SourceType, string> = {
    webpage: t.sourcePlaceholderWebpage,
    book: t.sourcePlaceholderBook,
    article: t.sourcePlaceholderArticle,
    video: t.sourcePlaceholderVideo,
  };

  const showAccessDate = sourceType === "webpage" || sourceType === "video";

  const handleGenerate = useCallback(() => {
    if (!author.trim() || !year.trim() || !title.trim()) {
      return;
    }
    const result = generateApaCitation(
      sourceType,
      author,
      year,
      title,
      source,
      url,
      accessDate,
      lang
    );
    setCitation(result);
  }, [sourceType, author, year, title, source, url, accessDate, lang]);

  const handleCopy = useCallback(async () => {
    if (!citation) return;
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [citation]);

  const handleClear = useCallback(() => {
    setAuthor("");
    setYear("");
    setTitle("");
    setSource("");
    setUrl("");
    setAccessDate("");
    setCitation("");
    setCopied(false);
    setSourceType("webpage");
  }, []);

  const canGenerate = author.trim() && year.trim() && title.trim();

  return (
    <div className="tool-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Source type */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.sourceTypeLabel}
          </label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value as SourceType)}
            aria-label={t.sourceTypeLabel}
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
              maxWidth: "320px",
            }}
          >
            <option value="webpage">{t.webpage}</option>
            <option value="book">{t.book}</option>
            <option value="article">{t.article}</option>
            <option value="video">{t.video}</option>
          </select>
        </div>

        {/* Author */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.authorLabel}
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t.authorPlaceholder}
            aria-label={t.authorLabel}
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
          <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{t.authorNote}</span>
        </div>

        {/* Year */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.yearLabel}
          </label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={t.yearPlaceholder}
            aria-label={t.yearLabel}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              minHeight: "44px",
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "200px",
            }}
          />
        </div>

        {/* Title */}
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

        {/* Source */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.sourceLabel}
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder={sourcePlaceholders[sourceType]}
            aria-label={t.sourceLabel}
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

        {/* URL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.urlLabel}
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.urlPlaceholder}
            aria-label={t.urlLabel}
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

        {/* Access date (only for webpage and video) */}
        {showAccessDate && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.accessDateLabel}
            </label>
            <input
              type="text"
              value={accessDate}
              onChange={(e) => setAccessDate(e.target.value)}
              placeholder={t.accessDatePlaceholder}
              aria-label={t.accessDateLabel}
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
        )}

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{
              minHeight: "44px",
              flex: "1 0 auto",
              maxWidth: "220px",
              padding: "10px 24px",
              background: canGenerate
                ? "linear-gradient(90deg, #6366f1, #ec4899)"
                : "#d1d5db",
              color: "white",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "15px",
              cursor: canGenerate ? "pointer" : "not-allowed",
              opacity: canGenerate ? 1 : 0.6,
            }}
          >
            {t.generate}
          </button>
          <button type="button" className="tool-button-secondary" onClick={handleClear} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "160px" }}>{t.clear}</button>
        </div>

        {/* Validation message */}
        {!canGenerate && (author || year || title) && (
          <div
            role="alert"
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t.missingFields}
          </div>
        )}

        {/* Result */}
        {citation && (
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
              wordBreak: "break-all",
              marginBottom: "12px",
            }}>
              {citation}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button type="button" className="tool-button-secondary" onClick={handleCopy} style={{ minHeight: "44px", flex: "1 0 auto", maxWidth: "180px" }}>{copied ? t.copied : t.copy}</button>
            </div>
          </div>
        )}

        {!citation && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: "1.5",
          }}>
            {t.noCitation}
          </div>
        )}

        {/* Citation intro */}
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#f0f7ff",
          border: "1px solid #dbeafe",
          fontSize: "13px",
          color: "#1e40af",
          lineHeight: "1.5",
        }}>
          {t.citationIntro}
        </div>

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
      </div>
    </div>
  );
}
