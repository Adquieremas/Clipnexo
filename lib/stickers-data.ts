import { MEMES, type MemeItem } from "./memes-data";

// Video "stickers" for WhatsApp: a curated subset of the meme clip library,
// stored in the same R2 prefix, surfaced on their own page.
export const STICKER_IDS: string[] = [
  "cr7-momentos",
  "cr7-side-eye",
  "cr7",
  "funny-gift-video",
  "gallo",
  "hahaha-video",
  "hello-video-meme",
  "inanam-yorrrruuuuum",
  "jajajaja",
  "john-cena",
  "laroca",
  "listening-to-music-video",
  "llorando",
  "next-funny",
  "no-drama-meme",
  "oh-my-god",
  "perro",
  "ronaldinho-aesthetic",
  "silly-reactions",
  "siuuuu",
  "te-vigilo",
  "viral",
  "viralmeme",
];

const STICKER_ID_SET = new Set(STICKER_IDS);

export const STICKERS: MemeItem[] = MEMES.filter((m) => STICKER_ID_SET.has(m.id));
