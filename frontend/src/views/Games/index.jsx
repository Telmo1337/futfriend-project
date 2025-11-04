import BaseView from "../BaseView";
import GameCard from "./components/GameCard";
import useGames from "./hooks/useGames";

const Games = () => {
  const { games, loading, error } = useGames();

  return (
    <BaseView title="Jogos" loading={loading} error={error}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </BaseView>
  );
};

export default Games;
