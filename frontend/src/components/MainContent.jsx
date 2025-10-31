import { Box, Typography } from "@mui/material";
import Dashboard from "../pages/Dashboard";
import Games from "../pages/Games";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Help from "../pages/Help";
import Settings from "../pages/Settings";
import Logout from "../pages/Logout";

const MainContent = ({ tab }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
      {tab === 0 && <Dashboard />}
      {tab === 1 && <Games />}
      {tab === 2 && <Profile />}
      {tab === 3 && <Notifications />}
      {tab === 4 && <Help />}
      {tab === 5 && <Settings />}
      {tab === 6 && <Logout />}
    </Box>
  );
};

export default MainContent;
