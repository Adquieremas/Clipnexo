import type { Metadata } from "next";
import { legalContent } from "@/lib/legal-content";
import { buildSeoMetadata } from "@/lib/seo";
import { getLocalizedRoute } from "@/lib/routes";

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
    metaTitle: "Acerca de Clipnexo y cómo funciona",
    metaDescription:
      "Conoce qué es Clipnexo, cómo funciona y por qué es una plataforma de herramientas gratuitas para creadores de contenido y editores de video.",
    title: "Acerca de Clipnexo",
    lead:
      "Clipnexo es una plataforma online de herramientas gratuitas para creadores de contenido: hashtags, captions, bios, guiones y títulos para TikTok, YouTube, Instagram y Facebook.",
    introTitle: "¿Qué es Clipnexo?",
    intro:
      "Clipnexo es una plataforma pensada para creadores de contenido y editores de video que necesitan generar hashtags, captions, bios, ideas, guiones y títulos sin registro ni instalación de software. Funciona desde el navegador y ofrece una experiencia simple para quienes buscan rapidez, compatibilidad y facilidad de uso.",
    missionTitle: "Nuestra misión",
    missionText:
      "Nuestra misión es ofrecer herramientas confiables, rápidas y accesibles para preparar contenido en redes sociales sin complicaciones, manteniendo la privacidad del usuario y una experiencia estable en múltiples dispositivos.",
    whyTitle: "¿Por qué usar Clipnexo?",
    whyItems: [
      "Genera hashtags, captions y bios para TikTok, Instagram y Facebook en segundos.",
      "Crea guiones y títulos para videos cortos de manera rápida y online.",
      "No requiere registro, instalación ni programas adicionales.",
      "Es compatible con Android, iPhone, tablet y PC.",
      "Está optimizado para ofrecer velocidad y facilidad de uso.",
    ],
    compatibilityTitle: "Compatible con celular, tablet y PC",
    compatibilityText:
      "Clipnexo se adapta a pantallas móviles y de escritorio, y funciona en navegadores modernos para que puedas usarlo en casa, en la oficina o mientras te desplazas.",
    qualityTitle: "Calidad y rendimiento",
    qualityText:
      "Clipnexo utiliza tecnología moderna para mantener una experiencia ágil y estable al generar hashtags, captions, guiones y títulos para tus redes sociales.",
    securityTitle: "Uso online sin instalar apps",
    securityText:
      "Clipnexo funciona directamente en tu navegador, sin necesidad de instalar aplicaciones pesadas, lo que simplifica el proceso y ayuda a proteger la privacidad del usuario.",
    toolsTitle: "Más herramientas de Clipnexo",
    toolsIntro:
      "Además de esta página informativa, puedes usar nuestras herramientas para TikTok, YouTube, Instagram, Facebook y estudiantes de forma rápida y sencilla.",
    faqTitle: "Preguntas frecuentes sobre Clipnexo",
    faqs: [
      {
        q: "¿Qué hace Clipnexo?",
        a: "Clipnexo permite generar hashtags, captions, bios, guiones y títulos para TikTok, YouTube, Instagram y Facebook desde el navegador.",
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
        a: "Sí. Todas las herramientas de Clipnexo son gratuitas y no requieren registro.",
      },
    ],
    closingTitle: "Clipnexo: una plataforma práctica para creadores",
    closingText:
      "Si buscas una forma simple de preparar contenido para tus redes sociales, Clipnexo es una opción pensada para ofrecer rapidez, compatibilidad y facilidad de uso en una sola experiencia.",
  },
  en: {
    metaTitle: "About Clipnexo and How It Works",
    metaDescription:
      "Learn what Clipnexo is, how it works, and why it is a platform of free tools for content creators and video editors.",
    title: "About Clipnexo",
    lead:
      "Clipnexo is an online platform of free tools for content creators: hashtags, captions, bios, scripts and titles for TikTok, YouTube, Instagram and Facebook.",
    introTitle: "What is Clipnexo?",
    intro:
      "Clipnexo is a platform built for content creators and video editors who want to generate hashtags, captions, bios, ideas, scripts and titles without registration or software installation. It works directly in the browser and offers a simple experience focused on speed, compatibility, and ease of use.",
    missionTitle: "Our mission",
    missionText:
      "Our mission is to provide reliable, fast, and accessible tools for preparing social media content without complications, while preserving user privacy and a stable experience across multiple devices.",
    whyTitle: "Why use Clipnexo?",
    whyItems: [
      "Generate hashtags, captions and bios for TikTok, Instagram and Facebook in seconds.",
      "Create scripts and titles for short videos quickly and online.",
      "No registration, installation, or extra software required.",
      "Compatible with Android, iPhone, tablet, and PC.",
      "Optimized for speed and ease of use.",
    ],
    compatibilityTitle: "Compatible with mobile, tablet, and PC",
    compatibilityText:
      "Clipnexo adapts to mobile and desktop screens and works in modern browsers so you can use it at home, at work, or on the go.",
    qualityTitle: "Quality and performance",
    qualityText:
      "Clipnexo uses modern technology to keep the experience fast and stable when generating hashtags, captions, scripts and titles for your social media.",
    securityTitle: "Online use without installing apps",
    securityText:
      "Clipnexo works directly in your browser without requiring heavy apps, which simplifies the process and helps protect user privacy.",
    toolsTitle: "More Clipnexo tools",
    toolsIntro:
      "Besides this information page, you can use our tools for TikTok, YouTube, Instagram, Facebook and students quickly and easily.",
    faqTitle: "Frequently asked questions about Clipnexo",
    faqs: [
      {
        q: "What does Clipnexo do?",
        a: "Clipnexo lets you generate hashtags, captions, bios, scripts and titles for TikTok, YouTube, Instagram and Facebook directly from the browser.",
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
        a: "Yes. All Clipnexo tools are free and require no sign-up.",
      },
    ],
    closingTitle: "Clipnexo: a practical platform for creators",
    closingText:
      "If you need a simple way to prepare content for your social media, Clipnexo is designed to offer speed, compatibility, and ease of use in one experience.",
  },
  pt: {
    metaTitle: "Sobre o Clipnexo e como funciona",
    metaDescription:
      "Saiba o que é o Clipnexo, como funciona e por que é uma plataforma de ferramentas gratuitas para criadores de conteúdo e editores de vídeo.",
    title: "Sobre o Clipnexo",
    lead:
      "Clipnexo é uma plataforma online de ferramentas gratuitas para criadores de conteúdo: hashtags, legendas, bios, roteiros e títulos para TikTok, YouTube, Instagram e Facebook.",
    introTitle: "O que é o Clipnexo?",
    intro:
      "Clipnexo é uma plataforma criada para criadores de conteúdo e editores de vídeo que desejam gerar hashtags, legendas, bios, ideias, roteiros e títulos sem registro nem instalação de software. Funciona diretamente no navegador e oferece uma experiência simples com foco em velocidade, compatibilidade e facilidade de uso.",
    missionTitle: "Nossa missão",
    missionText:
      "Nossa missão é oferecer ferramentas confiáveis, rápidas e acessíveis para preparar conteúdo nas redes sociais sem complicações, mantendo a privacidade do usuário e uma experiência estável em vários dispositivos.",
    whyTitle: "Por que usar o Clipnexo?",
    whyItems: [
      "Gere hashtags, legendas e bios para TikTok, Instagram e Facebook em segundos.",
      "Crie roteiros e títulos para vídeos curtos de forma rápida e online.",
      "Não exige registro, instalação ou programas extras.",
      "Compatível com Android, iPhone, tablet e PC.",
      "Otimizado para velocidade e facilidade de uso.",
    ],
    compatibilityTitle: "Compatível com celular, tablet e PC",
    compatibilityText:
      "O Clipnexo se adapta a telas móveis e desktop e funciona em navegadores modernos para que você possa usá-lo em casa, no trabalho ou em movimento.",
    qualityTitle: "Qualidade e desempenho",
    qualityText:
      "O Clipnexo usa tecnologia moderna para manter a experiência rápida e estável ao gerar hashtags, legendas, roteiros e títulos para suas redes sociais.",
    securityTitle: "Uso online sem instalar aplicativos",
    securityText:
      "O Clipnexo funciona diretamente no navegador, sem necessidade de instalar aplicativos pesados, o que simplifica o processo e ajuda a proteger a privacidade do usuário.",
    toolsTitle: "Mais ferramentas do Clipnexo",
    toolsIntro:
      "Além desta página informativa, você pode usar nossas ferramentas para TikTok, YouTube, Instagram, Facebook e estudantes de forma rápida e simples.",
    faqTitle: "Perguntas frequentes sobre o Clipnexo",
    faqs: [
      {
        q: "O que o Clipnexo faz?",
        a: "O Clipnexo permite gerar hashtags, legendas, bios, roteiros e títulos para TikTok, YouTube, Instagram e Facebook diretamente no navegador.",
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
        a: "Sim. Todas as ferramentas do Clipnexo são gratuitas e não exigem cadastro.",
      },
    ],
    closingTitle: "Clipnexo: uma plataforma prática para criadores",
    closingText:
      "Se você procura uma maneira simples de preparar conteúdo para suas redes sociais, o Clipnexo foi pensado para oferecer velocidade, compatibilidade e facilidade de uso em uma única experiência.",
  },
};

function normalizeLang(lang: string): Lang {
  return ["es", "en", "pt"].includes(lang) ? (lang as Lang) : "es";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = (legalContent as LegalContentWithAbout).about?.[currentLang] ?? fallbackAbout[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    routeKey: "about",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = (legalContent as LegalContentWithAbout).about?.[currentLang] ?? fallbackAbout[currentLang];

  const toolLinks: Record<Lang, { labelTiktok: string; labelTools: string; hrefTiktok: string; hrefTools: string }> = {
    es: {
      labelTiktok: "Herramientas para TikTok",
      labelTools: "Todas las herramientas",
      hrefTiktok: getLocalizedRoute("tiktokTools", "es"),
      hrefTools: getLocalizedRoute("tools", "es"),
    },
    en: {
      labelTiktok: "TikTok tools",
      labelTools: "All tools",
      hrefTiktok: getLocalizedRoute("tiktokTools", "en"),
      hrefTools: getLocalizedRoute("tools", "en"),
    },
    pt: {
      labelTiktok: "Ferramentas de TikTok",
      labelTools: "Todas as ferramentas",
      hrefTiktok: getLocalizedRoute("tiktokTools", "pt"),
      hrefTools: getLocalizedRoute("tools", "pt"),
    },
  };

  const links = toolLinks[currentLang];

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "32px auto 60px",
        padding: "20px",
        lineHeight: "1.7",
        color: "#111",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "42px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            color: "#111",
            lineHeight: "1.1",
            margin: "0 0 14px",
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: "#555",
            margin: "0 auto",
            fontSize: "17px",
            maxWidth: "780px",
            lineHeight: "1.7",
          }}
        >
          {t.lead}
        </p>
      </section>

      <section style={{ maxWidth: "780px", margin: "0 auto" }}>
        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.introTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.intro}
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.missionTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.missionText}
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.whyTitle}
          </h2>
          <ul style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
            {t.whyItems.map((item) => (
              <li key={item} style={{ marginBottom: "8px", fontSize: "16px", lineHeight: 1.7 }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.compatibilityTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.compatibilityText}
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.qualityTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.qualityText}
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.securityTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.securityText}
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {t.faqTitle}
          </h2>
          {t.faqs.map((item, i) => (
            <div key={`${item.q}-${i}`} style={{ marginBottom: "16px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  lineHeight: 1.35,
                  fontWeight: 700,
                  margin: "0 0 6px",
                  color: "#111",
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555", margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.toolsTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#444", margin: "0 0 14px" }}>
            {t.toolsIntro}
          </p>
          <ul style={{ paddingLeft: "24px", margin: 0 }}>
            <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: 1.7 }}>
              <a href={links.hrefTiktok}>{links.labelTiktok}</a>
            </li>
            <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: 1.7 }}>
              <a href={links.hrefTools}>{links.labelTools}</a>
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "8px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.closingTitle}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.closingText}
          </p>
        </section>
      </section>
    </main>
  );
}
