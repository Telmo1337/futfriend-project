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
        boxShadow: 1,
      }}
    >
       <SidebarTopTabs
        value={tab >= 0 && tab <= 3 ? tab : false}
        onChange={handleChange}
      />

      {/* Tabs de baixo — só recebe valores de 4 a 6 */}
      <SidebarBottomTabs
        value={tab >= 4 && tab <= 6 ? tab : false}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SidebarTabs;
