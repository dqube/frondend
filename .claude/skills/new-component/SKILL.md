---
name: new-component
description: Scaffold a typed responsive React component using shadcn/ui primitives with a unit test
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: "<scope> <ComponentName> [description]"
---

Scaffold a typed, responsive React component for the ModernStores project.

## Arguments
`$ARGUMENTS` format: `<scope> <ComponentName> [description]`
- `<scope>`: `ui` (shared `packages/ui`) | `store` | `admin`
- `<ComponentName>`: PascalCase name
- `[description]`: optional description of what the component does

Examples:
- `/new-component ui ProductCard "Product image, name, price and add-to-cart"`
- `/new-component store CartDrawer "Slide-over cart with line items and total"`
- `/new-component admin DataTable "Generic sortable paginated table"`

## Target directory
- `ui` → `packages/ui/src/components/<ComponentName>/`
- `store`/`admin` → `apps/<scope>/components/<ComponentName>/`

## Files to create

### `<ComponentName>.tsx`
```tsx
import { cn } from '@modernstores/ui/lib/utils'

interface <ComponentName>Props {
  className?: string
  // add typed props derived from [description]
}

export function <ComponentName>({ className, ...props }: <ComponentName>Props) {
  return (
    <div className={cn('', className)}>
      {/* implementation — use shadcn/ui primitives, never raw HTML buttons/inputs */}
    </div>
  )
}
```

### `<ComponentName>.test.tsx`
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { <ComponentName> } from './<ComponentName>'

describe('<ComponentName>', () => {
  it('renders without crashing', () => {
    render(<ComponentName />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })
})
```

### `index.ts`
```ts
export { <ComponentName> } from './<ComponentName>'
export type { <ComponentName>Props } from './<ComponentName>'
```

## Additional steps
- If scope is `ui`: also add the export to `packages/ui/src/index.ts`
- Always use `cn()` for className merging
- Build mobile-first: default styles target mobile, use `md:` and `lg:` prefixes for larger screens
- Use shadcn/ui primitives (Button, Card, Badge, Input, etc.) — never raw HTML form elements
- Interactive elements must be at least 44×44px (`min-h-11 min-w-11`)
