import type { RouteKey } from "./routes";

type NavLink = {
  label: string;
  routeKey: RouteKey;
};

type NavDropdown = {
  label: string;
  links: NavLink[];
};

type NavMegaColumn = {
  title: string;
  routeKey?: RouteKey;
  links: NavLink[];
};

type NavMegaMenu = {
  label: string;
  columns: NavMegaColumn[];
  footerLink: NavLink;
};

export type NavLangContent = {
  download: NavDropdown;
  tools: NavMegaMenu;
  resources: NavDropdown;
  blog: string;
  cta: string;
  language: string;
  mobileClose: string;
  mobileLegalLinks: NavLink[];
  mobileHighlightedTools: NavLink[];
  mobileHighlightedResources: NavLink[];
  mobileCtaPrimary: NavLink;
};

export const navigation: Record<string, NavLangContent> = {
  es: {
    download: {
      label: "Descargar",
      links: [
        { label: "Descargar video de TikTok", routeKey: "video" },
        { label: "TikTok a MP3", routeKey: "mp3" },
        { label: "TikTok sin marca de agua", routeKey: "withoutWatermark" },
        { label: "Cómo descargar videos de TikTok", routeKey: "guide" },
      ],
    },
    tools: {
      label: "Herramientas",
      columns: [
        {
          title: "TikTok",
          routeKey: "tiktokTools",
          links: [
            { label: "Generador de hashtags", routeKey: "tiktokHashtags" },
            { label: "Generador de captions", routeKey: "tiktokCaptions" },
            { label: "Ideas para TikTok", routeKey: "tiktokIdeas" },
            { label: "Ganchos virales", routeKey: "tiktokHooks" },
          ],
        },
        {
          title: "YouTube",
          routeKey: "youtubeTools",
          links: [
            { label: "Generador de títulos", routeKey: "youtubeTitleGenerator" },
            { label: "Generador de etiquetas", routeKey: "youtubeTagGenerator" },
            { label: "Generador de hashtags", routeKey: "youtubeHashtagGenerator" },
            { label: "Descargar miniaturas", routeKey: "youtubeThumbnailDownloader" },
          ],
        },
        {
          title: "Instagram",
          routeKey: "instagramTools",
          links: [
            { label: "Captions para Instagram", routeKey: "instagramCaptionGenerator" },
            { label: "Hashtags para Instagram", routeKey: "instagramHashtagGenerator" },
            { label: "Bio para Instagram", routeKey: "instagramBioGenerator" },
            { label: "Ideas para Reels", routeKey: "instagramReelsIdeas" },
          ],
        },
        {
          title: "Redes sociales",
          routeKey: "socialMediaTools",
          links: [
            { label: "Crear textos para redes", routeKey: "socialMediaTextGenerator" },
            { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
            { label: "Guiones para videos cortos", routeKey: "shortVideoScriptGenerator" },
            { label: "Títulos y hashtags", routeKey: "shortVideoTitleHashtag" },
          ],
        },
        {
          title: "Estudiantes",
          routeKey: "studentsTools",
          links: [
            { label: "Contador de palabras", routeKey: "wordCounter" },
            { label: "Convertir mayúsculas", routeKey: "caseConverter" },
            { label: "Generar índice", routeKey: "outlineGenerator" },
            { label: "Generar títulos", routeKey: "assignmentTitleGenerator" },
          ],
        },
      ],
      footerLink: { label: "Ver todas las herramientas", routeKey: "tools" },
    },
    resources: {
      label: "Recursos",
      links: [
        { label: "Blog", routeKey: "blog" },
        { label: "Herramientas populares", routeKey: "tools" },
        { label: "Guías para TikTok", routeKey: "guide" },
        { label: "Guías para creadores", routeKey: "blog" },
      ],
    },
    blog: "Blog",
    cta: "Ver herramientas",
    language: "Idioma",
    mobileClose: "Cerrar",
    mobileLegalLinks: [
      { label: "DMCA", routeKey: "dmca" },
      { label: "Privacidad", routeKey: "privacy" },
      { label: "Contacto", routeKey: "contact" },
    ],
    mobileHighlightedTools: [
      { label: "Todas las herramientas", routeKey: "tools" },
      { label: "Generador de hashtags para TikTok", routeKey: "tiktokHashtags" },
      { label: "Captions para Instagram", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos de YouTube", routeKey: "youtubeTitleGenerator" },
      { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
    ],
    mobileHighlightedResources: [
      { label: "Blog", routeKey: "blog" },
      { label: "Guías para creadores", routeKey: "blog" },
      { label: "Crear textos para redes sociales", routeKey: "socialMediaTextGenerator" },
    ],
    mobileCtaPrimary: { label: "Descargar video", routeKey: "video" },
  },
  en: {
    download: {
      label: "Download",
      links: [
        { label: "TikTok video downloader", routeKey: "video" },
        { label: "TikTok to MP3", routeKey: "mp3" },
        { label: "TikTok without watermark", routeKey: "withoutWatermark" },
        { label: "How to download TikTok videos", routeKey: "guide" },
      ],
    },
    tools: {
      label: "Tools",
      columns: [
        {
          title: "TikTok",
          routeKey: "tiktokTools",
          links: [
            { label: "Hashtag generator", routeKey: "tiktokHashtags" },
            { label: "Caption generator", routeKey: "tiktokCaptions" },
            { label: "TikTok video ideas", routeKey: "tiktokIdeas" },
            { label: "Hook generator", routeKey: "tiktokHooks" },
          ],
        },
        {
          title: "YouTube",
          routeKey: "youtubeTools",
          links: [
            { label: "Title generator", routeKey: "youtubeTitleGenerator" },
            { label: "Tag generator", routeKey: "youtubeTagGenerator" },
            { label: "Hashtag generator", routeKey: "youtubeHashtagGenerator" },
            { label: "Thumbnail downloader", routeKey: "youtubeThumbnailDownloader" },
          ],
        },
        {
          title: "Instagram",
          routeKey: "instagramTools",
          links: [
            { label: "Caption generator", routeKey: "instagramCaptionGenerator" },
            { label: "Hashtag generator", routeKey: "instagramHashtagGenerator" },
            { label: "Bio generator", routeKey: "instagramBioGenerator" },
            { label: "Reels ideas", routeKey: "instagramReelsIdeas" },
          ],
        },
        {
          title: "Social media",
          routeKey: "socialMediaTools",
          links: [
            { label: "Social media text generator", routeKey: "socialMediaTextGenerator" },
            { label: "Character counter", routeKey: "socialMediaCharacterCounter" },
            { label: "Short video scripts", routeKey: "shortVideoScriptGenerator" },
            { label: "Title & hashtag generator", routeKey: "shortVideoTitleHashtag" },
          ],
        },
        {
          title: "Students",
          routeKey: "studentsTools",
          links: [
            { label: "Word counter", routeKey: "wordCounter" },
            { label: "Case converter", routeKey: "caseConverter" },
            { label: "Outline generator", routeKey: "outlineGenerator" },
            { label: "Title generator", routeKey: "assignmentTitleGenerator" },
          ],
        },
      ],
      footerLink: { label: "View all tools", routeKey: "tools" },
    },
    resources: {
      label: "Resources",
      links: [
        { label: "Blog", routeKey: "blog" },
        { label: "Popular tools", routeKey: "tools" },
        { label: "TikTok guides", routeKey: "guide" },
        { label: "Creator guides", routeKey: "blog" },
      ],
    },
    blog: "Blog",
    cta: "View tools",
    language: "Language",
    mobileClose: "Close",
    mobileLegalLinks: [
      { label: "DMCA", routeKey: "dmca" },
      { label: "Privacy", routeKey: "privacy" },
      { label: "Contact", routeKey: "contact" },
    ],
    mobileHighlightedTools: [
      { label: "All tools", routeKey: "tools" },
      { label: "TikTok hashtag generator", routeKey: "tiktokHashtags" },
      { label: "Instagram captions", routeKey: "instagramCaptionGenerator" },
      { label: "YouTube titles", routeKey: "youtubeTitleGenerator" },
      { label: "Character counter", routeKey: "socialMediaCharacterCounter" },
    ],
    mobileHighlightedResources: [
      { label: "Blog", routeKey: "blog" },
      { label: "Creator guides", routeKey: "blog" },
      { label: "Social media text generator", routeKey: "socialMediaTextGenerator" },
    ],
    mobileCtaPrimary: { label: "Download video", routeKey: "video" },
  },
  pt: {
    download: {
      label: "Baixar",
      links: [
        { label: "Baixar vídeo do TikTok", routeKey: "video" },
        { label: "TikTok para MP3", routeKey: "mp3" },
        { label: "TikTok sem marca d'água", routeKey: "withoutWatermark" },
        { label: "Como baixar vídeos do TikTok", routeKey: "guide" },
      ],
    },
    tools: {
      label: "Ferramentas",
      columns: [
        {
          title: "TikTok",
          routeKey: "tiktokTools",
          links: [
            { label: "Gerador de hashtags", routeKey: "tiktokHashtags" },
            { label: "Gerador de legendas", routeKey: "tiktokCaptions" },
            { label: "Ideias para TikTok", routeKey: "tiktokIdeas" },
            { label: "Ganchos virais", routeKey: "tiktokHooks" },
          ],
        },
        {
          title: "YouTube",
          routeKey: "youtubeTools",
          links: [
            { label: "Gerador de títulos", routeKey: "youtubeTitleGenerator" },
            { label: "Gerador de tags", routeKey: "youtubeTagGenerator" },
            { label: "Gerador de hashtags", routeKey: "youtubeHashtagGenerator" },
            { label: "Baixar miniaturas", routeKey: "youtubeThumbnailDownloader" },
          ],
        },
        {
          title: "Instagram",
          routeKey: "instagramTools",
          links: [
            { label: "Gerador de legendas", routeKey: "instagramCaptionGenerator" },
            { label: "Gerador de hashtags", routeKey: "instagramHashtagGenerator" },
            { label: "Bio para Instagram", routeKey: "instagramBioGenerator" },
            { label: "Ideias para Reels", routeKey: "instagramReelsIdeas" },
          ],
        },
        {
          title: "Redes sociais",
          routeKey: "socialMediaTools",
          links: [
            { label: "Criar textos para redes", routeKey: "socialMediaTextGenerator" },
            { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
            { label: "Roteiros para vídeos curtos", routeKey: "shortVideoScriptGenerator" },
            { label: "Títulos e hashtags", routeKey: "shortVideoTitleHashtag" },
          ],
        },
        {
          title: "Estudantes",
          routeKey: "studentsTools",
          links: [
            { label: "Contador de palavras", routeKey: "wordCounter" },
            { label: "Conversor de maiúsculas", routeKey: "caseConverter" },
            { label: "Gerar índice", routeKey: "outlineGenerator" },
            { label: "Gerar títulos", routeKey: "assignmentTitleGenerator" },
          ],
        },
      ],
      footerLink: { label: "Ver todas as ferramentas", routeKey: "tools" },
    },
    resources: {
      label: "Recursos",
      links: [
        { label: "Blog", routeKey: "blog" },
        { label: "Ferramentas populares", routeKey: "tools" },
        { label: "Guias para TikTok", routeKey: "guide" },
        { label: "Guias para criadores", routeKey: "blog" },
      ],
    },
    blog: "Blog",
    cta: "Ver ferramentas",
    language: "Idioma",
    mobileClose: "Fechar",
    mobileLegalLinks: [
      { label: "DMCA", routeKey: "dmca" },
      { label: "Privacidade", routeKey: "privacy" },
      { label: "Contato", routeKey: "contact" },
    ],
    mobileHighlightedTools: [
      { label: "Todas as ferramentas", routeKey: "tools" },
      { label: "Gerador de hashtags para TikTok", routeKey: "tiktokHashtags" },
      { label: "Legendas para Instagram", routeKey: "instagramCaptionGenerator" },
      { label: "Títulos do YouTube", routeKey: "youtubeTitleGenerator" },
      { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
    ],
    mobileHighlightedResources: [
      { label: "Blog", routeKey: "blog" },
      { label: "Guias para criadores", routeKey: "blog" },
      { label: "Gerador de textos para redes sociais", routeKey: "socialMediaTextGenerator" },
    ],
    mobileCtaPrimary: { label: "Baixar vídeo", routeKey: "video" },
  },
};
