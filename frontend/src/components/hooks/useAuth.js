import { useState, useEffect, useCallback } from "react";
import API from "../../api/axios";


/**
 * useAuth
 * Hook central para gerir autenticação e estado do utilizador.
 * Permite: login, logout, acesso ao utilizador e ao token.
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Carregar sessão guardada no localStorage ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // --- Função de login ---
  const login = useCallback(async (credentials) => {
    const res = await API.post("/auth/login", credentials);

    const { user, token } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
    setToken(token);
  }, []);

  // --- Função de logout ---
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];

    setUser(null);
    setToken(null);
  }, []);

  // --- Estado de autenticação ---
  const isAuthenticated = !!token;

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
  };
}
