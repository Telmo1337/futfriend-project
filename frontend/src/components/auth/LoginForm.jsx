import { Box, Typography, Alert, Paper } from "@mui/material";
import BtnPrimary from "../UI/BtnPrimary";
import LoginFields from "./LoginFields";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
  const { form, error, handleChange, handleSubmit } = useLoginForm();

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" mb={2}>
        Iniciar Sessão
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <LoginFields form={form} handleChange={handleChange} />

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}

        <BtnPrimary
          variant="contained"
          title="Entrar"
          type="submit"
          sx={{ mt: 2 }}
        />
      </Box>
    </Paper>
  );
};

export default LoginForm;
