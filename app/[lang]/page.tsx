import type { Metadata } from "next";
import Link from "next/link";
import DownloaderBox from "@/components/DownloaderBox";
import { getMoreToolsLinks } from "@/lib/tools-content";
import { normalizeLang, getLocalizedRoute } from "@/lib/routes";
import { buildSeoMetadata, getAbsoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const titles = {
  es: "Descargar videos y audios de TikTok gratis",
  en: "Download TikTok videos and MP3 audio for free",
  pt: "Baixar vídeos do TikTok e áudio MP3 grátis",
};

const descriptions = {
  es: "Descarga videos de TikTok sin marca de agua y audios MP3 gratis. Herramienta rápida, online y compatible con celular y PC sin instalar nada hoy.",
  en: "Download TikTok videos without watermark and free MP3 audio. Fast, online tool compatible with mobile and PC without installing anything today.",
  pt: "Baixe vídeos do TikTok sem marca d'água e áudio MP3 grátis. Ferramenta rápida, online e compatível com celular e PC sem instalar nada hoje.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  return buildSeoMetadata({
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    routeKey: "home",
    lang: currentLang,
  });
}

export default async function Home({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const resolvedSearchParams = await searchParams;

  const initialUrl =
    typeof resolvedSearchParams.url === "string" ? resolvedSearchParams.url : "";

  const shared =
    typeof resolvedSearchParams.shared === "string"
      ? resolvedSearchParams.shared === "1"
      : false;

  const shareError =
    typeof resolvedSearchParams.share_error === "string"
      ? resolvedSearchParams.share_error === "1"
      : false;

  const invalidPath =
    typeof resolvedSearchParams.invalid === "string"
      ? resolvedSearchParams.invalid === "1"
      : false;

  const copy = {
    es: {
      title: "Descargador de videos de TikTok",
      subtitle: "Descargar videos de TikTok sin marca de agua en iPhone, Android",
      aboutTitle: "¿Qué es Clipnexo descargar videos de TikTok sin marca de agua?",
      aboutText:
        "Clipnexo es una herramienta online gratuita que te permite descargar videos de TikTok sin marca de agua en alta calidad. Solo necesitas copiar el enlace del video, pegarlo en el campo superior y descargarlo en segundos.",
      howTitle: "¿Cómo descargar videos de TikTok?",
      howSteps: [
        "Copia el enlace del video desde TikTok",
        "Pégalo en el campo de arriba",
        "Haz clic en descargar",
        "Guarda el video sin marca de agua",
      ],
      advantagesTitle: "Ventajas de usar Clipnexo",
      advantages: [
        "Descarga sin marca de agua",
        "Compatible con celular y PC",
        "No necesitas instalar nada",
        "Rápido y gratis",
      ],
      toolsTitle: "Herramientas para creadores",
      toolsIntro:
        "Además de descargar videos, puedes crear bios, ideas, ganchos, captions, hashtags y títulos para tus videos cortos.",
      faqTitle: "Preguntas frecuentes",
      faqs: [
        {
          q: "¿Por qué no puedo descargar el video?",
          a: "Verifica que el enlace sea correcto y que el video sea público.",
        },
        {
          q: "¿Se puede descargar en HD?",
          a: "Sí, siempre que el video original tenga alta calidad.",
        },
        {
          q: "¿Es seguro usar Clipnexo?",
          a: "Sí, no necesitas instalar nada ni registrarte.",
        },
        {
          q: "¿Funciona en celular?",
          a: "Sí, puedes usarlo en Android, iPhone y PC.",
        },
      ],
    },
    en: {
      title: "TikTok video downloader",
      subtitle: "Download TikTok videos without watermark on iPhone, Android",
      aboutTitle: "What is Clipnexo TikTok video downloader without watermark?",
      aboutText:
        "Clipnexo is a free online tool that lets you download TikTok videos without watermark in high quality. Just copy the video link, paste it into the field above, and download it in seconds.",
      howTitle: "How to download TikTok videos?",
      howSteps: [
        "Copy the video link from TikTok",
        "Paste it into the field above",
        "Click download",
        "Save the video without watermark",
      ],
      advantagesTitle: "Advantages of using Clipnexo",
      advantages: [
        "No watermark downloads",
        "Compatible with mobile and PC",
        "No installation required",
        "Fast and free",
      ],
      toolsTitle: "Tools for creators",
      toolsIntro:
        "Besides downloading videos, you can create bios, ideas, hooks, captions, hashtags and titles for short videos.",
      faqTitle: "Frequently asked questions",
      faqs: [
        {
          q: "Why can't I download the video?",
          a: "Make sure the link is correct and the video is public.",
        },
        {
          q: "Can I download in HD?",
          a: "Yes, as long as the original video is available in high quality.",
        },
        {
          q: "Is Clipnexo safe to use?",
          a: "Yes, you do not need to install anything or register.",
        },
        {
          q: "Does it work on mobile?",
          a: "Yes, you can use it on Android, iPhone, and PC.",
        },
      ],
    },
    pt: {
      title: "Baixador de vídeos do TikTok",
      subtitle: "Baixar vídeos do TikTok sem marca d'água no iPhone e Android",
      aboutTitle: "O que é o Clipnexo para baixar vídeos do TikTok sem marca d'água?",
      aboutText:
        "Clipnexo é uma ferramenta online gratuita que permite baixar vídeos do TikTok sem marca d'água em alta qualidade. Basta copiar o link do vídeo, colar no campo acima e baixar em segundos.",
      howTitle: "Como baixar vídeos do TikTok?",
      howSteps: [
        "Copie o link do vídeo do TikTok",
        "Cole no campo acima",
        "Clique em baixar",
        "Salve o vídeo sem marca d'água",
      ],
      advantagesTitle: "Vantagens de usar o Clipnexo",
      advantages: [
        "Baixe sem marca d'água",
        "Compatível com celular e PC",
        "Não precisa instalar nada",
        "Rápido e grátis",
      ],
      toolsTitle: "Ferramentas para criadores",
      toolsIntro:
        "Além de baixar vídeos, você pode criar bios, ideias, ganchos, legendas, hashtags e títulos para vídeos curtos.",
      faqTitle: "Perguntas frequentes",
      faqs: [
        {
          q: "Por que não consigo baixar o vídeo?",
          a: "Verifique se o link está correto e se o vídeo é público.",
        },
        {
          q: "É possível baixar em HD?",
          a: "Sim, desde que o vídeo original tenha alta qualidade.",
        },
        {
          q: "É seguro usar o Clipnexo?",
          a: "Sim, você não precisa instalar nada nem se registrar.",
        },
        {
          q: "Funciona no celular?",
          a: "Sim, você pode usar em Android, iPhone e PC.",
        },
      ],
    },
  } as const;

  const t = copy[currentLang as keyof typeof copy] ?? copy.es;
  const toolLinks = getMoreToolsLinks(currentLang);
  const canonicalUrl = getAbsoluteUrl(getLocalizedRoute("home", currentLang));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.title,
    description: descriptions[currentLang as keyof typeof descriptions],
    url: canonicalUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    datePublished: "2026-05-06T00:00:00.000Z",
    dateModified: "2026-05-06T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: "Clipnexo",
      url: "https://clipnexo.com",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Clipnexo",
    url: "https://clipnexo.com",
    logo: "https://clipnexo.com/logo.png", // Assuming there's a logo
    sameAs: [
      "https://facebook.com/clipnexo",
      "https://twitter.com/clipnexo",
      "https://instagram.com/clipnexo",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <section
        style={{
          padding: "48px 20px 72px",
          textAlign: "center",
          color: "#111",
        }}
      >
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto 32px auto",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.05,
                fontWeight: 800,
                color: "#111",
                margin: "0 0 14px 0",
              }}
            >
              {t.title}
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(17px, 2.1vw, 20px)",
                lineHeight: 1.5,
                color: "#444",
              }}
            >
              {t.subtitle}
            </p>
          </div>

          <div style={{ marginTop: "42px" }}>
            <DownloaderBox
              lang={currentLang}
              type="video"
              initialUrl={initialUrl}
              shared={shared}
              shareError={shareError}
              invalidPath={invalidPath}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 70px" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "18px",
            padding: "42px 36px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            color: "#111111",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 3.4vw, 40px)",
              lineHeight: 1.15,
              fontWeight: 800,
              margin: 0,
              color: "#111111",
            }}
          >
            {t.aboutTitle}
          </h2>

          <p
            style={{
              marginTop: "26px",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#222222",
            }}
          >
            {t.aboutText}
          </p>

          <h2
            style={{
              marginTop: "34px",
              fontSize: "clamp(23px, 3vw, 34px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#111111",
            }}
          >
            {t.howTitle}
          </h2>

          <ol
            style={{
              marginTop: "18px",
              paddingLeft: "28px",
              fontSize: "17px",
              lineHeight: 1.9,
              color: "#222222",
            }}
          >
            {t.howSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2
            style={{
              marginTop: "34px",
              fontSize: "clamp(23px, 3vw, 34px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#111111",
            }}
          >
            {t.advantagesTitle}
          </h2>

          <ul
            style={{
              marginTop: "18px",
              paddingLeft: "28px",
              fontSize: "17px",
              lineHeight: 1.9,
              color: "#222222",
            }}
          >
            {t.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2
            style={{
              marginTop: "34px",
              fontSize: "clamp(23px, 3vw, 34px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#111111",
            }}
          >
            {t.toolsTitle}
          </h2>

          <p
            style={{
              marginTop: "18px",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#222222",
            }}
          >
            {t.toolsIntro}
          </p>

          <div className="tool-link-grid">
            {toolLinks.map((link) => (
              <Link key={link.routeKey} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 90px", textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 36px)",
              fontWeight: 800,
              color: "#111111",
              margin: 0,
            }}
          >
            {t.faqTitle}
          </h2>

          <div style={{ marginTop: "26px", display: "grid", gap: "14px" }}>
            {t.faqs.map((faq) => (
              <details
                key={faq.q}
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  textAlign: "left",
                  padding: "16px 18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "#111111",
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "#333333",
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
