import Link from "next/link";
import Image from "next/image";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";
import { footerContent } from "@/lib/footer-content";

type Props = {
  lang: string;
};

export default function Footer({ lang }: Props) {
  const currentLang = normalizeLang(lang);
  const content = footerContent[currentLang] || footerContent.es;

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
            <div className="footer-badges">
              {content.badges.map((badge) => {
                const badgeClass =
                  badge.toLowerCase().includes("gratis") ||
                  badge.toLowerCase() === "free"
                    ? "footer-badge footer-badge-free"
                    : badge.toLowerCase().includes("online")
                      ? "footer-badge footer-badge-online"
                      : "footer-badge footer-badge-app";
                return (
                  <span key={badge} className={badgeClass}>
                    {badge}
                  </span>
                );
              })}
            </div>
          </div>

          {content.columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4 className="footer-col-title">{col.title}</h4>
              <nav className="footer-links" aria-label={col.title}>
                {col.links.map((link) => (
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

      <div className="footer-cta-section">
        <div className="footer-cta-card">
          <p className="footer-cta-text">{content.ctaText}</p>
          <Link href={getLocalizedRoute("tools", currentLang)} className="footer-cta-button">
            {content.ctaButton}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
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
