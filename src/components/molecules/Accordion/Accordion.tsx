import { useState } from "react";
import { Accordion as AccordionMui, AccordionDetails, AccordionSummary, type SxProps, type Theme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    sxProps?: SxProps<Theme> | undefined;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children, sxProps = undefined}) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <AccordionMui
            expanded={expanded}
            onChange={handleChange}
            sx={sxProps}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                component="span" 
                variant="subtitle1"
                sxProps={{ 
                  color: (theme) => `${sxProps === undefined ? theme.palette.grey[200] : theme.palette.grey[500]}`
                }}
              >{ title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {children}
            </AccordionDetails>
        </AccordionMui>
    );
}