"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Warehouse, Tag, Settings, Menu, ChevronLeft,
  LogOut, User, ChevronUp, Layers
} from "lucide-react";
import {
  cn, Button, Sheet, SheetContent, SheetTitle, SheetTrigger,
  Avatar, AvatarFallback,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@modernstores/ui";
import { Logo, LogoMark } from "@/components/layout/logo";

const mockUser = {
  name: "Admin User",
  email: "admin@modernstores.com",
  role: "Super Admin",
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products",  label: "Products",  icon: Package },
  { href: "/orders",    label: "Orders",    icon: ShoppingCart },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/inventory", label: "Inventory", icon: Warehouse },
  { href: "/promotions",label: "Promotions",icon: Tag },
  { href: "/ui-showcase",label: "UI Components",icon: Layers },
  { href: "/settings",  label: "Settings",  icon: Settings },
];

function SidebarNav({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              collapsed && "justify-center px-2",
              pathname.startsWith(href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && label}
          </Link>
        ))}
      </nav>

      {/* Bottom user menu */}
      <div className="border-t px-3 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors outline-none",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? mockUser.name : undefined}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {mockUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-sm font-medium leading-tight truncate w-full text-left">{mockUser.name}</span>
                    <span className="text-xs text-muted-foreground leading-tight truncate w-full text-left">{mockUser.role}</span>
                  </div>
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={collapsed ? "right" : "top"}
            align={collapsed ? "start" : "center"}
            sideOffset={8}
            className="w-56"
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                  {mockUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold truncate">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "justify-center px-2" : "px-6"
        )}>
          {collapsed ? (
            <Link href="/dashboard" className="text-primary">
              <LogoMark size={28} />
            </Link>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-2.5 text-primary">
              <Logo size={32} />
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tracking-tight leading-none">
                  Modern<span className="text-foreground">Stores</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Admin</span>
              </div>
            </Link>
          )}
        </div>
        <SidebarNav collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2.5 text-primary">
              <Logo size={32} />
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tracking-tight leading-none">
                  Modern<span className="text-foreground">Stores</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Admin</span>
              </div>
            </Link>
          </div>
          <SidebarNav />
        </SheetContent>
      </Sheet>
    </>
  );
}
