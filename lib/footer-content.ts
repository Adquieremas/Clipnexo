import type { RouteKey } from "./routes";

type FooterLink = {
  label: string;
  routeKey: RouteKey;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type FooterLangContent = {
  brandName: string;
  brandDescription: string;
  badges: string[];
  columns: FooterColumn[];
  bottomLine: string;
  tagline: string;
  ctaText: string;
  ctaButton: string;
};

export const footerContent: Record<string, FooterLangContent> = {
  es: {
    brandName: "Clipnexo",
    brandDescription:
      "Herramientas gratuitas para descargar videos, crear textos, generar hashtags y preparar contenido para redes sociales.",
    badges: ["Gratis", "Online", "Sin instalar apps"],
    columns: [
      {
        title: "Herramientas principales",
        links: [
          { label: "Descargar video de TikTok", routeKey: "video" },
          { label: "TikTok a MP3", routeKey: "mp3" },
          { label: "TikTok sin marca de agua", routeKey: "withoutWatermark" },
          { label: "Todas las herramientas", routeKey: "tools" },
        ],
      },
      {
        title: "Plataformas",
        links: [
          { label: "TikTok", routeKey: "video" },
          { label: "YouTube", routeKey: "youtubeTagGenerator" },
          { label: "Instagram", routeKey: "instagramCaptionGenerator" },
          { label: "Facebook", routeKey: "facebookPostGenerator" },
          { label: "Videos cortos", routeKey: "shortVideoTitleHashtag" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Blog", routeKey: "blog" },
          { label: "Guías para creadores", routeKey: "blog" },
          { label: "Generador de hashtags", routeKey: "tiktokHashtags" },
          { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
          { label: "Crear textos para redes sociales", routeKey: "socialMediaTextGenerator" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "DMCA", routeKey: "dmca" },
          { label: "Política de privacidad", routeKey: "privacy" },
          { label: "Términos de servicio", routeKey: "terms" },
          { label: "Contacto", routeKey: "contact" },
          { label: "Acerca de", routeKey: "about" },
        ],
      },
    ],
    bottomLine: "© 2026 Clipnexo. Todos los derechos reservados.",
    tagline: "Hecho para creadores, marcas y equipos de contenido.",
    ctaText: "Explora todas las herramientas gratuitas de Clipnexo",
    ctaButton: "Ver herramientas",
  },
  en: {
    brandName: "Clipnexo",
    brandDescription:
      "Free tools to download videos, create texts, generate hashtags and prepare content for social media.",
    badges: ["Free", "Online", "No app needed"],
    columns: [
      {
        title: "Main tools",
        links: [
          { label: "TikTok video downloader", routeKey: "video" },
          { label: "TikTok to MP3", routeKey: "mp3" },
          { label: "TikTok without watermark", routeKey: "withoutWatermark" },
          { label: "All tools", routeKey: "tools" },
        ],
      },
      {
        title: "Platforms",
        links: [
          { label: "TikTok", routeKey: "video" },
          { label: "YouTube", routeKey: "youtubeTagGenerator" },
          { label: "Instagram", routeKey: "instagramCaptionGenerator" },
          { label: "Facebook", routeKey: "facebookPostGenerator" },
          { label: "Short videos", routeKey: "shortVideoTitleHashtag" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", routeKey: "blog" },
          { label: "Creator guides", routeKey: "blog" },
          { label: "Hashtag generator", routeKey: "tiktokHashtags" },
          { label: "Character counter", routeKey: "socialMediaCharacterCounter" },
          { label: "Social media text generator", routeKey: "socialMediaTextGenerator" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "DMCA", routeKey: "dmca" },
          { label: "Privacy policy", routeKey: "privacy" },
          { label: "Terms of service", routeKey: "terms" },
          { label: "Contact", routeKey: "contact" },
          { label: "About", routeKey: "about" },
        ],
      },
    ],
    bottomLine: "© 2026 Clipnexo. All rights reserved.",
    tagline: "Built for creators, brands and content teams.",
    ctaText: "Explore all Clipnexo free tools",
    ctaButton: "View tools",
  },
  pt: {
    brandName: "Clipnexo",
    brandDescription:
      "Ferramentas gratuitas para baixar vídeos, criar textos, gerar hashtags e preparar conteúdo para redes sociais.",
    badges: ["Grátis", "Online", "Sem instalar apps"],
    columns: [
      {
        title: "Ferramentas principais",
        links: [
          { label: "Baixar vídeo do TikTok", routeKey: "video" },
          { label: "TikTok para MP3", routeKey: "mp3" },
          { label: "TikTok sem marca d'água", routeKey: "withoutWatermark" },
          { label: "Todas as ferramentas", routeKey: "tools" },
        ],
      },
      {
        title: "Plataformas",
        links: [
          { label: "TikTok", routeKey: "video" },
          { label: "YouTube", routeKey: "youtubeTagGenerator" },
          { label: "Instagram", routeKey: "instagramCaptionGenerator" },
          { label: "Facebook", routeKey: "facebookPostGenerator" },
          { label: "Vídeos curtos", routeKey: "shortVideoTitleHashtag" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Blog", routeKey: "blog" },
          { label: "Guias para criadores", routeKey: "blog" },
          { label: "Gerador de hashtags", routeKey: "tiktokHashtags" },
          { label: "Contador de caracteres", routeKey: "socialMediaCharacterCounter" },
          { label: "Gerador de textos para redes sociais", routeKey: "socialMediaTextGenerator" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "DMCA", routeKey: "dmca" },
          { label: "Política de privacidade", routeKey: "privacy" },
          { label: "Termos de serviço", routeKey: "terms" },
          { label: "Contato", routeKey: "contact" },
          { label: "Sobre", routeKey: "about" },
        ],
      },
    ],
    bottomLine: "© 2026 Clipnexo. Todos os direitos reservados.",
    tagline: "Feito para criadores, marcas e equipes de conteúdo.",
    ctaText: "Explore todas as ferramentas gratuitas do Clipnexo",
    ctaButton: "Ver ferramentas",
  },
};
