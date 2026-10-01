export type SupportedLang = "es" | "en" | "pt";

export type RouteKey =
  | "home"
  | "video"
  | "mp3"
  | "guide"
  | "withoutWatermark"
  | "tiktokBio"
  | "tiktokIdeas"
  | "tiktokHooks"
  | "tiktokCaptions"
  | "tiktokHashtags"
  | "shortVideoTitleHashtag"
  | "about"
  | "blog"
  | "contact"
  | "privacy"
  | "terms"
  | "dmca"
  | "tools"
  | "socialMediaTextGenerator"
  | "youtubeTagGenerator"
  | "youtubeTagExtractor"
  | "youtubeHashtagGenerator"
  | "youtubeHashtagExtractor"
  | "youtubeTitleGenerator"
  | "youtubeTitleExtractor"
  | "youtubeTitleLengthChecker"
  | "youtubeDescriptionGenerator"
  | "youtubeDescriptionExtractor"
  | "youtubeTitleCapitalization"
  | "youtubeEmbedCodeGenerator"
  | "youtubeTimestampLinkGenerator"
  | "youtubeSubscribeLinkGenerator"
  | "youtubeThumbnailDownloader"
  | "youtubeMoneyCalculator"
  | "youtubeViewRatioCalculator"
  | "instagramCaptionGenerator"
  | "instagramHashtagGenerator"
  | "instagramBioGenerator"
  | "instagramReelsIdeas"
  | "instagramReelsHooks"
  | "facebookPostGenerator"
  | "facebookAdGenerator"
  | "marketplaceTextGenerator"
  | "shortVideoScriptGenerator"
  | "socialMediaCharacterCounter"
  | "tiktokTools"
  | "youtubeTools"
  | "instagramTools"
  | "facebookTools"
  | "shortVideoTools"
  | "socialMediaTools"
  | "studentsTools"
  | "wordCounter"
  | "caseConverter"
  | "outlineGenerator"
  | "assignmentTitleGenerator"
  | "introductionGenerator"
  | "conclusionGenerator"
  | "textSummarizer"
  | "textParaphraser"
  | "apaCitationGenerator"
  | "textCorrector"
  | "pdfToText"
  | "textToPdf"
  | "pomodoroTimer"
  | "gradeAverageCalculator"
  | "studyScheduleGenerator"
  | "usernameGenerator"
  | "contentCalendarGenerator";

const TRAILING_SLASH_REGEX = /\/$/;

export const supportedLangs: readonly SupportedLang[] = ["es", "en", "pt"];

export const localizedRoutes: Readonly<Record<RouteKey, Readonly<Record<SupportedLang, string>>>> = {
  home: {
    es: "/es",
    en: "/en",
    pt: "/pt",
  },
  video: {
    es: "/es/descargar-tiktok",
    en: "/en/tiktok-video-downloader",
    pt: "/pt/baixar-videos-do-tiktok",
  },
  mp3: {
    es: "/es/descargar-tiktok-mp3",
    en: "/en/tiktok-to-mp3",
    pt: "/pt/baixar-mp3-do-tiktok",
  },
  guide: {
    es: "/es/como-descargar-videos-de-tiktok",
    en: "/en/how-to-download-tiktok-videos",
    pt: "/pt/como-baixar-videos-do-tiktok",
  },
  withoutWatermark: {
    es: "/es/descargar-tiktok-sin-marca",
    en: "/en/download-tiktok-without-watermark",
    pt: "/pt/baixar-tiktok-sem-marca-dagua",
  },
  tiktokBio: {
    es: "/es/generador-bio-tiktok",
    en: "/en/tiktok-bio-generator",
    pt: "/pt/gerador-bio-tiktok",
  },
  tiktokIdeas: {
    es: "/es/ideas-para-tiktok",
    en: "/en/tiktok-video-ideas",
    pt: "/pt/ideias-para-tiktok",
  },
  tiktokHooks: {
    es: "/es/ganchos-virales-tiktok",
    en: "/en/tiktok-hook-generator",
    pt: "/pt/ganchos-virais-tiktok",
  },
  tiktokCaptions: {
    es: "/es/generador-captions-tiktok",
    en: "/en/tiktok-caption-generator",
    pt: "/pt/gerador-legendas-tiktok",
  },
  tiktokHashtags: {
    es: "/es/generador-hashtags-tiktok",
    en: "/en/tiktok-hashtag-generator",
    pt: "/pt/gerador-hashtags-tiktok",
  },
  shortVideoTitleHashtag: {
    es: "/es/generador-titulos-hashtags-videos-cortos",
    en: "/en/short-video-title-hashtag-generator",
    pt: "/pt/gerador-titulos-hashtags-videos-curtos",
  },
  about: {
    es: "/es/acerca-de",
    en: "/en/acerca-de",
    pt: "/pt/acerca-de",
  },
  blog: {
    es: "/es/blog",
    en: "/en/blog",
    pt: "/pt/blog",
  },
  contact: {
    es: "/es/contacto",
    en: "/en/contacto",
    pt: "/pt/contacto",
  },
  privacy: {
    es: "/es/politica-de-privacidad",
    en: "/en/politica-de-privacidad",
    pt: "/pt/politica-de-privacidad",
  },
  terms: {
    es: "/es/terminos-de-servicio",
    en: "/en/terminos-de-servicio",
    pt: "/pt/terminos-de-servicio",
  },
  dmca: {
    es: "/es/dmca",
    en: "/en/dmca",
    pt: "/pt/dmca",
  },
  tools: {
    es: "/es/herramientas",
    en: "/en/tools",
    pt: "/pt/ferramentas",
  },
  socialMediaTextGenerator: {
    es: "/es/crear-textos-redes-sociales",
    en: "/en/social-media-text-generator",
    pt: "/pt/gerador-textos-redes-sociais",
  },
  youtubeTagGenerator: {
    es: "/es/generador-etiquetas-youtube",
    en: "/en/youtube-tag-generator",
    pt: "/pt/gerador-tags-youtube",
  },
  youtubeTagExtractor: {
    es: "/es/extractor-etiquetas-youtube",
    en: "/en/youtube-tag-extractor",
    pt: "/pt/extrator-tags-youtube",
  },
  youtubeHashtagGenerator: {
    es: "/es/generador-hashtags-youtube",
    en: "/en/youtube-hashtag-generator",
    pt: "/pt/gerador-hashtags-youtube",
  },
  youtubeHashtagExtractor: {
    es: "/es/extractor-hashtags-youtube",
    en: "/en/youtube-hashtag-extractor",
    pt: "/pt/extrator-hashtags-youtube",
  },
  youtubeTitleGenerator: {
    es: "/es/generador-titulos-youtube",
    en: "/en/youtube-title-generator",
    pt: "/pt/gerador-titulos-youtube",
  },
  youtubeTitleExtractor: {
    es: "/es/extractor-titulos-youtube",
    en: "/en/youtube-title-extractor",
    pt: "/pt/extrator-titulos-youtube",
  },
  youtubeTitleLengthChecker: {
    es: "/es/comprobar-longitud-titulo-youtube",
    en: "/en/youtube-title-length-checker",
    pt: "/pt/verificar-tamanho-titulo-youtube",
  },
  youtubeDescriptionGenerator: {
    es: "/es/generador-descripciones-youtube",
    en: "/en/youtube-description-generator",
    pt: "/pt/gerador-descricoes-youtube",
  },
  youtubeDescriptionExtractor: {
    es: "/es/extractor-descripcion-youtube",
    en: "/en/youtube-description-extractor",
    pt: "/pt/extrator-descricao-youtube",
  },
  youtubeTitleCapitalization: {
    es: "/es/mayusculas-titulos-youtube",
    en: "/en/youtube-title-capitalization",
    pt: "/pt/maiusculas-titulos-youtube",
  },
  youtubeEmbedCodeGenerator: {
    es: "/es/generador-codigo-insercion-youtube",
    en: "/en/youtube-embed-code-generator",
    pt: "/pt/gerador-codigo-incorporacao-youtube",
  },
  youtubeTimestampLinkGenerator: {
    es: "/es/generador-enlaces-tiempo-youtube",
    en: "/en/youtube-timestamp-link-generator",
    pt: "/pt/gerador-links-tempo-youtube",
  },
  youtubeSubscribeLinkGenerator: {
    es: "/es/generador-enlaces-suscripcion-youtube",
    en: "/en/youtube-subscribe-link-generator",
    pt: "/pt/gerador-links-inscricao-youtube",
  },
  youtubeThumbnailDownloader: {
    es: "/es/descargar-miniaturas-youtube",
    en: "/en/youtube-thumbnail-downloader",
    pt: "/pt/baixar-miniaturas-youtube",
  },
  youtubeMoneyCalculator: {
    es: "/es/calculadora-dinero-youtube",
    en: "/en/youtube-money-calculator",
    pt: "/pt/calculadora-dinheiro-youtube",
  },
  youtubeViewRatioCalculator: {
    es: "/es/calculadora-proporcion-vistas-youtube",
    en: "/en/youtube-view-ratio-calculator",
    pt: "/pt/calculadora-proporcao-views-youtube",
  },
  instagramCaptionGenerator: {
    es: "/es/generador-captions-instagram",
    en: "/en/instagram-caption-generator",
    pt: "/pt/gerador-legendas-instagram",
  },
  instagramHashtagGenerator: {
    es: "/es/generador-hashtags-instagram",
    en: "/en/instagram-hashtag-generator",
    pt: "/pt/gerador-hashtags-instagram",
  },
  instagramBioGenerator: {
    es: "/es/generador-bio-instagram",
    en: "/en/instagram-bio-generator",
    pt: "/pt/gerador-bio-instagram",
  },
  instagramReelsIdeas: {
    es: "/es/ideas-para-reels",
    en: "/en/instagram-reels-ideas",
    pt: "/pt/ideias-para-reels",
  },
  instagramReelsHooks: {
    es: "/es/ganchos-para-reels",
    en: "/en/instagram-reels-hook-generator",
    pt: "/pt/ganchos-para-reels",
  },
  facebookPostGenerator: {
    es: "/es/generador-posts-facebook",
    en: "/en/facebook-post-generator",
    pt: "/pt/gerador-posts-facebook",
  },
  facebookAdGenerator: {
    es: "/es/generador-anuncios-facebook",
    en: "/en/facebook-ad-generator",
    pt: "/pt/gerador-anuncios-facebook",
  },
  marketplaceTextGenerator: {
    es: "/es/generador-textos-marketplace",
    en: "/en/marketplace-text-generator",
    pt: "/pt/gerador-textos-marketplace",
  },
  shortVideoScriptGenerator: {
    es: "/es/generador-guiones-videos-cortos",
    en: "/en/short-video-script-generator",
    pt: "/pt/gerador-roteiros-videos-curtos",
  },
  socialMediaCharacterCounter: {
    es: "/es/contador-caracteres-redes-sociales",
    en: "/en/social-media-character-counter",
    pt: "/pt/contador-caracteres-redes-sociais",
  },
  tiktokTools: {
    es: "/es/herramientas/tiktok",
    en: "/en/tools/tiktok",
    pt: "/pt/ferramentas/tiktok",
  },
  youtubeTools: {
    es: "/es/herramientas/youtube",
    en: "/en/tools/youtube",
    pt: "/pt/ferramentas/youtube",
  },
  instagramTools: {
    es: "/es/herramientas/instagram",
    en: "/en/tools/instagram",
    pt: "/pt/ferramentas/instagram",
  },
  facebookTools: {
    es: "/es/herramientas/facebook",
    en: "/en/tools/facebook",
    pt: "/pt/ferramentas/facebook",
  },
  shortVideoTools: {
    es: "/es/herramientas/videos-cortos",
    en: "/en/tools/short-videos",
    pt: "/pt/ferramentas/videos-curtos",
  },
  socialMediaTools: {
    es: "/es/herramientas/redes-sociales",
    en: "/en/tools/social-media",
    pt: "/pt/ferramentas/redes-sociais",
  },
  studentsTools: {
    es: "/es/herramientas/estudiantes",
    en: "/en/tools/students",
    pt: "/pt/ferramentas/estudantes",
  },
  wordCounter: {
    es: "/es/contador-palabras-caracteres",
    en: "/en/word-character-counter",
    pt: "/pt/contador-palavras-caracteres",
  },
  caseConverter: {
    es: "/es/convertidor-mayusculas-minusculas",
    en: "/en/case-converter",
    pt: "/pt/conversor-maiusculas-minusculas",
  },
  outlineGenerator: {
    es: "/es/generador-indice-trabajos",
    en: "/en/outline-generator",
    pt: "/pt/gerador-indice-trabalhos",
  },
  assignmentTitleGenerator: {
    es: "/es/generador-titulos-trabajos",
    en: "/en/assignment-title-generator",
    pt: "/pt/gerador-titulos-trabalhos",
  },
  introductionGenerator: {
    es: "/es/generador-introducciones",
    en: "/en/introduction-generator",
    pt: "/pt/gerador-introducoes",
  },
  conclusionGenerator: {
    es: "/es/generador-conclusiones",
    en: "/en/conclusion-generator",
    pt: "/pt/gerador-conclusoes",
  },
  textSummarizer: {
    es: "/es/resumidor-texto",
    en: "/en/text-summarizer",
    pt: "/pt/resumidor-texto",
  },
  textParaphraser: {
    es: "/es/parafraseador-texto",
    en: "/en/text-paraphraser",
    pt: "/pt/parafraseador-texto",
  },
  apaCitationGenerator: {
    es: "/es/generador-citas-apa",
    en: "/en/apa-citation-generator",
    pt: "/pt/gerador-citacoes-apa",
  },
  textCorrector: {
    es: "/es/corrector-texto",
    en: "/en/text-corrector",
    pt: "/pt/corretor-texto",
  },
  pdfToText: {
    es: "/es/pdf-a-texto",
    en: "/en/pdf-to-text",
    pt: "/pt/pdf-para-texto",
  },
  textToPdf: {
    es: "/es/texto-a-pdf",
    en: "/en/text-to-pdf",
    pt: "/pt/texto-para-pdf",
  },
  pomodoroTimer: {
    es: "/es/temporizador-pomodoro",
    en: "/en/pomodoro-timer",
    pt: "/pt/temporizador-pomodoro",
  },
  gradeAverageCalculator: {
    es: "/es/calculadora-promedio-notas",
    en: "/en/grade-average-calculator",
    pt: "/pt/calculadora-media-notas",
  },
  studyScheduleGenerator: {
    es: "/es/generador-horario-estudio",
    en: "/en/study-schedule-generator",
    pt: "/pt/gerador-horario-estudo",
  },
  usernameGenerator: {
    es: "/es/generador-nombres-usuario",
    en: "/en/username-generator",
    pt: "/pt/gerador-nomes-usuario",
  },
  contentCalendarGenerator: {
    es: "/es/generador-calendario-contenido",
    en: "/en/content-calendar-generator",
    pt: "/pt/gerador-calendario-conteudo",
  },
};

export const seoRoutes = localizedRoutes;

export const indexableRouteKeys: readonly RouteKey[] = [
  "home",
  "video",
  "mp3",
  "guide",
  "withoutWatermark",
  "tiktokBio",
  "tiktokIdeas",
  "tiktokHooks",
  "tiktokCaptions",
  "tiktokHashtags",
  "shortVideoTitleHashtag",
  "tools",
  "socialMediaTextGenerator",
  "youtubeTagGenerator",
  "youtubeTagExtractor",
  "youtubeHashtagGenerator",
  "youtubeHashtagExtractor",
  "youtubeTitleGenerator",
  "youtubeTitleExtractor",
  "youtubeTitleLengthChecker",
  "youtubeDescriptionGenerator",
  "youtubeDescriptionExtractor",
  "youtubeTitleCapitalization",
  "youtubeEmbedCodeGenerator",
  "youtubeTimestampLinkGenerator",
  "youtubeSubscribeLinkGenerator",
  "youtubeThumbnailDownloader",
  "youtubeMoneyCalculator",
  "youtubeViewRatioCalculator",
  "instagramCaptionGenerator",
  "instagramHashtagGenerator",
  "instagramBioGenerator",
  "instagramReelsIdeas",
  "instagramReelsHooks",
  "facebookPostGenerator",
  "facebookAdGenerator",
  "marketplaceTextGenerator",
  "shortVideoScriptGenerator",
  "socialMediaCharacterCounter",
  "tiktokTools",
  "youtubeTools",
  "instagramTools",
  "facebookTools",
  "shortVideoTools",
  "socialMediaTools",
  "studentsTools",
  "wordCounter",
  "caseConverter",
  "outlineGenerator",
  "assignmentTitleGenerator",
  "introductionGenerator",
  "conclusionGenerator",
  "textSummarizer",
  "textParaphraser",
  "apaCitationGenerator",
  "textCorrector",
  "pdfToText",
  "textToPdf",
  "pomodoroTimer",
  "gradeAverageCalculator",
  "studyScheduleGenerator",
  "usernameGenerator",
  "contentCalendarGenerator",
  "about",
  "blog",
];

function normalizePath(pathname: string): string {
  const normalized = pathname.trim().toLowerCase().replace(TRAILING_SLASH_REGEX, "");
  return normalized || "/";
}

export function normalizeLang(lang: string): SupportedLang {
  const normalized = lang.trim().toLowerCase();

  if (normalized === "en" || normalized === "pt") {
    return normalized;
  }

  return "es";
}

export function getLocalizedRoute(routeKey: RouteKey, lang: string): string {
  const currentLang = normalizeLang(lang);
  return localizedRoutes[routeKey][currentLang];
}

export function getAlternateRoutes(routeKey: RouteKey): Record<SupportedLang, string> {
  return localizedRoutes[routeKey];
}

export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const normalizedPath = normalizePath(pathname);

  for (const routeKey of Object.keys(localizedRoutes) as RouteKey[]) {
    const routesByLang = localizedRoutes[routeKey];

    for (const lang of Object.keys(routesByLang) as SupportedLang[]) {
      const candidate = normalizePath(routesByLang[lang]);

      if (candidate === normalizedPath) {
        return routeKey;
      }
    }
  }

  return null;
}
