import {
  Paper,
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
  Chip,
} from "@mui/material";

const roleConfig = {
  ADMIN: { label: "ADMIN", color: "primary" },
  USER: { label: "MEMBRO", color: "default" },
};

export default function ProfileView({ data, onEdit }) {
  const role = roleConfig[data.role] || roleConfig.USER;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ width: 72, height: 72 }}>
            {data.nickname.charAt(0).toUpperCase()}
          </Avatar>

          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                {data.nickname}
              </Typography>

              <Chip size="small" label={role.label} color={role.color} />
            </Stack>

            <Typography color="text.secondary">
              {data.firstName} {data.lastName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {data.email}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Typography variant="body2">
          No FutFriend desde{" "}
          {new Date(data.createdAt).toLocaleDateString("pt-PT")}
        </Typography>

        <Button variant="outlined" onClick={onEdit} sx={{ alignSelf: "flex-start" }}>
          Editar perfil
        </Button>
      </Stack>
    </Paper>
  );
}
