import { useState } from "react";
import { signup } from "../../../../../backend/src/app/services/authService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      validatePasswordStrength(value);
      setPasswordMatch(value === form.confirmPassword);
    }

    if (id === "confirmPassword") {
      setPasswordMatch(value === form.password);
    }
  };

  const validatePasswordStrength = (pwd) => {
    if (pwd.length < 12) return setPasswordStrength(t("signup.password.tooShort"));
    if (!/[A-Z]/.test(pwd)) return setPasswordStrength(t("signup.password.needUpper"));
    if (!/[a-z]/.test(pwd)) return setPasswordStrength(t("signup.password.needLower"));
    if (!/[0-9]/.test(pwd)) return setPasswordStrength(t("signup.password.needNumber"));
    if (!/[^A-Za-z0-9]/.test(pwd)) return setPasswordStrength(t("signup.password.needSymbol"));

    setPasswordStrength(t("signup.password.strong"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passwordMatch) {
      return setError(t("signup.password.noMatch"));
    }

    try {
      await signup({
        email: form.email,
        username: form.username,
        password: form.password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-accent/10 rounded-md max-w-md mx-auto mt-10"
    >
      {error && <p className="text-red-600">{error}</p>}
      {success && (
        <p className="text-green-600 font-semibold">
          {t("signup.success")}
        </p>
      )}

      <input
        id="username"
        type="text"
        placeholder={t("signup.username")}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />

      <input
        id="email"
        type="email"
        placeholder={t("signup.email")}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />

      <div>
        <input
          id="password"
          type="password"
          placeholder={t("signup.password.label")}
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />

        {form.password.length > 0 && (
          <p
            className={`text-sm mt-1 ${
              passwordStrength === t("signup.password.strong")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {t("signup.password.strength")} {passwordStrength}
          </p>
        )}
      </div>

      <div>
        <input
          id="confirmPassword"
          type="password"
          placeholder={t("signup.password.confirm")}
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />

        {!passwordMatch && (
          <p className="text-red-600 text-sm mt-1">
            {t("signup.password.noMatch")}
          </p>
        )}
      </div>

      <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-grape transition w-full">
        {t("signup.submit")}
      </button>
    </form>
  );
};

export default SignupForm;
