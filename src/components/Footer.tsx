import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-8 px-6 border-t border-border bg-background text-center">
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Heather Greek. {t("footer.built")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
