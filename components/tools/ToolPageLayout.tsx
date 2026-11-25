import type { ReactNode } from "react";
import Link from "next/link";
import {
  getMoreToolsLinks,
  getToolDates,
  type ToolPageContent,
  type ToolKey,
} from "@/lib/tools-content";
import { type RouteKey, type SupportedLang, getLocalizedRoute } from "@/lib/routes";
import { getAbsoluteUrl } from "@/lib/seo";

type ToolPageLayoutProps = {
  content: ToolPageContent;
  lang: SupportedLang;
  routeKey: RouteKey;
  children: ReactNode;
};

const breadcrumbLabels: Record<SupportedLang, { home: string; tools: string }> = {
  es: { home: "Inicio", tools: "Herramientas" },
  en: { home: "Home", tools: "Tools" },
  pt: { home: "Início", tools: "Ferramentas" },
};

export default function ToolPageLayout({
  content,
  lang,
  routeKey,
  children,
}: ToolPageLayoutProps) {
  const relatedLinks = getMoreToolsLinks(lang, routeKey);
  const canonicalUrl = getAbsoluteUrl(getLocalizedRoute(routeKey, lang));
  const labels = breadcrumbLabels[lang];
  const homeUrl = getAbsoluteUrl(getLocalizedRoute("home", lang));
  const toolsUrl = getAbsoluteUrl(getLocalizedRoute("tools", lang));

  // Get dates if it's a tool key, otherwise use defaults
  const dates = getToolDates(routeKey as ToolKey);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: content.h1,
    description: content.metaDescription,
    url: canonicalUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    datePublished: dates.publishedAt,
    dateModified: dates.updatedAt,
    author: {
      "@type": "Organization",
      name: "Clipnexo",
      url: "https://clipnexo.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: homeUrl },
      { "@type": "ListItem", position: 2, name: labels.tools, item: toolsUrl },
      { "@type": "ListItem", position: 3, name: content.h1, item: canonicalUrl },
    ],
  };

  return (
    <main className="tool-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="tool-hero">
        <div className="tool-hero-copy">
          <nav className="blog-breadcrumbs tool-breadcrumbs" aria-label="Breadcrumb">
            <Link href={getLocalizedRoute("home", lang)} className="blog-breadcrumb-link">
              {labels.home}
            </Link>
            <span className="blog-breadcrumb-sep">/</span>
            <Link href={getLocalizedRoute("tools", lang)} className="blog-breadcrumb-link">
              {labels.tools}
            </Link>
            <span className="blog-breadcrumb-sep">/</span>
            <span className="blog-breadcrumb-current">{content.h1}</span>
          </nav>
          <h1>{content.h1}</h1>
          <p>{content.lead}</p>
        </div>
        {children}
      </section>

      <section className="tool-content">
        <section className="tool-section">
          <h2>{content.howTitle}</h2>
          <ol>
            {content.howSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="tool-section">
          <h2>{content.purposeTitle}</h2>
          <p>{content.purposeText}</p>
        </section>

        <section className="tool-section">
          <h2>{content.tipsTitle}</h2>
          <ul>
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="tool-section">
          <h2>{content.moreToolsTitle}</h2>
          <p>{content.moreToolsIntro}</p>
          <div className="tool-link-grid">
            {relatedLinks.map((link) => (
              <Link key={link.routeKey} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="tool-section">
          <h2>{content.faqTitle}</h2>
          <div className="tool-faq-list">
            {content.faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
