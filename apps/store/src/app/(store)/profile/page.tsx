"use client";

import { useState } from "react";
import {
  User, ShoppingBag, Heart, MapPin, Bell,
  FileText, LifeBuoy, Lock, LogOut, Eye, EyeOff,
} from "lucide-react";
import { cn } from "@modernstores/ui";

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "account",   label: "Account Settings", icon: User },
  { id: "orders",    label: "Orders",           icon: ShoppingBag },
  { id: "wishlist",  label: "Wishlist",         icon: Heart },
  { id: "address",   label: "Address",          icon: MapPin },
  { id: "notifs",    label: "Notifications",    icon: Bell },
  { id: "legal",     label: "Legal Notice",     icon: FileText },
  { id: "help",      label: "Help Center",      icon: LifeBuoy },
  { id: "password",  label: "Change Password",  icon: Lock },
  { id: "logout",    label: "Logout",           icon: LogOut },
] as const;

type NavId = typeof NAV_ITEMS[number]["id"];

// ─── Field components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm text-muted-foreground mb-1.5">
      {children}
    </label>
  );
}

function TextInput({ placeholder, type = "text" }: { placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-white/60 backdrop-blur-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
    />
  );
}

function PasswordInput({ placeholder }: { placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full border border-border rounded-xl px-4 py-2.5 pr-10 text-sm bg-white/60 backdrop-blur-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
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

function SectionDivider() {
  return <hr className="border-border/50 my-8" />;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function ToggleRow({ label, description }: { label: string; description: string }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Toggle checked={enabled} onChange={setEnabled} />
    </div>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

function AccountSettings() {
  return (
    <div>
      {/* Personal Information */}
      <h2 className="text-lg font-bold mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <Label>First Name *</Label>
          <TextInput />
        </div>
        <div>
          <Label>Last Name *</Label>
          <TextInput />
        </div>
      </div>

      <div className="max-w-sm">
        <Label>Phone/Mobile *</Label>
        <TextInput type="tel" />
      </div>

      <SectionDivider />

      {/* Account Information */}
      <h2 className="text-lg font-bold mb-6">Account Information</h2>

      <div className="max-w-sm mb-5">
        <Label>Email *</Label>
        <TextInput type="email" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label>Password</Label>
          <PasswordInput />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <PasswordInput />
        </div>
      </div>

      <SectionDivider />

      {/* Privacy toggles */}
      <div className="divide-y divide-border/50">
        <ToggleRow
          label="Share Profile Data"
          description="Share your profile information to collect the product search result"
        />
        <ToggleRow
          label="Ads Performance"
          description="To improve your ads search result we need to collect your cookies behavior"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end mt-8">
        <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-6">My Orders</h2>
      <div className="space-y-3">
        {["#ORD-001", "#ORD-002", "#ORD-003"].map((id) => (
          <div key={id} className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-white/80">
            <div>
              <p className="text-sm font-semibold">{id}</p>
              <p className="text-xs text-muted-foreground mt-0.5">3 items · Delivered</p>
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">View</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WishlistPanel() {
  const items = ["🥦 Broccoli Crown", "🍓 Strawberry 500g", "🧀 Cheddar Block 400g"];
  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Wishlist</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-white/80">
            <span className="text-sm">{item}</span>
            <button className="text-xs text-destructive hover:underline">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressPanel() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Saved Addresses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Home",   detail: "Wolfson Institute of Preventive Medicine, London EC1M 7BA, UK" },
          { label: "Office", detail: "80 Windsor Park Rd, Singapore 574175" },
        ].map((addr) => (
          <div key={addr.label} className="p-4 rounded-2xl bg-white/60 border border-white/80">
            <p className="font-semibold text-sm mb-1">{addr.label}</p>
            <p className="text-xs text-muted-foreground">{addr.detail}</p>
            <button className="text-xs text-primary mt-2 hover:underline">Edit</button>
          </div>
        ))}
        <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border bg-white/40 hover:bg-white/60 transition-colors text-sm text-muted-foreground">
          + Add Address
        </button>
      </div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Notification Preferences</h2>
      <div className="divide-y divide-border/50">
        {[
          { label: "Order Updates",      desc: "Receive updates about your order status" },
          { label: "Promotions & Deals", desc: "Get notified about sales and special offers" },
          { label: "New Arrivals",       desc: "Be the first to know about new products" },
          { label: "Newsletter",         desc: "Weekly newsletter with tips and recipes" },
        ].map((n) => (
          <ToggleRow key={n.label} label={n.label} description={n.desc} />
        ))}
      </div>
    </div>
  );
}

function ChangePasswordPanel() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Change Password</h2>
      <div className="max-w-sm space-y-5">
        <div>
          <Label>Current Password</Label>
          <PasswordInput />
        </div>
        <div>
          <Label>New Password</Label>
          <PasswordInput />
        </div>
        <div>
          <Label>Confirm New Password</Label>
          <PasswordInput />
        </div>
        <div className="flex justify-end pt-2">
          <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPanel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-sm">This section is coming soon.</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [active, setActive] = useState<NavId>("account");

  function renderPanel() {
    switch (active) {
      case "account":  return <AccountSettings />;
      case "orders":   return <OrdersPanel />;
      case "wishlist": return <WishlistPanel />;
      case "address":  return <AddressPanel />;
      case "notifs":   return <NotificationsPanel />;
      case "password": return <ChangePasswordPanel />;
      case "legal":    return <PlaceholderPanel label="Legal Notice" />;
      case "help":     return <PlaceholderPanel label="Help Center" />;
      case "logout":   return <PlaceholderPanel label="Logging out…" />;
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">

      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-hidden">
        <nav className="py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            const isLogout = item.id === "logout";
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-colors text-left ${
                  isActive
                    ? "bg-muted/60 font-semibold text-foreground"
                    : isLogout
                    ? "text-destructive hover:bg-destructive/5"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isLogout ? "text-destructive" : isActive ? "text-primary" : ""}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 md:p-8">
        {renderPanel()}
      </main>
    </div>
  );
}
