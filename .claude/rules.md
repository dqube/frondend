# ModernStores Frontend — Claude Rules

These rules apply to all AI-assisted work in this repository.

---

## 1. Architecture Rules

### Server vs Client Components
- Default to **Server Components** — they run on the server and have zero JS bundle cost
- Add `'use client'` only when the component uses: event handlers (`onClick`), React hooks (`useState`, `useEffect`), browser APIs, or TanStack Query hooks
- Never call `fetch()` or use `async/await` directly inside Client Components — use TanStack Query

### Data Fetching
- Fetch data in Server Components or Route Handlers (`app/api/`)
- Use TanStack Query (`useQuery`, `useMutation`) for all client-side data operations
- API call implementations live in `apps/<app>/lib/api/<domain>.ts`
- Query hooks live in `apps/<app>/hooks/use-<domain>.ts`

### File Structure
```
app/
├── (routes)/          # Route groups (no URL segment)
│   └── <route>/
│       ├── page.tsx       # Server Component — data fetching entry point
│       ├── loading.tsx    # Skeleton UI
│       ├── error.tsx      # Error boundary (must be 'use client')
│       └── _components/   # Page-scoped Client Components
├── api/               # Route Handlers (API routes)
└── layout.tsx
```

---

## 2. Styling Rules

### Tailwind CSS
- Always **mobile-first**: write base styles for mobile, add `md:` and `lg:` for larger screens
- Use design tokens from `packages/config/tailwind` — never hardcode colors
- Use `cn()` from `@modernstores/ui` for conditional classNames
- Minimum interactive target size: 44×44px (`min-h-11 min-w-11`)

### shadcn/ui
- All UI primitives come from shadcn/ui installed in `packages/ui`
- Never use raw HTML `<button>`, `<input>`, `<select>` — always use shadcn equivalents
- Customize via `className` prop + `cn()`, not by modifying the component source
- Import from `@modernstores/ui`, not from individual shadcn paths

---

## 3. TypeScript Rules

- **Strict mode** is enabled — no `any`, no `@ts-ignore` without explanation
- All API request/response shapes must have types in `packages/types`
- Use `interface` for object shapes; `type` for unions and aliases
- Prefer `unknown` over `any` for truly dynamic values, then narrow with type guards

---

## 4. API Integration Rules

### Auth
- JWT tokens come from NextAuth.js session (backed by .NET AuthService)
- Always retrieve token via `getServerSession()` (server) or `useSession()` (client)
- Never store tokens in `localStorage` or `sessionStorage`
- Token claim `userType` determines role: `Admin` | `Customer`

### HTTP Client
- All HTTP calls go through `packages/api-client` which wraps fetch with:
  - Base URL from env
  - `Authorization: Bearer <token>` header injection
  - Centralized error handling (4xx → toast, 5xx → error boundary)
- Never use raw `fetch()` or `axios` in components — always use the shared client

### Error Handling
- 401 → redirect to login (handled by NextAuth)
- 403 → show "Unauthorized" page
- 404 → use Next.js `notFound()` helper
- 5xx → propagate to nearest error boundary

---

## 5. Form Rules

- Use **React Hook Form** + **Zod** for all forms
- Schema lives co-located with the form: `<FormName>.schema.ts`
- Use shadcn/ui `Form`, `FormField`, `FormItem`, `FormMessage` components
- Always disable submit button while mutation is pending

---

## 6. Performance Rules

- Use `next/image` for all images — never `<img>`
- Lazy-load heavy Client Components with `next/dynamic`
- Memoize expensive calculations with `useMemo`; stabilize callbacks with `useCallback` only when needed
- Keep Client Component bundles small — extract heavy dependencies to Server Components

---

## 7. Testing Rules

- Unit tests: Vitest + Testing Library — one test file per component
- E2E tests: Playwright — cover critical user journeys (login, add to cart, checkout)
- Test behavior, not implementation — query by role/label, not by class names
- Mock the API client (`packages/api-client`) in unit tests; use real API in E2E

---

## 8. Security Rules

- **Never** commit `.env.local` or any file containing secrets
- Sanitize all user input before rendering (XSS prevention)
- Use `next/headers` + httpOnly cookies for session tokens — never expose to JS
- Admin routes must check `userType === 'Admin'` on the server side
- CSP headers configured in `next.config.ts`
