import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", hasError, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            className="absolute left-3.5 text-[var(--color-brand-text-muted)] pointer-events-none shrink-0"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-11 rounded-lg border bg-white px-3.5 text-base text-[var(--color-brand-text)] placeholder:text-[var(--color-brand-text-muted)]/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] focus-visible:border-[var(--color-brand-blue)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            leftIcon ? "pl-10" : "pl-3.5",
            rightIcon ? "pr-10" : "pr-3.5",
            hasError
              ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
              : "border-[var(--color-brand-border)] hover:border-slate-300",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span
            className="absolute right-3.5 text-[var(--color-brand-text-muted)] pointer-events-none shrink-0"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

