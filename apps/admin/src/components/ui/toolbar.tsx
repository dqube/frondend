"use client";

/**
 * Toolbar — Figma-inspired multi-action toolbar
 * Adapted from KokonutUI (https://kokonutui.com/docs/navigation/toolbar)
 * Original author: @dorianbaffier · MIT License
 */

import {
  Bell,
  CircleUserRound,
  Edit2,
  FileDown,
  Frame,
  Layers,
  Lock,
  type LucideIcon,
  MousePointer2,
  Move,
  Palette,
  Shapes,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@modernstores/ui";

interface ToolbarItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface ToolbarProps {
  className?: string;
  items?: ToolbarItem[];
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: -10 },
  exit: { opacity: 0, y: -20 },
};

const lineVariants = {
  initial: { scaleX: 0, x: "-50%" },
  animate: {
    scaleX: 1,
    x: "0%",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    scaleX: 0,
    x: "50%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const spring = { type: "spring", bounce: 0, duration: 0.4 };

const DEFAULT_ITEMS: ToolbarItem[] = [
  { id: "select",     title: "Select",     icon: MousePointer2 },
  { id: "move",       title: "Move",       icon: Move },
  { id: "shapes",     title: "Shapes",     icon: Shapes },
  { id: "layers",     title: "Layers",     icon: Layers },
  { id: "frame",      title: "Frame",      icon: Frame },
  { id: "properties", title: "Properties", icon: SlidersHorizontal },
  { id: "export",     title: "Export",     icon: FileDown },
  { id: "share",      title: "Share",      icon: Share2 },
  { id: "notifications", title: "Notifications", icon: Bell },
  { id: "profile",    title: "Profile",    icon: CircleUserRound },
  { id: "appearance", title: "Appearance", icon: Palette },
];

export function Toolbar({ className, items = DEFAULT_ITEMS }: ToolbarProps) {
  const [selected, setSelected] = React.useState<string | null>("select");
  const [isToggled, setIsToggled] = React.useState(false);
  const [activeNotification, setActiveNotification] = React.useState<string | null>(null);

  function handleItemClick(itemId: string) {
    setSelected(selected === itemId ? null : itemId);
    setActiveNotification(itemId);
    setTimeout(() => setActiveNotification(null), 1500);
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex items-center gap-3 p-2",
          "bg-background rounded-xl border",
          "transition-all duration-200",
          className
        )}
      >
        {/* Click notification badge */}
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              variants={notificationVariants as React.ComponentProps<typeof motion.div>["variants"]}
              className="absolute -top-8 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs whitespace-nowrap">
                {items.find((item) => item.id === activeNotification)?.title} clicked!
              </div>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={lineVariants as React.ComponentProps<typeof motion.div>["variants"]}
                className="absolute -bottom-1 left-1/2 h-[2px] w-full origin-left bg-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar items */}
        <div className="flex flex-wrap items-center gap-1">
          {items.map((item) => (
            <motion.button
              key={item.id}
              initial={false}
              animate="animate"
              custom={selected === item.id}
              variants={buttonVariants as React.ComponentProps<typeof motion.button>["variants"]}
              transition={spring as React.ComponentProps<typeof motion.button>["transition"]}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "relative flex items-center rounded-lg py-2",
                "font-medium text-sm transition-colors duration-200",
                selected === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                size={16}
                className={cn(selected === item.id && "text-primary-foreground")}
              />
              <AnimatePresence initial={false}>
                {selected === item.id && (
                  <motion.span
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={spring as React.ComponentProps<typeof motion.span>["transition"]}
                    variants={spanVariants}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          {/* Lock / Edit toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsToggled(!isToggled)}
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rounded-xl border shadow-sm transition-all duration-200",
              "hover:shadow-md",
              isToggled
                ? "bg-primary text-primary-foreground border-primary/30 hover:bg-primary/90"
                : "bg-background text-muted-foreground border-border/30 hover:bg-muted hover:text-foreground hover:border-border/40"
            )}
          >
            {isToggled ? (
              <Edit2 className="h-3.5 w-3.5" />
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}
            <span className="font-medium text-sm">
              {isToggled ? "On" : "Off"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
