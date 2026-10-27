import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-white p-3.5 text-base text-[var(--color-brand-text)] placeholder:text-[var(--color-brand-text-muted)]/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] focus-visible:border-[var(--color-brand-blue)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 resize-y",
          hasError
            ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
            : "border-[var(--color-brand-border)] hover:border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

