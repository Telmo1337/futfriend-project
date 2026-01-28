import { useState } from "react";
import { Stack, Tabs, Tab, Button, Typography } from "@mui/material";

import DashboardGames from "../Dashboard/components/DashboardGames";
import CreateGameModal from "../Dashboard/components/CreateGameModal";

export default function Games() {
  const [tab, setTab] = useState("all");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Stack>

          <Typography variant="h5" fontWeight={600}>
              Jogos disponíveis
            </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => setOpenCreate(true)}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          + Criar jogo
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Todos os Jogos" value="all" />
        <Tab label="Agendados" value="scheduled" />
        <Tab label="Em andamento" value="ongoing" />
        <Tab label="Terminados" value="finished" />
        <Tab label="Os meus jogos" value="mine" />
      </Tabs>

      {/* Games list */}
      <DashboardGames filter={tab} />

      <CreateGameModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </Stack>
  );
}
