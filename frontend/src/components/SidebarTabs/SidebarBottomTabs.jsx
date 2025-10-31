import { Tabs, Tab } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarBottomTabs = ({ value, onChange }) => {
  return (
    <Tabs
      variant="sidebar"
      orientation="vertical"
      value={value}
      onChange={onChange}
      aria-label="bottom navigation"
    >
      <Tab sx={{p: 3}} variant="sidebar" icon={<HelpOutlineIcon />} value={4} aria-label="Help" />
      <Tab sx={{p: 3}} variant="sidebar" icon={<SettingsIcon />} value={5} aria-label="Settings" />
      <Tab sx={{p: 3}} variant="sidebar" icon={<LogoutIcon />} value={6} aria-label="Logout" />
    </Tabs>
  );
};

export default SidebarBottomTabs;
