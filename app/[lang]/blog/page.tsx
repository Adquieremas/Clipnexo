import type { Metadata } from "next";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute, type SupportedLang } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import {
  getBlogPostsByLang,
  blogCategories,
} from "@/lib/blog-content";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPosts from "@/components/blog/FeaturedPosts";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  const meta = {
    es: {
      title: "Blog Clipnexo: guías y herramientas gratis",
      description:
        "Lee guías, comparativas y consejos sobre TikTok, YouTube, Instagram, Facebook y herramientas online para crear mejor contenido.",
    },
    en: {
      title: "Clipnexo Blog: guides and tools for creators",
      description:
        "Read guides, comparisons and tips about TikTok, YouTube, Instagram, Facebook and online tools for better content creation.",
    },
    pt: {
      title: "Blog Clipnexo: guias e ferramentas para criadores",
      description:
        "Leia guias, comparativos e dicas sobre TikTok, YouTube, Instagram, Facebook e ferramentas online para criar conteúdo melhor.",
    },
  };

  return buildSeoMetadata({
    title: meta[currentLang].title,
    description: meta[currentLang].description,
    routeKey: "blog",
    lang: currentLang,
    robots: {
      index: true,
      follow: true,
    },
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang) as SupportedLang;

  const posts = getBlogPostsByLang(currentLang);
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const navLabels = {
    es: { tools: "Herramientas", video: "Herramientas de TikTok", blog: "Blog" },
    en: { tools: "Tools", video: "TikTok tools", blog: "Blog" },
    pt: { tools: "Ferramentas", video: "Ferramentas de TikTok", blog: "Blog" },
  };
  const t = navLabels[currentLang] ?? navLabels.es;

  return (
    <main className="blog-index-page">
      <section className="blog-hero">
        <h1 className="blog-hero-title">
          {currentLang === "es"
            ? "Blog de Clipnexo: guías y herramientas para creadores"
            : currentLang === "en"
              ? "Clipnexo Blog: guides and tools for creators"
              : "Blog do Clipnexo: guias e ferramentas para criadores"}
        </h1>
        <p className="blog-hero-desc">
          {currentLang === "es"
            ? "Lee guías, comparativas y consejos sobre TikTok, YouTube, Instagram, Facebook y herramientas online para crear mejor contenido."
            : currentLang === "en"
              ? "Read guides, comparisons and tips about TikTok, YouTube, Instagram, Facebook and online tools for better content creation."
              : "Leia guias, comparativos e dicas sobre TikTok, YouTube, Instagram, Facebook e ferramentas online para criar conteúdo melhor."}
        </p>
        <div className="blog-hero-ctas">
          <Link href={getLocalizedRoute("tools", currentLang)} className="blog-cta-primary">
            {t.tools}
          </Link>
          <Link href={getLocalizedRoute("tiktokTools", currentLang)} className="blog-cta-secondary">
            {t.video}
          </Link>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="blog-section blog-section-featured">
          <h2 className="blog-section-title">
            {currentLang === "es"
              ? "Artículos destacados"
              : currentLang === "en"
                ? "Featured articles"
                : "Artigos em destaque"}
          </h2>
          <FeaturedPosts posts={featuredPosts} lang={currentLang} />
        </section>
      )}

      <section className="blog-section blog-section-categories">
        <h2 className="blog-section-title">
          {currentLang === "es"
            ? "Categorías"
            : currentLang === "en"
              ? "Categories"
              : "Categorias"}
        </h2>
        <div className="blog-categories-grid">
          {blogCategories.map((cat) => (
            <span key={cat.key} className="blog-category-tag">
              {cat.label[currentLang]}
            </span>
          ))}
        </div>
      </section>

      <section className="blog-section blog-section-list">
        <h2 className="blog-section-title">
          {currentLang === "es"
            ? "Todos los artículos"
            : currentLang === "en"
              ? "All articles"
              : "Todos os artigos"}
        </h2>
        <div className="blog-grid">
          {regularPosts.map((post) => (
            <BlogCard key={post.slugKey} post={post} lang={currentLang} />
          ))}
          {featuredPosts.map((post) => (
            <BlogCard key={post.slugKey} post={post} lang={currentLang} />
          ))}
        </div>
      </section>

      <section className="blog-section blog-section-interlinks">
        <h2 className="blog-section-title">
          {currentLang === "es"
            ? "Explora las herramientas de Clipnexo"
            : currentLang === "en"
              ? "Explore Clipnexo tools"
              : "Explore as ferramentas do Clipnexo"}
        </h2>
        <div className="blog-interlinks-grid">
          <Link href={getLocalizedRoute("tiktokIdeas", currentLang)} className="blog-interlink">
            {currentLang === "es"
              ? "Ideas para TikTok"
              : currentLang === "en"
                ? "TikTok video ideas"
                : "Ideias para TikTok"}
          </Link>
          <Link href={getLocalizedRoute("tiktokBio", currentLang)} className="blog-interlink">
            {currentLang === "es"
              ? "Bio para TikTok"
              : currentLang === "en"
                ? "TikTok bio generator"
                : "Bio para TikTok"}
          </Link>
          <Link href={getLocalizedRoute("tools", currentLang)} className="blog-interlink">
            {currentLang === "es"
              ? "Todas las herramientas"
              : currentLang === "en"
                ? "All tools"
                : "Todas as ferramentas"}
          </Link>
          <Link href={getLocalizedRoute("tiktokHashtags", currentLang)} className="blog-interlink">
            {currentLang === "es"
              ? "Generador de hashtags"
              : currentLang === "en"
                ? "Hashtag generator"
                : "Gerador de hashtags"}
          </Link>
          <Link href={getLocalizedRoute("youtubeTitleGenerator", currentLang)} className="blog-interlink">
            {currentLang === "es"
              ? "Títulos para YouTube"
              : currentLang === "en"
                ? "YouTube titles"
                : "Títulos para YouTube"}
          </Link>
        </div>
      </section>
    </main>
  );
}
