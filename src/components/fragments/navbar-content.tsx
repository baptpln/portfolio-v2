import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language/language-toggle";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { cn } from "@/lib/utils";
import { ContactButton } from "./contact-button";

export const NavbarContent = () => {
  const location = useLocation();
  const navLinks: { name: string; path: string }[] = [];

  const LogoContent = () => (
    <>
      <img
        src="/drache-labs-transparent.svg"
        alt="Drache Labs Logo"
        className="w-6 h-6 object-contain"
      />
      <span className="text-sm font-medium font-display  text-white/90 group-hover:text-white transition-colors">
        Baptiste
      </span>
    </>
  );

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-3 pl-2">
        <Link to="/" className="flex items-center gap-2 group">
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
        <LanguageToggle className="" />
        <div className="w-px h-4 bg-white/30 mx-0.5 rounded-full" />
        <ThemeSwitcher />
      </div>
    </>
  );
};
