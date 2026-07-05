#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COOKIES_FILE="${1:-$SCRIPT_DIR/../instagram.cookies.txt}"

echo "🔐 Instagram Cookies Generator"
echo "================================"
echo ""
echo "Instagram requiere cookies de sesión para descargar contenido."
echo "Sigue estos pasos:"
echo ""
echo "1. Abre Chrome y ve a https://www.instagram.com/"
echo "2. Inicia sesion con tu cuenta de Instagram"
echo "3. Instala la extension 'cookies.txt' desde:"
echo "   https://chromewebstore.google.com/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg"
echo "4. Navega a instagram.com, haz clic en la extension y selecciona 'Export'"
echo "5. Guarda el archivo como cookies.txt"
echo "6. Ejecuta este script:"
echo "   ./scripts/setup-instagram-cookies.sh ~/Downloads/cookies.txt"
echo ""
echo "O desde Firefox:"
echo "1. Instala 'cookies.txt' para Firefox"
echo "2. Exporta las cookies de instagram.com"
echo "3. Pasa la ruta como argumento a este script"
echo ""

if [ ! -f "$COOKIES_FILE" ]; then
  echo "⚠️  No se encontro el archivo: $COOKIES_FILE"
  echo ""
  echo "    Ejecuta: ./scripts/setup-instagram-cookies.sh /ruta/a/cookies.txt"
  echo ""
  echo "Alternativamente puedes crear el archivo manualmente en:"
  echo "  $(pwd)/instagram.cookies.txt"
  echo ""
  echo "Formato Netscape requerido (ejemplo):"
  echo "# Netscape HTTP Cookie File"
  echo ".instagram.com	TRUE	/	FALSE	1800000000	ds_user_id	12345"
  echo ".instagram.com	TRUE	/	FALSE	1800000000	sessionid	abc123..."
  exit 0
fi

TARGET="$(cd "$SCRIPT_DIR/.." && pwd)/instagram.cookies.txt"

echo "📋 Copiando cookies de: $COOKIES_FILE"
echo "   → $TARGET"

cp "$COOKIES_FILE" "$TARGET"

HAS_SESSION=0
if grep -qE "instagram\.com.*sessionid|\.instagram\.com.*ds_user_id" "$TARGET"; then
  HAS_SESSION=1
fi

if [ "$HAS_SESSION" -eq 1 ]; then
  echo ""
  echo "✅ Cookies copiadas correctamente y parecen contener sesion de Instagram."
  echo "   Prueba con: npm run dev"
  echo "   Visita: http://localhost:3000/es/descargar-instagram"
else
  echo ""
  echo "⚠️  El archivo de cookies no parece contener sessionid o ds_user_id de Instagram."
  echo "   Asegurate de:"
  echo "   1. Haber iniciado sesion en instagram.com en el navegador"
  echo "   2. Exportar las cookies DESDE la pagina de instagram.com"
  echo "   3. El archivo debe contener al menos 'sessionid' y 'ds_user_id'"
fi

echo ""
echo "📝 Variable de entorno (opcional para produccion):"
echo "   INSTAGRAM_COOKIES_PATH=$(pwd)/instagram.cookies.txt"
