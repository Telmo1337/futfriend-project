import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Box, Alert } from "@mui/material";

import BtnPrimary from "../../../components/UI/BtnPrimary";

import useCreateGameForm from "../hooks/useCreateGameForm";

const CreateGameModal = ({ open, onClose, onGameCreated }) => {

  const { form, feedback, handleChange, handleSubmit } = useCreateGameForm(onGameCreated, onClose);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar novo jogo de futebol</DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2
          }}>
          {["teamA", "teamB", "location"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={
                field === "teamA"
                  ? "Equipa A"
                  : field === "teamB"
                    ? "Equipa B"
                    : "Localização"
              }

              value={form[field]}
              onChange={handleChange}
              required
            />
          ))}

          <TextField
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            required
          />

          <TextField
            select
            name="type"
            label="Tipo de jogo"
            value={form.type}
            onChange={handleChange}
            required
          >

            <MenuItem value="FIVE_A_SIDE">5vs5</MenuItem>
            <MenuItem value="SEVEN_A_SIDE">7vs7</MenuItem>
            <MenuItem value="ELEVEN_A_SIDE">11vs11</MenuItem>
          </TextField>

          {feedback.error && <Alert severity="error">
            {feedback.error}
          </Alert>}

          {feedback.success && (
            <Alert severity="success">
              {feedback.success}
            </Alert>
          )}
        </Box>
      </DialogContent>

      {/*btn*/}
      <DialogActions>
        <BtnPrimary
          variant="outlined"
          title="Cancelar"
          type="submit"
          sx={{ mt: 2 }}
          onClick={onClose}
        />
        <BtnPrimary
          variant="contained"
          title="Criar jogo"
          type="submit"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        />
      </DialogActions>

    </Dialog >
  );
};

export default CreateGameModal;
