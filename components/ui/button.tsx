import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-hover)] focus-visible:outline-[var(--color-brand-blue)] shadow-sm",
        secondary:
          "bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-navy-light)] focus-visible:outline-[var(--color-brand-navy)] shadow-sm",
        outline:
          "border border-[var(--color-brand-border)] bg-transparent text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-soft-blue)] hover:border-[var(--color-brand-blue)] focus-visible:outline-[var(--color-brand-blue)]",
        ghost:
          "bg-transparent text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-soft-blue)] focus-visible:outline-[var(--color-brand-blue)]",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-1.5",
        md: "h-11 px-5 text-base gap-2",
        lg: "h-13 px-7 text-lg gap-2.5",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export { buttonVariants };

