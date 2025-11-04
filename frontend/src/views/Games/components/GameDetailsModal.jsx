import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import useGameDetails from "../hooks/useGameDetails";
import useGamePermissions from "../hooks/useGamePermissions";
import usePlayerSearch from "../hooks/usePlayerSearch";
import useGameActions from "../hooks/useGameActions";
import EditGameModal from "./EditGameModal";

import GameInfoSection from "./sections/GameInfoSection";
import PlayerListSection from "./sections/PlayerListSection";
import AddPlayerSection from "./sections/AddPlayerSection";
import GameActionsSection from "./sections/GameActionsSection";
import FinalizeGameModal from "./FinalizeGameModal";

const GameDetailsModal = ({ open, onClose, gameId, user }) => {
  const { game, loading, error, addPlayer, fetchGame } = useGameDetails(gameId);
  const { isOwner } = useGamePermissions(game, user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("teamA");

  const { editGame, deleteGame, finalizeGame } = useGameActions(fetchGame, onClose);
  const [finalizeModalOpen, setFinalizeModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { options, loadingSearch, handleSearch } = usePlayerSearch();

  const handleAddPlayer = async () => {
    if (!email) return alert("Introduz um email válido");
    await addPlayer(email, name, team);
    setEmail("");
    setName("");
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalhes do Jogo</DialogTitle>

      <DialogContent>
        {loading ? (
          <Typography>A carregar...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <GameInfoSection game={game} />

            <PlayerListSection
              playersGame={game.playersGame}
              maxPlayersPerTeam={game.maxPlayersPerTeam}
            />

            {isOwner && (
              <>
                <Divider sx={{ my: 2 }} />

                <AddPlayerSection
                  email={email}
                  name={name}
                  team={team}
                  options={options}
                  loading={loadingSearch}
                  onEmailChange={(value) => {
                    setEmail(value);
                    handleSearch(value);
                  }}
                  onNameChange={setName}
                  onTeamChange={setTeam}
                  onAdd={handleAddPlayer}
                />

                <GameActionsSection
                  isOwner={isOwner}
                  onEdit={() => setEditModalOpen(true)}
                  onDelete={() => deleteGame(game.id)}
                  onFinalize={() => setFinalizeModalOpen(true)}
                />
              </>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>

      <FinalizeGameModal
        open={finalizeModalOpen}
        onClose={() => setFinalizeModalOpen(false)}
        onFinalize={(stats) => finalizeGame(game.id, stats)}
      />
      <EditGameModal
  open={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  game={game}
  onSave={(updates) => editGame(game.id, updates)}
/>

    </Dialog>
  );
};

export default GameDetailsModal;
