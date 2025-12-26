// Components
import { Box, Typography, Button } from "@mui/material";

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

      
      <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1.2 }}
         
        >
         Voltar para o início...
        </Button>
    </Box>
  );
};

export default NotFound;
