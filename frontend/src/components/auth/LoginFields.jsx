import { TextField } from "@mui/material";

const LoginFields = ({ form, handleChange }) => (
  <>
    <TextField
      required
      size="small"
      fullWidth
      label="Email"
      type="email"
      margin="normal"
      value={form.email}
      onChange={handleChange("email")}
      autoComplete="email"
    />

    <TextField
      required
      size="small"
      fullWidth
      label="Password"
      type="password"
      margin="normal"
      value={form.password}
      onChange={handleChange("password")}
      autoComplete="current-password"
    />
  </>
);

export default LoginFields;
