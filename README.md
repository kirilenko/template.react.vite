# template.react.vite

[![CI](https://github.com/kirilenko/template.react.vite/actions/workflows/ci.yml/badge.svg)](https://github.com/kirilenko/template.react.vite/actions/workflows/ci.yml)

Production-ready React SPA starter with TypeScript, TanStack Router, Tailwind CSS 4, and a modular feature-based architecture. Ships with role-based access control, a json-server-backed mock REST API, and a full lint/test/format toolchain out of the box.

## Stack

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- [TypeScript 5](https://www.typescriptlang.org)
- [Vite 6](https://vite.dev)
- [TanStack Router 1](https://tanstack.com/router)
- [Tailwind CSS 4](https://tailwindcss.com)
- [ESLint 9](https://eslint.org) + [Prettier 3](https://prettier.io)
- [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com)
- [json-server](https://github.com/typicode/json-server) — mock REST API backed by `db.json`

## Setup

Requires [direnv](https://direnv.net) and [nvm](https://github.com/nvm-sh/nvm). On first use:

```bash
pnpm setup             # installs correct node + pnpm versions, runs pnpm install
direnv allow           # enables auto-loading .nvmrc and corepack on directory entry
scripts/sync-ports.sh  # generates .env.ports.local from ../../ports.yml
cp .env.example .env   # create local env file (edit as needed)
```

## Commands

```bash
pnpm mock     # mock API server (json-server, port from MOCK_PORT in .env.ports.local; Vite proxies /api to it)
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
  mock: 3005
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
│   ├── app.router.tsx          # defines all routes using createRouter; access control via beforeLoad
│   ├── app.test.tsx
│   ├── index.ts
│   └── layout/                 # root layout; add header/, sidebar/ here as needed
│       ├── layout.tsx
│       ├── index.ts
│       └── sub-header/         # mounts route-specific sub-header via staticData.SubHeader
│           ├── sub-header.tsx
│           └── index.ts
├── modules/                    # feature modules
│   └── news/                   # one folder per feature
│       ├── index.ts            # public API — only what's listed here is visible outside
│       ├── news.page.tsx       # route entry point; assembles sub-components (private)
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
├── config/                     # app-wide constants
│   ├── env.ts                  # declares all VITE_* vars via parseEnv
│   ├── paths.ts                # all route path strings
│   └── index.ts
├── libs/                       # framework-level utilities; no domain knowledge
│   ├── rest/                   # fetch wrapper — rest.get<T>(path) prepends VITE_REST_URL
│   ├── env/                    # parseEnv — reads import.meta.env, coerces types, throws on missing required vars
│   ├── error-boundary/         # class-based ErrorBoundary with fallback and onError callback
│   └── router/                 # RouterContext and RouteStaticData types for TanStack Router
├── services/                   # data layer
│   └── news/
│       ├── index.ts
│       ├── news.mock-creator.ts  # generates news.local.json (gitignored); run via pnpm mock
│       ├── news.schema.ts        # data model (ready for valibot/zod parser)
│       └── use.news.reading.ts   # useNewsReading — name reflects the operation
└── main.tsx                    # vite entry point
```

**Key rules:**

- **Named exports only** — no `export default`; renames are caught by TypeScript and the IDE
- **`index.ts` as public API** — every folder exposes only what's listed in its `index.ts`; files that grow sideways (tests, mocks, utils) stay private
- **Types co-located** — types live next to the component that owns them; parents may import from children, siblings don't import from each other
- **Services are shared** — hooks and schemas in `services/` can be used by any module; hook filenames follow `use.{entity}.{operation}.ts`
- **`.page.tsx`** — route entry point of a module; private, not exported from `index.ts`
- **`config/env.ts`** — single source of truth for all `VITE_*` vars; declare each var here via `parseEnv`, then import `env` from `@/config` anywhere in the app; add the matching variable to `.env.example`, `.env.test`, and local `.env`
- **`*.mock-creator.ts`** — co-located with its service; generates a `*.local.json` file (gitignored) when `pnpm mock` runs; all `*.local.json` files found under `MOCK_CREATOR_PATHS` are merged into `db.json` (also gitignored) by `scripts/mock-collect.js`
- **`config/paths.ts`** — all route path strings in one const object; always import from here, never hardcode strings in routers or `<Link>` components
- **`beforeLoad` on routes** — access control lives in `beforeLoad`; throw `redirect(...)` to guard a route; private routes are grouped under `_private`, public-only under `_public-only`, both defined in `app.router.tsx`
- **`lazyRouteComponent`** — use `lazyRouteComponent(() => import(...))` for code-split routes; TanStack Router handles suspense automatically, no `<Suspense>` wrapper needed
- **`staticData.SubHeader`** — pass a component via `staticData: { SubHeader }` on a route to render a route-specific sub-header; the root layout reads it from the current match and mounts it in the designated slot
- **`libs/`** — framework utilities shared across all layers; they have no domain knowledge and never import from `modules/` or `services/`; `libs/router` provides `RouterContext` and `RouteStaticData` types for TanStack Router, `libs/error-boundary` provides a class-based fallback boundary, `libs/env` provides `parseEnv`

## Conventions

- **Filenames** — lowercase only (`app.tsx`, not `App.tsx`)
- **Commits** — [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `ci:`, etc.
