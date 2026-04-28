import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export const languages = [
  { code: "en", name: "language.english", flag: "🇺🇸" },
  { code: "fr", name: "language.french", flag: "🇫🇷" },
  { code: "de", name: "language.german", flag: "🇩🇪" },
] as const;

type LanguageSettingsProps = {
  onBack: () => void;
};

export const LanguageSettings: FC<LanguageSettingsProps> = ({ onBack }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onBack();
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onBack} className="rounded-xl">
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="w-px h-4 bg-white/30 mx-0.5 rounded-full" />

      {languages.map((language) => (
        <Button
          key={language.code}
          variant={i18n.language === language.code ? "secondary" : "ghost"}
          size="sm"
          onClick={() => changeLanguage(language.code)}
          className={cn(
            "rounded-xl font-heading transition-all duration-300",
            i18n.language === language.code
              ? "shadow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5",
          )}
        >
          <span className="text-lg mr-1">{language.flag}</span>
          <span className="hidden md:block">{t(language.name)}</span>
          <span className="block md:hidden uppercase">{language.code}</span>
        </Button>
      ))}
    </div>
  );
};
