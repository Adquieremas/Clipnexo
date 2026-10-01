import { redirect } from "next/navigation";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

// The Instagram downloader was retired (yt-dlp required an Instagram login
// session that expired and isn't being maintained). This route is kept as a
// redirect, not removed outright, so existing links/bookmarks/search results
// don't hit a dead page.
export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);
  redirect(getLocalizedRoute("instagramTools", currentLang));
}
