import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  titleAs?: "h1" | "h2" | "h3";
  isInverse?: boolean;
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      className,
      badge,
      title,
      description,
      align = "left",
      titleAs: TitleTag = "h2",
      isInverse = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-3xl flex flex-col gap-3",
          {
            "items-start text-left": align === "left",
            "items-center text-center mx-auto": align === "center",
            "items-end text-right ml-auto": align === "right",
          },
          className
        )}
        {...props}
      >
        {badge && (
          <Badge
            variant={isInverse ? "outline" : "primary"}
            className={isInverse ? "border-white/30 text-white bg-white/10" : undefined}
          >
            {badge}
          </Badge>
        )}
        <TitleTag
          className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight",
            isInverse ? "text-white" : "text-[var(--color-brand-navy)]"
          )}
        >
          {title}
        </TitleTag>
        {description && (
          <p
            className={cn(
              "text-base sm:text-lg leading-relaxed",
              isInverse ? "text-white/80" : "text-[var(--color-brand-text-muted)]"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";

