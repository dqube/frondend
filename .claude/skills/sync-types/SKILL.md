---
name: sync-types
description: Read .NET BFF DTOs and generate or update matching TypeScript types in packages/types
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: "<domain>"
---

Inspect .NET BFF DTO classes and sync them into `packages/types` as TypeScript interfaces.

## Arguments
`$ARGUMENTS`: domain name to sync (e.g. `products`, `orders`, `inventory`, `promotions`, `customers`)

Examples:
- `/sync-types products` → syncs Product DTOs from BFF
- `/sync-types orders` → syncs Order request/response types
- `/sync-types inventory`

## Steps

1. Search the .NET BFF source at `/Users/mdevendran/modernstores/modernstr/src/BFF/` for DTOs:
   ```
   Search for: class.*<domain>.*Dto|record.*<domain>|class.*<domain>Request|class.*<domain>Response
   File pattern: **/*.cs
   ```

2. Map C# types → TypeScript:

   | C# type | TypeScript type |
   |---------|----------------|
   | `string` | `string` |
   | `Guid` | `string` (add `// UUID` comment) |
   | `int`, `long`, `decimal`, `double`, `float` | `number` |
   | `bool` | `boolean` |
   | `DateTime`, `DateTimeOffset` | `string` (ISO 8601, add `// ISO 8601` comment) |
   | `List<T>`, `IEnumerable<T>`, `T[]` | `T[]` |
   | `Dictionary<K,V>` | `Record<K, V>` |
   | `T?` (nullable value type) | `T \| null` |
   | `string?` (nullable ref) | `string \| null` |
   | `enum` | TypeScript `enum` or string union |

3. Write/update `packages/types/src/<domain>.ts`:
   ```ts
   // Auto-synced from .NET BFF DTOs — manual additions below the divider are preserved
   // Source: src/BFF/.../Commands/<domain>/
   // Last synced: <today's date>

   export interface <Domain>Dto {
     id: string // UUID
     // ...
   }

   export interface Create<Domain>Request {
     // ...
   }
   ```

4. Update `packages/types/src/index.ts` to re-export: `export * from './<domain>'`

5. Output a summary of new/changed types.

## Rules
- Use `interface` for object shapes; `type` for unions and aliases
- Never use `any` — use `unknown` for truly dynamic shapes
- Preserve any manual type additions that already exist below a `// --- manual additions ---` divider
- Add JSDoc comments from C# XML doc comments (`/// <summary>`) if present
