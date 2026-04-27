import "./globals.css";
import type { Metadata, Viewport } from "next";

const SITE_URL = "https://clipnexo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Clipnexo",
    template: "%s | Clipnexo",
  },
  description: "Descarga videos de TikTok sin marca de agua",
  applicationName: "Clipnexo",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
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
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}