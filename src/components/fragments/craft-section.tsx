import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MousePointerClick, Sparkles, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { DotMatrix } from "./dot-matrix";
import type { LucideIcon } from "lucide-react";

const pillars = [
  { key: "guide", icon: Eye },
  { key: "delight", icon: Sparkles },
  { key: "trust", icon: MousePointerClick },
] as const;

const CYCLE_MS = 5000;

function iconKeyframes(key: string): Record<string, number[]> {
  switch (key) {
    case "guide":
      return { scaleY: [1, 0.15, 1] };
    case "delight":
      return { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] };
    case "trust":
      return { y: [0, 2, -2, 0], scale: [1, 0.9, 1.1, 1] };
    default:
      return {};
  }
}

export function CraftSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % pillars.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 px-8 md:px-20 max-w-5xl mx-auto w-full">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-6 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
          {t("craft.heading")}
        </h2>
        <p className="text-muted-foreground text-lg font-heading leading-relaxed">
          {t("craft.subheading")}
        </p>
      </motion.div>

      {/* Dot Matrix */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center my-14"
      >
        <DotMatrix activePattern={activeIndex} />
      </motion.div>

      <PillarCards activeIndex={activeIndex} />
    </section>
  );
}

function PillarCards({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pillars.map(({ key, icon: Icon }, index) => (
        <PillarCard
          key={key}
          pillarKey={key}
          icon={Icon}
          index={index}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}

function PillarCard({
  pillarKey,
  icon: Icon,
  index,
  isActive,
}: {
  pillarKey: string;
  icon: LucideIcon;
  index: number;
  isActive: boolean;
}) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center px-4 py-6 rounded-xl"
    >
      {/* Colored accent bar that slides between cards */}
      {isActive && (
        <motion.div
          layoutId="pillar-accent"
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
          style={{ backgroundColor: "var(--orb-300)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div
        className="w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-all duration-500"
        style={
          isActive
            ? {
                backgroundColor: "color-mix(in oklch, var(--orb-300) 12%, transparent)",
                borderColor: "color-mix(in oklch, var(--orb-300) 30%, transparent)",
                color: "var(--orb-300)",
              }
            : undefined
        }
      >
        <motion.div
          animate={
            isActive
              ? iconKeyframes(pillarKey)
              : { scaleY: 1, rotate: 0, scale: 1, y: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Icon size={22} strokeWidth={1.5} />
        </motion.div>
      </div>
      <h3 className="font-heading font-semibold text-sm mb-2">
        {t(`craft.pillars.${pillarKey}.title`)}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t(`craft.pillars.${pillarKey}.description`)}
      </p>
    </motion.div>
  );
}
