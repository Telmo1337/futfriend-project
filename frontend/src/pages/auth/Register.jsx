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
    Grid,
} from "@mui/material";
import useRegisterForm from "@/components/auth/hooks/useRegisterForm";
import AuthWrapper from "@/layouts/AuthWrapper";
import AuthCard from "@/layouts/AuthCard";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import Navbar from "../LandingPage/Navbar";

export default function Register() {
    const {
        form,
        handleChange,
        handleSubmit,
        error,
        success,
        isDisabled,
    } = useRegisterForm();


    const [showPassword, setShowPassword] = useState(false);

    // indicador simples de força (visual)
    const passwordStrength =
        form.password.length < 6
            ? { label: "Weak", color: "warning.main", width: "25%" }
            : form.password.length < 10
                ? { label: "Medium", color: "info.main", width: "60%" }
                : { label: "Strong", color: "success.main", width: "100%" };

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
                                Sign up
                            </Typography>
                            <Typography color="text.secondary">
                                Enter your details to continue
                            </Typography>
                        </Stack>

                        <Typography align="center" variant="subtitle2">
                            Sign up with Email address
                        </Typography>

                        {/* Form */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                {/* First Name */}
                                <TextField
                                    label="First Name"
                                    value={form.firstName}
                                    onChange={handleChange("firstName")}
                                    fullWidth
                                />
                                {/* Last Name */}
                                <TextField
                                    label="Last Name"
                                    value={form.lastName}
                                    onChange={handleChange("lastName")}
                                    fullWidth
                                />
                                {/* Email */}
                                <TextField
                                    label="Email Address / Username"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    fullWidth
                                />

                                {/* Nickname */}
                                <TextField
                                    label="Nickname"
                                    value={form.nickname}
                                    onChange={handleChange("nickname")}
                                    fullWidth
                                />

                                {/* Password */}
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

                                {/* Password strength */}
                                {form.password && (
                                    <Stack spacing={0.5}>
                                        <Box
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: "grey.300",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: passwordStrength.width,
                                                    backgroundColor: passwordStrength.color,
                                                    borderRadius: 3,
                                                    transition: "width 0.3s",
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="caption">
                                            {passwordStrength.label}
                                        </Typography>
                                    </Stack>
                                )}
                                {error && (
                                    <Typography color="error" variant="body2">
                                        {error}
                                    </Typography>
                                )}

                                {success && (
                                    <Typography color="success.main" variant="body2">
                                        {success}
                                    </Typography>
                                )}

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={isDisabled || console.log("oops")}
                                    sx={{ py: 1.3 }}
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        </Box>

                        {/* Footer */}
                        <Typography align="center" variant="body2">
                            Already have an account?{" "}
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Stack>
                </AuthCard>
            </AuthWrapper>
        </>
    );
}
