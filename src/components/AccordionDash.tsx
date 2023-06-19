import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function AccordionDash() {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Open Time</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>08:00 AM</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Close Time</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>07:00 PM</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Holiday</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ marginY: "10px" }}>Saturaday</Typography>
          <Divider />
          <Typography sx={{ marginY: "10px" }}>Sunday</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
