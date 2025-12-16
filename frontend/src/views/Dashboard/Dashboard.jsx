import { Box, Typography } from "@mui/material";
import DashboardStats from "./components/DashboardStats";
import DashboardGames from "./components/DashboardGames";

export default function Dashboard() {
  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        O meu painel
      </Typography>

      <Box sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 6,

      }}>
        {/* STATS */}
        <DashboardStats />

        {/* JOGOS */}
        <Box>
          <Typography variant="h6" mb={2}>
            Jogos disponíveis
          </Typography>
          <DashboardGames />
        </Box>

      </Box>
    </Box>
  );
}
