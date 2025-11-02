import BtnPrimary from "../components/UI/BtnPrimary";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: { xs: 1.5, md: 2 }, // gap menor em ecrãs pequenos
        px: 2, // padding horizontal para não colar nas margens
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "5rem", sm: "7rem", md: "10rem" }, // escala progressiva
          fontWeight: 300,
          color: "text.primary",
          cursor: "default",
        }}
      >
        404
      </Typography>

      
      <Typography
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
          fontWeight: 300,
          color: "text.primary",
          cursor: "default",

        }}
      >
        Oops! Página não encontrada.
      </Typography>

      
      <BtnPrimary
        variant="contained"
        title="Voltar para o início"
        to="/"
        sx={{
          mt: { xs: 2, md: 3 },
          maxWidth: 220,
          width: "100%",
          fontSize: { xs: "0.9rem", md: "1rem" },
          py: 1.2,
          "&:hover": { bgcolor: "primary.dark" },
        }}
      />
    </Box>
  );
};

export default NotFound;
