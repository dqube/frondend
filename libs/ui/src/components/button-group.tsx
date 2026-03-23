"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the button group
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Size variant for all buttons in the group
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Whether buttons should fill the container width
   * @default false
   */
  fullWidth?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", size = "default", fullWidth = false, children, ...props }, ref) => {
    const isVertical = orientation === "vertical";
    
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          isVertical ? "flex-col" : "flex-row",
          fullWidth && "w-full",
          // Button group styling
          "[&>button]:relative [&>button]:focus:z-10",
          // Horizontal borders
          !isVertical && [
            "[&>button:not(:first-child)]:rounded-l-none",
            "[&>button:not(:last-child)]:rounded-r-none",
            "[&>button:not(:last-child)]:border-r-0",
          ],
          // Vertical borders
          isVertical && [
            "[&>button:not(:first-child)]:rounded-t-none",
            "[&>button:not(:last-child)]:rounded-b-none",
            "[&>button:not(:last-child)]:border-b-0",
            fullWidth && "[&>button]:w-full",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";
