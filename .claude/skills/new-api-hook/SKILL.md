---
name: new-api-hook
description: Scaffold a TanStack Query hook and API fetch function for a .NET BFF endpoint
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: "<app> <domain> <operation> [GET|POST|PUT|PATCH|DELETE]"
---

Scaffold a typed TanStack Query hook that calls the ModernStores .NET Core BFF API.

## Arguments
`$ARGUMENTS` format: `<app> <domain> <operation> [method]`
- `<app>`: `store` | `admin`
- `<domain>`: e.g. `products`, `orders`, `cart`, `inventory`, `promotions`
- `<operation>`: camelCase, e.g. `list`, `getById`, `create`, `update`, `delete`
- `[method]`: `GET` (default) | `POST` | `PUT` | `PATCH` | `DELETE`

Examples:
- `/new-api-hook store products list` → `useProductsList` query
- `/new-api-hook store cart addItem POST` → `useCartAddItem` mutation
- `/new-api-hook admin orders updateStatus PATCH` → `useOrdersUpdateStatus` mutation

## Files to create

### `apps/<app>/hooks/use-<domain>-<operation>.ts`

**For GET (useQuery):**
```ts
import { useQuery } from '@tanstack/react-query'
import { fetch<Domain><Operation> } from '@/lib/api/<domain>'
import type { <Domain>ListParams } from '@modernstores/types'

export function use<Domain><Operation>(params?: <Domain>ListParams) {
  return useQuery({
    queryKey: ['<domain>', '<operation>', params],
    queryFn: () => fetch<Domain><Operation>(params),
  })
}
```

**For mutations (POST/PUT/PATCH/DELETE):**
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { <domain><Operation> } from '@/lib/api/<domain>'

export function use<Domain><Operation>() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: <domain><Operation>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['<domain>'] })
    },
  })
}
```

### `apps/<app>/lib/api/<domain>.ts` (create or update)
```ts
import { apiClient } from '@/lib/api-client'
import type { <DomainType> } from '@modernstores/types'

export async function fetch<Domain><Operation>(params?: unknown): Promise<<DomainType>[]> {
  const { data } = await apiClient.get<<DomainType>[]>('/<domain>')
  return data
}
```

## Rules
- Never use `any` — check `packages/types` for existing types before creating new ones
- Use `snake_case` array segments for query keys that mirror the API route
- Always invalidate related queries on mutation success
- Do not catch errors locally — the global `apiClient` interceptor handles them
