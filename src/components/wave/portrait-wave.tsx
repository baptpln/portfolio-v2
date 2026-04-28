import { cn } from "@/lib/utils";
import type { FC } from "react";
import { WaveAnimation2 } from "./wave-animation2";
import { useTheme } from "../theme/theme-provider";

export const PortraitWave: FC<{ className?: string }> = ({ className }) => {
  const { theme } = useTheme();
  return (
    <div className={cn("flex flex-col relative h-80 w-80", className)}>
      {/* Background Orb */}
      <img
        src={theme === "light" ? "/orb-shadow.png" : "/orb-trans-shadow.png"}
        alt="Orb Background"
        className="absolute top-[45%] left-[45%] dark:left-[40%] -translate-1/2 max-w-none w-[600px] dark:w-[500px] pointer-events-none z-0"
      />

      <img
        src="./me_compressed.png"
        className="absolute bottom-0 w-full sepia-50 dark:sepia-0 transition-all duration-500 z-10"
      />
      <WaveAnimation2
        className="absolute -bottom-12 left-0 w-full z-20"
        amplitude={4}
        height={30}
        strokeWidth={10}
        borderWidth={2}
        innerClassName="text-amber-200"
        strokeClassName="text-amber-600"
      />
    </div>
  );
};
