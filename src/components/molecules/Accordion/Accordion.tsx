import { useEffect, useState } from "react";
import { Accordion as AccordionMui, AccordionDetails, AccordionSummary, type SxProps, type Theme, Box } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
  title?: string;
  icon?: React.ReactNode;
  opcion?: React.ReactNode;
  children: React.ReactNode;
  sxProps?: SxProps<Theme> | undefined;
  customHeader?: React.ReactNode;
  backgroundDetails?: SxProps<Theme> | undefined;
  isExpanded?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children, sxProps = undefined, opcion, customHeader: customSummary, backgroundDetails, isExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded])

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

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
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
      <AccordionDetails sx={{ ...backgroundDetails }}>
        {children}
      </AccordionDetails>
    </AccordionMui>
  );
}