import type { Metadata } from "next";
import YouTubeDescriptionGenerator from "@/components/tools/YouTubeDescriptionGenerator";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import {
  getToolMetadata,
  getToolPageContent,
  type ToolKey,
} from "@/lib/tools-content";
import { normalizeLang } from "@/lib/routes";

type PageProps = {
  params: Promise<{ lang: string }>;
};

const toolKey: ToolKey = "youtubeDescriptionGenerator";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return getToolMetadata(toolKey, lang);
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const content = getToolPageContent(toolKey, currentLang);

  return (
    <ToolPageLayout content={content} lang={currentLang} routeKey={toolKey}>
      <YouTubeDescriptionGenerator lang={currentLang} />
    </ToolPageLayout>
  );
}
