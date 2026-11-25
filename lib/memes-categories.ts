import type { SupportedLang } from "./routes";

export type MemeCategoryId =
  | "reacciones"
  | "bob-esponja"
  | "simpsons"
  | "streamers"
  | "peliculas-tv"
  | "anime-caricaturas"
  | "gaming";

export type MemeCategory = {
  id: MemeCategoryId;
  labels: Record<SupportedLang, string>;
};

export const MEME_CATEGORIES: MemeCategory[] = [
  { id: "reacciones", labels: { es: "Reacciones", en: "Reactions", pt: "Reações" } },
  { id: "bob-esponja", labels: { es: "Bob Esponja", en: "SpongeBob", pt: "Bob Esponja" } },
  { id: "simpsons", labels: { es: "Los Simpsons", en: "The Simpsons", pt: "Os Simpsons" } },
  { id: "streamers", labels: { es: "Streamers", en: "Streamers", pt: "Streamers" } },
  { id: "peliculas-tv", labels: { es: "Películas y TV", en: "Movies & TV", pt: "Filmes e TV" } },
  { id: "anime-caricaturas", labels: { es: "Anime y caricaturas", en: "Anime & cartoons", pt: "Anime e desenhos" } },
  { id: "gaming", labels: { es: "Gaming", en: "Gaming", pt: "Games" } },
];

export const MEME_CATEGORY_BY_ID = new Map(MEME_CATEGORIES.map((c) => [c.id, c]));

export function getMemeCategoryLabel(id: MemeCategoryId, lang: SupportedLang): string {
  return MEME_CATEGORY_BY_ID.get(id)?.labels[lang] ?? id;
}

export function classifyMemeTitle(title: string): MemeCategoryId {
  const t = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const has = (...ws: string[]) => ws.some((w) => t.includes(w));

  if (has("bob esponja", "patricio", "calamardo", "arenita", "plancton", "spongebob", "don cangrejo", "gary ")) return "bob-esponja";
  if (has("simpson", "homero", "bart ", "lisa ", "marge", "sr burns", "burns", "milhouse", "moe ", "nelson", "flanders", "krusty", "springfield")) return "simpsons";
  if (has("auron", "luisito comunica", "rubius", "ibai", "vegetta", "fernanfloo", "elmariana", "rivers", "xokas", "illojuan")) return "streamers";
  if (has("goku", "vegeta", "dragon ball", "naruto", "one piece", "pokemon", "pikachu", "anime", "sailor moon", "digimon", "shingeki", "attack on titan", "jojo")) return "anime-caricaturas";
  if (has("minecraft", "fortnite", "gta", "free fire", "roblox", "among us", "call of duty", "mario bros", "zelda", "sonic", "halo ", "playstation", "xbox", "nintendo")) return "gaming";
  if (has(
    "shrek", "toy story", "spider-man", "spiderman", "batman", "avengers", "marvel", "star wars",
    "harry potter", "frozen", "minions", "gru ", "joker", "terminator", "rocky", "matrix", "titanic",
    "kung fu panda", "madagascar", "padrino", "scarface", "drake y josh", "tarzan", "forrest gump",
    "breaking bad", "walking dead", "stranger things", "the office", "friends ", "how i met",
    "piratas del caribe", "jurassic", "rapido y furioso", "fast and furious", "el chavo", "chespirito",
    "don ramon", "la rosa de guadalupe", "betty la fea", "malcolm", "mr bean", "seinfeld",
    "los increibles", "increibles", "ratatouille", "up ", "walle", "buscando a nemo", "dory",
    "rey leon", "lion king", "el senor de los anillos", "lord of the rings", "hombre arana"
  )) return "peliculas-tv";
  return "reacciones";
}
