import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import API from "@/api/axios";

import useAuth from "@/components/auth/hooks/useAuth";
import useGamePlayers from "../Dashboard/hooks/useGamePlayers";
import useJoinGame from "../Dashboard/hooks/useJoinGame";
import useLeaveGame from "../Dashboard/hooks/useLeaveGame";
import useStartGame from "./hooks/useStartGame";
import useFinishGame from "./hooks/useFinishGame";

import GameInfoCard from "./components/GameInfoCard";
import TeamColumn from "./components/TeamColumn";
import AdminActions from "./components/AdminActions";
import GameTimeline from "./components/GameTimeline";


export default function GameLobby() {
  const { id } = useParams();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [goalsA, setGoalsA] = useState(0);
  const [goalsB, setGoalsB] = useState(0);

  const fetchGame = () =>
    API.get(`/games/${id}`).then((res) => setGame(res.data));

  useEffect(() => {
    fetchGame();
  }, [id]);

  const { players, refetch } = useGamePlayers(id);
  const { join } = useJoinGame(id, refetch);
  const { leave } = useLeaveGame(id, refetch);

  const { startGame } = useStartGame(fetchGame);
  const { finishGame } = useFinishGame(id, fetchGame);

  if (!game) return null;

  const isAdmin = game.createdById === user?.id;
  const isLocked = game.state !== "scheduled";

  const teamA = players.filter((p) => p.team === "teamA");
  const teamB = players.filter((p) => p.team === "teamB");

  const userEntry = players.find((p) => p.user.id === user?.id);
  const userTeam = userEntry?.team;

  return (
    <Stack spacing={4}>
      <GameInfoCard game={game} />
      <GameTimeline state={game.state} />
      {isAdmin && (
        <AdminActions
          state={game.state}
          onStart={() => startGame(game)} 
          onFinish={() => finishGame(goalsA, goalsB)}
          goalsA={goalsA}
          goalsB={goalsB}
          setGoalsA={setGoalsA}
          setGoalsB={setGoalsB}
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
