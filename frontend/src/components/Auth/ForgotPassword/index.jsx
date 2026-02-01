import { useState } from "react";
import { useTranslation } from "react-i18next";

const API_URL = "https://elixir-backend-gp9f.onrender.com/api";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage(t("forgot.success"));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-muted rounded-md space-y-4"
    >
      <h2 className="text-xl font-bold">{t("forgot.title")}</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="email"
        placeholder={t("forgot.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <button className="w-full bg-accent text-white p-2 rounded-md hover:bg-grape transition">
        {t("forgot.submit")}
      </button>
    </form>
  );
};

export default ForgotPassword;
