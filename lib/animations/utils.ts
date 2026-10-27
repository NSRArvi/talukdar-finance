"use client";

import { useEffect, type RefObject } from "react";
import { getGSAP } from "./gsap";

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface ScopedAnimationOptions {
  scope: RefObject<HTMLElement | null>;
  animation: (context: {
    gsap: typeof import("gsap").gsap;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  }) => void;
  dependencies?: React.DependencyList;
}

/**
 * React hook that creates an isolated, strictly-scoped GSAP context.
 * Automatically cleans up on unmount or re-render (compatible with React 19 Strict Mode).
 * Skips animation execution when reduced motion is preferred.
 */
export function useGSAPContext({
  scope,
  animation,
  dependencies = [],
}: ScopedAnimationOptions) {
  useEffect(() => {
    if (!scope.current || shouldReduceMotion()) {
      return;
    }

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      animation({ gsap, ScrollTrigger });
    }, scope);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, ...dependencies]);
}

