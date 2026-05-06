import type { Metadata } from "next";
import Link from "next/link";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";

type Lang = "es" | "en" | "pt";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const pageContent = {
  es: {
    metaTitle: "Todas las herramientas de Clipnexo",
    metaDescription: "Descubre nuestra colección completa de herramientas gratuitas para TikTok, YouTube y redes sociales. Optimiza tu contenido hoy.",
    h1: "Herramientas de Clipnexo",
    lead: "Explora nuestra colección de herramientas gratuitas organizadas por plataforma para mejorar tu contenido digital.",
    clusters: {
      tiktok: "Herramientas para TikTok",
      youtube: "Herramientas para YouTube",
      instagram: "Herramientas para Instagram",
      facebook: "Herramientas para Facebook",
      shortVideo: "Videos Cortos",
      social: "Redes Sociales",
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
    }
  },
  en: {
    metaTitle: "All Clipnexo Tools - Optimize Your Social Media",
    metaDescription: "Discover our complete collection of free tools for TikTok, YouTube, Instagram and Facebook. Optimize your content today.",
    h1: "Clipnexo Tools",
    lead: "Explore our collection of free tools organized by platform to improve your digital content strategy.",
    clusters: {
      tiktok: "TikTok Tools",
      youtube: "YouTube Tools",
      instagram: "Instagram Tools",
      facebook: "Facebook Tools",
      shortVideo: "Short Video Tools",
      social: "Social Media Tools",
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
    }
  },
  pt: {
    metaTitle: "Todas as ferramentas do Clipnexo - Otimize suas redes",
    metaDescription: "Descubra nossa coleção completa de ferramentas gratuitas para TikTok, YouTube, Instagram e Facebook. Otimize seu conteúdo hoje.",
    h1: "Ferramentas do Clipnexo",
    lead: "Explore nossa coleção de ferramentas gratuitas organizadas por plataforma para melhorar sua estratégia digital.",
    clusters: {
      tiktok: "Ferramentas para TikTok",
      youtube: "Ferramentas para YouTube",
      instagram: "Ferramentas para Instagram",
      facebook: "Ferramentas para Facebook",
      shortVideo: "Ferramentas para Vídeos Curtos",
      social: "Ferramentas para Redes Sociais",
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
