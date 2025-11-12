import { Tabs, Tab } from "@mui/material";

// Icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";




import { useNavigate } from "react-router-dom";

const SidebarBottomTabs = ({ value, onChange }) => {

  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    if(newValue === 6) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", {replace: true});
    } else {
      onChange(_, newValue);
    }
  }

  return (
    <Tabs
      variant="sidebar"
      orientation="vertical"
      value={value >= 4 && value <= 5 ? value : false}
      onChange={handleTabChange}
      aria-label="bottom navigation"
    >
      <Tab sx={{p: 3}} variant="sidebar" icon={<HelpOutlineIcon />} value={4} aria-label="Help" />
      <Tab sx={{p: 3}} variant="sidebar" icon={<SettingsIcon />} value={5} aria-label="Settings" />
      <Tab sx={{p: 3}} variant="sidebar" icon={<LogoutIcon />} value={6} aria-label="Logout" />
    </Tabs>
  );
};

export default SidebarBottomTabs;
