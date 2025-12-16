import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";

import useCreateGame from "../hooks/useCreateGame";

export default function CreateGameModal({ open, onClose }) {
  const {
    form,
    loading,
    error,
    handleChange,
    submit,
  } = useCreateGame(() => {
    onClose();
    window.location.reload(); // depois trocamos por refetch
  });




  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar novo jogo</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Equipa A"
            value={form.teamA}
            onChange={handleChange("teamA")}
            fullWidth
          />

          <TextField
            label="Equipa B"
            value={form.teamB}
            onChange={handleChange("teamB")}
            fullWidth
          />

          <TextField
            type="datetime-local"
            label="Data e hora"
            value={form.date}
            onChange={handleChange("date")}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
            fullWidth
          />


          <TextField
            label="Local"
            value={form.location}
            onChange={handleChange("location")}
            fullWidth
          />

          <TextField
            select
            label="Tipo de jogo"
            value={form.type}
            onChange={handleChange("type")}
            fullWidth
          >
            <MenuItem value="FIVE_A_SIDE">5x5</MenuItem>
            <MenuItem value="SEVEN_A_SIDE">7x7</MenuItem>
            <MenuItem value="ELEVEN_A_SIDE">11x11</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={submit}
          disabled={loading}
        >
          Criar jogo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
