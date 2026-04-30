import type { Metadata } from "next";

import { legalContent } from "@/lib/legal-content";
import { buildSeoMetadata } from "@/lib/seo";

type Lang = "es" | "en" | "pt";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

function normalizeLang(lang: string): Lang {
  return ["es", "en", "pt"].includes(lang) ? (lang as Lang) : "es";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = legalContent.terms[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: true,
    },
    routeKey: "terms",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {

  const { lang } = await params;

  const currentLang = normalizeLang(lang);

  const t = legalContent.terms[currentLang];

  return (

    <main

      style={{

        maxWidth: "900px",

        margin: "40px auto",

        padding: "20px",

        lineHeight: "1.6",

      }}

    >

      <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111" }}>{t.title}</h1>

      <p style={{ marginTop: "20px", color: "#444" }}>{t.intro}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section1}</h2>

      <p style={{ color: "#444" }}>{t.section1Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section2}</h2>

      <p style={{ color: "#444" }}>{t.section2Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section3}</h2>

      <p style={{ color: "#444" }}>{t.section3Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section4}</h2>

      <p style={{ color: "#444" }}>{t.section4Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section5}</h2>

      <p style={{ color: "#444" }}>{t.section5Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section6}</h2>

      <p style={{ color: "#444" }}>{t.section6Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.section7}</h2>

      <p style={{ color: "#444" }}>{t.section7Text}</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.contact}</h2>

      <p style={{ color: "#444" }}>{t.contactText}</p>

      <p style={{ marginTop: "40px", color: "#666", fontSize: "14px" }}>{t.updated}</p>

    </main>

  );

}
