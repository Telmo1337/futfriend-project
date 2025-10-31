import API from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, TextField, Typography, Alert, Paper} from "@mui/material";

import BtnPrimary from "../UI/BtnPrimary";


const  title = "Iniciar sessão";


const LoginForm = () => {

    const navigate = useNavigate();
    const  [form, setForm] = useState({ email: "", password: ""});
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res= await API.post("/auth/login", form);

            //guarda token e os dados do user localmente
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            //redirecionar para rota protegida (dashboard)
            navigate("/dashboard");
      
        } catch (err) {
            console.error(err)
            setError("credenciais invalidas");
        }
    }

  return (
    <Paper elevation={3} sx={{
        p: 4,
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        borderRadius: 3,
    }}>
      <Typography variant="h5" align="center" mb={2} >
        {title}
      </Typography>



      <Box component="form" onSubmit={handleSubmit}>
    
        <TextField 
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={form.email}
            onChange={(e) => {
setError("");
                setForm({ ...form, email: e.target.value});
            }}
        />

        <TextField 
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value})}
        />

        {error && (
            <Alert severity="error" sx={{mt:2}}>
                {error}
            </Alert>
        )}

         <BtnPrimary title="Entrar" type="submit" />
      </Box>

    </Paper>
  )
}

export default LoginForm
