import { motion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import { RotateCcw, Pause, Play } from "lucide-react";
import { IsometricItem } from "./isometric-item";
import buttonsSvg from "@/assets/buttons.svg";
import keyboardSvg from "@/assets/keyboard.svg";
import deepSvg from "@/assets/deep.svg";
import pitSvg from "@/assets/pit.svg";
import baseSvg from "@/assets/base.svg";

const ITEM_SIZE = 216;
const STACK_GAP = 20;
const HOVER_GAP = 80;
const APPEAR_DISTANCE = 200;
const ENTER_FROM = { x: -440, y: 220 };
const EXIT_TO = { x: 440, y: -220 };

const PHASE_MS = {
  snap: 0,
  enter: 900,
  hover: 1500,
  merge: 500,
  hold: 600,
  exit: 900,
};

const SPRING_ENTER = { type: "spring" as const, stiffness: 100, damping: 18 };
const SPRING_ASSEMBLE = {
  type: "spring" as const,
  stiffness: 180,
  damping: 20,
};
const SPRING_EXIT = { type: "spring" as const, stiffness: 80, damping: 16 };

const PHASES = ["snap", "enter", "hover", "merge", "hold", "exit"] as const;
type Phase = (typeof PHASES)[number];
const PHASE_DURATIONS = PHASES.map((p) => PHASE_MS[p]);

function getStackOffsets(count: number, gap: number) {
  const total = (count - 1) * gap;
  return Array.from({ length: count }, (_, i) => -total / 2 + i * gap);
}

function wrapperTarget(phase: Phase) {
  if (phase === "snap") return { ...ENTER_FROM, opacity: 0 };
  if (phase === "exit") return { ...EXIT_TO, opacity: 0 };
  return { x: 0, y: 0, opacity: 1 };
}

function wrapperTransition(phase: Phase) {
  if (phase === "snap") return { duration: 0 };
  if (phase === "exit") return SPRING_EXIT;
  return SPRING_ENTER;
}

function itemTarget(
  index: number,
  count: number,
  phase: Phase,
  isCenter: boolean,
) {
  const merged = getStackOffsets(count, STACK_GAP);
  const hover = getStackOffsets(count, HOVER_GAP);
  const appear = getStackOffsets(count, APPEAR_DISTANCE);

  if (isCenter) return { y: 0, opacity: phase === "snap" ? 0 : 1 };
  if (phase === "snap" || phase === "enter")
    return { y: appear[index], opacity: 0 };
  if (phase === "hover") return { y: hover[index], opacity: 1 };
  return { y: merged[index], opacity: 1 };
}

function AssemblySequence({
  phase,
  items,
}: {
  phase: Phase;
  items: ReactNode[];
}) {
  const centerIndex = Math.floor(items.length / 2);

  return (
    <motion.div
      className="absolute"
      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
      initial={wrapperTarget("snap")}
      animate={wrapperTarget(phase)}
      transition={wrapperTransition(phase)}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ zIndex: items.length - i + 10 }}
          initial={itemTarget(i, items.length, "snap", i === centerIndex)}
          animate={itemTarget(i, items.length, phase, i === centerIndex)}
          transition={SPRING_ASSEMBLE}
        >
          {item}
        </motion.div>
      ))}
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
        {playing ? <Pause size={12} /> : <Play size={12} />}
        {playing ? "Pause" : "Play"}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-xs font-heading text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20"
      >
        <RotateCcw size={12} />
        Reset
      </button>
    </div>
  );
}

export function IsometricConveyor({ hero = false }: { hero?: boolean }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);

  const phase = PHASES[phaseIndex];

  useEffect(() => {
    if (!playing) return;
    const ms = PHASE_DURATIONS[phaseIndex];
    if (ms === 0) {
      setPhaseIndex((p) => (p + 1) % PHASES.length);
      return;
    }
    const t = setTimeout(() => {
      const next = (phaseIndex + 1) % PHASES.length;
      if (next === 0) setCycle((c) => c + 1);
      setPhaseIndex(next);
    }, ms);
    return () => clearTimeout(t);
  }, [phaseIndex, playing]);

  const items = [
    <IsometricItem
      key={0}
      src={buttonsSvg}
      width={ITEM_SIZE}
      height={ITEM_SIZE}
    />,
    <IsometricItem
      key={1}
      src={keyboardSvg}
      width={ITEM_SIZE}
      height={ITEM_SIZE}
    />,
    <IsometricItem
      key={2}
      src={deepSvg}
      width={ITEM_SIZE}
      height={ITEM_SIZE}
    />,
    <IsometricItem key={3} src={pitSvg} width={ITEM_SIZE} height={ITEM_SIZE} />,
    <IsometricItem
      key={4}
      src={baseSvg}
      width={ITEM_SIZE}
      height={ITEM_SIZE}
    />,
  ];

  const handleReset = () => {
    setPhaseIndex(0);
    setCycle((c) => c + 1);
    setPlaying(true);
  };

  const animation = (
    <div
      className="relative h-[580px] w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: 800 }}
    >
      <AssemblySequence key={cycle} phase={phase} items={items} />
    </div>
  );

  if (hero) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {animation}
        <Controls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={handleReset}
        />
      </div>
    );
  }

  return (
    <section className="py-20 px-8 md:px-20 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
          Production Line
        </h2>
        <p className="text-muted-foreground text-lg font-heading">
          Isometric conveyor belt experiment
        </p>
      </motion.div>

      {animation}
      <Controls
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={handleReset}
      />
    </section>
  );
}
