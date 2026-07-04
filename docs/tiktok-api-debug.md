# Debug de TikTok API y proxy interno

## Endpoint usado
- Frontend: `/api/video/info`
- Proxy interno de Next.js: `app/api/video/info/route.ts`
- Upstream remoto: `https://api.clipnexo.com/api/video/info`

## Variable necesaria
- Local y Vercel: `NEXT_PUBLIC_CLIPNEXO_API_URL=https://api.clipnexo.com`
- El frontend usa el proxy interno `/api/video/info` y no llama al backend directamente.

## Comandos de prueba
```bash
curl https://api.clipnexo.com/health

curl -X POST https://api.clipnexo.com/api/video/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@user/video/123456789"}'

curl -X POST http://localhost:3000/api/video/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@user/video/123456789"}'
```

## Resultados esperados
- `/health` responde `{ "ok": true, ... }`.
- El proxy local responde con JSON del backend o un error claro con `errorCode`.
- Si el backend o TikTok no pueden resolver metadatos, el proxy devuelve un error explícito en vez de un mensaje genérico.

## Diagnóstico de fallos
1. Si falla `https://api.clipnexo.com/api/video/info`, el problema está en el backend o en el proveedor TikTok.
2. Si falla solo el proxy local, revisar `app/api/video/info/route.ts` y la variable `NEXT_PUBLIC_CLIPNEXO_API_URL`.
3. Si el backend responde `INFO_LOOKUP_FAILED` o similar para un enlace real, el problema está en la metadata del proveedor TikTok o en la disponibilidad del servicio upstream.
4. Si el enlace es inválido, el proxy devuelve `400` con `INVALID_TIKTOK_URL`.
