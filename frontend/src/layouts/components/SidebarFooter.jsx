import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const SidebarFooter = () => {
    const navigate = useNavigate();

    
    const handleLogout = () => {
    console.log("logout");

    navigate("/login")
  };

  return (
    <Box sx={{ p: 1 }}>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: 2,
          color: "error.main",
          transition: "background-color 0.2s ease, color 0.2s ease",
            "&:hover": {
            backgroundColor: "error.light",
            color: "error.contrastText",
          },
        }}
      >
        <ListItemIcon sx={{ color: "inherit"}}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Terminar sessão" />
      </ListItemButton>
    </Box>
  )
}

export default SidebarFooter
