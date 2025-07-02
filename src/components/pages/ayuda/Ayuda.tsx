import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";

import Logo from '../../../assets/logo_ag.svg';
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { TitleScreen } from "@constants";
import Button from "../../atoms/Button/Button";
import React, { useRef } from "react";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { FormAyuda } from "./FormAyuda";
import { FormTutor } from "./FormTutor";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const Ayuda: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const solicitudesProceso = [
        {folio: 20147, asunto: 'Certificado', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {folio: 20148, asunto: 'Credencial', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {folio: 20149, asunto: 'Extraordinario', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    ];
    const solicitudesFinalizadas = [
        {folio: 20147, asunto: 'Certificado', descripcion: 'Completado'},
        {folio: 20148, asunto: 'Credencial', descripcion: 'Completado'},
        {folio: 20149, asunto: 'Extraordinario', descripcion: 'Completado'},
    ];

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
        <Button onClick={handleScroll} fullWidth>Verifica el estatus de tu solicitud aquí</Button>
    );

    const TabsSection: React.FC = () => {
        const [value, setValue] = React.useState(0);
        const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

        const arrayTab = ["Ayuda General","Contacto con tutor"];

        return(
            <Box sx={{ width: '100%', paddingTop: '50px'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        arrayTab.map((tab, i) => <Tab label={tab} value={i} key={i} />)
                    }
                </Tabs>
                <Box sx={{paddingTop: '20px'}}>
                    <TabPanel value={value} index={0}>
                        <FormAyuda />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FormTutor />
                    </TabPanel>
                </Box>
            </Box>
        )
    };

    const EstatusTabContent = (titulo: string, items: any[]) => (
        <Box sx={{display: 'flex', flexDirection:'column', gap:'20px', paddingTop: '20px' }}>
            <Typography component="h4" variant="h4">
                {titulo}
            </Typography>
            {
                items && items.map((item, i) => <CardStatus {...item} key={i} />)
            }
        </Box>
    );

    const CardStatus: React.FC<{ folio: number, asunto: string, descripcion: string }> = (item) => {
        return(
            <Box sx={{borderBottom: '1px solid #AAB1B6', minHeight: '149px'}}>
                <Typography component="span" variant="body2">
                    {item.folio}
                </Typography>
                <Typography component="h4" variant="h4" color="primary">
                    {item.asunto}
                </Typography>
                <Typography component="span" variant="body2">
                    {item.descripcion}
                </Typography>
            </Box>
        );
    }

    const TabsStatusSection: React.FC = () => {
        const [value, setValue] = React.useState(0);
        const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

        const arrayTab = ["En Proceso", "Finalizadas"];

        return(
            <Box sx={{ width: '100%'}}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                    slotProps={{
                        indicator: {
                            style: {
                                backgroundColor: value === 0 ? '#D9A514' : '#1F7B5C',
                            }
                        }
                    }}
                >
                    {
                        arrayTab.map((tab, i) => <Tab label={tab} value={i} key={i} sx={{
                            '&.Mui-selected': {
                                color: i % 2 === 0 ? '#D9A514': '#1F7B5C', 
                            }
                        }}/>)
                    }
                </Tabs>
                <TabPanel value={value} index={0}>
                    {EstatusTabContent('No. de Solicitud y titulo', solicitudesProceso)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {EstatusTabContent('Solicitudes Pasadas', solicitudesFinalizadas)}
                </TabPanel>
            </Box>
        )
    };

    return(
        isMobile 
        ?
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '33px'}}>
                {LogoSection}
                <TituloIcon Titulo={TitleScreen.NUEVA_SOLICITUD} fontSize="h4" />
                <Typography component="span" variant="body2" sx={{textAlign: 'center', paddingBottom: '20px'}}>
                    Esta sala es de uso libre. El único requisito para participar es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global.
                </Typography>
                {SeguimientoButton}
                <TabsSection />
                <Box sx={{ width: '100%', paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center'}} ref={sectionRef}>
                    <TituloIcon Titulo="Estatus de tu solicitud" fontSize="h4"/>
                    <TabsStatusSection />
                </Box>
            </Box>
        :
            <ContainerDesktop title="">
              <Grid container sx={{ alignItems:'center'}} spacing={5}>
                     <Grid size={{md: 6}}>
                         <TituloIcon Titulo={TitleScreen.NUEVA_SOLICITUD} fontSize="h2" />
                         <Typography component="span" variant="body2" sx={{textAlign: 'center', paddingBottom: '20px'}}>
                             Esta sala es de uso libre. El único requisito para participar es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global.
                         </Typography>
                         <TabsSection />
                     </Grid>
                     <Grid size={{md: 6}}>
                         <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 30px 50px 30px', borderRadius: '20px', backgroundColor: '#F8F8F9'}}>
                             <TituloIcon Titulo="Estatus de tu solicitud" fontSize="h4"/>
                             <TabsStatusSection />
                         </Box>
                     </Grid>
                 </Grid>
            </ContainerDesktop>
    )
}

export default Ayuda;