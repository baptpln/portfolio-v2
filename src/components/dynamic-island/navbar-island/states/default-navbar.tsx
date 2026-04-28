import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { cn } from "@/lib/utils";
import { ContactButton } from "@/components/fragments/contact-button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { languages } from "./language-settings";

type DefaultNavbarProps = {
  onLanguageClick: () => void;
};

export const DefaultNavbar: FC<DefaultNavbarProps> = ({ onLanguageClick }) => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const navLinks: { name: string; path: string }[] = [];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const LogoContent = () => (
    <>
      <img
        src="/drache-labs-transparent.svg"
        alt="Drache Labs Logo"
        className="w-6 min-w-6 h-6 object-contain"
      />
      <span className="hidden sm:block text-sm font-medium font-display text-white/90 group-hover:text-white transition-colors">
        Baptiste
      </span>
    </>
  );

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-3 pl-2">
        <Link to="/" className="flex items-center gap-2 group w-fit">
          <LogoContent />
        </Link>

        <div className="w-px h-3 bg-white/30 ml-2 mr-0.5 rounded-full" />

        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-xl font-heading transition-all duration-300",
                  isActive
                    ? "shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5",
                )}
              >
                {link.name}
              </Button>
            </Link>
          );
        })}

        <ContactButton />
      </div>
      <div className="w-px h-4 bg-white/30 mx-0.5 rounded-full" />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost_reversed"
          className="rounded-lg outline-none overflow-hidden"
          onClick={onLanguageClick}
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
        </Button>
        <div className="w-px h-4 bg-white/30 mx-0.5 rounded-full" />
        <ThemeSwitcher />
      </div>
    </>
  );
};
