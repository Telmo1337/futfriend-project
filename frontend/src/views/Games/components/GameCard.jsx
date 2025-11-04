import { Card, CardContent, Typography } from "@mui/material";

const GameCard = ({ game }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{game.name}</Typography>
      <Typography color="text.secondary">Data: {game.date}</Typography>
      <Typography>Local: {game.location}</Typography>
    </CardContent>
  </Card>
);

export default GameCard;
