import {
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { gameStateConfig } from "../constants/gameStateConfig";

export default function DashboardGameCard({ game }) {
  const state = gameStateConfig[game.state];

  let gameTypeLabel;

  if (game.type === "FIVE_A_SIDE") {
    gameTypeLabel = "Cinco contra Cinco";
  } else if (game.type === "SEVEN_A_SIDE") {
    gameTypeLabel = "Sete contra Sete";
  } else if (game.type === "ELEVEN_A_SIDE") {
    gameTypeLabel = "Onze contra Onze";
  } else {
    gameTypeLabel = game.type;
  }


  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography fontWeight={600}>
          {game.teamA} vs {game.teamB}
        </Typography>

        <Chip
          label={state.label}
          color={state.color}
          size="small"
          sx={{ width: "fit-content" }}
        />

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
          <b>Tipo:</b> {gameTypeLabel}
        </Typography>

        <Typography variant="body2">
          <b>Jogadores:</b>{" "}
          {(game.teamAPlayers + game.teamBPlayers)} / {game.maxPlayersPerTeam * 2}
        </Typography>



        <Button variant="outlined" size="small">
          Ver detalhes
        </Button>
      </Stack>
    </Paper>
  );
}
