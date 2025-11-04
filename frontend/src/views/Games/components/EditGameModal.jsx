import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

const EditGameModal = ({ open, onClose, game, onSave }) => {
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: "",
    location: "",
    type: "FIVE_A_SIDE",
  });

  useEffect(() => {
    if (game) {
      setForm({
        teamA: game.teamA,
        teamB: game.teamB,
        date: new Date(game.date).toISOString().slice(0, 16), // datetime-local
        location: game.location,
        type: game.type,
      });
    }
  }, [game]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Jogo</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField name="teamA" label="Equipa A" value={form.teamA} onChange={handleChange} />
          <TextField name="teamB" label="Equipa B" value={form.teamB} onChange={handleChange} />
          <TextField name="location" label="Localização" value={form.location} onChange={handleChange} />
          <TextField
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
          />
          <TextField select name="type" label="Tipo de jogo" value={form.type} onChange={handleChange}>
            <MenuItem value="FIVE_A_SIDE">5x5</MenuItem>
            <MenuItem value="SEVEN_A_SIDE">7x7</MenuItem>
            <MenuItem value="ELEVEN_A_SIDE">11x11</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGameModal;
