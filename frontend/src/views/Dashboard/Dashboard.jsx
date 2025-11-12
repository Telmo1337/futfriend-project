import { Box, Typography, Grid } from "@mui/material";

//components UI
import { LoadingState } from "@/components/UI"; 

//components
import { StatCard } from "@/views/Dashboard/components";

//hooks
import useDashboardStats from "@/views/Dashboard/hooks/useDashboardStats";

const Dashboard = () => {
  const { stats, loading, error, user } = useDashboardStats();

  //  Estados de carregamento / erro
  if (loading) return <LoadingState message="A carregar estatísticas..." />;
  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  if (!stats)
    return (
      <Typography textAlign="center" mt={4}>
        Sem dados disponíveis
      </Typography>
    );

  //  Conteúdo principal
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Olá, {user?.firstName} 👋
      </Typography>

      <Typography variant="subtitle1" mb={4}>
        Estatísticas gerais
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Vitórias" value={stats.victories ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Derrotas" value={stats.losses ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Empates" value={stats.draws ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Golos" value={stats.goals ?? 0} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
