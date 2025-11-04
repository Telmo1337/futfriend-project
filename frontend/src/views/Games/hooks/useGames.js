import { useEffect, useState, useCallback } from "react";
import API from "../../../api/axios";

export default function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/games");
      setGames(res.data);
    } catch (err) {
      console.error("Erro ao carregar jogos:", err);
      setError(err.response?.data?.error || "Erro ao carregar jogos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, error, fetchGames, setGames };
}
