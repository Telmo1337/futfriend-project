import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import SidebarTabs from "../components/SidebarTabs/SidebarTabs";
import MainContent from "../components/MainContent";

const DashboardLayout = () => {

  
  const [tab, setTab] = useState(() => {
    return parseInt(localStorage.getItem("dashboardTab")) || 0;
  }); 


  useEffect(() => {
    localStorage.setItem("dashboardTab", tab);
  }, [tab]);



  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      <SidebarTabs tab={tab} setTab={setTab} />
      <MainContent tab={tab} />
    </Box>
  );
};

export default DashboardLayout;
