import { motion, type Transition } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const CYCLE_MS = 4000;
const APPEAR_AT = 800;
const EXIT_AT = 3300;

const springIn: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 25,
};

const iconSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 15,
  delay: 0.15,
};

export function ShowcaseNotification({ mode }: { mode: "bad" | "good" }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<"hidden" | "enter" | "exit">("hidden");

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = (timestamp - start) % CYCLE_MS;

      if (elapsed < APPEAR_AT) {
        setPhase("hidden");
      } else if (elapsed < EXIT_AT) {
        setPhase("enter");
      } else {
        setPhase("exit");
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const isVisible = phase === "enter";
  const isExiting = phase === "exit";

  if (mode === "bad") {
    return (
      <div className="relative h-[88px] flex items-center justify-center">
        {(isVisible || isExiting) && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card shadow-md w-full max-w-[300px]">
            <div className="shrink-0 mt-0.5 text-emerald-500">
              <CheckCircle size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {t("animationShowcase.notification.title")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {t("animationShowcase.notification.description")}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-[88px] flex items-center justify-center">
      <motion.div
        className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card shadow-md w-full max-w-[300px]"
        initial={false}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1 }
            : isExiting
              ? { opacity: 0, y: -8, scale: 0.98 }
              : { opacity: 0, y: 24, scale: 0.95 }
        }
        transition={
          isVisible
            ? springIn
            : isExiting
              ? { duration: 0.3, ease: [0.4, 0, 1, 1] }
              : { duration: 0 }
        }
      >
        <motion.div
          className="shrink-0 mt-0.5 text-emerald-500"
          initial={false}
          animate={
            isVisible
              ? { rotate: 0, scale: 1, opacity: 1 }
              : { rotate: -90, scale: 0, opacity: 0 }
          }
          transition={isVisible ? iconSpring : { duration: 0 }}
        >
          <CheckCircle size={20} />
        </motion.div>
        <div className="min-w-0">
          <motion.p
            className="text-sm font-semibold text-foreground leading-tight"
            initial={false}
            animate={
              isVisible
                ? { opacity: 1, y: 0 }
                : isExiting
                  ? { opacity: 0, y: -4 }
                  : { opacity: 0, y: 8 }
            }
            transition={
              isVisible
                ? { duration: 0.35, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                : isExiting
                  ? { duration: 0.2 }
                  : { duration: 0 }
            }
          >
            {t("animationShowcase.notification.title")}
          </motion.p>
          <motion.p
            className="text-xs text-muted-foreground mt-0.5 leading-snug"
            initial={false}
            animate={
              isVisible
                ? { opacity: 1, y: 0 }
                : isExiting
                  ? { opacity: 0, y: -4 }
                  : { opacity: 0, y: 8 }
            }
            transition={
              isVisible
                ? { duration: 0.35, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                : isExiting
                  ? { duration: 0.15 }
                  : { duration: 0 }
            }
          >
            {t("animationShowcase.notification.description")}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
