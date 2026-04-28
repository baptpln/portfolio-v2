import { useMemo } from "react";

const GRID = 15;
const CENTER = (GRID - 1) / 2;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

type PatternFn = (col: number, row: number) => number;

const patterns: PatternFn[] = [
  // Ring with center dot — "guide attention"
  (col, row) => {
    const dist = Math.sqrt((col - CENTER) ** 2 + (row - CENTER) ** 2);
    return clamp01(Math.max(1 - Math.abs(dist - 5) * 0.5, 1 - dist * 0.6));
  },
  // Diamond — "create delight"
  (col, row) => {
    const m = Math.abs(col - CENTER) + Math.abs(row - CENTER);
    return clamp01(1 - Math.abs(m - 5) * 0.35);
  },
  // Sine wave — "build trust"
  (col, row) => {
    const wave = Math.sin(col * 0.45) * 4;
    return clamp01(1 - Math.abs(row - CENTER - wave) * 0.4);
  },
];

export function DotMatrix({ activePattern }: { activePattern: number }) {
  const patternFn = patterns[activePattern % patterns.length];

  const dots = useMemo(() => {
    const result: { row: number; col: number; delay: number }[] = [];
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        const dist = Math.sqrt((col - CENTER) ** 2 + (row - CENTER) ** 2);
        result.push({ row, col, delay: dist * 0.025 });
      }
    }
    return result;
  }, []);

  return (
    <div
      className="inline-grid"
      style={{
        gridTemplateColumns: `repeat(${GRID}, var(--dot-size))`,
        gap: "var(--dot-gap)",
        // @ts-expect-error -- CSS custom properties
        "--dot-size": "clamp(6px, 1vw, 11px)",
        "--dot-gap": "clamp(3px, 0.55vw, 7px)",
      }}
    >
      {dots.map(({ row, col, delay }) => {
        const v = patternFn(col, row);
        const isLit = v > 0.3;
        return (
          <div
            key={`${row}-${col}`}
            className="rounded-full"
            style={{
              width: "var(--dot-size)",
              height: "var(--dot-size)",
              backgroundColor: isLit ? "var(--orb-300)" : "var(--foreground)",
              opacity: isLit ? 0.35 + v * 0.65 : 0.07,
              transform: `scale(${0.4 + v * 0.6})`,
              transition: `opacity 0.5s cubic-bezier(.25,.1,.25,1) ${delay}s, transform 0.5s cubic-bezier(.25,.1,.25,1) ${delay}s, background-color 0.5s cubic-bezier(.25,.1,.25,1) ${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
