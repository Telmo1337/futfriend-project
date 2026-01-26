import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HelpAccordion({ title, children }) {
  return (
    <Accordion
      disableGutters
      elevation={1}
      sx={{
        mb: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
