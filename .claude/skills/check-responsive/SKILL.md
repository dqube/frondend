---
name: check-responsive
description: Audit a component or page for responsive design issues across mobile, tablet, and desktop breakpoints
user-invocable: true
allowed-tools: Read, Grep, Glob
argument-hint: "<file-or-directory>"
---

Audit Tailwind CSS classes in the given file or directory for responsive design issues.

## Arguments
`$ARGUMENTS`: file path or directory to audit

Examples:
- `/check-responsive apps/store/app/(routes)/products/page.tsx`
- `/check-responsive apps/store/components/ProductCard`
- `/check-responsive apps/admin/components`

## What to check

Read all `.tsx` files in the target. For each file, scan for these anti-patterns:

| Issue | What to look for | Correct pattern |
|-------|-----------------|-----------------|
| No mobile grid | `grid-cols-2` or `grid-cols-3` without `grid-cols-1` base | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Fixed pixel width | `w-[Npx]` without responsive override | Use `max-w-*` or add responsive variants |
| Small tap target | `p-1` or `p-2` on a `<Button>` or `<a>` | Minimum `p-3` / `min-h-11 min-w-11` |
| Non-responsive text | `text-3xl` or larger without smaller base size | `text-xl md:text-2xl lg:text-3xl` |
| Fixed height | `h-[Npx]` on containers | Use `min-h-*` or responsive heights |
| Desktop-only visible | `hidden md:block` with no mobile fallback | Ensure content is accessible on mobile |
| Missing container padding | `container` without `px-4` | Add `px-4` for mobile edge spacing |

## Breakpoint reference
- `sm`: 640px — large phones landscape
- `md`: 768px — tablets
- `lg`: 1024px — small desktops
- `xl`: 1280px — desktop
- `2xl`: 1536px — large desktop

## Output format
```
## Responsive Audit: <filename>

### Issues Found
- Line X: <issue> → suggested fix

### Looks Good
- Mobile-first grid ✓
- Responsive typography ✓

### Suggested Changes
// before
<div className="grid-cols-3 gap-4">

// after
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

If no issues found, confirm the file is responsive-ready.
