import type { ReactNode } from "react";
import { unstable_cache } from "next/cache";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { listCategories, type SoundCategory } from "@/lib/sounds-db";

// Cached across requests: the nav's categories submenu doesn't need to be
// live, and this avoids a D1 round trip (and the build-time load that comes
// with it, across every single page) on every request.
const getCachedSoundCategories = unstable_cache(
  async () => listCategories(),
  ["nav-sound-categories"],
  { revalidate: 300 }
);

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = ["es", "en", "pt"].includes(lang) ? lang : "es";

  let soundCategories: SoundCategory[] = [];
  try {
    soundCategories = await getCachedSoundCategories();
  } catch {
    // SOUNDS_DB not provisioned, or a transient error — hide the categories
    // submenu gracefully rather than failing the whole page.
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar lang={currentLang} soundCategories={soundCategories} />

      <main>{children}</main>

      <Footer lang={currentLang} />
    </div>
  );
}
