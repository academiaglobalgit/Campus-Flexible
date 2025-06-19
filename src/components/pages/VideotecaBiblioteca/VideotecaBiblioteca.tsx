import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Videoteca } from "./Videoteca";
import imgVideoteca from "../../../assets/videoteca.jpg";
import imgBiblioteca from "../../../assets/biblioteca.jpg";
import { Biblioteca } from "./Biblioteca";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const VideotecaBiblioteca: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Image = () => {
        const src = value === 0 ? imgVideoteca : imgBiblioteca;
        return(
            <Box
                component="img"
                src={src}
                maxHeight={138}
                width="100%"
            />
        );
    };

    return(
        <Box sx={{ width: '100%', paddingTop:'28px', paddingBottom: '28px' }}>
            <Image />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Videoteca" value={0} />
                    <Tab label="Biblioteca" value={1} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Videoteca />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Biblioteca />
            </TabPanel>
        </Box>
    );
};

export default VideotecaBiblioteca;