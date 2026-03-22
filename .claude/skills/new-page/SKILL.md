---
name: new-page
description: Scaffold a new Next.js App Router page with layout, loading, and error states
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: "<app> <route> [description]"
---

Scaffold a complete Next.js App Router page for the ModernStores project.

## Arguments
`$ARGUMENTS` format: `<app> <route> [description]`
- `<app>`: `store` | `admin`
- `<route>`: URL path, e.g. `products/[id]`, `checkout`, `orders`
- `[description]`: optional description of the page purpose

Examples:
- `/new-page store products/[id]` → Product detail page
- `/new-page admin inventory` → Inventory management page
- `/new-page store checkout "Multi-step checkout flow"`

## Files to create

Parse `$ARGUMENTS` and create under `apps/<app>/app/(routes)/<route>/`:

### page.tsx (Server Component — no `'use client'`)
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '<PageName> | ModernStores',
}

export default async function <PageName>Page() {
  // TODO: fetch data server-side via lib/api/
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6"><PageName></h1>
      {/* page content */}
    </div>
  )
}
```

### loading.tsx (Skeleton state)
```tsx
import { Skeleton } from '@modernstores/ui'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
```

### error.tsx (must be `'use client'`)
```tsx
'use client'
import { Button } from '@modernstores/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-6 text-center space-y-4">
      <p className="text-destructive text-sm">{error.message}</p>
      <Button variant="outline" onClick={reset}>Try again</Button>
    </div>
  )
}
```

### _components/ directory
Create an empty `_components/.gitkeep` placeholder for page-scoped client components.

## After creating files
Output the list of paths created and remind the user to:
1. Add data-fetching functions in `apps/<app>/lib/api/<domain>.ts`
2. Register the route in the app navigation if it needs a nav link
