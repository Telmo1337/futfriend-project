import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function useGamePlayers(gameId) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!gameId) return;

    async function fetchPlayers() {
      const res = await API.get(`/players/game/${gameId}/players`);

      
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.players;

      setPlayers(data || []);
    }

    fetchPlayers();
  }, [gameId]);

  return players;
}
