"use client";

/**
 * Bento Grid — adapted from KokonutUI
 * @author @dorianbaffier · MIT License
 * @website https://kokonutui.com
 */

import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  Mic,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@modernstores/ui";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BentoItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  feature?:
    | "chart"
    | "counter"
    | "timeline"
    | "spotlight"
    | "icons"
    | "typing"
    | "metrics";
  spotlightItems?: string[];
  timeline?: Array<{ year: string; event: string }>;
  code?: string;
  typingText?: string;
  metrics?: Array<{
    label: string;
    value: number;
    suffix?: string;
    color?: string;
  }>;
  statistic?: {
    value: string;
    label: string;
    start?: number;
    end?: number;
    suffix?: string;
  };
  className?: string;
}

// ─── Default data ───────────────────────────────────────────────────────────────

const bentoItems: BentoItem[] = [
  {
    id: "main",
    title: "Your store, fully in control",
    description:
      "Real-time insights, automated workflows, and powerful tools to run every aspect of your grocery operation.",
    href: "#",
    feature: "spotlight",
    spotlightItems: [
      "Real-time inventory tracking",
      "Automated reorder alerts",
      "Multi-store management",
      "Customer analytics",
      "Promotions engine",
    ],
  },
  {
    id: "automation",
    title: "Workflow automation",
    description:
      "Smart triggers that run your store on autopilot — from low-stock alerts to purchase orders.",
    href: "#",
    feature: "typing",
    typingText: `const workflow = createWorkflow({\n  trigger: "low_stock",\n  condition: ({ qty }) => qty < 10,\n  actions: [\n    sendAlert("manager@store.com"),\n    createPurchaseOrder({ auto: true }),\n  ],\n});\n\nawait workflow.activate();`,
  },
  {
    id: "integrations",
    title: "Key integrations",
    description:
      "Payments, logistics, and analytics — all wired into one platform.",
    href: "#",
    feature: "icons",
  },
  {
    id: "metrics",
    title: "Performance metrics",
    description: "At-a-glance store health: uptime, fulfillment, and costs.",
    href: "#",
    feature: "metrics",
    metrics: [
      { label: "Order fulfillment", value: 97, suffix: "%", color: "emerald" },
      { label: "Inventory accuracy", value: 94, suffix: "%", color: "blue" },
      { label: "Cost reduction", value: 23, suffix: "%", color: "violet" },
    ],
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ─── Feature sub-components ────────────────────────────────────────────────────

const SpotlightFeature = ({ items }: { items: string[] }) => (
  <ul className="mt-2 space-y-1.5">
    {items.map((item, index) => (
      <motion.li
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        key={`spotlight-${item.toLowerCase().replace(/\s+/g, "-")}`}
        transition={{ delay: 0.1 * index }}
      >
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
        <span className="text-neutral-700 text-sm dark:text-neutral-300">
          {item}
        </span>
      </motion.li>
    ))}
  </ul>
);

const TypingCodeFeature = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        },
        Math.random() * 30 + 10,
      );
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="relative mt-3">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-neutral-500 text-xs dark:text-neutral-400">
          workflow.ts
        </span>
      </div>
      <div
        className="h-[150px] overflow-y-auto rounded-md bg-neutral-900 p-3 font-mono text-neutral-100 text-xs dark:bg-black"
        ref={terminalRef}
      >
        <pre className="whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
};

const IntegrationIcons = [
  { Icon: CreditCard, label: "Payments" },
  { Icon: Truck, label: "Shipping" },
  { Icon: Package, label: "Inventory" },
  { Icon: ShieldCheck, label: "Security" },
  { Icon: BarChart3, label: "Analytics" },
  { Icon: Plus, label: "More" },
];

const IconsFeature = () => (
  <div className="mt-4 grid grid-cols-3 gap-4">
    {IntegrationIcons.map(({ Icon, label }) => (
      <motion.div
        key={label}
        className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/50 bg-gradient-to-b from-neutral-100/80 to-neutral-100 p-3 transition-all duration-300 hover:border-neutral-300 dark:border-neutral-700/50 dark:from-neutral-800/80 dark:to-neutral-800 dark:hover:border-neutral-600"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <Icon className="h-5 w-5 text-neutral-600 transition-transform dark:text-neutral-400" />
        </div>
        <span className="text-center font-medium text-neutral-600 text-xs group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
          {label}
        </span>
      </motion.div>
    ))}
  </div>
);

const MetricsFeature = ({
  metrics,
}: {
  metrics: Array<{
    label: string;
    value: number;
    suffix?: string;
    color?: string;
  }>;
}) => {
  const getColorClass = (color = "emerald") => {
    const colors: Record<string, string> = {
      emerald: "bg-emerald-500 dark:bg-emerald-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      violet: "bg-violet-500 dark:bg-violet-400",
      amber: "bg-amber-500 dark:bg-amber-400",
      rose: "bg-rose-500 dark:bg-rose-400",
    };
    return colors[color] || colors.emerald;
  };

  const metricIcons: Record<string, React.ReactNode> = {
    "Order fulfillment": <ShoppingCart className="h-3.5 w-3.5" />,
    "Inventory accuracy": <Package className="h-3.5 w-3.5" />,
    "Cost reduction": <Sparkles className="h-3.5 w-3.5" />,
    Uptime: <Clock className="h-3.5 w-3.5" />,
    "Response time": <Zap className="h-3.5 w-3.5" />,
    Customers: <Users className="h-3.5 w-3.5" />,
  };

  return (
    <div className="mt-3 space-y-3">
      {metrics.map((metric, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          key={`metric-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}
          transition={{ delay: 0.15 * index }}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
              {metricIcons[metric.label]}
              {metric.label}
            </div>
            <div className="font-semibold text-neutral-700 dark:text-neutral-300">
              {metric.value}
              {metric.suffix}
            </div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
            <motion.div
              animate={{ width: `${Math.min(100, metric.value)}%` }}
              className={`h-full rounded-full ${getColorClass(metric.color)}`}
              initial={{ width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 * index }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─── BentoCard ──────────────────────────────────────────────────────────────────

const BentoCard = ({ item }: { item: BentoItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      className="h-full"
      onHoverEnd={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      variants={fadeInUp}
      whileHover={{ y: -5 }}
    >
      <Link
        aria-label={`${item.title} — ${item.description}`}
        className="group relative flex h-full flex-col gap-4 rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-[4px] transition-all duration-500 ease-out hover:border-neutral-300/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30 dark:hover:border-neutral-700/50 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
        href={item.href || "#"}
        tabIndex={0}
      >
        <div
          className="relative z-10 flex h-full flex-col gap-3"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-neutral-900 text-xl tracking-tight transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                {item.title}
              </h3>
              <div className="text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-neutral-500">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-neutral-600 text-sm tracking-tight dark:text-neutral-400">
              {item.description}
            </p>

            {item.feature === "spotlight" && item.spotlightItems && (
              <SpotlightFeature items={item.spotlightItems} />
            )}
            {item.feature === "typing" && item.typingText && (
              <TypingCodeFeature text={item.typingText} />
            )}
            {item.feature === "icons" && <IconsFeature />}
            {item.feature === "metrics" && item.metrics && (
              <MetricsFeature metrics={item.metrics} />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────────

export interface BentoGridProps {
  items?: BentoItem[];
  className?: string;
}

export function BentoGrid({ items = bentoItems, className }: BentoGridProps) {
  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className="grid gap-6"
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true }}
        whileInView="visible"
      >
        {/* Row 1: 1/3 + 2/3 */}
        <div className="grid gap-6 md:grid-cols-3">
          {items[0] && (
            <motion.div className="md:col-span-1" variants={fadeInUp}>
              <BentoCard item={items[0]} />
            </motion.div>
          )}
          {items[1] && (
            <motion.div className="md:col-span-2" variants={fadeInUp}>
              <BentoCard item={items[1]} />
            </motion.div>
          )}
        </div>

        {/* Row 2: 1/2 + 1/2 */}
        <div className="grid gap-6 md:grid-cols-2">
          {items[2] && (
            <motion.div className="md:col-span-1" variants={fadeInUp}>
              <BentoCard item={items[2]} />
            </motion.div>
          )}
          {items[3] && (
            <motion.div className="md:col-span-1" variants={fadeInUp}>
              <BentoCard item={items[3]} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default BentoGrid;
