# Configuración HTTPS para api.clipnexo.com en un VPS Oracle Linux

## Estado actual

- El dominio apunta a la IP del VPS.
- El backend escucha en 127.0.0.1:3001.
- El objetivo es exponer HTTPS en api.clipnexo.com mediante Nginx y Certbot.

## Bloqueador detectado

Desde esta sesión no pude completar la conexión SSH al VPS porque la conexión queda en timeout durante el banner de SSH:

```bash
ssh -i ~/Downloads/clipnexo-api.key opc@136.248.240.218
Connection timed out during banner exchange
```

Esto indica que el puerto 22 no está respondiendo correctamente desde esta red, por lo que no pude aplicar los cambios de forma remota.

## Script preparado

Se dejó un script listo para ejecutar en el VPS:

```bash
bash /root/setup-https-vps.sh api.clipnexo.com admin@clipnexo.com
```

El script:

- crea backups de Nginx,
- instala Certbot si falta,
- solicita un certificado para api.clipnexo.com,
- configura Nginx para escuchar en 80 y 443,
- redirige HTTP a HTTPS,
- proxy a http://127.0.0.1:3001 con los headers correctos.

## Pasos manuales recomendados en el VPS

```bash
sudo -i
curl -fsSL https://get.docker.com >/tmp/get-docker.sh
# si no usas docker, ignora esta línea

cat >/root/setup-https-vps.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-api.clipnexo.com}"
EMAIL="${2:-admin@clipnexo.com}"
BACKEND="127.0.0.1:3001"

if [[ $EUID -ne 0 ]]; then
  echo "Ejecuta este script como root o con sudo" >&2
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "Instalando Nginx..."
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y nginx
  else
    echo "dnf no está disponible" >&2
    exit 1
  fi
fi

if ! command -v certbot >/dev/null 2>&1; then
  echo "Instalando Certbot..."
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y epel-release || true
    dnf install -y certbot python3-certbot-nginx || true
  fi
fi

CONF_FILE="/etc/nginx/conf.d/clipnexo-api.conf"
NGINX_CONF="/etc/nginx/nginx.conf"
TIMESTAMP="$(date +%F-%H%M)"
cp "$CONF_FILE" "$CONF_FILE.bak.$TIMESTAMP" 2>/dev/null || true
cp "$NGINX_CONF" "$NGINX_CONF.bak.$TIMESTAMP" 2>/dev/null || true

cat > "$CONF_FILE" <<CONF
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
CONF

nginx -t

if ! command -v certbot >/dev/null 2>&1; then
  echo "Certbot no pudo instalarse" >&2
  exit 1
fi

certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL"
nginx -t
systemctl enable --now nginx
systemctl reload nginx

firewall-cmd --permanent --add-service=http 2>/dev/null || true
firewall-cmd --permanent --add-service=https 2>/dev/null || true
firewall-cmd --reload 2>/dev/null || true

curl -I http://${DOMAIN}/health || true
curl -I https://${DOMAIN}/health || true
EOF

chmod +x /root/setup-https-vps.sh
bash /root/setup-https-vps.sh api.clipnexo.com admin@clipnexo.com
```

## Validación final

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo ss -ltnp | grep -E ':80|:443|:3001'
curl -I http://api.clipnexo.com/health
curl -I https://api.clipnexo.com/health
```

## Si 443 sigue fallando

Comprueba que Oracle Cloud tenga una regla de seguridad con:

- Source: 0.0.0.0/0
- Protocol: TCP
- Destination port: 443
