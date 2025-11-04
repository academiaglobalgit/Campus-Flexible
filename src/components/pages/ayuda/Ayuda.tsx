import { Box, Grid, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";

import Logo from '../../../assets/logo_ag.svg';
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { TitleScreen, type EstadoTicket } from "@constants";
import Button from "../../atoms/Button/Button";
import React, { useRef } from "react";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { FormAyuda } from "./FormAyuda";
import { FormTutor } from "./FormTutor";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetAyudaTickets } from "../../../services/AyudaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { FormatearFecha } from "../../../utils/Helpers";
import { useAuth } from "../../../hooks";
import { usePlanEstudio } from "../../../context/PlanEstudioContext";

const Ayuda: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const sectionRef = useRef<HTMLDivElement>(null);
    const { configPlataforma } = useAuth();
    const { config: configPlanEstudio, isInAnyPlan } = usePlanEstudio();
    const { data: Tickets, isLoading } = useGetAyudaTickets();
    const [verTutorias, setVerTutorias] = React.useState<boolean>(false);

    const handleScroll = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

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

        const defaultTabs = ["Ayuda General", "Contacto con docente"];
        const arrayTab = configPlanEstudio?.getTabsAyuda(defaultTabs) || defaultTabs;
        setVerTutorias(!isInAnyPlan());

        return (
            <Box sx={{ width: '100%', paddingTop: '50px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        arrayTab.map((tab, i) => <Tab label={tab} value={i} key={i} />)
                    }
                </Tabs>
                <Box sx={{ paddingTop: '20px' }}>
                    <TabPanel value={value} index={0}>
                        <FormAyuda isLogin={false} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FormTutor />
                    </TabPanel>
                </Box>
            </Box>
        )
    };

    const EstatusTabContent = (titulo: string, items: EstadoTicket[]) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px', overflow: 'auto', height: '600px', overflowX: 'hidden' }}>
            <Typography component="h4" variant="h4">
                {titulo}
            </Typography>
            {
                items && items.map((item, i) => <CardStatus {...item} key={i} />)
            }
        </Box>
    );

    const CardStatus: React.FC<EstadoTicket> = (item) => {
        return (
            <Box sx={{ borderBottom: '1px solid #AAB1B6', minHeight: '149px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <Typography component="span" variant="body2">
                        {item.folio_seguimiento}
                    </Typography>
                    <Typography component="span" variant="body1" color="textDisabled">
                        {FormatearFecha(item.fecha_creacion)}
                    </Typography>
                </Box>
                <Typography component="h4" variant="h4" color="primary">
                    {
                        item.estado === "Resuelto" ? <Stack>
                            <Typography component="h4" variant="h4" color="primary">{item.tema_ayuda}</Typography>
                            <Typography component="span" variant="body1" color="success">COMPLETO</Typography>
                        </Stack>
                            :
                            item.tema_ayuda
                    }
                </Typography>
                <Typography component="span" variant="body2">
                    {item.mensaje}
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

        return (
            <Box sx={{ width: '100%' }}>
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
                                color: i % 2 === 0 ? '#D9A514' : '#1F7B5C',
                            }
                        }} />)
                    }
                </Tabs>
                <TabPanel value={value} index={0}>
                    {
                        !isLoading ? EstatusTabContent('No. de Solicitud y titulo', Tickets?.data.Abierto ?? []) : <LoadingCircular Text="Cargando Solicitudes..." />
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {
                        !isLoading ? EstatusTabContent('Solicitudes Pasadas', Tickets?.data.Resuelto ?? []) : <LoadingCircular Text="Cargando Solicitudes..." />
                    }
                </TabPanel>
            </Box>
        )
    };

    return (
        isMobile
            ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '33px' }}>
                {LogoSection}
                <TituloIcon Titulo={TitleScreen.NUEVA_SOLICITUD} fontSize="h4" />
                <Typography component="span" variant="body2" sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                    Esta sala es de uso libre. El único requisito para participar es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global.
                </Typography>
                {SeguimientoButton}
                <TabsSection />
                {verTutorias &&
                    <Box sx={{ width: '100%', paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={sectionRef}>
                        <TituloIcon Titulo="Estatus de tu solicitud" fontSize="h4" />
                        <TabsStatusSection />
                    </Box>
                }
            </Box>
            :
            <ContainerDesktop title="">
                <Grid container sx={{ alignItems: 'center' }} spacing={5}>
                    <Grid size={{ md: 6 }}>
                        <TituloIcon Titulo={TitleScreen.NUEVA_SOLICITUD} fontSize="h2" />
                        <Typography component="span" variant="body2" sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                            Esta sala es de uso libre. El único requisito para participar es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global.
                        </Typography>
                        <TabsSection />
                    </Grid>
                    <Grid size={{ md: 6 }}>
                        {verTutorias &&
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 30px 50px 30px', borderRadius: '20px', backgroundColor: '#F8F8F9' }}>
                                <TituloIcon Titulo="Estatus de tu solicitud" fontSize="h4" />
                                <TabsStatusSection />
                            </Box>}
                    </Grid>
                </Grid>
            </ContainerDesktop>
    )
}

export default Ayuda;