import { TextField } from "@mui/material";

const LoginFields = ({ form, handleChange }) => (
  <>
    <TextField
      required
      size="small"
      fullWidth
      label="Email ou Nickname"
      type="text"
      margin="normal"
      value={form.identifier}
      onChange={handleChange("identifier")}
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
