import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-8 px-6 border-t border-border bg-background text-center">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Heather Greek. {t("footer.built")}
      </p>
    </footer>
  );
};

export default Footer;
