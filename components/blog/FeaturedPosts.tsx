import type { BlogPost } from "@/lib/blog-content";
import { getBlogCategoryLabel, getBlogUrl } from "@/lib/blog-content";
import { normalizeLang, type SupportedLang } from "@/lib/routes";
import Link from "next/link";

type Props = {
  posts: BlogPost[];
  lang: string;
};

export default function FeaturedPosts({ posts, lang }: Props) {
  const currentLang = normalizeLang(lang) as SupportedLang;

  return (
    <section className="blog-featured">
      {posts.map((post) => {
        const href = getBlogUrl(post, currentLang);
        const categoryLabel = getBlogCategoryLabel(post.category, currentLang);

        return (
          <article key={post.slugKey} className="blog-featured-card">
            <div className="blog-featured-category">{categoryLabel}</div>
            <Link href={href} className="blog-featured-link">
              <h3>{post.content[currentLang].title}</h3>
            </Link>
            <p className="blog-featured-excerpt">{post.content[currentLang].excerpt}</p>
            <div className="blog-card-meta">
              <span className="blog-card-reading">{post.readingTime} min</span>
              <span className="blog-card-date">{post.updatedAt.slice(0, 10)}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
