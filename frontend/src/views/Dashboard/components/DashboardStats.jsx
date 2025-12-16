import { Grid, Skeleton } from "@mui/material";
import useDashboardStats from "../hooks/useDashboardStats";
import StatGauge from "./StatGauge";
import CardBox from "@/components/UI/CardBox";

export default function DashboardStats() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Skeleton height={240} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <CardBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          <StatGauge label="Vitórias" value={stats.victories} max={100} />
        </CardBox>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <CardBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          <StatGauge label="Empates" value={stats.draws} max={100} />
        </CardBox>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <CardBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          <StatGauge label="Derrotas" value={stats.losses} max={100} />
        </CardBox>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <CardBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          <StatGauge label="Golos" value={stats.goals} max={100} />
        </CardBox>
      </Grid>
    </Grid>
  );
}
