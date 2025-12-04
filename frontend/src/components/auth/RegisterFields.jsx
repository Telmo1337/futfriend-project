import { TextField } from "@mui/material";

const RegisterFields = ({ form, handleChange }) => (
  <>
    <TextField
      required
      size="small"
      fullWidth
      label="Primeiro Nome"
      value={form.firstName}
      onChange={handleChange("firstName")}
    />
    <TextField
      required
      size="small"
      fullWidth
      label="Último Nome"
      value={form.lastName}
      onChange={handleChange("lastName")}
    />
    <TextField
      required
      size="small"
      fullWidth
      label="Email"
      type="email"
      value={form.email}
      onChange={handleChange("email")}
    />
    <TextField
      required
      size="small"
      fullWidth
      label="Nick Name"
      value={form.nickname}
      onChange={handleChange("nickname")}
    />
    <TextField
      required
      size="small"
      fullWidth
      label="Password"
      type="password"
      value={form.password}
      onChange={handleChange("password")}
    />
  </>
);

export default RegisterFields;
