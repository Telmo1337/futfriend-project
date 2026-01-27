import { Button, Stack } from "@mui/material";
import { useState } from "react";
import ScoreEditor from "./ScoreEditor";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminActions({
  state,
  players,
  onGoalsChange,
  onStart,
  onFinish,
}) {
  const [confirmStart, setConfirmStart] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  return (
    <Stack spacing={2} alignItems="center">
      {/* ESTADO: AGENDADO */}
      {state === "scheduled" && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmStart(true)}
            sx={{ alignSelf: "center" }}
          >
            Iniciar jogo
          </Button>

          <ConfirmDialog
            open={confirmStart}
            title="Iniciar jogo"
            description="Depois de iniciado, os jogadores já não poderão entrar ou sair."
            confirmLabel="Iniciar"
            onClose={() => setConfirmStart(false)}
            onConfirm={() => {
              setConfirmStart(false);
              onStart();
            }}
          />
        </>
      )}

      {/* ESTADO: EM ANDAMENTO */}
      {state === "ongoing" && (
        <>
          <ScoreEditor
            players={players}
            onGoalsChange={onGoalsChange}
          />

  
          <Button
            variant="contained"
            color="error"
            sx={{ alignSelf: "flex-end", mt: 2 }}
            onClick={() => setConfirmFinish(true)}
          >
            Terminar jogo
          </Button>

          <ConfirmDialog
            open={confirmFinish}
            title="Confirmar resultado"
            description="Esta ação irá terminar o jogo e aplicar o resultado a todos os jogadores."
            confirmLabel="Confirmar resultado"
            onClose={() => setConfirmFinish(false)}
            onConfirm={() => {
              setConfirmFinish(false);
              onFinish();
            }}
          />
        </>
      )}
    </Stack>
  );
}
