#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-api.clipnexo.com}"
EMAIL="${2:-admin@clipnexo.com}"
BACKEND="127.0.0.1:3001"

if [[ $EUID -ne 0 ]]; then
  echo "Este script debe ejecutarse como root o con sudo." >&2
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "Instalando Nginx..."
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y nginx
  else
    echo "dnf no está disponible. Instala Nginx manualmente." >&2
    exit 1
  fi
fi

if ! systemctl list-unit-files nginx.service >/dev/null 2>&1; then
  echo "Nginx no está registrado como servicio. Revisa la instalación." >&2
  exit 1
fi

systemctl enable nginx >/dev/null 2>&1 || true
systemctl start nginx >/dev/null 2>&1 || true

TIMESTAMP="$(date +%F-%H%M)"
CONF_FILE="/etc/nginx/conf.d/clipnexo-api.conf"
NGINX_CONF="/etc/nginx/nginx.conf"
CONF_BAK="${CONF_FILE}.bak.${TIMESTAMP}"
NGINX_BAK="${NGINX_CONF}.bak.${TIMESTAMP}"

cp "$CONF_FILE" "$CONF_BAK" 2>/dev/null || true
cp "$NGINX_CONF" "$NGINX_BAK" 2>/dev/null || true

echo "Backups creados:"
echo "- $CONF_BAK"
echo "- $NGINX_BAK"

cat > "$CONF_FILE" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    location / {
        proxy_pass http://${BACKEND};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Port \$server_port;
    }
}
EOF

nginx -t

if ! command -v certbot >/dev/null 2>&1; then
  echo "Instalando Certbot..."
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y epel-release || true
    dnf install -y certbot python3-certbot-nginx || true
  fi
fi

if ! command -v certbot >/dev/null 2>&1; then
  if python3 -m pip --version >/dev/null 2>&1; then
    python3 -m pip install --user certbot certbot-nginx
  else
    echo "Certbot no pudo instalarse. Instálalo manualmente y vuelve a ejecutar este script." >&2
    exit 1
  fi
fi

if ! command -v certbot >/dev/null 2>&1; then
  CERTBOT_BIN="$(python3 -m site --user-base)/bin/certbot"
else
  CERTBOT_BIN="$(command -v certbot)"
fi

"$CERTBOT_BIN" --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL"

nginx -t
systemctl reload nginx || nginx -s reload

if command -v firewall-cmd >/dev/null 2>&1; then
  firewall-cmd --permanent --add-service=http >/dev/null 2>&1 || true
  firewall-cmd --permanent --add-service=https >/dev/null 2>&1 || true
  firewall-cmd --reload >/dev/null 2>&1 || true
fi

if command -v setsebool >/dev/null 2>&1; then
  setsebool -P httpd_can_network_connect 1 >/dev/null 2>&1 || true
fi

echo "Configuración aplicada. Prueba con:"
echo "  curl -I http://${DOMAIN}/health"
echo "  curl -I https://${DOMAIN}/health"
