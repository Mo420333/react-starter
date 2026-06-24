# react-starter

[![CI](https://github.com/Mo420333/react-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Mo420333/react-starter/actions/workflows/ci.yml)

A minimal React starter built with Vite and TypeScript, styled with Tailwind CSS v4, with routing, a small Todos feature, and a full test suite with enforced coverage.

## Stack

- **[Vite](https://vite.dev/)** + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** (via `@tailwindcss/vite`)
- **[react-router-dom](https://reactrouter.com/)** for routing
- **[Vitest](https://vitest.dev/)** + **[React Testing Library](https://testing-library.com/)** with V8 coverage
- **[Oxlint](https://oxc.rs/)** for linting

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint with Oxlint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with a V8 coverage report (thresholds enforced) |

## Project structure

```
src/
├── main.tsx              # entry — wraps the app in <BrowserRouter>
├── App.tsx               # route table
├── index.css             # Tailwind import
├── components/
│   └── Layout.tsx        # shared header/nav/footer + <Outlet>
├── pages/
│   ├── Home.tsx
│   ├── Todos.tsx         # add/toggle/delete/filter todos, persisted
│   ├── About.tsx
│   └── NotFound.tsx      # 404 catch-all
├── hooks/
│   └── useLocalStorage.ts
├── lib/
│   └── todos.ts          # pure todo logic (unit-tested)
└── test/
    └── setup.ts          # jest-dom matchers + localStorage polyfill
```

## Testing & coverage

Tests live next to the code they cover (`*.test.ts` / `*.test.tsx`). Coverage is
collected with the V8 provider and the build fails if it drops below the
thresholds configured in `vite.config.ts` (90% statements/functions/lines,
85% branches).

```bash
npm run test:coverage
open coverage/index.html   # browse the HTML report
```

## CI

`.github/workflows/ci.yml` runs on every push to `main` and on pull requests:
**lint → test (with coverage) → build**, and uploads the coverage report as a
build artifact.

## License

[MIT](./LICENSE)
