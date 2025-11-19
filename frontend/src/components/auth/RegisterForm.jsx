import { Box, Typography, Alert, Paper, Button } from "@mui/material";

// Components
import RegisterFields from "@/components/auth/RegisterFields";

//hooks
import useRegisterForm from "@/components/auth/hooks/useRegisterForm";

const RegisterForm = () => {

  //custom hook para gerir o form de registo
  const { form, handleChange, handleSubmit, error, success, isDisabled } =
    useRegisterForm();

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" mb={2}>
        Criar Conta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <RegisterFields form={form} handleChange={handleChange} />

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {success}
          </Alert>
        )}

        <Button
          variant="contained"
          type="submit"
          disabled={isDisabled}
          fullWidth
          sx={{ mt: 2, py: 1.2 }}
        >
          Registar
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
