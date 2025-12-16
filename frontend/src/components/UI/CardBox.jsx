import { Box } from "@mui/material";

export default function CardBox({ children, sx }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: 1,
        height: "100%",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
