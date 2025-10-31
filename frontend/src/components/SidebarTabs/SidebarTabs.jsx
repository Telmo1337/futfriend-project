import { Box } from "@mui/material";
import SidebarTopTabs from "./SidebarTopTabs";
import SidebarBottomTabs from "./SidebarBottomTabs";


const SidebarTabs = ({ tab, setTab }) => {
  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: 120,
        bgcolor: "background.paper",
        borderRight: 0.5,
        borderColor: "divider",
      }}
    >
    

      <SidebarTopTabs value={tab} onChange={handleChange} />
      <SidebarBottomTabs value={tab} onChange={handleChange} />
    </Box>
  );
};

export default SidebarTabs;
