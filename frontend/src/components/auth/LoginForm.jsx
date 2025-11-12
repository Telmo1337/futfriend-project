import { Box, Typography, Alert, Paper, Button } from "@mui/material";

// Components
import LoginFields from "@/components/auth/LoginFields";


//hooks
import useLoginForm from "@/components/auth/hooks/useLoginForm";

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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.2 }}
        >
          Entrar
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
