import type { Metadata } from "next";
import Link from "next/link";
import DownloaderBox from "@/components/DownloaderBox";
import { getDictionary } from "@/lib/dictionary";
import { getMoreToolsLinks } from "@/lib/tools-content";
import { normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ lang: string }>;
};

type DownloadDictionarySection = {
  title: string;
  intro: string;
  stepsTitle: string;
  steps: readonly string[];
  benefitsTitle: string;
  benefits: readonly string[];
  faqTitle: string;
  faq: ReadonlyArray<{
    q: string;
    a: string;
  }>;
  introTitle?: string;
  extraTitle?: string;
  extraContent?: string;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  const titles = {
    es: "Descargar audio TikTok MP3 gratis",
    en: "Download TikTok audio MP3 free",
    pt: "Baixar áudio do TikTok em MP3 grátis",
  };

  const descriptions = {
    es: "Convierte videos de TikTok a MP3 y descarga audios gratis con Clipnexo. Nuestra herramienta online es rápida, segura y compatible con celular y PC hoy mismo.",
    en: "Convert TikTok videos to MP3 and download audio for free with Clipnexo. Our online tool is fast, safe, and compatible with mobile and PC for all users in 2026.",
    pt: "Converta vídeos do TikTok em MP3 e baixe áudio grátis no Clipnexo. Nossa ferramenta online é rápida, segura e compatível com celular e PC para todos agora.",
  };

  return buildSeoMetadata({
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    routeKey: "mp3",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const relatedLinks = getMoreToolsLinks(currentLang, "mp3");

  const dict = getDictionary(currentLang);
  const t: DownloadDictionarySection = dict.descargarTikTokMp3;

  const seoCopy = {
    es: {
      lead:
        "Clipnexo te permite convertir videos de TikTok a MP3 gratis, online y en segundos. Solo pega el enlace del video y descarga el audio listo para guardarlo en tu celular o PC.",
      sectionIntroTitle: "¿Qué es Clipnexo y para qué sirve?",
      sectionIntroText:
        "Clipnexo es una herramienta online creada para convertir videos de TikTok a MP3 de forma rápida, simple y sin instalar programas. Está pensada para usuarios que buscan extraer audio de TikTok con una experiencia ágil y compatible con distintos dispositivos.",
      videoToolLabel: "Descargar videos de TikTok",
      withoutWatermarkLabel: "Descargar TikTok sin marca de agua",
      whyTitle: "¿Por qué usar Clipnexo para convertir TikTok a MP3?",
      whyText:
        "A diferencia de otras herramientas, Clipnexo ofrece una experiencia más limpia, rápida y práctica para descargar audio desde TikTok. Puedes usarlo desde Android, iPhone, tablet o computadora, sin registros complicados ni aplicaciones externas.",
      compatibilityTitle: "Compatible con celular, tablet y PC",
      compatibilityText:
        "Nuestro convertidor de TikTok a MP3 funciona en los navegadores más usados y se adapta a pantallas móviles y de escritorio. Ya sea en casa, en oficina o mientras te desplazas, Clipnexo está listo para convertir audio en pocos segundos.",
      qualityTitle: "Convierte TikTok a MP3 con buena calidad de audio",
      qualityText:
        "La herramienta está orientada a ofrecer una conversión estable y rápida, manteniendo una buena calidad de audio para que puedas escucharlo, archivarlo o reproducirlo más tarde cuando lo necesites.",
      securityTitle: "Convertir TikTok a MP3 online sin instalar aplicaciones",
      securityText:
        "Con Clipnexo no necesitas instalar apps adicionales ni programas pesados. Todo se realiza online desde tu navegador, lo que simplifica el proceso y evita ocupar espacio innecesario en tu dispositivo.",
      aeoTitle: "Preguntas frecuentes sobre convertir TikTok a MP3",
      closingTitle: "Clipnexo: herramienta rápida para descargar audio de TikTok",
      closingText:
        "Si buscas una forma sencilla de convertir TikTok a MP3, Clipnexo es una alternativa práctica, rápida y compatible con múltiples dispositivos. Pega el enlace, procesa el contenido y descarga el audio en pocos pasos.",
      toolsTitle: "Más herramientas de Clipnexo",
      toolsIntro:
        "Además del convertidor a MP3, también puedes usar otras herramientas relacionadas para descargar video y encontrar la opción que mejor se adapte a lo que necesitas.",
      extraFaq: [
        {
          q: "¿Clipnexo es gratis?",
          a: "Sí. Puedes usar Clipnexo gratis para convertir videos de TikTok a MP3 online.",
        },
        {
          q: "¿Necesito instalar una aplicación?",
          a: "No. La herramienta funciona desde el navegador, por lo que no necesitas instalar programas adicionales.",
        },
        {
          q: "¿Funciona en celular y computadora?",
          a: "Sí. Clipnexo es compatible con teléfonos móviles, tablets, laptops y computadoras de escritorio.",
        },
      ],
    },
    en: {
      lead:
        "Clipnexo lets you convert TikTok videos to MP3 for free, online, and in seconds. Just paste the video link and download the audio ready for your phone or PC.",
      sectionIntroTitle: "What is Clipnexo and what is it for?",
      sectionIntroText:
        "Clipnexo is an online tool built to convert TikTok videos to MP3 quickly and without installing software. It is made for users who want to extract TikTok audio with a simple and device-friendly experience.",
      videoToolLabel: "Download TikTok videos",
      withoutWatermarkLabel: "Download TikTok without watermark",
      whyTitle: "Why use Clipnexo to convert TikTok to MP3?",
      whyText:
        "Compared with other tools, Clipnexo offers a cleaner, faster, and more practical experience for downloading audio from TikTok. You can use it on Android, iPhone, tablet, or desktop without complicated sign-ups or external apps.",
      compatibilityTitle: "Compatible with mobile, tablet, and PC",
      compatibilityText:
        "Our TikTok to MP3 converter works in popular browsers and adapts well to mobile and desktop screens. Whether you are at home, at work, or on the go, Clipnexo is ready to convert audio in seconds.",
      qualityTitle: "Convert TikTok to MP3 with good audio quality",
      qualityText:
        "The tool is focused on delivering a fast and stable conversion flow while keeping good audio quality so you can listen, archive, or replay the file later.",
      securityTitle: "Convert TikTok to MP3 online without installing apps",
      securityText:
        "With Clipnexo, there is no need to install extra apps or heavy software. Everything happens online in your browser, making the process easier and avoiding unnecessary storage usage.",
      aeoTitle: "Frequently asked questions about converting TikTok to MP3",
      closingTitle: "Clipnexo: a fast tool for downloading TikTok audio",
      closingText:
        "If you need a simple way to convert TikTok to MP3, Clipnexo is a practical and fast option compatible with multiple devices. Paste the link, process the content, and download the audio in a few steps.",
      toolsTitle: "More Clipnexo tools",
      toolsIntro:
        "Besides the MP3 converter, you can also use related tools to download video and choose the option that best fits your needs.",
      extraFaq: [
        {
          q: "Is Clipnexo free?",
          a: "Yes. You can use Clipnexo for free to convert TikTok videos to MP3 online.",
        },
        {
          q: "Do I need to install an app?",
          a: "No. The tool works directly in your browser, so no extra software is required.",
        },
        {
          q: "Does it work on phone and computer?",
          a: "Yes. Clipnexo is compatible with mobile phones, tablets, laptops, and desktop computers.",
        },
      ],
    },
    pt: {
      lead:
        "O Clipnexo permite converter vídeos do TikTok em MP3 grátis, online e em segundos. Basta colar o link do vídeo e baixar o áudio pronto para celular ou PC.",
      sectionIntroTitle: "O que é o Clipnexo e para que serve?",
      sectionIntroText:
        "Clipnexo é uma ferramenta online criada para converter vídeos do TikTok em MP3 de forma rápida e sem instalar programas. Foi pensada para quem deseja extrair áudio do TikTok com praticidade e compatibilidade com vários dispositivos.",
      videoToolLabel: "Baixar vídeos do TikTok",
      withoutWatermarkLabel: "Baixar TikTok sem marca d’água",
      whyTitle: "Por que usar o Clipnexo para converter TikTok em MP3?",
      whyText:
        "Em comparação com outras opções, o Clipnexo oferece uma experiência mais limpa, rápida e prática para baixar áudio do TikTok. Você pode usar no Android, iPhone, tablet ou computador, sem cadastros complicados e sem apps externos.",
      compatibilityTitle: "Compatível com celular, tablet e PC",
      compatibilityText:
        "Nosso conversor de TikTok para MP3 funciona nos navegadores mais usados e se adapta bem a telas móveis e desktop. Seja em casa, no trabalho ou em movimento, o Clipnexo está pronto para converter áudio em segundos.",
      qualityTitle: "Converta TikTok em MP3 com boa qualidade de áudio",
      qualityText:
        "A ferramenta foi pensada para oferecer uma conversão rápida e estável, mantendo boa qualidade de áudio para ouvir, guardar ou reproduzir depois.",
      securityTitle: "Converter TikTok em MP3 online sem instalar aplicativos",
      securityText:
        "Com o Clipnexo, não é necessário instalar apps extras nem programas pesados. Tudo acontece online no navegador, o que simplifica o processo e evita ocupar espaço desnecessário no dispositivo.",
      aeoTitle: "Perguntas frequentes sobre converter TikTok em MP3",
      closingTitle: "Clipnexo: ferramenta rápida para baixar áudio do TikTok",
      closingText:
        "Se você procura uma maneira simples de converter TikTok em MP3, o Clipnexo é uma alternativa prática, rápida e compatível com vários dispositivos. Cole o link, processe o conteúdo e faça o download do áudio em poucos passos.",
      toolsTitle: "Mais ferramentas do Clipnexo",
      toolsIntro:
        "Além do conversor para MP3, você também pode usar outras ferramentas relacionadas para baixar vídeo e encontrar a opção ideal para o que precisa.",
      extraFaq: [
        {
          q: "O Clipnexo é grátis?",
          a: "Sim. Você pode usar o Clipnexo grátis para converter vídeos do TikTok em MP3 online.",
        },
        {
          q: "Preciso instalar um aplicativo?",
          a: "Não. A ferramenta funciona direto no navegador, sem necessidade de programas adicionais.",
        },
        {
          q: "Funciona no celular e no computador?",
          a: "Sim. O Clipnexo é compatível com celulares, tablets, notebooks e computadores de mesa.",
        },
      ],
    },
  } as const;

  const content = seoCopy[currentLang as keyof typeof seoCopy] ?? seoCopy.es;

  if (!t) {
    return null;
  }

  return (
    <main
      style={{
        padding: "32px 20px 60px",
        maxWidth: "980px",
        margin: "0 auto",
        color: "#111",
        position: "relative",
      }}
    >
      <section style={{ marginBottom: "36px", textAlign: "center" }}>
        <h1
          style={{
            color: "#111",
            position: "relative",
            zIndex: 1,
            fontSize: "clamp(24px, 4vw, 34px)",
            lineHeight: 1.05,
            fontWeight: 800,
            margin: "0 0 18px",
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            color: "#444",
            position: "relative",
            zIndex: 1,
            fontSize: "17px",
            lineHeight: 1.7,
            maxWidth: "780px",
            margin: "0 auto 24px",
          }}
        >
          {content.lead}
        </p>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <DownloaderBox lang={currentLang} type="mp3" />
        </div>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.2,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            {t.introTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.intro}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.sectionIntroTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {content.sectionIntroText}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.stepsTitle}
          </h2>
          <ol style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
            {t.steps.map((step: string, i: number) => (
              <li key={i} style={{ marginBottom: "10px", fontSize: "17px", lineHeight: 1.7 }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.benefitsTitle}
          </h2>
          <ul style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
            {t.benefits.map((b: string, i: number) => (
              <li key={i} style={{ marginBottom: "10px", fontSize: "17px", lineHeight: 1.7 }}>
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.whyTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {content.whyText}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.compatibilityTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {content.compatibilityText}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.qualityTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {content.qualityText}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {t.extraTitle || content.securityTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {t.extraContent || content.securityText}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {content.aeoTitle || t.faqTitle}
          </h2>
          {t.faq.map((item, i: number) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "#111",
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#444", margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
          {content.extraFaq.map((item, i) => (
            <div key={`extra-${i}`} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "#111",
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#444", margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.closingTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
            {content.closingText}
          </p>
        </section>

        <hr style={{ margin: "42px 0", border: 0, borderTop: "1px solid #e5e7eb" }} />

        <section>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.toolsTitle}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#444", margin: "0 0 16px" }}>
            {content.toolsIntro}
          </p>
          <ul style={{ paddingLeft: "24px", margin: 0 }}>
            {relatedLinks.map((link) => (
              <li key={link.routeKey} style={{ marginBottom: "10px", fontSize: "17px", lineHeight: 1.7 }}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
