"use client";

import { Bell, LogOut, User, Settings, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  Button,
  Avatar,
  AvatarFallback,
  ThemeToggle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@modernstores/ui";
import Link from "next/link";

const mockUser = {
  name: "Admin User",
  email: "admin@modernstores.com",
  role: "Super Admin",
};

interface TopbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Topbar({ collapsed, onToggleCollapse }: TopbarProps) {
  const initials = mockUser.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <header className="flex h-14 md:h-16 items-center justify-between border-b bg-card pl-14 pr-4 md:px-6">
      <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="hidden md:flex h-8 w-8">
        {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </Button>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors outline-none">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium leading-tight">{mockUser.name}</span>
                <span className="text-xs text-muted-foreground leading-tight">{mockUser.role}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} className="w-56">
            {/* User info header */}
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                  {initials}
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
    </header>
  );
}
