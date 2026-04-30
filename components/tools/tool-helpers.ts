export function compactTopic(value: string, fallback: string) {
  return value.trim().replace(/\s+/g, " ") || fallback;
}

export function cleanHashtag(value: string) {
  const cleaned = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .join("")
    .toLowerCase();

  return cleaned ? `#${cleaned}` : "";
}

export function uniqueList(items: string[]) {
  const seen = new Set<string>();
  const results: string[] = [];

  for (const item of items) {
    const normalized = item.trim();
    const key = normalized.toLowerCase();

    if (!normalized || seen.has(key)) continue;

    seen.add(key);
    results.push(normalized);
  }

  return results;
}

export function buildHashtags(topic: string, category: string, count: number, extras: string[]) {
  const topicWords = topic
    .split(/\s+/)
    .map(cleanHashtag)
    .filter(Boolean);

  return uniqueList([
    cleanHashtag(topic),
    cleanHashtag(category),
    ...topicWords,
    ...extras.map(cleanHashtag),
  ]).slice(0, count);
}
