import { Box, Typography, Alert, Paper } from "@mui/material";
import BtnPrimary from "../UI/BtnPrimary";
import RegisterFields from "./RegisterFields";
import useRegisterForm from "./useRegisterForm";

const RegisterForm = () => {
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

        <BtnPrimary
          variant="contained"
          title="Registar"
          type="submit"
          disabled={isDisabled}
          sx={{ mt: 2 }}
        />
      </Box>
    </Paper>
  );
};

export default RegisterForm;
