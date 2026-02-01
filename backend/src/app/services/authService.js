const API_URL = "https://elixir-backend-gp9f.onrender.com";

export async function signup(userData) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Erreur lors de l'inscription");
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Identifiants incorrects");
  return res.json();
}

export async function getMe(token) {
  
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Non authentifié");
  return res.json();
}

export default {
  signup,
  login,
  getMe,
};
