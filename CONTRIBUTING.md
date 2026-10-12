# Contributing to Vesuvia

Thanks for helping out. The project is small, so the process is too.

## Setup

Requires Node.js 20.9 or newer. No environment variables and no database.

```bash
git clone https://github.com/luciococorullo/vesuvia-search.git
cd vesuvia-search
npm ci
npm run dev   # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm start` | Production build and server |
| `npm test` / `npm run test:watch` | Vitest |
| `npm run lint` / `npm run lint:fix` | ESLint (flat config) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` / `npm run format:check` | Prettier |
| `npm run generate-icons` | Regenerate PWA icons |

Before opening a PR, run `npm run lint`, `npm run type-check`, `npm test` and `npm run build`.

## Tests and fixtures

Tests sit in `__tests__` folders next to the code and never call EAV. They use recorded real responses in `src/lib/eav/__tests__/fixtures/` (planner JSON, board HTML, orariotreni homepage) and `src/lib/search/__tests__/fixtures/`. When EAV changes a format, save a fresh response as a fixture, add a failing test, then fix the parser. See [docs/EAV.md](docs/EAV.md) for the upstream quirks.

## Code style

- TypeScript, strict. Validate every external payload with zod.
- Keep EAV-specific logic in `src/lib/eav/`; routes stay thin.
- New UI strings go in `src/lib/i18n.ts` for all six languages (Italian is the source of truth).
- Station aliases in `src/lib/search/aliases.ts` are keyed by normalised station name, never by id.
- Do not add hand-maintained station or timetable data: it must come from EAV.

## Pull requests

1. Branch from `main` (`feat/...` or `fix/...`).
2. Keep PRs focused and describe what changed and why. Use conventional-style messages (`feat:`, `fix:`, `docs:`, `chore:`).
3. Make sure the checks above pass, and add or update tests for behaviour changes.

## Reporting issues

Open a GitHub issue with the stations, date and time involved and what you expected. Remember that the data belongs to EAV and the app is unofficial.
