"use client";

import { motion, useTime, useTransform } from "framer-motion";

const waveConfig = {
    width: 90,
    height: 20,
    amplitude: 5,
    frequency: 2,
    speed: 8000,
    resolution: 40,
    strokeWidth: 6,
};

interface WaveAnimationProps {
    className?: string;
}

export function WaveAnimation({ className }: WaveAnimationProps) {
    const time = useTime();

    const d = useTransform(time, (t) => {
        const points = [];
        const phase = (t / waveConfig.speed) * Math.PI * 2;

        for (let i = 0; i <= waveConfig.resolution; i++) {
            const x = (i / waveConfig.resolution) * waveConfig.width;
            const angle = (x / waveConfig.width) * (Math.PI * 2 * waveConfig.frequency) + phase;
            const y = (waveConfig.height / 2) + Math.sin(angle) * waveConfig.amplitude;
            points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
        }

        return `M ${points.join(" L ")}`;
    });

    return (
        <div className={`pointer-events-none relative ${className}`}>
            <svg
                viewBox={`0 -10 ${waveConfig.width} ${waveConfig.height + 20}`}
                className="text-foreground w-full h-auto overflow-visible"
            >
                <motion.path
                    d={d}
                    stroke="currentColor"
                    strokeWidth={waveConfig.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            </svg>
        </div>
    );
}
