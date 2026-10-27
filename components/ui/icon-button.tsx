import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-hover)] focus-visible:outline-[var(--color-brand-blue)]",
        secondary:
          "bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-navy-light)] focus-visible:outline-[var(--color-brand-navy)]",
        outline:
          "border border-[var(--color-brand-border)] bg-transparent text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-soft-blue)] hover:border-[var(--color-brand-blue)] focus-visible:outline-[var(--color-brand-blue)]",
        ghost:
          "bg-transparent text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-soft-blue)] focus-visible:outline-[var(--color-brand-blue)]",
      },
      size: {
        sm: "h-8 w-8 p-1.5",
        md: "h-10 w-10 p-2",
        lg: "h-12 w-12 p-3",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, "aria-label": ariaLabel, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

