import { useState } from "react";
import GameDetailsModal from "./GameDetailsModal";

const GameCard = ({ game }) => {
  const [open, setOpen] = useState(false);

  //  busca o utilizador autenticado
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <h3>{game.teamA} vs {game.teamB}</h3>
      </div>

      {/* passa o user para o modal */}
      <GameDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        gameId={game.id}
        user={user}
      />
    </>
  );
};

export default GameCard;
