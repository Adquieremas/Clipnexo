import type { Metadata } from "next";
import Link from "next/link";
import InstagramDownloaderBox from "@/components/InstagramDownloaderBox";
import { getLocalizedRoute, normalizeLang, type RouteKey } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const pageContent = {
  es: {
    metaTitle: "Descargar videos de Instagram en MP4 y MP3",
    metaDescription:
      "Descarga videos y Reels de Instagram gratis en MP4 o MP3. Pega el enlace público, mira la vista previa y guarda el archivo online.",
    h1: "Descargar videos y Reels de Instagram gratis",
    lead:
      "Pega el enlace de un Reel o video público de Instagram y descarga el archivo en MP4 o extrae el audio en MP3.",
    howTitle: "Cómo descargar videos de Instagram",
    howSteps: [
      "Copia el enlace público desde Instagram.",
      "Pega el enlace en Clipnexo.",
      "Presiona Descargar para cargar la vista previa.",
      "Elige descargar el video en MP4 o extraer el audio en MP3.",
    ],
    supportedTitle: "Qué enlaces de Instagram son compatibles",
    supportedText:
      "Clipnexo admite enlaces públicos de Instagram con rutas /reel/, /p/ y /tv/. Esto cubre Reels y videos públicos. No se admiten enlaces privados ni contenido que requiera iniciar sesión.",
    reelsTitle: "Descargar Reels de Instagram",
    reelsText:
      "Los Reels públicos se procesan como contenido de video. Si Instagram permite obtener la información, verás la vista previa, descripción, hashtags y los botones para descargar en MP4 o extraer el audio en MP3.",
    audioTitle: "Extraer audio MP3 de Instagram",
    audioText:
      "Además del video en MP4, puedes extraer el audio en formato MP3. La conversión se procesa en el servidor usando ffmpeg para garantizar un archivo de audio real, no un video renombrado.",
    qualityTitle: "Calidad y formato del archivo descargado",
    qualityText:
      "El video se entrega en formato MP4 con códec H.264 y audio AAC, optimizado con faststart para reproducción inmediata. El audio se entrega en MP3 real, no en contenedor de video. Ambos formatos son compatibles con QuickTime, iPhone, Android y navegadores modernos.",
    legal:
      "Usa Clipnexo solo para descargar contenido propio, público o con autorización del titular. Respeta los derechos de autor y la privacidad de otras personas.",
    relatedTitle: "Más herramientas para Instagram",
    related: [
      { label: "Generador de captions Instagram", routeKey: "instagramCaptionGenerator" },
      { label: "Generador de hashtags Instagram", routeKey: "instagramHashtagGenerator" },
      { label: "Ideas para Reels", routeKey: "instagramReelsIdeas" },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué contenido de Instagram puedo descargar?",
        a: "Puedes descargar Reels y videos públicos de Instagram en formato MP4 o extraer el audio en MP3.",
      },
      {
        q: "¿El MP4 descargado tiene audio?",
        a: "Sí. Clipnexo une el video y el audio cuando Instagram los entrega por separado. El MP4 final tiene video H.264 y audio AAC.",
      },
      {
        q: "¿Necesito iniciar sesión en Instagram?",
        a: "No. Clipnexo no pide usuario, contraseña ni acceso a cuentas privadas.",
      },
      {
        q: "¿El MP3 es audio real?",
        a: "Sí. El audio se extrae y convierte a MP3 real usando ffmpeg. No es un video renombrado.",
      },
      {
        q: "¿Qué hago si la descarga falla?",
        a: "Intenta con otro enlace público. Si el problema persiste, el contenido podría estar restringido por Instagram.",
      },
    ],
  },
  en: {
    metaTitle: "Download Instagram Videos Free in MP4 and MP3",
    metaDescription:
      "Download Instagram videos and Reels for free in MP4 or MP3. Paste a public link, preview the content and save it online.",
    h1: "Download Instagram videos and Reels for free",
    lead:
      "Paste a public Instagram Reel or video link and download the file as MP4 or extract the audio as MP3.",
    howTitle: "How to download Instagram videos",
    howSteps: [
      "Copy the public Instagram link.",
      "Paste the link into Clipnexo.",
      "Press Download to load the preview.",
      "Choose to download the video as MP4 or extract the audio as MP3.",
    ],
    supportedTitle: "Supported Instagram links",
    supportedText:
      "Clipnexo supports public Instagram links with /reel/, /p/ and /tv/ paths. This covers public Reels and videos. Private links and content that requires login are not supported.",
    reelsTitle: "Download Instagram Reels",
    reelsText:
      "Public Reels are processed as video content. If Instagram allows the information to be loaded, you will see the preview, caption, hashtags and buttons to download as MP4 or extract audio as MP3.",
    audioTitle: "Extract MP3 audio from Instagram",
    audioText:
      "In addition to MP4 video, you can extract the audio as MP3. The conversion is processed on the server using ffmpeg to guarantee real audio, not a renamed video file.",
    qualityTitle: "Download quality and format",
    qualityText:
      "Video is delivered as MP4 with H.264 codec and AAC audio, optimized with faststart for instant playback. Audio is delivered as real MP3, not in a video container. Both formats are compatible with QuickTime, iPhone, Android and modern browsers.",
    legal:
      "Use Clipnexo only to download your own content, public content or content you have permission to save. Respect copyright and privacy.",
    relatedTitle: "More Instagram tools",
    related: [
      { label: "Instagram caption generator", routeKey: "instagramCaptionGenerator" },
      { label: "Instagram hashtag generator", routeKey: "instagramHashtagGenerator" },
      { label: "Reels ideas", routeKey: "instagramReelsIdeas" },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "What Instagram content can I download?",
        a: "You can download public Instagram Reels and videos as MP4 or extract the audio as MP3.",
      },
      {
        q: "Does the downloaded MP4 have audio?",
        a: "Yes. Clipnexo merges video and audio when Instagram delivers them separately. The final MP4 has H.264 video and AAC audio.",
      },
      {
        q: "Do I need to log in to Instagram?",
        a: "No. Clipnexo does not ask for usernames, passwords or access to private accounts.",
      },
      {
        q: "Is the MP3 real audio?",
        a: "Yes. The audio is extracted and converted to real MP3 using ffmpeg. It is not a renamed video file.",
      },
      {
        q: "What if the download fails?",
        a: "Try another public link. If the issue persists, the content might be restricted by Instagram.",
      },
    ],
  },
  pt: {
    metaTitle: "Baixar vídeos do Instagram grátis em MP4 e MP3",
    metaDescription:
      "Baixe vídeos e Reels do Instagram grátis em MP4 ou MP3. Cole um link público, veja a prévia e salve o arquivo online.",
    h1: "Baixar vídeos e Reels do Instagram grátis",
    lead:
      "Cole o link de um Reel ou vídeo público do Instagram e baixe o arquivo em MP4 ou extraia o áudio em MP3.",
    howTitle: "Como baixar vídeos do Instagram",
    howSteps: [
      "Copie o link público do Instagram.",
      "Cole o link no Clipnexo.",
      "Pressione Baixar para carregar a prévia.",
      "Escolha baixar o vídeo em MP4 ou extrair o áudio em MP3.",
    ],
    supportedTitle: "Links do Instagram compatíveis",
    supportedText:
      "O Clipnexo aceita links públicos do Instagram com rotas /reel/, /p/ e /tv/. Isso cobre Reels e vídeos públicos. Links privados e conteúdo que exige login não são suportados.",
    reelsTitle: "Baixar Reels do Instagram",
    reelsText:
      "Reels públicos são processados como conteúdo de vídeo. Se o Instagram permitir carregar as informações, você verá a prévia, legenda, hashtags e os botões para baixar em MP4 ou extrair o áudio em MP3.",
    audioTitle: "Extrair áudio MP3 do Instagram",
    audioText:
      "Além do vídeo em MP4, você pode extrair o áudio em MP3. A conversão é processada no servidor usando ffmpeg para garantir áudio real, não um vídeo renomeado.",
    qualityTitle: "Qualidade e formato do arquivo baixado",
    qualityText:
      "O vídeo é entregue em MP4 com codec H.264 e áudio AAC, otimizado com faststart para reprodução imediata. O áudio é entregue em MP3 real, não em contêiner de vídeo. Ambos os formatos são compatíveis com QuickTime, iPhone, Android e navegadores modernos.",
    legal:
      "Use o Clipnexo apenas para baixar conteúdo próprio, público ou com autorização do titular. Respeite direitos autorais e privacidade.",
    relatedTitle: "Mais ferramentas para Instagram",
    related: [
      { label: "Gerador de legendas Instagram", routeKey: "instagramCaptionGenerator" },
      { label: "Gerador de hashtags Instagram", routeKey: "instagramHashtagGenerator" },
      { label: "Ideias para Reels", routeKey: "instagramReelsIdeas" },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Qual conteúdo do Instagram posso baixar?",
        a: "Você pode baixar Reels e vídeos públicos do Instagram em MP4 ou extrair o áudio em MP3.",
      },
      {
        q: "O MP4 baixado tem áudio?",
        a: "Sim. O Clipnexo une o vídeo e o áudio quando o Instagram os entrega separadamente. O MP4 final tem vídeo H.264 e áudio AAC.",
      },
      {
        q: "Preciso entrar na minha conta do Instagram?",
        a: "Não. O Clipnexo não pede usuário, senha nem acesso a contas privadas.",
      },
      {
        q: "O MP3 é áudio real?",
        a: "Sim. O áudio é extraído e convertido para MP3 real usando ffmpeg. Não é um vídeo renomeado.",
      },
      {
        q: "O que fazer se o download falhar?",
        a: "Tente outro link público. Se o problema persistir, o conteúdo pode estar restrito pelo Instagram.",
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    routeKey: "instagramDownloader",
    lang: currentLang,
  });
}

export default async function InstagramDownloaderPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const currentLang = normalizeLang(lang);
  const initialUrl =
    typeof resolvedSearchParams.url === "string" ? resolvedSearchParams.url : "";
  const t = pageContent[currentLang];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main
      style={{
        padding: "32px 20px 60px",
        maxWidth: "980px",
        margin: "0 auto",
        color: "#111",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section style={{ marginBottom: "36px", textAlign: "center" }}>
        <h1
          style={{
            color: "#111",
            fontSize: "clamp(24px, 4vw, 34px)",
            lineHeight: 1.05,
            fontWeight: 800,
            margin: "0 0 18px",
          }}
        >
          {t.h1}
        </h1>
        <p
          style={{
            color: "#444",
            fontSize: "17px",
            lineHeight: 1.7,
            maxWidth: "780px",
            margin: "0 auto 24px",
          }}
        >
          {t.lead}
        </p>
        <InstagramDownloaderBox lang={currentLang} initialUrl={initialUrl} />
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
            {t.howTitle}
          </h2>
          <ol style={{ paddingLeft: "24px", margin: 0, color: "#222" }}>
            {t.howSteps.map((step) => (
              <li key={step} style={{ marginBottom: "10px", fontSize: "17px", lineHeight: 1.7 }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {[
          { title: t.supportedTitle, text: t.supportedText },
          { title: t.reelsTitle, text: t.reelsText },
          { title: t.audioTitle, text: t.audioText },
          { title: t.qualityTitle, text: t.qualityText },
        ].map((section) => (
          <section key={section.title} style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#444", margin: 0 }}>
              {section.text}
            </p>
          </section>
        ))}

        <section
          style={{
            marginBottom: "32px",
            padding: "18px 20px",
            borderRadius: "12px",
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#475569", margin: 0 }}>
            {t.legal}
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
            {t.relatedTitle}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {t.related.map((item) => (
              <Link
                key={item.routeKey}
                href={getLocalizedRoute(item.routeKey as RouteKey, currentLang)}
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #c7d2fe",
                  color: "#4f46e5",
                  fontWeight: 700,
                  textDecoration: "none",
                  background: "#fff",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.18, fontWeight: 800, margin: "0 0 12px" }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {t.faq.map((item) => (
              <details
                key={item.q}
                style={{
                  background: "#f9f9f9",
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                }}
              >
                <summary style={{ fontWeight: 700, cursor: "pointer", color: "#111", fontSize: "16px" }}>
                  {item.q}
                </summary>
                <p style={{ margin: "12px 0 0", color: "#444", lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
