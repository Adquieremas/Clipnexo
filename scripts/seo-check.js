#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const TEMPLATE_SUFFIX  = " | Clipnexo";
const MAX_FIELD_TITLE  = 48;
const MAX_DESC         = 159;
const MAX_RENDERED     = MAX_FIELD_TITLE + TEMPLATE_SUFFIX.length;

const EXCLUDED = new Set(["node_modules", ".next", ".git", ".turbo", "scripts"]);

function walkFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !EXCLUDED.has(entry.name)) {
      walkFiles(full, acc);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const root  = process.cwd();
const files = walkFiles(root);

const titleEntries = [];
const descEntries  = [];

for (const fp of files) {
  const rel     = path.relative(root, fp);
  const content = fs.readFileSync(fp, "utf-8");

  // Find metaTitle / metaDescription
  const TITLE_RE = /metaTitle:\s*"([^"]*)"/g;
  const DESC_RE  = /metaDescription:\s*"([^"]*)"/g;
  let m;
  while ((m = TITLE_RE.exec(content)) !== null) {
    // try to guess line number (rough approx)
    const line = content.substring(0, m.index).split("\n").length;
    titleEntries.push({ file: rel, line, field: m[1], rendered: m[1] + TEMPLATE_SUFFIX });
  }
  while ((m = DESC_RE.exec(content)) !== null) {
    const line = content.substring(0, m.index).split("\n").length;
    descEntries.push({ file: rel, line, value: m[1] });
  }

  // Find const titles = { ... }
  const TITLES_OBJ_RE = /titles\s*=\s*{([^}]+)}/g;
  while ((m = TITLES_OBJ_RE.exec(content)) !== null) {
    const block = m[1];
    const LANG_RE = /(?:es|en|pt):\s*"([^"]+)"/g;
    let m2;
    while ((m2 = LANG_RE.exec(block)) !== null) {
      const absIndex = m.index + m[0].indexOf(m2[0]);
      const line = content.substring(0, absIndex).split("\n").length;
      titleEntries.push({ file: rel, line, field: m2[1], rendered: m2[1] + TEMPLATE_SUFFIX });
    }
  }

  // Find const descriptions = { ... }
  const DESCS_OBJ_RE = /descriptions\s*=\s*{([^}]+)}/g;
  while ((m = DESCS_OBJ_RE.exec(content)) !== null) {
    const block = m[1];
    const LANG_RE = /(?:es|en|pt):\s*"([^"]+)"/g;
    let m2;
    while ((m2 = LANG_RE.exec(block)) !== null) {
      const absIndex = m.index + m[0].indexOf(m2[0]);
      const line = content.substring(0, absIndex).split("\n").length;
      descEntries.push({ file: rel, line, value: m2[1] });
    }
  }
}

const errors = [];
function err(msg) { errors.push(msg); }

const longTitles = titleEntries.filter(e => e.rendered.length >= 60);
for (const e of longTitles) err(`[TITLE >= 60] ${e.file}:${e.line}\n   field(${e.field.length}) rendered(${e.rendered.length}): "${e.field}"`);

const longDescs = descEntries.filter(e => e.value.length >= 160);
for (const e of longDescs) err(`[DESC >= 160] ${e.file}:${e.line}\n   (${e.value.length}): "${e.value.slice(0, 80)}..."`);

const emptyTitles = titleEntries.filter(e => !e.field.trim());
for (const e of emptyTitles) err(`[EMPTY TITLE] ${e.file}:${e.line}`);

const emptyDescs = descEntries.filter(e => !e.value.trim());
for (const e of emptyDescs) err(`[EMPTY DESC] ${e.file}:${e.line}`);

const titleMap = new Map();
for (const e of titleEntries) {
  const key = e.rendered.toLowerCase().trim();
  if (!titleMap.has(key)) titleMap.set(key, []);
  titleMap.get(key).push({ file: e.file, line: e.line });
}
for (const [rendered, locs] of titleMap) {
  if (locs.length > 1) err(`[DUP TITLE x${locs.length}] "${rendered}"\n` + locs.map(l => `   -> ${l.file}:${l.line}`).join("\n"));
}

const descMap = new Map();
for (const e of descEntries) {
  const key = e.value.toLowerCase().trim();
  if (!descMap.has(key)) descMap.set(key, []);
  descMap.get(key).push({ file: e.file, line: e.line });
}
for (const [val, locs] of descMap) {
  if (locs.length > 1) err(`[DUP DESC x${locs.length}] "${val.slice(0, 70)}..."\n` + locs.map(l => `   -> ${l.file}:${l.line}`).join("\n"));
}

const renderedLengths = titleEntries.map(e => e.rendered.length);
const descLengths     = descEntries.map(e => e.value.length);

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║         CLIPNEXO SEO VALIDATION REPORT           ║");
console.log("╚══════════════════════════════════════════════════╝\n");

console.log(`${longTitles.length === 0 ? "✅" : "❌"}  Rule 1 — Titles rendered < 60 chars`);
console.log(`      Scanned: ${titleEntries.length} | Violations: ${longTitles.length}`);
if (renderedLengths.length > 0) console.log(`      Range: ${Math.min(...renderedLengths)}–${Math.max(...renderedLengths)} chars (max: 59)\n`);

console.log(`${longDescs.length === 0 ? "✅" : "❌"}  Rule 2 — Descriptions < 160 chars`);
console.log(`      Scanned: ${descEntries.length} | Violations: ${longDescs.length}`);
if (descLengths.length > 0) console.log(`      Range: ${Math.min(...descLengths)}–${Math.max(...descLengths)} chars (max: 159)\n`);

console.log(`${emptyTitles.length === 0 ? "✅" : "❌"}  Rule 3 — No empty titles    | Empty: ${emptyTitles.length}`);
console.log(`${emptyDescs.length === 0 ? "✅" : "❌"}  Rule 4 — No empty descs     | Empty: ${emptyDescs.length}`);
console.log(`${[...titleMap.values()].every(l => l.length === 1) ? "✅" : "❌"}  Rule 5 — No duplicate titles`);
console.log(`      Unique: ${titleMap.size} | Duplicates: ${[...titleMap.values()].filter(l => l.length > 1).length}`);
console.log(`${[...descMap.values()].every(l => l.length === 1) ? "✅" : "❌"}  Rule 6 — No duplicate descs`);
console.log(`      Unique: ${descMap.size} | Duplicates: ${[...descMap.values()].filter(l => l.length > 1).length}`);

if (errors.length > 0) {
  console.log("\n❌ ERRORS FOUND:\n");
  errors.forEach(e => console.error(e + "\n"));
  process.exit(1);
} else {
  console.log("\n✅ ALL 6 RULES PASSED.");
  process.exit(0);
}
