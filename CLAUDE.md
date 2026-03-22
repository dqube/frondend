# ModernStores Frontend — Claude Configuration

## Project Overview

Grocery e-commerce frontend monorepo with two applications:
- **Store** (`apps/store`) — Customer-facing storefront (Next.js)
- **Admin** (`apps/admin`) — Back-office management dashboard (Next.js)

Both connect to the ModernStores .NET Core microservices API via BFF endpoints.

## Architecture

```
frondend/
├── apps/
│   ├── store/          # Customer storefront (Next.js 15, App Router)
│   └── admin/          # Admin dashboard (Next.js 15, App Router)
├── libs/
│   ├── ui/             # Shared component library (shadcn/ui + reui)
│   ├── api-client/     # Generated/typed API clients for .NET BFF
│   ├── config/         # Shared ESLint, TypeScript, Tailwind configs
│   └── types/          # Shared TypeScript types
├── turbo.json
├── package.json
└── CLAUDE.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, RSC) |
| Monorepo | Turborepo |
| UI Primitives | shadcn/ui (Radix UI based) |
| UI Kit | reui |
| Styling | Tailwind CSS v4 |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| API | fetch / Axios → .NET Core BFF |
| Auth | NextAuth.js v5 (JWT from .NET AuthService) |
| Testing | Vitest + Testing Library + Playwright |
| Language | TypeScript (strict mode) |

## Responsive Breakpoints

Always build mobile-first. Target three viewports:
- **Mobile**: `< 768px` (sm)
- **Tablet**: `768px – 1279px` (md/lg)
- **Desktop**: `≥ 1280px` (xl/2xl)

## API Integration

Backend base URLs (configurable via `.env.local`):
- Store BFF: `NEXT_PUBLIC_STORE_API_URL`
- Admin BFF: `NEXT_PUBLIC_ADMIN_API_URL`
- Auth: `NEXT_PUBLIC_AUTH_API_URL`

JWT tokens issued by .NET `AuthService`. Pass as `Authorization: Bearer <token>`.

## Code Conventions

- **Components**: PascalCase, co-locate styles, keep under 200 lines
- **Hooks**: `use` prefix, single responsibility
- **API calls**: always in `lib/api/` or via TanStack Query hooks in `hooks/`
- **Types**: define in `libs/types`; never use `any`
- **Env vars**: prefix `NEXT_PUBLIC_` for client-side, plain for server-side
- **Imports**: use `@/` alias for app-level, `@modernstores/ui` for shared UI

## Commands

```bash
# Development
pnpm dev                          # All apps
pnpm --filter @modernstores/store dev    # Store only
pnpm --filter @modernstores/admin dev    # Admin only

# Build
pnpm build                        # All apps (Turborepo cached)

# Type check
pnpm typecheck

# Lint / Format
pnpm lint
pnpm format

# Test
pnpm test                         # Unit tests (Vitest)
pnpm test:e2e                     # E2E tests (Playwright)
```

## Key Domain Areas

**Store app**
- Product catalog & search
- Product detail (variants, pricing, stock)
- Cart & checkout
- Order tracking
- Customer authentication & profile
- Promotions & banners

**Admin app**
- Dashboard & analytics
- Inventory management
- Product & catalog management
- Order management
- Customer management
- Promotions & discounts
- Store settings

## Do's and Don'ts

- DO use Server Components for data-fetching; Client Components for interactivity
- DO use shadcn/ui components as the base; customize via `className` / `cn()`
- DO co-locate page-specific components inside the route folder
- DO handle loading and error states for all async operations
- DON'T fetch data in Client Components when a Server Component can do it
- DON'T commit `.env.local` or any secrets
- DON'T bypass TypeScript strict mode with `any` or `@ts-ignore`
- DON'T add unnecessary abstractions — prefer simple, direct code
