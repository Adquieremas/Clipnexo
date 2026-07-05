#!/usr/bin/env bash
# Deploy Instagram backend to Oracle VPS
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VPS="opc@136.248.240.218"
SSH_KEY="$HOME/.ssh/clipnexo-api.key"
BACKEND_DIR="/opt/clipnexo-api"

echo "🚀 Deploying Instagram backend to Oracle VPS..."
echo ""

echo "1. Testing SSH connection..."
ssh -i "$SSH_KEY" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$VPS" "echo OK" || {
  echo "❌ Cannot connect to VPS. Is it running?"
  exit 1
}
echo "   ✅ Connected"

echo ""
echo "2. Copying new server.js..."
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no \
  "$SCRIPT_DIR/server-with-instagram.js" \
  "$VPS:/tmp/server-with-instagram.js"
echo "   ✅ Uploaded"

echo ""
echo "3. Replacing server.js and restarting..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$VPS" << 'REMOTE'
  set -e

  cd /opt/clipnexo-api

  # Backup current server.js
  cp src/server.js src/server.js.bak.$(date +%Y%m%d%H%M%S)

  # Replace with new version
  cp /tmp/server-with-instagram.js src/server.js

  # Verify node syntax
  node -c src/server.js
  echo "   ✅ Syntax OK"

  # Install any new deps if needed
  pnpm install --frozen-lockfile 2>/dev/null || pnpm install

  # Find and restart the server process
  if systemctl is-active --quiet clipnexo-api 2>/dev/null; then
    sudo systemctl restart clipnexo-api
    echo "   ✅ systemctl restarted"
  elif pm2 list 2>/dev/null | grep -q clipnexo; then
    pm2 restart clipnexo-api
    echo "   ✅ pm2 restarted"
  else
    # Kill old node process and restart
    pkill -f "node src/server.js" 2>/dev/null || true
    sleep 1
    nohup node src/server.js > logs/server.log 2>&1 &
    echo "   ✅ Started new process"
  fi

  sleep 2

  # Test endpoints
  echo ""
  echo "4. Testing endpoints..."
  echo -n "   /health: "
  curl -s http://127.0.0.1:3001/health | python3 -m json.tool 2>/dev/null || echo "FAIL"

  echo -n "   /api/instagram/info: "
  curl -s -X POST http://127.0.0.1:3001/api/instagram/info \
    -H "Content-Type: application/json" \
    -d '{"url":"https://www.instagram.com/reel/C_RAIDXN_f7/"}' | python3 -m json.tool 2>/dev/null || echo "FAIL"
REMOTE

echo ""
echo "✅ Deploy complete!"
echo ""
echo "Test from outside:"
echo "  curl -X POST https://api.clipnexo.com/api/instagram/info \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"url\":\"https://www.instagram.com/reel/CODIGO/\"}'"
