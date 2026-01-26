import { Stack, Typography, Paper } from "@mui/material";
import HelpAccordion from "./HelpAccordion";
import { helpSections } from "./helpSections";

export default function Help() {
  return (
    <Stack spacing={2} sx={{ p: { xs: 2, md: 3 }, maxWidth: 900 }}>
      <Typography variant="h5" fontWeight={700}>
        Ajuda
      </Typography>

      <Paper sx={{ }} elevation={0}>
        <Typography>
          O <b>FutFriend</b> é uma aplicação para criar, gerir e participar em
          jogos de futebol, com estatísticas automáticas e rankings entre
          jogadores.
        </Typography>
      </Paper>

      {helpSections.map(section => (
        <HelpAccordion key={section.title} title={section.title}>
          {section.items.map((text, i) => (
            <Typography key={i} paragraph>
              {text}
            </Typography>
          ))}
        </HelpAccordion>
      ))}

      <Typography variant="body2" color="text.secondary">
        Esta aplicação foi desenvolvida como projeto académico, com foco na
        gestão de jogos de futebol e estatísticas de jogadores.
      </Typography>
    </Stack>
  );
}
