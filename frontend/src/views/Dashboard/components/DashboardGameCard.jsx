import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


import { gameStateConfig } from "../constants/gameStateConfig";

import useGamePlayersCount from "../hooks/useGamePlayersCount";
import useGamePlayers from "../hooks/useGamePlayers";
import useJoinGame from "../hooks/useJoinGame";
import useAuth from "@/components/auth/hooks/useAuth";
import useLeaveGame from "../hooks/useLeaveGame";


export default function DashboardGameCard({ game }) {

  const navigate = useNavigate();
  
  const { user } = useAuth();

  // jogadores
  const {
    players,
    refetch: refetchPlayers,
  } = useGamePlayers(game.id);

  // contador
  const {
    count,
    max,
    refetch: refetchCount,
  } = useGamePlayersCount(game.id, game.maxPlayersPerTeam);

  // join game
  const { join, loading: joining } = useJoinGame(game.id, () => {
    refetchPlayers();
    refetchCount();
  });

  // leave game
  const { leave, loading: leaving } = useLeaveGame(game.id, () => {
    refetchPlayers();
    refetchCount();
  });

  const state = gameStateConfig[game.state];

  const isUserInGame = players.some(
    (p) => p.user.id === user?.id
  );

  let gameTypeLabel = "5x5";
  if (game.type === "SEVEN_A_SIDE") gameTypeLabel = "7x7";
  if (game.type === "ELEVEN_A_SIDE") gameTypeLabel = "11x11";

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={600}>
            {game.teamA} vs {game.teamB}
          </Typography>

          <Chip
            label={state.label}
            color={state.color}
            size="small"
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
          <b>Jogadores:</b> {count} / {max}
        </Typography>

        {/* AVATARS */}
        {players.length > 0 && (
          <AvatarGroup max={6} sx={{ mt: 1 }}>
            {players.map((p) => (
              <Tooltip key={p.id} title={p.user.nickname}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {p.user.nickname.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}

        {/* ACTIONS */}
        <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" fullWidth  onClick={() => navigate(`/jogos/${game.id}`)}>
            Ver detalhes
          </Button>

          {game.state === "scheduled" && (
            <Button
              variant={isUserInGame ? "outlined" : "contained"}
              color={isUserInGame ? "error" : "primary"}
              size="small"
              fullWidth
              disabled={joining || leaving || (!isUserInGame && count >= max)}
              onClick={() =>
                isUserInGame ? leave() : join("teamA")
              }
            >
              {isUserInGame ? "Sair" : "Entrar"}
            </Button>
          )}

        </Box>
      </Stack>
    </Paper>
  );
}
