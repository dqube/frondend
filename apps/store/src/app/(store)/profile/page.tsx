"use client";

import { useState } from "react";
import {
  User, ShoppingBag, Heart, MapPin, Bell,
  FileText, LifeBuoy, Lock, LogOut, Eye, EyeOff,
  Camera, Mail, Phone, ChevronRight, Shield, Palette,
  CreditCard, Package, Trash2, Plus, Edit2, Check,
  ChevronDown,
} from "lucide-react";
import { cn } from "@modernstores/ui";

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    heading: "Account",
    items: [
      { id: "account",  label: "Personal Info",    icon: User },
      { id: "address",  label: "Addresses",        icon: MapPin },
      { id: "password", label: "Security",         icon: Shield },
      { id: "payment",  label: "Payment Methods",  icon: CreditCard },
    ],
  },
  {
    heading: "Shopping",
    items: [
      { id: "orders",   label: "Orders",           icon: Package },
      { id: "wishlist", label: "Wishlist",          icon: Heart },
    ],
  },
  {
    heading: "Preferences",
    items: [
      { id: "notifs",      label: "Notifications",   icon: Bell },
      { id: "appearance",  label: "Appearance",       icon: Palette },
    ],
  },
  {
    heading: "Support",
    items: [
      { id: "help",    label: "Help Center",     icon: LifeBuoy },
      { id: "legal",   label: "Legal & Privacy", icon: FileText },
    ],
  },
] as const;

type NavId = (typeof NAV_SECTIONS)[number]["items"][number]["id"] | "logout";

const MOCK_USER = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  phone: "+1 (555) 234-5678",
  avatar: null as string | null,
  memberSince: "March 2024",
};

// ─── Shared field components ──────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  );
}

function TextInput({
  placeholder,
  type = "text",
  defaultValue,
  icon: Icon,
}: {
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn(
          "w-full rounded-xl border border-border bg-white/60 py-2.5 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary",
          Icon ? "pl-10" : "pl-4"
        )}
      />
    </div>
  );
}

function PasswordInput({ placeholder }: { placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-10 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function SettingRow({
  label,
  description,
  defaultChecked = true,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Toggle checked={enabled} onChange={setEnabled} />
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  return (
    <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
      {label}
    </button>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

function PersonalInfoPanel() {
  return (
    <div className="space-y-6">
      {/* Avatar section */}
      <SectionCard title="Profile Photo" description="This will be displayed on your profile.">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
            </div>
            <button
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              aria-label="Change profile photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold">
              {MOCK_USER.firstName} {MOCK_USER.lastName}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Member since {MOCK_USER.memberSince}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Personal details */}
      <SectionCard
        title="Personal Information"
        description="Update your name and contact details."
        actions={<SaveButton />}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel required>First Name</FieldLabel>
              <TextInput icon={User} defaultValue={MOCK_USER.firstName} />
            </div>
            <div>
              <FieldLabel required>Last Name</FieldLabel>
              <TextInput icon={User} defaultValue={MOCK_USER.lastName} />
            </div>
          </div>
          <div>
            <FieldLabel required>Email Address</FieldLabel>
            <TextInput icon={Mail} type="email" defaultValue={MOCK_USER.email} />
          </div>
          <div className="max-w-sm">
            <FieldLabel>Phone Number</FieldLabel>
            <TextInput icon={Phone} type="tel" defaultValue={MOCK_USER.phone} />
          </div>
        </div>
      </SectionCard>

      {/* Privacy */}
      <SectionCard
        title="Privacy Settings"
        description="Control how your data is used."
      >
        <div className="divide-y divide-border/50">
          <SettingRow
            label="Profile Visibility"
            description="Allow other users to view your public profile"
          />
          <SettingRow
            label="Personalized Recommendations"
            description="Use your browsing history to suggest relevant products"
          />
          <SettingRow
            label="Marketing Emails"
            description="Receive promotional emails about deals and offers"
            defaultChecked={false}
          />
        </div>
      </SectionCard>

      {/* Danger zone */}
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-destructive">Delete Account</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button className="shrink-0 rounded-xl border border-destructive/30 px-5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressPanel() {
  const addresses = [
    { id: "home", label: "Home", detail: "Wolfson Institute of Preventive Medicine, London EC1M 7BA, UK", isDefault: true },
    { id: "office", label: "Office", detail: "80 Windsor Park Rd, Singapore 574175", isDefault: false },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Saved Addresses"
        description="Manage your delivery addresses."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            Add New
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                "group relative rounded-xl border-2 p-5 transition-colors",
                addr.isDefault
                  ? "border-primary bg-primary/5"
                  : "border-border bg-white/40 hover:border-primary/30"
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{addr.label}</span>
                {addr.isDefault && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{addr.detail}</p>
              <div className="mt-4 flex gap-3">
                <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                {!addr.isDefault && (
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SecurityPanel() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Change Password"
        description="Ensure your account is protected with a strong password."
        actions={<SaveButton label="Update Password" />}
      >
        <div className="max-w-md space-y-5">
          <div>
            <FieldLabel required>Current Password</FieldLabel>
            <PasswordInput placeholder="Enter current password" />
          </div>
          <div>
            <FieldLabel required>New Password</FieldLabel>
            <PasswordInput placeholder="Enter new password" />
          </div>
          <div>
            <FieldLabel required>Confirm New Password</FieldLabel>
            <PasswordInput placeholder="Repeat new password" />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Shield className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Not enabled</p>
              <p className="text-xs text-muted-foreground">
                Protect your account with 2FA via authenticator app
              </p>
            </div>
          </div>
          <button className="shrink-0 rounded-xl border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-accent/60">
            Enable 2FA
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Active Sessions"
        description="Devices where you're currently logged in."
      >
        <div className="space-y-3">
          {[
            { device: "MacBook Pro — Chrome", location: "London, UK", current: true },
            { device: "iPhone 15 — Safari", location: "Singapore", current: false },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between rounded-xl border border-border/50 p-4">
              <div>
                <p className="text-sm font-medium">{s.device}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.location}</p>
              </div>
              {s.current ? (
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                  Current
                </span>
              ) : (
                <button className="text-xs font-medium text-destructive hover:text-destructive/80 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function PaymentPanel() {
  const cards = [
    { id: "1", type: "Visa", last4: "4242", exp: "12/27", isDefault: true },
    { id: "2", type: "Mastercard", last4: "8888", exp: "03/26", isDefault: false },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Payment Methods"
        description="Manage your saved payment options."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            Add Card
          </button>
        }
      >
        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "flex items-center justify-between rounded-xl border-2 p-4 transition-colors",
                card.isDefault ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">
                  {card.type === "Visa" ? "💳" : "💳"}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {card.type} ending in {card.last4}
                    {card.isDefault && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Expires {card.exp}</p>
                </div>
              </div>
              <button className="text-xs font-medium text-destructive hover:text-destructive/80 transition-colors">
                Remove
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function OrdersPanel() {
  const orders = [
    { id: "#ORD-2587", date: "Mar 18, 2026", items: 5, total: "$47.90", status: "Delivered", statusColor: "text-green-700 bg-green-100" },
    { id: "#ORD-2543", date: "Mar 12, 2026", items: 3, total: "$22.50", status: "In Transit", statusColor: "text-blue-700 bg-blue-100" },
    { id: "#ORD-2501", date: "Mar 5, 2026", items: 8, total: "$89.20", status: "Delivered", statusColor: "text-green-700 bg-green-100" },
    { id: "#ORD-2489", date: "Feb 28, 2026", items: 2, total: "$15.98", status: "Cancelled", statusColor: "text-red-700 bg-red-100" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Order History" description="View and track your recent orders.">
        <div className="space-y-3">
          {orders.map((order) => (
            <button
              key={order.id}
              className="flex w-full items-center justify-between rounded-xl border border-border/50 p-4 text-left transition-colors hover:bg-accent/40"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {order.date} · {order.items} items · {order.total}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", order.statusColor)}>
                  {order.status}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function WishlistPanel() {
  const items = [
    { id: "1", name: "Broccoli Crown", emoji: "🥦", price: "$3.49" },
    { id: "2", name: "Strawberry Pack 500g", emoji: "🍓", price: "$5.99" },
    { id: "3", name: "Cheddar Block 400g", emoji: "🧀", price: "$7.49" },
    { id: "4", name: "Organic Avocados (3pk)", emoji: "🥑", price: "$6.99" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="My Wishlist" description="Items you've saved for later.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl border border-border/50 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                {item.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="mt-0.5 text-sm font-semibold text-primary">{item.price}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <button className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  Add to Cart
                </button>
                <button className="text-[11px] text-destructive hover:text-destructive/80 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <SectionCard title="Notification Preferences" description="Choose what you'd like to be notified about.">
        <div className="divide-y divide-border/50">
          <SettingRow
            label="Order Updates"
            description="Get notified when your order status changes"
          />
          <SettingRow
            label="Delivery Alerts"
            description="Real-time updates when your delivery is nearby"
          />
          <SettingRow
            label="Promotions & Deals"
            description="Be the first to know about sales and special offers"
          />
          <SettingRow
            label="New Arrivals"
            description="Weekly updates about newly added products"
            defaultChecked={false}
          />
          <SettingRow
            label="Price Drops"
            description="Get alerted when items in your wishlist go on sale"
          />
        </div>
      </SectionCard>

      <SectionCard title="Communication Channels" description="How should we reach you?">
        <div className="divide-y divide-border/50">
          <SettingRow label="Email Notifications" description="Receive notifications via email" />
          <SettingRow label="Push Notifications" description="Browser and mobile push alerts" />
          <SettingRow label="SMS Notifications" description="Text messages for urgent updates" defaultChecked={false} />
        </div>
      </SectionCard>
    </div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="space-y-6">
      <SectionCard title="Theme" description="Choose your preferred color scheme.">
        <div className="grid grid-cols-3 gap-3">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                theme === t
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                t === "light" ? "bg-amber-100" : t === "dark" ? "bg-slate-800" : "bg-gradient-to-br from-amber-100 to-slate-800"
              )}>
                {t === "light" && <span className="text-lg">☀️</span>}
                {t === "dark" && <span className="text-lg">🌙</span>}
                {t === "system" && <span className="text-lg">💻</span>}
              </div>
              <span className="text-xs font-medium capitalize">{t}</span>
              {theme === t && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ChangePasswordPanel() {
  return (
    <SecurityPanel />
  );
}

function PlaceholderPanel({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/60 py-20 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-base font-semibold">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">This section is coming soon.</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [active, setActive] = useState<NavId>("account");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function renderPanel() {
    switch (active) {
      case "account":    return <PersonalInfoPanel />;
      case "address":    return <AddressPanel />;
      case "password":   return <SecurityPanel />;
      case "payment":    return <PaymentPanel />;
      case "orders":     return <OrdersPanel />;
      case "wishlist":   return <WishlistPanel />;
      case "notifs":     return <NotificationsPanel />;
      case "appearance": return <AppearancePanel />;
      case "help":       return <PlaceholderPanel label="Help Center" icon={LifeBuoy} />;
      case "legal":      return <PlaceholderPanel label="Legal & Privacy" icon={FileText} />;
      case "logout":     return <PlaceholderPanel label="Logging out…" icon={LogOut} />;
    }
  }

  const allItems = NAV_SECTIONS.flatMap((s) => s.items);
  const activeItem = allItems.find((i) => i.id === active);
  const ActiveIcon = activeItem?.icon ?? User;
  const activeLabel = active === "logout" ? "Log Out" : activeItem?.label ?? "";

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal info, security, and preferences
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

        {/* ── Mobile dropdown nav ── */}
        <div className="block lg:hidden">
          <div className="rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-sm">
            {/* User summary */}
            <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {MOCK_USER.firstName} {MOCK_USER.lastName}
                </p>
                <p className="truncate text-xs text-muted-foreground">{MOCK_USER.email}</p>
              </div>
            </div>

            {/* Dropdown trigger */}
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="flex w-full items-center justify-between px-5 py-3.5"
            >
              <div className="flex items-center gap-3">
                <ActiveIcon className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{activeLabel}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  mobileNavOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown list */}
            {mobileNavOpen && (
              <div className="border-t border-border/50 px-3 py-2">
                {NAV_SECTIONS.map((section) => (
                  <div key={section.heading} className="mb-1">
                    <p className="px-3 pb-1 pt-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {section.heading}
                    </p>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = active === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => { setActive(item.id); setMobileNavOpen(false); }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 font-semibold text-primary"
                              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <div className="mt-1 border-t border-border/50 pt-2">
                  <button
                    onClick={() => { setActive("logout"); setMobileNavOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/5"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop sidebar ── */}
        <aside className="hidden w-64 shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-sm lg:block">
          {/* User summary — mobile & desktop */}
          <div className="flex items-center gap-3 border-b border-border/50 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {MOCK_USER.firstName} {MOCK_USER.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{MOCK_USER.email}</p>
            </div>
          </div>

          {/* Nav sections */}
          <nav className="p-2">
            {NAV_SECTIONS.map((section) => (
              <div key={section.heading} className="mb-1">
                <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {section.heading}
                </p>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Logout — separate */}
            <div className="mt-1 border-t border-border/50 pt-2">
              <button
                onClick={() => setActive("logout")}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/5"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Log Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
