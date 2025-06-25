import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";

import Logo from '../../../assets/logo_ag.svg';
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { TitleScreen } from "@constants";
import Button from "../../atoms/Button/Button";
import React from "react";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { FormAyuda } from "./FormAyuda";
import { FormTutor } from "./FormTutor";

const Ayuda: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    const LogoSection = (
        <LogoBox
            src={Logo}
            alt="AG College Logo"
            sx={{
                width: '212px'
            }}
        />
    );

    const SeguimientoButton = (
        <Button onClick={() => {}} fullWidth>Verifica el estatus de tu solicitud aquí</Button>
    );

    const TabsSection = () => {
        const [value, setValue] = React.useState(0);
        const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

        const arrayTab = ["Ayuda General","Contacta tu tutor"];

        return(
            <Box sx={{ width: '100%', paddingTop: '50px'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{paddingBottom: '40px'}} >
                    {
                        arrayTab.map((tab, i) => <Tab label={tab} value={i} key={i} />)
                    }
                </Tabs>
                <TabPanel value={value} index={0}>
                    <FormAyuda />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FormTutor />                                                              
                </TabPanel>
            </Box>
        )
    };

    return(
        !isMobile 
        ?
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '33px'}}>
                {LogoSection}
                <TituloIcon Titulo={TitleScreen.NUEVA_SOLICITUD} fontSize="h4" />
                <Typography component="span" variant="body2" sx={{textAlign: 'center', paddingBottom: '20px'}}>
                    Esta sala es de uso libre. El único requisito para participar es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global.
                </Typography>
                {SeguimientoButton}
                <TabsSection />
                <Box>
                    <TituloIcon Titulo="Estatus de tu solicitud" fontSize="h4" />
                    
                </Box>
            </Box>
        :
        <>
            sdsad
        </>
    )
}

export default Ayuda;