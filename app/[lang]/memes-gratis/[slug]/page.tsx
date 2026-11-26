import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MEMES, getMemePosterUrl, getMemeVideoUrl } from "@/lib/memes-data";
import { getMemeCategoryLabel } from "@/lib/memes-categories";
import { getAbsoluteUrl } from "@/lib/seo";
import { createMediaSeoTitle, fitSeoDescription } from "@/lib/media-seo";
import { getLocalizedRoute, normalizeLang, supportedLangs, type SupportedLang } from "@/lib/routes";
import { WHATSAPP_CHANNEL_URL } from "@/lib/site";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

const UI = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbMemes: "Memes gratis",
    download: "Descargar MP4",
    copy: "Copiar URL",
    category: "Categoría",
    related: "Más memes",
    allMemes: "Ver todos los memes",
    duration: "Duración",
    size: "Tamaño",
    whatsappShare: "Compartir en WhatsApp",
    whatsappChannel: "Síguenos en nuestro canal de WhatsApp",
    whatsappShareText: (title: string, url: string) => `Mira este meme: "${title}" ${url}`,
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbMemes: "Free memes",
    download: "Download MP4",
    copy: "Copy URL",
    category: "Category",
    related: "More memes",
    allMemes: "View all memes",
    duration: "Duration",
    size: "Size",
    whatsappShare: "Share on WhatsApp",
    whatsappChannel: "Follow our WhatsApp channel",
    whatsappShareText: (title: string, url: string) => `Check out this meme: "${title}" ${url}`,
  },
  pt: {
    breadcrumbHome: "Início",
    breadcrumbMemes: "Memes grátis",
    download: "Baixar MP4",
    copy: "Copiar URL",
    category: "Categoria",
    related: "Mais memes",
    allMemes: "Ver todos os memes",
    duration: "Duração",
    size: "Tamanho",
    whatsappShare: "Compartilhar no WhatsApp",
    whatsappChannel: "Siga nosso canal do WhatsApp",
    whatsappShareText: (title: string, url: string) => `Veja esse meme: "${title}" ${url}`,
  },
} as const;

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getMemeBySlug(slug: string) {
  return MEMES.find((m) => m.id === slug);
}

export function generateStaticParams() {
  return supportedLangs.flatMap((lang) => MEMES.map((m) => ({ lang, slug: m.id })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const currentLang = normalizeLang(lang);
  const meme = getMemeBySlug(slug);
  if (!meme) return {};

  const basePath = getLocalizedRoute("memesLibrary", currentLang);
  const path = `${basePath}/${meme.id}`;
  const title = createMediaSeoTitle(meme.title, currentLang, "meme");
  const descByLang: Record<SupportedLang, string> = {
    es: `Descarga el meme en video "${meme.title}" en MP4, optimizado para redes sociales y ediciones.`,
    en: `Download the "${meme.title}" meme video in MP4, optimized for social media and edits.`,
    pt: `Baixe o meme em vídeo "${meme.title}" em MP4, otimizado para redes sociais e edições.`,
  };

  const alternates: Record<string, string> = {};
  for (const l of supportedLangs) {
    alternates[l] = getAbsoluteUrl(`${getLocalizedRoute("memesLibrary", l)}/${meme.id}`);
  }
  alternates["x-default"] = alternates.es;

  return {
    title: { absolute: title },
    description: fitSeoDescription(descByLang[currentLang], currentLang),
    alternates: {
      canonical: getAbsoluteUrl(path),
      languages: alternates,
    },
    openGraph: {
      title,
      description: fitSeoDescription(descByLang[currentLang], currentLang),
      url: getAbsoluteUrl(path),
      type: "video.other",
      images: [{ url: getMemePosterUrl(meme) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: fitSeoDescription(descByLang[currentLang], currentLang),
      images: [getMemePosterUrl(meme)],
    },
  };
}

export default async function MemeDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLang = normalizeLang(lang);
  const meme = getMemeBySlug(slug);
  if (!meme) notFound();

  const t = UI[currentLang];
  const basePath = getLocalizedRoute("memesLibrary", currentLang);
  const canonical = getAbsoluteUrl(`${basePath}/${meme.id}`);
  const homeUrl = getAbsoluteUrl(getLocalizedRoute("home", currentLang));
  const memesUrl = getAbsoluteUrl(basePath);
  const categoryLabel = getMemeCategoryLabel(meme.category, currentLang);
  const related = MEMES.filter((m) => m.category === meme.category && m.id !== meme.id).slice(0, 8);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: homeUrl },
      { "@type": "ListItem", position: 2, name: t.breadcrumbMemes, item: memesUrl },
      { "@type": "ListItem", position: 3, name: meme.title, item: canonical },
    ],
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: meme.title,
    description: meme.title,
    thumbnailUrl: getMemePosterUrl(meme),
    contentUrl: getMemeVideoUrl(meme),
    uploadDate: "2026-06-02T00:00:00.000Z",
    duration: `PT${Math.max(1, Math.round(meme.durationMs / 1000))}S`,
  };

  return (
    <main className="tool-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />

      <section className="tool-hero">
        <div className="tool-hero-copy">
          <nav className="blog-breadcrumbs tool-breadcrumbs" aria-label="Breadcrumb">
            <Link href={getLocalizedRoute("home", currentLang)} className="blog-breadcrumb-link">{t.breadcrumbHome}</Link>
            <span className="blog-breadcrumb-sep">/</span>
            <Link href={basePath} className="blog-breadcrumb-link">{t.breadcrumbMemes}</Link>
            <span className="blog-breadcrumb-sep">/</span>
            <span className="blog-breadcrumb-current">{meme.title}</span>
          </nav>
          <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.2 }}>{meme.title}</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>
            {t.category}: <Link href={`${basePath}?category=${meme.category}`} style={{ color: "var(--accent)" }}>{categoryLabel}</Link>
            {" · "}{t.duration}: {formatDuration(meme.durationMs)}
            {" · "}{t.size}: {formatSize(meme.fileSize)}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16, justifyContent: "center" }}>
            <a
              href={`/api/memes/${meme.id}/download`}
              download={`${meme.id}.mp4`}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 18px", borderRadius: 10, background: "var(--accent)",
                color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: 14,
              }}
            >
              {t.download}
            </a>
            <Link
              href={basePath}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 18px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--surface-raised)", color: "var(--text-primary)",
                fontWeight: 600, textDecoration: "none", fontSize: 14,
              }}
            >
              {t.allMemes}
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(t.whatsappShareText(meme.title, canonical))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px 18px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--surface-raised)", color: "#25D366",
                fontWeight: 600, textDecoration: "none", fontSize: 14,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.03h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.42 3.6-8.02 8.03-8.02 2.14 0 4.15.84 5.67 2.35a7.96 7.96 0 0 1 2.34 5.68c0 4.42-3.6 8.14-8.03 8.14Zm4.4-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              {t.whatsappShare}
            </a>
          </div>
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14,
              padding: "8px 14px", borderRadius: 999, border: "1px solid var(--border)",
              background: "var(--surface-raised)", color: "#25D366", fontSize: 13, fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t.whatsappChannel}
          </a>
        </div>

        <div
          style={{
            maxWidth: 720,
            width: "100%",
            margin: "24px auto 0",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#000",
            aspectRatio: `${meme.width} / ${meme.height}`,
            maxHeight: "70vh",
          }}
        >
          <video
            src={getMemeVideoUrl(meme)}
            poster={getMemePosterUrl(meme)}
            controls
            controlsList="nodownload"
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="tool-content">
          <section className="tool-section">
            <h2>{t.related}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`${basePath}/${r.id}`}
                  style={{
                    textDecoration: "none", color: "inherit", border: "1px solid var(--border)",
                    borderRadius: 12, overflow: "hidden", background: "var(--surface)",
                  }}
                >
                  <div style={{ aspectRatio: "16/9", background: "#000" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getMemePosterUrl(r)} alt={r.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: 10 }}>
                    <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
