import { Stack, TextField, Typography, Divider } from "@mui/material";

export default function ScoreEditor({ players, onGoalsChange }) {
  const teamA = players.filter(p => p.team === "teamA");
  const teamB = players.filter(p => p.team === "teamB");

  const goalsA = teamA.reduce((a, p) => a + (p.goals || 0), 0);
  const goalsB = teamB.reduce((a, p) => a + (p.goals || 0), 0);

  return (
    <Stack spacing={2}>
      <Typography fontWeight={600}>
        Resultado atual: {goalsA} - {goalsB}
      </Typography>

      <Divider />

      <Typography fontWeight={600}>Equipa A</Typography>
      {teamA.map(p => (
        <Stack key={p.id} direction="row" spacing={2} alignItems="center">
          <Typography sx={{ minWidth: 120 }}>
            {p.user.nickname}
          </Typography>

          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0 }}
            value={p.goals ?? 0}
            onChange={(e) =>
              onGoalsChange(p.id, Number(e.target.value))
            }
          />
        </Stack>
      ))}

      <Divider />

      <Typography fontWeight={600}>Equipa B</Typography>
      {teamB.map(p => (
        <Stack key={p.id} direction="row" spacing={2} alignItems="center">
          <Typography sx={{ minWidth: 120 }}>
            {p.user.nickname}
          </Typography>

          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0 }}
            value={p.goals ?? 0}
            onChange={(e) =>
              onGoalsChange(p.id, Number(e.target.value))
            }
          />
        </Stack>
      ))}
    </Stack>
  );
}
