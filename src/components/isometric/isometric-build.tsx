import { motion, useInView } from "framer-motion";
import { useEffect, useId, useRef, useState, type CSSProperties, type FC } from "react";

const SIZE = 220;

// The right/bottom faces share the exact same local geometry in both states —
// only the group's own transform matrix changes, so it can be interpolated
// directly (a real shear) instead of crossfading between two separate renders.
const RIGHT_MATRIX = {
  flat: "matrix(1, 0, 0, 1, 100, 0)",
  folded: "matrix(0.707107, 0.707107, 0, 1, 100, 0)",
};
const BOTTOM_MATRIX = {
  flat: "matrix(1, 0, 0, 1, 0, 100)",
  folded: "matrix(1, 0, 0.707107, 0.707107, 0, 100)",
};
// Same rotateZ/scaleY trick as IsometricItem — the final camera framing step.
const OUTER_FLIP = {
  flat: { rotateZ: 0, scaleY: 1 },
  folded: { rotateZ: 45, scaleY: 0.6 },
};

const EASE = [0.65, 0, 0.35, 1] as const;
const FOLD_TWEEN = { duration: 0.7, ease: EASE };
const SHEAR_TRANSITION = `transform 0.7s cubic-bezier(${EASE.join(", ")})`;
const REVEAL = { duration: 0.35, ease: "easeOut" as const };

const DOT_ROWS = [56, 51, 61, 66, 71, 76, 81, 86];
const DOT_COLS = [4.5, 9.5, 14.5];

type TierName =
  | "rightCasing"
  | "bottomCasing"
  | "bezel"
  | "screen"
  | "knob"
  | "dots"
  | "divider"
  | "toggle"
  | "orangeKnob";

const TIERS: TierName[] = [
  "rightCasing",
  "bottomCasing",
  "bezel",
  "screen",
  "knob",
  "dots",
  "divider",
  "toggle",
  "orangeKnob",
];

const TIMELINE = [
  { name: "reset", ms: 0, revealed: 0, shear: 0, flip: 0 },
  { name: "rightCasing", ms: 320, revealed: 1, shear: 0, flip: 0 },
  { name: "bottomCasing", ms: 320, revealed: 2, shear: 0, flip: 0 },
  { name: "bezel", ms: 320, revealed: 3, shear: 0, flip: 0 },
  { name: "screen", ms: 320, revealed: 4, shear: 0, flip: 0 },
  { name: "knob", ms: 320, revealed: 5, shear: 0, flip: 0 },
  { name: "dots", ms: 700, revealed: 6, shear: 0, flip: 0 },
  { name: "divider", ms: 320, revealed: 7, shear: 0, flip: 0 },
  { name: "toggle", ms: 320, revealed: 8, shear: 0, flip: 0 },
  { name: "orangeKnob", ms: 320, revealed: 9, shear: 0, flip: 0 },
  { name: "hold-flat", ms: 650, revealed: 9, shear: 0, flip: 0 },
  { name: "shear", ms: 700, revealed: 9, shear: 1, flip: 0 },
  { name: "flip", ms: 700, revealed: 9, shear: 1, flip: 1 },
  { name: "hold-iso", ms: 1900, revealed: 9, shear: 1, flip: 1 },
  { name: "unflip", ms: 700, revealed: 9, shear: 1, flip: 0 },
  { name: "unshear", ms: 700, revealed: 9, shear: 0, flip: 0 },
  { name: "hide", ms: 450, revealed: 0, shear: 0, flip: 0 },
] as const;

type Step = (typeof TIMELINE)[number];

function tierOpacity(step: Step, tier: TierName) {
  return step.revealed > TIERS.indexOf(tier) ? 1 : 0;
}

function ShearGroup({
  matrix,
  sheared,
  children,
}: {
  matrix: typeof RIGHT_MATRIX;
  sheared: boolean;
  children: React.ReactNode;
}) {
  const style: CSSProperties = {
    transform: sheared ? matrix.folded : matrix.flat,
    transition: SHEAR_TRANSITION,
  };
  return <g style={style}>{children}</g>;
}

function Tier({
  step,
  tier,
  delay,
  children,
}: {
  step: Step;
  tier: TierName;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: tierOpacity(step, tier) }}
      transition={delay ? { ...REVEAL, delay } : REVEAL}
    >
      {children}
    </motion.g>
  );
}

function FoundationsBuild({ step }: { step: Step }) {
  const sheared = step.shear === 1;
  const flipped = step.flip === 1;
  const toggleClipId = useId();

  return (
    <motion.div
      className="relative"
      style={{ width: SIZE, height: SIZE }}
      initial={OUTER_FLIP.flat}
      animate={flipped ? OUTER_FLIP.folded : OUTER_FLIP.flat}
      transition={FOLD_TWEEN}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* front face — stays put, identical in both states */}
        <rect x="0.5" y="0.5" width="99" height="99" fill="white" stroke="black" />

        <Tier step={step} tier="bezel">
          <rect x="4.5" y="5.5" width="90" height="90" rx="9.5" fill="#D9D9D9" />
          <rect x="4.5" y="5.5" width="90" height="90" rx="9.5" stroke="black" />
        </Tier>

        <Tier step={step} tier="screen">
          <path
            d="M15 8.5H88C91.5899 8.5 94.5 11.4101 94.5 15V86C94.5 91.2467 90.2467 95.5 85 95.5H14C10.4101 95.5 7.5 92.5898 7.5 89V16C7.5 11.8579 10.8579 8.5 15 8.5Z"
            fill="black"
            stroke="black"
          />
        </Tier>

        {/* right face — one shared matrix animates the casing, knob and dots from flat to folded */}
        <ShearGroup matrix={RIGHT_MATRIX} sheared={sheared}>
          <Tier step={step} tier="rightCasing">
            <rect x="0" y="0" width="20" height="100" fill="#D9D9D9" stroke="black" />
          </Tier>

          <Tier step={step} tier="knob">
            <rect x="5" y="10.5" width="9" height="28" rx="4.5" stroke="black" />
            <path
              d="M8 12.5C9.657 12.5 11 13.8431 11 15.5V37.5996C11 38.0967 10.597 38.5 10.1 38.5C7.283 38.4998 5 36.2167 5 33.4004V15.5C5 13.8431 6.343 12.5 8 12.5Z"
              fill="black"
              stroke="black"
            />
          </Tier>

          <Tier step={step} tier="dots">
            {DOT_ROWS.map((y, rowIndex) => (
              <Tier key={y} step={step} tier="dots" delay={rowIndex * 0.06}>
                {DOT_COLS.map((x) => (
                  <g key={x}>
                    <circle cx={x} cy={y} r="1.9" fill="#969696" stroke="black" strokeWidth="0.2" />
                    <circle
                      cx={x - 0.25}
                      cy={y + 0.25}
                      r="1.65"
                      fill="black"
                      stroke="black"
                      strokeWidth="0.2"
                    />
                  </g>
                ))}
              </Tier>
            ))}
          </Tier>
        </ShearGroup>

        {/* bottom face — one shared matrix animates the casing, tiles and knob from flat to folded */}
        <ShearGroup matrix={BOTTOM_MATRIX} sheared={sheared}>
          <Tier step={step} tier="bottomCasing">
            <rect x="0" y="0" width="100" height="20" fill="#D9D9D9" stroke="black" />
          </Tier>

          <Tier step={step} tier="divider">
            <line x1="20.5" y1="0" x2="20.5" y2="19" stroke="black" />
          </Tier>

          <Tier step={step} tier="toggle">
            <defs>
              <clipPath id={toggleClipId}>
                <rect x="22" y="1" width="77" height="17" fill="white" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${toggleClipId})`}>
              <rect x="22.5" y="1.5" width="76" height="16" rx="1.5" fill="#D9D9D9" stroke="black" />
              <rect x="24.5" y="2.5" width="73" height="13" rx="0.5" fill="black" stroke="black" />
            </g>
          </Tier>

          <Tier step={step} tier="orangeKnob">
            <path
              d="M11.7966 6.127C13.7427 6.836 14.7468 8.987 14.0386 10.933C13.6531 11.992 13.1657 13.552 12.2618 14.635C11.8148 15.171 11.2781 15.573 10.6163 15.743C9.9551 15.912 9.1369 15.857 8.1133 15.418C7.1499 15.005 6.5701 14.492 6.2382 13.94C5.9067 13.386 5.8078 12.767 5.8515 12.118C5.8945 11.468 6.0802 10.797 6.3076 10.152C6.4201 9.831 6.5437 9.517 6.6616 9.218C6.78 8.919 6.8945 8.632 6.991 8.368C7.6993 6.421 9.8507 5.42 11.7966 6.127Z"
              fill="#DB783D"
              stroke="black"
              strokeWidth="0.5"
            />
            <circle cx="9.51465" cy="12.138" r="3.75" fill="#E17101" stroke="black" strokeWidth="0.5" />
          </Tier>
        </ShearGroup>
      </svg>
    </motion.div>
  );
}

export const IsometricBuild: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [stepIndex, setStepIndex] = useState(0);
  const [cycle, setCycle] = useState(0);

  // Stop scheduling ticks entirely while scrolled out of view — no CPU/GPU
  // work happens for an animation nobody can see.
  useEffect(() => {
    if (!isInView) return;

    const next = () => {
      const i = (stepIndex + 1) % TIMELINE.length;
      if (i === 0) setCycle((c) => c + 1);
      setStepIndex(i);
    };

    const ms = TIMELINE[stepIndex].ms;
    if (ms === 0) {
      next();
      return;
    }
    const t = setTimeout(next, ms);
    return () => clearTimeout(t);
  }, [stepIndex, isInView]);

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center">
      {isInView && <FoundationsBuild key={cycle} step={TIMELINE[stepIndex]} />}
    </div>
  );
};
