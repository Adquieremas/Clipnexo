import type { SupportedLang } from "@/lib/routes";

type MediaKind = "sound" | "meme";

const TITLE_PARTS: Record<MediaKind, Record<SupportedLang, { prefix: string; suffix: string; filler: string }>> = {
  sound: {
    es: { prefix: "Sonido: ", suffix: " para videos | Clipnexo", filler: "para descargar gratis" },
    en: { prefix: "Sound: ", suffix: " for videos | Clipnexo", filler: "to download free" },
    pt: { prefix: "Som: ", suffix: " para vídeos | Clipnexo", filler: "para baixar grátis" },
  },
  meme: {
    es: { prefix: "Meme: ", suffix: " en video | Clipnexo", filler: "gratis para descargar" },
    en: { prefix: "Meme: ", suffix: " video | Clipnexo", filler: "free to download" },
    pt: { prefix: "Meme: ", suffix: " em vídeo | Clipnexo", filler: "grátis para baixar" },
  },
};

const DESCRIPTION_ENDINGS: Record<SupportedLang, string[]> = {
  es: [
    " Más recursos gratis.",
    " Descubre más en Clipnexo.",
    " Encuentra más recursos gratis en Clipnexo.",
    " Explora sonidos, memes y emojis gratis en Clipnexo.",
    " Encuentra más ideas y recursos para tus proyectos en Clipnexo.",
    " Hoy.",
  ],
  en: [
    " More free resources.",
    " Find more on Clipnexo.",
    " Explore free clips and tools at Clipnexo.",
    " Find more free resources for creators at Clipnexo.",
    " Discover more sounds, memes, and emojis at Clipnexo.",
    " Today.",
  ],
  pt: [
    " Mais recursos grátis.",
    " Descubra mais no Clipnexo.",
    " Encontre mais recursos grátis no Clipnexo.",
    " Explore sons, memes e emojis grátis no Clipnexo.",
    " Encontre mais ideias e recursos para seus projetos no Clipnexo.",
    " Hoje.",
  ],
};

function characterCount(value: string): number {
  return Array.from(value).length;
}

function sliceCharacters(value: string, length: number): string {
  return Array.from(value).slice(0, length).join("");
}

export function createMediaSeoTitle(name: string, lang: SupportedLang, kind: MediaKind): string {
  const { prefix, suffix, filler } = TITLE_PARTS[kind][lang];
  const maxNameLength = 56 - characterCount(prefix) - characterCount(suffix);
  const minNameLength = 50 - characterCount(prefix) - characterCount(suffix);
  let titleName = name.normalize("NFC").trim().replace(/\s+/g, " ");

  while (characterCount(titleName) < minNameLength) {
    titleName = `${titleName} ${filler}`.trim();
  }

  if (characterCount(titleName) > maxNameLength) {
    const clippedName = sliceCharacters(titleName, maxNameLength - 1);
    const lastSpace = clippedName.lastIndexOf(" ");
    const wholeWords = lastSpace > 0 ? clippedName.slice(0, lastSpace).trimEnd() : "";
    titleName =
      characterCount(wholeWords) >= minNameLength - 1
        ? `${wholeWords}…`
        : `${clippedName.trimEnd()}…`;
  }

  return `${prefix}${titleName}${suffix}`;
}

export function fitSeoDescription(description: string, lang: SupportedLang): string {
  let result = description.normalize("NFC").trim().replace(/\s+/g, " ");
  if (characterCount(result) > 156) {
    const shortened = sliceCharacters(result, 156);
    const lastSpace = shortened.lastIndexOf(" ");
    result = lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened;
  }

  const endings = DESCRIPTION_ENDINGS[lang];
  while (characterCount(result) < 150) {
    const candidates = endings.map((ending) => `${result}${ending}`);
    const inRange = candidates
      .filter((candidate) => characterCount(candidate) >= 150 && characterCount(candidate) <= 156)
      .sort((a, b) => characterCount(a) - characterCount(b))[0];
    if (inRange) {
      result = inRange;
      break;
    }

    const shorter = candidates
      .filter((candidate) => characterCount(candidate) < 150)
      .sort((a, b) => characterCount(b) - characterCount(a))[0];
    if (!shorter) {
      result += endings[endings.length - 1];
      continue;
    }
    result = shorter;
  }

  if (!/[.!?]$/.test(result) && characterCount(result) < 156) result += ".";
  return result;
}
