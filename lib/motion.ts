import type { Transition, Variants } from "motion/react";

/**
 * Common transitions for Motion components.
 */
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  } satisfies Transition,
  gentle: {
    type: "spring",
    stiffness: 260,
    damping: 24,
  } satisfies Transition,
  smooth: {
    duration: 0.25,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
};

/**
 * Reusable motion variants for common interactive elements.
 */
export const motionVariants = {
  // Button tap & hover micro-interactions
  buttonFeedback: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },

  // Interactive card hover
  cardHover: {
    rest: { y: 0, transition: transitions.smooth },
    hover: { y: -4, transition: transitions.smooth },
  },

  // Accordion collapse/expand
  accordion: {
    collapsed: { opacity: 0, height: 0, overflow: "hidden" },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  } satisfies Variants,

  // Dropdown / Popover / Mobile Menu
  menuTransition: {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  } satisfies Variants,
};

