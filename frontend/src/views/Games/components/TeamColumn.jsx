import { Paper, Stack, Typography, Avatar, Button, Chip } from "@mui/material";

export default function TeamColumn({
  title,
  team,
  players,
  isUserHere,
  canJoin,
  disabled,
  onJoin,
  onLeave,
  adminId,
}) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={600}>{title}</Typography>

        {players.map((p) => {
          const isAdmin = p.user.id === adminId;

          return (
            <Stack
              key={p.id}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: isAdmin ? "primary.main" : "grey.300",
                  color: isAdmin ? "primary.contrastText" : "text.primary",
                }}
              >
                {p.user.nickname.charAt(0).toUpperCase()}
              </Avatar>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight={isAdmin ? 600 : 400}>
                  {p.user.nickname}
                </Typography>

                {isAdmin && (
                  <Chip
                    label="Admin"
                    size="small"
                    color="primary"
                  />
                )}
              </Stack>
            </Stack>
          );
        })}

        {players.length === 0 && (
          <Typography color="text.secondary">
            Sem jogadores
          </Typography>
        )}

        {!disabled && !isUserHere && canJoin && (
          <Button
            variant="contained"
            size="small"
            onClick={() => onJoin(team)}
          >
            Entrar nesta equipa
          </Button>
        )}

        {!disabled && isUserHere && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onLeave}
          >
            Sair da equipa
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
