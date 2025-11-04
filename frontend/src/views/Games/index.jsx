import { Box, Typography, CircularProgress, Button } from "@mui/material";
import useGames from "./hooks/useGames";
import GameList from "./components/GameList";
import CreateGameModal from "./components/CreateGameModal";
import GameDetailsModal from "./components/GameDetailsModal";
import { useState } from "react";

const Games = () => {
  const { games, loading, error, setGames } = useGames();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleGameCreated = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
    setOpenDetails(true);
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Jogos</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenCreate(true)}
          sx={{ textTransform: "none" }}
        >
          + Criar Jogo
        </Button>
      </Box>

      <GameList games={games} onGameClick={handleGameClick} />

      <CreateGameModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onGameCreated={handleGameCreated}
      />

      <GameDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        gameId={selectedGameId}
      />
    </Box>
  );
};

export default Games;
