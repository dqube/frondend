"use client";

import Link from "next/link";
import { ShoppingCart, ChevronDown, Package, LogOut, User, Settings, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ThemeToggle,
} from "@modernstores/ui";
import { motion } from "motion/react";
import { Logo } from "./logo";

const NAV_ITEMS = [
  {
    label: "Categories",
    href: "/products",
    children: [
      { label: "Fresh Vegetables", href: "/products?category=vegetables" },
      { label: "Fruits & Berries",  href: "/products?category=fruits" },
      { label: "Dairy & Eggs",      href: "/products?category=dairy" },
      { label: "Meat & Seafood",    href: "/products?category=meat" },
      { label: "Bakery",            href: "/products?category=bakery" },
      { label: "Snacks & Drinks",   href: "/products?category=snacks" },
    ],
  },
  {
    label: "Dietary",
    href: "/products?diet=all",
    children: [
      { label: "Organic",      href: "/products?diet=organic" },
      { label: "Vegan",        href: "/products?diet=vegan" },
      { label: "Gluten Free",  href: "/products?diet=gluten-free" },
      { label: "Keto",         href: "/products?diet=keto" },
      { label: "Low Calorie",  href: "/products?diet=low-calorie" },
    ],
  },
  { label: "Shops",  href: "/shops" },
  { label: "Deals",  href: "/products?sort=sale" },
];

// TODO: replace with useSession() from next-auth
const mockUser = {
  name: "Jane Smith",
  email: "jane@example.com",
};

export function Header() {
  const user = mockUser;
  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <motion.div
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Logo />
          <span className="text-lg font-bold tracking-tight leading-none">
            Modern<span className="text-foreground">Stores</span>
          </span>
        </Link>
        </motion.div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV_ITEMS.map((item, index) =>
            item.children ? (
              <motion.div
                key={item.label}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: "easeOut" }}
              >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors outline-none">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={8}
                  className="rounded-2xl border border-border/80 bg-popover/80 backdrop-blur-md p-2 shadow-lg min-w-[180px]"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label} asChild>
                      <Link href={child.href} className="px-3 py-2 rounded-xl text-sm cursor-pointer hover:bg-primary/10 transition-colors">
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                key={item.label}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: "easeOut" }}
              >
              <Link
                href={item.href!}
                className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                {item.label}
              </Link>
              </motion.div>
            )
          )}
        </nav>

        {/* Actions */}
        <motion.div
          initial={{ x: 16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          {/* Search */}
          <button
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/60 border border-border/80 text-foreground hover:bg-accent transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/60 border border-border/80 text-foreground hover:bg-accent transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              4
            </span>
          </Link>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-accent/60 border border-border/80 px-2 py-1 hover:bg-accent transition-colors outline-none">
                {/* Avatar circle */}
                <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </span>
                <span className="hidden sm:block text-sm font-medium text-foreground pr-0.5 max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-60 rounded-2xl border border-border/80 bg-popover/80 backdrop-blur-md p-2 shadow-lg"
            >
              {/* User info header */}
              <div className="flex items-center gap-3 px-2 py-2.5 mb-1">
                <span className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  {initials}
                </span>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight truncate">{user.email}</p>
                </div>
              </div>

              <DropdownMenuSeparator className="bg-border/50 mx-1" />

              <div className="py-1 space-y-0.5">
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                    <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm font-medium">Orders</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                    <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                    <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Settings className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-border/50 mx-1" />

              <div className="py-1">
                <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer hover:bg-destructive/10 transition-colors group">
                  <span className="h-7 w-7 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <LogOut className="h-3.5 w-3.5 text-destructive" />
                  </span>
                  <span className="text-sm font-medium text-destructive">Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
}
