import Link from "next/link";
import Image from "next/image";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";
import { footerContent } from "@/lib/footer-content";
import { soundFooterCategories } from "@/lib/sounds-content";

type Props = {
  lang: string;
};

const soundsColumnTitle: Record<string, string> = {
  es: "Sonidos",
  en: "Sounds",
  pt: "Sons",
};

export default function Footer({ lang }: Props) {
  const currentLang = normalizeLang(lang);
  const content = footerContent[currentLang] || footerContent.es;
  const soundsUrl = getLocalizedRoute("soundsLibrary", currentLang);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <Link href={`/${currentLang}`} className="footer-brand-name">
              <Image
                src="/clipnexo-logo.webp"
                alt="Clipnexo"
                width={332}
                height={80}
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-brand-desc">{content.brandDescription}</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{soundsColumnTitle[currentLang] || soundsColumnTitle.es}</h4>
            <nav className="footer-links" aria-label={soundsColumnTitle[currentLang] || soundsColumnTitle.es}>
              <Link href={soundsUrl} className="footer-link">
                {content.columns[0]?.links[0]?.label}
              </Link>
              {soundFooterCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`${soundsUrl}?categoria=${category.id}`}
                  className="footer-link"
                >
                  {category[currentLang]}
                </Link>
              ))}
            </nav>
          </div>

          {content.columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4 className="footer-col-title">{col.title}</h4>
              <nav className="footer-links" aria-label={col.title}>
                {col.links.filter((link) => link.routeKey !== "soundsLibrary").map((link) => (
                  <Link
                    key={link.label}
                    href={getLocalizedRoute(link.routeKey, currentLang)}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">{content.bottomLine}</p>
          <p className="footer-tagline">{content.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
