

import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function UnknownRootPage({ params }: Props) {
  await params;
  redirect("/es?invalid=1");
}