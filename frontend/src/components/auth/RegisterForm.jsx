import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Box, TextField, Typography, Alert, Paper } from "@mui/material";
import BtnPrimary from "../UI/BtnPrimary";

const title = "Criar conta";

const RegisterForm = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("credenciais: ", form)
            await API.post("/auth/register", form);

            //sucesso
            setSuccess("conta criada - a redirecionar");
            setError("");

            //redirecionar para o login após x segundos
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error(err)
            setSuccess("");
        }
    }


    //impedir utilizador crie conta enquanto os campos estao vazios
    const isDisabled = !form.firstName || !form.lastName || !form.email || !form.password;

    return (
        <Box sx={{
            p: 4,
            boxSizing: "border-box",

        }}>
            <Typography variante="h5" align="center" mb={2}>
                {title}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>

                <TextField
                    helperText={error ? "" : "Por favor, insira o seu primeiro nome"}
                    required
                    size="small"
                    fullWidth
                    label="Primeiro Nome"
                    type="text"
                    margin="normal"
                    value={form.firstName}
                    onChange={(e) => {
                        setError("");
                        setForm({ ...form, firstName: e.target.value });
                    }}
                />
                <TextField
                    helperText={error ? "" : "Qual o seu apelido?"}
                    required
                    size="small"
                    fullWidth
                    label="Último Nome"
                    type="text"
                    margin="normal"
                    value={form.lastName}
                    onChange={(e) => {
                        setError("");
                        setForm({ ...form, lastName: e.target.value });
                    }}
                />

                <TextField
                    helperText={error ? "" : "Por favor, insira o seu email válido"}
                    required
                    size="small"
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    value={form.email}
                    onChange={(e) => {
                        setError("");
                        setForm({ ...form, email: e.target.value })
                    }}
                />

                <TextField
                    helperText={error ? "" : "Mínimo 6 caracteres"}
                    required
                    size="small"
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={form.password}
                    onChange={(e) => {
                        setError("");
                        setForm({ ...form, password: e.target.value })
                    }}
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {success}
                    </Alert>
                )}

                <BtnPrimary variant="contained" title="Registar" type="submit" disabled={isDisabled} sx={{ mt: 2 }} />
            </Box>
        </Box>
    )
}

export default RegisterForm
