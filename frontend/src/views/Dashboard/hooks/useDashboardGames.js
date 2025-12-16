import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function useDashboardGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await API.get("/games?page=1&limit=5");
        setGames(res.data.games || []);
      } catch (err) {
        console.error(err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const activeGames = games.filter(
    (g) => g.state !== "finished"
  );

  return {
    games: activeGames,
    loading,
    hasFinishedGames: games.some((g) => g.state === "finished"),
  };
}
