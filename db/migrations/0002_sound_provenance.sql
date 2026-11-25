-- Adds provenance/licensing columns to an existing `sounds` table that was
-- created before scripts/sounds/import-myinstants.mjs existed.
-- Apply with: wrangler d1 execute clipnexo-sounds --file=./db/migrations/0002_sound_provenance.sql [--local]
-- Safe to re-run: SQLite's ALTER TABLE ADD COLUMN fails loudly if the column
-- already exists, so only run this once per database.

ALTER TABLE sounds ADD COLUMN source TEXT NOT NULL DEFAULT 'upload';
ALTER TABLE sounds ADD COLUMN source_id TEXT;
ALTER TABLE sounds ADD COLUMN license TEXT;
ALTER TABLE sounds ADD COLUMN attribution TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_sounds_source_id ON sounds(source, source_id) WHERE source_id IS NOT NULL;
