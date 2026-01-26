import { useEffect, useState } from "react";
import { Paper, Stack, Typography, Grid } from "@mui/material";
import API from "@/api/axios";

function StatCard({ label, value }) {
  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 3,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={1}
    >
      <Stack spacing={0.5} alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: 12 }}
        >
          {label}
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}


export default function StatsOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/users/me/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <Stack spacing={2}>
      <Typography fontWeight={600}>
        As minhas estatísticas
      </Typography>

      <Grid container spacing={2} textAlign={'center'}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Golos" value={stats.goals} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Vitórias" value={stats.victories} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Empates" value={stats.draws} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Derrotas" value={stats.losses} />
        </Grid>
      </Grid>
    </Stack>
  );
}
