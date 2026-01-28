import { useState } from "react";
import API from "@/api/axios";

export default function useJoinGame(gameId, onSuccess) {
  const [loading, setLoading] = useState(false);

  async function join(team = "teamA") {
    try {
      setLoading(true);
      await API.post(`/games/${gameId}/join`, { team });
      onSuccess?.();
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }

  return {
    join,
    loading,
  };
}
