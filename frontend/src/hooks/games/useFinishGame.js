import { useState } from "react";
import API from "@/api/axios";

export default function useFinishGame(gameId, onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function finishGame(players) {
    try {
      setLoading(true);
      setError(null);

      // guardar golos dos jogadores
      await API.put(`/games/${gameId}`, {
        playersGoals: players.map((p) => ({
          playerGameId: p.id,
          goals: p.goals ?? 0,
        })),
      });

      // finalizar jogo (stats automáticas)
      await API.put(`/games/${gameId}/finish`);

      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao terminar o jogo.");
    } finally {
      setLoading(false);
    }
  }

  return { finishGame, loading, error };
}
