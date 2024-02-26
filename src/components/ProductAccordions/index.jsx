import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductAccordions = ({ lang, content, description }) => {
  const [expandedAccordion, setExpandedAccordion] = useState(0);

  const handleAccordionChange = (index) => {
    if (expandedAccordion === index) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(index);
    }
  };

  return (
    <div className="details-text">
      <Accordion
        expanded={expandedAccordion === 0}
        onChange={() => handleAccordionChange(0)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {content[lang]["detailsAccordionHeader"]}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ marginTop: 0 }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAccordion === 1}
        onChange={() => handleAccordionChange(1)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {content[lang]["warrantyAccordionHeader"]}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{content[lang]["warrantyText"]}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAccordion === 2}
        onChange={() => handleAccordionChange(2)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {content[lang]["FaqAccordionHeader"]}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            {content[lang]["faqQuestion1"]}
          </Typography>
          <Typography>{content[lang]["faqAnswer1"]}</Typography>
          <Typography variant="subtitle2" mt={2}>
            {content[lang]["faqQuestion2"]}
          </Typography>
          <Typography>{content[lang]["faqAnswer2"]}</Typography>
          <Typography variant="subtitle2" mt={2}>
            {content[lang]["faqQuestion3"]}
          </Typography>
          <Typography>{content[lang]["faqAnswer3"]}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductAccordions;
