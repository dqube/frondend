"use client";

/**
 * Spotlight Cards — adapted from KokonutUI
 * @author @dorianbaffier · MIT License
 * @website https://kokonutui.com
 */

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Cloud,
  Package,
  RefreshCw,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@modernstores/ui";

// ─── Constants ─────────────────────────────────────────────────────────────────

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

// ─── Types & data ───────────────────────────────────────────────────────────────

export interface SpotlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const DEFAULT_ITEMS: SpotlightItem[] = [
  {
    icon: Zap,
    title: "Real-time updates",
    description:
      "Inventory levels, order statuses, and stock alerts refresh instantly across all your devices.",
    color: "#f59e0b",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Role-based access control, audit logs, and encrypted data storage — compliance built in.",
    color: "#60a5fa",
  },
  {
    icon: Package,
    title: "Smart inventory",
    description:
      "Automated reorder rules and demand forecasting prevent stockouts before they happen.",
    color: "#34d399",
  },
  {
    icon: BarChart3,
    title: "Deep analytics",
    description:
      "Revenue trends, basket analysis, and customer cohorts — all in one dashboard.",
    color: "#a78bfa",
  },
  {
    icon: RefreshCw,
    title: "Auto-sync",
    description:
      "Product data, pricing, and promotions stay in sync across your POS, site, and app.",
    color: "#38bdf8",
  },
  {
    icon: Users,
    title: "Customer first",
    description:
      "Loyalty programs, personalised offers, and seamless returns — drive repeat purchases.",
    color: "#f472b6",
  },
];

// ─── Card ───────────────────────────────────────────────────────────────────────

interface CardProps {
  item: SpotlightItem;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Card({ item, dimmed, onHoverStart, onHoverEnd }: CardProps) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.5 : 1,
      }}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6",
        // Light
        "border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        // Dark
        "dark:border-white/6 dark:bg-white/3 dark:shadow-none",
        "transition-[border-color] duration-300",
        "hover:border-zinc-300 dark:hover:border-white/14",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Static accent tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      {/* Hover glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/[0.045] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Icon badge */}
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: `${item.color}18`,
          boxShadow: `inset 0 0 0 1px ${item.color}30`,
        }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: item.color }} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-semibold text-[14px] text-zinc-900 tracking-tight dark:text-white">
          {item.title}
        </h3>
        <p className="text-[12.5px] text-zinc-500 leading-relaxed dark:text-white/40">
          {item.description}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${item.color}80, transparent)`,
        }}
      />
    </motion.div>
  );
}

Card.displayName = "Card";

// ─── Main export ───────────────────────────────────────────────────────────────

export interface SpotlightCardsProps {
  items?: SpotlightItem[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

export function SpotlightCards({
  items = DEFAULT_ITEMS,
  eyebrow = "Features",
  heading = "Everything you need",
  className,
}: SpotlightCardsProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl px-8 pt-9 pb-10",
        "bg-white dark:bg-[#06060f]",
        className,
      )}
    >
      {/* Dot grid — light mode only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Header */}
      <div className="relative mb-8 flex flex-col gap-1.5">
        <p className="font-semibold text-[10px] text-primary uppercase tracking-[0.22em]">
          {eyebrow}
        </p>
        <h2 className="font-semibold text-[22px] text-zinc-900 tracking-tight dark:text-white">
          {heading}
        </h2>
      </div>

      {/* Card grid */}
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <Card
            dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
            item={item}
            key={item.title}
            onHoverEnd={() => setHoveredTitle(null)}
            onHoverStart={() => setHoveredTitle(item.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default SpotlightCards;
