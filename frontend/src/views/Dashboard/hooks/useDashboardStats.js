import { useEffect, useState } from "react";
import API from "../../../api/axios";
import useAuth from "../../../components/auth/hooks/useAuth";

/**
 * Hook para obter estatísticas do utilizador autenticado
 * (vitórias, derrotas, empates, jogos criados, golos, etc.)
 */
export default function useDashboardStats() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // só executa se houver sessão válida

    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await API.get("/users/me/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
        setError(err.response?.data?.error || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return { stats, loading, error, user };
}
