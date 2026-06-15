import type { Metadata } from "next";
import StudyScheduleGenerator from "@/components/tools/StudyScheduleGenerator";
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

const toolKey: ToolKey = "studyScheduleGenerator";

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
      <StudyScheduleGenerator lang={currentLang} />
    </ToolPageLayout>
  );
}
