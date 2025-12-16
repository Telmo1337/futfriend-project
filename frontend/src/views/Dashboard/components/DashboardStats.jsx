import { Grid, Paper, Typography, Skeleton } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import useDashboardStats from "../hooks/useDashboardStats";

function StatGauge({ label, value, max }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
      <Gauge
        width={120}
        height={120}
        value={value}
        valueMax={max}
        startAngle={-90}
        endAngle={90}
        
      />
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={600}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function DashboardStats() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton height={180} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatGauge label="Vitórias" value={stats.victories} max={30} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatGauge label="Empates" value={stats.draws} max={30} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatGauge label="Derrotas" value={stats.losses} max={30} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatGauge label="Golos" value={stats.goals} max={50} />
      </Grid>
    </Grid>
  );
}
