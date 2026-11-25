import Link from "next/link";
import { headers } from "next/headers";
import { normalizeLang, getLocalizedRoute } from "@/lib/routes";

const copy = {
  es: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o fue movida. Explora nuestras herramientas gratuitas para creadores de contenido.",
    tools: "Ver herramientas",
    blog: "Ver blog",
  },
  en: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or was moved. Explore our free tools for content creators.",
    tools: "View tools",
    blog: "View blog",
  },
  pt: {
    title: "Página não encontrada",
    text: "A página que você procura não existe ou foi movida. Explore nossas ferramentas gratuitas para criadores de conteúdo.",
    tools: "Ver ferramentas",
    blog: "Ver blog",
  },
} as const;

export default async function NotFound() {
  const headerList = await headers();
  const lang = normalizeLang(headerList.get("x-lang") || "es");
  const t = copy[lang];
  const toolsHref = getLocalizedRoute("tools", lang);
  const blogHref = `/${lang}/blog`;

  return (
    <main
      style={{
        maxWidth: 560,
        margin: "100px auto",
        padding: "0 20px",
        textAlign: "center",
        color: "var(--text-primary)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>{t.title}</h1>
      <p style={{ color: "var(--text-primary)", fontSize: 16, lineHeight: 1.6 }}>{t.text}</p>
      <p style={{ marginTop: 28 }}>
        <Link href={toolsHref} style={{ marginRight: 16 }}>
          {t.tools}
        </Link>
        <Link href={blogHref}>{t.blog}</Link>
      </p>
    </main>
  );
}
