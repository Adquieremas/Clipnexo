import type { Metadata } from "next";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute, type RouteKey } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/lib/blog-content";
import {
  getCategoryName,
  getPopularSounds,
  getSoundAudioUrl,
  listCategories,
  SoundsDbNotConfiguredError,
} from "@/lib/sounds-db";
import { SoundPlayerProvider } from "@/components/sounds/SoundPlayerProvider";
import SoundCard from "@/components/sounds/SoundCard";

// Revalidate periodically so newly uploaded sounds appear in the spotlight
// without requiring a redeploy.
export const revalidate = 300;

const soundsSpotlightContent: Record<string, { title: string; cta: string; searchPlaceholder: string; searchCta: string }> = {
  es: {
    title: "Sonidos para tus videos",
    cta: "Ver toda la biblioteca",
    searchPlaceholder: "Buscar sonidos...",
    searchCta: "Buscar",
  },
  en: {
    title: "Sounds for your videos",
    cta: "Browse the full library",
    searchPlaceholder: "Search sounds...",
    searchCta: "Search",
  },
  pt: {
    title: "Sons para seus vídeos",
    cta: "Ver toda a biblioteca",
    searchPlaceholder: "Buscar sons...",
    searchCta: "Buscar",
  },
};

type Props = {
  params: Promise<{ lang: string }>;
};

type ClusterItem = {
  title: string;
  description: string;
  links: { label: string; routeKey: RouteKey }[];
};

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  heroCtaPrimary: string;
  heroCtaSounds: string;
  popularTitle: string;
  popularTools: { label: string; description: string; routeKey: HomeToolRoute }[];
  clustersTitle: string;
  clusters: ClusterItem[];
  howTitle: string;
  steps: { title: string; text: string }[];
  diffTitle: string;
  diffText: string;
  diffPoints: string[];
  blogTitle: string;
  blogDescription: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
};

const titles: Record<string, string> = {
  es: "Clipnexo: herramientas gratuitas para creadores de contenido",
  en: "Clipnexo: free tools for content creators",
  pt: "Clipnexo: ferramentas gratuitas para criadores de conteúdo",
};

const descriptions: Record<string, string> = {
  es: "Usa Clipnexo para crear hashtags, captions, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook, directo desde tu navegador.",
  en: "Use Clipnexo to create hashtags, captions, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook, right from your browser.",
  pt: "Use o Clipnexo para criar hashtags, legendas, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
};

function getToolRoute(key: RouteKey, lang: string): string {
  return getLocalizedRoute(key, normalizeLang(lang));
}

function getFilteredBlogPosts(lang: string, count: number = 3): (BlogPost & { url: string; categoryLabel: string })[] {
  const currentLang = normalizeLang(lang);
  const filtered = blogPosts.slice(0, count);
  return filtered.map((post) => ({
    ...post,
    url: `/${currentLang}/blog/${post.slugs[currentLang]}`,
    categoryLabel: post.category,
  }));
}

function getCategoryLabel(categoryKey: string, lang: string): string {
  const labels: Record<string, Record<string, string>> = {
    "social-media": { es: "Redes sociales", en: "Social media", pt: "Redes sociais" },
    creators: { es: "Creadores", en: "Creators", pt: "Criadores" },
  };
  return labels[categoryKey]?.[lang] || categoryKey;
}

const homeToolIconPaths = {
  tiktokHashtags: "M9 4 6 20m12-16-3 16M4 9h17M3 15h17",
  instagramCaptionGenerator: "M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 5h10m-10 3h6",
  youtubeTitleGenerator: "M4 6h16M4 6v3m16-3v3m-8-3v12m-3 0h6",
  shortVideoScriptGenerator: "M5 6h14v14H5zM4 6l15-3m-9 10h4m-4 3h7",
  socialMediaCharacterCounter: "M3 8h18v8H3zm4 0v3m5-3v4m5-4v3",
  youtubeThumbnailDownloader: "M3 6h18v12H3zM3 6l9 6 9-6",
} satisfies Partial<Record<RouteKey, string>>;

type HomeToolRoute = keyof typeof homeToolIconPaths;

function HomeToolIcon({ routeKey }: { routeKey: HomeToolRoute }) {
  return (
    <span className="home-tool-card-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={homeToolIconPaths[routeKey]} />
      </svg>
    </span>
  );
}

const pageContent: Record<string, PageContent> = {
  es: {
    metaTitle: "Clipnexo: herramientas gratuitas para creadores",
    metaDescription:
      "Usa Clipnexo para crear hashtags, captions, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook, directo desde tu navegador.",
    h1: "Herramientas y sonidos gratis para creadores",
    subtitle: "Hashtags, captions, guiones y una biblioteca de sonidos lista para usar.",
    heroCtaPrimary: "Ver herramientas",
    heroCtaSounds: "Explorar sonidos",
    popularTitle: "Herramientas populares",
    popularTools: [
      { label: "Hashtags para TikTok", description: "Encuentra hashtags relevantes para tus videos.", routeKey: "tiktokHashtags" },
      { label: "Captions para Instagram", description: "Escribe pies de foto claros y atractivos.", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos de YouTube", description: "Genera títulos que llamen la atención.", routeKey: "youtubeTitleGenerator" },
      { label: "Miniaturas de YouTube", description: "Descarga miniaturas en buena calidad.", routeKey: "youtubeThumbnailDownloader" },
      { label: "Guiones para videos cortos", description: "Crea la estructura de tu próximo video.", routeKey: "shortVideoScriptGenerator" },
      { label: "Contador de caracteres", description: "Revisa el largo ideal antes de publicar.", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Herramientas por plataforma",
    clusters: [
      { title: "TikTok", description: "Ideas, hooks, captions y hashtags para crecer en TikTok.", links: [
        { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
        { label: "Captions", routeKey: "tiktokCaptions" as RouteKey },
        { label: "Ideas", routeKey: "tiktokIdeas" as RouteKey },
        { label: "Bio", routeKey: "tiktokBio" as RouteKey },
      ] },
      { title: "YouTube", description: "Optimiza títulos, etiquetas, descripciones y miniaturas.", links: [
        { label: "Títulos", routeKey: "youtubeTitleGenerator" as RouteKey },
        { label: "Etiquetas", routeKey: "youtubeTagGenerator" as RouteKey },
        { label: "Descripciones", routeKey: "youtubeDescriptionGenerator" as RouteKey },
        { label: "Miniaturas", routeKey: "youtubeThumbnailDownloader" as RouteKey },
      ] },
      { title: "Instagram", description: "Crea captions, bios, hashtags e ideas para Reels.", links: [
        { label: "Captions", routeKey: "instagramCaptionGenerator" as RouteKey },
        { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
        { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
        { label: "Ideas para Reels", routeKey: "instagramReelsIdeas" as RouteKey },
      ] },
      { title: "Facebook", description: "Genera posts, anuncios y textos para Marketplace.", links: [
        { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
        { label: "Anuncios", routeKey: "facebookAdGenerator" as RouteKey },
        { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
      ] },
    ],
    howTitle: "Cómo funciona Clipnexo",
    steps: [
      { title: "Elige una herramienta", text: "Selecciona si quieres generar textos, crear hashtags, preparar guiones o analizar contenido." },
      { title: "Escribe tu idea o tema", text: "Describe tu tema o pega tu texto para generar resultados rápidos." },
      { title: "Copia el resultado", text: "Obtén contenido listo para usar desde tu navegador." },
    ],
    diffTitle: "Más que generadores sueltos",
    diffText: "Clipnexo reúne herramientas para crear contenido en un solo lugar. Trabaja ideas, textos, hashtags, guiones y recursos para tus redes.",
    diffPoints: [
      "Herramientas gratuitas desde el navegador.",
      "Enfoque en creadores de contenido y editores de video.",
      "Compatible con móvil y escritorio.",
      "Herramientas organizadas por plataforma.",
      "Contenido y rutas disponibles en español, inglés y portugués.",
    ],
    blogTitle: "Guías del blog",
    blogDescription: "Artículos y comparativas para ayudarte a aprovechar mejor las herramientas de Clipnexo.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { question: "¿Qué es Clipnexo?", answer: "Clipnexo es una plataforma de herramientas online gratuitas para creadores de contenido: genera hashtags, captions, bios, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook." },
      { question: "¿Clipnexo solo sirve para TikTok?", answer: "No. Clipnexo incluye herramientas para TikTok, YouTube, Instagram, Facebook y estudiantes: hashtags, captions, títulos, guiones, resúmenes y más." },
      { question: "¿Necesito instalar una aplicación?", answer: "No. Las herramientas de Clipnexo funcionan desde el navegador, tanto en móvil como en computadora." },
      { question: "¿Puedo usar Clipnexo en varios idiomas?", answer: "Sí. Clipnexo tiene versiones en español, inglés y portugués." },
      { question: "¿Las herramientas garantizan más visitas?", answer: "No. Las herramientas pueden ayudarte a preparar mejor tu contenido, pero el rendimiento depende de la calidad del contenido, la audiencia, la plataforma y otros factores." },
      { question: "¿Es gratis usar Clipnexo?", answer: "Sí. Todas las herramientas de Clipnexo son gratuitas y no requieren registro." },
    ],
    finalCtaTitle: "Empieza con una herramienta gratuita",
    finalCtaText: "Elige una herramienta de Clipnexo y crea contenido para tus redes en segundos.",
    finalCtaPrimary: "Ver herramientas",
    finalCtaSecondary: "Explorar herramientas de TikTok",
  },
  en: {
    metaTitle: "Clipnexo: free tools for creators",
    metaDescription:
      "Use Clipnexo to create hashtags, captions, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook, right from your browser.",
    h1: "Free tools and sounds for creators",
    subtitle: "Hashtags, captions, scripts and a ready-to-use sound library.",
    heroCtaPrimary: "View tools",
    heroCtaSounds: "Explore sounds",
    popularTitle: "Popular tools",
    popularTools: [
      { label: "TikTok hashtags", description: "Find relevant hashtags for your videos.", routeKey: "tiktokHashtags" },
      { label: "Instagram captions", description: "Write clear, engaging captions fast.", routeKey: "instagramCaptionGenerator" },
      { label: "YouTube titles", description: "Generate titles that grab attention.", routeKey: "youtubeTitleGenerator" },
      { label: "YouTube thumbnails", description: "Download thumbnails in high quality.", routeKey: "youtubeThumbnailDownloader" },
      { label: "Short video scripts", description: "Build the structure for your next video.", routeKey: "shortVideoScriptGenerator" },
      { label: "Character counter", description: "Check the ideal length before posting.", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Tools by platform",
    clusters: [
      { title: "TikTok", description: "Ideas, hooks, captions, and hashtags to grow on TikTok.", links: [
        { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
        { label: "Captions", routeKey: "tiktokCaptions" as RouteKey },
        { label: "Ideas", routeKey: "tiktokIdeas" as RouteKey },
        { label: "Bio", routeKey: "tiktokBio" as RouteKey },
      ] },
      { title: "YouTube", description: "Optimize titles, tags, descriptions, and thumbnails.", links: [
        { label: "Titles", routeKey: "youtubeTitleGenerator" as RouteKey },
        { label: "Tags", routeKey: "youtubeTagGenerator" as RouteKey },
        { label: "Descriptions", routeKey: "youtubeDescriptionGenerator" as RouteKey },
        { label: "Thumbnails", routeKey: "youtubeThumbnailDownloader" as RouteKey },
      ] },
      { title: "Instagram", description: "Create captions, bios, hashtags, and Reels ideas.", links: [
        { label: "Captions", routeKey: "instagramCaptionGenerator" as RouteKey },
        { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
        { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
        { label: "Reels ideas", routeKey: "instagramReelsIdeas" as RouteKey },
      ] },
      { title: "Facebook", description: "Generate posts, ads, and Marketplace copy.", links: [
        { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
        { label: "Ads", routeKey: "facebookAdGenerator" as RouteKey },
        { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
      ] },
    ],
    howTitle: "How Clipnexo works",
    steps: [
      { title: "Choose a tool", text: "Select whether you want to generate text, create hashtags, prepare scripts, or analyze content." },
      { title: "Write your idea or topic", text: "Describe your topic or paste your text to get quick results." },
      { title: "Copy the result", text: "Get content ready to use directly from your browser." },
    ],
    diffTitle: "More than standalone generators",
    diffText: "Clipnexo brings content creation tools together in one place. Work on ideas, text, hashtags, scripts, and resources for your social media.",
    diffPoints: [
      "Free tools available in your browser.",
      "Built for content creators and video editors.",
      "Works on mobile and desktop.",
      "Tools organized by platform.",
      "Content and routes available in English, Spanish, and Portuguese.",
    ],
    blogTitle: "Blog guides",
    blogDescription: "Articles and comparisons to help you get more from Clipnexo tools.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { question: "What is Clipnexo?", answer: "Clipnexo is a platform of free online tools for content creators: generate hashtags, captions, bios, scripts, titles, and text for TikTok, YouTube, Instagram, and Facebook." },
      { question: "Does Clipnexo only work for TikTok?", answer: "No. Clipnexo includes tools for TikTok, YouTube, Instagram, Facebook, and students: hashtags, captions, titles, scripts, summaries, and more." },
      { question: "Do I need to install an app?", answer: "No. Clipnexo tools work in your browser on both mobile and desktop." },
      { question: "Can I use Clipnexo in multiple languages?", answer: "Yes. Clipnexo is available in English, Spanish, and Portuguese." },
      { question: "Do the tools guarantee more views?", answer: "No. The tools can help you prepare better content, but performance depends on content quality, audience, platform, and other factors." },
      { question: "Is Clipnexo free to use?", answer: "Yes. All Clipnexo tools are free and require no registration." },
    ],
    finalCtaTitle: "Start with a free tool",
    finalCtaText: "Choose a Clipnexo tool and create content for your social media in seconds.",
    finalCtaPrimary: "View tools",
    finalCtaSecondary: "Explore TikTok tools",
  },
  pt: {
    metaTitle: "Clipnexo: ferramentas gratuitas para criadores",
    metaDescription:
      "Use o Clipnexo para criar hashtags, legendas, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
    h1: "Ferramentas e sons gratuitos para criadores",
    subtitle: "Hashtags, legendas, roteiros e uma biblioteca de sons pronta para usar.",
    heroCtaPrimary: "Ver ferramentas",
    heroCtaSounds: "Explorar sons",
    popularTitle: "Ferramentas populares",
    popularTools: [
      { label: "Hashtags para TikTok", description: "Encontre hashtags relevantes para seus vídeos.", routeKey: "tiktokHashtags" },
      { label: "Legendas para Instagram", description: "Escreva legendas claras e envolventes.", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos do YouTube", description: "Gere títulos que chamam a atenção.", routeKey: "youtubeTitleGenerator" },
      { label: "Miniaturas do YouTube", description: "Baixe miniaturas em boa qualidade.", routeKey: "youtubeThumbnailDownloader" },
      { label: "Roteiros para vídeos curtos", description: "Monte a estrutura do seu próximo vídeo.", routeKey: "shortVideoScriptGenerator" },
      { label: "Contador de caracteres", description: "Confira o tamanho ideal antes de publicar.", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Ferramentas por plataforma",
    clusters: [
      { title: "TikTok", description: "Ideias, hooks, legendas e hashtags para crescer no TikTok.", links: [
        { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
        { label: "Legendas", routeKey: "tiktokCaptions" as RouteKey },
        { label: "Ideias", routeKey: "tiktokIdeas" as RouteKey },
        { label: "Bio", routeKey: "tiktokBio" as RouteKey },
      ] },
      { title: "YouTube", description: "Otimize títulos, tags, descrições e miniaturas.", links: [
        { label: "Títulos", routeKey: "youtubeTitleGenerator" as RouteKey },
        { label: "Tags", routeKey: "youtubeTagGenerator" as RouteKey },
        { label: "Descrições", routeKey: "youtubeDescriptionGenerator" as RouteKey },
        { label: "Miniaturas", routeKey: "youtubeThumbnailDownloader" as RouteKey },
      ] },
      { title: "Instagram", description: "Crie legendas, bios, hashtags e ideias para Reels.", links: [
        { label: "Legendas", routeKey: "instagramCaptionGenerator" as RouteKey },
        { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
        { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
        { label: "Ideias para Reels", routeKey: "instagramReelsIdeas" as RouteKey },
      ] },
      { title: "Facebook", description: "Gere posts, anúncios e textos para Marketplace.", links: [
        { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
        { label: "Anúncios", routeKey: "facebookAdGenerator" as RouteKey },
        { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
      ] },
    ],
    howTitle: "Como o Clipnexo funciona",
    steps: [
      { title: "Escolha uma ferramenta", text: "Selecione se deseja gerar textos, criar hashtags, preparar roteiros ou analisar conteúdo." },
      { title: "Escreva sua ideia ou tema", text: "Descreva seu tema ou cole seu texto para obter resultados rápidos." },
      { title: "Copie o resultado", text: "Obtenha conteúdo pronto para usar diretamente do seu navegador." },
    ],
    diffTitle: "Mais que geradores soltos",
    diffText: "O Clipnexo reúne ferramentas de criação de conteúdo em um só lugar. Trabalhe ideias, textos, hashtags, roteiros e recursos para suas redes.",
    diffPoints: [
      "Ferramentas gratuitas direto do navegador.",
      "Foco em criadores de conteúdo e editores de vídeo.",
      "Compatível com celular e computador.",
      "Ferramentas organizadas por plataforma.",
      "Conteúdo e rotas disponíveis em português, inglês e espanhol.",
    ],
    blogTitle: "Guias do blog",
    blogDescription: "Artigos e comparativos para ajudar você a aproveitar melhor as ferramentas do Clipnexo.",
    faqTitle: "Perguntas frequentes",
    faqs: [
      { question: "O que é o Clipnexo?", answer: "O Clipnexo é uma plataforma de ferramentas online gratuitas para criadores de conteúdo: gere hashtags, legendas, bios, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook." },
      { question: "O Clipnexo serve apenas para o TikTok?", answer: "Não. O Clipnexo inclui ferramentas para TikTok, YouTube, Instagram, Facebook e estudantes: hashtags, legendas, títulos, roteiros, resumos e mais." },
      { question: "Preciso instalar um aplicativo?", answer: "Não. As ferramentas do Clipnexo funcionam no navegador, tanto no celular quanto no computador." },
      { question: "Posso usar o Clipnexo em vários idiomas?", answer: "Sim. O Clipnexo está disponível em português, inglês e espanhol." },
      { question: "As ferramentas garantem mais visualizações?", answer: "Não. As ferramentas podem ajudar a preparar melhor seu conteúdo, mas o desempenho depende da qualidade do conteúdo, do público, da plataforma e de outros fatores." },
      { question: "O Clipnexo é gratuito?", answer: "Sim. Todas as ferramentas do Clipnexo são gratuitas e não exigem cadastro." },
    ],
    finalCtaTitle: "Comece com uma ferramenta gratuita",
    finalCtaText: "Escolha uma ferramenta do Clipnexo e crie conteúdo para suas redes em segundos.",
    finalCtaPrimary: "Ver ferramentas",
    finalCtaSecondary: "Explorar ferramentas de TikTok",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  return buildSeoMetadata({
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    routeKey: "home",
    lang: currentLang,
  });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  const t = pageContent[currentLang];
  const popularTools = t.popularTools;
  const clusters = t.clusters;
  const blogEntries = getFilteredBlogPosts(currentLang, 3);
  const readMoreLabel = { es: "Leer guía", en: "Read guide", pt: "Ler guia" }[currentLang];

  const toolsUrl = getToolRoute("tools", currentLang);
  const tiktokToolsUrl = getToolRoute("tiktokTools", currentLang);
  const soundsUrl = getToolRoute("soundsLibrary", currentLang);
  const soundsSpotlight = soundsSpotlightContent[currentLang] || soundsSpotlightContent.es;

  let popularSounds: Awaited<ReturnType<typeof getPopularSounds>> = [];
  let soundCategories: Awaited<ReturnType<typeof listCategories>> = [];
  try {
    [popularSounds, soundCategories] = await Promise.all([getPopularSounds(8), listCategories()]);
  } catch (error) {
    if (!(error instanceof SoundsDbNotConfiguredError)) throw error;
    // SOUNDS_DB not provisioned yet (e.g. during initial local dev) — hide the spotlight gracefully.
  }

  return (
    <main className="home-page">
      <section className="home-hero-section" aria-labelledby="home-hero-title">
        <div className="home-hero">
          <h1 id="home-hero-title">{t.h1}</h1>
          <p className="home-hero-sub">{t.subtitle}</p>
          <div className="home-cta-actions">
            <Link href={soundsUrl} className="home-hero-cta-primary">
              {t.heroCtaSounds}
            </Link>
            <Link href={toolsUrl} className="home-hero-cta-secondary">
              {t.heroCtaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* SOUNDS SPOTLIGHT */}
      {popularSounds.length > 0 && (
        <SoundPlayerProvider>
          <section className="home-section home-sounds-section">
            <div className="home-section-header">
              <h2>{soundsSpotlight.title}</h2>
              <Link href={soundsUrl} className="home-section-link">
                {soundsSpotlight.cta}
              </Link>
            </div>

            <form action={soundsUrl} method="get" className="home-sounds-search">
              <input
                type="search"
                name="q"
                placeholder={soundsSpotlight.searchPlaceholder}
                className="home-sounds-search-input"
                aria-label={soundsSpotlight.searchPlaceholder}
              />
              <button type="submit" className="home-sounds-search-btn">
                {soundsSpotlight.searchCta}
              </button>
            </form>

            {soundCategories.length > 0 && (
              <div className="home-sounds-categories">
                {soundCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`${soundsUrl}?categoria=${category.id}`}
                    className="home-sounds-category-chip"
                  >
                    {getCategoryName(category, currentLang)}
                  </Link>
                ))}
              </div>
            )}

            <div className="sounds-grid">
              {popularSounds.map((sound) => {
                const category = soundCategories.find((c) => c.id === sound.category_id);
                return (
                  <SoundCard
                    key={sound.id}
                    sound={{
                      id: sound.id,
                      title: sound.title,
                      categoryId: sound.category_id,
                      categoryLabel: category ? getCategoryName(category, currentLang) : sound.category_id,
                      audioUrl: getSoundAudioUrl(sound.r2_key),
                      durationMs: sound.duration_ms,
                      playCount: sound.play_count,
                    }}
                    lang={currentLang}
                    pageUrl={`${soundsUrl}/${sound.category_id}/${sound.id}`}
                    titleHref={`${soundsUrl}/${sound.category_id}/${sound.id}`}
                  />
                );
              })}
            </div>
          </section>
        </SoundPlayerProvider>
      )}

      {/* POPULAR TOOLS */}
      <section className="home-section home-popular-section">
        <div className="home-section-header">
          <h2>{t.popularTitle}</h2>
        </div>
        <div className="home-tools-grid">
          {popularTools.map((tool) => (
            <Link
              key={tool.routeKey}
              href={getToolRoute(tool.routeKey, currentLang)}
              className="home-tool-card"
            >
              <HomeToolIcon routeKey={tool.routeKey} />
              <h3>{tool.label}</h3>
              <p>{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CLUSTERS */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.clustersTitle}</h2>
        </div>
        <div className="home-clusters-grid">
          {clusters.map((cluster) => (
            <div key={cluster.title} className="home-cluster-card">
              <h3>{cluster.title}</h3>
              <p>{cluster.description}</p>
              <div className="home-cluster-links">
                {cluster.links.map((link) => (
                  <Link
                    key={link.routeKey}
                    href={getToolRoute(link.routeKey, currentLang)}
                    className="home-cluster-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.howTitle}</h2>
        </div>
        <div className="home-steps">
          {t.steps.map((step, index) => (
            <div key={step.title} className="home-step">
              <div className="home-step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="home-section">
        <div className="home-section-header home-section-header-stacked">
          <h2>{t.diffTitle}</h2>
          <p>{t.diffText}</p>
        </div>
        <div className="home-diff-grid">
          {t.diffPoints.map((point) => (
            <div key={point} className="home-diff-item">
              <span className="home-diff-check" aria-hidden="true">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      {blogEntries.length > 0 && (
        <section className="home-section">
          <div className="home-section-header home-section-header-stacked">
            <h2>{t.blogTitle}</h2>
            <p>{t.blogDescription}</p>
          </div>
          <div className="home-blog-grid">
            {blogEntries.map((post) => (
              <Link key={post.slugKey} href={post.url} className="home-blog-card">
                <span className="home-blog-category">
                  {getCategoryLabel(post.category, currentLang)}
                </span>
                <h3>{post.content[currentLang]?.title || ""}</h3>
                <p>{post.content[currentLang]?.excerpt || ""}</p>
                <span className="home-blog-readmore">{readMoreLabel} →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="home-faq-list">
          {t.faqs.map((faq) => (
            <details key={faq.question} className="home-faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-cta-section">
        <h2>{t.finalCtaTitle}</h2>
        <p>{t.finalCtaText}</p>
        <div className="home-cta-actions">
          <Link href={toolsUrl} className="home-hero-cta-primary">
            {t.finalCtaPrimary}
          </Link>
          <Link href={tiktokToolsUrl} className="home-hero-cta-secondary">
            {t.finalCtaSecondary}
          </Link>
        </div>
      </section>

    </main>
  );
}
