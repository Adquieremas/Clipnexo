import type { Metadata } from "next";
import Link from "next/link";
import DownloaderBox from "@/components/DownloaderBox";
import { getDictionary } from "@/lib/dictionary";
import { getMoreToolsLinks } from "@/lib/tools-content";
import { normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
    es: "Descargar videos TikTok sin marca de agua | Clipnexo",
    en: "Download TikTok videos without watermark | Clipnexo",
    pt: "Baixar vídeos do TikTok sem marca d’água | Clipnexo",
  };

  const descriptions = {
    es: "Descarga videos de TikTok sin marca de agua gratis. Rápido, online y compatible con celular y PC.",
    en: "Download TikTok videos without watermark for free. Fast, online, and compatible with mobile and PC.",
    pt: "Baixe vídeos do TikTok sem marca d’água grátis. Rápido, online e compatível com celular e PC.",
  };

  return buildSeoMetadata({
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    routeKey: "video",
    lang: currentLang,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const relatedLinks = getMoreToolsLinks(currentLang, "video");

  const dict = getDictionary(currentLang);
  const t: DownloadDictionarySection = dict.descargarTikTok;

  const seoCopy = {
    es: {
      lead:
        "Clipnexo te permite descargar videos de TikTok sin marca de agua gratis, online y en segundos. Solo pega el enlace del video y obtén el archivo listo para guardar en tu celular o PC.",
      sectionIntroTitle: "¿Qué es Clipnexo y para qué sirve?",
      sectionIntroText:
        "Clipnexo es una herramienta online pensada para descargar videos de TikTok sin marca de agua de forma rápida, simple y sin instalar programas. Funciona directamente desde el navegador y está diseñada para usuarios que buscan una solución práctica para guardar contenido en alta calidad.",
      mp3ToolLabel: "Convertir TikTok a MP3",
      withoutWatermarkLabel: "Descargar TikTok sin marca de agua",
      whyTitle: "¿Por qué usar Clipnexo para descargar TikTok?",
      whyText:
        "A diferencia de otras herramientas, Clipnexo ofrece una experiencia más limpia, rápida y compatible con distintos dispositivos. Puedes usarlo desde Android, iPhone, tablet o computadora, sin registros complicados y sin depender de aplicaciones externas.",
      compatibilityTitle: "Compatible con celular, tablet y PC",
      compatibilityText:
        "Nuestro descargador de TikTok funciona en los navegadores más usados y se adapta a pantallas móviles y de escritorio. Ya sea que necesites descargar un video en casa, en oficina o mientras te desplazas, Clipnexo está listo para usarse en segundos.",
      qualityTitle: "Descarga videos de TikTok en alta calidad",
      qualityText:
        "La herramienta está orientada a ofrecer una descarga rápida y estable, manteniendo una buena calidad de video para que puedas volver a verlo, compartirlo o archivarlo cuando lo necesites.",
      securityTitle: "Descargar TikTok online sin instalar aplicaciones",
      securityText:
        "Con Clipnexo no necesitas instalar apps extra ni programas pesados. Todo se realiza online desde tu navegador, lo que simplifica el proceso y evita ocupar espacio innecesario en tu dispositivo.",
      aeoTitle: "Preguntas frecuentes sobre descargar videos de TikTok",
      closingTitle: "Clipnexo: herramienta rápida para descargar videos de TikTok",
      closingText:
        "Si buscas una forma sencilla de descargar videos de TikTok sin marca de agua, Clipnexo es una alternativa práctica, rápida y compatible con múltiples dispositivos. Pega el enlace, procesa el video y descárgalo en pocos pasos.",
      toolsTitle: "Más herramientas de Clipnexo",
      toolsIntro:
        "Además del descargador de video, también puedes usar otras herramientas relacionadas para convertir contenido y encontrar la opción que mejor se adapte a lo que necesitas.",
      extraFaq: [
        {
          q: "¿Clipnexo es gratis?",
          a: "Sí. Puedes usar Clipnexo gratis para descargar videos de TikTok online sin marca de agua.",
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
        "Clipnexo lets you download TikTok videos without watermark for free, online, and in seconds. Just paste the video link and get the file ready for your phone or PC.",
      sectionIntroTitle: "What is Clipnexo and what is it for?",
      sectionIntroText:
        "Clipnexo is an online tool designed to download TikTok videos without watermark quickly and without installing software. It works directly in your browser and is built for users who want a practical way to save videos in good quality.",
      mp3ToolLabel: "Convert TikTok to MP3",
      withoutWatermarkLabel: "Download TikTok without watermark",
      whyTitle: "Why use Clipnexo to download TikTok videos?",
      whyText:
        "Compared with other tools, Clipnexo offers a cleaner and faster experience across multiple devices. You can use it on Android, iPhone, tablet, or desktop without complicated sign-ups or external apps.",
      compatibilityTitle: "Compatible with mobile, tablet, and PC",
      compatibilityText:
        "Our TikTok downloader works in popular browsers and adapts well to mobile and desktop screens. Whether you want to download a video at home, at work, or on the go, Clipnexo is ready in seconds.",
      qualityTitle: "Download TikTok videos in high quality",
      qualityText:
        "The tool is focused on delivering a fast and stable download flow while keeping good video quality so you can watch, share, or archive the content later.",
      securityTitle: "Download TikTok online without installing apps",
      securityText:
        "With Clipnexo, there is no need to install extra apps or heavy software. Everything happens online in your browser, which makes the process easier and avoids taking up unnecessary storage space.",
      aeoTitle: "Frequently asked questions about downloading TikTok videos",
      closingTitle: "Clipnexo: a fast tool for downloading TikTok videos",
      closingText:
        "If you need a simple way to download TikTok videos without watermark, Clipnexo is a practical and fast option compatible with multiple devices. Paste the link, process the video, and download it in a few steps.",
      toolsTitle: "More Clipnexo tools",
      toolsIntro:
        "Besides the video downloader, you can also use related tools to convert content and choose the option that fits your needs best.",
      extraFaq: [
        {
          q: "Is Clipnexo free?",
          a: "Yes. You can use Clipnexo for free to download TikTok videos online without watermark.",
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
        "O Clipnexo permite baixar vídeos do TikTok sem marca d’água grátis, online e em segundos. Basta colar o link do vídeo e obter o arquivo pronto para celular ou PC.",
      sectionIntroTitle: "O que é o Clipnexo e para que serve?",
      sectionIntroText:
        "Clipnexo é uma ferramenta online criada para baixar vídeos do TikTok sem marca d’água de forma rápida e sem instalar programas. Funciona diretamente no navegador e foi feita para quem busca praticidade ao salvar vídeos com boa qualidade.",
      mp3ToolLabel: "Converter TikTok para MP3",
      withoutWatermarkLabel: "Baixar TikTok sem marca d’água",
      whyTitle: "Por que usar o Clipnexo para baixar vídeos do TikTok?",
      whyText:
        "Em comparação com outras opções, o Clipnexo oferece uma experiência mais limpa e rápida em diferentes dispositivos. Você pode usar no Android, iPhone, tablet ou computador, sem cadastros complicados e sem apps externos.",
      compatibilityTitle: "Compatível com celular, tablet e PC",
      compatibilityText:
        "Nosso downloader de TikTok funciona nos navegadores mais usados e se adapta bem a telas móveis e desktop. Seja em casa, no trabalho ou em movimento, o Clipnexo fica pronto para uso em segundos.",
      qualityTitle: "Baixe vídeos do TikTok em alta qualidade",
      qualityText:
        "A ferramenta foi pensada para oferecer um fluxo de download rápido e estável, mantendo boa qualidade de vídeo para assistir, compartilhar ou guardar depois.",
      securityTitle: "Baixar TikTok online sem instalar aplicativos",
      securityText:
        "Com o Clipnexo, não é necessário instalar apps extras nem programas pesados. Tudo acontece online no navegador, o que simplifica o processo e evita ocupar espaço desnecessário no dispositivo.",
      aeoTitle: "Perguntas frequentes sobre baixar vídeos do TikTok",
      closingTitle: "Clipnexo: ferramenta rápida para baixar vídeos do TikTok",
      closingText:
        "Se você procura uma maneira simples de baixar vídeos do TikTok sem marca d’água, o Clipnexo é uma alternativa prática, rápida e compatível com vários dispositivos. Cole o link, processe o vídeo e faça o download em poucos passos.",
      toolsTitle: "Mais ferramentas do Clipnexo",
      toolsIntro:
        "Além do downloader de vídeo, você também pode usar outras ferramentas relacionadas para converter conteúdo e encontrar a opção ideal para o que precisa.",
      extraFaq: [
        {
          q: "O Clipnexo é grátis?",
          a: "Sim. Você pode usar o Clipnexo grátis para baixar vídeos do TikTok online sem marca d’água.",
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
        padding: "48px 24px 72px",
        maxWidth: "980px",
        margin: "0 auto",
        color: "#111",
        position: "relative",
      }}
    >
      <section style={{ marginBottom: "48px", textAlign: "center" }}>
        <h1
          style={{
            color: "#111",
            position: "relative",
            zIndex: 1,
            fontSize: "clamp(32px, 5vw, 52px)",
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
            fontSize: "20px",
            lineHeight: 1.75,
            maxWidth: "860px",
            margin: "0 auto 30px",
          }}
        >
          {content.lead}
        </p>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <DownloaderBox lang={currentLang} type="video" />
        </div>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 3.4vw, 40px)",
              lineHeight: 1.12,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {t.introTitle}
          </h2>
          <p style={{ fontSize: "19px", lineHeight: 1.8, color: "#444", margin: 0 }}>
            {t.intro}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.sectionIntroTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {content.sectionIntroText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
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
              <li key={i} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
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
              <li key={i} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.whyTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {content.whyText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.compatibilityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {content.compatibilityText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.qualityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {content.qualityText}
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
            {t.extraTitle || content.securityTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {t.extraContent || content.securityText}
          </p>
        </section>

        <section style={{ marginBottom: "34px" }}>
          <h2
            style={{
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            {content.aeoTitle || t.faqTitle}
          </h2>
          {t.faq.map((item: { q: string; a: string }, i: number) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "20px",
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
          {content.extraFaq.map((item, i) => (
            <div key={`extra-${i}`} style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "20px",
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
              fontSize: "clamp(23px, 3vw, 34px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.closingTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#444", margin: 0 }}>
            {content.closingText}
          </p>
        </section>

        <hr style={{ margin: "42px 0", border: 0, borderTop: "1px solid #e5e7eb" }} />

        <section>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 38px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              color: "#111",
            }}
          >
            {content.toolsTitle}
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#444", margin: "0 0 16px" }}>
            {content.toolsIntro}
          </p>
          <ul style={{ paddingLeft: "24px", margin: 0 }}>
            {relatedLinks.map((link) => (
              <li key={link.routeKey} style={{ marginBottom: "10px", fontSize: "18px", lineHeight: 1.8 }}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
