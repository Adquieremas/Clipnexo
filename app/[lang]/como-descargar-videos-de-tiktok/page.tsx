import type { Metadata } from "next";
import Link from "next/link";
import { getMoreToolsLinks } from "@/lib/tools-content";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const pageContent = {
  es: {
    metaTitle: "Cómo descargar videos de TikTok con Clipnexo",
    metaDescription:
      "Aprende cómo descargar videos de TikTok en Clipnexo de forma gratuita, rápida y segura. Guía completa para bajar videos sin marca de agua en tu celular o PC.",
    h1: "Cómo descargar videos de TikTok con Clipnexo",
    intro:
      "¿Cómo descargar videos de TikTok? Si buscas una forma simple, rápida y segura de guardar tus videos favoritos, Clipnexo te permite descargar videos de TikTok sin marca de agua, gratis, online y sin instalar programas. Funciona en iPhone, Android, Windows y Mac, por lo que puedes usarlo desde tu celular o PC en pocos segundos.",
    intro2:
      "Esta guía paso a paso está pensada para usuarios principiantes e intermedios de Perú, Lima y Latinoamérica que quieren guardar videos públicos de TikTok con una herramienta práctica. Si prefieres ir directo al descargador, puedes usar nuestro servicio aquí: ",
    directTool: "Descargar TikTok",
    mp3Tool: "Descargar TikTok MP3",
    aboutText: "Acerca de Clipnexo",
    step1Title: "Paso 1: Copiar el enlace del video de TikTok",
    step1Text:
      "En PC, Mac, iPhone o Android, abre TikTok y busca el video que deseas guardar. Después pulsa el botón Compartir y selecciona Copiar enlace. Este paso es clave para que Clipnexo reconozca correctamente el video y muestre la vista previa y las opciones de descarga.",
    step2Title: "Paso 2: Pegar el enlace en Clipnexo",
    step2Text:
      "Ve a Clipnexo.com, pega el enlace copiado en el cuadro de búsqueda y presiona el botón Descargar. La herramienta procesará el contenido para mostrar el video, la descripción, los hashtags y los botones de descarga. Si quieres solo el audio, luego podrás usar la opción MP3.",
    step3Title: "Paso 3: Descargar el video o el audio a tu dispositivo",
    step3Text:
      "Cuando el resultado esté listo, presiona Descargar Video para guardar el archivo MP4 o usa la opción MP3 si necesitas solo el audio. Así de simples son los pasos para descargar video de TikTok en Clipnexo desde tu celular o computadora.",
    whyTitle: "¿Por qué usar Clipnexo para descargar videos de TikTok?",
    whyItems: [
      "Permite descargar videos de TikTok sin marca de agua.",
      "Funciona online, sin instalar aplicaciones pesadas.",
      "Es compatible con iPhone, Android, tablet y PC.",
      "Ofrece descarga de video y conversión a MP3.",
      "Tiene una interfaz simple para principiantes.",
      "Es una opción útil para usuarios de Lima, Perú y Latinoamérica.",
    ],
    tipsTitle: "Consejos para descargar videos de TikTok sin errores",
    tips: [
      "Verifica que el video sea público antes de copiar el enlace.",
      "Usa el enlace más reciente del video para evitar errores.",
      "Si el contenido no carga, vuelve a copiar el link desde TikTok.",
      "Comprueba tu conexión a internet si el procesamiento tarda demasiado.",
      "Si buscas solo el sonido, usa la herramienta de MP3 para ahorrar espacio.",
    ],
    noteTitle: "Nota importante",
    noteText:
      "Si recibes un error o no puedes encontrar el video, es posible que el contenido sea privado, haya sido eliminado o esté restringido en ciertos países. Si durante el uso encuentras un problema, puedes escribirnos para recibir ayuda en hola@clipnexo.com.",
    toolsTitle: "Más herramientas de Clipnexo",
    toolsIntro:
      "También puedes usar herramientas para crear ideas, captions, hashtags, ganchos y bios para TikTok.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Clipnexo permite descargar videos de TikTok sin marca de agua?",
        a: "Sí. Clipnexo procesa enlaces públicos de TikTok y permite descargar videos sin marca de agua de forma rápida y online.",
      },
      {
        q: "¿Cómo descargar videos de TikTok en iPhone o Android?",
        a: "Solo copia el enlace del video, pégalo en Clipnexo y presiona descargar. El proceso funciona en iPhone, Android y también en PC.",
      },
      {
        q: "¿Clipnexo es gratis?",
        a: "Sí. Puedes usar Clipnexo gratis para descargar videos de TikTok y convertir contenido a MP3.",
      },
      {
        q: "¿También puedo descargar solo el audio?",
        a: "Sí. Puedes usar la herramienta de TikTok a MP3 para guardar solo el audio del video cuando no necesites el archivo completo.",
      },
      {
        q: "¿Por qué algunos videos no se pueden descargar?",
        a: "Suele ocurrir cuando el video es privado, fue eliminado o tiene restricciones regionales.",
      },
      {
        q: "¿Clipnexo funciona en Perú y Latinoamérica?",
        a: "Sí. Clipnexo funciona para usuarios de Lima, Perú, Latinoamérica y otros países siempre que el enlace de TikTok sea público.",
      },
    ],
  },
  en: {
    metaTitle: "How to download TikTok videos with Clipnexo for",
    metaDescription:
      "Learn how to download TikTok videos with Clipnexo for free and save videos without watermark on mobile or PC. Follow our easy step-by-step guide right now.",
    h1: "How to download TikTok videos with Clipnexo",
    intro:
      "How do you download TikTok videos? If you want a simple, fast, and safe way to save your favorite videos, Clipnexo lets you download TikTok videos without watermark, free, online, and without installing software. It works on iPhone, Android, Windows, and Mac.",
    intro2:
      "This step-by-step guide is designed for beginner and intermediate users who want to save public TikTok videos using a practical tool. If you prefer to go straight to the downloader, you can use it here: ",
    directTool: "Download TikTok videos",
    mp3Tool: "Download TikTok MP3",
    aboutText: "About Clipnexo",
    step1Title: "Step 1: Copy the TikTok video link",
    step1Text:
      "On PC, Mac, iPhone, or Android, open TikTok and find the video you want to save. Then tap Share and choose Copy link. This is the key step so Clipnexo can detect the video and show the preview and download options.",
    step2Title: "Step 2: Paste the link into Clipnexo",
    step2Text:
      "Go to Clipnexo.com, paste the copied link into the search box, and press Download. The tool will process the content to show the video, description, hashtags, and download buttons. If you want only the audio, you can then use the MP3 option.",
    step3Title: "Step 3: Download the video or audio to your device",
    step3Text:
      "Once the result is ready, press Download Video to save the MP4 file or use the MP3 option if you only need the audio. That is how simple it is to download TikTok videos with Clipnexo from your phone or computer.",
    whyTitle: "Why use Clipnexo to download TikTok videos?",
    whyItems: [
      "Download TikTok videos without watermark.",
      "Works online without installing heavy apps.",
      "Compatible with iPhone, Android, tablet, and PC.",
      "Offers both video download and MP3 conversion.",
      "Simple interface for beginners.",
      "Useful for users in the US and globally.",
    ],
    tipsTitle: "Tips for downloading TikTok videos without errors",
    tips: [
      "Make sure the video is public before copying the link.",
      "Use the latest video link to avoid errors.",
      "If the content does not load, copy the link again from TikTok.",
      "Check your internet connection if processing takes too long.",
      "If you only need the sound, use the MP3 tool to save space.",
    ],
    noteTitle: "Important note",
    noteText:
      "If you get an error or cannot find the video, the content may be private, deleted, or restricted in some countries. If you find an issue while using the tool, contact us at hola@clipnexo.com.",
    toolsTitle: "More Clipnexo tools",
    toolsIntro:
      "You can also use tools to create TikTok ideas, captions, hashtags, hooks and bios.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Does Clipnexo download TikTok videos without watermark?",
        a: "Yes. Clipnexo processes public TikTok links and lets you download videos without watermark quickly and online.",
      },
      {
        q: "How do I download TikTok videos on iPhone or Android?",
        a: "Copy the video link, paste it into Clipnexo, and press download. The process works on iPhone, Android, and PC.",
      },
      {
        q: "Is Clipnexo free?",
        a: "Yes. You can use Clipnexo for free to download TikTok videos and convert content to MP3.",
      },
      {
        q: "Can I download only the audio?",
        a: "Yes. You can use the TikTok to MP3 tool to save only the audio when you do not need the full video file.",
      },
      {
        q: "Why can’t some videos be downloaded?",
        a: "This usually happens when the video is private, deleted, or restricted by region.",
      },
      {
        q: "Does Clipnexo work in the US and other countries?",
        a: "Yes. Clipnexo works in the US and other countries as long as the TikTok link is public.",
      },
    ],
  },
  pt: {
    metaTitle: "Como baixar vídeos do TikTok com Clipnexo",
    metaDescription:
      "Aprenda como baixar vídeos do TikTok com Clipnexo grátis e sem marca d’água no celular ou PC de forma rápida, segura e profissional para todos hoje mesmo.",
    h1: "Como baixar vídeos do TikTok com Clipnexo",
    intro:
      "Como baixar vídeos do TikTok? Se você procura uma forma simples, rápida e segura de salvar seus vídeos favoritos, o Clipnexo permite baixar vídeos do TikTok sem marca d’água, grátis, online e sem instalar programas. Funciona no iPhone, Android, Windows e Mac.",
    intro2:
      "Este guia passo a passo foi criado para usuários iniciantes e intermediários que querem salvar vídeos públicos do TikTok com uma ferramenta prática. Se preferir ir direto ao downloader, você pode usar aqui: ",
    directTool: "Baixar TikTok",
    mp3Tool: "Baixar TikTok MP3",
    aboutText: "Sobre o Clipnexo",
    step1Title: "Passo 1: Copiar o link do vídeo do TikTok",
    step1Text:
      "No PC, Mac, iPhone ou Android, abra o TikTok e encontre o vídeo que deseja salvar. Depois toque em Compartilhar e escolha Copiar link. Este é o passo principal para que o Clipnexo reconheça o vídeo e mostre a prévia e as opções de download.",
    step2Title: "Passo 2: Colar o link no Clipnexo",
    step2Text:
      "Acesse Clipnexo.com, cole o link copiado na caixa de busca e pressione Baixar. A ferramenta processará o conteúdo para mostrar o vídeo, a descrição, as hashtags e os botões de download. Se quiser apenas o áudio, depois poderá usar a opção MP3.",
    step3Title: "Passo 3: Baixar o vídeo ou o áudio no seu dispositivo",
    step3Text:
      "Quando o resultado estiver pronto, pressione Baixar Vídeo para salvar o arquivo MP4 ou use a opção MP3 se quiser apenas o áudio. Assim é simples baixar vídeos do TikTok com Clipnexo no celular ou no computador.",
    whyTitle: "Por que usar o Clipnexo para baixar vídeos do TikTok?",
    whyItems: [
      "Baixa vídeos do TikTok sem marca d’água.",
      "Funciona online sem instalar aplicativos pesados.",
      "Compatível com iPhone, Android, tablet e PC.",
      "Oferece download de vídeo e conversão para MP3.",
      "Interface simples para iniciantes.",
      "Útil para usuários em Portugal e outros países.",
    ],
    tipsTitle: "Dicas para baixar vídeos do TikTok sem erros",
    tips: [
      "Verifique se o vídeo é público antes de copiar o link.",
      "Use o link mais recente do vídeo para evitar erros.",
      "Se o conteúdo não carregar, copie o link novamente no TikTok.",
      "Confira sua conexão com a internet se o processamento demorar.",
      "Se quiser só o som, use a ferramenta MP3 para economizar espaço.",
    ],
    noteTitle: "Nota importante",
    noteText:
      "Se você receber um erro ou não conseguir encontrar o vídeo, o conteúdo pode ser privado, ter sido removido ou estar restrito em alguns países. Se encontrar algum problema durante o uso, fale conosco em hola@clipnexo.com.",
    toolsTitle: "Mais ferramentas do Clipnexo",
    toolsIntro:
      "Você também pode usar ferramentas para criar ideias, legendas, hashtags, ganchos e bios para TikTok.",
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "O Clipnexo baixa vídeos do TikTok sem marca d’água?",
        a: "Sim. O Clipnexo processa links públicos do TikTok e permite baixar vídeos sem marca d’água de forma rápida e online.",
      },
      {
        q: "Como baixar vídeos do TikTok no iPhone ou Android?",
        a: "Copie o link do vídeo, cole no Clipnexo e pressione baixar. O processo funciona no iPhone, Android e também no PC.",
      },
      {
        q: "O Clipnexo é grátis?",
        a: "Sim. Você pode usar o Clipnexo gratuitamente para baixar vídeos do TikTok e converter conteúdo em MP3.",
      },
      {
        q: "Também posso baixar só o áudio?",
        a: "Sim. Você pode usar a ferramenta TikTok para MP3 para salvar apenas o áudio quando não precisar do vídeo completo.",
      },
      {
        q: "Por que alguns vídeos não podem ser baixados?",
        a: "Isso geralmente acontece quando o vídeo é privado, foi removido ou tem restrições por região.",
      },
      {
        q: "O Clipnexo funciona em Portugal e outros países?",
        a: "Sim. O Clipnexo funciona em Portugal e em outros países desde que o link do TikTok seja público.",
      },
    ],
  },
} as const;

const imageSteps = [
  {
    src: "https://media.clipnexo.com/Descargar%20videos%20de%20tiktok%20en%20clipnexo%20pasos.webp",
    alt: {
      es: "Copiar enlace de video de TikTok en Clipnexo",
      en: "Copy TikTok video link in Clipnexo",
      pt: "Copiar link do vídeo do TikTok no Clipnexo",
    },
  },
  {
    src: "https://media.clipnexo.com/Descargar%20tiktok%20en%20clipnexo%20pasos.webp",
    alt: {
      es: "Pegar enlace de TikTok en Clipnexo",
      en: "Paste TikTok link into Clipnexo",
      pt: "Colar link do TikTok no Clipnexo",
    },
  },
  {
    src: "https://media.clipnexo.com/Descargar%20tiktok%20pasos%20clipnexo.webp",
    alt: {
      es: "Descargar video o audio de TikTok con Clipnexo",
      en: "Download TikTok video or audio with Clipnexo",
      pt: "Baixar vídeo ou áudio do TikTok com Clipnexo",
    },
  },
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    routeKey: "guide",
    lang: currentLang,
    openGraph: {
      locale: currentLang === "es" ? "es_PE" : currentLang === "en" ? "en_US" : "pt_PT",
      type: "article",
      images: [
        {
          url: imageSteps[0].src,
          width: 1200,
          height: 630,
          alt: imageSteps[0].alt[currentLang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [imageSteps[0].src],
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  const toolVideoHref = getLocalizedRoute("video", currentLang);
  const toolMp3Href = getLocalizedRoute("mp3", currentLang);
  const aboutHref = getLocalizedRoute("about", currentLang);
  const relatedLinks = getMoreToolsLinks(currentLang, "guide");

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.h1,
    description: t.metaDescription,
    image: imageSteps.map((item) => item.src),
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        name: t.step1Title,
        text: t.step1Text,
        image: imageSteps[0].src,
      },
      {
        "@type": "HowToStep",
        name: t.step2Title,
        text: t.step2Text,
        image: imageSteps[1].src,
      },
      {
        "@type": "HowToStep",
        name: t.step3Title,
        text: t.step3Text,
        image: imageSteps[2].src,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "48px 20px 90px", color: "#111" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header style={{ maxWidth: "860px", margin: "0 auto 42px auto", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "clamp(34px, 5vw, 58px)",
            lineHeight: 1.08,
            fontWeight: 800,
            margin: "0 0 18px 0",
          }}
        >
          {t.h1}
        </h1>

        <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.8, color: "#444" }}>{t.intro}</p>
        <p style={{ margin: "18px 0 0 0", fontSize: "18px", lineHeight: 1.8, color: "#444" }}>
          {t.intro2}
          <a href={toolVideoHref} style={{ color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>
            {t.directTool}
          </a>
          .
        </p>
      </header>

      <section style={{ display: "grid", gap: "42px" }}>
        <article style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "24px" }}>
          <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.step1Title}</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.8, color: "#444" }}>{t.step1Text}</p>
          <img
            src={imageSteps[0].src}
            alt={imageSteps[0].alt[currentLang]}
            style={{ width: "100%", height: "auto", borderRadius: "16px", marginTop: "18px", display: "block" }}
          />
        </article>

        <article style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "24px" }}>
          <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.step2Title}</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.8, color: "#444" }}>{t.step2Text}</p>
          <img
            src={imageSteps[1].src}
            alt={imageSteps[1].alt[currentLang]}
            style={{ width: "100%", height: "auto", borderRadius: "16px", marginTop: "18px", display: "block" }}
          />
        </article>

        <article style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "24px" }}>
          <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.step3Title}</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.8, color: "#444" }}>{t.step3Text}</p>
          <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Link
              href={toolVideoHref}
              style={{
                background: "#2563eb",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: "10px",
                fontWeight: 700,
              }}
            >
              {t.directTool}
            </Link>
            <Link
              href={toolMp3Href}
              style={{
                background: "#16a34a",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: "10px",
                fontWeight: 700,
              }}
            >
              {t.mp3Tool}
            </Link>
          </div>
          <img
            src={imageSteps[2].src}
            alt={imageSteps[2].alt[currentLang]}
            style={{ width: "100%", height: "auto", borderRadius: "16px", marginTop: "18px", display: "block" }}
          />
        </article>
      </section>

      <section style={{ marginTop: "48px", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "24px" }}>
        <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.whyTitle}</h2>
        <ul style={{ margin: 0, paddingLeft: "22px", color: "#444", fontSize: "17px", lineHeight: 1.85 }}>
          {t.whyItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ margin: "18px 0 0 0", fontSize: "17px", lineHeight: 1.8, color: "#444" }}>
          <a href={aboutHref} style={{ color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>
            {t.aboutText}
          </a>
        </p>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.tipsTitle}</h2>
        <ul style={{ margin: 0, paddingLeft: "22px", color: "#444", fontSize: "17px", lineHeight: 1.85 }}>
          {t.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "48px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "20px", padding: "24px" }}>
        <h2 style={{ fontSize: "28px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 12px 0" }}>{t.noteTitle}</h2>
        <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.8, color: "#444" }}>{t.noteText}</p>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "30px", lineHeight: 1.2, fontWeight: 800, margin: "0 0 14px 0" }}>{t.toolsTitle}</h2>
        <p style={{ margin: "0 0 18px", fontSize: "17px", lineHeight: 1.8, color: "#444" }}>{t.toolsIntro}</p>
        <div className="tool-link-grid">
          {relatedLinks.map((link) => (
            <Link key={link.routeKey} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "56px" }}>
        <h2 style={{ fontSize: "32px", lineHeight: 1.15, fontWeight: 800, margin: "0 0 20px 0" }}>{t.faqTitle}</h2>
        <div style={{ display: "grid", gap: "16px" }}>
          {t.faqs.map((faq) => (
            <article key={faq.q} style={{ border: "1px solid #e5e7eb", borderRadius: "18px", padding: "20px", background: "#fff" }}>
              <h3 style={{ fontSize: "22px", lineHeight: 1.3, fontWeight: 800, margin: "0 0 10px 0" }}>{faq.q}</h3>
              <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.8, color: "#444" }}>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
