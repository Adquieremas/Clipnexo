import type { Metadata } from "next";
import Link from "next/link";
import DownloaderBox from "@/components/DownloaderBox";
import { getMoreToolsLinks } from "@/lib/tools-content";
import { normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

const pageContent = {
  es: {
    metaTitle: "Descargar TikTok sin marca de agua gratis | Clipnexo",
    metaDescription:
      "Descarga videos de TikTok sin marca de agua gratis y en español con Clipnexo. Rápido, online, seguro y compatible con celular o PC.",
    h1: "Descargar TikTok sin marca de agua gratis",
    lead:
      "Clipnexo te permite descargar videos de TikTok sin marca de agua gratis, online y en español. Solo pega el enlace del video para guardar el archivo en tu celular o PC sin instalar programas adicionales.",
    introTitle: "¿Qué es Clipnexo y para qué sirve?",
    introText:
      "Clipnexo es una herramienta web diseñada para personas que buscan descargar TikTok gratis, guardar videos sin marca de agua y acceder a una experiencia rápida desde navegador. Funciona bien para usuarios de Lima, Perú y Latinoamérica que quieren una opción práctica, clara y segura.",
    benefitsTitle: "Ventajas de descargar videos sin marca de agua con Clipnexo",
    benefits: [
      "Permite descargar videos de TikTok sin marca de agua en pocos pasos.",
      "No exige instalación de APK ni programas pesados.",
      "Funciona en Android, iPhone, tablet y computadora.",
      "Es una opción rápida para usuarios que buscan descargar TikTok gratis en español.",
      "Ayuda a guardar contenido público para revisión, inspiración o uso personal permitido.",
    ],
    howTitle: "Cómo descargar contenido de TikTok sin marca de agua",
    howSteps: [
      "Copia el enlace del video desde la app o web de TikTok.",
      "Pega el enlace en el cuadro de descarga de Clipnexo.",
      "Procesa el contenido y elige la opción de descarga disponible.",
      "Guarda el video en tu dispositivo sin marca de agua.",
    ],
    whyTitle: "Por qué Clipnexo puede ser una alternativa más práctica",
    whyText:
      "Muchas búsquedas como descargar TikTok save, tiktok download apk, descargar TikTok lite o descargar sin marca de agua CapCut reflejan que los usuarios quieren soluciones rápidas y sencillas. Clipnexo se enfoca en eso: una herramienta clara, sin pasos complejos y pensada para descargar videos públicos de TikTok desde un navegador moderno.",
    safetyTitle: "Descargar TikTok gratis sin instalar APKs dudosos",
    safetyText:
      "Si buscas una opción más segura que instalar aplicaciones desconocidas, Clipnexo reduce la fricción porque funciona directamente online. No sustituye las políticas de la plataforma, pero sí ofrece una forma más simple de procesar enlaces públicos sin depender de archivos APK de terceros.",
    geoTitle: "Pensado para usuarios en Perú y Latinoamérica",
    geoText:
      "El contenido y la experiencia de esta página están adaptados para usuarios hispanohablantes, especialmente en Perú, Lima y otros países de Latinoamérica. Por eso usamos lenguaje claro, términos frecuentes de búsqueda y una estructura útil para SEO y motores de respuesta.",
    toolsTitle: "Más herramientas relacionadas de Clipnexo",
    toolsIntro:
      "Además de descargar videos de TikTok sin marca de agua, también puedes usar otras herramientas para guardar videos completos, convertir audio y aprender a usar la plataforma mejor.",
    faqTitle: "Preguntas frecuentes sobre descargar TikTok gratis",
    faqs: [
      {
        q: "¿Cómo descargar un video de TikTok sin marcas del video?",
        a: "Copia el enlace del video público, pégalo en Clipnexo y usa la opción de descarga disponible. Así puedes guardar el contenido sin marca de agua en pocos pasos.",
      },
      {
        q: "¿Cómo puedo eliminar la marca de agua de TikTok gratis?",
        a: "La forma más práctica es usar una herramienta online como Clipnexo, que procesa enlaces públicos para descargar videos sin marca de agua sin necesidad de instalar software adicional.",
      },
      {
        q: "¿Cómo puedo descargar contenido de TikTok?",
        a: "Debes copiar el enlace del video, pegarlo en la herramienta de descarga y luego guardar el archivo en tu dispositivo. El proceso funciona mejor cuando el contenido es público.",
      },
      {
        q: "¿Cuál es la aplicación más segura para descargar vídeos de TikTok?",
        a: "Si prefieres evitar APKs o apps poco conocidas, una herramienta web como Clipnexo puede ser una alternativa más práctica porque funciona desde el navegador y no requiere instalación.",
      },
      {
        q: "¿Clipnexo sirve para descargar TikTok gratis en español?",
        a: "Sí. Clipnexo está pensado para usuarios que buscan descargar TikTok gratis en español, con una interfaz sencilla y contenido adaptado a hispanohablantes.",
      },
      {
        q: "¿También puedo descargar solo el audio?",
        a: "Sí. Si solo necesitas el sonido del video, puedes usar la herramienta de TikTok a MP3 disponible dentro de Clipnexo.",
      },
    ],
    closingTitle: "Una opción rápida para descargar videos de TikTok sin marca de agua",
    closingText:
      "Si buscas descargar TikTok gratis, en español y sin depender de instalaciones complicadas, Clipnexo te ofrece una opción online, clara y compatible con varios dispositivos. Pega el enlace y procesa el video en segundos.",
    ctaVideo: "Descargar videos de TikTok",
    ctaMp3: "Descargar TikTok MP3",
    ctaGuide: "Guía paso a paso",
    ctaAbout: "Acerca de Clipnexo",
  },
  en: {
    metaTitle: "Download TikTok without watermark for free | Clipnexo",
    metaDescription:
      "Download TikTok videos without watermark for free with Clipnexo. Fast, online, safe, and compatible with mobile and desktop.",
    h1: "Download TikTok without watermark for free",
    lead:
      "Clipnexo lets you download TikTok videos without watermark for free, online, and without installing extra software. Paste the video link and save the file to your phone or PC in seconds.",
    introTitle: "What is Clipnexo and what is it for?",
    introText:
      "Clipnexo is a web-based tool for users who want to download TikTok for free, save videos without watermark, and use a fast browser-based workflow. It is designed for practical use across mobile and desktop devices.",
    benefitsTitle: "Benefits of downloading TikTok videos without watermark",
    benefits: [
      "Download public TikTok videos without watermark in a few steps.",
      "No need to install APK files or heavy software.",
      "Works on Android, iPhone, tablet, and desktop.",
      "Useful for users searching for free TikTok download options.",
      "A practical way to save public content for allowed personal use.",
    ],
    howTitle: "How to download TikTok content without watermark",
    howSteps: [
      "Copy the video link from the TikTok app or website.",
      "Paste the link into the Clipnexo download box.",
      "Process the content and choose the available download option.",
      "Save the video to your device without watermark.",
    ],
    whyTitle: "Why Clipnexo can be a more practical option",
    whyText:
      "Searches such as TikTok save download, TikTok download APK, or TikTok lite download show that people want fast and simple solutions. Clipnexo focuses on that: a cleaner browser-based experience for processing public TikTok links.",
    safetyTitle: "Download TikTok for free without installing risky APKs",
    safetyText:
      "If you prefer to avoid unknown APKs or third-party apps, Clipnexo reduces friction by working directly in your browser. It does not replace platform rules, but it does offer a simpler workflow for public links.",
    geoTitle: "Useful for users in the US and other countries",
    geoText:
      "This page is optimized for English-speaking users and international search intent. The structure is designed to be useful for SEO, answer engines, and users who want a direct explanation of how the tool works.",
    toolsTitle: "More related Clipnexo tools",
    toolsIntro:
      "Besides downloading TikTok videos without watermark, you can also use related tools to save full videos, convert audio, and learn how to use Clipnexo step by step.",
    faqTitle: "Frequently asked questions about free TikTok download",
    faqs: [
      {
        q: "How do I download a TikTok video without the watermark?",
        a: "Copy the public video link, paste it into Clipnexo, and use the available download option. This allows you to save the video without watermark in a few steps.",
      },
      {
        q: "How can I remove the TikTok watermark for free?",
        a: "A practical way is to use an online tool like Clipnexo, which processes public TikTok links and gives you a cleaner download workflow.",
      },
      {
        q: "How can I download TikTok content?",
        a: "Copy the video link, paste it into the downloader, and save the file to your device. The process works best when the content is public.",
      },
      {
        q: "What is a safer option to download TikTok videos?",
        a: "If you want to avoid unknown APKs, a browser-based tool like Clipnexo can be a more practical option because it does not require installation.",
      },
      {
        q: "Does Clipnexo work for free TikTok downloads?",
        a: "Yes. Clipnexo is designed for users who want a free and simple way to process public TikTok links online.",
      },
      {
        q: "Can I download only the audio too?",
        a: "Yes. You can also use the TikTok to MP3 tool inside Clipnexo if you only need the audio.",
      },
    ],
    closingTitle: "A fast option to download TikTok videos without watermark",
    closingText:
      "If you want a straightforward way to download TikTok for free without complex installations, Clipnexo offers a practical browser-based option for mobile and desktop users.",
    ctaVideo: "Download TikTok videos",
    ctaMp3: "Download TikTok MP3",
    ctaGuide: "Step-by-step guide",
    ctaAbout: "About Clipnexo",
  },
  pt: {
    metaTitle: "Baixar TikTok sem marca d’água grátis | Clipnexo",
    metaDescription:
      "Baixe vídeos do TikTok sem marca d’água grátis com Clipnexo. Rápido, online, seguro e compatível com celular e computador.",
    h1: "Baixar TikTok sem marca d’água grátis",
    lead:
      "Clipnexo permite baixar vídeos do TikTok sem marca d’água grátis, online e sem instalar programas adicionais. Basta colar o link do vídeo para salvar o arquivo no celular ou PC em segundos.",
    introTitle: "O que é o Clipnexo e para que serve?",
    introText:
      "Clipnexo é uma ferramenta web para quem quer baixar TikTok grátis, salvar vídeos sem marca d’água e usar um fluxo rápido direto do navegador. Foi criada para uso prático em dispositivos móveis e desktop.",
    benefitsTitle: "Vantagens de baixar vídeos sem marca d’água com Clipnexo",
    benefits: [
      "Baixa vídeos públicos do TikTok sem marca d’água em poucos passos.",
      "Não exige instalação de APKs nem programas pesados.",
      "Funciona em Android, iPhone, tablet e computador.",
      "É útil para quem busca baixar TikTok grátis de forma prática.",
      "Ajuda a salvar conteúdo público para uso pessoal permitido.",
    ],
    howTitle: "Como baixar conteúdo do TikTok sem marca d’água",
    howSteps: [
      "Copie o link do vídeo no aplicativo ou site do TikTok.",
      "Cole o link na caixa de download do Clipnexo.",
      "Processe o conteúdo e escolha a opção de download disponível.",
      "Salve o vídeo no seu dispositivo sem marca d’água.",
    ],
    whyTitle: "Por que o Clipnexo pode ser uma opção mais prática",
    whyText:
      "Buscas como TikTok save download, TikTok download APK, baixar TikTok lite ou baixar sem marca d’água no CapCut mostram que as pessoas querem soluções rápidas e simples. O Clipnexo foi pensado para isso: uma experiência mais clara no navegador para processar links públicos do TikTok.",
    safetyTitle: "Baixar TikTok grátis sem instalar APKs duvidosos",
    safetyText:
      "Se você prefere evitar APKs desconhecidos ou aplicativos de terceiros, o Clipnexo reduz essa necessidade porque funciona direto no navegador. Não substitui as regras da plataforma, mas oferece um fluxo mais simples para links públicos.",
    geoTitle: "Útil para usuários em Portugal e outros países",
    geoText:
      "Esta página está otimizada para usuários em português e intenção de busca internacional. A estrutura foi organizada para SEO, motores de resposta e pessoas que querem entender rapidamente como a ferramenta funciona.",
    toolsTitle: "Mais ferramentas relacionadas do Clipnexo",
    toolsIntro:
      "Além de baixar vídeos do TikTok sem marca d’água, você também pode usar outras ferramentas para salvar vídeos completos, converter áudio e aprender a usar o Clipnexo passo a passo.",
    faqTitle: "Perguntas frequentes sobre baixar TikTok grátis",
    faqs: [
      {
        q: "Como baixar um vídeo do TikTok sem marcas no vídeo?",
        a: "Copie o link do vídeo público, cole no Clipnexo e use a opção de download disponível. Assim você pode salvar o vídeo sem marca d’água em poucos passos.",
      },
      {
        q: "Como posso remover a marca d’água do TikTok grátis?",
        a: "Uma maneira prática é usar uma ferramenta online como o Clipnexo, que processa links públicos do TikTok e oferece um fluxo de download mais simples.",
      },
      {
        q: "Como posso baixar conteúdo do TikTok?",
        a: "Copie o link do vídeo, cole no downloader e salve o arquivo no dispositivo. O processo funciona melhor quando o conteúdo é público.",
      },
      {
        q: "Qual é uma opção mais segura para baixar vídeos do TikTok?",
        a: "Se você quer evitar APKs desconhecidos, uma ferramenta web como o Clipnexo pode ser uma alternativa mais prática porque não exige instalação.",
      },
      {
        q: "O Clipnexo serve para baixar TikTok grátis?",
        a: "Sim. O Clipnexo foi pensado para quem quer um modo simples e gratuito de processar links públicos do TikTok online.",
      },
      {
        q: "Também posso baixar só o áudio?",
        a: "Sim. Você também pode usar a ferramenta TikTok para MP3 dentro do Clipnexo se quiser apenas o áudio.",
      },
    ],
    closingTitle: "Uma opção rápida para baixar vídeos do TikTok sem marca d’água",
    closingText:
      "Se você quer uma forma simples de baixar TikTok grátis sem instalações complicadas, o Clipnexo oferece uma opção prática no navegador para usuários mobile e desktop.",
    ctaVideo: "Baixar vídeos do TikTok",
    ctaMp3: "Baixar TikTok MP3",
    ctaGuide: "Guia passo a passo",
    ctaAbout: "Sobre o Clipnexo",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    routeKey: "withoutWatermark",
    lang: currentLang,
    openGraph: {
      type: "article",
      locale: currentLang === "es" ? "es_PE" : currentLang === "en" ? "en_US" : "pt_PT",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
    },
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];
  const relatedLinks = getMoreToolsLinks(currentLang, "withoutWatermark");

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

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", color: "#111" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", lineHeight: 1.08, fontWeight: 800, margin: "0 0 16px" }}>
          {t.h1}
        </h1>
        <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#444", margin: 0 }}>{t.lead}</p>
      </header>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.introTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>{t.introText}</p>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <DownloaderBox lang={currentLang} type="video" />
        </div>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.howTitle}
        </h2>
        <ol style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
          {t.howSteps.map((step, i) => (
            <li key={i} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.benefitsTitle}
        </h2>
        <ul style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
          {t.benefits.map((benefit, i) => (
            <li key={i} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.whyTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>{t.whyText}</p>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.safetyTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>{t.safetyText}</p>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.geoTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>{t.geoText}</p>
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.faqTitle}
        </h2>
        {t.faqs.map((item, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", lineHeight: 1.3, fontWeight: 700, margin: "0 0 8px", color: "#111" }}>
              {item.q}
            </h3>
            <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#444", margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "34px" }}>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.toolsTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: "0 0 14px" }}>{t.toolsIntro}</p>
        <ul style={{ paddingLeft: "24px", margin: 0 }}>
          {relatedLinks.map((link) => (
            <li key={link.routeKey} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "clamp(23px, 3vw, 34px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
          {t.closingTitle}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>{t.closingText}</p>
      </section>
    </main>
  );
}
