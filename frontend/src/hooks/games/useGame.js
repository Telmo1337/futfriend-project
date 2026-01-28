import { useCallback, useEffect, useState } from "react";
import API from "@/api/axios";

export default function useGame(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGame = useCallback(async () => {
    if (!gameId) return;

    try {
      setLoading(true);
      setError(null);
      const res = await API.get(`/games/${gameId}`);
      setGame(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar o jogo.");
      setGame(null);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return {
    game,
    loading,
    error,
    refetch: fetchGame,
  };
}
