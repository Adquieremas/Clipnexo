import type { Metadata } from "next";
import { legalContent } from "@/lib/legal-content";
import { SITE_URL } from "@/lib/site";

type Lang = "es" | "en" | "pt";

type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  introTitle: string;
  intro: string;
  missionTitle: string;
  missionText: string;
  whyTitle: string;
  whyItems: string[];
  compatibilityTitle: string;
  compatibilityText: string;
  qualityTitle: string;
  qualityText: string;
  securityTitle: string;
  securityText: string;
  toolsTitle: string;
  toolsIntro: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  closingTitle: string;
  closingText: string;
};

type LegalContentWithAbout = typeof legalContent & {
  about?: Partial<Record<Lang, AboutContent>>;
};

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const fallbackAbout: Record<Lang, AboutContent> = {
  es: {
    metaTitle: "Acerca de Clipnexo | Descargador de TikTok y MP3",
    metaDescription:
      "Conoce qué es Clipnexo, cómo funciona y por qué es una herramienta rápida para descargar videos de TikTok y convertir audio a MP3.",
    title: "Acerca de Clipnexo",
    lead:
      "Clipnexo es una herramienta online que te permite descargar videos y audios de TikTok sin marca de agua de forma rápida, segura y gratuita desde celular o PC.",
    introTitle: "¿Qué es Clipnexo?",
    intro:
      "Clipnexo es un descargador de TikTok pensado para usuarios que desean guardar videos en MP4 o extraer audio en MP3 sin necesidad de registro ni instalación de software. Funciona desde el navegador y ofrece una experiencia simple para quienes buscan rapidez, compatibilidad y facilidad de uso.",
    missionTitle: "Nuestra misión",
    missionText:
      "Nuestra misión es ofrecer una herramienta confiable, rápida y accesible para descargar contenido de TikTok sin complicaciones, manteniendo la privacidad del usuario y una experiencia estable en múltiples dispositivos.",
    whyTitle: "¿Por qué usar Clipnexo?",
    whyItems: [
      "Descarga videos de TikTok sin marca de agua en pocos pasos.",
      "Convierte contenido de TikTok a MP3 de manera rápida y online.",
      "No requiere registro, instalación ni programas adicionales.",
      "Es compatible con Android, iPhone, tablet y PC.",
      "Está optimizado para ofrecer velocidad y facilidad de uso.",
    ],
    compatibilityTitle: "Compatible con celular, tablet y PC",
    compatibilityText:
      "Clipnexo se adapta a pantallas móviles y de escritorio, y funciona en navegadores modernos para que puedas usarlo en casa, en la oficina o mientras te desplazas.",
    qualityTitle: "Calidad y rendimiento",
    qualityText:
      "Clipnexo utiliza tecnología moderna de procesamiento para mantener una experiencia ágil y estable al descargar videos y convertir audio desde TikTok.",
    securityTitle: "Uso online sin instalar apps",
    securityText:
      "Clipnexo funciona directamente en tu navegador, sin necesidad de instalar aplicaciones pesadas, lo que simplifica el proceso y ayuda a proteger la privacidad del usuario.",
    toolsTitle: "Más herramientas de Clipnexo",
    toolsIntro:
      "Además de la página informativa, puedes usar nuestras herramientas para descargar video o convertir contenido de TikTok a MP3 de forma rápida y sencilla.",
    faqTitle: "Preguntas frecuentes sobre Clipnexo",
    faqs: [
      {
        q: "¿Qué hace Clipnexo?",
        a: "Clipnexo permite descargar videos de TikTok sin marca de agua y convertir contenido a MP3 desde el navegador.",
      },
      {
        q: "¿Necesito instalar una app para usar Clipnexo?",
        a: "No. Todo el proceso funciona online, directamente desde tu navegador, sin instalación ni registro.",
      },
      {
        q: "¿Clipnexo funciona en celular y computadora?",
        a: "Sí. Es compatible con teléfonos móviles, tablets, laptops y computadoras de escritorio.",
      },
      {
        q: "¿Clipnexo es gratis?",
        a: "Sí. La herramienta puede usarse gratis para descargar videos de TikTok y convertir contenido a MP3.",
      },
    ],
    closingTitle: "Clipnexo: una solución práctica para TikTok",
    closingText:
      "Si buscas una forma simple de descargar videos de TikTok o convertirlos a MP3, Clipnexo es una opción pensada para ofrecer rapidez, compatibilidad y facilidad de uso en una sola experiencia.",
  },
  en: {
    metaTitle: "About Clipnexo | TikTok Downloader and MP3 Tool",
    metaDescription:
      "Learn what Clipnexo is, how it works, and why it is a fast tool for downloading TikTok videos and converting audio to MP3.",
    title: "About Clipnexo",
    lead:
      "Clipnexo is an online tool that helps you download TikTok videos and audio without watermark quickly, safely, and for free from mobile or PC.",
    introTitle: "What is Clipnexo?",
    intro:
      "Clipnexo is a TikTok downloader built for users who want to save videos in MP4 or extract audio in MP3 without registration or software installation. It works directly in the browser and offers a simple experience focused on speed, compatibility, and ease of use.",
    missionTitle: "Our mission",
    missionText:
      "Our mission is to provide a reliable, fast, and accessible tool for downloading TikTok content without complications, while preserving user privacy and a stable experience across multiple devices.",
    whyTitle: "Why use Clipnexo?",
    whyItems: [
      "Download TikTok videos without watermark in just a few steps.",
      "Convert TikTok content to MP3 quickly and online.",
      "No registration, installation, or extra software required.",
      "Compatible with Android, iPhone, tablet, and PC.",
      "Optimized for speed and ease of use.",
    ],
    compatibilityTitle: "Compatible with mobile, tablet, and PC",
    compatibilityText:
      "Clipnexo adapts to mobile and desktop screens and works in modern browsers so you can use it at home, at work, or on the go.",
    qualityTitle: "Quality and performance",
    qualityText:
      "Clipnexo uses modern processing technology to keep the experience fast and stable when downloading videos and converting audio from TikTok.",
    securityTitle: "Online use without installing apps",
    securityText:
      "Clipnexo works directly in your browser without requiring heavy apps, which simplifies the process and helps protect user privacy.",
    toolsTitle: "More Clipnexo tools",
    toolsIntro:
      "Besides this information page, you can use our tools to download video or convert TikTok content to MP3 quickly and easily.",
    faqTitle: "Frequently asked questions about Clipnexo",
    faqs: [
      {
        q: "What does Clipnexo do?",
        a: "Clipnexo lets you download TikTok videos without watermark and convert content to MP3 directly from the browser.",
      },
      {
        q: "Do I need to install an app to use Clipnexo?",
        a: "No. The whole process works online in your browser, with no installation or registration required.",
      },
      {
        q: "Does Clipnexo work on phone and computer?",
        a: "Yes. It is compatible with mobile phones, tablets, laptops, and desktop computers.",
      },
      {
        q: "Is Clipnexo free?",
        a: "Yes. You can use the tool for free to download TikTok videos and convert content to MP3.",
      },
    ],
    closingTitle: "Clipnexo: a practical solution for TikTok",
    closingText:
      "If you need a simple way to download TikTok videos or convert them to MP3, Clipnexo is designed to offer speed, compatibility, and ease of use in one experience.",
  },
  pt: {
    metaTitle: "Sobre o Clipnexo | Downloader de TikTok e MP3",
    metaDescription:
      "Saiba o que é o Clipnexo, como funciona e por que é uma ferramenta rápida para baixar vídeos do TikTok e converter áudio para MP3.",
    title: "Sobre o Clipnexo",
    lead:
      "Clipnexo é uma ferramenta online que permite baixar vídeos e áudio do TikTok sem marca d’água de forma rápida, segura e gratuita no celular ou PC.",
    introTitle: "O que é o Clipnexo?",
    intro:
      "Clipnexo é um downloader de TikTok criado para usuários que desejam salvar vídeos em MP4 ou extrair áudio em MP3 sem registro nem instalação de software. Funciona diretamente no navegador e oferece uma experiência simples com foco em velocidade, compatibilidade e facilidade de uso.",
    missionTitle: "Nossa missão",
    missionText:
      "Nossa missão é oferecer uma ferramenta confiável, rápida e acessível para baixar conteúdo do TikTok sem complicações, mantendo a privacidade do usuário e uma experiência estável em vários dispositivos.",
    whyTitle: "Por que usar o Clipnexo?",
    whyItems: [
      "Baixe vídeos do TikTok sem marca d’água em poucos passos.",
      "Converta conteúdo do TikTok para MP3 de forma rápida e online.",
      "Não exige registro, instalação ou programas extras.",
      "Compatível com Android, iPhone, tablet e PC.",
      "Otimizado para velocidade e facilidade de uso.",
    ],
    compatibilityTitle: "Compatível com celular, tablet e PC",
    compatibilityText:
      "O Clipnexo se adapta a telas móveis e desktop e funciona em navegadores modernos para que você possa usá-lo em casa, no trabalho ou em movimento.",
    qualityTitle: "Qualidade e desempenho",
    qualityText:
      "O Clipnexo usa tecnologia moderna de processamento para manter a experiência rápida e estável ao baixar vídeos e converter áudio do TikTok.",
    securityTitle: "Uso online sem instalar aplicativos",
    securityText:
      "O Clipnexo funciona diretamente no navegador, sem necessidade de instalar aplicativos pesados, o que simplifica o processo e ajuda a proteger a privacidade do usuário.",
    toolsTitle: "Mais ferramentas do Clipnexo",
    toolsIntro:
      "Além desta página informativa, você pode usar nossas ferramentas para baixar vídeo ou converter conteúdo do TikTok para MP3 de forma rápida e simples.",
    faqTitle: "Perguntas frequentes sobre o Clipnexo",
    faqs: [
      {
        q: "O que o Clipnexo faz?",
        a: "O Clipnexo permite baixar vídeos do TikTok sem marca d’água e converter conteúdo para MP3 diretamente no navegador.",
      },
      {
        q: "Preciso instalar um aplicativo para usar o Clipnexo?",
        a: "Não. Todo o processo funciona online no navegador, sem instalação nem registro.",
      },
      {
        q: "O Clipnexo funciona no celular e no computador?",
        a: "Sim. É compatível com celulares, tablets, notebooks e computadores de mesa.",
      },
      {
        q: "O Clipnexo é grátis?",
        a: "Sim. Você pode usar a ferramenta gratuitamente para baixar vídeos do TikTok e converter conteúdo para MP3.",
      },
    ],
    closingTitle: "Clipnexo: uma solução prática para TikTok",
    closingText:
      "Se você procura uma maneira simples de baixar vídeos do TikTok ou convertê-los para MP3, o Clipnexo foi pensado para oferecer velocidade, compatibilidade e facilidade de uso em uma única experiência.",
  },
};

function normalizeLang(lang: string): Lang {
  return ["es", "en", "pt"].includes(lang) ? (lang as Lang) : "es";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = (legalContent as LegalContentWithAbout).about?.[currentLang] ?? fallbackAbout[currentLang];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${currentLang}/acerca-de`,
      languages: {
        es: `${SITE_URL}/es/acerca-de`,
        en: `${SITE_URL}/en/acerca-de`,
        pt: `${SITE_URL}/pt/acerca-de`,
        "x-default": `${SITE_URL}/es/acerca-de`,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = (legalContent as LegalContentWithAbout).about?.[currentLang] ?? fallbackAbout[currentLang];

  const toolLinks: Record<Lang, { labelVideo: string; labelMp3: string }> = {
    es: {
      labelVideo: "Descargar videos de TikTok",
      labelMp3: "Convertir TikTok a MP3",
    },
    en: {
      labelVideo: "Download TikTok videos",
      labelMp3: "Convert TikTok to MP3",
    },
    pt: {
      labelVideo: "Baixar vídeos do TikTok",
      labelMp3: "Converter TikTok para MP3",
    },
  };

  const links = toolLinks[currentLang];

  return (
    <main
      style={{
        maxWidth: "980px",
        margin: "40px auto",
        padding: "24px",
        lineHeight: "1.75",
        color: "#111",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "52px" }}>
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 800,
            color: "#111",
            lineHeight: "1.05",
            margin: "0 0 16px",
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: "#444",
            margin: "0 auto",
            fontSize: "20px",
            maxWidth: "860px",
            lineHeight: "1.85",
          }}
        >
          {t.lead}
        </p>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 46px)",
              lineHeight: 1.12,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {t.introTitle}
          </h2>
          <p style={{ fontSize: "19px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.intro}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.missionTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.missionText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.whyTitle}
          </h2>
          <ul style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
            {t.whyItems.map((item) => (
              <li key={item} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.compatibilityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.compatibilityText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.qualityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.qualityText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.securityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.securityText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {t.faqTitle}
          </h2>
          {t.faqs.map((item, i) => (
            <div key={`${item.q}-${i}`} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "#111",
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#444", margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.toolsTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#444", margin: "0 0 16px" }}>
            {t.toolsIntro}
          </p>
          <ul style={{ paddingLeft: "24px", margin: 0 }}>
            <li style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
              <a href={`/${currentLang}/descargar-tiktok`}>{links.labelVideo}</a>
            </li>
            <li style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
              <a href={`/${currentLang}/descargar-tiktok-mp3`}>{links.labelMp3}</a>
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.closingTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.closingText}
          </p>
        </section>
      </section>
    </main>
  );
}