---
name: dev
description: Start the Next.js development server for store, admin, or all apps
user-invocable: true
allowed-tools: Bash
argument-hint: "[store|admin|all]"
---

Start ModernStores development servers.

## Arguments
`$ARGUMENTS`: `store` | `admin` | `all` (default: all)

## Steps

1. Check for port conflicts first:
   ```bash
   lsof -ti:3000,3001
   ```
   If ports are in use, inform the user and ask whether to kill existing processes before continuing.

2. Start the appropriate server:

   - No args or `all`:
     ```bash
     pnpm dev
     ```
   - `store`:
     ```bash
     pnpm --filter @modernstores/store dev
     ```
   - `admin`:
     ```bash
     pnpm --filter @modernstores/admin dev
     ```

3. Remind the user that each app needs a `.env.local` file:

   **apps/store/.env.local**
   ```
   NEXT_PUBLIC_STORE_API_URL=http://localhost:5200
   NEXT_PUBLIC_AUTH_API_URL=http://localhost:5100
   NEXTAUTH_SECRET=<your-secret>
   NEXTAUTH_URL=http://localhost:3000
   ```

   **apps/admin/.env.local**
   ```
   NEXT_PUBLIC_ADMIN_API_URL=http://localhost:5130
   NEXT_PUBLIC_AUTH_API_URL=http://localhost:5100
   NEXTAUTH_SECRET=<your-secret>
   NEXTAUTH_URL=http://localhost:3001
   ```

Default ports:
- Store: http://localhost:3000
- Admin: http://localhost:3001
