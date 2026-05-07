import "./globals.css";
import type { Metadata, Viewport } from "next";
import { metadataBase } from "@/lib/seo";

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
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
