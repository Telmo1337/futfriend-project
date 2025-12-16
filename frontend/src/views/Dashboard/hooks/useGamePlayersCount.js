import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function useGamePlayersCount(gameId, maxPerTeam) {
  const [count, setCount] = useState();

  useEffect(() => {
    if (!gameId) return;

    async function fetchPlayers() {
      const res = await API.get(`/players/game/${gameId}`);
       //console.log( res.data);
      setCount(res.data.totalParticipants ?? 0);
    }

    fetchPlayers();
  }, [gameId]);

  return {
    count,
    max: maxPerTeam * 2,
  };
}
