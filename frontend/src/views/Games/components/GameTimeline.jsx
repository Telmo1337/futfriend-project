import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
} from "@mui/material";

const steps = [
  { key: "scheduled", label: "Agendado" },
  { key: "ongoing", label: "Em andamento" },
  { key: "finished", label: "Terminado" },
];

export default function GameTimeline({ state }) {
  const activeStep = steps.findIndex(
    (s) => s.key === state
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Progresso do jogo
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.key}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
