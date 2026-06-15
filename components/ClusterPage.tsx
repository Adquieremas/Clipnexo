import Link from "next/link";
import { getLocalizedRoute, normalizeLang, type SupportedLang } from "@/lib/routes";
import { getClusterContent, getClusterRouteKey, getClusterToolKeys, type ClusterKey } from "@/lib/cluster-content";

type Props = {
  clusterKey: ClusterKey;
  lang: string;
};

const toolLabelMap: Record<string, Record<SupportedLang, string>> = {
  video: { es: "Descargar videos de TikTok", en: "Download TikTok videos", pt: "Baixar vídeos do TikTok" },
  mp3: { es: "Descargar TikTok a MP3", en: "TikTok to MP3", pt: "TikTok para MP3" },
  withoutWatermark: { es: "Descargar TikTok sin marca de agua", en: "Download TikTok without watermark", pt: "Baixar TikTok sem marca d'água" },
  guide: { es: "Guía para descargar videos de TikTok", en: "How to download TikTok videos", pt: "Como baixar vídeos do TikTok" },
  tiktokBio: { es: "Generador de bio para TikTok", en: "TikTok bio generator", pt: "Gerador de bio para TikTok" },
  tiktokIdeas: { es: "Ideas para TikTok", en: "TikTok video ideas", pt: "Ideias para TikTok" },
  tiktokHooks: { es: "Ganchos virales para TikTok", en: "TikTok hook generator", pt: "Ganchos virais para TikTok" },
  tiktokCaptions: { es: "Generador de captions para TikTok", en: "TikTok caption generator", pt: "Gerador de legendas para TikTok" },
  tiktokHashtags: { es: "Generador de hashtags para TikTok", en: "TikTok hashtag generator", pt: "Gerador de hashtags para TikTok" },
  shortVideoTitleHashtag: { es: "Títulos y hashtags para videos cortos", en: "Short video title and hashtag generator", pt: "Títulos e hashtags para vídeos curtos" },
  youtubeTagGenerator: { es: "Generador de etiquetas de YouTube", en: "YouTube tag generator", pt: "Gerador de tags para YouTube" },
  youtubeTagExtractor: { es: "Extractor de etiquetas de YouTube", en: "YouTube tag extractor", pt: "Extrator de tags para YouTube" },
  youtubeHashtagGenerator: { es: "Generador de hashtags de YouTube", en: "YouTube hashtag generator", pt: "Gerador de hashtags para YouTube" },
  youtubeHashtagExtractor: { es: "Extractor de hashtags de YouTube", en: "YouTube hashtag extractor", pt: "Extrator de hashtags do YouTube" },
  youtubeTitleGenerator: { es: "Generador de títulos de YouTube", en: "YouTube title generator", pt: "Gerador de títulos para YouTube" },
  youtubeTitleExtractor: { es: "Extractor de títulos de YouTube", en: "YouTube title extractor", pt: "Extrator de títulos do YouTube" },
  youtubeTitleLengthChecker: { es: "Comprobar longitud de título YouTube", en: "YouTube title length checker", pt: "Verificar tamanho do título YouTube" },
  youtubeDescriptionGenerator: { es: "Generador de descripciones de YouTube", en: "YouTube description generator", pt: "Gerador de descrições para YouTube" },
  youtubeDescriptionExtractor: { es: "Extractor de descripción de YouTube", en: "YouTube description extractor", pt: "Extrator de descrição do YouTube" },
  youtubeTitleCapitalization: { es: "Mayúsculas en títulos YouTube", en: "YouTube title capitalization", pt: "Maiúsculas em títulos YouTube" },
  youtubeEmbedCodeGenerator: { es: "Generador de código de inserción YouTube", en: "YouTube embed code generator", pt: "Gerador de código de incorporação YouTube" },
  youtubeTimestampLinkGenerator: { es: "Generador de enlaces de tiempo YouTube", en: "YouTube timestamp link generator", pt: "Gerador de links de tempo YouTube" },
  youtubeSubscribeLinkGenerator: { es: "Generador de enlaces de suscripción YouTube", en: "YouTube subscribe link generator", pt: "Gerador de links de inscrição YouTube" },
  youtubeThumbnailDownloader: { es: "Descargar miniaturas de YouTube", en: "YouTube thumbnail downloader", pt: "Baixar miniaturas do YouTube" },
  youtubeMoneyCalculator: { es: "Calculadora de dinero de YouTube", en: "YouTube money calculator", pt: "Calculadora de dinheiro do YouTube" },
  youtubeViewRatioCalculator: { es: "Calculadora de proporción de vistas YouTube", en: "YouTube view ratio calculator", pt: "Calculadora de proporção de views YouTube" },
  instagramCaptionGenerator: { es: "Generador de captions para Instagram", en: "Instagram caption generator", pt: "Gerador de legendas para Instagram" },
  instagramHashtagGenerator: { es: "Generador de hashtags para Instagram", en: "Instagram hashtag generator", pt: "Gerador de hashtags para Instagram" },
  instagramBioGenerator: { es: "Generador de bio para Instagram", en: "Instagram bio generator", pt: "Gerador de bio para Instagram" },
  instagramReelsIdeas: { es: "Ideas para Reels", en: "Instagram Reels ideas", pt: "Ideias para Reels" },
  instagramReelsHooks: { es: "Ganchos para Reels", en: "Instagram Reels hook generator", pt: "Ganchos para Reels" },
  facebookPostGenerator: { es: "Generador de posts para Facebook", en: "Facebook post generator", pt: "Gerador de posts para Facebook" },
  facebookAdGenerator: { es: "Generador de anuncios para Facebook", en: "Facebook ad generator", pt: "Gerador de anúncios para Facebook" },
  marketplaceTextGenerator: { es: "Generador de textos para Marketplace", en: "Marketplace text generator", pt: "Gerador de textos para Marketplace" },
  shortVideoScriptGenerator: { es: "Generador de guiones para videos cortos", en: "Short video script generator", pt: "Gerador de roteiros para vídeos curtos" },
  socialMediaTextGenerator: { es: "Crear textos para redes sociales", en: "Social media text generator", pt: "Criar textos para redes sociais" },
  socialMediaCharacterCounter: { es: "Contador de caracteres", en: "Social media character counter", pt: "Contador de caracteres" },
  wordCounter: { es: "Contador de palabras y caracteres", en: "Word and character counter", pt: "Contador de palavras e caracteres" },
  caseConverter: { es: "Convertidor de mayúsculas y minúsculas", en: "Case converter", pt: "Conversor de maiúsculas e minúsculas" },
  outlineGenerator: { es: "Generador de índice para trabajos", en: "Outline generator", pt: "Gerador de índice para trabalhos" },
  assignmentTitleGenerator: { es: "Generador de títulos para trabajos", en: "Assignment title generator", pt: "Gerador de títulos para trabalhos" },
  introductionGenerator: { es: "Generador de introducciones", en: "Introduction generator", pt: "Gerador de introduções" },
  conclusionGenerator: { es: "Generador de conclusiones", en: "Conclusion generator", pt: "Gerador de conclusões" },
  textSummarizer: { es: "Resumidor de texto", en: "Text summarizer", pt: "Resumidor de texto" },
  textParaphraser: { es: "Parafraseador de texto", en: "Text paraphraser", pt: "Parafraseador de texto" },
  apaCitationGenerator: { es: "Generador de citas APA", en: "APA citation generator", pt: "Gerador de citações APA" },
  textCorrector: { es: "Corrector de texto básico", en: "Basic text corrector", pt: "Corretor de texto básico" },
  pdfToText: { es: "PDF a texto", en: "PDF to text", pt: "PDF para texto" },
  textToPdf: { es: "Texto a PDF", en: "Text to PDF", pt: "Texto para PDF" },
  pomodoroTimer: { es: "Temporizador Pomodoro", en: "Pomodoro timer", pt: "Temporizador Pomodoro" },
  gradeAverageCalculator: { es: "Calculadora de promedio", en: "Grade average calculator", pt: "Calculadora de média" },
  studyScheduleGenerator: { es: "Generador de horario de estudio", en: "Study schedule generator", pt: "Gerador de horário de estudo" },
  usernameGenerator: { es: "Generador de nombres de usuario", en: "Username generator", pt: "Gerador de nomes de usuário" },
  contentCalendarGenerator: { es: "Generador de calendario de contenido", en: "Content calendar generator", pt: "Gerador de calendário de conteúdo" },
};

const clusterFaqMap: Record<string, Record<SupportedLang, string>> = {
  tiktokTools: { es: "Preguntas frecuentes sobre herramientas TikTok", en: "FAQ about TikTok tools", pt: "Perguntas frequentes sobre ferramentas TikTok" },
  youtubeTools: { es: "Preguntas frecuentes sobre herramientas YouTube", en: "FAQ about YouTube tools", pt: "Perguntas frequentes sobre ferramentas YouTube" },
  instagramTools: { es: "Preguntas frecuentes sobre herramientas Instagram", en: "FAQ about Instagram tools", pt: "Perguntas frequentes sobre ferramentas Instagram" },
  facebookTools: { es: "Preguntas frecuentes sobre herramientas Facebook", en: "FAQ about Facebook tools", pt: "Perguntas frequentes sobre ferramentas Facebook" },
  shortVideoTools: { es: "Preguntas frecuentes sobre videos cortos", en: "FAQ about short videos", pt: "Perguntas frequentes sobre vídeos curtos" },
  socialMediaTools: { es: "Preguntas frecuentes sobre redes sociales", en: "FAQ about social media", pt: "Perguntas frequentes sobre redes sociais" },
  studentsTools: { es: "Preguntas frecuentes sobre herramientas para estudiantes", en: "FAQ about student tools", pt: "Perguntas frequentes sobre ferramentas para estudantes" },
};

export default function ClusterPage({ clusterKey, lang }: Props) {
  const currentLang = normalizeLang(lang);
  const content = getClusterContent(clusterKey, currentLang);
  const routeKey = getClusterRouteKey(clusterKey);
  const toolKeys = getClusterToolKeys(clusterKey);
  const faqTitle = clusterFaqMap[routeKey]?.[currentLang] || "FAQ";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Clipnexo", item: `https://clipnexo.com/${currentLang}` },
      { "@type": "ListItem", position: 2, name: content.h1, item: `https://clipnexo.com${getLocalizedRoute(routeKey as any, currentLang)}` },
    ],
  };

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "24px",
        lineHeight: "1.75",
        color: "#111",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
          {content.h1}
        </h1>
        <p
          style={{
            color: "#444",
            margin: "0 auto",
            fontSize: "18px",
            maxWidth: "860px",
            lineHeight: "1.85",
          }}
        >
          {content.intro}
        </p>
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "24px",
            borderBottom: "2px solid #eaeaea",
            paddingBottom: "8px",
          }}
        >
          {content.recommendedTitle}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {toolKeys.map((toolKey) => {
            const label =
              toolLabelMap[toolKey]?.[currentLang] ?? toolKey;
            return (
              <Link
                key={toolKey}
                href={getLocalizedRoute(toolKey as any, currentLang)}
                style={{
                  display: "block",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: "#111",
                  fontWeight: 600,
                  fontSize: "16px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1px solid #eee",
                }}
                className="tool-card-link"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          {content.howToTitle}
        </h2>
        <ol
          style={{
            paddingLeft: "20px",
            color: "#444",
            fontSize: "17px",
            lineHeight: "2",
          }}
        >
          {content.howToSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section
        style={{
          marginBottom: "48px",
          padding: "32px",
          backgroundColor: "#f5f5ff",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#111",
            marginBottom: "16px",
          }}
        >
          {currentLang === "es"
            ? "¿Buscas más herramientas?"
            : currentLang === "pt"
            ? "Procurando mais ferramentas?"
            : "Looking for more tools?"}
        </p>
        <Link
          href={getLocalizedRoute("tools", currentLang)}
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
            color: "white",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          {currentLang === "es"
            ? "Ver todas las herramientas"
            : currentLang === "pt"
            ? "Ver todas as ferramentas"
            : "View all tools"}
        </Link>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          {faqTitle}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {content.faq.map((item, i) => (
            <details
              key={i}
              style={{
                background: "#f9f9f9",
                padding: "16px 20px",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#111",
                  fontSize: "16px",
                }}
              >
                {item.q}
              </summary>
              <p style={{ marginTop: "12px", color: "#444", lineHeight: "1.7" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tool-card-link:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              border-color: #ddd;
            }
          `,
        }}
      />
    </main>
  );
}
