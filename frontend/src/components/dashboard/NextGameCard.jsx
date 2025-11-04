import { Card, CardContent, Typography, Box } from "@mui/material";

const NextGameCard = ({ nextGame }) => {
  if (!nextGame)
    return (
      <Typography variant="body1" color="text.secondary">
        Nenhum jogo agendado.
      </Typography>
    );

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Próximo Jogo
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography>
            <strong>Equipas:</strong> {nextGame.teamA} vs {nextGame.teamB}
          </Typography>
          <Typography>
            <strong>Local:</strong> {nextGame.location}
          </Typography>
          <Typography>
            <strong>Data:</strong>{" "}
            {new Date(nextGame.date).toLocaleString("pt-PT")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NextGameCard;
