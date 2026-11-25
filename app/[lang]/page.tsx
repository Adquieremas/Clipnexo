import type { Metadata } from "next";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute } from "@/lib/routes";
import { buildSeoMetadata } from "@/lib/seo";
import {
  getCategoryName,
  getPopularSounds,
  getSoundAudioUrl,
  listCategories,
  SoundsDbNotConfiguredError,
} from "@/lib/sounds-db";
import { SoundPlayerProvider } from "@/components/sounds/SoundPlayerProvider";
import SoundCard from "@/components/sounds/SoundCard";
import { MEMES, getMemePosterUrl } from "@/lib/memes-data";
import { EMOJIS, getEmojiUrl } from "@/lib/emojis-data";

// Revalidate periodically so newly uploaded sounds appear in the spotlight
// without requiring a redeploy.
export const revalidate = 300;

type Props = {
  params: Promise<{ lang: string }>;
};

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  heroCtaPrimary: string;
  heroCtaSounds: string;
  soundsTitle: string;
  soundsCta: string;
  searchPlaceholder: string;
  searchCta: string;
  resourcesTitle: string;
  memesLabel: string;
  memesCount: string;
  emojisLabel: string;
  emojisCount: string;
};

const titles: Record<string, string> = {
  es: "Clipnexo: herramientas gratuitas para creadores de contenido",
  en: "Clipnexo: free tools for content creators",
  pt: "Clipnexo: ferramentas gratuitas para criadores de conteúdo",
};

const descriptions: Record<string, string> = {
  es: "Usa Clipnexo para crear hashtags, captions, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook, directo desde tu navegador.",
  en: "Use Clipnexo to create hashtags, captions, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook, right from your browser.",
  pt: "Use o Clipnexo para criar hashtags, legendas, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
};

function getToolRoute(key: Parameters<typeof getLocalizedRoute>[0], lang: string): string {
  return getLocalizedRoute(key, normalizeLang(lang));
}

const pageContent: Record<string, PageContent> = {
  es: {
    metaTitle: "Clipnexo: herramientas gratuitas para creadores",
    metaDescription:
      "Usa Clipnexo para crear hashtags, captions, guiones, títulos y textos para TikTok, YouTube, Instagram y Facebook, directo desde tu navegador.",
    h1: "Herramientas y sonidos gratis para creadores",
    subtitle: "Hashtags, captions, guiones y una biblioteca de sonidos lista para usar.",
    heroCtaPrimary: "Ver herramientas",
    heroCtaSounds: "Explorar sonidos",
    soundsTitle: "Sonidos para tus videos",
    soundsCta: "Ver toda la biblioteca",
    searchPlaceholder: "Buscar sonidos...",
    searchCta: "Buscar",
    resourcesTitle: "Más recursos para creadores",
    memesLabel: "Memes gratis",
    memesCount: `${MEMES.length} memes en video`,
    emojisLabel: "Emojis gratis",
    emojisCount: `${EMOJIS.length} emojis para descargar`,
  },
  en: {
    metaTitle: "Clipnexo: free tools for creators",
    metaDescription:
      "Use Clipnexo to create hashtags, captions, scripts, titles and texts for TikTok, YouTube, Instagram and Facebook, right from your browser.",
    h1: "Free tools and sounds for creators",
    subtitle: "Hashtags, captions, scripts and a ready-to-use sound library.",
    heroCtaPrimary: "View tools",
    heroCtaSounds: "Explore sounds",
    soundsTitle: "Sounds for your videos",
    soundsCta: "Browse the full library",
    searchPlaceholder: "Search sounds...",
    searchCta: "Search",
    resourcesTitle: "More resources for creators",
    memesLabel: "Free memes",
    memesCount: `${MEMES.length} video memes`,
    emojisLabel: "Free emojis",
    emojisCount: `${EMOJIS.length} emojis to download`,
  },
  pt: {
    metaTitle: "Clipnexo: ferramentas gratuitas para criadores",
    metaDescription:
      "Use o Clipnexo para criar hashtags, legendas, roteiros, títulos e textos para TikTok, YouTube, Instagram e Facebook, direto do navegador.",
    h1: "Ferramentas e sons gratuitos para criadores",
    subtitle: "Hashtags, legendas, roteiros e uma biblioteca de sons pronta para usar.",
    heroCtaPrimary: "Ver ferramentas",
    heroCtaSounds: "Explorar sons",
    soundsTitle: "Sons para seus vídeos",
    soundsCta: "Ver toda a biblioteca",
    searchPlaceholder: "Buscar sons...",
    searchCta: "Buscar",
    resourcesTitle: "Mais recursos para criadores",
    memesLabel: "Memes grátis",
    memesCount: `${MEMES.length} memes em vídeo`,
    emojisLabel: "Emojis grátis",
    emojisCount: `${EMOJIS.length} emojis para baixar`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  return buildSeoMetadata({
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    routeKey: "home",
    lang: currentLang,
  });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  const t = pageContent[currentLang];

  const toolsUrl = getToolRoute("tools", currentLang);
  const soundsUrl = getToolRoute("soundsLibrary", currentLang);
  const memesUrl = getToolRoute("memesLibrary", currentLang);
  const emojisUrl = getToolRoute("emojiLibrary", currentLang);

  const memePreviews = [40, 90, 150, 210].map((i) => MEMES[i % MEMES.length]);
  const emojiPreviews = [10, 35, 60, 85].map((i) => EMOJIS[i % EMOJIS.length]);

  let popularSounds: Awaited<ReturnType<typeof getPopularSounds>> = [];
  let soundCategories: Awaited<ReturnType<typeof listCategories>> = [];
  try {
    [popularSounds, soundCategories] = await Promise.all([getPopularSounds(8), listCategories()]);
  } catch (error) {
    if (!(error instanceof SoundsDbNotConfiguredError)) throw error;
    // SOUNDS_DB not provisioned yet (e.g. during initial local dev) — hide the spotlight gracefully.
  }

  return (
    <main className="home-page">
      <section className="home-hero-section" aria-labelledby="home-hero-title">
        <div className="home-hero">
          <h1 id="home-hero-title">{t.h1}</h1>
          <p className="home-hero-sub">{t.subtitle}</p>
          <div className="home-cta-actions">
            <Link href={soundsUrl} className="home-hero-cta-primary">
              {t.heroCtaSounds}
            </Link>
            <Link href={toolsUrl} className="home-hero-cta-secondary">
              {t.heroCtaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* SOUNDS SPOTLIGHT */}
      {popularSounds.length > 0 && (
        <SoundPlayerProvider>
          <section className="home-section home-sounds-section">
            <div className="home-section-header">
              <h2>{t.soundsTitle}</h2>
              <Link href={soundsUrl} className="home-section-link">
                {t.soundsCta}
              </Link>
            </div>

            <form action={soundsUrl} method="get" className="home-sounds-search">
              <input
                type="search"
                name="q"
                placeholder={t.searchPlaceholder}
                className="home-sounds-search-input"
                aria-label={t.searchPlaceholder}
              />
              <button type="submit" className="home-sounds-search-btn">
                {t.searchCta}
              </button>
            </form>

            {soundCategories.length > 0 && (
              <div className="home-sounds-categories">
                {soundCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`${soundsUrl}?categoria=${category.id}`}
                    className="home-sounds-category-chip"
                  >
                    {getCategoryName(category, currentLang)}
                  </Link>
                ))}
              </div>
            )}

            <div className="sounds-grid">
              {popularSounds.map((sound) => {
                const category = soundCategories.find((c) => c.id === sound.category_id);
                return (
                  <SoundCard
                    key={sound.id}
                    sound={{
                      id: sound.id,
                      title: sound.title,
                      categoryId: sound.category_id,
                      categoryLabel: category ? getCategoryName(category, currentLang) : sound.category_id,
                      audioUrl: getSoundAudioUrl(sound.r2_key),
                      durationMs: sound.duration_ms,
                      playCount: sound.play_count,
                    }}
                    lang={currentLang}
                    pageUrl={`${soundsUrl}/${sound.category_id}/${sound.id}`}
                    titleHref={`${soundsUrl}/${sound.category_id}/${sound.id}`}
                  />
                );
              })}
            </div>
          </section>
        </SoundPlayerProvider>
      )}

      {/* OTHER RESOURCES (memes, emojis) */}
      <section className="home-section">
        <div className="home-section-header">
          <h2>{t.resourcesTitle}</h2>
        </div>
        <div className="home-resources-grid">
          <Link href={memesUrl} className="home-resource-card">
            <div className="home-resource-preview">
              {memePreviews.map((meme) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={meme.id}
                  src={getMemePosterUrl(meme)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="home-resource-thumb"
                />
              ))}
            </div>
            <div className="home-resource-info">
              <h3>{t.memesLabel}</h3>
              <span>{t.memesCount}</span>
            </div>
          </Link>

          <Link href={emojisUrl} className="home-resource-card">
            <div className="home-resource-preview home-resource-preview-emoji">
              {emojiPreviews.map((emoji) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={emoji.id}
                  src={getEmojiUrl(emoji.r2Key)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="home-resource-thumb"
                />
              ))}
            </div>
            <div className="home-resource-info">
              <h3>{t.emojisLabel}</h3>
              <span>{t.emojisCount}</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
