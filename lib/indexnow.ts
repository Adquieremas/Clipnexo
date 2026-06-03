import { SITE_URL } from "@/lib/site";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "918041f42fff459996f397f98a5e3508";
const INDEXNOW_KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `${SITE_URL}/918041f42fff459996f397f98a5e3508.txt`;
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const HOST = "clipnexo.com";
const MAX_URLS = 100;

export interface IndexNowResult {
  ok: boolean;
  status: number;
  submitted: string[];
  rejected: string[];
  message: string;
}

export function validateUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith("https://clipnexo.com")) return false;
  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
}

export async function submitUrls(urls: string[]): Promise<IndexNowResult> {
  const unique = [...new Set(urls.map((u) => u.trim()))].filter(Boolean);
  const submitted: string[] = [];
  const rejected: string[] = [];

  for (const url of unique) {
    if (validateUrl(url)) {
      submitted.push(url);
    } else {
      rejected.push(url);
    }
  }

  if (submitted.length === 0) {
    return {
      ok: false,
      status: 400,
      submitted: [],
      rejected,
      message: "No valid URLs. Must start with https://clipnexo.com",
    };
  }

  const batch = submitted.slice(0, MAX_URLS);

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: batch,
      }),
    });

    const msgs: Record<number, string> = {
      200: "OK — URLs submitted",
      202: "Accepted — received",
      400: "Bad request — check payload",
      403: "Forbidden — check key/keyLocation",
      422: "Unprocessable — URL invalid or wrong host",
      429: "Too many requests — retry later",
    };

    return {
      ok: res.ok || res.status === 202,
      status: res.status,
      submitted: batch,
      rejected,
      message: msgs[res.status] || `Status ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      submitted: [],
      rejected: submitted,
      message: err instanceof Error ? err.message : "Request failed",
    };
  }
}
