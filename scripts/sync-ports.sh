#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORTS_FILE="$SCRIPT_DIR/../../../ports.yml"
OUT_FILE="$SCRIPT_DIR/../.env.ports.local"
PROJECT="template.react.vite"

if [ ! -f "$PORTS_FILE" ]; then
  echo "Error: $PORTS_FILE not found" >&2
  exit 1
fi

parse_port() {
  local key=$1
  awk "/^${PROJECT}:/{found=1; next} found && /^[^ ]/{exit} found && /^ *${key}:/{print \$2}" "$PORTS_FILE"
}

PORT=$(parse_port "vite")

if [ -z "$PORT" ]; then
  echo "Error: could not parse port for '$PROJECT' from $PORTS_FILE" >&2
  exit 1
fi

cat > "$OUT_FILE" <<EOF
PORT=$PORT
EOF

echo "Synced ports from $PORTS_FILE → $OUT_FILE"
echo "  PORT=$PORT"
