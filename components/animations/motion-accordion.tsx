"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface MotionAccordionItemProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const MotionAccordionItem: React.FC<MotionAccordionItemProps> = ({
  isOpen,
  children,
  className,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="accordion-content"
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={motionVariants.accordion}
          className={cn("w-full", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

