import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";

export const NAVIGATION = [
  {
    kind: "header",
    title: "O meu painel",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "games",
    title: "Games",
    icon: <SportsSoccerIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "help",
    title: "Help",
    icon: <HelpOutlineIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];
