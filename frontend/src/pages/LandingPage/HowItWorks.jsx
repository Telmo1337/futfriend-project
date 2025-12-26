import { Box, Stack, Typography, Grid } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {STEPS} from "./constants"

const ICON_MAP = {
  group: <GroupIcon fontSize="large" />,
  soccer: <SportsSoccerIcon fontSize="large" />,
  check: <CheckCircleOutlineIcon fontSize="large" />,
};



export default function HowItWorks() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 20 },
        px: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Stack spacing={6} alignItems="center" textAlign="center" >
        {/* Title */}
        <Stack spacing={1}>
          <Typography variant="h3"  fontWeight={600}>
            Como funciona o FutFriend
          </Typography>
          <Typography color="text.secondary">
            Começa em poucos passos e organiza os teus jogos sem complicações.
          </Typography>
        </Stack>

        <Grid container spacing={4} maxWidth="md">
          {STEPS.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "primary.light",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ICON_MAP[step.icon]}
                </Box>

                <Typography variant="h6" fontWeight={600}>
                  {step.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 260 }}
                >
                  {step.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
