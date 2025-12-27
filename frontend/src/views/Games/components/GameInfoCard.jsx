import { Paper, Stack, Typography, Chip, Divider } from "@mui/material";
import { gameStateUI } from "../constants/gameStateUI";

export default function GameInfoCard({ game }) {
  const state = gameStateUI[game.state];

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {game.teamA} vs {game.teamB}
          </Typography>

          <Chip
            label={state.label}
            color={state.color}
            sx={{ fontWeight: 500 }}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {state.description}
        </Typography>

        <Divider />

        <Typography variant="body2">
          <b>Data:</b>{" "}
          {new Date(game.date).toLocaleDateString("pt-PT")}
        </Typography>

        <Typography variant="body2">
          <b>Hora:</b>{" "}
          {new Date(game.date).toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>

        <Typography variant="body2">
          <b>Local:</b> {game.location}
        </Typography>

        <Typography variant="body2">
          <b>Tipo:</b> {game.type.replaceAll("_", " ")}
        </Typography>

        {game.state === "finished" && (
          <Typography fontWeight={600}>
            Resultado final: {game.goalsA} - {game.goalsB}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
