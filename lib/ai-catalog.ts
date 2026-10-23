const catalog = {
  specVersion: "1.0",
  host: {
    displayName: "Clipnexo",
    identifier: "did:web:clipnexo.com",
    documentationUrl: "https://clipnexo.com/llms.txt",
  },
  entries: [
    {
      identifier: "urn:air:clipnexo.com:docs:llms-txt",
      displayName: "Clipnexo site and tools index",
      type: "text/plain",
      url: "https://clipnexo.com/llms.txt",
      description:
        "An index of Clipnexo pages, tools, languages, and guidance for AI assistants.",
      tags: ["clipnexo", "documentation", "llms.txt"],
      representativeQueries: [
        "What tools and content does Clipnexo offer?",
        "Where can I find Clipnexo pages in Spanish, English, or Portuguese?",
      ],
      trustManifest: { identity: "clipnexo.com" },
    },
    {
      identifier: "urn:air:clipnexo.com:sitemap:index",
      displayName: "Clipnexo sitemap index",
      type: "application/xml",
      url: "https://clipnexo.com/sitemap.xml",
      description:
        "An XML sitemap index listing Clipnexo pages and blog content.",
      tags: ["clipnexo", "sitemap", "discovery"],
      representativeQueries: [
        "Which pages and articles are published on Clipnexo?",
        "Where can a crawler find Clipnexo's XML sitemaps?",
      ],
      trustManifest: { identity: "clipnexo.com" },
    },
  ],
};

export function getAiCatalogResponse() {
  return new Response(JSON.stringify(catalog), {
    headers: {
      "Content-Type": "application/ai-catalog+json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
