import type { Metadata } from "next";
import Link from "next/link";
import StickersGallery from "@/components/StickersGallery";
import { STICKERS } from "@/lib/stickers-data";
import { buildSeoMetadata, getAbsoluteUrl } from "@/lib/seo";
import { fitSeoDescription } from "@/lib/media-seo";
import { getLocalizedRoute, normalizeLang, type SupportedLang } from "@/lib/routes";
import { WHATSAPP_CHANNEL_URL } from "@/lib/site";

type PageProps = { params: Promise<{ lang: string }> };

const CONTENT = {
  es: {
    metaTitle: "Stickers con video para WhatsApp gratis | Clipnexo",
    metaDescription: "Descarga stickers en video gratis para WhatsApp: fútbol, reacciones y memes virales. Clips listos para enviar y compartir en tus chats hoy, sin registro.",
    h1: "Stickers para WhatsApp",
    lead: "Descarga stickers en video gratis, listos para enviar por WhatsApp o usar en tus ediciones. Toca Compartir en WhatsApp para enviarlos directo a un chat.",
    howTitle: "Cómo usar estos stickers",
    howSteps: [
      "Busca un sticker por nombre o explora la galería.",
      "Haz clic en la vista previa para reproducirlo.",
      "Pulsa Descargar para guardar el video en tu dispositivo, o usa el botón de WhatsApp para compartirlo directo.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Los stickers son gratis?", a: "Sí. Puedes explorar, reproducir y descargar todos los stickers de esta página sin costo." },
      { q: "¿Tendrán sonido dentro de WhatsApp?", a: "WhatsApp aún no soporta sonido nativo en stickers en todas las plataformas. Estos son videos cortos que puedes enviar como archivo o compartir directo por el botón de WhatsApp." },
      { q: "¿En qué formato se descargan?", a: "En formato MP4, optimizado para web y compatible con la mayoría de dispositivos." },
      { q: "¿Cuántos stickers hay disponibles?", a: `Actualmente hay ${STICKERS.length} stickers disponibles en la galería.` },
    ],
    whatsappChannel: "Síguenos en nuestro canal de WhatsApp",
    breadcrumbHome: "Inicio",
  },
  en: {
    metaTitle: "Free WhatsApp Video Stickers | Clipnexo",
    metaDescription: "Download free video stickers for WhatsApp: soccer, reactions and viral memes. Short clips ready to send and share in your chats right now, no sign-up needed.",
    h1: "WhatsApp Stickers",
    lead: "Download free video stickers, ready to send on WhatsApp or use in your edits. Tap Share on WhatsApp to send them straight to a chat.",
    howTitle: "How to use these stickers",
    howSteps: [
      "Search for a sticker by name or browse the gallery.",
      "Click the preview to play it.",
      "Click Download to save the video to your device, or use the WhatsApp button to share it directly.",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Are the stickers free?", a: "Yes. You can browse, play and download every sticker on this page for free." },
      { q: "Will they have sound inside WhatsApp?", a: "WhatsApp doesn't natively support sound in stickers across all platforms yet. These are short videos you can send as a file or share directly with the WhatsApp button." },
      { q: "What format are they downloaded in?", a: "MP4 format, optimized for web and compatible with most devices." },
      { q: "How many stickers are available?", a: `There are currently ${STICKERS.length} stickers available in the gallery.` },
    ],
    whatsappChannel: "Follow our WhatsApp channel",
    breadcrumbHome: "Home",
  },
  pt: {
    metaTitle: "Figurinhas em vídeo grátis para WhatsApp | Clipnexo",
    metaDescription: "Baixe figurinhas em vídeo grátis para o WhatsApp: futebol, reações e memes virais. Clipes prontos para enviar e compartilhar nas conversas hoje, sem cadastro.",
    h1: "Figurinhas para WhatsApp",
    lead: "Baixe figurinhas em vídeo grátis, prontas para enviar pelo WhatsApp ou usar nas suas edições. Toque em Compartilhar no WhatsApp para enviar direto para uma conversa.",
    howTitle: "Como usar essas figurinhas",
    howSteps: [
      "Busque uma figurinha pelo nome ou explore a galeria.",
      "Clique na prévia para reproduzir.",
      "Clique em Baixar para salvar o vídeo no seu dispositivo, ou use o botão do WhatsApp para compartilhar direto.",
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "As figurinhas são grátis?", a: "Sim. Você pode explorar, reproduzir e baixar todas as figurinhas desta página gratuitamente." },
      { q: "Elas terão som dentro do WhatsApp?", a: "O WhatsApp ainda não suporta som nativo em figurinhas em todas as plataformas. São vídeos curtos que você pode enviar como arquivo ou compartilhar direto pelo botão do WhatsApp." },
      { q: "Em qual formato são baixadas?", a: "Formato MP4, otimizado para web e compatível com a maioria dos dispositivos." },
      { q: "Quantas figurinhas estão disponíveis?", a: `Atualmente há ${STICKERS.length} figurinhas disponíveis na galeria.` },
    ],
    whatsappChannel: "Siga nosso canal do WhatsApp",
    breadcrumbHome: "Início",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const c = CONTENT[currentLang];
  const metadata = buildSeoMetadata({
    title: c.metaTitle,
    description: fitSeoDescription(c.metaDescription, currentLang),
    routeKey: "stickersLibrary",
    lang: currentLang,
  });
  return { ...metadata, title: { absolute: c.metaTitle } };
}

export default async function StickersLibraryPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang: SupportedLang = normalizeLang(lang);
  const c = CONTENT[currentLang];
  const canonical = getAbsoluteUrl(getLocalizedRoute("stickersLibrary", currentLang));
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
        <StickersGallery lang={currentLang} />
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
      </section>
    </main>
  );
}
