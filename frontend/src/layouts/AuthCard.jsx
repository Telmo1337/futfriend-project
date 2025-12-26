import Paper from "@mui/material/Paper";

export default function AuthCard({ children }) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 420,
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
      }}
    >
      {children}
    </Paper>
  );
}
