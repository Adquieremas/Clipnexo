import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { metadataBase } from "@/lib/seo";
import { Inter } from "next/font/google";
import WebMCP from "@/components/WebMCP";

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
  description: "Descarga videos de TikTok sin marca de agua con Clipnexo de forma gratuita. Nuestra herramienta online es rápida, segura y fácil de usar para todos hoy mismo.",
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
        <WebMCP />
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
