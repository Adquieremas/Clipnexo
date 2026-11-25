import type { Metadata } from "next";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import { soundsHubContent } from "@/lib/sounds-content";
import { fitSeoDescription } from "@/lib/media-seo";
import { getCategoryName, getSoundAudioUrl, listCategories, listSounds } from "@/lib/sounds-db";
import { SoundPlayerProvider } from "@/components/sounds/SoundPlayerProvider";
import SoundCard from "@/components/sounds/SoundCard";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const t = soundsHubContent[currentLang];

  const metadata = buildSeoMetadata({
    title: t.metaTitle,
    description: fitSeoDescription(t.metaDescription, currentLang),
    routeKey: "soundsLibrary",
    lang: currentLang,
  });
  return { ...metadata, title: { absolute: t.metaTitle } };
}

export default async function SoundsHubPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  const sp = await searchParams;
  const t = soundsHubContent[currentLang];

  const category = typeof sp.categoria === "string" ? sp.categoria : undefined;
  const search = typeof sp.q === "string" ? sp.q : undefined;
  const sort = sp.orden === "populares" ? "popular" : "recent";
  const page = Math.max(1, Number(sp.pagina) || 1);

  const [categories, { sounds, total }] = await Promise.all([
    listCategories(),
    listSounds({ category, search, sort, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const basePath = getLocalizedRoute("soundsLibrary", currentLang);

  function buildPageHref(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = { categoria: category, q: search, orden: sp.orden as string | undefined, pagina: undefined as string | undefined, ...overrides };
    if (merged.categoria) params.set("categoria", merged.categoria);
    if (merged.q) params.set("q", merged.q);
    if (merged.orden) params.set("orden", merged.orden);
    if (merged.pagina) params.set("pagina", merged.pagina);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sounds.map((sound, index) => ({
      "@type": "ListItem",
      position: (page - 1) * PAGE_SIZE + index + 1,
      url: `${basePath}/${sound.category_id}/${sound.id}`,
      name: sound.title,
    })),
  };

  return (
    <SoundPlayerProvider>
      <main className="sounds-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

        <section className="sounds-hero">
          <h1>{t.h1}</h1>
          <p>{t.intro}</p>
        </section>

        <form className="sounds-filters" method="get">
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder={t.searchPlaceholder}
            className="sounds-search-input"
            aria-label={t.searchPlaceholder}
          />
          <select name="categoria" defaultValue={category || ""} className="sounds-category-select">
            <option value="">{t.allCategories}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getCategoryName(cat, currentLang)}
              </option>
            ))}
          </select>
          <div className="sounds-sort-tabs">
            <Link
              href={buildPageHref({ orden: undefined })}
              className={`sounds-sort-tab${sort === "recent" ? " sounds-sort-tab-active" : ""}`}
            >
              {t.sortRecent}
            </Link>
            <Link
              href={buildPageHref({ orden: "populares" })}
              className={`sounds-sort-tab${sort === "popular" ? " sounds-sort-tab-active" : ""}`}
            >
              {t.sortPopular}
            </Link>
          </div>
          <button type="submit" className="sounds-search-submit">
            {t.searchPlaceholder}
          </button>
        </form>

        {sounds.length === 0 ? (
          <p className="sounds-empty">{t.noResults}</p>
        ) : (
          <div className="sounds-grid">
            {sounds.map((sound) => (
              <SoundCard
                key={sound.id}
                sound={{
                  id: sound.id,
                  title: sound.title,
                  categoryId: sound.category_id,
                  categoryLabel: getCategoryName(
                    categories.find((c) => c.id === sound.category_id) || categories[0],
                    currentLang
                  ),
                  audioUrl: getSoundAudioUrl(sound.r2_key),
                  durationMs: sound.duration_ms,
                  playCount: sound.play_count,
                }}
                lang={currentLang}
                pageUrl={`${basePath}/${sound.category_id}/${sound.id}`}
                titleHref={`${basePath}/${sound.category_id}/${sound.id}`}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="sounds-pagination" aria-label="pagination">
            {page > 1 && (
              <Link href={buildPageHref({ pagina: String(page - 1) })} className="sounds-page-link">
                {t.prev}
              </Link>
            )}
            <span className="sounds-page-indicator">
              {t.page} {page} {t.of} {totalPages}
            </span>
            {page < totalPages && (
              <Link href={buildPageHref({ pagina: String(page + 1) })} className="sounds-page-link">
                {t.next}
              </Link>
            )}
          </nav>
        )}

        <section className="sounds-faq">
          <h2>{t.faqTitle}</h2>
          <div className="home-faq-list">
            {t.faqs.map((faq, i) => (
              <details key={i} className="home-faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </SoundPlayerProvider>
  );
}
