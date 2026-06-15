<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Goal
- Evolve Clipnexo from isolated pages into an organized platform with cluster pages per platform, proper interlinking, professional branding, and optimal performance.
- Add student-focused tools and a dedicated cluster page.

## Constraints & Preferences
- Do not break existing routes, sitemap, robots, canonical, hreflang, llms.txt, IndexNow, DNS-AID, blog, tools, header, footer, navbar.
- No slug changes without redirects. No removing existing pages. No unnecessary dependencies.
- Use pnpm. Prefer static files in `public/` for simple JSON/markdown; use route handlers for dynamic Content-Type.
- Cluster page directories must live under `app/[lang]/` and use the middleware rewrite system (internal segments).
- Build must pass (`pnpm build`). No hydration errors.
- Header/menú must remain compact and functional on desktop and mobile.

## Progress
### Done
- All 7 cluster pages created under `app/[lang]/herramientas/{tiktok,youtube,instagram,facebook,videos-cortos,redes-sociales,estudiantes}/page.tsx` using shared `ClusterPage` component.
- Route keys (`tiktokTools`, `youtubeTools`, `studentsTools`, `wordCounter`, `caseConverter`, etc.) added to `lib/routes.ts` (`RouteKey`, `localizedRoutes`, `indexableRouteKeys`).
- Internal route segments registered in `middleware.ts` for canonical → internal rewrite.
- `lib/cluster-content.ts` with full SEO content (titles, descriptions, H1s, FAQ, intro, how-to steps) for all 7 clusters × 3 languages.
- `lib/tools-extra-content.ts` with SEO content for 6 student tools (wordCounter, caseConverter, outlineGenerator, assignmentTitleGenerator, introductionGenerator, conclusionGenerator) × 3 languages.
- General tools page (`app/[lang]/herramientas/page.tsx`) updated with student cluster section and tool links.
- Footer platform links updated to include student tools in `lib/footer-content.ts`.
- Sitemap (`app/sitemap.ts`) includes student cluster route with priority 0.85 / changeFrequency weekly.
- `public/llms.txt` updated with `## Student tools` section (6 tools × 3 languages) and student cluster in tool clusters.
- 6 interactive tool components created in `components/tools/`: `WordCounter.tsx`, `CaseConverter.tsx`, `OutlineGenerator.tsx`, `AssignmentTitleGenerator.tsx`, `IntroductionGenerator.tsx`, `ConclusionGenerator.tsx`.
- 6 tool page files created under `app/[lang]/`: `contador-palabras-caracteres`, `convertidor-mayusculas-minusculas`, `generador-indice-trabajos`, `generador-titulos-trabajos`, `generador-introducciones`, `generador-conclusiones`.
- Nav mega-menu column "Estudiantes"/"Students"/"Estudantes" added in `lib/navigation.ts` with 4 tool links.
- ClusterPage component updated with student tool labels and FAQ title.
- Logo cropped to remove transparent margins, resized from 1536×1024 to 332×80, compressed quality=70 (12.8 KB).
- Footer logo added via `next/image`, footer text color improved.
- TypeScript target changed from `ES2017` to `ES2022` for modern polyfills.
- Nav mega-menu column titles clickable links to cluster pages.
- Performance diagnostics documented.

### In Progress
- (none)

### Blocked
- DNS-AID DNSSEC: requires signing the DNS zone (infrastructure, not code).
- Markdown for Agents on non-homepage pages: requires Cloudflare dashboard toggle.
- OAuth/OIDC protected APIs: not applicable (all tools are public).

## Key Decisions
- Student tools built as client components with local template-based generation (no AI API dependency).
- WordCounter and CaseConverter are real-time utility tools; the other 4 use structured template logic to generate outlines, titles, introductions, and conclusions.
- All 6 student tools use the same ToolPageLayout wrapper as existing tools for consistent UX.
- Student cluster added as a 7th platform in the mega menu (5th column) and footer.
- Logo recortado para eliminar márgenes transparentes excesivos; served lossy quality 70.

## Next Steps
1. Implement interlinking from individual tool pages to cluster pages and related tools (second pass).
2. Enable Markdown for Agents on Cloudflare dashboard for automatic HTML→markdown conversion on all pages.
3. Monitor scan results on isitagentready.com for remaining failures.

## Critical Context
- `lib/routes.ts`: `RouteKey` union type includes cluster keys and student tool keys; `localizedRoutes` maps them to ES/EN/PT paths; `indexableRouteKeys` includes cluster keys and student tool keys for sitemap.
- `middleware.ts`: `INTERNAL_ROUTE_SEGMENTS` maps cluster RouteKeys and student tool RouteKeys to internal paths. `buildInternalPath()` creates `/{lang}{segment}`. Canonical → internal rewrite for EN/PT.
- All 7 clusters use the same `ClusterPage` component; language content loaded via `getClusterContent()`.
- Student tool components are `"use client"` with inline styles, accepting `{lang: SupportedLang}` prop.
- Logo file: `public/clipnexo-logo.webp` (332×80, 12.8 KB, quality 70 lossy WebP).
- Navbar logo uses `next/image` with `priority` for LCP; footer logo lazy-loaded.
- `.logo-img` CSS: `height: 38px` desktop, `height: 32px` mobile; `object-fit: contain; width: auto;`.

## Relevant Files
- `public/clipnexo-logo.webp`: Logo image (332×80, 12.8 KB, cropped + compressed).
- `components/Navbar.tsx`: Logo Image with width/height props; mega-menu column title links.
- `components/Footer.tsx`: Footer logo Image replacing text brand name.
- `app/globals.css`: `.logo-img`, `.footer-logo-img`, `.mobile-logo-img`, `.nav-mega-col-link`, `.footer-copy` color.
- `components/ClusterPage.tsx`: Reusable cluster page component with schema, grid, FAQ.
- `lib/cluster-content.ts`: All cluster SEO content for 7 clusters × 3 languages.
- `lib/navigation.ts`: `NavMegaColumn` type with optional `routeKey`; ES/EN/PT column data with cluster and student route keys.
- `lib/footer-content.ts`: Footer platform links → cluster routes including student tools.
- `lib/routes.ts`: RouteKey type, localizedRoutes, indexableRouteKeys.
- `middleware.ts`: INTERNAL_ROUTE_SEGMENTS and canonical→internal rewrite.
- `app/[lang]/herramientas/page.tsx`: Updated hero, popular tools, FAQ, CTA, student cluster section.
- `app/sitemap.ts`: Cluster routes priority 0.85.
- `public/llms.txt`: Student tools section and student cluster in tool clusters.
- `next.config.ts`: PWA runtimeCaching config, security headers.
- `tsconfig.json`: target updated to ES2022.
- `lib/tools-extra-content.ts`: SEO content for 6 student tools × 3 languages.
- `components/tools/WordCounter.tsx`: Real-time word/character counter.
- `components/tools/CaseConverter.tsx`: Text case converter (upper/lower/title/sentence).
- `components/tools/OutlineGenerator.tsx`: Template-based outline generator.
- `components/tools/AssignmentTitleGenerator.tsx`: Template-based title generator.
- `components/tools/IntroductionGenerator.tsx`: Template-based introduction writer.
- `components/tools/ConclusionGenerator.tsx`: Template-based conclusion writer.
- `app/[lang]/contador-palabras-caracteres/page.tsx`: Word counter tool page.
- `app/[lang]/convertidor-mayusculas-minusculas/page.tsx`: Case converter tool page.
- `app/[lang]/generador-indice-trabajos/page.tsx`: Outline generator tool page.
- `app/[lang]/generador-titulos-trabajos/page.tsx`: Title generator tool page.
- `app/[lang]/generador-introducciones/page.tsx`: Introduction generator tool page.
- `app/[lang]/generador-conclusiones/page.tsx`: Conclusion generator tool page.
- `app/[lang]/herramientas/estudiantes/page.tsx`: Student tools cluster page.
