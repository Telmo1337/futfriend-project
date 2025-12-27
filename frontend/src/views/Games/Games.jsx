import { useState } from "react";
import { Stack, Tabs, Tab, Button } from "@mui/material";

import DashboardGames from "../Dashboard/components/DashboardGames";
import CreateGameModal from "../Dashboard/components/CreateGameModal";

export default function Games() {
  const [tab, setTab] = useState("all");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <h2>Jogos</h2>
          <p>Organiza e participa em jogos de futebol</p>
        </Stack>

        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          + Criar jogo
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
