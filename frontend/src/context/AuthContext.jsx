import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur si token présent
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const me = await authService.getMe(token);
        setUser(me);
      } catch (err) {
        console.warn("getMe a échoué :", err);
        // On ne supprime pas le token automatiquement
      }

      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Connexion
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        loading,
        handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

