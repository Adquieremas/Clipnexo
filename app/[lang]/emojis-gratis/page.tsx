import type { Metadata } from "next";
import Link from "next/link";
import EmojisGallery from "@/components/EmojisGallery";
import { EMOJIS } from "@/lib/emojis-data";
import { buildSeoMetadata, getAbsoluteUrl } from "@/lib/seo";
import { fitSeoDescription } from "@/lib/media-seo";
import { getLocalizedRoute, normalizeLang, type SupportedLang } from "@/lib/routes";

type PageProps = { params: Promise<{ lang: string }> };

const CONTENT = {
  es: {
    metaTitle: "Emojis gratis en PNG para descargar y usar | Clipnexo",
    metaDescription: "Descarga emojis gratis en PNG de alta calidad. Explora 187 emojis listos para usar en tus diseños, videos, redes sociales y proyectos creativos. ¡Gratis!",
    h1: "Emojis gratis para descargar",
    lead: "Explora y descarga emojis en PNG de alta calidad para tus diseños, videos, miniaturas, redes sociales y proyectos creativos. Todos los emojis están listos para usar.",
    howTitle: "Cómo usar estos emojis",
    howSteps: [
      "Busca un emoji por su número o explora la galería completa.",
      "Haz clic en Descargar para guardar el PNG en tu dispositivo.",
      "Usa Copiar URL si necesitas enlazar el archivo directamente.",
      "Añade el emoji a tus miniaturas, videos, stickers, presentaciones o diseños.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Los emojis son gratis?", a: "Sí. Puedes explorar y descargar los emojis de esta página de forma gratuita para tus proyectos creativos." },
      { q: "¿En qué formato se descargan?", a: "Los emojis están disponibles en formato PNG con fondo transparente, listos para usar en diseños y ediciones." },
      { q: "¿Puedo usarlos en redes sociales o videos?", a: "Sí. Puedes usarlos en miniaturas, videos, publicaciones, presentaciones y otros proyectos creativos. Revisa la atribución del pack si tu uso lo requiere." },
      { q: "¿Cuántos emojis hay disponibles?", a: `Actualmente hay ${EMOJIS.length} emojis disponibles en la galería.` },
    ],
    relatedTitle: "Herramientas relacionadas",
    relatedIntro: "Explora más recursos y herramientas gratuitas de Clipnexo:",
    related: [
      { label: "Biblioteca de sonidos", routeKey: "soundsLibrary" as const },
      { label: "Todas las herramientas", routeKey: "tools" as const },
      { label: "Herramientas para TikTok", routeKey: "tiktokTools" as const },
    ],
    attribution: "Pack de emojis: Emojis By Alexius.",
    breadcrumbHome: "Inicio",
  },
  en: {
    metaTitle: "Free PNG emojis for creative projects to use | Clipnexo",
    metaDescription: "Download free high-quality PNG emojis. Browse 187 emojis ready to use in your designs, videos, social media posts, and creative projects. Free on Clipnexo.",
    h1: "Free emojis to download",
    lead: "Browse and download high-quality PNG emojis for your designs, videos, thumbnails, social media posts, and creative projects. All emojis are ready to use.",
    howTitle: "How to use these emojis",
    howSteps: [
      "Search for an emoji by number or browse the full gallery.",
      "Click Download to save the PNG to your device.",
      "Use Copy URL if you need to link the file directly.",
      "Add the emoji to your thumbnails, videos, stickers, presentations, or designs.",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Are the emojis free?", a: "Yes. You can browse and download the emojis on this page for free for your creative projects." },
      { q: "What format are they downloaded in?", a: "The emojis are available in PNG format with a transparent background, ready to use in designs and edits." },
      { q: "Can I use them on social media or in videos?", a: "Yes. You can use them in thumbnails, videos, posts, presentations, and other creative projects. Check the pack attribution if your use requires it." },
      { q: "How many emojis are available?", a: `There are currently ${EMOJIS.length} emojis available in the gallery.` },
    ],
    relatedTitle: "Related tools",
    relatedIntro: "Explore more free Clipnexo resources and tools:",
    related: [
      { label: "Sound library", routeKey: "soundsLibrary" as const },
      { label: "All tools", routeKey: "tools" as const },
      { label: "TikTok tools", routeKey: "tiktokTools" as const },
    ],
    attribution: "Emoji pack: Emojis By Alexius.",
    breadcrumbHome: "Home",
  },
  pt: {
    metaTitle: "Emojis grátis em PNG para baixar e usar | Clipnexo",
    metaDescription: "Baixe emojis grátis em PNG de alta qualidade. Explore 187 emojis prontos para usar em seus designs, vídeos, redes sociais e projetos criativos. Grátis.",
    h1: "Emojis grátis para baixar",
    lead: "Explore e baixe emojis em PNG de alta qualidade para seus designs, vídeos, miniaturas, redes sociais e projetos criativos. Todos os emojis estão prontos para usar.",
    howTitle: "Como usar estes emojis",
    howSteps: [
      "Busque um emoji pelo número ou explore a galeria completa.",
      "Clique em Baixar para salvar o PNG no seu dispositivo.",
      "Use Copiar URL se precisar vincular o arquivo diretamente.",
      "Adicione o emoji às suas miniaturas, vídeos, stickers, apresentações ou designs.",
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Os emojis são grátis?", a: "Sim. Você pode explorar e baixar os emojis desta página gratuitamente para seus projetos criativos." },
      { q: "Em qual formato eles são baixados?", a: "Os emojis estão disponíveis em formato PNG com fundo transparente, prontos para usar em designs e edições." },
      { q: "Posso usá-los em redes sociais ou vídeos?", a: "Sim. Você pode usá-los em miniaturas, vídeos, publicações, apresentações e outros projetos criativos. Verifique a atribuição do pack se o seu uso exigir." },
      { q: "Quantos emojis estão disponíveis?", a: `Atualmente há ${EMOJIS.length} emojis disponíveis na galeria.` },
    ],
    relatedTitle: "Ferramentas relacionadas",
    relatedIntro: "Explore mais recursos e ferramentas gratuitas do Clipnexo:",
    related: [
      { label: "Biblioteca de sons", routeKey: "soundsLibrary" as const },
      { label: "Todas as ferramentas", routeKey: "tools" as const },
      { label: "Ferramentas para TikTok", routeKey: "tiktokTools" as const },
    ],
    attribution: "Pack de emojis: Emojis By Alexius.",
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
    routeKey: "emojiLibrary",
    lang: currentLang,
  });
  return { ...metadata, title: { absolute: c.metaTitle } };
}

export default async function EmojiLibraryPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang: SupportedLang = normalizeLang(lang);
  const c = CONTENT[currentLang];
  const canonical = getAbsoluteUrl(getLocalizedRoute("emojiLibrary", currentLang));
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
        </div>
        <EmojisGallery lang={currentLang} />
      </section>

      <section className="tool-content">
        <section className="tool-section">
          <h2>{c.howTitle}</h2>
          <ol>
            {c.howSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p style={{ marginTop: 12, color: "var(--text-tertiary)", fontSize: 13 }}>{c.attribution}</p>
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
