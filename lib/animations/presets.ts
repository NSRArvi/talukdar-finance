export interface AnimationPresetOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
  stagger?: number;
}

/**
 * Standard animation presets for GSAP.
 * Always respects prefers-reduced-motion when called through createScopedAnimation.
 */
export const gsapPresets = {
  fadeIn: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0 },
    to: {
      opacity: 1,
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power2.out",
    },
  }),

  fadeUp: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, y: options?.distance ?? 24 },
    to: {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.7,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power3.out",
    },
  }),

  slideFromLeft: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, x: -(options?.distance ?? 32) },
    to: {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.7,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power3.out",
    },
  }),

  slideFromRight: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, x: options?.distance ?? 32 },
    to: {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.7,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power3.out",
    },
  }),

  staggerReveal: (targets: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, y: options?.distance ?? 20 },
    to: {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.1,
      ease: options?.ease ?? "power2.out",
    },
  }),

  imageReveal: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, scale: 0.95 },
    to: {
      opacity: 1,
      scale: 1,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power2.out",
    },
  }),

  sectionEntrance: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, y: options?.distance ?? 36 },
    to: {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power3.out",
    },
  }),

  textReveal: (target: gsap.DOMTarget, options?: AnimationPresetOptions) => ({
    from: { opacity: 0, y: options?.distance ?? 16 },
    to: {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.5,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power2.out",
    },
  }),
};

