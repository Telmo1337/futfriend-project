import { Tabs, Tab, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

import FF from "../../assets/FF.png";

const SidebarTopTabs = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
    >
      <Box
        component="img"
        src={FF}
        alt="Logo FutFriend"
        sx={{
          width: 100,
          height: 100,
          pointerEvents: "none",
        }}
      />

      <Tabs
        variant="sidebar"
        orientation="vertical"
        value={value}
        onChange={onChange}
        aria-label="top navigation"
        sx={{ width: "100%" }}
      >
        <Tab sx={{p: 3}} variant="sidebar" icon={<HomeIcon />} value={0} aria-label="Dashboard" />
        <Tab sx={{p: 3}} variant="sidebar" icon={<SportsSoccerIcon />} value={1} aria-label="Games" />
        <Tab sx={{p: 3}} variant="sidebar" icon={<PersonIcon />} value={2} aria-label="Profile" />
        <Tab sx={{p: 3}} variant="sidebar" icon={<NotificationsIcon />} value={3} aria-label="Notifications" />
      </Tabs>
    </Box>
  );
};

export default SidebarTopTabs;
