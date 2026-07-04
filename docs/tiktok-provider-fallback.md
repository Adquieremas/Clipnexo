# TikTok provider fallback

## Objetivo

`/api/video/info` debe poder obtener metadata de enlaces publicos de TikTok sin depender solamente de `yt-dlp`.

## Proveedor principal

- Nombre: `yt-dlp`
- Binario: `/usr/local/bin/yt-dlp`
- Uso: primer intento para metadata.
- Argumentos:

```bash
/usr/local/bin/yt-dlp \
  --impersonate chrome \
  --no-playlist \
  --dump-single-json \
  --socket-timeout 30 \
  "https://www.tiktok.com/@user/video/123456789"
```

## Proveedor fallback

- Nombre: `TikWM`
- Endpoint: `https://www.tikwm.com/api/?url=<encoded TikTok URL>`
- Uso: solo se intenta para URLs de TikTok cuando `yt-dlp` falla.
- Rate limit operativo: el backend serializa las llamadas a TikWM con un intervalo minimo de 1 segundo y reintenta una vez si TikWM responde con limite de API.
- Campos mapeados al contrato de Clipnexo:
  - `title`, `description`, `desc`
  - `thumbnail`, `cover`, `image`
  - `duration`
  - `uploader`
  - `webpage_url`
  - `play`, `video`, `videoUrl`
  - `audio`
  - `hashtags`
  - `source: "tikwm"`
  - `extractor: "tikwm"`

El backend solo devuelve enlaces de video/audio si TikWM los incluye en la respuesta. No se inventan enlaces ni se marca exito si no hay metadata util.

## Comandos de prueba

```bash
curl https://api.clipnexo.com/health

curl -X POST http://127.0.0.1:3001/api/video/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@chico1.3/video/7632069361020210454"}'

curl -X POST https://api.clipnexo.com/api/video/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@chico1.3/video/7632069361020210454"}'
```

## Error esperado si fallan todos los proveedores

```json
{
  "success": false,
  "error": "No se pudo obtener la metadata de TikTok en este momento.",
  "errorCode": "TIKTOK_PROVIDERS_FAILED",
  "details": {
    "primary": "yt-dlp failed",
    "fallback": "fallback provider failed"
  }
}
```

En produccion los detalles son genericos. En desarrollo se pueden incluir detalles tecnicos resumidos de cada proveedor.

## Errores conocidos de yt-dlp con TikTok

En algunos VPS TikTok bloquea o cambia la pagina que recibe `yt-dlp`, incluso usando impersonation:

```text
ERROR: [TikTok] <video_id>: Unable to extract webpage video data
```

Tambien puede aparecer:

```text
Deprecated Feature: Support for Python version 3.9 has been deprecated.
```

Ese warning de Python no es la causa directa del fallo de metadata, pero conviene actualizar Python cuando sea posible para mantener `yt-dlp` soportado.

## Si TikTok bloquea todos los proveedores

1. Confirmar que `/health` responde y que `clipnexo-api` esta activo.
2. Revisar logs:

```bash
sudo journalctl -u clipnexo-api -n 100 --no-pager
sudo tail -n 100 /var/log/clipnexo-api/error.log
```

3. Probar `yt-dlp` directo desde el VPS con el comando del proveedor principal.
4. Probar TikWM directo desde el VPS:

```bash
curl -sS "https://www.tikwm.com/api/?url=https%3A%2F%2Fwww.tiktok.com%2F%40chico1.3%2Fvideo%2F7632069361020210454" | head -c 1000
```

5. Si ambos fallan, no devolver una descarga falsa. Mantener el JSON claro `TIKTOK_PROVIDERS_FAILED` y evaluar:
   - rotar a un proveedor fallback adicional con contrato equivalente,
   - usar un proveedor pagado con SLA,
   - mover metadata TikTok a una red/IP menos bloqueada,
   - pausar temporalmente las descargas y mostrar error de servicio no disponible.

TikWM puede limitar el uso gratuito a una frecuencia baja. Si el trafico aumenta, conviene agregar cache por URL/video ID o migrar el fallback a un proveedor con cuota/SLA.
