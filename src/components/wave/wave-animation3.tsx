"use client";

import { motion } from "framer-motion";

const waveConfig = {
    width: 92,
    height: 23,
    speed: 4, // Duration in seconds for one full loop
};

interface WaveAnimation3Props {
    className?: string;
}

export function WaveAnimation3({ className }: WaveAnimation3Props) {
    // We use the original wave path from wave.svg
    const pathData = "M30.783 1.02044C15.783 1.02044 -4.21664 16.0204 0.783023 21.0204C5.78276 26.0206 15.783 11.0206 30.783 11.0204C45.783 11.0203 45.783 21.0204 60.7831 21.0204C75.7831 21.0204 95.7831 6.02056 90.783 1.02044C85.783 -3.97967 75.7831 11.0204 60.7831 11.0204C45.783 11.0204 45.783 1.02044 30.783 1.02044Z";

    return (
        <div className={`pointer-events-none relative overflow-hidden ${className}`}>
            {/* Container that slides */}
            <motion.div
                className="flex"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: waveConfig.speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{ width: "200%" }} // Two copies side-by-side
            >
                <div className="w-1/2">
                    <svg
                        viewBox="0 0 92 23"
                        className="w-full h-auto text-foreground"
                    >
                        <path d={pathData} fill="currentColor" strokeWidth="0" />
                    </svg>
                </div>
                <div className="w-1/2">
                    <svg
                        viewBox="0 0 92 23"
                        className="w-full h-auto text-foreground"
                    >
                        <path d={pathData} fill="currentColor" strokeWidth="0" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
