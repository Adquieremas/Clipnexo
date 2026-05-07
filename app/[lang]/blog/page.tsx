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
    es: "Guías y trucos para redes sociales",
    en: "Social Media Guides and Tips",
    pt: "Guias e dicas para redes sociais",
  };

  const descriptions = {
    es: "Explora el blog con los mejores artículos y recursos sobre redes sociales, video y herramientas online próximamente para todos nuestros usuarios.",
    en: "Explore the Clipnexo blog with the best articles and resources about social media, video and online tools coming soon for all our global users right now.",
    pt: "Explore o blog do Clipnexo com os melhores artigos e recursos sobre redes sociais, vídeo e ferramentas online em breve para todos os nossos usuários agora.",
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
