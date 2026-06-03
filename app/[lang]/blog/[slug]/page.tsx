import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { normalizeLang, type SupportedLang } from "@/lib/routes";
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
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <BlogPostLayout post={post} lang={currentLang} relatedPosts={relatedPosts} />
  );
}
