import type { Metadata } from "next";
import { normalizeLang } from "@/lib/routes";
import { getClusterContent } from "@/lib/cluster-content";
import { buildSeoMetadata } from "@/lib/seo";
import ClusterPage from "@/components/ClusterPage";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const content = getClusterContent("tiktok", currentLang);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    routeKey: "tiktokTools",
    lang: currentLang,
  });
}

export default async function TikTokToolsPage({ params }: PageProps) {
  const { lang } = await params;
  return <ClusterPage clusterKey="tiktok" lang={lang} />;
}
