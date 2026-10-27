import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "white" | "soft" | "navy";
  spacing?: "none" | "sm" | "md" | "lg";
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      background = "white",
      spacing = "md",
      as: Component = "section",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full relative",
          {
            "bg-white text-[var(--color-brand-text)]": background === "white",
            "bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text)]":
              background === "soft",
            "bg-[var(--color-brand-navy)] text-white": background === "navy",
          },
          {
            "py-0": spacing === "none",
            "py-8 md:py-12": spacing === "sm",
            "py-16 md:py-24": spacing === "md",
            "py-20 md:py-32": spacing === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

