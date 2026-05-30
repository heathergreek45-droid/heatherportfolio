import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", label: "English" },
  { code: "af", label: "Afrikaans" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "he", label: "עברית" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = languages.find((l) => l.code === i18n.language) ?? languages[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("lang_label")}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/90 backdrop-blur border border-border text-foreground hover:border-primary/50 transition-colors text-sm font-medium shadow-lg"
        >
          <Globe size={16} />
          <span>{current.label}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[10rem]">
          {languages.map((lng) => (
            <DropdownMenuItem
              key={lng.code}
              onClick={() => i18n.changeLanguage(lng.code)}
              className={i18n.language === lng.code ? "bg-accent/30" : ""}
            >
              {lng.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
