import { Paper, Stack, Typography, Chip, Divider, Grid } from "@mui/material";
import { gameStateUI } from "../constants/gameStateUI";

export default function GameInfoCard({ game }) {
  const state = gameStateUI[game.state];

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {game.teamA} vs {game.teamB}
          </Typography>

          <Chip label={state.label} color={state.color} />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {state.description}
        </Typography>

        <Divider />

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2"><b>Data</b></Typography>
            <Typography variant="body2">
              {new Date(game.date).toLocaleDateString("pt-PT")}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="body2"><b>Hora</b></Typography>
            <Typography variant="body2">
              {new Date(game.date).toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="body2"><b>Local</b></Typography>
            <Typography variant="body2">{game.location}</Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="body2"><b>Tipo</b></Typography>
            <Typography variant="body2">
              {game.type.replaceAll("_", " ")}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
