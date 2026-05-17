# template.react.vite

React SPA template powered by Vite.

## Stack

- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Vite 6](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [ESLint 9](https://eslint.org) + [Prettier 3](https://prettier.io)
- [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com)

## Setup

Requires [direnv](https://direnv.net) and [nvm](https://github.com/nvm-sh/nvm). On first use:

```bash
pnpm setup             # installs correct node + pnpm versions, runs pnpm install
direnv allow           # enables auto-loading .nvmrc and corepack on directory entry
scripts/sync-ports.sh  # generates .env.ports.local from ../../ports.yml
```

## Commands

```bash
pnpm dev      # dev server
pnpm build    # type-check + production build
pnpm preview  # preview production build
pnpm test         # run tests once
pnpm test:watch   # run tests in watch mode
pnpm lint         # lint + format
pnpm format       # format only
```

## Ports

Ports are defined in `ports.yml` at the monorepo root and generated into `.env.ports.local` (gitignored) by `scripts/sync-ports.sh`. Vite reads `PORT` from that file at startup.

To add this project to the registry, add an entry to `ports.yml`:

```yaml
your-project-name:
  vite: 5183
```

Then run `scripts/sync-ports.sh`.

## SEO

Search engine indexing is **disabled by default** — `public/robots.txt` and the `<meta name="robots">` tag in `index.html` both set `noindex, nofollow`.

For a public production site, remove both:

- `public/robots.txt` — replace `Disallow: /` with `Disallow:`
- `index.html` — remove the `<meta name="robots" ...>` line

## Conventions

- **Filenames** — lowercase only (`app.tsx`, not `App.tsx`)
- **Commits** — [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `ci:`, etc.
