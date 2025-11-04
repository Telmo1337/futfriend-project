import {
  Box,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
  MenuItem,
} from "@mui/material";

const AddPlayerSection = ({
  email,
  name,
  team,
  options = [],
  loading = false,
  onEmailChange,
  onNameChange,
  onTeamChange,
  onAdd,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
      {/* 🔍 Autocomplete de utilizadores */}
      <Autocomplete
        freeSolo
        value={email}
        options={options}
        getOptionLabel={(option) => {
          // quando é string (escrito manualmente)
          if (typeof option === "string") return option;
          // quando vem da API (objeto user)
          return `${option.firstName || ""} ${option.lastName || ""} (${option.email})`.trim();
        }}
        onInputChange={(_, value) => onEmailChange(value)}
        onChange={(_, newValue) => {
          // se o utilizador escolher da lista
          if (typeof newValue === "object" && newValue?.email) {
            onEmailChange(newValue.email);
            const fullName = [newValue.firstName, newValue.lastName]
              .filter(Boolean)
              .join(" ");
            onNameChange(fullName);
          } else {
            onEmailChange(newValue || "");
          }
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Email"
            size="small"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Nome opcional */}
      <TextField
        label="Nome (opcional)"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        size="small"
        fullWidth
      />

      {/* Equipa */}
      <TextField
        select
        label="Equipa"
        value={team}
        onChange={(e) => onTeamChange(e.target.value)}
        size="small"
        sx={{ width: 100 }}
      >
        <MenuItem value="teamA">A</MenuItem>
        <MenuItem value="teamB">B</MenuItem>
      </TextField>

      {/* Botão adicionar */}
      <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        sx={{ flexShrink: 0 }}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export default AddPlayerSection;
