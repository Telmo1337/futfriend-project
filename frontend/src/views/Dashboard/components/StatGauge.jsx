import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

export default function StatGauge({ label, value, max }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const size = isMobile ? 140 : 180;

  return (
    <>
      <Gauge
        width={size}
        height={size}
        value={value}
        valueMax={max}
        startAngle={-90}
        endAngle={90}
        innerRadius="70%"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {label}
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </>
  );
}
