import React from "react";
import { Box, Divider, Tab, Tabs, tabsClasses } from "@mui/material";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivosDetalle } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import theme from "../../../theme";

import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Foros } from '../../../assets/icons';
import EastIcon from '@mui/icons-material/East';
//import { useParams } from "react-router-dom";
//import { useGetCursos, useGetCursosById } from "../../../services/CursosActivosService";

const cursosDatas = [
    {
        materia: "Práctica y Colaboración Ciudadana I",
        temas: [
            { titulo: "Unidad I", proceso: 80, status: "Finalizado" },
            { titulo: "Unidad II", proceso: 80, status: "Cursando" },
            { titulo: "Unidad III", proceso: 80, status: "No iniciado" },
            { titulo: "Unidad IV", proceso: 80, status: "No iniciado" },
        ],
        actividades: [
            { titulo: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "" },
        ],
        foros: [
            { titulo: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "" },
        ],
        tutorias: [
            { titulo: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "" },
        ],
        evaluaciones: [
            { titulo: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "" },
        ],
        lista: [
            { titulo: "Tutoria", fecha: 'Junio 25, 2025 - 16:00 -hrs', status: "Sin iniciar", desc: "", recuros: "Titulo del recurso", link: "link aqui", grabacion: "lin aqui x2" },
        ]
    },
];


const CursosActivosDetalles: React.FC = () => {

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);

    //const {id} = useParams<{id:string}>();
    //const {data} = useGetCursosById(Number(id!));
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

    const Contenido = (cursosDatas: any) => (

        cursosDatas.map((temas: string, i: number) => (
            <Accordion key={i} title={temas.titulo} sxProps={{
                backgroundColor: "#F8F8F9",
                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                border: "1px solid #BABABA0D"
            }}>

                <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center" }}>Titulo
                </Typography>
                <Box sx={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center", padding: '31px' }}>
                    Aquí se debe mostrar el
                    contenido de la unidad
                </Box>

            </Accordion>
        ))
    )

    const Actividades = (cursosDatas: any) => (

        cursosDatas.map((temas: string, i: number) => (
            <Accordion key={i} title={temas.titulo} sxProps={{
                backgroundColor: "#F8F8F9",
                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                border: "1px solid #BABABA0D"
            }}>

                <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center" }}>Titulo
                </Typography>
                <Box sx={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center", padding: '31px' }}>
                    Aquí se debe mostrar el
                    contenido de la unidad
                </Box>

            </Accordion>
        ))
    )


    return (

        cursosDatas &&
        cursosDatas.map((item, index) => (
            <Box key={index} sx={{ width: { md: '90vw' }, display: 'flex', flexDirection: 'column' }}>
                <TituloIcon key={index} Titulo={item.materia} Icon={CursosActivosDetalle} />
                <Box sx={{
                    paddingLeft: '30px', fontFamily: 'Gotham', fontSize: '28px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                }} >
                    <Typography component="span" variant="body2" color="primary" sxProps={{ color: theme.palette.primary.dark }}>Click para descargar contenido</Typography>
                </Box>

                <Divider textAlign="center">
                    <Typography component="span" variant="body2" color="primary">Control de avance</Typography>
                </Divider>
                <Typography component="p" variant="body1" sxProps={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    El estado de tu progreso dependerá de los elementos que hayas completado y se representará mediante uno de los siguientes colores:
                </Typography>
                {MultiColorBar()}

                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                    }}
                >
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
                        <Tab label="Contenido" key={1} sx={{ minWidth: '150px', padding: '0px' }} />
                        <Tab label="Actividades" sx={{ minWidth: '150px', padding: '0px' }} />
                        <Tab label="Foros" sx={{ minWidth: '150px', padding: '0px' }} />
                        <Tab label="Tutorias" sx={{ minWidth: '150px', padding: '0px' }} />
                        <Tab label="Evaluaciones" sx={{ minWidth: '150px', padding: '0px' }} />
                        <Tab label="Lista de pendientes" sx={{ minWidth: '150px', padding: '0px' }} />

                    </Tabs>
                </Box>
                <TabPanel key={1} value={value} index={0}>
                    <Box sx={{ mt: 5 }}>
                        {Contenido(item.temas)}
                    </Box>
                </TabPanel>

                <TabPanel key={2} value={value} index={1}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
                        <Button onClick={() => { }} variant="contained" fullWidth >Instrumento de Evaluación</Button>
                        <Button onClick={() => { }} variant="contained" fullWidth >Portada</Button>
                        <Button onClick={() => { }} variant="contained" fullWidth >Manual de Formato APA</Button>
                        <Button onClick={() => { }} variant="contained" fullWidth >Manual de Actividades Integradoras</Button>
                    </Box>
                </TabPanel>

                <TabPanel key={3} value={value} index={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                        <TituloIcon key={index} Titulo={'Foros'} Icon={Foros} />
                    </Box>
                    <Button onClick={() => { }} variant="outlined" fullWidth >Instrumento de Evaluación</Button>
                    <Divider textAlign="center">
                        <Typography component="span" variant="body2" color="primary">Unidad</Typography>
                    </Divider>
                    <Typography component="p" variant="body2" color='text.primary'>
                        Participa en el foro enviando imágenes que demuestren que ya tienes acceso a las siguientes herramientas en su versión de prueba:
                    </Typography>
                    <ul>
                        <li>Sistema operativo Linux</li>
                    </ul>
                    <Button onClick={() => { }} variant="outlined" fullWidth iconPosition={'end'} icon={<EastIcon />}>Entrar al foro</Button>
                </TabPanel>
            </Box>
        ))
    );
};

export default CursosActivosDetalles;
