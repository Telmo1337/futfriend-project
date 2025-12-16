import { useState } from "react";
import API from "@/api/axios";

export default function useLeaveGame(gameId, onSuccess) {
  const [loading, setLoading] = useState(false);

  async function leave() {
    try {
      setLoading(true);
      await API.delete(`/players/game/${gameId}/leave`);
      onSuccess?.();
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }

  return { leave, loading };
}
