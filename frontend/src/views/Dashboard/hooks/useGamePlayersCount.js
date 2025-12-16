import { useEffect, useState, useCallback } from "react";
import API from "@/api/axios";

export default function useGamePlayersCount(gameId, maxPerTeam) {
  const [count, setCount] = useState(0);

  const fetchCount = useCallback(async () => {
    if (!gameId) return;

    try {
      const res = await API.get(`/players/game/${gameId}`);
      setCount(res.data.totalParticipants || 0);
    } catch (err) {
      console.error(err);
      setCount(0);
    }
  }, [gameId]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return {
    count,
    max: maxPerTeam * 2,
    refetch: fetchCount,
  };
}
