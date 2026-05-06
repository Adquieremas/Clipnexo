import Link from "next/link";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";

type Props = {
  lang: string;
};

export default function Footer({ lang }: Props) {
  const text = {
    es: {
      brand: "Clipnexo",
      description: "Descargador de videos de TikTok sin marca de agua.",
      links: {
        dmca: "DMCA",
        privacy: "Política de privacidad",
        terms: "Términos de servicio",
        contact: "Contacto",
        about: "Acerca de",
        tools: "Herramientas",
      },
      rights: "Todos los derechos reservados.",
    },
    en: {
      brand: "Clipnexo",
      description: "TikTok video downloader without watermark.",
      links: {
        dmca: "DMCA",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact",
        about: "About",
        tools: "Tools",
      },
      rights: "All rights reserved.",
    },
    pt: {
      brand: "Clipnexo",
      description: "Baixador de vídeos do TikTok sem marca d’água.",
      links: {
        dmca: "DMCA",
        privacy: "Política de Privacidade",
        terms: "Termos de Serviço",
        contact: "Contato",
        about: "Sobre",
        tools: "Ferramentas",
      },
      rights: "Todos os direitos reservados.",
    },
  } as const;

  const t = text[lang as keyof typeof text] || text.es;

  const currentLang = normalizeLang(lang);

  const r = {
    dmca: getLocalizedRoute("dmca", currentLang),
    privacy: getLocalizedRoute("privacy", currentLang),
    terms: getLocalizedRoute("terms", currentLang),
    contact: getLocalizedRoute("contact", currentLang),
    about: getLocalizedRoute("about", currentLang),
    tools: getLocalizedRoute("tools", currentLang),
  };

  return (
    <footer
      style={{
        background: "#f5f5f5",
        borderTop: "1px solid #e5e5e5",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "22px 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <strong style={{ color: "#111", fontSize: "18px" }}>{t.brand}</strong>
          <span style={{ color: "#555", fontSize: "14px" }}>{t.description}</span>
        </div>

        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={r.dmca} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.dmca}
          </Link>
          <Link href={r.privacy} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.privacy}
          </Link>
          <Link href={r.terms} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.terms}
          </Link>
          <Link href={r.contact} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.contact}
          </Link>
          <Link href={r.about} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.about}
          </Link>
          <Link href={r.tools} style={{ color: "#444", textDecoration: "none", fontSize: "14px" }}>
            {t.links.tools}
          </Link>
        </nav>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px 20px",
          color: "#777",
          fontSize: "13px",
        }}
      >
        © 2026 Clipnexo. {t.rights}
      </div>
    </footer>
  );
}
