import type { SupportedLang } from "./routes";

export const soundFooterCategories = [
  { id: "memes", es: "Memes", en: "Memes", pt: "Memes" },
  { id: "efectos", es: "Efectos de sonido", en: "Sound effects", pt: "Efeitos sonoros" },
  { id: "musica", es: "Música", en: "Music", pt: "Música" },
  { id: "notificaciones", es: "Notificaciones", en: "Notifications", pt: "Notificações" },
  { id: "transiciones", es: "Transiciones", en: "Transitions", pt: "Transições" },
  { id: "otros", es: "Otros", en: "Other", pt: "Outros" },
] as const;

export type SoundsHubCopy = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  searchPlaceholder: string;
  allCategories: string;
  sortRecent: string;
  sortPopular: string;
  noResults: string;
  prev: string;
  next: string;
  page: string;
  of: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
};

export const soundsHubContent: Record<SupportedLang, SoundsHubCopy> = {
  es: {
    metaTitle: "Biblioteca de sonidos para TikTok y Reels | Clipnexo",
    metaDescription: "Descarga efectos de sonido, memes de audio y música libre de regalías para tus videos. Escucha antes de descargar, gratis y sin registro. Todo en Clipnexo.",
    h1: "Biblioteca de sonidos para creadores",
    intro: "Escucha, descarga y usa efectos de sonido, memes de audio y música para tus videos de TikTok, Reels y Shorts. Todo gratis y sin registro.",
    searchPlaceholder: "Buscar sonidos...",
    allCategories: "Todas las categorías",
    sortRecent: "Recientes",
    sortPopular: "Populares",
    noResults: "No encontramos sonidos con ese criterio. Prueba otra búsqueda o categoría.",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "de",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Los sonidos son gratis?", a: "Sí, todos los sonidos de Clipnexo se pueden escuchar y descargar gratis, sin registro." },
      { q: "¿Puedo usarlos en mis videos de TikTok o Reels?", a: "Sí, puedes usarlos en tus propios videos. Revisa cada sonido si tiene alguna restricción especial." },
      { q: "¿Necesito crear una cuenta para descargar?", a: "No, la descarga es directa y no requiere registro." },
    ],
  },
  en: {
    metaTitle: "Free sound library for TikTok and Reels | Clipnexo",
    metaDescription: "Download sound effects, meme audio and royalty-free music for your videos. Listen before downloading, free and with no sign-up. Free for all creators.",
    h1: "Sound library for creators",
    intro: "Listen to, download and use sound effects, meme audio and music for your TikTok, Reels and Shorts videos. All free, no sign-up required.",
    searchPlaceholder: "Search sounds...",
    allCategories: "All categories",
    sortRecent: "Recent",
    sortPopular: "Popular",
    noResults: "We couldn't find sounds matching that. Try another search or category.",
    prev: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Are the sounds free?", a: "Yes, every sound on Clipnexo can be streamed and downloaded for free, no sign-up required." },
      { q: "Can I use them in my TikTok or Reels videos?", a: "Yes, you can use them in your own videos. Check each sound for any specific restrictions." },
      { q: "Do I need an account to download?", a: "No, downloads are direct and require no registration." },
    ],
  },
  pt: {
    metaTitle: "Biblioteca de sons grátis para TikTok e Reels | Clipnexo",
    metaDescription: "Baixe efeitos sonoros, áudios de memes e música livre de direitos para seus vídeos. Ouça antes de baixar, grátis e sem cadastro. Tudo no Clipnexo.",
    h1: "Biblioteca de sons para criadores",
    intro: "Ouça, baixe e use efeitos sonoros, áudios de memes e música para seus vídeos do TikTok, Reels e Shorts. Tudo grátis e sem cadastro.",
    searchPlaceholder: "Buscar sons...",
    allCategories: "Todas as categorias",
    sortRecent: "Recentes",
    sortPopular: "Populares",
    noResults: "Não encontramos sons com esse critério. Tente outra busca ou categoria.",
    prev: "Anterior",
    next: "Próxima",
    page: "Página",
    of: "de",
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Os sons são grátis?", a: "Sim, todos os sons do Clipnexo podem ser ouvidos e baixados gratuitamente, sem cadastro." },
      { q: "Posso usá-los nos meus vídeos do TikTok ou Reels?", a: "Sim, você pode usá-los em seus próprios vídeos. Verifique cada som para eventuais restrições específicas." },
      { q: "Preciso criar uma conta para baixar?", a: "Não, o download é direto e não exige cadastro." },
    ],
  },
};
