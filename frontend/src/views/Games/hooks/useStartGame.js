import { useState } from "react";
import API from "@/api/axios";

export default function useStartGame(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function startGame(game) {
    try {
      setLoading(true);
      setError(null);

      await API.put(`/games/${game.id}/start`);

      onSuccess?.(); // refetch do jogo
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao iniciar o jogo.");
    } finally {
      setLoading(false);
    }
  }

  return {
    startGame,
    loading,
    error,
  };
}
