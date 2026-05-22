#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."
PORTS_FILE="$ROOT_DIR/.env.ports.local"
ENV_FILE="$ROOT_DIR/.env"

if [ ! -f "$PORTS_FILE" ]; then
  echo "Error: .env.ports.local not found. Run scripts/sync-ports.sh first." >&2
  exit 1
fi

MOCK_PORT=$(awk -F'=' '/^MOCK_PORT=/{print $2}' "$PORTS_FILE")

if [ -z "$MOCK_PORT" ]; then
  echo "Error: MOCK_PORT not found in .env.ports.local. Run scripts/sync-ports.sh first." >&2
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env not found. Copy .env.example to .env." >&2
  exit 1
fi

MOCK_CREATOR_PATHS=$(awk -F'=' '/^MOCK_CREATOR_PATHS=/{print $2}' "$ENV_FILE")

if [ -z "$MOCK_CREATOR_PATHS" ]; then
  echo "Error: MOCK_CREATOR_PATHS not found in .env." >&2
  exit 1
fi

TSX="$ROOT_DIR/node_modules/.bin/tsx"

IFS='|' read -ra DIRS <<< "$MOCK_CREATOR_PATHS"
for DIR in "${DIRS[@]}"; do
  while IFS= read -r -d '' CREATOR; do
    echo "Running $CREATOR..."
    "$TSX" "$CREATOR"
  done < <(find "$ROOT_DIR/$DIR" -name "*.mock-creator.ts" -print0 2>/dev/null)
done

node "$SCRIPT_DIR/mock-collect.js" "$MOCK_CREATOR_PATHS"

json-server "$ROOT_DIR/db.json" --port "$MOCK_PORT"
