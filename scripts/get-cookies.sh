#!/usr/bin/env bash
# Extrae cookies de Instagram desde Chrome (macOS)
# Requiere que estes logueado en instagram.com en Chrome

set -e

OUTPUT="${1:-./instagram.cookies.txt}"

echo "Extrayendo cookies de Instagram desde Chrome..."
echo ""

CHROME_PROFILE="$HOME/Library/Application Support/Google/Chrome/Default/Cookies"

if [ ! -f "$CHROME_PROFILE" ]; then
  echo "ERROR: No se encuentra Chrome. Instala Firefox: brew install firefox"
  echo "Luego inicia sesion en instagram.com en Firefox y ejecuta:"
  echo "  yt-dlp --cookies-from-browser firefox --cookies ./instagram.cookies.txt 'https://www.instagram.com/' -s"
  exit 1
fi

if ! command -v yt-dlp &> /dev/null; then
  echo "ERROR: yt-dlp no esta instalado"
  exit 1
fi

# Intentar extraer cookies - puede pedir acceso al keychain
yt-dlp --cookies-from-browser chrome --cookies "$OUTPUT" "https://www.instagram.com/" -s 2>&1

if grep -q "sessionid" "$OUTPUT" 2>/dev/null; then
  echo "✅ Cookies extraidas correctamente"
  echo "   Archivo: $OUTPUT"
else
  echo ""
  echo "⚠️  Chrome no pudo desencriptar las cookies (v10 encryption)."
  echo ""
  echo "OPCION A (recomendada): Usa Firefox"
  echo "  1. brew install firefox"
  echo "  2. Abre Firefox, ve a instagram.com, inicia sesion"
  echo "  3. Ejecuta de nuevo este script"
  echo ""
  echo "OPCION B: Manual desde Chrome DevTools"
  echo "  1. Abre Chrome → instagram.com → F12"
  echo "  2. Application → Cookies → instagram.com"
  echo "  3. Copia el valor de 'sessionid'"
  echo "  4. Crea el archivo manualmente:"
  echo ""
  echo "  cat > $OUTPUT << 'COOKIES'"
  echo "  # Netscape HTTP Cookie File"
  echo "  .instagram.com	TRUE	/	TRUE	0	sessionid	PEGA_AQUI_EL_VALOR"
  echo "  .instagram.com	TRUE	/	TRUE	0	csrftoken	PEGA_AQUI_EL_VALOR"
  echo "  COOKIES"
fi
