import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SidebarTabs } from "@/components/SidebarTabs"; 


import DashboardMainContent from "@/layouts/DashboardMainContent";

const DashboardLayout = () => {
  const [tab, setTab] = useState(() => {
    return parseInt(localStorage.getItem("dashboardTab")) || 0;
  }); 

  useEffect(() => {
    localStorage.setItem("dashboardTab", tab);
  }, [tab]);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar fixa */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          height: "100vh",
          flexShrink: 0, // impede de encolher
          zIndex: 10,
        }}
      >
        <SidebarTabs tab={tab} setTab={setTab} />
      </Box>

      {/* Conteúdo com scroll */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <DashboardMainContent tab={tab} />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
