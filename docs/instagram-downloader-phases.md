# Instagram downloader phases

## Fase 1: contenido público de Instagram

Incluye:
- Reels públicos (`/reel/`)
- Variante de Reels escrita como `/reels/`, normalizada internamente a `/reel/`
- Videos públicos (`/p/` o `/tv/`)
- Imágenes públicas (`/p/`)
- Carruseles públicos (`/p/`)

## Arquitectura

Next.js/Vercel actúa como proxy — NO ejecuta yt-dlp localmente.

```
Browser → POST /api/instagram/info → Next.js proxy → POST https://api.clipnexo.com/api/instagram/info → Oracle VPS → yt-dlp
Browser → POST /api/instagram/download → Next.js proxy → POST https://api.clipnexo.com/api/instagram/download → Oracle VPS → CDN
```

Proveedor en Oracle:
- `yt-dlp`
- Binario esperado: `/usr/local/bin/yt-dlp`
- Fallback: `/usr/bin/yt-dlp` → `yt-dlp` por `PATH`
- Argumentos: `--dump-single-json --no-playlist --socket-timeout 30 --no-warnings URL`

## Contrato normalizado

- `source: "instagram"`
- `provider: "yt-dlp"`
- `type: "reel" | "video" | "image" | "carousel"`
- `title`, `description`, `thumbnail`, `duration`, `uploader`
- `hashtags[]`, `items[]`, `formats[]`, `audioUrl`

## Errores

| Código | Significado |
|--------|-------------|
| `INSTAGRAM_PROVIDER_NOT_INSTALLED` | yt-dlp no existe en Oracle |
| `INSTAGRAM_LOGIN_REQUIRED` | Instagram pide login/cookies |
| `INSTAGRAM_UPSTREAM_BLOCKED` | Instagram bloqueó (401/403/429) |
| `REQUEST_TIMEOUT` | Timeout en yt-dlp |
| `UNSUPPORTED_INSTAGRAM_STORY` | Stories no soportadas |

## Endpoints Oracle requeridos

- `POST /api/instagram/info` — recibe `{ url }`, ejecuta yt-dlp, devuelve metadata
- `POST /api/instagram/download` — recibe `{ url, filename }`, descarga y devuelve stream

## Pruebas

```bash
# Test backend Oracle
curl -X POST https://api.clipnexo.com/api/instagram/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/reel/DaNSUO4t1TG/"}'

# Test proxy local (con npm run dev)
curl -X POST http://localhost:3000/api/instagram/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/reels/DaNSUO4t1TG/"}'
```

## Fase 2: historias y highlights

Preparada solo como alcance documentado. No implementada.

## Fase 3: siguiente plataforma

Candidatas: YouTube Shorts, Facebook Video. Mismo patrón: proxy Next.js → backend Oracle con yt-dlp.
