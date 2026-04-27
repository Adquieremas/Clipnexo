import { redirect } from "next/navigation";
import { normalizeLang } from "@/lib/routes";

type Props = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export default async function UnknownLangPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = normalizeLang(lang);

  redirect(`/${currentLang}?invalid=1`);
}
