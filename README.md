# template.react.vite

React SPA template powered by Vite.

## Stack

- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Vite 6](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [ESLint 9](https://eslint.org) + [Prettier 3](https://prettier.io)

## Setup

Requires [direnv](https://direnv.net). On first use:

```bash
direnv allow        # loads .nvmrc and enables corepack
pnpm install
scripts/sync-ports.sh  # generates .env.ports.local from ../../ports.yml
```

## Commands

```bash
pnpm dev      # dev server
pnpm build    # type-check + production build
pnpm preview  # preview production build
pnpm lint     # lint
pnpm format   # format
```

## Ports

Ports are defined in `ports.yml` at the monorepo root and generated into `.env.ports.local` (gitignored) by `scripts/sync-ports.sh`. Vite reads `PORT` from that file at startup.

To add this project to the registry, add an entry to `ports.yml`:

```yaml
your-project-name:
  vite: 5183
```

Then run `scripts/sync-ports.sh`.

## Conventions

- **Filenames** — lowercase only (`app.tsx`, not `App.tsx`)
- **Commits** — [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `ci:`, etc.
