import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  external?: boolean;
  showIcon?: boolean;
  variant?: "primary" | "navy" | "muted";
  children: React.ReactNode;
  className?: string;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    {
      className,
      href,
      external = false,
      showIcon = false,
      variant = "primary",
      children,
      ...props
    },
    ref
  ) => {
    const isExternal =
      external || (typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://")));

    const colorClasses = {
      primary: "text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)]",
      navy: "text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)]",
      muted: "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-navy)]",
    }[variant];

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-flex items-center gap-1 font-medium transition-colors underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm",
          colorClasses,
          className
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        <span>{children}</span>
        {showIcon && (
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        )}
      </Link>
    );
  }
);

TextLink.displayName = "TextLink";

