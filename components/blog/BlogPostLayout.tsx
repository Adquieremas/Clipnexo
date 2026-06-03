import type { ReactNode } from "react";
import Link from "next/link";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";
import { getAbsoluteUrl } from "@/lib/seo";
import {
  getBlogUrl,
  getBlogCategoryLabel,
  type BlogPost,
  type BlogPostSection,
} from "@/lib/blog-content";
import BlogBreadcrumbs from "./BlogBreadcrumbs";

type Props = {
  post: BlogPost;
  lang: string;
  relatedPosts: BlogPost[];
  children?: ReactNode;
};

function SectionRenderer({ section, lang }: { section: BlogPostSection; lang: string }) {
  switch (section.type) {
    case "h2":
      return <h2>{section.text}</h2>;
    case "h3":
      return <h3>{section.text}</h3>;
    case "p":
      return <p>{section.text}</p>;
    case "ul":
      return (
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta-tools": {
      const currentLang = normalizeLang(lang);
      return (
        <div className="blog-cta-tools">
          <p>{section.text}</p>
          <div className="blog-cta-links">
            {section.links.map((link) => (
              <Link
                key={link.routeKey}
                href={getLocalizedRoute(link.routeKey, currentLang)}
                className="blog-cta-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    case "note":
      return (
        <div className="blog-note">
          <p>{section.text}</p>
        </div>
      );
    default:
      return null;
  }
}

function RelatedToolsSection({ post, lang }: { post: BlogPost; lang: string }) {
  const currentLang = normalizeLang(lang);

  const sectionTitle: Record<string, string> = {
    es: "Herramientas relacionadas",
    en: "Related tools",
    pt: "Ferramentas relacionadas",
  };

  if (!post.relatedToolRouteKeys?.length) return null;

  const toolLabels: Record<string, Record<string, string>> = {
    video: { es: "Descargar TikTok", en: "Download TikTok", pt: "Baixar TikTok" },
    mp3: { es: "TikTok a MP3", en: "TikTok to MP3", pt: "TikTok para MP3" },
    withoutWatermark: { es: "Sin marca de agua", en: "Without watermark", pt: "Sem marca d'água" },
    tiktokHashtags: { es: "Generador de hashtags", en: "Hashtag generator", pt: "Gerador de hashtags" },
    tiktokCaptions: { es: "Generador de captions", en: "Caption generator", pt: "Gerador de legendas" },
    tiktokHooks: { es: "Ganchos virales", en: "Hook generator", pt: "Ganchos virais" },
    tiktokIdeas: { es: "Ideas para TikTok", en: "TikTok ideas", pt: "Ideias para TikTok" },
    tiktokBio: { es: "Bio para TikTok", en: "TikTok bio", pt: "Bio para TikTok" },
    youtubeTitleGenerator: { es: "Títulos para YouTube", en: "YouTube titles", pt: "Títulos para YouTube" },
    youtubeTagGenerator: { es: "Etiquetas para YouTube", en: "YouTube tags", pt: "Tags para YouTube" },
    youtubeHashtagGenerator: { es: "Hashtags para YouTube", en: "YouTube hashtags", pt: "Hashtags para YouTube" },
    youtubeDescriptionGenerator: { es: "Descripciones para YouTube", en: "YouTube descriptions", pt: "Descrições para YouTube" },
    youtubeThumbnailDownloader: { es: "Miniaturas YouTube", en: "YouTube thumbnails", pt: "Miniaturas YouTube" },
    instagramCaptionGenerator: { es: "Captions Instagram", en: "Instagram captions", pt: "Legendas Instagram" },
    instagramHashtagGenerator: { es: "Hashtags Instagram", en: "Instagram hashtags", pt: "Hashtags Instagram" },
    shortVideoScriptGenerator: { es: "Guiones videos cortos", en: "Short video scripts", pt: "Roteiros vídeos curtos" },
    socialMediaCharacterCounter: { es: "Contador caracteres", en: "Character counter", pt: "Contador caracteres" },
  };

  return (
    <section className="blog-section blog-section-related-tools">
      <h2>{sectionTitle[currentLang] || sectionTitle.es}</h2>
      <div className="blog-tools-grid">
        {post.relatedToolRouteKeys.map((routeKey) => (
          <Link
            key={routeKey}
            href={getLocalizedRoute(routeKey, currentLang)}
            className="blog-tool-card"
          >
            {toolLabels[routeKey]?.[currentLang] || routeKey}
          </Link>
        ))}
      </div>
    </section>
  );
}

function RelatedPostsSection({ posts, lang }: { posts: BlogPost[]; lang: string }) {
  if (!posts.length) return null;

  const sectionTitle: Record<string, string> = {
    es: "Artículos relacionados",
    en: "Related articles",
    pt: "Artigos relacionados",
  };

  const currentLang = normalizeLang(lang);

  return (
    <section className="blog-section blog-section-related">
      <h2>{sectionTitle[currentLang] || sectionTitle.es}</h2>
      <div className="blog-related-grid">
        {posts.map((related) => (
          <Link
            key={related.slugKey}
            href={getBlogUrl(related, lang)}
            className="blog-related-card"
          >
            <span className="blog-related-category">
              {getBlogCategoryLabel(related.category, lang)}
            </span>
            <span className="blog-related-title">
              {related.content[normalizeLang(lang) as "es" | "en" | "pt"].title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ faq, faqTitle }: { faq: { q: string; a: string }[]; faqTitle: string }) {
  if (!faq?.length) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="blog-section blog-section-faq">
      <h2>{faqTitle}</h2>
      <div className="blog-faq-list">
        {faq.map((item) => (
          <details key={item.q} className="blog-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}

export default function BlogPostLayout({ post, lang, relatedPosts }: Props) {
  const currentLang = normalizeLang(lang) as "es" | "en" | "pt";
  const data = post.content[currentLang];
  const blogUrl = getBlogUrl(post, currentLang);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.h1,
    description: data.description,
    url: getAbsoluteUrl(blogUrl),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Clipnexo",
      url: "https://clipnexo.com",
    },
  };

  return (
    <main className="blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <BlogBreadcrumbs
        crumbs={[
          { label: "Clipnexo", href: `/${currentLang}` },
          { label: "Blog", href: `/${currentLang}/blog` },
          { label: data.title },
        ]}
      />

      <article className="blog-post-article">
        <header className="blog-post-header">
          <span className="blog-post-category">
            {getBlogCategoryLabel(post.category, currentLang)}
          </span>
          <h1>{data.h1}</h1>
          <p className="blog-post-description">{data.description}</p>
          <div className="blog-post-meta">
            <span>{post.readingTime} {currentLang === "es" ? "min de lectura" : currentLang === "en" ? "min read" : "min de leitura"}</span>
            <span>{currentLang === "es" ? "Actualizado" : currentLang === "en" ? "Updated" : "Atualizado"}: {post.updatedAt.slice(0, 10)}</span>
          </div>
        </header>

        <div className="blog-post-body">
          {data.sections.map((section, i) => (
            <div key={i} className="blog-post-section">
              <SectionRenderer section={section} lang={currentLang} />
            </div>
          ))}
        </div>

        <section className="blog-section blog-section-faq">
          <FAQSection faq={data.faq} faqTitle={data.faqTitle} />
        </section>

        <RelatedToolsSection post={post} lang={currentLang} />
        <RelatedPostsSection posts={relatedPosts} lang={currentLang} />
      </article>
    </main>
  );
}
