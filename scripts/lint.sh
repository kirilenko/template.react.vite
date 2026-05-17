#!/bin/bash
set -e

pnpm tsc -b --noEmit
pnpm eslint . --fix
pnpm prettier --write .
