import { Stack, TextField, Button } from "@mui/material";

export default function ScoreEditor({
  goalsA,
  goalsB,
  setGoalsA,
  setGoalsB,
  onConfirm,
}) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Golos Equipa A"
        type="number"
        value={goalsA}
        onChange={(e) => setGoalsA(+e.target.value)}
      />

      <TextField
        label="Golos Equipa B"
        type="number"
        value={goalsB}
        onChange={(e) => setGoalsB(+e.target.value)}
      />

      <Button variant="contained" onClick={onConfirm}>
        Confirmar resultado
      </Button>
    </Stack>
  );
}
