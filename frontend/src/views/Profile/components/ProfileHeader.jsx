import { Box, Avatar, Typography } from "@mui/material";

const ProfileHeader = ({ user }) => {
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ width: 56, height: 56 }}>{user.name[0]}</Avatar>
      <Box>
        <Typography variant="h6">{user.name}</Typography>
        <Typography color="text.secondary">{user.email}</Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
