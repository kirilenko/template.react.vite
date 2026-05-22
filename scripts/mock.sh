#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORTS_FILE="$SCRIPT_DIR/../.env.ports.local"

if [ ! -f "$PORTS_FILE" ]; then
  echo "Error: .env.ports.local not found. Run scripts/sync-ports.sh first." >&2
  exit 1
fi

MOCK_PORT=$(awk -F'=' '/^MOCK_PORT=/{print $2}' "$PORTS_FILE")

if [ -z "$MOCK_PORT" ]; then
  echo "Error: MOCK_PORT not found in .env.ports.local. Run scripts/sync-ports.sh first." >&2
  exit 1
fi

json-server db.json --port "$MOCK_PORT"
