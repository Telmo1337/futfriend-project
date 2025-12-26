import { Box, Stack, Typography, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 20,
        pb: 10,
        px: 2,
        borderTop: "1px solid",
        borderColor: "divider",

      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        {/* Brand */}
        <Typography variant="h6" fontWeight={700}>
          FutFriend
        </Typography>

        {/* Short description */}
        <Typography variant="body2" color="text.secondary" maxWidth={500}>
          Uma forma simples e moderna de organizar jogos de futebol entre amigos.
        </Typography>
      

        {/* Copyright */}
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} FutFriend. Todos os direitos reservados.
        </Typography>
      </Stack>
    </Box>
  );
}
