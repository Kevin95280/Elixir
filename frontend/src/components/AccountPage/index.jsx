import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import Avatar from "boring-avatars";

const AccountPage = () => {
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Thème
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Correction Invalid Date
  let formattedDate = t("account.unknownDate");

  if (user.createdAt) {
    const parsed = new Date(user.createdAt);
    if (!isNaN(parsed)) {
      formattedDate = parsed.toLocaleDateString(lang);
    }
  }

  // Validation force du mot de passe
  const validatePasswordStrength = (pwd) => {
    if (pwd.length < 12) return setPasswordStrength(t("account.password.tooShort"));
    if (!/[A-Z]/.test(pwd)) return setPasswordStrength(t("account.password.needUpper"));
    if (!/[a-z]/.test(pwd)) return setPasswordStrength(t("account.password.needLower"));
    if (!/[0-9]/.test(pwd)) return setPasswordStrength(t("account.password.needNumber"));
    if (!/[^A-Za-z0-9]/.test(pwd)) return setPasswordStrength(t("account.password.needSymbol"));

    setPasswordStrength(t("account.password.strong"));
  };

  // Modifier le mot de passe
  const handleChangePassword = async () => {
    setError("");

    if (!password.trim()) {
      return setError(t("account.password.empty"));
    }

    if (passwordStrength !== t("account.password.strong")) {
      return setError(t("account.password.notStrongEnough"));
    }

    setSaving(true);

    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("account.password.updateError"));

      alert(t("account.password.updated"));
      setPassword("");
      setPasswordStrength("");
    } catch (err) {
      console.error(err);
      setError(t("account.password.updateError"));
    }

    setSaving(false);
  };

  // Supprimer le compte
  const handleDeleteAccount = async () => {
    if (!window.confirm(t("account.dangerZone.confirmDelete"))) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      logout();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(t("account.dangerZone.deleteError"));
    }
  };

  if (loading || user === null) {
    return <p>{t("loading")}</p>;
  }

  if (!token) {
    return <p>{t("unauthorized")}</p>;
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 space-y-10 pt-32">

      {/* HEADER FLOTTANT */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-4 text-sm">

        {/* Avatar + infos */}
        <div className="flex items-center gap-3">
          <Avatar
            size={50}
            name={user.email}
            variant="beam"
            colors={["#8b5cf6", "#ec4899", "#fbbf24", "#10b981", "#3b82f6"]}
          />

          <div className="text-right">
            <p className="font-semibold">{user.email}</p>
            <p className="text-xs text-gray-600">
              {t("account.createdAt")} {formattedDate}
            </p>
          </div>
        </div>

        {/* Préférences */}
        <div className="flex flex-col items-end gap-2">

          {/* Thème */}
          <div className="flex items-center gap-2">
            <span className="font-medium">{t("account.theme")}</span>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-1 text-white rounded-md transition text-sm"
            >
              {theme === "light" ? t("account.themeDark") : t("account.themeLight")}
            </button>
          </div>

          {/* Langue */}
          <div className="flex items-center gap-2">
            <span className="font-medium">{t("account.language")}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="p-1 border rounded-md text-black text-sm"
            >
              <option value="fr">{t("account.languageFr")}</option>
              <option value="en">{t("account.languageEn")}</option>
            </select>
          </div>

        </div>
      </div>

      {/* SECTION : Modifier mot de passe */}
      <section className="p-6 border border-gray-300 rounded-lg bg-white/5 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">{t("account.password.title")}</h3>

        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="md:col-span-1 space-y-1">
            <input
              type="password"
              placeholder={t("account.password.new")}
              className="p-2 border rounded-md w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePasswordStrength(e.target.value);
              }}
            />

            {passwordStrength && (
              <p
                className={
                  passwordStrength === t("account.password.strong")
                    ? "text-green-600 text-sm"
                    : "text-red-600 text-sm"
                }
              >
                {passwordStrength}
              </p>
            )}
          </div>

          <button
            onClick={handleChangePassword}
            disabled={saving}
            className="md:col-span-2 text-white p-2 rounded-md transition"
          >
            {saving ? t("account.password.updating") : t("account.password.update")}
          </button>
        </div>
      </section>

      {/* SECTION : Danger Zone */}
      <section className="p-6 bg-red-50 border border-red-300 rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold text-red-700">{t("account.dangerZone.title")}</h3>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-red-600">{t("account.dangerZone.warning")}</p>

          <button
            onClick={handleDeleteAccount}
            className="mt-4 md:mt-0 bg-red-700 text-white p-2 rounded-md hover:bg-red-800 transition"
          >
            {t("account.dangerZone.delete")}
          </button>
        </div>
      </section>

    </div>
  );
};

export default AccountPage;
