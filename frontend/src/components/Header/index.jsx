import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header
      className="
        w-full bg-background shadow-md px-6 py-4
        grid grid-cols-3 items-center
        md:flex md:items-center md:justify-between
      "
    >
      {/* Colonne gauche : logo + tagline */}
      <div className="flex flex-col col-span-1">
        <Link
          to="/"
          onClick={() => {
            setSearch("");
            setShowForm(false);
            setEditingWine(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-bold leading-tight"
        >
          {t("header.brand")}
        </Link>

        <span className="text-sm opacity-80 leading-tight max-w-[90%]">
          {t("header.tagline")}
        </span>
      </div>

      {/* Colonne centre : message de bienvenue (uniquement si connecté) */}
      {user && (
        <span className="text-center text-sm col-span-1 md:order-none">
          {t("header.welcome", { name: user.username })}
        </span>
      )}

      {/* Colonne droite : compte + déconnexion (uniquement si connecté) */}
      {user && (
        <div
          className="
            flex flex-col items-end gap-1 col-span-1
            md:flex-row md:items-center md:gap-4
          "
        >
          <Link
            to="/account"
            className="text-text hover:text-accent transition"
          >
            {t("header.account")}
          </Link>

          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            {t("header.logout")}
          </button>
        </div>
      )}

      {/* Navigation quand NON connecté (on occupe centre + droite) */}
      {!user && (
        <nav className="flex items-center justify-end gap-6 col-span-2 md:col-span-1">
          <Link to="/login" className="text-text hover:text-accent transition">
            {t("header.login")}
          </Link>

          <Link
            to="/signup"
            className="px-3 py-1 bg-accent text-white rounded-md hover:bg-grape transition"
          >
            {t("header.signup")}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;


