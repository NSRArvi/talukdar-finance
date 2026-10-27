"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface MotionCardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  enableHover?: boolean;
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, enableHover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover={enableHover ? "hover" : undefined}
        variants={motionVariants.cardHover}
        className={cn(
          "rounded-xl border border-[var(--color-brand-border)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCard.displayName = "MotionCard";

