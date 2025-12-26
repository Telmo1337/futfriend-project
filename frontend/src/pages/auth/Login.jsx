import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import useLoginForm from "@/components/auth/hooks/useLoginForm";
import AuthWrapper from "@/layouts/AuthWrapper";
import AuthCard from "@/layouts/AuthCard";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../LandingPage/Navbar";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Footer from "../LandingPage/Footer";



export default function Login() {
  const { form, error, handleChange, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <Navbar />
      <AuthWrapper>
        <AuthCard>
          <Stack spacing={4}>
            {/* Logo */}
            <Stack alignItems="center">
              <Typography variant="h4" fontWeight={700}>
                FutFriend
              </Typography>
            </Stack>

            {/* Title */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight={600}>
                Olá de novo!
              </Typography>
              <Typography color="text.secondary">
                Introduza os seus dados para aceder à sua conta
              </Typography>
            </Stack>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Endereço de Email / Nickname"
                  value={form.identifier}
                  onChange={handleChange("identifier")}
                  fullWidth
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ py: 1.3 }}
                >
                  Entrar
                </Button>
              </Stack>
            </Box>


            <Typography align="center" variant="body2">
              Ainda não tens conta? Regista-te{" "}
              <Link
                component={RouterLink}
                to="/register"
                underline="always"
              >
                aqui
              </Link>
            </Typography>

          </Stack>
        </AuthCard>
      </AuthWrapper>
      <Footer  />
    </>
  );
}
