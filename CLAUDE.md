# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Vite dev server (http://localhost:5173)
npm run build         # vue-tsc --noEmit + vite build
npm run preview       # Preview production build
npm run type-check    # TypeScript type check only (vue-tsc --noEmit)
```

No test framework is configured.

## Architecture

Kite Studio is a **Vue 3 + TypeScript** personal website with a **dual-portal** design:

- **Front portal** (`/`) — public-facing site with Home, Blog, AI Chat, Price Query, Gallery, Meditation, Profile. Uses `FrontLayout.vue`.
- **Admin portal** (`/admin`) — dashboard at `/admin/dashboard`. Uses `AdminLayout.vue`.

### Routing

Vue Router 5 with HTML5 history mode. Route definitions in `src/router/modules/front.routes.ts` and `admin.routes.ts`. Global `beforeEach` guard (`src/router/index.ts`) enforces auth via route meta fields: `requiresAuth`, `requiresAdmin`, `publicOnly`.

### API Layer

Axios instance at `src/api/request/index.ts`:
- Base URL: `/api` (proxied to `VITE_API_BASE_URL` in dev)
- Request interceptor attaches `Bearer <token>` from localStorage key `kite_front_token`
- Response interceptor unwraps and rejects when `res.code !== 200`
- API modules in `src/api/modules/` by domain (`auth.api.ts`, `ai.api.ts`, `admin.api.ts`, `price.api.ts`)

### Auth

`src/utils/auth.ts` — localStorage-based JWT. Token stored under `kite_front_token`, user info under `kite_front_auth_session`. Cross-component sync via custom `kite-auth-change` DOM event.

### State Management

Pinia is installed (`createPinia()` in `main.ts`) but not yet actively used. The current pattern is module-level `ref()` singletons in composables (see `src/composables/usePriceItemStore.ts`).

### Module Registry

`src/config/modules.ts` — declarative registry of feature modules with portal (`front`|`admin`) and status (`online`|`building`|`planning`). Used to track project progress, not for runtime behavior.

### Styling

SCSS with CSS custom properties (design tokens in `src/style/_tokens.scss`). No Tailwind. Element Plus is globally registered with theme overrides in `src/style/_element-plus.scss`. Components use `<style scoped lang="scss">` with BEM-style class naming.

### ECharts

`vue-echarts` globally registered as `<VChart>`. Common chart types and china-geojson map registered in `main.ts`.

## Conventions

- All Vue SFCs use `<script setup lang="ts">`
- PascalCase for component filenames and directory names
- Types: `src/types/modules/<domain>.type.ts`, barrel-exported from `src/types/index.ts`
- API modules: `src/api/modules/<domain>.api.ts`
- Path alias `@/` maps to `src/`
- Prettier: 150 printWidth, single quotes, semi, es5 trailing commas
- Commit messages in Chinese, numbered list format (e.g., `1. 修复XX，`)
