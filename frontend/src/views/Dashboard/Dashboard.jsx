import { Box, Typography, Button, IconButton, Tooltip, useTheme, useMediaQuery, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import DashboardStats from "./components/DashboardStats";
import DashboardGames from "./components/DashboardGames";
import CreateGameModal from "./components/CreateGameModal";

export default function Dashboard() {

  const [openCreate, setOpenCreate] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
     <Box sx={{ p: { xs: 2, md: 5 } }}>
      <Typography variant="h5" fontWeight={600}>
        O meu painel
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* STATS */}
        <DashboardStats />

        {/* JOGOS */}
        <Box>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h6">
              Jogos disponíveis
            </Typography>

            {isMobile ? (
              <Tooltip title="Criar jogo">
                <IconButton
                  color="primary"
                  onClick={() => setOpenCreate(true)}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreate(true)}
              >
                Criar jogo
              </Button>
            )}
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
