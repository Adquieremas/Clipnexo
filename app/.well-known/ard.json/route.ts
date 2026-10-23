import { getAiCatalogResponse } from "@/lib/ai-catalog";

export async function GET() {
  return getAiCatalogResponse();
}
