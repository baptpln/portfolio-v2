import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState, type FC } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const languages = [
  { code: "en", name: "language.english", flag: "🇺🇸" },
  { code: "fr", name: "language.french", flag: "🇫🇷" },
  { code: "de", name: "language.german", flag: "🇩🇪" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 4 },
  show: { opacity: 1, scale: 1, y: 0 },
};

type LanguageToggleProps = {
  className?: string;
};

export const LanguageToggle: FC<LanguageToggleProps> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost_reversed"
          className={cn("rounded-lg outline-none overflow-hidden", className)}
        >
          <Globe className="h-[1rem] w-[1rem] text-inherit" />
          <motion.span
            key={currentLanguage.name}
            className="text-sm font-medium"
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <span className="md:hidden">
              {t(currentLanguage.name).slice(0, 2)}
            </span>
            <span className="hidden md:inline">{t(currentLanguage.name)}</span>
          </motion.span>
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="space-y-1 mt-1 min-w-0 w-fit p-1"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={open ? "show" : "hidden"}
          className="flex flex-col gap-1"
        >
          {languages.map((language) => (
            <motion.div key={language.code} variants={itemVariants}>
              <DropdownMenuItem
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  "flex items-center gap-2 cursor-pointer px-4",
                  i18n.language === language.code && "bg-accent",
                )}
              >
                <span className="hidden md:block">{t(language.name)}</span>
                <span className="block md:hidden uppercase">
                  {language.code}
                </span>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
