#!/bin/bash
set -e

pnpm eslint . --fix
pnpm prettier --write .
