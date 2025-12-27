import { Box, Typography, Skeleton } from "@mui/material";
import useDashboardGames from "../hooks/useDashboardGames";
import DashboardGameCard from "./DashboardGameCard";

export default function DashboardGames({ filter }) {
  const { games, loading } = useDashboardGames(filter);

  if (loading) {
    return (
      <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={3}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={220} />
        ))}
      </Box>
    );
  }

  if (!games.length) {
    return (
      <Typography color="text.secondary">
        Não existem jogos para este filtro.
      </Typography>
    );
  }

  return (
    <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={3}>
      {games.map((game) => (
        <DashboardGameCard key={game.id} game={game} />
      ))}
    </Box>
  );
}
