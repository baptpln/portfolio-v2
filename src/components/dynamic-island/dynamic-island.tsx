"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DynamicIslandProps {
  children?: React.ReactNode;
  className?: string;
  positionClasses?: string;
  transformOrigin?: {
    originX?: number;
    originY?: number;
  };
  onLayoutAnimationComplete?: () => void;
}

const DynamicIsland = ({
  children,
  className = "min-w-[125px] min-h-10",
  positionClasses = "fixed top-4 left-1/2 -translate-x-1/2 rounded-full",
  transformOrigin = { originX: 0.5, originY: 0 },
  onLayoutAnimationComplete,
}: DynamicIslandProps) => {
  return (
    <motion.div
      className={cn(
        positionClasses,
        "bg-black px-1 py-1 text-white border border-white/20 flex items-start justify-start overflow-hidden z-[9999]",
        className,
      )}
      layout
      style={{
        originX: transformOrigin.originX ?? 0.5,
        originY: transformOrigin.originY ?? 0,
      }}
      transition={{
        layout: {
          stiffness: 800,
          damping: 60,
          type: "spring",
        },
      }}
      onLayoutAnimationComplete={() => {
        onLayoutAnimationComplete?.();
      }}
    >
      {children}
    </motion.div>
  );
};

export default DynamicIsland;
