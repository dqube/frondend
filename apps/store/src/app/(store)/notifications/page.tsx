"use client";

import { useState } from "react";
import { Bell, Package, Tag, Truck, MessageSquare, Mail, Smartphone } from "lucide-react";
import { motion } from "motion/react";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  email: boolean;
  push: boolean;
}

const INITIAL_SETTINGS: NotificationSetting[] = [
  { id: "orders", label: "Order Updates", description: "Confirmation, shipping, and delivery notifications", icon: Package, email: true, push: true },
  { id: "promotions", label: "Promotions & Deals", description: "Sales, exclusive offers, and promo codes", icon: Tag, email: true, push: false },
  { id: "delivery", label: "Delivery Alerts", description: "Real-time updates when your order is on its way", icon: Truck, email: false, push: true },
  { id: "newsletter", label: "Newsletter", description: "Weekly tips, recipes, and new product announcements", icon: MessageSquare, email: true, push: false },
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>(INITIAL_SETTINGS);

  function toggle(id: string, channel: "email" | "push") {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [channel]: !s[channel] } : s))
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Notification Preferences</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Choose how you want to receive notifications. You can change these at any time.
      </p>

      {/* Channel legend */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Email</span>
        <span className="flex items-center gap-1"><Smartphone className="h-3.5 w-3.5" /> Push</span>
      </div>

      <div className="space-y-3">
        {settings.map((setting, i) => {
          const Icon = setting.icon;
          return (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => toggle(setting.id, "email")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      setting.email ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <Mail className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => toggle(setting.id, "push")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      setting.push ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <Smartphone className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent notifications */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Notifications</h2>
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm divide-y divide-border/30">
          {[
            { title: "Order #ORD-1042 delivered", time: "2 hours ago", read: false },
            { title: "Flash sale: 30% off fresh produce", time: "Yesterday", read: true },
            { title: "Your weekly grocery list is ready", time: "2 days ago", read: true },
            { title: "Order #ORD-1038 shipped", time: "5 days ago", read: true },
          ].map((notif) => (
            <div key={notif.title} className="flex items-center gap-3 px-5 py-3">
              {!notif.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
              <div className={`flex-1 min-w-0 ${notif.read ? "ml-5" : ""}`}>
                <p className={`text-sm ${notif.read ? "text-muted-foreground" : "font-medium"}`}>{notif.title}</p>
                <p className="text-xs text-muted-foreground">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
