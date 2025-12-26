import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <Box
      sx={{
        py: { xs: 12, md: 16 },
        px: 2,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Stack spacing={4} alignItems="center">
        {/* Headline */}
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            fontSize: { xs: "2.2rem", md: "3.2rem" },
            lineHeight: 1.2,
          }}
        >
          Menos confusão.
          <br />
          Mais futebol.
        </Typography>

        {/* Subtitle */}
        <Typography
          color="text.secondary"
          maxWidth={620}
          sx={{ fontSize: "1.1rem" }}
        >
          O FutFriend foi criado para simplificar a organização de jogos entre
          amigos. Tudo o resto é ruído.
        </Typography>

        {/* CTA */}
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{
            px: 6,
            py: 1.6,
            fontSize: "1rem",
            borderRadius: 999,
            textTransform: "none",
            boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
            "&:hover": {
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            },
          }}
        >
          Criar conta gratuita
        </Button>
      </Stack>
    </Box>
  );
}
