import type { Metadata } from "next";
import { normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  const titles = {
    es: "Blog de Clipnexo",
    en: "Clipnexo Blog",
    pt: "Blog do Clipnexo",
  };

  const descriptions = {
    es: "Artículos y recursos de Clipnexo próximamente.",
    en: "Clipnexo articles and resources coming soon.",
    pt: "Artigos e recursos do Clipnexo em breve.",
  };

  return buildSeoMetadata({
    title: titles[currentLang],
    description: descriptions[currentLang],
    routeKey: "blog",
    lang: currentLang,
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default async function Page() {
  return <div>Blog próximamente</div>;
}
