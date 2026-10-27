import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/20",
        navy:
          "bg-[var(--color-brand-navy)]/10 text-[var(--color-brand-navy)] border border-[var(--color-brand-navy)]/20",
        outline:
          "bg-transparent text-[var(--color-brand-navy)] border border-[var(--color-brand-border)]",
        neutral:
          "bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text-muted)] border border-[var(--color-brand-border)]",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs tracking-wide",
        md: "px-3.5 py-1 text-sm tracking-wide",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

