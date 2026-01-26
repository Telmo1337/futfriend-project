import { Stack, Typography, Paper, Button } from "@mui/material";
import useProfile from "./useProfile";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import ConfirmDialog from "../Games/components/ConfirmDialog";

import { useState } from "react";

export default function Profile() {
  const {
    user,
    data,
    form,
    editing,
    setEditing,
    handleChange,
    save,
    deleteAccount,
  } = useProfile();

  const [confirmDelete, setConfirmDelete] = useState(false);



  if (!user || !data) return null;



  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" fontWeight={600}>
        Perfil
      </Typography>

      {!editing ? (
        <ProfileView data={data} onEdit={() => setEditing(true)} />
      ) : (
        <ProfileEdit
          form={form}
          onChange={handleChange}
          onSave={save}
          onCancel={() => setEditing(false)}
        />
      )}

      {/* Zona de perigo */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "error.light",
        }}
      >
        <Stack spacing={1}>
          <Typography color="error" fontWeight={600}>
            Zona de perigo
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Apagar a conta é uma ação permanente. Todos os teus dados serão removidos.
          </Typography>

          <Button
            variant="outlined"
            color="error"
            sx={{ alignSelf: "flex-start", mt: 1 }}
            onClick={() => setConfirmDelete(true)}
          >
            Apagar conta
          </Button>
        </Stack>
      </Paper>

      <ConfirmDialog
        open={confirmDelete}
        title="Apagar conta"
        description="Tens a certeza que queres apagar a tua conta? Esta ação é irreversível."
        confirmLabel="Apagar definitivamente"
        onClose={() => setConfirmDelete(false)}
        onConfirm={deleteAccount}
      />

    </Stack>
  );
}
