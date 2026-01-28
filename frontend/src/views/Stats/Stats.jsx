import { useState } from "react";
import { Stack, Tabs, Tab, Typography } from "@mui/material";

import StatsOverview from "./components/StatsOverview";
import RankingTable from "./components/RankingTable";

export default function Stats() {
  const [tab, setTab] = useState("me");

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" fontWeight={600}>
        Estatísticas
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="As minhas stats" value="me" />
        <Tab label="Ranking geral" value="ranking" />
        <Tab label="Top goleadores" value="goals" />
      </Tabs>

      {tab === "me" && <StatsOverview />}
      {tab === "ranking" && <RankingTable orderBy="victories" />}
      {tab === "goals" && <RankingTable orderBy="goals" />}
    </Stack>
  );
}
