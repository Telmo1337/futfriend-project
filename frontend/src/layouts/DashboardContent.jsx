/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { motion } from "framer-motion";

// importar views centralizadas
import { Games, Profile, Notifications, Help, Settings } from "../views";
import Dashboard from "../pages/Dashboard";

const viewMap = {
  0: <Dashboard />,
  1: <Games />,
  2: <Profile />,
  3: <Notifications />,
  4: <Help />,
  5: <Settings />,
};

const MainContent = ({ tab }) => {
  const CurrentView = viewMap[tab] || <Dashboard />;

  return (
    <motion.div
      key={tab} // reinicia animação quando muda de aba
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
        {CurrentView}
      </Box>
    </motion.div>
  );
};

export default MainContent;
