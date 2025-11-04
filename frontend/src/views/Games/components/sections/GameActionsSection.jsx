import { Box, Button } from "@mui/material";

const GameActionsSection = ({ isOwner, onEdit, onDelete, onFinalize }) => {
  if (!isOwner) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
      <Button variant="outlined" onClick={onEdit}>Editar</Button>
      <Button color="error" variant="outlined" onClick={onDelete}>Apagar</Button>
      <Button color="success" variant="contained" onClick={onFinalize}>Finalizar Jogo</Button>
    </Box>
  );
};

export default GameActionsSection;
