import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, hasError, disabled, defaultValue, value, ...props }, ref) => {
    // Determine the controlled or default value; if placeholder is present and neither value nor defaultValue is passed, default to ""
    const computedDefaultValue =
      value === undefined && defaultValue === undefined && placeholder !== undefined
        ? ""
        : defaultValue;

    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          disabled={disabled}
          value={value}
          defaultValue={computedDefaultValue}
          className={cn(
            "w-full h-11 appearance-none rounded-lg border bg-white pl-3.5 pr-10 text-base text-[var(--color-brand-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] focus-visible:border-[var(--color-brand-blue)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            hasError
              ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
              : "border-[var(--color-brand-border)] hover:border-slate-300",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3.5 h-4 w-4 text-[var(--color-brand-text-muted)] pointer-events-none shrink-0"
          aria-hidden="true"
        />
      </div>
    );
  }
);

Select.displayName = "Select";

