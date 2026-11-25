import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { metadataBase } from "@/lib/seo";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Clipnexo",
    template: "%s | Clipnexo",
  },
  description: "Clipnexo ofrece herramientas gratuitas para creadores de contenido: hashtags, captions, guiones y títulos para TikTok, YouTube, Instagram y Facebook.",
  applicationName: "Clipnexo",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JQRSPZY9RT"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JQRSPZY9RT');`}
        </Script>
      </body>
    </html>
  );
}
