import { Button } from "@mui/material";
import { useState } from "react";
import ScoreEditor from "./ScoreEditor";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminActions({
  state,
  onStart,
  onFinish,
  goalsA,
  goalsB,
  setGoalsA,
  setGoalsB,
}) {
  const [confirmStart, setConfirmStart] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  return (
    <>
      {state === "scheduled" && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmStart(true)}
            sx={{ alignSelf: "center", mt: 2 }}
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

      {state === "ongoing" && (
        <>
          <ScoreEditor
            goalsA={goalsA}
            goalsB={goalsB}
            setGoalsA={setGoalsA}
            setGoalsB={setGoalsB}
            onConfirm={() => setConfirmFinish(true)}
          />

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
    </>
  );
}
