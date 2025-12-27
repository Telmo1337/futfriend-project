
import API from "@/api/axios";

export default function useFinishGame(gameId, onSuccess) {
  async function finishGame(goalsA, goalsB) {
    await API.put(`/games/${gameId}/finish`, {
      goalsA,
      goalsB,
    });
    onSuccess?.();
  }

  return { finishGame };
}
