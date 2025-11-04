import { useEffect, useState, useCallback } from "react";
import API from "../../../api/axios";

export default function useGameDetails(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGame = useCallback(async () => {
    if (!gameId) return;
    try {
      setLoading(true);
      const res = await API.get(`/games/${gameId}`);
      setGame(res.data);
    } catch (err) {
      console.error(" Erro ao carregar jogo:", err);
      setError(err.response?.data?.error || "Erro ao carregar jogo.");
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  const addPlayer = async (email, name, team) => {
    try {
      console.log(" A adicionar jogador:", { gameId, email, name, team });
      const res = await API.post(`/games/${gameId}/players`, { email, name, team });
      console.log("Jogador adicionado:", res.data);
      await fetchGame(); // atualiza lista após adicionar
      return res.data;
    } catch (err) {
      console.error(" Erro ao adicionar jogador:", err.response?.data || err);
      alert(err.response?.data?.error || "Erro ao adicionar jogador.");
      throw err;
    }
  };

  return { game, loading, error, addPlayer, fetchGame };

}
