import { AnimatePresence, motion } from "framer-motion";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CallDemo } from "./demos/call/call-demo";
import { ChatDemo } from "./demos/chat/chat-demo";

interface Cell {
  key: string | null;
  Demo?: FC;
}

const cells: Cell[] = [
  { key: "chat", Demo: ChatDemo },
  { key: null },
  { key: "call", Demo: CallDemo },
  { key: null },
];

const MotionRefreshIcon = motion.create(ArrowsClockwiseIcon);

function DemoFrame({
  demoKey,
  visible,
  onExitComplete,
  children,
}: {
  demoKey: number;
  visible: boolean;
  onExitComplete: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key={demoKey}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShowcaseCell({ cell }: { cell: Cell }) {
  const { t } = useTranslation();
  const [demoKey, setDemoKey] = useState(0);
  const [visible, setVisible] = useState(true);
  const [spins, setSpins] = useState(0);

  const handleReset = () => {
    setVisible(false);
    setSpins((n) => n + 1);
  };
  const handleExitComplete = () => {
    setDemoKey((n) => n + 1);
    setVisible(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-background"
    >
      <div className="relative flex aspect-[4/3] items-stretch justify-center overflow-hidden">
        {cell.Demo && (
          <DemoFrame
            demoKey={demoKey}
            visible={visible}
            onExitComplete={handleExitComplete}
          >
            <cell.Demo />
          </DemoFrame>
        )}
      </div>

      {cell.key && (
        <div className="flex flex-col gap-1.5 border-t border-border p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold leading-tight">
              {t(`componentShowcase.cells.${cell.key}.title`)}
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleReset}
              aria-label={t("componentShowcase.reset")}
              className="h-7 w-7 "
            >
              <MotionRefreshIcon
                className="h-4 w-4"
                animate={{ rotate: spins * 720 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </Button>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(`componentShowcase.cells.${cell.key}.description`)}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function ComponentShowcase() {
  const { t } = useTranslation();

  return (
    <section className="w-full px-8 py-24 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
          {t("componentShowcase.heading")}
        </h2>
        <p className="font-heading text-lg leading-relaxed text-muted-foreground">
          {t("componentShowcase.subheading")}
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-border">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {cells.map((cell, i) => (
            <ShowcaseCell key={cell.key ?? `empty-${i}`} cell={cell} />
          ))}
        </div>
      </div>
    </section>
  );
}
