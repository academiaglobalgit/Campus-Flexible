import React from "react";
import { Box, Divider, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivosDetalle } from "@iconsCustomizeds";

import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Contenido } from "./Contenido";
import { Actividades } from "./Actividades";
import { ForosCursos } from "./ForosCursos";
import { Evaluaciones } from "./Evaluaciones";
import { Tutorias } from "./Tutorias";
import { getCursoSelected, getTabSelected, setTabSelected } from "../../../hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
import { ListaPendientesDrawer } from "./ListaPendientesDrawer";
import { usePlanEstudio } from "../../../context/PlanEstudioContext";

const CursosTabs = [
    { id: 1, tab: 'Actividades', content: <Actividades />, hidden: false, order: 2 },
    { id: 6, tab: 'Clases', content: <Tutorias />, hidden: false, order: 4 },
    { id: 3, tab: 'Contenido', content: <Contenido />, hidden: false, order: 1 },
    { id: 2, tab: 'Evaluaciones', content: <Evaluaciones />, hidden: false, order: 5 },
    { id: 5, tab: 'Foros', content: <ForosCursos />, hidden: false, order: 3 },
];

const CursosActivosDetalles: React.FC = () => {
    const theme = useTheme();
    const { config: configPlanEstudio } = usePlanEstudio();
    const curso = JSON.parse(getCursoSelected() || '{}');
    const [value, setValue] = React.useState(1);
    const [verContenidoDescargable, setContenidoDescargable] = React.useState(true);
    const [tabs, setTabs] = React.useState(CursosTabs);
    const is1366 = useMediaQuery('(width: 1366px)');
    const location = useLocation();
    const incomingTabId = location.state?.tab;

    React.useEffect(() => {
        const indexTab = getTabSelected('cursos-detalle');

        // if (!configPlataforma) return;
        
        const config = configPlanEstudio?.hiddenTabsCursosActivosDetalles();

        if (config) {
            setTabs(
                CursosTabs.map(item => ({
                    ...item,
                    hidden: config.hiddenTabs.includes(item.id),
                }))
            );
            setContenidoDescargable(config.allowDownload);
        }

        const visibleTabs = CursosTabs.filter(tab => !config?.hiddenTabs.includes(tab.id));
        const targetTabId = incomingTabId ?? indexTab;
        const targetTab = visibleTabs.find(tab => tab.id === targetTabId);

        // si no se encuentra el tab visible selecciona Contenido, que tiene id 3
        // este recurso esta siempre visible en todos los programas
        setValue(targetTab?.id ?? 3);
        
    }, [configPlanEstudio, incomingTabId ]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        const tab = tabs.find(tab => tab.id === newValue);
        setTabSelected({ tab: 'cursos-detalle', index: tab?.id ?? 3 });
        setValue(newValue);
    };

    function MultiColorBar() {
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    height: 5,
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    margin: '10px'
                }}>
                    <Box sx={{ flex: 2, bgcolor: '#7B8186' }} />
                    <Box sx={{ flex: 2, bgcolor: '#D9A514' }} />
                    <Box sx={{ flex: 2, bgcolor: '#1F7B5C' }} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', width: '100%', marginBottom: '23px' }}>

                    <Typography component="span" variant="body3" sxProps={{ color: theme.palette.primary.main }}>
                        Sin Iniciar
                    </Typography>
                    <Typography component="span" variant="body3" sxProps={{ color: theme.palette.primary.main }}>
                        En Curso
                    </Typography>
                    <Typography component="span" variant="body3" sxProps={{ color: theme.palette.primary.main }}>
                        Finalizado
                    </Typography>
                </Box>
            </>
        );
    }

    const goToTab = (tabIndex: number) => {
        setValue(tabIndex);
        setTabSelected({ tab: 'cursos-detalle', index: tabIndex });
    };

    // function Felicidades() {
    //     return (
    //         <>
    //             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
    //                 <DsSvgIcon component={Users} color={'success'} sxProps={{ display: 'flex', justifyContent: 'center' }} />
    //                 <Typography component="h2" variant="h2" sxProps={{ color: theme.palette.success.main, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    //                     ¡Felicidades!
    //                 </Typography>
    //                 <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>Has terminado esta unidad con éxito.
    //                 </Typography>
    //                 <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    //                     Sigue así, cada paso te acerca más a tus metas.
    //                 </Typography>
    //                 <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    //                     ¡Nos vemos en la próxima lección!
    //                 </Typography>
    //             </Box>
    //         </>)
    // }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: { md: (is1366 ? '80%' : '100%') }, 
            }}
        >
            <TituloIcon Titulo={curso.titulo} Icon={CursosActivosDetalle} />
            <Box sx={{ pl: '30px' }} >
                {
                    verContenidoDescargable &&  <Typography component="span" variant="body2" color="primary" sxProps={{ color: theme.palette.primary.dark }}>Clic para descargar contenido</Typography>
                }
            </Box>

            <Divider textAlign="center">
                <Typography component="span" variant="body2" color="primary">Control de avance</Typography>
            </Divider>
            <Typography component="p" variant="body1" sxProps={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                El estado de tu progreso dependerá de los elementos que hayas completado y se representará mediante uno de los siguientes colores:
            </Typography>

            {MultiColorBar()}

            <>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="visible arrows tabs example"
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                        }}
                    >
                        {
                            tabs
                                .filter(item => !item.hidden)
                                .sort((a, b) => a.order - b.order)
                                .map((item) =>
                                    <Tab label={item.tab} value={item.id} key={item.id} sx={{ minWidth: '150px', padding: '0px' }} />
                                )
                        }
                    </Tabs>
                </Box>
                {
                    tabs
                        .filter(tab => !tab.hidden)
                        .sort((a, b) => a.order - b.order)
                        .map((tab) => (
                            <TabPanel key={tab.id} value={value} index={tab.id}>
                                <Box sx={{ pt: 2 }}>
                                    {tab.content}
                                </Box>
                            </TabPanel>
                        ))
                }
            </>
            <ListaPendientesDrawer goToTab={goToTab} />
        </Box>
    )
};

export default CursosActivosDetalles;
