import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";

export const NAVIGATION = [
  {
    kind: "header",
    title: "O meu painel",
  },
  {
    segment: "painel",
    title: "O meu Painel",
    icon: <DashboardIcon />,
  },
  {
    segment: "jogos",
    title: "Jogos",
    icon: <SportsSoccerIcon />,
  },
  {
    segment: "estatisticas",
    title: "Estatísticas",
    icon: <LeaderboardIcon />,
  },
  {
    segment: "perfil",
    title: "Perfil",
    icon: <PersonIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "ajuda",
    title: "Ajuda",
    icon: <HelpOutlineIcon />,
  },
  {
    segment: "definicoes",
    title: "Definições",
    icon: <SettingsIcon />,
  },
];
