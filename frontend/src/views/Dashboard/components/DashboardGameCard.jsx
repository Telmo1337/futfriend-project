import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
} from "@mui/material";

import { gameStateConfig } from "../constants/gameStateConfig";

import useGamePlayersCount from "../hooks/useGamePlayersCount";
import useGamePlayers from "../hooks/useGamePlayers";

export default function DashboardGameCard({ game }) {

  const { count, max } = useGamePlayersCount(
    game.id,
    game.maxPlayersPerTeam
  );


  const state = gameStateConfig[game.state];

  let gameTypeLabel;

  if (game.type === "FIVE_A_SIDE") {
    gameTypeLabel = "5x5";
  } else if (game.type === "SEVEN_A_SIDE") {
    gameTypeLabel = "7x7";
  } else if (game.type === "ELEVEN_A_SIDE") {
    gameTypeLabel = "11x11";
  } else {
    gameTypeLabel = game.type;
  }


  const players = useGamePlayers(game.id);

  return (
    <Paper sx={{
      p: 4,
      borderRadius: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={600}>
            {game.teamA} vs {game.teamB}
          </Typography>

          <Chip
            label={state.label}
            color={state.color}
            size="small"
            sx={{ width: "fit-content" }}
          />
        </Box>

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
          {count !== undefined ? count : "—"} / {max}
        </Typography>

        {players.length > 0 && (
          <AvatarGroup max={6} sx={{ justifyContent: "flex-start", mt: 1 }}>
            {players.map((p) => (
              <Tooltip key={p.id} title={p.user.nickname}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {p.user.nickname.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}


        <Box sx={{ mt: "auto" }}>
          <Button variant="outlined" size="small" fullWidth>
            Ver detalhes
          </Button>
        </Box>
        
      </Stack>
    </Paper>
  );
}
