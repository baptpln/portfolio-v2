import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

interface HudPanelProps {
  caption: string;
  value: ReactNode;
  index: number;
  icon?: ReactNode;
  full?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "min-w-[56px] basis-16 grow-0",
  md: "min-w-[92px] basis-28 flex-1",
  lg: "min-w-[120px] basis-40 grow-[2]",
};

export const HudPanel: FC<HudPanelProps> = ({
  caption,
  value,
  index,
  icon,
  full = false,
  size = "md",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={`flex flex-col justify-center gap-0.5 bg-background px-2.5 py-1.5 ${
        full ? "w-full basis-full" : SIZE[size]
      }`}
    >
      <span className="flex items-center gap-1 text-[9px] font-semibold tracking-widest text-muted-foreground">
        {icon}
        {caption}
      </span>
      <span className="truncate font-mono text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
    </motion.div>
  );
};
