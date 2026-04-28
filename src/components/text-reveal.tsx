import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FC } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  delay = 0,
}) => {
  // If children isn't a string, we can't easily split it into letters
  if (typeof children !== "string") {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
    >
      {children.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
