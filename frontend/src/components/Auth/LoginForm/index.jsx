import { useState } from "react";
import { login } from "../../../../../backend/src/app/services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login({ email, password });
      handleLogin(data);
      navigate("/");
    } catch (err) {
      console.error("Erreur login :", err);
      setError(t("login.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-accent/10 rounded-md max-w-md mx-auto mt-10"
    >
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="email"
        placeholder={t("login.email")}
        className="w-full p-2 border border-gray-300 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder={t("login.password")}
        className="w-full p-2 border border-gray-300 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-grape transition w-full"
      >
        {t("login.submit")}
      </button>

      <div className="text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-accent hover:underline"
        >
          {t("login.forgot")}
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
