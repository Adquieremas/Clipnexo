"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  getLocalizedRoute,
  getRouteKeyFromPath,
  normalizeLang,
  type SupportedLang,
  type RouteKey,
} from "@/lib/routes";
import { getBlogPostBySlug, getBlogUrl } from "@/lib/blog-content";
import { navigation } from "@/lib/navigation";
import { toolMenuContent } from "@/lib/tool-menu-content";

type NavbarProps = {
  lang: string;
};

type DesktopDropdownKey = "download" | "tools" | "resources" | "language";
type ToolMenuKind = "tiktok" | "instagram" | "youtube" | "utilities";

function ToolMenuIcon({ kind }: { kind: ToolMenuKind }) {
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.4L15 12L10 14.6V9.4Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "utilities") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L13.6 8.4L19 10L13.6 11.6L12 17L10.4 11.6L5 10L10.4 8.4L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M18.5 15L19.2 17.3L21.5 18L19.2 18.7L18.5 21L17.8 18.7L15.5 18L17.8 17.3L18.5 15Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 4V15.2C14 17.3 12.3 19 10.2 19C8.4 19 7 17.7 7 16.1C7 14.4 8.4 13.1 10.2 13.1C10.9 13.1 11.5 13.3 12 13.7V7.2C14.2 8.9 16.2 9.7 18 9.7V7.5C16.3 7.4 15 6.3 14 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ToolMenuOptionProps = {
  href: string;
  label: string;
  description: string;
  kind: ToolMenuKind;
  mobile?: boolean;
  onClick?: () => void;
};

function ToolMenuOption({
  href,
  label,
  description,
  kind,
  mobile = false,
  onClick,
}: ToolMenuOptionProps) {
  return (
    <Link
      href={href}
      className={`nav-tool-option${mobile ? " mobile-tool-option" : ""}`}
      role={mobile ? undefined : "menuitem"}
      onClick={onClick}
    >
      <span className={`nav-tool-option-icon nav-tool-option-icon-${kind}`}>
        <ToolMenuIcon kind={kind} />
      </span>
      <span className="nav-tool-option-copy">
        <span className="nav-tool-option-name">{label}</span>
        <span className="nav-tool-option-desc">{description}</span>
      </span>
    </Link>
  );
}

function getBlogSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(es|en|pt)\/blog\/(.+)$/);
  return match ? match[2] : null;
}

export default function Navbar({ lang }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DesktopDropdownKey | null>(null);
  const [accordions, setAccordions] = useState<Record<string, boolean>>({});
  const desktopNavRef = useRef<HTMLElement>(null);
  const dropdownButtonRefs = useRef<Partial<Record<DesktopDropdownKey, HTMLButtonElement>>>({});
  const dropdownCloseTimerRef = useRef<number | null>(null);
  const pathname = usePathname();

  const currentLang = normalizeLang(lang);
  const currentRouteKey = getRouteKeyFromPath(pathname || "") || "home";

  const nav = navigation[currentLang] || navigation.es;
  const toolCopy = toolMenuContent[currentLang];
  const [tiktokColumn, youtubeColumn, instagramColumn, ...utilityColumns] = nav.tools.columns;
  const toolMenuGroups = [
    {
      kind: "tiktok" as const,
      title: tiktokColumn.title,
      routeKey: tiktokColumn.routeKey,
      sections: [tiktokColumn],
    },
    {
      kind: "instagram" as const,
      title: instagramColumn.title,
      routeKey: instagramColumn.routeKey,
      sections: [instagramColumn],
    },
    {
      kind: "youtube" as const,
      title: youtubeColumn.title,
      routeKey: youtubeColumn.routeKey,
      sections: [youtubeColumn],
    },
    {
      kind: "utilities" as const,
      title: toolCopy.utilityLabel,
      routeKey: undefined,
      sections: utilityColumns,
    },
  ];

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
    setAccordions((prev) => (prev[key] ? {} : { [key]: true }));
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const cancelDropdownClose = () => {
    if (dropdownCloseTimerRef.current !== null) {
      window.clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
  };

  const openDesktopDropdown = (key: DesktopDropdownKey) => {
    cancelDropdownClose();
    setOpenDropdown(key);
  };

  const closeDesktopDropdown = () => {
    cancelDropdownClose();
    setOpenDropdown(null);
  };

  const scheduleDropdownClose = () => {
    cancelDropdownClose();
    dropdownCloseTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
      dropdownCloseTimerRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (dropdownCloseTimerRef.current !== null) {
        window.clearTimeout(dropdownCloseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event: PointerEvent) => {
      const activeDropdown = desktopNavRef.current?.querySelector<HTMLElement>(
        `[data-dropdown="${openDropdown}"]`
      );
      if (!activeDropdown?.contains(event.target as Node)) {
        if (dropdownCloseTimerRef.current !== null) {
          window.clearTimeout(dropdownCloseTimerRef.current);
          dropdownCloseTimerRef.current = null;
        }
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeKey = openDropdown;
        if (dropdownCloseTimerRef.current !== null) {
          window.clearTimeout(dropdownCloseTimerRef.current);
          dropdownCloseTimerRef.current = null;
        }
        setOpenDropdown(null);
        dropdownButtonRefs.current[activeKey]?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  const focusDropdownItem = (
    key: DesktopDropdownKey,
    position: "first" | "last"
  ) => {
    window.setTimeout(() => {
      const dropdown = desktopNavRef.current?.querySelector<HTMLElement>(
        `[data-dropdown="${key}"]`
      );
      const items = dropdown?.querySelectorAll<HTMLElement>('[role="menuitem"]');
      if (!items?.length) return;
      items[position === "first" ? 0 : items.length - 1]?.focus();
    }, 0);
  };

  const handleDropdownButtonKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    key: DesktopDropdownKey
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDesktopDropdown(key);
      focusDropdownItem(key, "first");
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openDesktopDropdown(key);
      focusDropdownItem(key, event.key === "ArrowDown" ? "first" : "last");
    }
  };

  const handleDropdownMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    key: DesktopDropdownKey
  ) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const dropdown = desktopNavRef.current?.querySelector<HTMLElement>(
      `[data-dropdown="${key}"]`
    );
    const items = Array.from(
      dropdown?.querySelectorAll<HTMLElement>('[role="menuitem"]') || []
    );
    if (!items.length) return;

    event.preventDefault();
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowDown"
        ? (currentIndex + 1 + items.length) % items.length
        : (currentIndex - 1 + items.length) % items.length;

    items[nextIndex]?.focus();
  };

  const handleLangChange = (value: string) => {
    const nextLang = normalizeLang(value) as SupportedLang;

    const blogSlug = getBlogSlugFromPath(pathname || "");
    if (blogSlug) {
      const currentPost = getBlogPostBySlug(blogSlug, currentLang);
      if (currentPost) {
        window.location.assign(getBlogUrl(currentPost, nextLang));
        return;
      }
    }

    window.location.assign(getLocalizedRoute(currentRouteKey, nextLang));
  };

  const handleLanguageSelect = (value: SupportedLang) => {
    closeDesktopDropdown();
    if (value === currentLang) return;
    handleLangChange(value);
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

        <nav ref={desktopNavRef} className="nav-desktop" aria-label="Main navigation">
          <div
            data-dropdown="download"
            className={`nav-dropdown${openDropdown === "download" ? " nav-dropdown-open" : ""}`}
            onMouseEnter={() => openDesktopDropdown("download")}
            onMouseLeave={scheduleDropdownClose}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              ref={(node) => {
                dropdownButtonRefs.current.download = node || undefined;
              }}
              type="button"
              className="nav-btn"
              aria-haspopup="menu"
              aria-expanded={openDropdown === "download"}
              aria-controls="nav-download-menu"
              onClick={() => openDesktopDropdown("download")}
              onKeyDown={(event) => handleDropdownButtonKeyDown(event, "download")}
            >
              {nav.download.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div
              id="nav-download-menu"
              className="nav-dropdown-menu"
              role="menu"
              aria-label={nav.download.label}
              onMouseEnter={cancelDropdownClose}
              onKeyDown={(event) => handleDropdownMenuKeyDown(event, "download")}
            >
              {nav.download.links.map((link) => (
                <Link
                  key={link.label}
                  href={resolveHref(link.routeKey)}
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeDesktopDropdown}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            data-dropdown="tools"
            className={`nav-dropdown nav-tools-dropdown${openDropdown === "tools" ? " nav-dropdown-open" : ""}`}
            onMouseEnter={() => openDesktopDropdown("tools")}
            onMouseLeave={scheduleDropdownClose}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              ref={(node) => {
                dropdownButtonRefs.current.tools = node || undefined;
              }}
              type="button"
              className="nav-btn"
              aria-haspopup="menu"
              aria-expanded={openDropdown === "tools"}
              aria-controls="nav-tools-menu"
              onClick={() => openDesktopDropdown("tools")}
              onKeyDown={(event) => handleDropdownButtonKeyDown(event, "tools")}
            >
              {nav.tools.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div
              id="nav-tools-menu"
              className="nav-dropdown-menu nav-mega-menu nav-tools-menu"
              role="menu"
              aria-label={nav.tools.label}
              onMouseEnter={cancelDropdownClose}
              onKeyDown={(event) => handleDropdownMenuKeyDown(event, "tools")}
            >
              <div className="nav-tools-grid">
                {toolMenuGroups.map((group) => (
                  <section key={group.kind} className={`nav-tool-group nav-tool-group-${group.kind}`}>
                    <div className="nav-tool-group-heading">
                      <span className={`nav-tool-group-icon nav-tool-option-icon-${group.kind}`}>
                        <ToolMenuIcon kind={group.kind} />
                      </span>
                      <h3 className="nav-tool-group-title">
                        {group.routeKey ? (
                          <Link
                            href={resolveHref(group.routeKey)}
                            role="menuitem"
                            onClick={closeDesktopDropdown}
                          >
                            {group.title}
                          </Link>
                        ) : (
                          group.title
                        )}
                      </h3>
                    </div>

                    <div className={`nav-tool-group-sections${group.kind === "utilities" ? " nav-tool-group-sections-split" : ""}`}>
                      {group.sections.map((section) => (
                        <div key={section.title} className="nav-tool-section">
                          {group.kind === "utilities" && section.routeKey && (
                            <Link
                              href={resolveHref(section.routeKey)}
                              className="nav-tool-section-title"
                              role="menuitem"
                              onClick={closeDesktopDropdown}
                            >
                              {section.title}
                            </Link>
                          )}
                          <div className="nav-tool-options">
                            {section.links.map((link) => (
                              <ToolMenuOption
                                key={link.label}
                                href={resolveHref(link.routeKey)}
                                label={link.label}
                                description={toolCopy.descriptions[link.routeKey] || link.label}
                                kind={group.kind}
                                onClick={closeDesktopDropdown}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="nav-mega-footer">
                <Link
                  href={resolveHref(nav.tools.footerLink.routeKey)}
                  className="nav-mega-footer-link"
                  role="menuitem"
                  onClick={closeDesktopDropdown}
                >
                  {nav.tools.footerLink.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div
            data-dropdown="resources"
            className={`nav-dropdown${openDropdown === "resources" ? " nav-dropdown-open" : ""}`}
            onMouseEnter={() => openDesktopDropdown("resources")}
            onMouseLeave={scheduleDropdownClose}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              ref={(node) => {
                dropdownButtonRefs.current.resources = node || undefined;
              }}
              type="button"
              className="nav-btn"
              aria-haspopup="menu"
              aria-expanded={openDropdown === "resources"}
              aria-controls="nav-resources-menu"
              onClick={() => openDesktopDropdown("resources")}
              onKeyDown={(event) => handleDropdownButtonKeyDown(event, "resources")}
            >
              {nav.resources.label}
              <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div
              id="nav-resources-menu"
              className="nav-dropdown-menu"
              role="menu"
              aria-label={nav.resources.label}
              onMouseEnter={cancelDropdownClose}
              onKeyDown={(event) => handleDropdownMenuKeyDown(event, "resources")}
            >
              {nav.resources.links.map((link) => (
                <Link
                  key={link.label}
                  href={resolveHref(link.routeKey)}
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeDesktopDropdown}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href={blogHref} className="nav-link">
            {nav.blog}
          </Link>

          <div
            data-dropdown="language"
            className={`language-selector${openDropdown === "language" ? " language-selector-open" : ""}`}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              ref={(node) => {
                dropdownButtonRefs.current.language = node || undefined;
              }}
              type="button"
              className="language-trigger"
              aria-label={nav.language}
              aria-haspopup="menu"
              aria-expanded={openDropdown === "language"}
              aria-controls="nav-language-menu"
              onClick={() => {
                if (openDropdown === "language") {
                  closeDesktopDropdown();
                } else {
                  openDesktopDropdown("language");
                }
              }}
              onKeyDown={(event) => handleDropdownButtonKeyDown(event, "language")}
            >
              <span>{currentLang.toUpperCase()}</span>
              <svg className="language-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id="nav-language-menu"
              className="language-menu"
              role="menu"
              aria-label={nav.language}
              onKeyDown={(event) => handleDropdownMenuKeyDown(event, "language")}
            >
              {(["es", "en", "pt"] as SupportedLang[]).map((language) => {
                const isActive = language === currentLang;
                return (
                  <button
                    key={language}
                    type="button"
                    className={`language-option${isActive ? " language-option-active" : ""}`}
                    role="menuitem"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <span>{language.toUpperCase()}</span>
                    <span className="language-check" aria-hidden="true">✓</span>
                  </button>
                );
              })}
            </div>
          </div>

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
                aria-controls="mobile-download-menu"
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
                <div id="mobile-download-menu" className="mobile-accordion-content">
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
                aria-controls="mobile-tools-menu"
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
                <div id="mobile-tools-menu" className="mobile-accordion-content mobile-tools-content">
                  <div className="mobile-tools-groups">
                    {toolMenuGroups.map((group) => {
                      const groupRouteKeys = new Set(
                        group.sections.flatMap((section) =>
                          section.links.map((link) => link.routeKey)
                        )
                      );
                      const mobileLinks = nav.mobileHighlightedTools.filter((link) =>
                        groupRouteKeys.has(link.routeKey)
                      );

                      if (!mobileLinks.length) return null;

                      return (
                        <section key={group.kind} className="mobile-tool-group">
                          <div className="mobile-tool-group-heading">
                            <span className={`nav-tool-group-icon nav-tool-option-icon-${group.kind}`}>
                              <ToolMenuIcon kind={group.kind} />
                            </span>
                            <h3>{group.title}</h3>
                          </div>
                          <div className="mobile-tool-options">
                            {mobileLinks.map((link) => (
                              <ToolMenuOption
                                key={link.label}
                                href={resolveHref(link.routeKey)}
                                label={link.label}
                                description={toolCopy.descriptions[link.routeKey] || link.label}
                                kind={group.kind}
                                mobile
                                onClick={closeMobile}
                              />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                  <Link
                    href={resolveHref(nav.tools.footerLink.routeKey)}
                    className="mobile-tools-footer-link"
                    onClick={closeMobile}
                  >
                    {nav.tools.footerLink.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-btn"
                onClick={() => toggleAccordion("resources")}
                aria-expanded={accordions.resources || false}
                aria-controls="mobile-resources-menu"
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
                <div id="mobile-resources-menu" className="mobile-accordion-content">
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
              <div className="mobile-language-options" role="group" aria-label={nav.language}>
                {(["es", "en", "pt"] as SupportedLang[]).map((language) => {
                  const isActive = language === currentLang;
                  return (
                    <button
                      key={language}
                      type="button"
                      className={`mobile-language-option${isActive ? " mobile-language-option-active" : ""}`}
                      aria-pressed={isActive}
                      onClick={() => handleLanguageSelect(language)}
                    >
                      {language.toUpperCase()}
                    </button>
                  );
                })}
              </div>
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
