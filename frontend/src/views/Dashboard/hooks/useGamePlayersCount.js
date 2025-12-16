import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function useGamePlayersCount(gameId, maxPerTeam) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!gameId) return;

    async function fetchPlayers() {
      const res = await API.get(`/players/game/${gameId}`);
      setCount(res.data.count);
    }

    fetchPlayers();
  }, [gameId]);

  return {
    count,
    max: maxPerTeam * 2,
  };
}
