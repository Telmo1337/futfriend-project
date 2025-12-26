import { Link } from "react-router-dom";
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import useLoginForm from "@/components/auth/hooks/useLoginForm";
import AuthWrapper from "@/layouts/AuthWrapper";
import AuthCard from "@/layouts/AuthCard";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function Login() {
  const { form, error, handleChange, handleSubmit } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);


  return (
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
              Hi, Welcome Back
            </Typography>
            <Typography color="text.secondary">
              Enter your credentials to continue
            </Typography>
          </Stack>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email Address / Username"
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
                Sign In
              </Button>
            </Stack>
          </Box>

          {/* Footer */}
          <Typography align="center" variant="body2">
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </AuthCard>
    </AuthWrapper>
  );
}
