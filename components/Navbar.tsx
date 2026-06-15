"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getLocalizedRoute,
  getRouteKeyFromPath,
  normalizeLang,
  type SupportedLang,
  type RouteKey,
} from "@/lib/routes";
import { getBlogPostBySlug, getBlogUrl } from "@/lib/blog-content";
import { navigation } from "@/lib/navigation";

type NavbarProps = {
  lang: string;
};

function getBlogSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(es|en|pt)\/blog\/(.+)$/);
  return match ? match[2] : null;
}

export default function Navbar({ lang }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accordions, setAccordions] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const currentLang = normalizeLang(lang);
  const currentRouteKey = getRouteKeyFromPath(pathname || "") || "home";

  const nav = navigation[currentLang] || navigation.es;

  const toolsHref = getLocalizedRoute("tools", currentLang);
  const blogHref = `/${currentLang}/blog`;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setAccordions({});
  };

  const toggleAccordion = (key: string) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleLangChange = (value: string) => {
    const nextLang = normalizeLang(value) as SupportedLang;

    const blogSlug = getBlogSlugFromPath(pathname || "");
    if (blogSlug) {
      const currentPost = getBlogPostBySlug(blogSlug, currentLang);
      if (currentPost) {
        window.location.href = getBlogUrl(currentPost, nextLang);
        return;
      }
    }

    window.location.href = getLocalizedRoute(currentRouteKey, nextLang);
  };

  const resolveHref = (routeKey: RouteKey) =>
    getLocalizedRoute(routeKey, currentLang);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href={resolveHref("home")} className="logo">
          <Image
            src="/clipnexo-logo.webp"
            alt="Clipnexo"
            width={332}
            height={80}
            priority
            className="logo-img"
          />
        </Link>

        <nav className="nav-desktop" aria-label="Main navigation">
          <div className="nav-dropdown">
            <button type="button" className="nav-btn" aria-haspopup="true" aria-expanded="false">
              {nav.download.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu" role="menu">
              {nav.download.links.map((link) => (
                <Link key={link.label} href={resolveHref(link.routeKey)} className="nav-dropdown-link" role="menuitem">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <button type="button" className="nav-btn" aria-haspopup="true" aria-expanded="false">
              {nav.tools.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu nav-mega-menu" role="menu">
              <div className="nav-mega-grid">
                {nav.tools.columns.map((col) => (
                  <div key={col.title} className="nav-mega-col">
                    <h4 className="nav-mega-col-title">
                      {col.routeKey ? (
                        <Link href={resolveHref(col.routeKey)} className="nav-mega-col-link">
                          {col.title}
                        </Link>
                      ) : (
                        col.title
                      )}
                    </h4>
                    {col.links.map((link) => (
                      <Link key={link.label} href={resolveHref(link.routeKey)} className="nav-dropdown-link" role="menuitem">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="nav-mega-footer">
                <Link href={resolveHref(nav.tools.footerLink.routeKey)} className="nav-mega-footer-link">
                  {nav.tools.footerLink.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="nav-dropdown">
            <button type="button" className="nav-btn" aria-haspopup="true" aria-expanded="false">
              {nav.resources.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu" role="menu">
              {nav.resources.links.map((link) => (
                <Link key={link.label} href={resolveHref(link.routeKey)} className="nav-dropdown-link" role="menuitem">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href={blogHref} className="nav-link">
            {nav.blog}
          </Link>

          <select
            className="lang-select"
            value={currentLang}
            onChange={(e) => handleLangChange(e.target.value)}
            aria-label={nav.language}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>

          <Link href={toolsHref} className="nav-cta">
            {nav.cta}
          </Link>
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M8 8L20 20M20 8L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M5 8H23M5 14H23M5 20H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <button
        type="button"
        className={`mobile-drawer-overlay${mobileOpen ? " mobile-drawer-overlay-open" : ""}`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        aria-label={nav.mobileClose}
      />

      <aside
        id="mobile-drawer"
        className={`mobile-drawer${mobileOpen ? " mobile-drawer-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-logo">
              <Image
                src="/clipnexo-logo.webp"
                alt="Clipnexo"
                width={332}
                height={80}
                className="mobile-logo-img"
              />
            </span>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label={nav.mobileClose}
              onClick={closeMobile}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="mobile-drawer-body">
            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-btn"
                onClick={() => toggleAccordion("download")}
                aria-expanded={accordions.download || false}
              >
                <span className="mobile-accordion-btn-label">{nav.download.label}</span>
                <svg
                  className={`mobile-accordion-chevron${accordions.download ? " open" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordions.download && (
                <div className="mobile-accordion-content">
                  {nav.download.links.map((link) => (
                    <Link
                      key={link.label}
                      href={resolveHref(link.routeKey)}
                      className="mobile-link"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-btn"
                onClick={() => toggleAccordion("tools")}
                aria-expanded={accordions.tools || false}
              >
                <span className="mobile-accordion-btn-label">{nav.tools.label}</span>
                <svg
                  className={`mobile-accordion-chevron${accordions.tools ? " open" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordions.tools && (
                <div className="mobile-accordion-content">
                  {nav.mobileHighlightedTools.map((link) => (
                    <Link
                      key={link.label}
                      href={resolveHref(link.routeKey)}
                      className="mobile-link"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-btn"
                onClick={() => toggleAccordion("resources")}
                aria-expanded={accordions.resources || false}
              >
                <span className="mobile-accordion-btn-label">{nav.resources.label}</span>
                <svg
                  className={`mobile-accordion-chevron${accordions.resources ? " open" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {accordions.resources && (
                <div className="mobile-accordion-content">
                  {nav.mobileHighlightedResources.map((link) => (
                    <Link
                      key={link.label}
                      href={resolveHref(link.routeKey)}
                      className="mobile-link"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={blogHref} className="mobile-direct-link" onClick={closeMobile}>
              {nav.blog}
            </Link>

            <div className="mobile-lang">
              <span className="mobile-lang-label">{nav.language}</span>
              <select
                className="lang-select"
                value={currentLang}
                onChange={(e) => handleLangChange(e.target.value)}
                aria-label={nav.language}
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
                <option value="pt">PT</option>
              </select>
            </div>

            <div className="mobile-footer-links">
              {nav.mobileLegalLinks.map((link) => (
                <Link
                  key={link.routeKey}
                  href={resolveHref(link.routeKey)}
                  className="mobile-footer-link"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mobile-cta-section">
              <Link
                href={resolveHref(nav.mobileCtaPrimary.routeKey)}
                className="mobile-cta-btn mobile-cta-btn-primary"
                onClick={closeMobile}
              >
                {nav.mobileCtaPrimary.label}
              </Link>
              <Link
                href={toolsHref}
                className="mobile-cta-btn mobile-cta-btn-secondary"
                onClick={closeMobile}
              >
                {nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      </aside>
    </header>
  );
}
