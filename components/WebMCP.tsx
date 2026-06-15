"use client";

import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModelContextAPI = Record<string, any>;

export default function WebMCP() {
  useEffect(() => {
    const ctx = (navigator as unknown as ModelContextAPI).modelContext;
    if (!ctx?.registerTool) return;

    const controller = new AbortController();

    const tools = [
      {
        name: "download_tiktok_video",
        description:
          "Downloads a TikTok video without watermark. Provide a valid TikTok video URL.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "TikTok video URL to download",
            },
          },
          required: ["url"],
        },
        execute: async ({ url }: { url: string }) => {
          const res = await fetch("/api/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, type: "video" }),
          });
          return res.json();
        },
      },
      {
        name: "convert_tiktok_to_mp3",
        description:
          "Extracts audio from a TikTok video and returns MP3 format.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "TikTok video URL to convert to MP3",
            },
          },
          required: ["url"],
        },
        execute: async ({ url }: { url: string }) => {
          const res = await fetch("/api/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, type: "audio" }),
          });
          return res.json();
        },
      },
    ];

    for (const tool of tools) {
      ctx.registerTool(tool.name, tool, { signal: controller.signal });
    }

    return () => controller.abort();
  }, []);

  return null;
}
