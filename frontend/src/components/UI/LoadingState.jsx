import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Componente genérico de "estado de carregamento"
 * Pode ser usado em qualquer parte do projeto.
 */
const LoadingState = ({ message = "A carregar..." }) => {
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
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingState;
