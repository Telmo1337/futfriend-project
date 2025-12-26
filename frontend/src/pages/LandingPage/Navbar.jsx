import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* title */}
          <Typography
            variant="h6"
            fontWeight={700}
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "text.primary" }}
          >
            FutFriend
          </Typography>

          {/* links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button component={Link} to="/login">
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
            >
              Criar conta
            </Button>
          </Box>

          {/* mobile menu */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* drawwer*/}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 3 }}>
          <Stack spacing={2}>
            <Button
              component={Link}
              to="/login"
              onClick={() => setOpen(false)}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              onClick={() => setOpen(false)}
            >
              Criar conta
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
