import { notFound } from "next/navigation";
import { getLocalizedRoute, normalizeLang, type SupportedLang } from "@/lib/routes";
import { getAbsoluteUrl } from "@/lib/seo";
import { getSoundAudioUrl, getSoundById } from "@/lib/sounds-db";
import { SoundPlayerProvider } from "@/components/sounds/SoundPlayerProvider";
import SoundCard from "@/components/sounds/SoundCard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

const poweredByLabel: Record<SupportedLang, string> = {
  es: "Más sonidos en Clipnexo",
  en: "More sounds on Clipnexo",
  pt: "Mais sons no Clipnexo",
};

export default async function SoundEmbedPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const currentLang = normalizeLang(lang || "es");

  const sound = await getSoundById(slug);
  if (!sound) notFound();

  return (
    <SoundPlayerProvider>
      <div style={{ padding: 10, background: "#fff" }}>
        <SoundCard
          sound={{
            id: sound.id,
            title: sound.title,
            categoryId: sound.category_id,
            categoryLabel: sound.category_id,
            audioUrl: getSoundAudioUrl(sound.r2_key),
            durationMs: sound.duration_ms,
            playCount: sound.play_count,
          }}
          lang={currentLang}
          pageUrl={getAbsoluteUrl(`${getLocalizedRoute("soundsLibrary", currentLang)}/${sound.category_id}/${sound.id}`)}
        />
        <a
          href="https://clipnexo.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center", marginTop: 8, fontSize: 11, color: "#8b5cf6", textDecoration: "none" }}
        >
          {poweredByLabel[currentLang]}
        </a>
      </div>
    </SoundPlayerProvider>
  );
}
