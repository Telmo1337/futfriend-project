import Box from "@mui/material/Box";

export default function AuthWrapper({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        px: 2,
      }}
    >
      {children}
    </Box>
  );
}
