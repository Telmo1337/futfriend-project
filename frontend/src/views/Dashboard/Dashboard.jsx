import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import DashboardStats from "./components/DashboardStats";
import DashboardGames from "./components/DashboardGames";
import CreateGameModal from "./components/CreateGameModal";

export default function Dashboard() {

  const [openCreate, setOpenCreate] = useState(false);

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
        gap: 3,

      }}>
        {/* STATS */}
        <DashboardStats />

        {/* JOGOS */}
        <Box>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}>
            <Typography variant="h6" mb={2}>
              Jogos disponíveis
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreate(true)}
            >
              Criar jogo
            </Button>
          </Box>
          <DashboardGames />

          <CreateGameModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
          />
        </Box>

      </Box>
    </Box>
  );
}
