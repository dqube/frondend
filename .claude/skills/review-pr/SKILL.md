---
name: review-pr
description: Review all changed files in the current branch for code quality, responsiveness, API correctness, and security
user-invocable: true
allowed-tools: Bash, Read, Grep, Glob
---

Review all changed files in the current branch against `main` before submitting a PR.

## Steps

1. Get the list of changed files:
   ```bash
   git diff main...HEAD --name-only
   ```

2. For each changed `.tsx` / `.ts` file, run this checklist:

### TypeScript
- [ ] No `any` types — use proper types from `packages/types` or `unknown`
- [ ] All component props have interfaces
- [ ] API response shapes match `packages/types`

### React / Next.js
- [ ] Server Components used for data fetching (no `'use client'` unless required)
- [ ] `'use client'` only when: event handlers, hooks, browser APIs, TanStack Query
- [ ] `loading.tsx` and `error.tsx` exist for new routes
- [ ] `next/image` used for all images (no `<img>`)
- [ ] Forms use React Hook Form + Zod, not uncontrolled inputs

### Responsive design
- [ ] Mobile-first Tailwind — base styles for mobile, `md:` / `lg:` for larger
- [ ] No fixed pixel widths breaking mobile layout
- [ ] Interactive elements ≥ 44×44px tap target

### Performance
- [ ] Heavy Client Components wrapped with `next/dynamic`
- [ ] No unnecessary `useEffect` for data that can be fetched server-side

### Accessibility
- [ ] Buttons and links have accessible labels (`aria-label` or visible text)
- [ ] Color is not the only visual indicator of meaning
- [ ] Focus styles visible (not removed with `outline-none` without replacement)

### Security
- [ ] No secrets or tokens hardcoded
- [ ] No `dangerouslySetInnerHTML` with unsanitized user input
- [ ] Auth token from NextAuth session, not `localStorage`
- [ ] Admin-only routes check `userType === 'Admin'` server-side

## Output format
```
## PR Review: <branch-name>

### Must Fix
- path/file.tsx:42 — description

### Warnings
- path/file.tsx:10 — description

### Looks Good
- TypeScript strict ✓
- Mobile-first layout ✓
- ...
```
