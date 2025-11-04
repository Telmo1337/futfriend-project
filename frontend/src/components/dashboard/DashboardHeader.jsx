import { Box, Typography } from "@mui/material";

const DashboardHeader = ({ user }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight="bold">
        Olá, {user?.firstName || "Jogador"} 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Bem-vindo de volta ao FutFriend!
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
