import { cn } from "@/lib/utils";

interface BackgroundPatternProps {
  className?: string;
}

export function BackgroundPattern({ className }: BackgroundPatternProps) {
  return (
    <div className="fixed inset-0 -z-[1] h-screen w-screen pointer-events-none overflow-hidden bg-background font-sans">
      <div
        className={cn(
          "absolute inset-0 h-full w-full opacity-[0.2] dark:opacity-[0.07] bg-brown-500 transition-opacity duration-500",
          className,
        )}
        style={{
          maskImage: `url("/pattern-2.svg")`,
          WebkitMaskImage: `url("/pattern-2.svg")`,
          maskRepeat: "repeat",
          WebkitMaskRepeat: "repeat",
          maskSize: "30px 30px",
          WebkitMaskSize: "30px 30px",
        }}
      />
    </div>
  );
}
