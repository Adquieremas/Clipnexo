import type { Metadata } from "next";
import Link from "next/link";
import { getLocalizedRoute, normalizeLang, type RouteKey } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

type Lang = "es" | "en" | "pt";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const pageContent = {
  es: {
    metaTitle: "Todas las herramientas de Clipnexo gratis",
    metaDescription: "Descubre nuestra colección completa de herramientas gratuitas para TikTok, YouTube y redes sociales. Optimiza tu contenido digital de forma fácil hoy mismo.",
    h1: "Herramientas gratuitas para creadores",
    lead: "Explora herramientas online para descargar videos, crear textos, generar hashtags, preparar captions y optimizar contenido para redes sociales.",
    popularTitle: "Herramientas populares",
    clusters: {
      tiktok: "Herramientas para TikTok",
      youtube: "Herramientas para YouTube",
      instagram: "Herramientas para Instagram",
      facebook: "Herramientas para Facebook",
      shortVideo: "Videos Cortos",
      social: "Redes Sociales",
      students: "Estudiantes",
    },
    tools: {
      video: "Descargar videos de TikTok",
      mp3: "Descargar audio de TikTok (MP3)",
      withoutWatermark: "Descargar TikTok sin marca",
      tiktokBio: "Generador de bio para TikTok",
      tiktokIdeas: "Ideas para videos TikTok",
      tiktokHooks: "Ganchos virales TikTok",
      tiktokCaptions: "Generador de captions TikTok",
      tiktokHashtags: "Generador de hashtags TikTok",
      youtubeTagGenerator: "Generador de etiquetas YouTube",
      youtubeTagExtractor: "Extractor de etiquetas YouTube",
      youtubeHashtagGenerator: "Generador de hashtags YouTube",
      youtubeHashtagExtractor: "Extractor de hashtags YouTube",
      youtubeTitleGenerator: "Generador de títulos YouTube",
      youtubeTitleExtractor: "Extractor de títulos YouTube",
      youtubeTitleLengthChecker: "Longitud de título YouTube",
      youtubeDescriptionGenerator: "Generador de descripciones YouTube",
      youtubeDescriptionExtractor: "Extractor de descripción YouTube",
      youtubeTitleCapitalization: "Mayúsculas en títulos YouTube",
      youtubeEmbedCodeGenerator: "Código de inserción YouTube",
      youtubeTimestampLinkGenerator: "Enlaces de tiempo YouTube",
      youtubeSubscribeLinkGenerator: "Enlace de suscripción YouTube",
      youtubeThumbnailDownloader: "Descargar miniaturas YouTube",
      youtubeMoneyCalculator: "Calculadora de dinero YouTube",
      youtubeViewRatioCalculator: "Proporción de vistas YouTube",
      socialMediaTextGenerator: "Creador de textos generales",
      shortVideoTitleHashtag: "Títulos y hashtags para videos",
      instagramCaptionGenerator: "Generador de captions Instagram",
      instagramHashtagGenerator: "Generador de hashtags Instagram",
      instagramBioGenerator: "Generador de bio Instagram",
      instagramReelsIdeas: "Ideas para Reels",
      instagramReelsHooks: "Ganchos para Reels",
      facebookPostGenerator: "Generador de posts Facebook",
      facebookAdGenerator: "Generador de anuncios Facebook",
      facebookAdGeneratorShort: "Anuncios Facebook",
      marketplaceTextGenerator: "Textos para Marketplace",
      shortVideoScriptGenerator: "Guiones para videos cortos",
      socialMediaCharacterCounter: "Contador de caracteres",
      wordCounter: "Contador de palabras y caracteres",
      caseConverter: "Convertidor de mayúsculas y minúsculas",
      outlineGenerator: "Generador de índice para trabajos",
      assignmentTitleGenerator: "Generador de títulos para trabajos",
      introductionGenerator: "Generador de introducciones",
      conclusionGenerator: "Generador de conclusiones",
      textSummarizer: "Resumidor de texto",
      textParaphraser: "Parafraseador de texto",
      apaCitationGenerator: "Generador de citas APA",
      textCorrector: "Corrector de texto básico",
      pdfToText: "PDF a texto",
      textToPdf: "Texto a PDF",
      pomodoroTimer: "Temporizador Pomodoro",
      gradeAverageCalculator: "Calculadora de promedio de notas",
      studyScheduleGenerator: "Generador de horario de estudio",
      usernameGenerator: "Generador de nombres de usuario",
      contentCalendarGenerator: "Generador de calendario de contenido",
    },
    faq: [
      { q: "¿Son gratuitas todas las herramientas?", a: "Sí, todas las herramientas de Clipnexo son completamente gratuitas, no requieren registro ni instalación." },
      { q: "¿En qué dispositivos puedo usarlas?", a: "Funcionan en cualquier navegador moderno, tanto en ordenadores como en tablets y móviles." },
      { q: "¿Necesito crear una cuenta?", a: "No, no necesitas registrarte ni iniciar sesión para usar ninguna herramienta." },
      { q: "¿Las herramientas funcionan para cualquier red social?", a: "Sí, están diseñadas para TikTok, YouTube, Instagram, Facebook, Reels, Shorts y más." },
    ],
    ctaTitle: "Empieza con una herramienta gratuita",
    ctaSubtitle: "Descarga videos, genera contenido y optimiza tus redes sociales al instante.",
    ctaButtons: {
      primary: { label: "Descargar video", routeKey: "video" },
      secondary: { label: "Ver herramientas populares", routeKey: "tools" },
    }
  },
  en: {
    metaTitle: "All Clipnexo Tools - Optimize Your Social Media",
    metaDescription: "Discover our complete collection of free tools for TikTok, YouTube, Instagram and Facebook. Optimize your content and social media presence fast right now.",
    h1: "Free tools for creators",
    lead: "Explore online tools to download videos, create texts, generate hashtags, prepare captions and optimize social media content.",
    popularTitle: "Popular tools",
    clusters: {
      tiktok: "TikTok Tools",
      youtube: "YouTube Tools",
      instagram: "Instagram Tools",
      facebook: "Facebook Tools",
      shortVideo: "Short Video Tools",
      social: "Social Media Tools",
      students: "Students",
    },
    tools: {
      video: "Download TikTok videos",
      mp3: "Download TikTok audio (MP3)",
      withoutWatermark: "Download TikTok without watermark",
      tiktokBio: "TikTok Bio Generator",
      tiktokIdeas: "TikTok Video Ideas",
      tiktokHooks: "TikTok Viral Hooks",
      tiktokCaptions: "TikTok Caption Generator",
      tiktokHashtags: "TikTok Hashtag Generator",
      youtubeTagGenerator: "YouTube Tag Generator",
      youtubeTagExtractor: "YouTube Tag Extractor",
      youtubeHashtagGenerator: "YouTube Hashtag Generator",
      youtubeHashtagExtractor: "YouTube Hashtag Extractor",
      youtubeTitleGenerator: "YouTube Title Generator",
      youtubeTitleExtractor: "YouTube Title Extractor",
      youtubeTitleLengthChecker: "YouTube Title Length Checker",
      youtubeDescriptionGenerator: "YouTube Description Generator",
      youtubeDescriptionExtractor: "YouTube Description Extractor",
      youtubeTitleCapitalization: "YouTube Title Capitalization",
      youtubeEmbedCodeGenerator: "YouTube Embed Code Generator",
      youtubeTimestampLinkGenerator: "YouTube Timestamp Link Generator",
      youtubeSubscribeLinkGenerator: "YouTube Subscribe Link Generator",
      youtubeThumbnailDownloader: "YouTube Thumbnail Downloader",
      youtubeMoneyCalculator: "YouTube Money Calculator",
      youtubeViewRatioCalculator: "YouTube View Ratio Calculator",
      socialMediaTextGenerator: "General Text Creator",
      shortVideoTitleHashtag: "Video Titles & Hashtags",
      instagramCaptionGenerator: "Instagram Caption Generator",
      instagramHashtagGenerator: "Instagram Hashtag Generator",
      instagramBioGenerator: "Instagram Bio Generator",
      instagramReelsIdeas: "Reels Ideas",
      instagramReelsHooks: "Reels Hook Generator",
      facebookPostGenerator: "Facebook Post Generator",
      facebookAdGenerator: "Facebook Ad Generator",
      facebookAdGeneratorShort: "Facebook Ads",
      marketplaceTextGenerator: "Marketplace Text Generator",
      shortVideoScriptGenerator: "Short Video Script Generator",
      socialMediaCharacterCounter: "Social Media Character Counter",
      wordCounter: "Word and Character Counter",
      caseConverter: "Case Converter",
      outlineGenerator: "Outline Generator",
      assignmentTitleGenerator: "Assignment Title Generator",
      introductionGenerator: "Introduction Generator",
      conclusionGenerator: "Conclusion Generator",
      textSummarizer: "Text Summarizer",
      textParaphraser: "Text Paraphraser",
      apaCitationGenerator: "APA Citation Generator",
      textCorrector: "Text Corrector",
      pdfToText: "PDF to Text",
      textToPdf: "Text to PDF",
      pomodoroTimer: "Pomodoro Timer",
      gradeAverageCalculator: "Grade Average Calculator",
      studyScheduleGenerator: "Study Schedule Generator",
      usernameGenerator: "Username Generator",
      contentCalendarGenerator: "Content Calendar Generator",
    },
    faq: [
      { q: "Are all tools free?", a: "Yes, all Clipnexo tools are completely free, no registration or installation required." },
      { q: "What devices can I use them on?", a: "They work on any modern browser, on computers, tablets and phones." },
      { q: "Do I need to create an account?", a: "No, you don't need to sign up or log in to use any tool." },
      { q: "Do the tools work for any social network?", a: "Yes, they are designed for TikTok, YouTube, Instagram, Facebook, Reels, Shorts and more." },
    ],
    ctaTitle: "Start with a free tool",
    ctaSubtitle: "Download videos, generate content and optimize your social media instantly.",
    ctaButtons: {
      primary: { label: "Download video", routeKey: "video" },
      secondary: { label: "View popular tools", routeKey: "tools" },
    }
  },
  pt: {
    metaTitle: "Todas as ferramentas do Clipnexo - Otimize suas",
    metaDescription: "Descubra nossa coleção completa de ferramentas gratuitas para TikTok, YouTube, Instagram e Facebook no Clipnexo. Otimize seu conteúdo digital hoje mesmo.",
    h1: "Ferramentas gratuitas para criadores",
    lead: "Explore ferramentas online para baixar vídeos, criar textos, gerar hashtags, preparar legendas e otimizar conteúdo para redes sociais.",
    popularTitle: "Ferramentas populares",
    clusters: {
      tiktok: "Ferramentas para TikTok",
      youtube: "Ferramentas para YouTube",
      instagram: "Ferramentas para Instagram",
      facebook: "Ferramentas para Facebook",
      shortVideo: "Ferramentas para Vídeos Curtos",
      social: "Ferramentas para Redes Sociais",
      students: "Estudantes",
    },
    tools: {
      video: "Baixar vídeos do TikTok",
      mp3: "Baixar áudio do TikTok (MP3)",
      withoutWatermark: "Baixar TikTok sem marca d'água",
      tiktokBio: "Gerador de bio para TikTok",
      tiktokIdeas: "Ideias para vídeos TikTok",
      tiktokHooks: "Ganchos virais TikTok",
      tiktokCaptions: "Gerador de legendas TikTok",
      tiktokHashtags: "Gerador de hashtags TikTok",
      youtubeTagGenerator: "Gerador de tags YouTube",
      youtubeTagExtractor: "Extrator de tags YouTube",
      youtubeHashtagGenerator: "Gerador de hashtags YouTube",
      youtubeHashtagExtractor: "Extrator de hashtags YouTube",
      youtubeTitleGenerator: "Gerador de títulos YouTube",
      youtubeTitleExtractor: "Extrator de títulos YouTube",
      youtubeTitleLengthChecker: "Tamanho do título YouTube",
      youtubeDescriptionGenerator: "Gerador de descrições YouTube",
      youtubeDescriptionExtractor: "Extrator de descrição YouTube",
      youtubeTitleCapitalization: "Maiúsculas em títulos YouTube",
      youtubeEmbedCodeGenerator: "Código de incorporação YouTube",
      youtubeTimestampLinkGenerator: "Links de tempo YouTube",
      youtubeSubscribeLinkGenerator: "Link de inscrição YouTube",
      youtubeThumbnailDownloader: "Baixar miniaturas YouTube",
      youtubeMoneyCalculator: "Calculadora de dinheiro YouTube",
      youtubeViewRatioCalculator: "Proporção de views YouTube",
      socialMediaTextGenerator: "Criador de textos gerais",
      shortVideoTitleHashtag: "Títulos e hashtags para vídeos",
      instagramCaptionGenerator: "Gerador de legendas Instagram",
      instagramHashtagGenerator: "Gerador de hashtags Instagram",
      instagramBioGenerator: "Gerador de bio Instagram",
      instagramReelsIdeas: "Ideias para Reels",
      instagramReelsHooks: "Ganchos para Reels",
      facebookPostGenerator: "Gerador de posts Facebook",
      facebookAdGenerator: "Gerador de anúncios Facebook",
      facebookAdGeneratorShort: "Anúncios Facebook",
      marketplaceTextGenerator: "Textos para Marketplace",
      shortVideoScriptGenerator: "Gerador de roteiros para vídeos curtos",
      socialMediaCharacterCounter: "Contador de caracteres",
      wordCounter: "Contador de palavras e caracteres",
      caseConverter: "Conversor de maiúsculas e minúsculas",
      outlineGenerator: "Gerador de índice para trabalhos",
      assignmentTitleGenerator: "Gerador de títulos para trabalhos",
      introductionGenerator: "Gerador de introduções",
      conclusionGenerator: "Gerador de conclusões",
      textSummarizer: "Resumidor de texto",
      textParaphraser: "Parafraseador de texto",
      apaCitationGenerator: "Gerador de citações APA",
      textCorrector: "Corretor de texto básico",
      pdfToText: "PDF para texto",
      textToPdf: "Texto para PDF",
      pomodoroTimer: "Temporizador Pomodoro",
      gradeAverageCalculator: "Calculadora de média de notas",
      studyScheduleGenerator: "Gerador de horário de estudo",
      usernameGenerator: "Gerador de nomes de usuário",
      contentCalendarGenerator: "Gerador de calendário de conteúdo",
    },
    faq: [
      { q: "Todas as ferramentas são gratuitas?", a: "Sim, todas as ferramentas do Clipnexo são completamente gratuitas, sem necessidade de registro ou instalação." },
      { q: "Em quais dispositivos posso usá-las?", a: "Funcionam em qualquer navegador moderno, tanto em computadores quanto em tablets e celulares." },
      { q: "Preciso criar uma conta?", a: "Não, você não precisa se registrar nem fazer login para usar nenhuma ferramenta." },
      { q: "As ferramentas funcionam para qualquer rede social?", a: "Sim, são projetadas para TikTok, YouTube, Instagram, Facebook, Reels, Shorts e muito mais." },
    ],
    ctaTitle: "Comece com uma ferramenta gratuita",
    ctaSubtitle: "Baixe vídeos, gere conteúdo e otimize suas redes sociais instantaneamente.",
    ctaButtons: {
      primary: { label: "Baixar vídeo", routeKey: "video" },
      secondary: { label: "Ver ferramentas populares", routeKey: "tools" },
    }
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  return buildSeoMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    routeKey: "tools",
    lang: currentLang,
  });
}

export default async function ToolsPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = pageContent[currentLang];

  const popularTools = [
    { key: "video", name: t.tools.video },
    { key: "mp3", name: t.tools.mp3 },
    { key: "tiktokHashtags", name: t.tools.tiktokHashtags },
    { key: "instagramCaptionGenerator", name: t.tools.instagramCaptionGenerator },
    { key: "youtubeTitleGenerator", name: t.tools.youtubeTitleGenerator },
    { key: "socialMediaCharacterCounter", name: t.tools.socialMediaCharacterCounter },
  ] as const;

  const clusters = [
    {
      title: t.clusters.tiktok,
      items: [
        { key: "video", name: t.tools.video },
        { key: "mp3", name: t.tools.mp3 },
        { key: "withoutWatermark", name: t.tools.withoutWatermark },
        { key: "tiktokBio", name: t.tools.tiktokBio },
        { key: "tiktokIdeas", name: t.tools.tiktokIdeas },
        { key: "tiktokHooks", name: t.tools.tiktokHooks },
        { key: "tiktokCaptions", name: t.tools.tiktokCaptions },
        { key: "tiktokHashtags", name: t.tools.tiktokHashtags },
      ] as const
    },
    {
      title: t.clusters.youtube,
      items: [
        { key: "youtubeTagGenerator", name: t.tools.youtubeTagGenerator },
        { key: "youtubeTagExtractor", name: t.tools.youtubeTagExtractor },
        { key: "youtubeHashtagGenerator", name: t.tools.youtubeHashtagGenerator },
        { key: "youtubeHashtagExtractor", name: t.tools.youtubeHashtagExtractor },
        { key: "youtubeTitleGenerator", name: t.tools.youtubeTitleGenerator },
        { key: "youtubeTitleExtractor", name: t.tools.youtubeTitleExtractor },
        { key: "youtubeTitleLengthChecker", name: t.tools.youtubeTitleLengthChecker },
        { key: "youtubeDescriptionGenerator", name: t.tools.youtubeDescriptionGenerator },
        { key: "youtubeDescriptionExtractor", name: t.tools.youtubeDescriptionExtractor },
        { key: "youtubeTitleCapitalization", name: t.tools.youtubeTitleCapitalization },
        { key: "youtubeEmbedCodeGenerator", name: t.tools.youtubeEmbedCodeGenerator },
        { key: "youtubeTimestampLinkGenerator", name: t.tools.youtubeTimestampLinkGenerator },
        { key: "youtubeSubscribeLinkGenerator", name: t.tools.youtubeSubscribeLinkGenerator },
        { key: "youtubeThumbnailDownloader", name: t.tools.youtubeThumbnailDownloader },
        { key: "youtubeMoneyCalculator", name: t.tools.youtubeMoneyCalculator },
        { key: "youtubeViewRatioCalculator", name: t.tools.youtubeViewRatioCalculator },
      ] as const
    },
    {
      title: t.clusters.instagram,
      items: [
        { key: "instagramCaptionGenerator", name: t.tools.instagramCaptionGenerator },
        { key: "instagramHashtagGenerator", name: t.tools.instagramHashtagGenerator },
        { key: "instagramBioGenerator", name: t.tools.instagramBioGenerator },
        { key: "instagramReelsIdeas", name: t.tools.instagramReelsIdeas },
        { key: "instagramReelsHooks", name: t.tools.instagramReelsHooks },
      ] as const
    },
    {
      title: t.clusters.facebook,
      items: [
        { key: "facebookPostGenerator", name: t.tools.facebookPostGenerator },
        { key: "facebookAdGenerator", name: t.tools.facebookAdGeneratorShort },
        { key: "marketplaceTextGenerator", name: t.tools.marketplaceTextGenerator },
      ] as const
    },
    {
      title: t.clusters.shortVideo,
      items: [
        { key: "shortVideoScriptGenerator", name: t.tools.shortVideoScriptGenerator },
        { key: "shortVideoTitleHashtag", name: t.tools.shortVideoTitleHashtag },
      ] as const
    },
    {
      title: t.clusters.social,
      items: [
        { key: "socialMediaTextGenerator", name: t.tools.socialMediaTextGenerator },
        { key: "socialMediaCharacterCounter", name: t.tools.socialMediaCharacterCounter },
        { key: "usernameGenerator", name: t.tools.usernameGenerator },
        { key: "contentCalendarGenerator", name: t.tools.contentCalendarGenerator },
      ] as const
    },
    {
      title: t.clusters.students,
      items: [
        { key: "wordCounter", name: t.tools.wordCounter },
        { key: "caseConverter", name: t.tools.caseConverter },
        { key: "outlineGenerator", name: t.tools.outlineGenerator },
        { key: "assignmentTitleGenerator", name: t.tools.assignmentTitleGenerator },
        { key: "introductionGenerator", name: t.tools.introductionGenerator },
        { key: "conclusionGenerator", name: t.tools.conclusionGenerator },
        { key: "textSummarizer", name: t.tools.textSummarizer },
        { key: "textParaphraser", name: t.tools.textParaphraser },
        { key: "apaCitationGenerator", name: t.tools.apaCitationGenerator },
        { key: "textCorrector", name: t.tools.textCorrector },
        { key: "pdfToText", name: t.tools.pdfToText },
        { key: "textToPdf", name: t.tools.textToPdf },
        { key: "pomodoroTimer", name: t.tools.pomodoroTimer },
        { key: "gradeAverageCalculator", name: t.tools.gradeAverageCalculator },
        { key: "studyScheduleGenerator", name: t.tools.studyScheduleGenerator },
      ] as const
    }
  ];

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
          {t.h1}
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

      <section style={{ marginBottom: "52px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "24px",
            borderBottom: "2px solid #eaeaea",
            paddingBottom: "8px",
          }}
        >
          {t.popularTitle}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {popularTools.map((item) => (
            <Link
              key={item.key}
              href={getLocalizedRoute(item.key, currentLang)}
              style={{
                display: "block",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#111",
                fontWeight: 600,
                fontSize: "18px",
                transition: "transform 0.2s, box-shadow 0.2s",
                border: "1px solid #eee",
              }}
              className="tool-card-link"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {clusters.map((cluster) => (
          <section key={cluster.title}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "24px",
                borderBottom: "2px solid #eaeaea",
                paddingBottom: "8px"
              }}
            >
              {cluster.title}
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px"
            }}>
              {cluster.items.map((item) => (
                <Link
                  key={item.key}
                  href={getLocalizedRoute(item.key, currentLang)}
                  style={{
                    display: "block",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: "#111",
                    fontWeight: 600,
                    fontSize: "18px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    border: "1px solid #eee",
                  }}
                  className="tool-card-link"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section style={{ margin: "48px 0" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          {currentLang === "es" ? "Preguntas frecuentes" : currentLang === "pt" ? "Perguntas frequentes" : "Frequently asked questions"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {t.faq.map((item, i) => (
            <details
              key={i}
              style={{
                background: "#f9f9f9",
                padding: "16px 20px",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
            >
              <summary style={{ fontWeight: 600, cursor: "pointer", color: "#111", fontSize: "16px" }}>
                {item.q}
              </summary>
              <p style={{ marginTop: "12px", color: "#444", lineHeight: "1.7" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        style={{
          marginBottom: "32px",
          padding: "40px 32px",
          backgroundColor: "#f5f5ff",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111",
            margin: "0 0 12px",
          }}
        >
          {t.ctaTitle}
        </h2>
        <p
          style={{
            color: "#444",
            fontSize: "17px",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          {t.ctaSubtitle}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={getLocalizedRoute(t.ctaButtons.primary.routeKey as RouteKey, currentLang)}
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            {t.ctaButtons.primary.label}
          </Link>
          <Link
            href={getLocalizedRoute(t.ctaButtons.secondary.routeKey as RouteKey, currentLang)}
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "white",
              color: "#4f46e5",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
              border: "1px solid #c7d2fe",
            }}
          >
            {t.ctaButtons.secondary.label}
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          .tool-card-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border-color: #ddd;
          }
        `
      }} />
    </main>
  );
}
