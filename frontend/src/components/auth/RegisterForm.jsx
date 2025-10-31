import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Box, TextField, Typography, Alert, Paper } from "@mui/material";
import BtnPrimary from "../UI/BtnPrimary";

const title = "Criar conta";

const RegisterForm = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
    const isDisabled = !form.name || !form.email || !form.password;

    return (
        <Paper elevation={3} sx={{
            p: 4,
            maxWidth: 400,
            margin: "auto",
            mt: 10,
            borderRadius: 3,
        }}
        >
            <Typography variante="h5" align="center" mb={2}>
                {title}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nome"
                    type="text"
                    margin="normal"
                    value={form.name}
                    onChange={(e) => {
                        setError("");
                        setForm({...form, name: e.target.value});
                    }}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    value={form.email}
                    onChange={(e) => {
                        setError("");
                        setForm({...form, email: e.target.value})
                    }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={form.password}
                    onChange={(e) => {
                        setError("");
                        setForm({...form, password: e.target.value})
                    }}
                />
                {error && (
                    <Alert severity="error" sx={{mt:2}}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{mt:2}}>
                        {success}
                    </Alert>
                )}

                <BtnPrimary title="Registar" type="submit" disabled={isDisabled}/>
            </Box>
        </Paper>
    )
}

export default RegisterForm
