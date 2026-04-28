import type { Variants } from "motion/react";

export const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  initial: { scale: 1, rotate: 0 },
};

export const switchVariants: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export const themeButtonIconVariants: Variants = {
  rest: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};
