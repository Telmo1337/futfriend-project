import { Grid, Skeleton, Typography, Box } from "@mui/material";
import useDashboardGames from "../hooks/useDashboardGames";
import DashboardGameCard from "./DashboardGameCard";

export default function DashboardGames() {
  const { games, loading } = useDashboardGames();

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton height={220} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (games.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography color="text.secondary">
          Não existem jogos agendados ou em andamento.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {games.map((game) => (
        <Grid item xs={12} md={4} key={game.id}>
          <DashboardGameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
}
