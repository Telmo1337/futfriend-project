import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // altura total menos navbar
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          background: "#f9f9f9",
        }}
      >
        <Stack spacing={4} maxWidth={900}>
          {/* Title */}
          <Typography
            variant="h1"
            fontWeight={700}
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
            }}
          >
            Pronto para levar o teu jogo de futebol ao próximo nível?
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            O FutFriend ajuda-te a gerir partidas, jogadores e resultados
            num único lugar. Nunca foi tão fácil organizar o teu jogo de futebol!
          </Typography>

          {/* CTA */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.3 }}
            >
              Aceder à sua conta
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.3 }}
            >
              Comece já!
            </Button>
          </Stack>
        </Stack>
      </Box>
  );
}
