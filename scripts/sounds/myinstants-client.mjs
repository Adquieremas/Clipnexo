/**
 * Minimal client for the Myinstants public API (https://www.myinstants.com/api/v1/).
 *
 * Confirmed by direct inspection on 2026-11-25:
 * - GET /api/v1/instants/?name=<query>&page=<n> returns
 *     { count, next, previous, results: [{ name, slug, sound, color, image, description, tags }] }
 *   where `sound` is a direct MP3 URL (e.g. https://www.myinstants.com/media/sounds/faaah.mp3).
 * - No `license`, `author`, `category`, or `duration` field is returned by the API.
 * - Rate limits: 10 requests/minute for anonymous access, 1500/day with an
 *   API token (obtained by emailing Myinstants — see README in this folder).
 * - No terms-of-use, copyright, or redistribution-licensing page was found
 *   anywhere on myinstants.com at the time of writing. Do not treat API
 *   *access* (even with a token) as a redistribution *license* — they are
 *   not the same thing. See scripts/sounds/README.md before using this file
 *   for anything beyond read-only inspection/dry-run.
 */

const BASE_URL = "https://www.myinstants.com/api/v1";
const ANONYMOUS_MIN_INTERVAL_MS = 6_500; // ~9/min, under the documented 10/min anonymous cap
const AUTHENTICATED_MIN_INTERVAL_MS = 60_000 / 1500 + 50; // under the documented 1500/day cap, spread safely
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MyinstantsClient {
  /** @param {{ apiToken?: string, logger?: (msg: string) => void }} [options] */
  constructor(options = {}) {
    this.apiToken = options.apiToken || process.env.MYINSTANTS_API_TOKEN || null;
    this.log = options.logger || ((msg) => console.log(`[myinstants] ${msg}`));
    this.minIntervalMs = this.apiToken ? AUTHENTICATED_MIN_INTERVAL_MS : ANONYMOUS_MIN_INTERVAL_MS;
    this.lastRequestAt = 0;

    if (!this.apiToken) {
      this.log("WARNING: no MYINSTANTS_API_TOKEN set. Using anonymous rate limit (10 req/min).");
    }
  }

  async #throttle() {
    const elapsed = Date.now() - this.lastRequestAt;
    const wait = this.minIntervalMs - elapsed;
    if (wait > 0) await sleep(wait);
    this.lastRequestAt = Date.now();
  }

  /** @param {string} url @returns {Promise<Response>} */
  async #requestWithRetry(url) {
    let attempt = 0;
    for (;;) {
      await this.#throttle();
      const headers = {};
      if (this.apiToken) headers.Authorization = `Token ${this.apiToken}`;

      let response;
      try {
        response = await fetch(url, { headers });
      } catch (err) {
        if (attempt >= MAX_RETRIES) throw err;
        const delay = RETRY_BASE_DELAY_MS * 2 ** attempt;
        this.log(`Network error (${err.message}), retrying in ${delay}ms...`);
        await sleep(delay);
        attempt += 1;
        continue;
      }

      if (response.status === 429) {
        if (attempt >= MAX_RETRIES) throw new Error(`Rate limited after ${MAX_RETRIES} retries: ${url}`);
        const retryAfter = Number(response.headers.get("retry-after")) || RETRY_BASE_DELAY_MS * 2 ** attempt;
        this.log(`429 rate limited, waiting ${retryAfter}ms before retry...`);
        await sleep(retryAfter);
        attempt += 1;
        continue;
      }

      if (!response.ok) {
        throw new Error(`Myinstants API error ${response.status} for ${url}`);
      }

      return response;
    }
  }

  /**
   * Search/list sounds by name. Returns one page; follow `next` to paginate.
   * @param {{ name?: string, page?: number }} [options]
   */
  async listInstants({ name, page = 1 } = {}) {
    const url = new URL(`${BASE_URL}/instants/`);
    if (name) url.searchParams.set("name", name);
    url.searchParams.set("page", String(page));

    const response = await this.#requestWithRetry(url.toString());
    return response.json();
  }

  /** Fetch every page for a query, yielding results as they arrive. */
  async *iterateInstants({ name } = {}) {
    let page = 1;
    for (;;) {
      const data = await this.listInstants({ name, page });
      for (const item of data.results) yield item;
      if (!data.next) break;
      page += 1;
    }
  }

  /** @param {string} slug */
  async getInstant(slug) {
    const response = await this.#requestWithRetry(`${BASE_URL}/instants/${slug}/`);
    return response.json();
  }
}
