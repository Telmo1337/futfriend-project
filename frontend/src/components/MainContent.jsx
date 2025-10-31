/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import Dashboard from "../pages/Dashboard";
import Games from "../views/Games";
import Profile from "../views/Profile";
import Notifications from "../views/Notifications";
import Help from "../views/Help";
import Settings from "../views/Settings";
import Logout from "../views/Logout";

//animações
import { motion } from "framer-motion";

const MainContent = ({ tab }) => {
  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}

    >
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>

        {tab === 0 && <Dashboard />}
        {tab === 1 && <Games />}
        {tab === 2 && <Profile />}
        {tab === 3 && <Notifications />}
        {tab === 4 && <Help />}
        {tab === 5 && <Settings />}
        {tab === 6 && <Logout />}
      </Box>
    </motion.div>
  );
};

export default MainContent;


