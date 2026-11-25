import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { normalizeLang, getLocalizedRoute, type SupportedLang } from "@/lib/routes";
import { buildSeoMetadata, getAbsoluteUrl } from "@/lib/seo";
import { getCategory, getCategoryName, getSoundAudioUrl, getSoundById, listSounds } from "@/lib/sounds-db";
import { SoundPlayerProvider } from "@/components/sounds/SoundPlayerProvider";
import SoundCard from "@/components/sounds/SoundCard";
import SoundWaveformPlayer from "@/components/sounds/SoundWaveformPlayer";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: string; category: string; slug: string }>;
};

const copy: Record<
  SupportedLang,
  { relatedTitle: string; backToLibrary: string; breadcrumbHome: string; breadcrumbLibrary: string }
> = {
  es: { relatedTitle: "Sonidos relacionados", backToLibrary: "Ver toda la biblioteca de sonidos", breadcrumbHome: "Inicio", breadcrumbLibrary: "Sonidos" },
  en: { relatedTitle: "Related sounds", backToLibrary: "Browse the full sound library", breadcrumbHome: "Home", breadcrumbLibrary: "Sounds" },
  pt: { relatedTitle: "Sons relacionados", backToLibrary: "Ver toda a biblioteca de sons", breadcrumbHome: "Início", breadcrumbLibrary: "Sons" },
};

function soundPath(lang: SupportedLang, categoryId: string, slug: string): string {
  return `${getLocalizedRoute("soundsLibrary", lang)}/${categoryId}/${slug}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const currentLang = normalizeLang(lang);
  const sound = await getSoundById(slug);
  if (!sound) return {};

  const category = await getCategory(sound.category_id);
  const categoryLabel = category ? getCategoryName(category, currentLang) : sound.category_id;

  const descriptions: Record<SupportedLang, string> = {
    es: `Escucha y descarga gratis "${sound.title}", un sonido de ${categoryLabel.toLowerCase()} para tus videos de TikTok, Reels y Shorts.`,
    en: `Listen to and download "${sound.title}" for free, a ${categoryLabel.toLowerCase()} sound for your TikTok, Reels and Shorts videos.`,
    pt: `Ouça e baixe grátis "${sound.title}", um som de ${categoryLabel.toLowerCase()} para seus vídeos de TikTok, Reels e Shorts.`,
  };

  return buildSeoMetadata({
    title: `${sound.title} — ${categoryLabel}`,
    description: descriptions[currentLang],
    routeKey: "soundsLibrary",
    lang: currentLang,
    canonicalPath: soundPath(currentLang, sound.category_id, sound.id),
    languagePaths: {
      es: soundPath("es", sound.category_id, sound.id),
      en: soundPath("en", sound.category_id, sound.id),
      pt: soundPath("pt", sound.category_id, sound.id),
    },
    openGraph: {
      type: "music.song",
    },
  });
}

export default async function SoundDetailPage({ params }: Props) {
  const { lang, category: categoryParam, slug } = await params;
  const currentLang = normalizeLang(lang);
  const t = copy[currentLang];

  const sound = await getSoundById(slug);
  if (!sound) notFound();

  // Keep the category segment canonical: redirect if a sound was moved to a
  // different category or someone links to the wrong one.
  if (categoryParam !== sound.category_id) {
    redirect(soundPath(currentLang, sound.category_id, sound.id));
  }

  const category = await getCategory(sound.category_id);
  const categoryLabel = category ? getCategoryName(category, currentLang) : sound.category_id;
  const basePath = getLocalizedRoute("soundsLibrary", currentLang);
  const pagePath = soundPath(currentLang, sound.category_id, sound.id);
  const pageUrl = getAbsoluteUrl(pagePath);
  const audioUrl = getSoundAudioUrl(sound.r2_key);
  const embedUrl = getAbsoluteUrl(`/embed/${sound.id}?lang=${currentLang}`);
  const homeUrl = getLocalizedRoute("home", currentLang);

  const { sounds: related } = await listSounds({ category: sound.category_id, limit: 7 });
  const relatedFiltered = related.filter((s) => s.id !== sound.id).slice(0, 6);

  const audioSchema = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    name: sound.title,
    contentUrl: audioUrl,
    embedUrl,
    duration: `PT${Math.round(sound.duration_ms / 1000)}S`,
    uploadDate: sound.created_at,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/ListenAction",
        userInteractionCount: sound.play_count,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/DownloadAction",
        userInteractionCount: sound.download_count,
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: getAbsoluteUrl(homeUrl) },
      { "@type": "ListItem", position: 2, name: t.breadcrumbLibrary, item: getAbsoluteUrl(basePath) },
      { "@type": "ListItem", position: 3, name: categoryLabel, item: getAbsoluteUrl(`${basePath}/${sound.category_id}`) },
      { "@type": "ListItem", position: 4, name: sound.title, item: pageUrl },
    ],
  };

  return (
    <SoundPlayerProvider>
      <main className="sound-detail-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <nav className="sound-detail-breadcrumb" aria-label="breadcrumb">
          <Link href={homeUrl}>{t.breadcrumbHome}</Link> / <Link href={basePath}>{t.breadcrumbLibrary}</Link> /{" "}
          <Link href={`${basePath}?categoria=${sound.category_id}`}>{categoryLabel}</Link> / {sound.title}
        </nav>

        <Link href={basePath} className="sound-detail-back">
          ← {t.backToLibrary}
        </Link>

        <section className="sound-detail-hero">
          <SoundWaveformPlayer
            sound={{
              id: sound.id,
              title: sound.title,
              audioUrl,
              durationMs: sound.duration_ms,
              playCount: sound.play_count,
              downloadCount: sound.download_count,
            }}
            lang={currentLang}
            pageUrl={pageUrl}
            embedUrl={embedUrl}
          />
          <p className="sound-detail-meta">{categoryLabel}</p>
        </section>

        {relatedFiltered.length > 0 && (
          <section className="sounds-related">
            <h2>{t.relatedTitle}</h2>
            <div className="sounds-grid">
              {relatedFiltered.map((related) => (
                <SoundCard
                  key={related.id}
                  sound={{
                    id: related.id,
                    title: related.title,
                    categoryId: related.category_id,
                    categoryLabel,
                    audioUrl: getSoundAudioUrl(related.r2_key),
                    durationMs: related.duration_ms,
                    playCount: related.play_count,
                  }}
                  lang={currentLang}
                  pageUrl={getAbsoluteUrl(soundPath(currentLang, related.category_id, related.id))}
                  titleHref={soundPath(currentLang, related.category_id, related.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </SoundPlayerProvider>
  );
}
