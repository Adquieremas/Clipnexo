import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export default async function UnknownLangPage({ params }: Props) {
  await params;
  notFound();
}
