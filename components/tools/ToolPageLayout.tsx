import type { ReactNode } from "react";
import Link from "next/link";
import {
  getMoreToolsLinks,
  type ToolPageContent,
} from "@/lib/tools-content";
import type { RouteKey, SupportedLang } from "@/lib/routes";

type ToolPageLayoutProps = {
  content: ToolPageContent;
  lang: SupportedLang;
  routeKey: RouteKey;
  children: ReactNode;
};

export default function ToolPageLayout({
  content,
  lang,
  routeKey,
  children,
}: ToolPageLayoutProps) {
  const relatedLinks = getMoreToolsLinks(lang, routeKey);
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

  return (
    <main className="tool-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="tool-hero">
        <div className="tool-hero-copy">
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
