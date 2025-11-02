import API from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Alert, Paper } from "@mui/material";

import BtnPrimary from "../UI/BtnPrimary";


const title = "Iniciar sessão";


const LoginForm = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("credenciais:", form);
      const res = await API.post("/auth/login", form);

      //guarda token e os dados do user localmente
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      //redirecionar para rota protegida (dashboard)
      navigate("/dashboard");

    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.error || "erro ao iniciar sessão. tentar novamente mais tarde"
      setError(msg);
    }
  }

  return (
    <Box sx={{
      p: 4,
      boxSizing: "border-box",

    }}>
      <Typography variant="h5" align="center" mb={2} >
        {title}
      </Typography>



      <Box component="form" onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>

        <TextField
          required
          size="small"
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={form.email}
          onChange={(e) => {
            setError("");
            setForm({ ...form, email: e.target.value });
          }}
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
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <BtnPrimary variant="contained" title="Entrar" type="submit" sx={{ mt: 2 }} />
      </Box>

    </Box>
  )
}

export default LoginForm
