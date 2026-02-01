import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full text-center py-6 text-sm text-text opacity-70">
      {t("footer.rights", { year: new Date().getFullYear() })}
    </footer>
  );
};

export default Footer;
