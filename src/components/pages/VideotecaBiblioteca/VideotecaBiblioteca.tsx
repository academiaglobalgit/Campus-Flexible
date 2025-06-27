import React from "react";
import { Box, Grid, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Videoteca } from "./Videoteca";
import imgVideoteca from "../../../assets/videoteca.jpg";
import imgBiblioteca from "../../../assets/biblioteca.jpg";
import { Biblioteca } from "./Biblioteca";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";

const VideotecaBiblioteca: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Image = () => {
        const src = value === 0 ? imgVideoteca : imgBiblioteca;
        return(
            <Box
                component="img"
                src={src}
                maxHeight={isMobile ? 138 : 320}
                width="100%"
            />
        );
    };

    const Contents = () => (
      <>
        <Image />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                <Tab label="Biblioteca" value={0} />
                <Tab label="Videoteca" value={1} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Biblioteca />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Videoteca />
        </TabPanel>
      </>
    );

    return(
        <Box sx={[{ width: '100%', }, isMobile && { paddingTop:'28px', paddingBottom: '28px' }]}>
          {
            isMobile 
            ? <Contents />
            :
              <Box sx={{width: { md: '60.2vw', display: 'flex', flexDirection: 'column', gap: '32px' }}}>
                <Grid container sx={{ alignItems:'center'}}>
                      <Grid size={{md: !betweenDevice ? 8 : 12}}>
                          <TituloIcon Titulo={TitleScreen.BIBLIOTECA} fontSize="h2" />
                          <Typography component="span" variant="body1">
                              Bienvenido a nuestra Biblioteca y Videoteca Digital, un espacio cuidadosamente organizado donde encontrarás una amplia colección de recursos escritos y audiovisuales
                          </Typography>
                      </Grid>
                </Grid>
                <Contents />
              </Box>
          }      
        </Box>
    );
};

export default VideotecaBiblioteca;