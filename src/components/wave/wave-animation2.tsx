"use client";

import { cn } from "@/lib/utils";
import { motion, useTime, useTransform } from "framer-motion";
import { useId } from "react";

const defaultWaveConfig = {
  width: 90,
  height: 40, // Total height of the coordinate space
  amplitude: 6, // Swing height
  frequency: 2,
  speed: 8000,
  resolution: 80, // Higher resolution for smoother mask
  strokeWidth: 8, // Overall thickness
  borderWidth: 1.5, // The literal border width
};

interface WaveAnimation2Props extends Partial<typeof defaultWaveConfig> {
  className?: string;
  innerClassName?: string;
  strokeClassName?: string;
}

export function WaveAnimation2({
  className,
  innerClassName,
  strokeClassName,
  width = defaultWaveConfig.width,
  height = defaultWaveConfig.height,
  amplitude = defaultWaveConfig.amplitude,
  frequency = defaultWaveConfig.frequency,
  speed = defaultWaveConfig.speed,
  resolution = defaultWaveConfig.resolution,
  strokeWidth = defaultWaveConfig.strokeWidth,
  borderWidth = defaultWaveConfig.borderWidth,
}: WaveAnimation2Props) {
  const time = useTime();
  const maskId = useId();

  // The viewBox should just cover the wave + half stroke width padding
  const padding = strokeWidth;
  const vbWidth = width;
  const vbHeight = amplitude * 2 + padding * 2;
  const vbY = height / 2 - amplitude - padding;

  const d = useTransform(time, (t) => {
    const points = [];
    const phase = (t / speed) * Math.PI * 2;

    for (let i = 0; i <= resolution; i++) {
      const x = (i / resolution) * width;
      const angle = (x / width) * (Math.PI * 2 * frequency) + phase;
      const y = height / 2 + Math.sin(angle) * amplitude;
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return `M ${points.join(" L ")}`;
  });

  return (
    <div
      className={cn(
        "pointer-events-none relative flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox={`0 ${vbY} ${vbWidth} ${vbHeight}`}
        className="text-foreground w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect
              x="-10"
              y="-50"
              width={width + 20}
              height={height + 100}
              fill="black"
            />
            <motion.path
              d={d}
              stroke="white"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <motion.path
              d={d}
              stroke="black"
              strokeWidth={strokeWidth - borderWidth * 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </mask>
        </defs>

        {/* The "Inside" fill path */}
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth - borderWidth * 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={cn("text-background-darker", innerClassName)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* The masked "Border" path */}
        <motion.path
          d={d}
          mask={`url(#${maskId})`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={cn("text-primary", strokeClassName)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </svg>
    </div>
  );
}
