import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validatePasswordStrength = (pwd) => {
    if (pwd.length < 12) return setPasswordStrength(t("reset.password.tooShort"));
    if (!/[A-Z]/.test(pwd)) return setPasswordStrength(t("reset.password.needUpper"));
    if (!/[a-z]/.test(pwd)) return setPasswordStrength(t("reset.password.needLower"));
    if (!/[0-9]/.test(pwd)) return setPasswordStrength(t("reset.password.needNumber"));
    if (!/[^A-Za-z0-9]/.test(pwd)) return setPasswordStrength(t("reset.password.needSymbol"));

    setPasswordStrength(t("reset.password.strong"));
  };

  const handleConfirmChange = (value) => {
    setConfirm(value);
    setPasswordMatch(value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passwordMatch) {
      return setError(t("reset.password.noMatch"));
    }

    try {
      const res = await fetch(`http://localhost:3000/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-muted rounded-md space-y-4"
    >
      <h2 className="text-xl font-bold">{t("reset.title")}</h2>

      {success && <p className="text-green-600">{t("reset.success")}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="password"
        placeholder={t("reset.password.label")}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePasswordStrength(e.target.value);
          setPasswordMatch(e.target.value === confirm);
        }}
        className="w-full p-2 border rounded-md"
      />

      {passwordStrength && (
        <p
          className={
            passwordStrength === t("reset.password.strong")
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {passwordStrength}
        </p>
      )}

      <input
        type="password"
        placeholder={t("reset.password.confirm")}
        value={confirm}
        onChange={(e) => handleConfirmChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      {!passwordMatch && confirm.length > 0 && (
        <p className="text-red-600">{t("reset.password.noMatch")}</p>
      )}

      <button className="w-full bg-accent text-white p-2 rounded-md hover:bg-grape transition">
        {t("reset.submit")}
      </button>
    </form>
  );
};

export default ResetPassword;
