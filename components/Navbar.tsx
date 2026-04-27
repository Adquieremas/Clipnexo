"use client";

import Link from "next/link";
import { useState } from "react";
import { getLocalizedRoute, normalizeLang } from "@/lib/routes";

type NavbarProps = {
  lang: string;
};

export default function Navbar({ lang }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = normalizeLang(lang);

  const navRoutes = {
    home: getLocalizedRoute("home", currentLang),
    video: getLocalizedRoute("video", currentLang),
    mp3: getLocalizedRoute("mp3", currentLang),
  };

  const labels = {
    es: {
      download: "Descargar video",
      mp3: "TikTok a MP3",
      language: "Idioma",
    },
    en: {
      download: "Download video",
      mp3: "TikTok to MP3",
      language: "Language",
    },
    pt: {
      download: "Baixar vídeo",
      mp3: "TikTok a MP3",
      language: "Idioma",
    },
  } as const;

  const t = labels[currentLang as keyof typeof labels] ?? labels.es;

  const handleLangChange = (value: string) => {
    const nextLang = normalizeLang(value);
    window.location.href = getLocalizedRoute("home", nextLang);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href={navRoutes.home} className="logo">
          Clipnexo
        </Link>

        <nav className="nav-right-desktop" aria-label="Desktop menu">
          <Link href={navRoutes.video} className="nav-link">
            {t.download}
          </Link>
          <Link href={navRoutes.mp3} className="nav-link">
            {t.mp3}
          </Link>

          <select
            className="lang-select"
            value={currentLang}
            onChange={(e) => handleLangChange(e.target.value)}
            aria-label={t.language}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? "×" : "≡"}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-panel">
          <Link
            href={navRoutes.video}
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {t.download}
          </Link>

          <Link
            href={navRoutes.mp3}
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {t.mp3}
          </Link>

          <div className="mobile-language-block">
            <span className="mobile-language-label">{t.language}</span>

            <select
              className="lang-select mobile-lang-select"
              value={currentLang}
              onChange={(e) => handleLangChange(e.target.value)}
              aria-label={t.language}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}