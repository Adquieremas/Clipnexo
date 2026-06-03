import Link from "next/link";
import type { BlogPost } from "@/lib/blog-content";
import { getBlogCategoryLabel, getBlogUrl } from "@/lib/blog-content";
import { normalizeLang, type SupportedLang } from "@/lib/routes";

type Props = {
  post: BlogPost;
  lang: string;
};

export default function BlogCard({ post, lang }: Props) {
  const currentLang = normalizeLang(lang) as SupportedLang;
  const href = getBlogUrl(post, currentLang);
  const categoryLabel = getBlogCategoryLabel(post.category, currentLang);

  return (
    <article className="blog-card">
      <div className="blog-card-category">{categoryLabel}</div>
      <Link href={href} className="blog-card-link">
        <h3 className="blog-card-title">{post.content[currentLang].title}</h3>
      </Link>
      <p className="blog-card-excerpt">{post.content[currentLang].excerpt}</p>
      <div className="blog-card-meta">
        <span className="blog-card-reading">{post.readingTime} min</span>
        <span className="blog-card-date">{post.updatedAt.slice(0, 10)}</span>
      </div>
    </article>
  );
}
