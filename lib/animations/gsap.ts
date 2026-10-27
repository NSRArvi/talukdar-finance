"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

/**
 * Initializes GSAP and registers core plugins like ScrollTrigger in client-side code.
 * Safe to call multiple times; plugins are only registered once.
 */
export function getGSAP() {
  if (typeof window !== "undefined" && !isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
export default gsap;

