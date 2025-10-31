//para login e registo (sem a sidebar)
import {Box, Paper, Typography} from "@mui/material";

const AuthLayout = ({children}) => {

    const title = "FutFriend"

  return (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            backgroundImage: "linear-gradient(135deg, #f0f2f5 0%, #dce3eb 100%)"
        }}
    >
        <Paper elevation={6}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                borderRadius: 4,
                width: "100%",
                maxWidth: 450,
                backgroundColor: "white",
            }}
        />
        <Typography variant="h4" fontWeight="bold" mb={2} >
            {title}
        </Typography>
            {/*injetar form*/}
        {children}
    </Box>
  )
}

export default AuthLayout
