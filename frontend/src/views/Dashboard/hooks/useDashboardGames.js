import { useEffect, useState } from "react";
import API from "@/api/axios";
import useAuth from "@/components/auth/hooks/useAuth";

export default function useDashboardGames(filter = "all") {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);

        const res = await API.get("/games");
        const allGames = res.data.games || [];

        // filtros simples (rápidos)
        if (filter !== "mine") {
          const filtered = allGames.filter((g) =>
            filter === "all" ? true : g.state === filter
          );

          setGames(filtered);
          return;
        }

        // FILTRO "OS MEUS JOGOS"
        const mine = [];

        for (const game of allGames) {
          try {
            const details = await API.get(`/games/${game.id}`);
            const g = details.data;

            const isCreator = g.createdById === user?.id;
            const isPlayer = g.playersGame?.some(
              (p) => p.userId === user?.id
            );

            if (isCreator || isPlayer) {
              mine.push(game);
            }
          } catch {
            // ignora falhas individuais
          }
        }

        setGames(mine);
      } catch {
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchGames();
  }, [filter, user]);

  return { games, loading };
}
