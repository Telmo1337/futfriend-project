import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

const FinalizeGameModal = ({ open, onClose, onFinalize }) => {
  const [stats, setStats] = useState({ goalsA: "", goalsB: "" });

  const handleChange = (e) => setStats({ ...stats, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (stats.goalsA === "" || stats.goalsB === "")
      return alert("Preenche os golos das equipas!");
    onFinalize(stats);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Finalizar Jogo</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            name="goalsA"
            label="Golos Equipa A"
            type="number"
            value={stats.goalsA}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="goalsB"
            label="Golos Equipa B"
            type="number"
            value={stats.goalsB}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinalizeGameModal;
