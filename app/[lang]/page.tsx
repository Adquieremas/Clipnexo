import type { Metadata } from "next";
import Link from "next/link";
import DownloaderBox from "@/components/DownloaderBox";
import { normalizeLang, getLocalizedRoute, type RouteKey } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/lib/blog-content";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  ctaPrimary: string;
  ctaSecondary: string;
  ctaNote: string;
  downloadTitle: string;
  popularTitle: string;
  popularDesc: string;
  popularTools: { label: string; desc: string; routeKey: RouteKey; icon: string }[];
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
  es: "Clipnexo: descargar TikTok y crear contenido",
  en: "Clipnexo: download TikTok and create content",
  pt: "Clipnexo: baixar TikTok e criar conteúdo social",
};

const descriptions: Record<string, string> = {
  es: "Usa Clipnexo para descargar videos de TikTok, convertir audio y crear hashtags, captions, guiones, títulos y textos para redes sociales.",
  en: "Use Clipnexo to download TikTok videos, convert audio and create hashtags, captions, scripts, titles and texts for social media.",
  pt: "Use o Clipnexo para baixar vídeos do TikTok, converter áudio e criar hashtags, legendas, roteiros, títulos e textos para redes sociais.",
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

const pageContent: Record<string, PageContent> = {
  es: {
    metaTitle: "Clipnexo: descargar TikTok y crear contenido social",
    metaDescription:
      "Usa Clipnexo para descargar videos de TikTok, convertir audio y crear hashtags, captions, guiones, títulos y textos para redes sociales.",
    h1: "Descarga y crea contenido para redes sociales",
    subtitle:
      "Usa Clipnexo para descargar videos de TikTok, convertir audio, generar hashtags, crear captions, ideas, guiones y textos para tus redes.",
    ctaPrimary: "Descargar video",
    ctaSecondary: "Ver herramientas",
    ctaNote: "Gratis, rápido y desde el navegador",
    downloadTitle: "",
    popularTitle: "Herramientas populares de Clipnexo",
    popularDesc:
      "Accede rápido a las herramientas más usadas para TikTok, YouTube, Instagram y redes sociales.",
    popularTools: [
      { label: "Descargar videos de TikTok", desc: "Sin marca de agua en HD", routeKey: "video" as RouteKey, icon: "📹" },
      { label: "TikTok a MP3", desc: "Convierte video a audio", routeKey: "mp3" as RouteKey, icon: "🎵" },
      { label: "Descargar TikTok sin marca", desc: "Video limpio y rápido", routeKey: "withoutWatermark" as RouteKey, icon: "🎬" },
      { label: "Hashtags para TikTok", desc: "Etiquetas para más alcance", routeKey: "tiktokHashtags" as RouteKey, icon: "#️⃣" },
      { label: "Captions para Instagram", desc: "Descripciones atractivas", routeKey: "instagramCaptionGenerator" as RouteKey, icon: "📝" },
      { label: "Títulos de YouTube", desc: "Títulos para más clics", routeKey: "youtubeTitleGenerator" as RouteKey, icon: "📺" },
      { label: "Guiones para videos cortos", desc: "Estructura para TikTok, Reels y Shorts", routeKey: "shortVideoScriptGenerator" as RouteKey, icon: "✍️" },
      { label: "Contador de caracteres", desc: "Mide textos para redes", routeKey: "socialMediaCharacterCounter" as RouteKey, icon: "📏" },
    ],
    clustersTitle: "Explora herramientas por plataforma",
    clustersDesc: "Encuentra herramientas organizadas según la red social donde creas contenido.",
    clusters: [
      {
        title: "TikTok",
        desc: "Descarga videos, convierte audio, crea hashtags, captions, bios, ideas y ganchos para TikTok.",
        links: [
          { label: "Descargar videos", routeKey: "video" as RouteKey },
          { label: "TikTok a MP3", routeKey: "mp3" as RouteKey },
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
      { title: "Elige una herramienta", text: "Selecciona si quieres descargar, generar textos, crear hashtags, preparar guiones o analizar contenido." },
      { title: "Pega un enlace o escribe tu idea", text: "Puedes pegar un enlace de TikTok o escribir un tema para generar resultados rápidos." },
      { title: "Copia o descarga el resultado", text: "Obtén el contenido listo para usar desde tu navegador." },
    ],
    diffTitle: "Más que un descargador de TikTok",
    diffText:
      "Clipnexo reúne herramientas para descargar videos, convertir audio y crear contenido para diferentes plataformas. Puedes usarlo para trabajar ideas, textos, hashtags, guiones y recursos para tus redes.",
    diffPoints: [
      "Herramientas gratuitas desde el navegador.",
      "Enfoque en creadores de contenido.",
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
        a: "Clipnexo es una plataforma de herramientas online para descargar videos de TikTok y crear contenido para redes sociales como TikTok, YouTube, Instagram y Facebook.",
      },
      {
        q: "¿Clipnexo solo sirve para TikTok?",
        a: "No. Además del descargador de TikTok, Clipnexo incluye herramientas para generar hashtags, captions, títulos, guiones, textos para redes y recursos para YouTube.",
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
        a: "No. Las herramientas pueden ayudarte a preparar mejor tu contenido, pero el rendimiento depende de la calidad del video, la audiencia, la plataforma y otros factores.",
      },
      {
        q: "¿Puedo usar los videos descargados libremente?",
        a: "Debes respetar los derechos de autor y las condiciones de cada plataforma. Usa el contenido descargado de forma responsable y con permiso cuando corresponda.",
      },
    ],
    ctaFinalTitle: "Empieza con una herramienta gratuita",
    ctaFinalText: "Elige una herramienta de Clipnexo y crea, descarga o prepara contenido para tus redes en segundos.",
    ctaFinalPrimary: "Ver herramientas",
    ctaFinalSecondary: "Descargar video de TikTok",
  },
  en: {
    metaTitle: "Clipnexo: download TikTok and create social content",
    metaDescription:
      "Use Clipnexo to download TikTok videos, convert audio and create hashtags, captions, scripts, titles and texts for social media.",
    h1: "Download and create content for social media",
    subtitle:
      "Use Clipnexo to download TikTok videos, convert audio, generate hashtags, captions, ideas, scripts and social media texts.",
    ctaPrimary: "Download video",
    ctaSecondary: "View tools",
    ctaNote: "Free, fast and from your browser",
    downloadTitle: "",
    popularTitle: "Popular Clipnexo tools",
    popularDesc:
      "Quick access to the most used tools for TikTok, YouTube, Instagram and social media.",
    popularTools: [
      { label: "Download TikTok videos", desc: "No watermark in HD", routeKey: "video" as RouteKey, icon: "📹" },
      { label: "TikTok to MP3", desc: "Convert video to audio", routeKey: "mp3" as RouteKey, icon: "🎵" },
      { label: "Download TikTok no watermark", desc: "Clean and fast", routeKey: "withoutWatermark" as RouteKey, icon: "🎬" },
      { label: "TikTok hashtags", desc: "Tags for more reach", routeKey: "tiktokHashtags" as RouteKey, icon: "#️⃣" },
      { label: "Instagram captions", desc: "Engaging descriptions", routeKey: "instagramCaptionGenerator" as RouteKey, icon: "📝" },
      { label: "YouTube titles", desc: "Titles for more clicks", routeKey: "youtubeTitleGenerator" as RouteKey, icon: "📺" },
      { label: "Short video scripts", desc: "Structure for TikTok, Reels & Shorts", routeKey: "shortVideoScriptGenerator" as RouteKey, icon: "✍️" },
      { label: "Character counter", desc: "Measure social text", routeKey: "socialMediaCharacterCounter" as RouteKey, icon: "📏" },
    ],
    clustersTitle: "Explore tools by platform",
    clustersDesc: "Find tools organized by the social network where you create content.",
    clusters: [
      {
        title: "TikTok",
        desc: "Download videos, convert audio, create hashtags, captions, bios, ideas and hooks for TikTok.",
        links: [
          { label: "Download videos", routeKey: "video" as RouteKey },
          { label: "TikTok to MP3", routeKey: "mp3" as RouteKey },
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
      { title: "Choose a tool", text: "Select whether you want to download, generate text, create hashtags, prepare scripts or analyze content." },
      { title: "Paste a link or write your idea", text: "You can paste a TikTok link or type a topic to get quick results." },
      { title: "Copy or download the result", text: "Get the content ready to use from your browser." },
    ],
    diffTitle: "More than a TikTok downloader",
    diffText:
      "Clipnexo brings together tools to download videos, convert audio and create content for different platforms. Use it to work on ideas, texts, hashtags, scripts and resources for your social media.",
    diffPoints: [
      "Free tools from your browser.",
      "Focus on content creators.",
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
        a: "Clipnexo is a platform of online tools to download TikTok videos and create content for social networks like TikTok, YouTube, Instagram and Facebook.",
      },
      {
        q: "Does Clipnexo only work for TikTok?",
        a: "No. Besides the TikTok downloader, Clipnexo includes tools to generate hashtags, captions, titles, scripts, social media texts and YouTube resources.",
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
        a: "No. The tools can help you prepare better content, but performance depends on video quality, audience, platform and other factors.",
      },
      {
        q: "Can I freely use downloaded videos?",
        a: "You must respect copyright and each platform's terms. Use downloaded content responsibly and with permission when applicable.",
      },
    ],
    ctaFinalTitle: "Start with a free tool",
    ctaFinalText: "Choose a Clipnexo tool and create, download or prepare content for your social media in seconds.",
    ctaFinalPrimary: "View tools",
    ctaFinalSecondary: "Download TikTok video",
  },
  pt: {
    metaTitle: "Clipnexo: baixar TikTok e criar conteúdo social",
    metaDescription:
      "Use o Clipnexo para baixar vídeos do TikTok, converter áudio e criar hashtags, legendas, roteiros, títulos e textos para redes sociais.",
    h1: "Baixe e crie conteúdo para redes sociais",
    subtitle:
      "Use o Clipnexo para baixar vídeos do TikTok, converter áudio, gerar hashtags, legendas, ideias, roteiros e textos para redes sociais.",
    ctaPrimary: "Baixar vídeo",
    ctaSecondary: "Ver ferramentas",
    ctaNote: "Grátis, rápido e do navegador",
    downloadTitle: "",
    popularTitle: "Ferramentas populares do Clipnexo",
    popularDesc:
      "Acesso rápido às ferramentas mais usadas para TikTok, YouTube, Instagram e redes sociais.",
    popularTools: [
      { label: "Baixar vídeos do TikTok", desc: "Sem marca d'água em HD", routeKey: "video" as RouteKey, icon: "📹" },
      { label: "TikTok para MP3", desc: "Converta vídeo em áudio", routeKey: "mp3" as RouteKey, icon: "🎵" },
      { label: "Baixar TikTok sem marca", desc: "Vídeo limpo e rápido", routeKey: "withoutWatermark" as RouteKey, icon: "🎬" },
      { label: "Hashtags para TikTok", desc: "Etiquetas para mais alcance", routeKey: "tiktokHashtags" as RouteKey, icon: "#️⃣" },
      { label: "Legendas para Instagram", desc: "Descrições atrativas", routeKey: "instagramCaptionGenerator" as RouteKey, icon: "📝" },
      { label: "Títulos do YouTube", desc: "Títulos para mais cliques", routeKey: "youtubeTitleGenerator" as RouteKey, icon: "📺" },
      { label: "Roteiros para vídeos curtos", desc: "Estrutura para Reels, TikTok e Shorts", routeKey: "shortVideoScriptGenerator" as RouteKey, icon: "✍️" },
      { label: "Contador de caracteres", desc: "Meça textos para redes", routeKey: "socialMediaCharacterCounter" as RouteKey, icon: "📏" },
    ],
    clustersTitle: "Explore ferramentas por plataforma",
    clustersDesc: "Encontre ferramentas organizadas pela rede social onde você cria conteúdo.",
    clusters: [
      {
        title: "TikTok",
        desc: "Baixe vídeos, converta áudio, crie hashtags, legendas, bios, ideias e ganchos para o TikTok.",
        links: [
          { label: "Baixar vídeos", routeKey: "video" as RouteKey },
          { label: "TikTok para MP3", routeKey: "mp3" as RouteKey },
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
      { title: "Escolha uma ferramenta", text: "Selecione se deseja baixar, gerar textos, criar hashtags, preparar roteiros ou analisar conteúdo." },
      { title: "Cole um link ou escreva sua ideia", text: "Você pode colar um link do TikTok ou digitar um tema para obter resultados rápidos." },
      { title: "Copie ou baixe o resultado", text: "Obtenha o conteúdo pronto para usar diretamente do seu navegador." },
    ],
    diffTitle: "Mais que um baixador do TikTok",
    diffText:
      "O Clipnexo reúne ferramentas para baixar vídeos, converter áudio e criar conteúdo para diferentes plataformas. Use para trabalhar ideias, textos, hashtags, roteiros e recursos para suas redes.",
    diffPoints: [
      "Ferramentas gratuitas do navegador.",
      "Foco em criadores de conteúdo.",
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
        a: "O Clipnexo é uma plataforma de ferramentas online para baixar vídeos do TikTok e criar conteúdo para redes sociais como TikTok, YouTube, Instagram e Facebook.",
      },
      {
        q: "O Clipnexo serve apenas para o TikTok?",
        a: "Não. Além do baixador do TikTok, o Clipnexo inclui ferramentas para gerar hashtags, legendas, títulos, roteiros, textos para redes e recursos para YouTube.",
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
        a: "Não. As ferramentas podem ajudar a preparar melhor seu conteúdo, mas o desempenho depende da qualidade do vídeo, do público, da plataforma e de outros fatores.",
      },
      {
        q: "Posso usar os vídeos baixados livremente?",
        a: "Você deve respeitar os direitos autorais e as condições de cada plataforma. Use o conteúdo baixado de forma responsável e com permissão quando necessário.",
      },
    ],
    ctaFinalTitle: "Comece com uma ferramenta gratuita",
    ctaFinalText: "Escolha uma ferramenta do Clipnexo e crie, baixe ou prepare conteúdo para suas redes em segundos.",
    ctaFinalPrimary: "Ver ferramentas",
    ctaFinalSecondary: "Baixar vídeo do TikTok",
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

export default async function Home({ params, searchParams }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const resolvedSearchParams = await searchParams;

  const initialUrl =
    typeof resolvedSearchParams.url === "string" ? resolvedSearchParams.url : "";
  const shared =
    typeof resolvedSearchParams.shared === "string"
      ? resolvedSearchParams.shared === "1"
      : false;
  const shareError =
    typeof resolvedSearchParams.share_error === "string"
      ? resolvedSearchParams.share_error === "1"
      : false;
  const invalidPath =
    typeof resolvedSearchParams.invalid === "string"
      ? resolvedSearchParams.invalid === "1"
      : false;

  const t = pageContent[currentLang];
  const popularTools = t.popularTools;
  const clusters = t.clusters;
  const faqs = t.faqs;
  const blogEntries = getFilteredBlogPosts(currentLang, 3);

  const toolsUrl = getToolRoute("tools", currentLang);

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

      {/* HERO */}
      <section className="home-hero">
        <h1>{t.h1}</h1>
        <p className="home-hero-sub">{t.subtitle}</p>
        <div className="home-hero-ctas">
          <Link href={getToolRoute("video", currentLang)} className="home-hero-cta-primary">
            {t.ctaPrimary}
          </Link>
          <Link href={toolsUrl} className="home-hero-cta-secondary">
            {t.ctaSecondary}
          </Link>
        </div>
        <p className="home-hero-note">{t.ctaNote}</p>
      </section>

      {/* DOWNLOAD BOX */}
      <section className="home-download-section">
        <div className="home-download-card">
          <DownloaderBox
            lang={currentLang}
            type="video"
            initialUrl={initialUrl}
            shared={shared}
            shareError={shareError}
            invalidPath={invalidPath}
          />
        </div>
      </section>

      {/* POPULAR TOOLS */}
      <section className="home-section">
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
              <span className="home-tool-card-icon">{tool.icon}</span>
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
          <Link href={getToolRoute("video", currentLang)} className="home-hero-cta-secondary">
            {t.ctaFinalSecondary}
          </Link>
        </div>
      </section>
    </main>
  );
}
