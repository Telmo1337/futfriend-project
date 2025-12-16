import { useEffect, useState, useCallback } from "react";
import API from "@/api/axios";

export default function useGamePlayers(gameId) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = useCallback(async () => {
    if (!gameId) return;

    try {
      const res = await API.get(`/players/game/${gameId}/players`);
      setPlayers(res.data || []);
    } catch (err) {
      console.error(err);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return {
    players,
    loading,
    refetch: fetchPlayers,
  };
}
