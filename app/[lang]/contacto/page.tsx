import type { Metadata } from "next";
import { legalContent } from "@/lib/legal-content";
import { buildSeoMetadata } from "@/lib/seo";

type ContactContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  formTitle?: string;
  formText?: string;
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
  const t = legalContent.contact[currentLang] as ContactContent;

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: true,
    },
    routeKey: "contact",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = legalContent.contact[currentLang] as ContactContent;

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        lineHeight: "1.6",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#111",
        }}
      >
        {t.title}
      </h1>

      <p style={{ marginTop: "20px", color: "#444" }}>{t.intro}</p>

      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          color: "#111",
        }}
      >
        hola@clipnexo.com
      </p>

      <h2 style={{ marginTop: "40px", color: "#111" }}>{t.formTitle ?? "Formulario de contacto"}</h2>

      <p style={{ marginTop: "10px", color: "#444" }}>
        {t.formText ?? "Si deseas comunicarte con nosotros, puedes usar el siguiente formulario."}
      </p>

      <div style={{ marginTop: "20px" }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf34EpOrNMOhIAu9hkyDK5TPUdOtHxYrF-HzkurDruQ9_xvFQ/viewform?embedded=true"
          width="100%"
          height="743"
          style={{ border: "none" }}
          loading="lazy"
        >
          Cargando…
        </iframe>
      </div>

      <p style={{ marginTop: "40px", color: "#666", fontSize: "14px" }}>{t.updated}</p>
    </main>
  );
}
