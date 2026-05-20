# template.react.vite

[![CI](https://github.com/kirilenko/template.react.vite/actions/workflows/ci.yml/badge.svg)](https://github.com/kirilenko/template.react.vite/actions/workflows/ci.yml)

React SPA template powered by Vite.

## Stack

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- [TypeScript 5](https://www.typescriptlang.org)
- [Vite 6](https://vite.dev)
- [React Router 7](https://reactrouter.com)
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
pnpm lint         # type-check + lint + format
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

## Architecture

```
src/
├── app/                        # app entry point
│   ├── app.tsx                 # renders RouterProvider
│   ├── app.router.tsx          # composes module routers into createBrowserRouter
│   ├── app.test.tsx
│   ├── index.ts
│   └── layout/                 # root layout; add header/, sidebar/ here as needed
│       ├── layout.tsx
│       └── index.ts
├── modules/                    # feature modules
│   └── news/                   # one folder per feature
│       ├── index.ts            # public API — only what's listed here is visible outside
│       ├── news.page.tsx       # route entry point; assembles sub-components (private)
│       ├── news.router.tsx     # RouteObject for this module; exported via index.ts
│       ├── news-feed/          # folder structure mirrors component tree on screen
│       │   ├── news-feed.tsx
│       │   ├── index.ts
│       │   └── news-card/
│       │       ├── news-card.tsx
│       │       └── index.ts
│       ├── news-filters/
│       │   ├── news-filters.tsx
│       │   └── index.ts
│       └── news-search/
│           ├── news-search.tsx
│           └── index.ts
├── services/                   # data layer
│   └── news/
│       ├── index.ts
│       ├── news.schema.ts      # data model (ready for valibot/zod parser)
│       └── use.news.reading.ts # useNewsReading — name reflects the operation
└── main.tsx                    # vite entry point
```

**Key rules:**

- **Named exports only** — no `export default`; renames are caught by TypeScript and the IDE
- **`index.ts` as public API** — every folder exposes only what's listed in its `index.ts`; files that grow sideways (tests, mocks, utils) stay private
- **Types co-located** — types live next to the component that owns them; parents may import from children, siblings don't import from each other
- **Services are shared** — hooks and schemas in `services/` can be used by any module; hook filenames follow `use.{entity}.{operation}.ts`
- **`.page.tsx`** — route entry point of a module; private, not exported from `index.ts`
- **`.router.tsx`** — declares the module's `RouteObject`; the only routing-related export; composed in `app.router.tsx`

## Conventions

- **Filenames** — lowercase only (`app.tsx`, not `App.tsx`)
- **Commits** — [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `ci:`, etc.
