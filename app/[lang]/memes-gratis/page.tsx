import type { Metadata } from "next";
import Link from "next/link";
import MemesGallery from "@/components/MemesGallery";
import { MEMES } from "@/lib/memes-data";
import { buildSeoMetadata, getAbsoluteUrl } from "@/lib/seo";
import { fitSeoDescription } from "@/lib/media-seo";
import { getLocalizedRoute, normalizeLang, type SupportedLang } from "@/lib/routes";
import { WHATSAPP_CHANNEL_URL } from "@/lib/site";

type PageProps = { params: Promise<{ lang: string }>; searchParams: Promise<{ category?: string }> };

const CONTENT = {
  es: {
    metaTitle: "Memes gratis en video para descargar hoy | Clipnexo",
    metaDescription: "Descarga memes y plantillas de memes en video gratis. Explora clips optimizados para redes sociales, ediciones y contenido viral. Más memes en Clipnexo.",
    h1: "Memes gratis para descargar",
    lead: "Explora y descarga plantillas de memes en video optimizadas para web. Encuentra clips listos para usar en TikTok, Reels, Shorts y tus ediciones.",
    howTitle: "Cómo usar estos memes",
    howSteps: [
      "Busca un meme por nombre o explora la galería completa.",
      "Haz clic en la vista previa para reproducir el clip.",
      "Pulsa Descargar para guardar el video MP4 en tu dispositivo.",
      "Usa Copiar URL si necesitas enlazar el archivo directamente.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Los memes son gratis?", a: "Sí. Puedes explorar y descargar los memes de esta página de forma gratuita para tus proyectos creativos y ediciones." },
      { q: "¿En qué formato se descargan?", a: "Los memes se descargan en formato MP4, optimizados para web y compatibles con la mayoría de editores de video." },
      { q: "¿Puedo usarlos en TikTok, Reels o Shorts?", a: "Sí. Los clips están pensados para usarse en videos cortos, redes sociales y proyectos creativos. Verifica los derechos del contenido original si tu uso lo requiere." },
      { q: "¿Cuántos memes hay disponibles?", a: `Actualmente hay ${MEMES.length} memes disponibles en la galería.` },
    ],
    relatedTitle: "Herramientas relacionadas",
    relatedIntro: "Explora más recursos y herramientas gratuitas de Clipnexo:",
    related: [
      { label: "Emojis gratis", routeKey: "emojiLibrary" as const },
      { label: "Biblioteca de sonidos", routeKey: "soundsLibrary" as const },
      { label: "Todas las herramientas", routeKey: "tools" as const },
    ],
    breadcrumbHome: "Inicio",
    whatsappChannel: "Síguenos en nuestro canal de WhatsApp",
  },
  en: {
    metaTitle: "Free meme videos for social media to share | Clipnexo",
    metaDescription: "Download free meme video templates. Browse optimized clips for social media, edits, and viral content. Find more memes for edits at Clipnexo today.",
    h1: "Free memes to download",
    lead: "Browse and download web-optimized meme video templates. Find clips ready to use in TikTok, Reels, Shorts, and your edits.",
    howTitle: "How to use these memes",
    howSteps: [
      "Search for a meme by name or browse the full gallery.",
      "Click the preview to play the clip.",
      "Click Download to save the MP4 video to your device.",
      "Use Copy URL if you need to link the file directly.",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Are the memes free?", a: "Yes. You can browse and download the memes on this page for free for your creative projects and edits." },
      { q: "What format are they downloaded in?", a: "Memes are downloaded in MP4 format, optimized for web and compatible with most video editors." },
      { q: "Can I use them on TikTok, Reels, or Shorts?", a: "Yes. The clips are designed for short-form videos, social media, and creative projects. Check the rights of the original content if your use requires it." },
      { q: "How many memes are available?", a: `There are currently ${MEMES.length} memes available in the gallery.` },
    ],
    relatedTitle: "Related tools",
    relatedIntro: "Explore more free Clipnexo resources and tools:",
    related: [
      { label: "Free emojis", routeKey: "emojiLibrary" as const },
      { label: "Sound library", routeKey: "soundsLibrary" as const },
      { label: "All tools", routeKey: "tools" as const },
    ],
    breadcrumbHome: "Home",
    whatsappChannel: "Follow our WhatsApp channel",
  },
  pt: {
    metaTitle: "Memes grátis em vídeo para baixar e usar | Clipnexo",
    metaDescription: "Baixe memes e modelos de memes em vídeo grátis. Explore clipes otimizados para redes sociais, edições e conteúdo viral. Mais memes no Clipnexo grátis.",
    h1: "Memes grátis para baixar",
    lead: "Explore e baixe modelos de memes em vídeo otimizados para web. Encontre clipes prontos para usar no TikTok, Reels, Shorts e nas suas edições.",
    howTitle: "Como usar estes memes",
    howSteps: [
      "Busque um meme por nome ou explore a galeria completa.",
      "Clique na prévia para reproduzir o clipe.",
      "Clique em Baixar para salvar o vídeo MP4 no seu dispositivo.",
      "Use Copiar URL se precisar vincular o arquivo diretamente.",
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Os memes são grátis?", a: "Sim. Você pode explorar e baixar os memes desta página gratuitamente para seus projetos criativos e edições." },
      { q: "Em qual formato eles são baixados?", a: "Os memes são baixados em formato MP4, otimizados para web e compatíveis com a maioria dos editores de vídeo." },
      { q: "Posso usá-los no TikTok, Reels ou Shorts?", a: "Sim. Os clipes são pensados para vídeos curtos, redes sociais e projetos criativos. Verifique os direitos do conteúdo original se o seu uso exigir." },
      { q: "Quantos memes estão disponíveis?", a: `Atualmente há ${MEMES.length} memes disponíveis na galeria.` },
    ],
    relatedTitle: "Ferramentas relacionadas",
    relatedIntro: "Explore mais recursos e ferramentas gratuitas do Clipnexo:",
    related: [
      { label: "Emojis grátis", routeKey: "emojiLibrary" as const },
      { label: "Biblioteca de sons", routeKey: "soundsLibrary" as const },
      { label: "Todas as ferramentas", routeKey: "tools" as const },
    ],
    breadcrumbHome: "Início",
    whatsappChannel: "Siga nosso canal do WhatsApp",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const c = CONTENT[currentLang];
  const metadata = buildSeoMetadata({
    title: c.metaTitle,
    description: fitSeoDescription(c.metaDescription, currentLang),
    routeKey: "memesLibrary",
    lang: currentLang,
  });
  return { ...metadata, title: { absolute: c.metaTitle } };
}

export default async function MemesLibraryPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { category } = await searchParams;
  const currentLang: SupportedLang = normalizeLang(lang);
  const c = CONTENT[currentLang];
  const canonical = getAbsoluteUrl(getLocalizedRoute("memesLibrary", currentLang));
  const homeUrl = getAbsoluteUrl(getLocalizedRoute("home", currentLang));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: homeUrl },
      { "@type": "ListItem", position: 2, name: c.h1, item: canonical },
    ],
  };

  return (
    <main className="tool-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="tool-hero">
        <div className="tool-hero-copy">
          <nav className="blog-breadcrumbs tool-breadcrumbs" aria-label="Breadcrumb">
            <Link href={getLocalizedRoute("home", currentLang)} className="blog-breadcrumb-link">
              {c.breadcrumbHome}
            </Link>
            <span className="blog-breadcrumb-sep">/</span>
            <span className="blog-breadcrumb-current">{c.h1}</span>
          </nav>
          <h1>{c.h1}</h1>
          <p>{c.lead}</p>
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12,
              padding: "10px 16px", borderRadius: 999, border: "1px solid var(--border)",
              background: "var(--surface-raised)", color: "#25D366", fontSize: 14, fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.03h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.42 3.6-8.02 8.03-8.02 2.14 0 4.15.84 5.67 2.35a7.96 7.96 0 0 1 2.34 5.68c0 4.42-3.6 8.14-8.03 8.14Zm4.4-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            {c.whatsappChannel}
          </a>
        </div>
        <MemesGallery lang={currentLang} initialCategory={category} />
      </section>

      <section className="tool-content">
        <section className="tool-section">
          <h2>{c.howTitle}</h2>
          <ol>
            {c.howSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="tool-section">
          <h2>{c.faqTitle}</h2>
          <div className="tool-faq-list">
            {c.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="tool-section">
          <h2>{c.relatedTitle}</h2>
          <p>{c.relatedIntro}</p>
          <div className="tool-link-grid">
            {c.related.map((r) => (
              <Link key={r.routeKey} href={getLocalizedRoute(r.routeKey, currentLang)}>
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
