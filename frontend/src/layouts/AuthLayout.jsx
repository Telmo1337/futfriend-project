//para login e registo (sem a sidebar)
import { Box, Paper, Typography } from "@mui/material";

const AuthLayout = ({ children }) => {

    const title = "FutFriend"

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                bgcolor: "background.default",

            }}
        >

            <Paper elevation={6} sx={{
                p: { xs: 3, md: 4 },
                width: { xs: "90%", sm: 400 },
                maxWidth: "95vw",
                boxSizing: "border-box",
                borderRadius: 3,
            }}>
                <Typography
                    variant="h4"
                    align="center"
                    mb={3}
                    sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
                >
                    {title}
                </Typography>
                {/*injetar form*/}

                {children}
            </Paper>

        </Box>
    )
}

export default AuthLayout
