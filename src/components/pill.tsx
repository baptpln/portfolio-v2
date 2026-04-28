import { cn } from "@/lib/utils";
import type { FC } from "react";

export const Pill: FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-semibold bg-amber-300",
        className,
      )}
    />
  );
};
