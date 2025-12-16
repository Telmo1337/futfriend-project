import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get("/users/me/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Erro ao carregar stats", err);
        setStats({
          goals: 0,
          victories: 0,
          draws: 0,
          losses: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
