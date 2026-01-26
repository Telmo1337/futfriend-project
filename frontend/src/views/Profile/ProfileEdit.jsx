import {
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";

export default function ProfileEdit({ form, onChange, onSave, onCancel }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          name="firstName"
          value={form.firstName || ""}
          onChange={onChange}
        />

        <TextField
          label="Apelido"
          name="lastName"
          value={form.lastName || ""}
          onChange={onChange}
        />

        <TextField
          label="Nickname"
          name="nickname"
          value={form.nickname || ""}
          onChange={onChange}
        />

        <TextField
          label="Email"
          name="email"
          value={form.email || ""}
          onChange={onChange}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onSave}>
            Guardar
          </Button>
          <Button variant="text" onClick={onCancel}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
