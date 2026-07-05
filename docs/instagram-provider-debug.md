# Instagram provider debug

## Arquitectura corregida

El flujo de Instagram ahora funciona igual que TikTok: Next.js/Vercel actúa como proxy y delega al backend Oracle.

- Next.js `/api/instagram/info` → proxy → `https://api.clipnexo.com/api/instagram/info`
- Next.js `/api/instagram/download` → proxy → `https://api.clipnexo.com/api/instagram/download`

Next.js ya NO ejecuta yt-dlp localmente. Toda la ejecución de yt-dlp ocurre en el backend Oracle.

## Archivos modificados

- `lib/instagram-metadata.ts` — eliminada toda ejecución de `child_process/execFile`, conserva validación/normalización de URL
- `lib/clipnexo-api.ts` — nuevos helpers: `buildInstagramInfoEndpoint`, `buildInstagramDownloadEndpoint`, `proxyInstagramInfoRequest`, `proxyInstagramDownloadRequest`, `getInstagramErrorStatus`
- `app/api/instagram/info/route.ts` — proxy: valida URL → reenvía al backend Oracle
- `app/api/instagram/download/route.ts` — proxy: valida request → reenvía al backend Oracle
- `components/InstagramDownloaderBox.tsx` — nuevo error code `INSTAGRAM_PROVIDER_NOT_INSTALLED`

## Validación

- tsc --noEmit: ✅ sin errores
- pnpm lint: ✅ 0 errors, 106 warnings (todos preexistentes en archivos generados)
- pnpm build: ✅ compila exitosamente, ruta `/api/instagram/info` y `/api/instagram/download` registradas

## Estado del backend Oracle

```bash
curl -X POST https://api.clipnexo.com/api/instagram/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/reel/DaNSUO4t1TG/"}'
```

Respuesta actual:
```json
{"success":false,"error":"Ruta no encontrada.","errorCode":"NOT_FOUND"}
```

HTTP 404 — el endpoint NO existe en Oracle. Es necesario implementarlo.

## Backend Oracle requerido

Endpoint: `POST /api/instagram/info`

Body: `{ "url": "https://www.instagram.com/reel/SHORTCODE/" }`

Respuesta success:
```json
{
  "success": true,
  "source": "instagram",
  "provider": "yt-dlp",
  "type": "reel",
  "title": "",
  "description": "",
  "thumbnail": "",
  "duration": 0,
  "uploader": "",
  "hashtags": [],
  "items": [],
  "formats": [],
  "audioUrl": null,
  "webpage_url": ""
}
```

Respuesta error:
```json
{
  "success": false,
  "errorCode": "INSTAGRAM_UPSTREAM_BLOCKED",
  "error": "Instagram no permitió obtener la información de este enlace."
}
```

Comando yt-dlp en el backend:
```bash
yt-dlp --dump-single-json --no-playlist --socket-timeout 30 --no-warnings URL
```

Buscar binario en: `/usr/local/bin/yt-dlp`, `/usr/bin/yt-dlp`, `yt-dlp` por PATH.

Si no existe yt-dlp, devolver:
```json
{"success": false, "errorCode": "INSTAGRAM_PROVIDER_NOT_INSTALLED", "error": "El proveedor de Instagram no está instalado en el servidor."}
```

Endpoint: `POST /api/instagram/download`

Body: `{ "url": "https://cdn-url-del-archivo", "filename": "archivo.mp4" }`

El backend debe descargar el archivo y devolverlo como stream con Content-Type y Content-Disposition apropiados.

## Normalización de URLs (manejada por Next.js)

- `/reels/SHORTCODE/` → `/reel/SHORTCODE/`
- Query params eliminados
- Hosts no-Instagram rechazados
- Credenciales y hosts locales rechazados
- Stories no soportados

## Error codes manejados por el frontend

| Código | UI |
|--------|-----|
| `INSTAGRAM_PROVIDER_NOT_INSTALLED` | "El proveedor de Instagram aún no está instalado en el servidor." |
| `INSTAGRAM_LOGIN_REQUIRED` | "Este contenido puede requerir sesión o no estar disponible públicamente." |
| `INSTAGRAM_UPSTREAM_BLOCKED` | "Instagram no permitió obtener la información de este enlace. Intenta con otro Reel público." |
| `INSTAGRAM_PROVIDER_UNAVAILABLE` | Mensaje genérico de proveedor no disponible |
| `REQUEST_TIMEOUT` | "Instagram tardó demasiado en responder. Intenta con otro enlace público." |
| `UNSUPPORTED_INSTAGRAM_STORY` | Stories no soportados |
