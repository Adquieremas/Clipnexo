import type { Metadata } from "next";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute, type RouteKey } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/lib/blog-content";

type Props = {
  params: Promise<{ lang: string }>;
};

type ClusterItem = {
  title: string;
  desc: string;
  links: { label: string; routeKey: RouteKey }[];
};

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  popularTitle: string;
  popularDesc: string;
  popularTools: { label: string; desc: string; routeKey: HomeToolRoute }[];
  clustersTitle: string;
  clustersDesc: string;
  clusters: ClusterItem[];
  howTitle: string;
  steps: { title: string; text: string }[];
  diffTitle: string;
  diffText: string;
  diffPoints: string[];
  blogTitle: string;
  blogDesc: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaFinalTitle: string;
  ctaFinalText: string;
  ctaFinalPrimary: string;
  ctaFinalSecondary: string;
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
  const filtered = blogPosts.filter((p) => p.featured).slice(0, count);
  return filtered.map((post) => ({
    ...post,
    url: `/${currentLang}/blog/${post.slugs[currentLang]}`,
    categoryLabel: post.category,
  }));
}

function getCategoryLabel(categoryKey: string, lang: string): string {
  const labels: Record<string, Record<string, string>> = {
    tiktok: { es: "TikTok", en: "TikTok", pt: "TikTok" },
    comparativas: { es: "Comparativas", en: "Comparisons", pt: "Comparativos" },
    youtube: { es: "YouTube", en: "YouTube", pt: "YouTube" },
    instagram: { es: "Instagram", en: "Instagram", pt: "Instagram" },
    facebook: { es: "Facebook", en: "Facebook", pt: "Facebook" },
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
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
    h1: "Herramientas gratuitas para creadores de contenido",
    subtitle:
      "Genera hashtags, captions, guiones, títulos y más para TikTok, YouTube, Instagram y Facebook, directo desde tu navegador.",
    heroCtaPrimary: "Ver herramientas",
    heroCtaSecondary: "Ver blog",
    popularTitle: "Herramientas populares de Clipnexo",
    popularDesc:
      "Accede rápido a las herramientas más usadas para TikTok, YouTube, Instagram y redes sociales.",
    popularTools: [
      { label: "Hashtags para TikTok", desc: "Etiquetas para más alcance", routeKey: "tiktokHashtags" },
      { label: "Captions para Instagram", desc: "Descripciones atractivas", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos de YouTube", desc: "Títulos para más clics", routeKey: "youtubeTitleGenerator" },
      { label: "Miniaturas de YouTube", desc: "Descarga miniaturas en calidad", routeKey: "youtubeThumbnailDownloader" },
      { label: "Guiones para videos cortos", desc: "Estructura para TikTok, Reels y Shorts", routeKey: "shortVideoScriptGenerator" },
      { label: "Contador de caracteres", desc: "Mide textos para redes", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Explora herramientas por plataforma",
    clustersDesc: "Encuentra herramientas organizadas según la red social donde creas contenido.",
    clusters: [
      {
        title: "TikTok",
        desc: "Crea hashtags, captions, bios, ideas y ganchos para TikTok.",
        links: [
          { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
          { label: "Captions", routeKey: "tiktokCaptions" as RouteKey },
          { label: "Ideas", routeKey: "tiktokIdeas" as RouteKey },
          { label: "Bio", routeKey: "tiktokBio" as RouteKey },
          { label: "Ganchos", routeKey: "tiktokHooks" as RouteKey },
        ],
      },
      {
        title: "YouTube",
        desc: "Genera títulos, etiquetas, hashtags, descripciones, miniaturas, enlaces de tiempo y calculadoras.",
        links: [
          { label: "Títulos", routeKey: "youtubeTitleGenerator" as RouteKey },
          { label: "Etiquetas", routeKey: "youtubeTagGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "youtubeHashtagGenerator" as RouteKey },
          { label: "Descripciones", routeKey: "youtubeDescriptionGenerator" as RouteKey },
          { label: "Miniaturas", routeKey: "youtubeThumbnailDownloader" as RouteKey },
          { label: "Enlaces de tiempo", routeKey: "youtubeTimestampLinkGenerator" as RouteKey },
        ],
      },
      {
        title: "Instagram",
        desc: "Crea captions, hashtags, bios, ideas para Reels y ganchos para tus publicaciones.",
        links: [
          { label: "Captions", routeKey: "instagramCaptionGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
          { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
          { label: "Ideas para Reels", routeKey: "instagramReelsIdeas" as RouteKey },
          { label: "Ganchos para Reels", routeKey: "instagramReelsHooks" as RouteKey },
        ],
      },
      {
        title: "Facebook",
        desc: "Genera posts, anuncios y textos para Marketplace.",
        links: [
          { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
          { label: "Anuncios", routeKey: "facebookAdGenerator" as RouteKey },
          { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
        ],
      },
      {
        title: "Videos cortos",
        desc: "Crea guiones, títulos, hashtags y estructuras para TikTok, Reels y Shorts.",
        links: [
          { label: "Guiones", routeKey: "shortVideoScriptGenerator" as RouteKey },
          { label: "Títulos y hashtags", routeKey: "shortVideoTitleHashtag" as RouteKey },
        ],
      },
      {
        title: "Redes sociales",
        desc: "Crea textos, mide caracteres y prepara publicaciones para distintas plataformas.",
        links: [
          { label: "Generar textos", routeKey: "socialMediaTextGenerator" as RouteKey },
          { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" as RouteKey },
        ],
      },
    ],
    howTitle: "Cómo funciona Clipnexo",
    steps: [
      { title: "Elige una herramienta", text: "Selecciona si quieres generar textos, crear hashtags, preparar guiones o analizar contenido." },
      { title: "Escribe tu idea o tema", text: "Describe tu tema o pega tu texto para generar resultados rápidos." },
      { title: "Copia el resultado", text: "Obtén el contenido listo para usar desde tu navegador." },
    ],
    diffTitle: "Más que generadores sueltos",
    diffText:
      "Clipnexo reúne herramientas para crear contenido en un solo lugar. Puedes usarlo para trabajar ideas, textos, hashtags, guiones y recursos para tus redes.",
    diffPoints: [
      "Herramientas gratuitas desde el navegador.",
      "Enfoque en creadores de contenido y editores de video.",
      "Compatible con móvil y escritorio.",
      "Herramientas organizadas por plataforma.",
      "Contenido y rutas disponibles en español, inglés y portugués.",
    ],
    blogTitle: "Guías recientes del blog",
    blogDesc: "Artículos y comparativas para ayudarte a aprovechar mejor las herramientas de Clipnexo.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué es Clipnexo?",
        a: "Clipnexo es una plataforma de herramientas online gratuitas para creadores de contenido: genera hashtags, captions, bios, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook.",
      },
      {
        q: "¿Clipnexo solo sirve para TikTok?",
        a: "No. Clipnexo incluye herramientas para TikTok, YouTube, Instagram, Facebook y estudiantes: hashtags, captions, títulos, guiones, resúmenes y más.",
      },
      {
        q: "¿Necesito instalar una aplicación?",
        a: "No. Las herramientas de Clipnexo funcionan desde el navegador, tanto en móvil como en computadora.",
      },
      {
        q: "¿Puedo usar Clipnexo en varios idiomas?",
        a: "Sí. Clipnexo tiene versiones en español, inglés y portugués.",
      },
      {
        q: "¿Las herramientas garantizan más visitas?",
        a: "No. Las herramientas pueden ayudarte a preparar mejor tu contenido, pero el rendimiento depende de la calidad del contenido, la audiencia, la plataforma y otros factores.",
      },
      {
        q: "¿Es gratis usar Clipnexo?",
        a: "Sí. Todas las herramientas de Clipnexo son gratuitas y no requieren registro.",
      },
    ],
    ctaFinalTitle: "Empieza con una herramienta gratuita",
    ctaFinalText: "Elige una herramienta de Clipnexo y crea contenido para tus redes en segundos.",
    ctaFinalPrimary: "Ver herramientas",
    ctaFinalSecondary: "Explorar herramientas de TikTok",
  },
  en: {
    metaTitle: "Clipnexo: free tools for creators",
    metaDescription:
      "Use Clipnexo to create hashtags, captions, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook, right from your browser.",
    h1: "Free tools for content creators",
    subtitle:
      "Generate hashtags, captions, scripts, titles and more for TikTok, YouTube, Instagram and Facebook, right from your browser.",
    heroCtaPrimary: "View tools",
    heroCtaSecondary: "View blog",
    popularTitle: "Popular Clipnexo tools",
    popularDesc:
      "Quick access to the most used tools for TikTok, YouTube, Instagram and social media.",
    popularTools: [
      { label: "TikTok hashtags", desc: "Tags for more reach", routeKey: "tiktokHashtags" },
      { label: "Instagram captions", desc: "Engaging descriptions", routeKey: "instagramCaptionGenerator" },
      { label: "YouTube titles", desc: "Titles for more clicks", routeKey: "youtubeTitleGenerator" },
      { label: "YouTube thumbnails", desc: "Save high-quality thumbnails", routeKey: "youtubeThumbnailDownloader" },
      { label: "Short video scripts", desc: "Structure for TikTok, Reels & Shorts", routeKey: "shortVideoScriptGenerator" },
      { label: "Character counter", desc: "Measure social text", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Explore tools by platform",
    clustersDesc: "Find tools organized by the social network where you create content.",
    clusters: [
      {
        title: "TikTok",
        desc: "Create hashtags, captions, bios, ideas and hooks for TikTok.",
        links: [
          { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
          { label: "Captions", routeKey: "tiktokCaptions" as RouteKey },
          { label: "Ideas", routeKey: "tiktokIdeas" as RouteKey },
          { label: "Bio", routeKey: "tiktokBio" as RouteKey },
          { label: "Hooks", routeKey: "tiktokHooks" as RouteKey },
        ],
      },
      {
        title: "YouTube",
        desc: "Generate titles, tags, hashtags, descriptions, thumbnails, timestamp links and calculators.",
        links: [
          { label: "Titles", routeKey: "youtubeTitleGenerator" as RouteKey },
          { label: "Tags", routeKey: "youtubeTagGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "youtubeHashtagGenerator" as RouteKey },
          { label: "Descriptions", routeKey: "youtubeDescriptionGenerator" as RouteKey },
          { label: "Thumbnails", routeKey: "youtubeThumbnailDownloader" as RouteKey },
          { label: "Timestamp links", routeKey: "youtubeTimestampLinkGenerator" as RouteKey },
        ],
      },
      {
        title: "Instagram",
        desc: "Create captions, hashtags, bios, Reels ideas and hooks for your posts.",
        links: [
          { label: "Captions", routeKey: "instagramCaptionGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
          { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
          { label: "Reels ideas", routeKey: "instagramReelsIdeas" as RouteKey },
          { label: "Reels hooks", routeKey: "instagramReelsHooks" as RouteKey },
        ],
      },
      {
        title: "Facebook",
        desc: "Generate posts, ads and Marketplace texts.",
        links: [
          { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
          { label: "Ads", routeKey: "facebookAdGenerator" as RouteKey },
          { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
        ],
      },
      {
        title: "Short videos",
        desc: "Create scripts, titles, hashtags and structures for TikTok, Reels and Shorts.",
        links: [
          { label: "Scripts", routeKey: "shortVideoScriptGenerator" as RouteKey },
          { label: "Titles & hashtags", routeKey: "shortVideoTitleHashtag" as RouteKey },
        ],
      },
      {
        title: "Social media",
        desc: "Create texts, measure characters and prepare posts for different platforms.",
        links: [
          { label: "Text generator", routeKey: "socialMediaTextGenerator" as RouteKey },
          { label: "Character counter", routeKey: "socialMediaCharacterCounter" as RouteKey },
        ],
      },
    ],
    howTitle: "How Clipnexo works",
    steps: [
      { title: "Choose a tool", text: "Select whether you want to generate text, create hashtags, prepare scripts or analyze content." },
      { title: "Write your idea or topic", text: "Describe your topic or paste your text to get quick results." },
      { title: "Copy the result", text: "Get the content ready to use from your browser." },
    ],
    diffTitle: "More than standalone generators",
    diffText:
      "Clipnexo brings together tools to create content in one place. Use it to work on ideas, texts, hashtags, scripts and resources for your social media.",
    diffPoints: [
      "Free tools from your browser.",
      "Focus on content creators and video editors.",
      "Compatible with mobile and desktop.",
      "Tools organized by platform.",
      "Content and routes available in English, Spanish and Portuguese.",
    ],
    blogTitle: "Recent blog guides",
    blogDesc: "Articles and comparisons to help you get the most out of Clipnexo tools.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "What is Clipnexo?",
        a: "Clipnexo is a platform of free online tools for content creators: generate hashtags, captions, bios, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook.",
      },
      {
        q: "Does Clipnexo only work for TikTok?",
        a: "No. Clipnexo includes tools for TikTok, YouTube, Instagram, Facebook and students: hashtags, captions, titles, scripts, summaries and more.",
      },
      {
        q: "Do I need to install an app?",
        a: "No. Clipnexo tools work from your browser, both on mobile and desktop.",
      },
      {
        q: "Can I use Clipnexo in multiple languages?",
        a: "Yes. Clipnexo has versions in English, Spanish and Portuguese.",
      },
      {
        q: "Do the tools guarantee more views?",
        a: "No. The tools can help you prepare better content, but performance depends on content quality, audience, platform and other factors.",
      },
      {
        q: "Is Clipnexo free to use?",
        a: "Yes. All Clipnexo tools are free and require no sign-up.",
      },
    ],
    ctaFinalTitle: "Start with a free tool",
    ctaFinalText: "Choose a Clipnexo tool and create content for your social media in seconds.",
    ctaFinalPrimary: "View tools",
    ctaFinalSecondary: "Explore TikTok tools",
  },
  pt: {
    metaTitle: "Clipnexo: ferramentas gratuitas para criadores",
    metaDescription:
      "Use o Clipnexo para criar hashtags, legendas, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
    h1: "Ferramentas gratuitas para criadores de conteúdo",
    subtitle:
      "Gere hashtags, legendas, roteiros, títulos e mais para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
    heroCtaPrimary: "Ver ferramentas",
    heroCtaSecondary: "Ver blog",
    popularTitle: "Ferramentas populares do Clipnexo",
    popularDesc:
      "Acesso rápido às ferramentas mais usadas para TikTok, YouTube, Instagram e redes sociais.",
    popularTools: [
      { label: "Hashtags para TikTok", desc: "Etiquetas para mais alcance", routeKey: "tiktokHashtags" },
      { label: "Legendas para Instagram", desc: "Descrições atrativas", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos do YouTube", desc: "Títulos para mais cliques", routeKey: "youtubeTitleGenerator" },
      { label: "Miniaturas do YouTube", desc: "Salve miniaturas em qualidade", routeKey: "youtubeThumbnailDownloader" },
      { label: "Roteiros para vídeos curtos", desc: "Estrutura para Reels, TikTok e Shorts", routeKey: "shortVideoScriptGenerator" },
      { label: "Contador de caracteres", desc: "Meça textos para redes", routeKey: "socialMediaCharacterCounter" },
    ],
    clustersTitle: "Explore ferramentas por plataforma",
    clustersDesc: "Encontre ferramentas organizadas pela rede social onde você cria conteúdo.",
    clusters: [
      {
        title: "TikTok",
        desc: "Crie hashtags, legendas, bios, ideias e ganchos para o TikTok.",
        links: [
          { label: "Hashtags", routeKey: "tiktokHashtags" as RouteKey },
          { label: "Legendas", routeKey: "tiktokCaptions" as RouteKey },
          { label: "Ideias", routeKey: "tiktokIdeas" as RouteKey },
          { label: "Bio", routeKey: "tiktokBio" as RouteKey },
          { label: "Ganchos", routeKey: "tiktokHooks" as RouteKey },
        ],
      },
      {
        title: "YouTube",
        desc: "Gere títulos, etiquetas, hashtags, descrições, miniaturas, links de tempo e calculadoras.",
        links: [
          { label: "Títulos", routeKey: "youtubeTitleGenerator" as RouteKey },
          { label: "Tags", routeKey: "youtubeTagGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "youtubeHashtagGenerator" as RouteKey },
          { label: "Descrições", routeKey: "youtubeDescriptionGenerator" as RouteKey },
          { label: "Miniaturas", routeKey: "youtubeThumbnailDownloader" as RouteKey },
          { label: "Links de tempo", routeKey: "youtubeTimestampLinkGenerator" as RouteKey },
        ],
      },
      {
        title: "Instagram",
        desc: "Crie legendas, hashtags, bios, ideias para Reels e ganchos para suas publicações.",
        links: [
          { label: "Legendas", routeKey: "instagramCaptionGenerator" as RouteKey },
          { label: "Hashtags", routeKey: "instagramHashtagGenerator" as RouteKey },
          { label: "Bio", routeKey: "instagramBioGenerator" as RouteKey },
          { label: "Ideias para Reels", routeKey: "instagramReelsIdeas" as RouteKey },
          { label: "Ganchos para Reels", routeKey: "instagramReelsHooks" as RouteKey },
        ],
      },
      {
        title: "Facebook",
        desc: "Gere posts, anúncios e textos para Marketplace.",
        links: [
          { label: "Posts", routeKey: "facebookPostGenerator" as RouteKey },
          { label: "Anúncios", routeKey: "facebookAdGenerator" as RouteKey },
          { label: "Marketplace", routeKey: "marketplaceTextGenerator" as RouteKey },
        ],
      },
      {
        title: "Vídeos curtos",
        desc: "Crie roteiros, títulos, hashtags e estruturas para TikTok, Reels e Shorts.",
        links: [
          { label: "Roteiros", routeKey: "shortVideoScriptGenerator" as RouteKey },
          { label: "Títulos e hashtags", routeKey: "shortVideoTitleHashtag" as RouteKey },
        ],
      },
      {
        title: "Redes sociais",
        desc: "Crie textos, meça caracteres e prepare publicações para diferentes plataformas.",
        links: [
          { label: "Gerar textos", routeKey: "socialMediaTextGenerator" as RouteKey },
          { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" as RouteKey },
        ],
      },
    ],
    howTitle: "Como o Clipnexo funciona",
    steps: [
      { title: "Escolha uma ferramenta", text: "Selecione se deseja gerar textos, criar hashtags, preparar roteiros ou analisar conteúdo." },
      { title: "Escreva sua ideia ou tema", text: "Descreva seu tema ou cole seu texto para obter resultados rápidos." },
      { title: "Copie o resultado", text: "Obtenha o conteúdo pronto para usar diretamente do seu navegador." },
    ],
    diffTitle: "Mais que geradores soltos",
    diffText:
      "O Clipnexo reúne ferramentas para criar conteúdo em um só lugar. Use para trabalhar ideias, textos, hashtags, roteiros e recursos para suas redes.",
    diffPoints: [
      "Ferramentas gratuitas do navegador.",
      "Foco em criadores de conteúdo e editores de vídeo.",
      "Compatível com celular e computador.",
      "Ferramentas organizadas por plataforma.",
      "Conteúdo e rotas disponíveis em português, inglês e espanhol.",
    ],
    blogTitle: "Guias recentes do blog",
    blogDesc: "Artigos e comparativos para ajudar você a aproveitar melhor as ferramentas do Clipnexo.",
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "O que é o Clipnexo?",
        a: "O Clipnexo é uma plataforma de ferramentas online gratuitas para criadores de conteúdo: gere hashtags, legendas, bios, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook.",
      },
      {
        q: "O Clipnexo serve apenas para o TikTok?",
        a: "Não. O Clipnexo inclui ferramentas para TikTok, YouTube, Instagram, Facebook e estudantes: hashtags, legendas, títulos, roteiros, resumos e mais.",
      },
      {
        q: "Preciso instalar um aplicativo?",
        a: "Não. As ferramentas do Clipnexo funcionam no navegador, tanto no celular quanto no computador.",
      },
      {
        q: "Posso usar o Clipnexo em vários idiomas?",
        a: "Sim. O Clipnexo tem versões em português, inglês e espanhol.",
      },
      {
        q: "As ferramentas garantem mais visualizações?",
        a: "Não. As ferramentas podem ajudar a preparar melhor seu conteúdo, mas o desempenho depende da qualidade do conteúdo, do público, da plataforma e de outros fatores.",
      },
      {
        q: "O Clipnexo é gratuito?",
        a: "Sim. Todas as ferramentas do Clipnexo são gratuitas e não exigem cadastro.",
      },
    ],
    ctaFinalTitle: "Comece com uma ferramenta gratuita",
    ctaFinalText: "Escolha uma ferramenta do Clipnexo e crie conteúdo para suas redes em segundos.",
    ctaFinalPrimary: "Ver ferramentas",
    ctaFinalSecondary: "Explorar ferramentas de TikTok",
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
  const faqs = t.faqs;
  const blogEntries = getFilteredBlogPosts(currentLang, 3);

  const toolsUrl = getToolRoute("tools", currentLang);
  const blogUrl = `/${currentLang}/blog`;
  const tiktokToolsUrl = getToolRoute("tiktokTools", currentLang);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="home-download-section" aria-labelledby="home-download-title">
        <div className="home-hero">
          <h1 id="home-download-title">{t.h1}</h1>
          <p className="home-hero-sub">{t.subtitle}</p>
          <div className="home-cta-actions">
            <Link href={toolsUrl} className="home-hero-cta-primary">
              {t.heroCtaPrimary}
            </Link>
            <Link href={blogUrl} className="home-hero-cta-secondary">
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR TOOLS */}
      <section className="home-section home-popular-section">
        <div className="home-section-header">
          <h2>{t.popularTitle}</h2>
          <p>{t.popularDesc}</p>
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
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CLUSTERS */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.clustersTitle}</h2>
          <p>{t.clustersDesc}</p>
        </div>
        <div className="home-clusters-grid">
          {clusters.map((cluster) => (
            <div key={cluster.title} className="home-cluster-card">
              <h3>{cluster.title}</h3>
              <p>{cluster.desc}</p>
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
          {t.steps.map((step, i) => (
            <div key={i} className="home-step">
              <div className="home-step-number">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.diffTitle}</h2>
          <p>{t.diffText}</p>
        </div>
        <div className="home-diff-grid">
          {t.diffPoints.map((point, i) => (
            <div key={i} className="home-diff-item">
              <span className="home-diff-check">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      {blogEntries.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2>{t.blogTitle}</h2>
            <p>{t.blogDesc}</p>
          </div>
          <div className="home-blog-grid">
            {blogEntries.map((post) => (
              <Link key={post.slugKey} href={post.url} className="home-blog-card">
                <span className="home-blog-category">
                  {getCategoryLabel(post.category, currentLang)}
                </span>
                <h3>{post.content[currentLang]?.title || ""}</h3>
                <p>{post.content[currentLang]?.excerpt || ""}</p>
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
          {faqs.map((faq, i) => (
            <details key={i} className="home-faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="home-cta-section">
        <h2>{t.ctaFinalTitle}</h2>
        <p>{t.ctaFinalText}</p>
        <div className="home-cta-actions">
          <Link href={toolsUrl} className="home-hero-cta-primary">
            {t.ctaFinalPrimary}
          </Link>
          <Link href={tiktokToolsUrl} className="home-hero-cta-secondary">
            {t.ctaFinalSecondary}
          </Link>
        </div>
      </section>
    </main>
  );
}
