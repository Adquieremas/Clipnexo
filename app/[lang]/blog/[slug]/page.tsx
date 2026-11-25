import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getLocalizedRoute, normalizeLang, type RouteKey, type SupportedLang } from "@/lib/routes";
import { getAbsoluteUrl } from "@/lib/seo";
import {
  getBlogPostBySlug,
  getBlogUrl,
  getBlogAlternates,
  getRelatedPosts,
  getAllBlogSlugs,
} from "@/lib/blog-content";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

const legacyBlogRedirects: Record<SupportedLang, Record<string, RouteKey>> = {
  es: {
    "mejor-descargador-tiktok-sin-marca-agua": "tiktokTools",
    "clipnexo-vs-snaptik": "tiktokTools",
    "clipnexo-vs-ssstik": "tiktokTools",
    "como-descargar-tiktok-sin-marca-agua": "tiktokTools",
    "tiktok-a-mp3-extraer-audio": "soundsLibrary",
  },
  en: {
    "best-tiktok-downloader-without-watermark": "tiktokTools",
    "clipnexo-vs-snaptik": "tiktokTools",
    "clipnexo-vs-ssstik": "tiktokTools",
    "how-to-download-tiktok-without-watermark": "tiktokTools",
    "tiktok-to-mp3-extract-audio": "soundsLibrary",
  },
  pt: {
    "melhor-baixador-tiktok-sem-marca-dagua": "tiktokTools",
    "clipnexo-vs-snaptik": "tiktokTools",
    "clipnexo-vs-ssstik": "tiktokTools",
    "como-baixar-tiktok-sem-marca-dagua": "tiktokTools",
    "tiktok-para-mp3-extrair-audio": "soundsLibrary",
  },
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map(({ slug, lang }) => ({
    lang,
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const currentLang = normalizeLang(lang);
  const post = getBlogPostBySlug(slug, currentLang);

  if (!post) {
    return {};
  }

  const data = post.content[currentLang as SupportedLang];
  const canonicalUrl = getAbsoluteUrl(getBlogUrl(post, currentLang));

  return {
    title: data.title,
    description: data.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getBlogAlternates(post),
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: "Clipnexo",
      locale: currentLang === "es" ? "es_ES" : currentLang === "pt" ? "pt_BR" : "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLang = normalizeLang(lang) as SupportedLang;
  const post = getBlogPostBySlug(slug, currentLang);

  if (!post) {
    const redirectRoute = legacyBlogRedirects[currentLang][slug];
    if (redirectRoute) {
      permanentRedirect(getLocalizedRoute(redirectRoute, currentLang));
    }
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <BlogPostLayout post={post} lang={currentLang} relatedPosts={relatedPosts} />
  );
}
