import { Grid } from "@mui/material";
import GameCard from "./GameCard";

const GameList = ({ games, onGameClick }) => (
  <Grid container spacing={2}>
    {games.map((game) => (
      <Grid item xs={12} sm={6} md={4} key={game.id}>
        <GameCard game={game} onClick={() => onGameClick(game.id)} />
      </Grid>
    ))}
  </Grid>
);

export default GameList;
