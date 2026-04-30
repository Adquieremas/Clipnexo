import type { Metadata } from "next";
import { legalContent } from "@/lib/legal-content";
import { buildSeoMetadata } from "@/lib/seo";

type DMCAContent = {
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  section1: string;
  section1Text: string;
  section2: string;
  section2Text: string;
  section3: string;
  contact: string;
  note: string;
  noteText: string;
  updated: string;
};

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
  const t = legalContent.dmca[currentLang] as DMCAContent;

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: true,
    },
    routeKey: "dmca",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = legalContent.dmca[currentLang] as DMCAContent;

  const requiredItems: Record<Lang, string[]> = {
    es: [
      "URL del contenido",
      "Identificación del contenido",
      "Datos de contacto",
      "Declaración de buena fe",
    ],
    en: [
      "Content URL",
      "Identification of the content",
      "Contact details",
      "Good faith statement",
    ],
    pt: [
      "URL do conteúdo",
      "Identificação do conteúdo",
      "Dados de contato",
      "Declaração de boa-fé",
    ],
  };

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
      <ul style={{ color: "#444", paddingLeft: "20px" }}>
        {requiredItems[currentLang].map((item) => (
          <li key={item}>✔ {item}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.contact}</h2>
      <p style={{ fontWeight: "bold", color: "#111" }}>hola@clipnexo.com</p>

      <h2 style={{ marginTop: "30px", color: "#111" }}>{t.note}</h2>
      <p style={{ color: "#444" }}>{t.noteText}</p>

      <p style={{ marginTop: "40px", color: "#666", fontSize: "14px" }}>{t.updated}</p>
    </main>
  );
}
