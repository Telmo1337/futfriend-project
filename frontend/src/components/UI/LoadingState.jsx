import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Componente genérico de "estado de carregamento"
 * Pode ser usado em qualquer parte do projeto.
 */
const LoadingState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "200px",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        A carregar...
      </Typography>
    </Box>
  );
};

export default LoadingState;
