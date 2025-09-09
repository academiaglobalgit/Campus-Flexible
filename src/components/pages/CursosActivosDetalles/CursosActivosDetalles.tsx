import React from "react";
import { Box, Divider, Tab, Tabs, tabsClasses, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivosDetalle } from "@iconsCustomizeds";

import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Contenido } from "./Contenido";
import { Actividades } from "./Actividades";
import { ForosCursos } from "./ForosCursos";
import { Evaluaciones } from "./Evaluaciones";
import { Tutorias } from "./Tutorias";
import { ListaPendientes } from "./ListaPendientes";
import { getCursoSelected, getTabSelected, setTabSelected } from "../../../hooks/useLocalStorage";
import { useAuth } from "../../../hooks";

let CursosTabs = [
    { id: 1, tab: 'Contenido', content: <Contenido /> },
    { id: 2, tab: 'Actividades', content: <Actividades /> },
    { id: 3, tab: 'Foros', content: <ForosCursos /> },
    { id: 4, tab: 'Clases', content: <Tutorias /> },
    { id: 5, tab: 'Evaluaciones', content: <Evaluaciones /> },
    { id: 6, tab: 'Lista de pendientes', content: <ListaPendientes /> },
];

const CursosActivosDetalles: React.FC = () => {
    const theme = useTheme();
    const { configPlataforma } = useAuth();
    const curso = JSON.parse(getCursoSelected() || '{}');
    const [value, setValue] = React.useState(0);
    const [verContenidoDescargable, setContenidoDescargable] = React.useState(true);
    const [tabs, setTabs] = React.useState(CursosTabs);

    React.useEffect(() => {
        const indexTab = getTabSelected('cursos-detalle');
        setValue(indexTab);

        switch (configPlataforma?.id_plan_estudio) {
            case 17: // Diplomados
                CursosTabs = CursosTabs.filter(item => item.id !== 4 && item.id !== 5 && item.id !== 3); // Remover Foros y Evaluaciones
                /* CursosTabs = CursosTabs.map((item) => {
                    if(item.id === 3) { // Foros
                        return { ...item, tab: 'Momentos' };
                    }
                    return item;
                }); */
                setTabs(CursosTabs);
                setContenidoDescargable(false)
                break;
        }

    }, []);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabSelected({ tab: 'cursos-detalle', index: newValue });
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                            tabs.map((item, i) => <Tab label={item.tab} value={i} key={i} sx={{ minWidth: '150px', padding: '0px' }} />)
                        }
                    </Tabs>
                </Box>
                {
                    tabs.map((tab, i) => (
                        <TabPanel key={i} value={value} index={i}>
                            <Box sx={{ pt: 2 }}>
                                {tab.content}
                            </Box>
                        </TabPanel>
                    ))
                }
            </>
        </Box>
    )
};

export default CursosActivosDetalles;
