import { Box, Typography, Divider } from "@mui/material";
import DashboardStats from "./components/DashboardStats";
import DashboardGames from "./components/DashboardGames";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        O meu painel
      </Typography>

      <DashboardStats />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" mb={2}>
        Jogos disponíveis
      </Typography>

      <DashboardGames />
    </Box>
  );
}
