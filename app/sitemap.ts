import { localizedRoutes } from "@/lib/routes";

export default function sitemap() {
  const baseUrl = "https://clipnexo.com";

  const routes = [
    localizedRoutes.home.es,
    localizedRoutes.video.es,
    localizedRoutes.mp3.es,
    localizedRoutes.guide.es,
    localizedRoutes.withoutWatermark.es,
    localizedRoutes.about.es,

    localizedRoutes.home.en,
    localizedRoutes.video.en,
    localizedRoutes.mp3.en,
    localizedRoutes.guide.en,
    localizedRoutes.withoutWatermark.en,
    localizedRoutes.about.en,

    localizedRoutes.home.pt,
    localizedRoutes.video.pt,
    localizedRoutes.mp3.pt,
    localizedRoutes.guide.pt,
    localizedRoutes.withoutWatermark.pt,
    localizedRoutes.about.pt,
  ];

  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}