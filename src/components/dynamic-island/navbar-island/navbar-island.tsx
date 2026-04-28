import { type FC, type ReactNode, useState } from "react";
import { motion, type Variants } from "framer-motion";
import DynamicIsland from "../dynamic-island";
import { DefaultNavbar } from "./states/default-navbar";
import { LanguageSettings } from "./states/language-settings";

// ============================================================================
// TYPES
// ============================================================================

type NavbarState = "default" | "language";

type AnimatedContentProps = {
  children: ReactNode;
  delay?: number;
};

// Simple fade variants
const contentVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
  },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.1,
      delay,
      ease: "easeOut",
    },
  }),
};

const AnimatedContent: FC<AnimatedContentProps> = ({
  children,
  delay = 0.2,
}) => (
  <motion.div
    className="flex items-center w-full h-full gap-1 sm:gap-2"
    custom={delay}
    variants={contentVariants}
    initial="initial"
    animate="animate"
  >
    {children}
  </motion.div>
);

export const NavbarIsland: FC<{ className?: string }> = ({ className }) => {
  const [state, setState] = useState<NavbarState>("default");

  const handleLanguageClick = () => setState("language");
  const handleBack = () => setState("default");

  return (
    <DynamicIsland
      positionClasses="fixed top-4 left-1/2 -translate-x-1/2 rounded-full"
      className={className}
      transformOrigin={{ originX: 0.5, originY: 0 }}
    >
      {state === "default" && (
        <AnimatedContent delay={0.2}>
          <DefaultNavbar onLanguageClick={handleLanguageClick} />
        </AnimatedContent>
      )}

      {state === "language" && (
        <AnimatedContent delay={0.2}>
          <LanguageSettings onBack={handleBack} />
        </AnimatedContent>
      )}
    </DynamicIsland>
  );
};
