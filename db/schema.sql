-- Clipnexo Sound Library — D1 schema
-- Apply with: wrangler d1 execute clipnexo-sounds --file=./db/schema.sql [--local]

CREATE TABLE IF NOT EXISTS sound_categories (
  id TEXT PRIMARY KEY,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sounds (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES sound_categories(id),
  r2_key TEXT NOT NULL UNIQUE,
  source_filename TEXT NOT NULL,
  content_hash TEXT NOT NULL UNIQUE,
  duration_ms INTEGER NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  -- Provenance (who/where this file came from, for audits and licensing):
  -- 'upload' = manually placed in sounds-upload/ by Clipnexo staff.
  -- 'myinstants' = imported via scripts/sounds/import-myinstants.mjs,
  -- which refuses to run for real without explicit, documented authorization.
  source TEXT NOT NULL DEFAULT 'upload',
  source_id TEXT,
  license TEXT,
  attribution TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sounds_category ON sounds(category_id);
CREATE INDEX IF NOT EXISTS idx_sounds_created_at ON sounds(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sounds_source_id ON sounds(source, source_id) WHERE source_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS sound_stats (
  sound_id TEXT PRIMARY KEY REFERENCES sounds(id),
  play_count INTEGER NOT NULL DEFAULT 0,
  download_count INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO sound_categories (id, name_es, name_en, name_pt, sort_order) VALUES
  ('memes', 'Memes', 'Memes', 'Memes', 1),
  ('efectos', 'Efectos de sonido', 'Sound effects', 'Efeitos sonoros', 2),
  ('musica', 'Música', 'Music', 'Música', 3),
  ('notificaciones', 'Notificaciones', 'Notifications', 'Notificações', 4),
  ('transiciones', 'Transiciones', 'Transitions', 'Transições', 5),
  ('otros', 'Otros', 'Other', 'Outros', 6);
