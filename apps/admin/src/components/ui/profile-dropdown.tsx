"use client";

/**
 * Profile Dropdown — adapted from KokonutUI
 * @author @dorianbaffier · MIT License
 * @website https://kokonutui.com
 */

import * as React from "react";
import {
  cn,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@modernstores/ui";
import {
  Building2,
  CreditCard,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Profile {
  name: string;
  email: string;
  plan?: string;
  role?: string;
}

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

// ─── Default data ───────────────────────────────────────────────────────────────

const SAMPLE_PROFILE: Profile = {
  name: "Alex Morgan",
  email: "alex@modernstores.com",
  plan: "Business",
  role: "Store Manager",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Component ──────────────────────────────────────────────────────────────────

export interface ProfileDropdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile;
  onSignOut?: () => void;
}

export function ProfileDropdown({
  data = SAMPLE_PROFILE,
  className,
  onSignOut,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Store Plan",
      value: data.plan,
      href: "/settings/billing",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      label: "Billing",
      href: "/settings/billing",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
      external: true,
    },
  ];

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <div className="group relative">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
            >
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                  {data.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight">
                  {data.email}
                </div>
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-primary/70 to-primary/40 p-0.5">
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs rounded-full">
                      {getInitials(data.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}
          <div
            className={cn(
              "absolute -right-3 top-1/2 -translate-y-1/2 transition-all duration-200",
              isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100",
            )}
          >
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              className={cn(
                "transition-all duration-200",
                isOpen
                  ? "text-primary scale-110"
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300",
              )}
              aria-hidden="true"
            >
              <path
                d="M2 4C6 8 6 16 2 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-64 p-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20 origin-top-right"
          >
            <div className="space-y-1">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-sm border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-700/50"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {item.icon}
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-auto">
                      {item.value && (
                        <span
                          className={cn(
                            "text-xs font-medium rounded-md py-1 px-2 tracking-tight",
                            item.label === "Store Plan"
                              ? "text-primary bg-primary/5 dark:text-primary dark:bg-primary/10 border border-primary/10"
                              : "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/10",
                          )}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

            <DropdownMenuItem asChild>
              <button
                type="button"
                onClick={onSignOut}
                className="w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 hover:shadow-sm transition-all group"
              >
                <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
                  Sign Out
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropdown;
