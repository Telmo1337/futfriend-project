import { useEffect, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import API from "@/api/axios";

export default function StatsOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/users/me/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography fontWeight={600}>As minhas estatísticas</Typography>
        <Typography>Golos: {stats.goals}</Typography>
        <Typography>Vitórias: {stats.victories}</Typography>
        <Typography>Empates: {stats.draws}</Typography>
        <Typography>Derrotas: {stats.losses}</Typography>
      </Stack>
    </Paper>
  );
}
