import API from "@/api/axios";

export default function useFinishGame(gameId, onSuccess) {
  async function finishGame(players) {
    // guardar golos dos jogadores
    await API.put(`/games/${gameId}`, {
      playersGoals: players.map(p => ({
        playerGameId: p.id,
        goals: p.goals ?? 0,
      })),
    });

    // finalizar jogo (stats automáticas)
    await API.put(`/games/${gameId}/finish`);

    onSuccess?.();
  }

  return { finishGame };
}
