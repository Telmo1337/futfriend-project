import { useParams } from "react-router-dom";
import { Alert, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import useAuth from "@/components/auth/hooks/useAuth";
import { LoadingState } from "@/components/UI";
import useGame from "@/hooks/games/useGame";
import useGamePlayers from "@/hooks/games/useGamePlayers";
import useJoinGame from "@/hooks/games/useJoinGame";
import useLeaveGame from "@/hooks/games/useLeaveGame";
import useStartGame from "@/hooks/games/useStartGame";
import useFinishGame from "@/hooks/games/useFinishGame";

import GameInfoCard from "./components/GameInfoCard";
import TeamColumn from "./components/TeamColumn";
import AdminActions from "./components/AdminActions";
import GameTimeline from "./components/GameTimeline";

export default function GameLobby() {
  const { id } = useParams();
  const { user } = useAuth();

  const [playersWithGoals, setPlayersWithGoals] = useState([]);

  const {
    game,
    loading: isLoading,
    error,
    refetch: refetchGame,
  } = useGame(id);

  // 🔹 Jogadores
  const { players, refetch } = useGamePlayers(id);

  //  Inicializar jogadores editáveis (com golos)
  useEffect(() => {
    if (players.length) {
      setPlayersWithGoals(players);
    } else {
      setPlayersWithGoals([]);
    }
  }, [players]);

  const { join } = useJoinGame(id, refetch);
  const { leave } = useLeaveGame(id, refetch);

  const { startGame } = useStartGame(refetchGame);
  const { finishGame } = useFinishGame(id, refetchGame);

  if (isLoading) return <LoadingState />;
  if (error) {
    return (
      <Stack sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }
  if (!game) return null;

  const isAdmin = game.createdById === user?.id;
  const isLocked = game.state !== "scheduled";

  const teamA = players.filter((p) => p.team === "teamA");
  const teamB = players.filter((p) => p.team === "teamB");

  const userEntry = players.find((p) => p.user?.id === user?.id);
  const userTeam = userEntry?.team;

  // 🔹 Alterar golos localmente
  function handleGoalsChange(playerGameId, goals) {
    setPlayersWithGoals((prev) =>
      prev.map((p) =>
        p.id === playerGameId ? { ...p, goals } : p
      )
    );
  }

  return (
    <Stack
      spacing={4}
      sx={{
        px: { xs: 2, md: 3 },
        p: 4,
        maxWidth: 1200,
        
      
      }}
    >
      <GameInfoCard game={game} />
      <GameTimeline state={game.state} />

      {isAdmin && (
        <AdminActions
          state={game.state}
          players={playersWithGoals}
          onGoalsChange={handleGoalsChange}
          onStart={() => startGame(game)}
          onFinish={() => finishGame(playersWithGoals)}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TeamColumn
            title={`Equipa A (${teamA.length}/${game.maxPlayersPerTeam})`}
            team="teamA"
            players={teamA}
            adminId={game.createdById}
            isUserHere={userTeam === "teamA"}
            canJoin={teamA.length < game.maxPlayersPerTeam}
            disabled={isLocked}
            onJoin={join}
            onLeave={leave}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TeamColumn
            title={`Equipa B (${teamB.length}/${game.maxPlayersPerTeam})`}
            team="teamB"
            players={teamB}
            adminId={game.createdById}
            isUserHere={userTeam === "teamB"}
            canJoin={teamB.length < game.maxPlayersPerTeam}
            disabled={isLocked}
            onJoin={join}
            onLeave={leave}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
