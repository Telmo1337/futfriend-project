import { useState, useEffect, useCallback } from "react";
import API from "@/api/axios";

/**
 * useAuth
 * Hook central para gerir autenticação e estado do utilizador.
 * Fonte de verdade: localStorage
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Carregar sessão guardada ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setToken(storedToken);

      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // --- Login ---
  const login = useCallback(async (credentials) => {
    const res = await API.post("/auth/login", credentials);
    const { user, token } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    setUser(user);
    setToken(token);
  }, []);

  // --- Logout ---
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete API.defaults.headers.common["Authorization"];

    setUser(null);
    setToken(null);
  }, []);

  // --- ATUALIZAR UTILIZADOR (🔥 O QUE FALTAVA) ---
  const updateUser = useCallback((newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const isAuthenticated = !!token;

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser, // usar após editar perf
  };
}