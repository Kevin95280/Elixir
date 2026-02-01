import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="w-full bg-background shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Bloc gauche : logo + phrase d'accroche */}
      <div className="flex flex-col">
        <Link
          to="/"
          onClick={() => {
            setSearch("");
            setShowForm(false);
            setEditingWine(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-bold transition"
        >
          {t("header.brand")}
        </Link>

        <span className="text-sm text-text opacity-80">
          {t("header.tagline")}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {!user && (
          <>
            <Link to="/login" className="text-text hover:text-accent transition">
              {t("header.login")}
            </Link>

            <Link
              to="/signup"
              className="px-3 py-1 bg-accent text-white rounded-md hover:bg-grape transition"
            >
              {t("header.signup")}
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-text">
              {t("header.welcome", { name: user.username })}
            </span>

            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              {t("header.logout")}
            </button>

            <Link
              to="/account"
              className="text-text hover:text-accent transition"
            >
              {t("header.account")}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

