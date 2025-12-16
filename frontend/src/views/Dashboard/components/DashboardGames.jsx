import { Box, Typography, Skeleton } from "@mui/material";
import useDashboardGames from "../hooks/useDashboardGames";
import DashboardGameCard from "./DashboardGameCard";

export default function DashboardGames() {
  const { games, loading } = useDashboardGames();

  if (loading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={220} />
        ))}
      </Box>
    );
  }

  if (games.length === 0) {
    return (
      <Typography color="text.secondary">
        Não existem jogos agendados ou em andamento.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {games.map((game) => (
        <DashboardGameCard key={game.id} game={game} />
      ))}


      
    </Box>
  );
}
