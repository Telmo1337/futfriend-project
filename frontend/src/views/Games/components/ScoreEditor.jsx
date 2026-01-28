import { Grid, Stack, TextField, Typography, Divider, Paper } from "@mui/material";

export default function ScoreEditor({ players, onGoalsChange }) {
  const teamA = players.filter(p => p.team === "teamA");
  const teamB = players.filter(p => p.team === "teamB");

  const goalsA = teamA.reduce((a, p) => a + (p.goals || 0), 0);
  const goalsB = teamB.reduce((a, p) => a + (p.goals || 0), 0);

  return (
    <Paper sx={{ p: 5, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={600}>
          Resultado atual: {goalsA} - {goalsB}
        </Typography>

        <Divider />

        <Grid container spacing={3}>
          {/* EQUIPA A */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography fontWeight={600}>Equipa A</Typography>

              {teamA.length === 0 && (
                <Typography color="text.secondary">
                  Sem jogadores
                </Typography>
              )}

              {teamA.map(p => (
                <Stack
                  key={p.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Typography sx={{ flexGrow: 1 }}>
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
                    sx={{ width: { xs: "100%", sm: 80 } }}
                  />
                </Stack>
              ))}
            </Stack>
          </Grid>

          {/* EQUIPA B */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography fontWeight={600}>Equipa B</Typography>

              {teamB.length === 0 && (
                <Typography color="text.secondary">
                  Sem jogadores
                </Typography>
              )}

              {teamB.map(p => (
                <Stack
                  key={p.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Typography sx={{ flexGrow: 1 }}>
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
                    sx={{ width: { xs: "100%", sm: 80 } }}
                  />
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
