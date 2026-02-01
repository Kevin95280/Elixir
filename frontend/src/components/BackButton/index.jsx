import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        fixed top-4 left-4
        flex items-center gap-2
        px-4 py-2
        bg-gray-100 hover:bg-gray-200
        rounded-full
        text-gray-700 hover:text-accent
        shadow-sm hover:shadow-md
        transition-all
      "
    >
      <ArrowLeft size={18} />
      <span className="text-sm font-medium">{t("backButton.label")}</span>
    </button>
  );
};

export default BackButton;

