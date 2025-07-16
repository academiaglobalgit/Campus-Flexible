import { useState } from "react";
import { Accordion as AccordionMui, AccordionDetails, AccordionSummary, type SxProps, type Theme, Box } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
  title: string;
  icon?: React.ReactNode;
  opcion?: React.ReactNode;
  children: React.ReactNode;
  sxProps?: SxProps<Theme> | undefined;
  customSummary?: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children, sxProps = undefined, opcion, customSummary }) => {
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
        {
          customSummary
          ?
            customSummary
          :

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography
              component="span"
              variant="subtitle1"
              sxProps={{
                color: (theme) => `${sxProps === undefined ? theme.palette.grey[200] : theme.palette.grey[500]}`
              }}
            >
              {title}
            </Typography>
            {opcion}
          </Box>
        }
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#FFFFFF !important'}}>
        {children}
      </AccordionDetails>
    </AccordionMui>
  );
}