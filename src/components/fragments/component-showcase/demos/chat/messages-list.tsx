import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FC, RefObject } from "react";
import type { Message } from "./types";

const SPRING = { type: "spring" as const, stiffness: 380, damping: 28 };

const BUBBLE_BASE = "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm";
const BUBBLE = {
  visitor: `${BUBBLE_BASE} self-end rounded-br-sm bg-primary text-primary-foreground`,
  bot: `${BUBBLE_BASE} self-start rounded-bl-sm bg-muted text-foreground`,
};

/** Three dots, the universal "hold on". */
const TypingDots: FC = () => (
  <span className="flex items-center gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block h-1.5 w-1.5 rounded-full bg-current"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </span>
);

export const MessagesList: FC<{
  messages: Message[];
  typing: boolean;
  scrollerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}> = ({ messages, typing, scrollerRef, contentRef }) => {
  const reduceMotion = useReducedMotion();

  const entrance = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 10, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
      };

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={scrollerRef} className="h-full overflow-y-auto p-5">
        <div
          ref={contentRef}
          className="mt-auto flex min-h-full flex-col justify-end gap-2"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                layout={reduceMotion ? false : "position"}
                {...entrance}
                transition={SPRING}
                className={BUBBLE[m.from]}
              >
                {m.text}
              </motion.div>
            ))}

            {typing && (
              <motion.div
                key="typing"
                layout={reduceMotion ? false : "position"}
                {...entrance}
                transition={SPRING}
                className={`${BUBBLE.bot} text-muted-foreground`}
              >
                <TypingDots />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <span className="pointer-events-none absolute left-0 right-0 top-0 h-4 bg-linear-to-t from-transparent to-background z-0" />
      <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-linear-to-b from-transparent to-background z-0" />
    </div>
  );
};
