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

const CursosTabs = [
    { tab: 'Contenido', content: <Contenido /> },
    { tab: 'Actividades', content: <Actividades /> },
    { tab: 'Foros', content: <ForosCursos /> },
    { tab: 'Clases', content: <Tutorias /> },
    { tab: 'Evaluaciones', content: <Evaluaciones /> },
    { tab: 'Lista de pendientes', content: <ListaPendientes /> },
];

const CursosActivosDetalles: React.FC = () => {
    const theme = useTheme();
    const curso = JSON.parse(getCursoSelected());
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const indexTab = getTabSelected('cursos-detalle');
        setValue(indexTab);
    },[]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabSelected({tab: 'cursos-detalle', index: newValue});
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
                        No iniciado
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
                <Typography component="span" variant="body2" color="primary" sxProps={{ color: theme.palette.primary.dark }}>Clic para descargar contenido</Typography>
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
                            CursosTabs.map((item, i) => <Tab label={item.tab} value={i} key={i} sx={{ minWidth: '150px', padding: '0px' }} />)
                        }
                    </Tabs>
                </Box>
                {
                    CursosTabs.map((tab, i) => (
                        <TabPanel key={i} value={value} index={i}>
                            <Box sx={{pt:2}}>
                                { tab.content }
                            </Box>
                        </TabPanel>
                    ))
                }
            </>
        </Box>
    )
};

export default CursosActivosDetalles;
