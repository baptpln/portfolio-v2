import { motion } from "framer-motion";
import { useState, useEffect, type FC } from "react";
import {
  ArrowCounterClockwiseIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { IsometricItem } from "./isometric-item";
import screenSvg from "@/assets/isometric/screen.svg";
import keyboardSvg from "@/assets/isometric/keyboard.svg";
import deepSvg from "@/assets/isometric/deep.svg";
import pitSvg from "@/assets/isometric/pit.svg";
import togglesSvg from "@/assets/isometric/toggles.svg";

const ITEM_SIZE = 216;

const LAYERS = [screenSvg, keyboardSvg, deepSvg, pitSvg, togglesSvg];

const SPRING = {
  enter: { type: "spring" as const, stiffness: 100, damping: 18 },
  assemble: { type: "spring" as const, stiffness: 180, damping: 20 },
  exit: { type: "spring" as const, stiffness: 80, damping: 16 },
  instant: { duration: 0 },
};

const TIMELINE = [
  {
    name: "snap",
    ms: 0,
    block: { x: -440, y: 220, opacity: 0, transition: SPRING.instant },
    layers: { gap: 200, opacity: 0, centerOpacity: 0 },
  },
  {
    name: "enter",
    ms: 900,
    block: { x: 0, y: 0, opacity: 1, transition: SPRING.enter },
    layers: { gap: 200, opacity: 0, centerOpacity: 1 },
  },
  {
    name: "hover",
    ms: 1500,
    block: { x: 0, y: 0, opacity: 1, transition: SPRING.enter },
    layers: { gap: 80, opacity: 1, centerOpacity: 1 },
  },
  {
    name: "merge",
    ms: 500,
    block: { x: 0, y: 0, opacity: 1, transition: SPRING.enter },
    layers: { gap: 20, opacity: 1, centerOpacity: 1 },
  },
  {
    name: "hold",
    ms: 600,
    block: { x: 0, y: 0, opacity: 1, transition: SPRING.enter },
    layers: { gap: 20, opacity: 1, centerOpacity: 1 },
  },
  {
    name: "exit",
    ms: 900,
    block: { x: 440, y: -220, opacity: 0, transition: SPRING.exit },
    layers: { gap: 20, opacity: 1, centerOpacity: 1 },
  },
] as const;

type Step = (typeof TIMELINE)[number];

function blockOf(step: Step) {
  const { x, y, opacity } = step.block;
  return { x, y, opacity };
}

function layerOffset(index: number, count: number, gap: number) {
  return (index - (count - 1) / 2) * gap;
}

function AssemblySequence({ step }: { step: Step }) {
  const count = LAYERS.length;
  const centerIndex = Math.floor(count / 2);
  const transition = step.block.transition;

  return (
    <motion.div
      className="absolute"
      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
      initial={blockOf(TIMELINE[0])}
      animate={blockOf(step)}
      transition={transition}
    >
      {LAYERS.map((src, i) => {
        const isCenter = i === centerIndex;
        const target = (s: Step) => ({
          y: isCenter ? 0 : layerOffset(i, count, s.layers.gap),
          opacity: isCenter ? s.layers.centerOpacity : s.layers.opacity,
        });

        return (
          <motion.div
            key={src}
            className="absolute"
            style={{ zIndex: count - i + 10 }}
            initial={target(TIMELINE[0])}
            animate={target(step)}
            transition={SPRING.assemble}
          >
            <IsometricItem src={src} width={ITEM_SIZE} height={ITEM_SIZE} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Controls({
  playing,
  onToggle,
  onReset,
}: {
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-xs font-heading text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20"
      >
        {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
        {playing ? "Pause" : "Play"}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-xs font-heading text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20"
      >
        <ArrowCounterClockwiseIcon size={12} />
        Reset
      </button>
    </div>
  );
}

export const IsometricConveyor: FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;

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
  }, [stepIndex, playing]);

  const handleReset = () => {
    setStepIndex(0);
    setCycle((c) => c + 1);
    setPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border border-border overflow-hidden">
      <div
        className="relative h-[580px] w-full flex items-center justify-center"
        style={{ perspective: 800 }}
      >
        <AssemblySequence key={cycle} step={TIMELINE[stepIndex]} />
      </div>
      <Controls
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={handleReset}
      />
    </div>
  );
};
