import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect, forwardRef, type FC } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { themeButtonIconVariants } from "./theme-switcher.variants";

const MotionDropdownItem = motion.create(DropdownMenuItem);
const MotionButton = motion.create(Button);

const ThemeIcon = ({ theme }: { theme: string | undefined }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SunMoon className="h-[1.2rem] w-[1.2rem]" />;
  }

  switch (theme) {
    case "light":
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    case "dark":
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    default:
      return <SunMoon className="h-[1.2rem] w-[1.2rem]" />;
  }
};

const ThemeButton = forwardRef<
  HTMLDivElement,
  {
    onClick: () => void;
    icon: any;
    label: string;
    isActive?: boolean;
  }
>(({ onClick, icon: Icon, label, isActive }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDropdownItem
      ref={ref}
      onClick={onClick}
      className={cn("justify-between w-full", isActive && "bg-secondary")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex"
        animate={isHovered ? "hover" : "rest"}
        variants={themeButtonIconVariants}
      >
        <Icon size={20} className="mr-1" />
      </motion.div>
      <span className="sr-only">{label}</span>
      <span className="flex w-full justify-center">{label}</span>
    </MotionDropdownItem>
  );
});

ThemeButton.displayName = "ThemeButton";

const iconTransitionVariants: Variants = {
  initial: {
    x: -20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

export const ThemeSwitcher: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const openChangeCallback = useCallback(
    (open: boolean) => (open ? setIsHovered(true) : setIsHovered(false)),
    [setIsHovered],
  );

  return (
    <DropdownMenu onOpenChange={openChangeCallback}>
      <DropdownMenuTrigger asChild>
        <MotionButton
          variant="ghost_reversed"
          // size="adaptiveIcon"
          className={cn("max-w-[36px] w-full rounded-full", className)}
          whileHover="hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={theme}
              variants={iconTransitionVariants}
              initial="initial"
              animate="animate"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 180 : 0,
                }}
                transition={{ type: "spring" }}
                className="flex items-center justify-center"
              >
                <ThemeIcon theme={theme} />
                <span className="sr-only">{t("theme.toggle")}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </MotionButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-2 flex flex-col space-y-[4px] w-fit"
      >
        <ThemeButton
          onClick={() => setTheme("light")}
          icon={Sun}
          label={t("theme.light")}
          key="light"
          isActive={theme === "light"}
        />
        <ThemeButton
          onClick={() => setTheme("dark")}
          icon={Moon}
          label={t("theme.dark")}
          key="dark"
          isActive={theme === "dark"}
        />
        <ThemeButton
          onClick={() => setTheme("system")}
          icon={SunMoon}
          label={t("theme.system")}
          key="system"
          isActive={theme === "system"}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
