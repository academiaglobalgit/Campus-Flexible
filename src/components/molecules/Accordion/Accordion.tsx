import { Accordion as AccordionMui, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <AccordionMui
            expanded={expanded}
            onChange={handleChange}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                component="span" 
                variant="subtitle1"
                sxProps={{ 
                  color: (theme) => `${theme.palette.grey[200]}`
                }}
              >{ title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {children}
            </AccordionDetails>
        </AccordionMui>
    );
}