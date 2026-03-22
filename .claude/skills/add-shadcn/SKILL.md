---
name: add-shadcn
description: Add one or more shadcn/ui components to packages/ui and export them
user-invocable: true
allowed-tools: Bash, Read, Edit, Glob
argument-hint: "<component> [component2] ..."
---

Add shadcn/ui components to the shared `packages/ui` package and wire up their exports.

## Arguments
`$ARGUMENTS`: one or more shadcn component names (space-separated)

Examples:
- `/add-shadcn button card badge`
- `/add-shadcn data-table`
- `/add-shadcn calendar date-picker popover`

## Steps

For each component in `$ARGUMENTS`:

1. Run the shadcn CLI from the `packages/ui` directory:
   ```bash
   pnpm --filter @modernstores/ui dlx shadcn@latest add <component> --yes
   ```

2. Verify the file was added at `packages/ui/src/components/ui/<component>.tsx`

3. Ensure it is exported from `packages/ui/src/index.ts`:
   ```ts
   export * from './components/ui/<component>'
   ```
   If the export line already exists, skip.

4. If the component has peer dependencies (e.g. `cmdk` for command, `react-day-picker` for calendar), confirm they were added to `packages/ui/package.json`.

5. Output a usage snippet:
   ```ts
   // Import in any app:
   import { Button } from '@modernstores/ui'
   ```

## Note
shadcn/ui components are **copied into the repo** — they belong to you. After adding, consider whether default styles should be adjusted to match ModernStores design tokens defined in `packages/config/tailwind/`.
