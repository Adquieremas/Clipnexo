import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { SupportedLang } from "./routes";

export type SoundCategory = {
  id: string;
  name_es: string;
  name_en: string;
  name_pt: string;
  sort_order: number;
};

export type Sound = {
  id: string;
  title: string;
  category_id: string;
  r2_key: string;
  source_filename: string;
  content_hash: string;
  duration_ms: number;
  file_size: number;
  mime_type: string;
  tags: string; // JSON-encoded string[]
  created_at: string;
};

export type SoundWithStats = Sound & {
  play_count: number;
  download_count: number;
};

export async function getSoundsDb() {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.SOUNDS_DB) {
    throw new Error("SOUNDS_DB binding is not configured");
  }
  return env.SOUNDS_DB;
}

export function getCategoryName(category: SoundCategory, lang: SupportedLang): string {
  if (lang === "en") return category.name_en;
  if (lang === "pt") return category.name_pt;
  return category.name_es;
}

export function parseTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listCategories(): Promise<SoundCategory[]> {
  const db = await getSoundsDb();
  const { results } = await db
    .prepare("SELECT * FROM sound_categories ORDER BY sort_order ASC")
    .all<SoundCategory>();
  return results;
}

export async function getCategory(id: string): Promise<SoundCategory | null> {
  const db = await getSoundsDb();
  const row = await db
    .prepare("SELECT * FROM sound_categories WHERE id = ?")
    .bind(id)
    .first<SoundCategory>();
  return row ?? null;
}

const SOUND_SELECT = `
  SELECT s.*, COALESCE(st.play_count, 0) AS play_count, COALESCE(st.download_count, 0) AS download_count
  FROM sounds s
  LEFT JOIN sound_stats st ON st.sound_id = s.id
`;

export type ListSoundsOptions = {
  category?: string;
  search?: string;
  sort?: "recent" | "popular" | "title";
  limit?: number;
  offset?: number;
};

export async function listSounds(options: ListSoundsOptions = {}): Promise<{ sounds: SoundWithStats[]; total: number }> {
  const db = await getSoundsDb();
  const { category, search, sort = "recent", limit = 24, offset = 0 } = options;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (category) {
    conditions.push("s.category_id = ?");
    params.push(category);
  }
  if (search) {
    conditions.push("(s.title LIKE ? OR s.tags LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const orderClause =
    sort === "popular"
      ? "ORDER BY play_count DESC, s.created_at DESC"
      : sort === "title"
        ? "ORDER BY s.title ASC"
        : "ORDER BY s.created_at DESC";

  const countRow = await db
    .prepare(`SELECT COUNT(*) AS total FROM sounds s ${whereClause}`)
    .bind(...params)
    .first<{ total: number }>();

  const { results } = await db
    .prepare(`${SOUND_SELECT} ${whereClause} ${orderClause} LIMIT ? OFFSET ?`)
    .bind(...params, limit, offset)
    .all<SoundWithStats>();

  return { sounds: results, total: countRow?.total ?? 0 };
}

export async function getSoundById(id: string): Promise<SoundWithStats | null> {
  const db = await getSoundsDb();
  const row = await db.prepare(`${SOUND_SELECT} WHERE s.id = ?`).bind(id).first<SoundWithStats>();
  return row ?? null;
}

export async function getPopularSounds(limit = 8): Promise<SoundWithStats[]> {
  const { sounds } = await listSounds({ sort: "popular", limit });
  return sounds;
}

export async function getRecentSounds(limit = 8): Promise<SoundWithStats[]> {
  const { sounds } = await listSounds({ sort: "recent", limit });
  return sounds;
}

export async function incrementSoundStat(id: string, field: "play_count" | "download_count"): Promise<void> {
  const db = await getSoundsDb();
  await db
    .prepare(
      `INSERT INTO sound_stats (sound_id, ${field}) VALUES (?, 1)
       ON CONFLICT(sound_id) DO UPDATE SET ${field} = ${field} + 1`
    )
    .bind(id)
    .run();
}

export function getSoundAudioUrl(r2Key: string): string {
  const base = process.env.NEXT_PUBLIC_MEDIA_URL || "https://media.clipnexo.com";
  return `${base}/${r2Key}`;
}
