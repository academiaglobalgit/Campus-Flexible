import { useState } from "react";
import { Accordion as AccordionMui, AccordionDetails, AccordionSummary, type SxProps, type Theme, Box } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DsSvgIcon from "../../atoms/Icon/Icon";

type AccordionProps = {
  title: string;
  status?: string;
  color?:  'primary' | 'secondary' | 'error' | 'disabled' | 'success' | 'warning';
  icon?:  React.ReactNode;
  children: React.ReactNode;
  sxProps?: SxProps<Theme> | undefined;
};

export const Accordion: React.FC<AccordionProps> = ({ title, status, children, sxProps = undefined, color, icon }) => {
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            component="span"
            variant="subtitle1"
            sxProps={{
              color: (theme) => `${sxProps === undefined ? theme.palette.grey[200] : theme.palette.grey[500]}`
            }}
          >{title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
            <Typography
              component="span"
              variant="subtitle1"
              color={color}
            >{status}
            </Typography>
            <DsSvgIcon component={icon} color={color} />
          </Box>

        </Box>

      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </AccordionMui>
  );
}