import React, { useRef } from "react";
import { Box, Divider, Link, Tab, Tabs, tabsClasses, TextField } from "@mui/material";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivosDetalle } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import theme from "../../../theme";

import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Foros } from '../../../assets/icons';
import EastIcon from '@mui/icons-material/East';
import { CheckBoxLabel } from "../../atoms/Checkbox/Checkbox";
import { Loading } from '../../../assets/icons';
import { Tutotria } from '../../../assets/icons';
import { ListaTareas } from '../../../assets/icons';
import { Users } from '../../../assets/icons';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import DsSvgIcon from "../../atoms/Icon/Icon";
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
            { titulo: "Unidad I", actividad: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "Para la resolución del desafío: elaboración de un informe con Power BI deberás realizar lo siguiente: a.    Investigar sobre la aplicación Power BI.b.    Realizar una presentación sobre el concepto, características, ventajas y desventajas de la aplicación.Producto: Presentación en PowerPoint (u otro programa).", status: 'Cursando' },
            { titulo: "Unidad I", actividad: "Actividad Integradora 1", nombre: 'Desafío - Elaboración de un informe con Power BI', contenido: "Para la resolución del desafío: elaboración de un informe con Power BI deberás realizar lo siguiente: a.    Investigar sobre la aplicación Power BI.b.    Realizar una presentación sobre el concepto, características, ventajas y desventajas de la aplicación.Producto: Presentación en PowerPoint (u otro programa).", status: 'Finalizado' },
        ],
        foros: [
            { titulo: "Unidad I", desc: 'Desafío - Elaboración de un informe con Power BI', idForo: "12" },
        ],
        tutorias: [
            { titulo: "Tutoria I", fecha: 'Junio 25, 2025 - 16:00 -hrs', status: "Sin iniciar", desc: "", recuros: "Titulo del recurso", link: "link aqui", grabacion: "lin aqui x2", recursoTitulo: 'tutoria 1' },
        ],
        evaluaciones: [
            { titulo: "Evaluación 1", contenido: 'Desafío - Elaboración de un informe con Power BI' },
        ],
        lista: [
            { lista: 'Contenido', total: 4, hechas: 2 },
            { lista: 'Actividades', total: 4, hechas: 2 },
            { lista: 'Foros', total: 4, hechas: 2 },
            { lista: 'Evaluaciones', total: 4, hechas: 2 },
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

    function Felicidades() {
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <DsSvgIcon component={Users} color={'success'} sxProps={{ display: 'flex', justifyContent: 'center' }} />
                    <Typography component="h2" variant="h2" sxProps={{ color: theme.palette.success.main, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        ¡Felicidades!
                    </Typography>
                    <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>Has terminado esta unidad con éxito.
                    </Typography>
                    <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        Sigue así, cada paso te acerca más a tus metas.
                    </Typography>
                    <Typography component="p" variant="body3" sxProps={{ color: theme.palette.text.primary, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        ¡Nos vemos en la próxima lección!
                    </Typography>
                </Box>
            </>)
    }

    const Contenido = (cursosDatas: any) => (

        cursosDatas.map((temas: string, i: number) => (
            <Accordion key={i} title={temas.titulo} sxProps={{
                backgroundColor: "#F8F8F9",
                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                border: "1px solid #BABABA0D"
            }}>

                <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    Titulo
                </Typography>
                <Box sx={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center", padding: '31px' }}>
                    Aquí se debe mostrar el
                    contenido de la unidad
                </Box>

            </Accordion>
        ))
    )


    const UploadButton = () => {
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleClick = () => {
            fileInputRef.current?.click();
        };

        return (
            <>
                <Button
                    variant="text"
                    onClick={handleClick}
                    icon={<FileUploadIcon />}
                    iconPosition={'start'}
                >
                    Subir archivo…
                </Button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={(event) => console.log(event.target.files)}
                />
            </>
        );
    };

    const Actividades = (cursosDatas: any[]) => {
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '52px' }}>
                    <Button onClick={() => { }} variant="contained" fullWidth >Instrumento de Evaluación</Button>
                    <Button onClick={() => { }} variant="contained" fullWidth >Portada</Button>
                    <Button onClick={() => { }} variant="contained" fullWidth >Manual de Formato APA</Button>
                    <Button onClick={() => { }} variant="contained" fullWidth >Manual de Actividades Integradoras</Button>
                </Box>
                {cursosDatas.map((temas, i) => {
                    // Definir color e ícono según el estado
                    let color: "success" | "primary" | "info" | "warning" | "disabled" | undefined;
                    let icon: any;

                    if (temas.status === "Finalizado") {
                        color = "success";
                        icon = CheckIcon;
                    } else if (temas.status === "Cursando") {
                        color = "warning";
                        icon = Loading;
                    } else if (temas.status === "Sin iniciar") {
                        color = "disabled";
                        icon = LockIcon;
                    } else {
                        color = undefined;
                    }

                    return (
                        <Accordion
                            key={i}
                            title={temas.titulo}
                            sxProps={{
                                backgroundColor: "#F8F8F9",
                                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                                border: "1px solid #BABABA0D",
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}>
                                    {temas.actividad}
                                </Typography>
                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                    {temas.nombre}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'space-between' }}>
                                    <Typography component="span" variant="subtitle1" color={color} >
                                        {temas.status}
                                    </Typography>
                                    <DsSvgIcon component={icon} color={color} />
                                </Box>

                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                    Descripción de tu actividad
                                </Typography>

                                <Typography component="p" variant="body2" sxProps={{ color: theme.palette.text.primary }}>
                                    {temas.contenido}
                                </Typography>
                                <Typography component="p" variant="body2" sxProps={{ color: theme.palette.text.primary }}>
                                    Antes de elaborar tu producto, es necesario que consultes los siguientes archivos:
                                </Typography>

                                <Link href="http://agcollege.edu.mx/literaturas/18/6/Actividad_2_Sistemas_Operativos_I_V4.docx.pdf" target="_blank" rel="noopener" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%', // o el ancho deseado
                                }}>
                                    http://agcollege.edu.mx/literaturas/18/6/Actividad_2_Sistemas_Operativos_I_V4.docx.pdf
                                </Link>

                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                    Entrega de actividad
                                </Typography>

                                <Box sx={{ gap: '8px' }}>
                                    <TextField
                                        placeholder="Text"
                                        label="Comentario"
                                        multiline
                                        rows={5}
                                    />

                                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.grey[200], fontFamily: theme.typography.fontFamily, textAlign: 'right' }}>
                                        0/200
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                        Sube tu archivo aquí
                                    </Typography>

                                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, marginLeft: '5px' }}>(pdf. xml. word, ppt)
                                    </Typography>
                                </Box>

                                {UploadButton()}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    Finalizar Actividad
                                </Button>

                            </Box>
                        </Accordion>
                    );
                })}
            </>
        );
    };

    const Tutorias = (tutorias: any) => (

        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                <TituloIcon key={1} Titulo={'Tutorias'} Icon={Tutotria} />
            </Box>

            {tutorias.map((tutoria: string, i: number) => (
                <Accordion key={i} title={tutoria.titulo} sxProps={{
                    backgroundColor: "#F8F8F9",
                    boxShadow: "0px 2px 4px 0px #6BBBE44D",
                    border: "1px solid #BABABA0D"
                }}>


                    <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.primary.dark, justifyContent: "start", alignItems: "start", textAlign: "start", gap: '10px' }}>
                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}>
                            {tutoria.titulo}
                        </Typography>
                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                            {tutoria.fecha}
                        </Typography>
                        <Typography component="p" variant="body2" color='text.primary'>
                            {tutoria.status}
                        </Typography>

                        <Button onClick={() => { }} variant="contained" fullWidth >Agregar a mi calendario</Button>

                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>                        Descripción
                        </Typography>

                        <Typography component="p" variant="body2" color='text.primary'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>

                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                            Recursos Compartidos
                        </Typography>
                        <Typography component="p" variant="body2" sxProps={{ color: theme.palette.info.main }}>
                            {tutoria.recursoTitulo}
                        </Typography>
                        <Button onClick={() => { }} variant="contained" fullWidth >Acceder Aquí</Button>

                        <Button onClick={() => { }} variant="outlined" fullWidth sxProps={{ color: theme.palette.grey[200] }} >Grabación</Button>

                    </Box>
                </Accordion>
            ))}
        </>
    )

    const ForosOp = (ForosDatas: any) => (

        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                <TituloIcon key={1} Titulo={'Foros'} Icon={Foros} />
            </Box>
            {ForosDatas.map((temas: string, i: number) => (

                <Accordion key={i} title={temas.titulo} sxProps={{
                    backgroundColor: "#F8F8F9",
                    boxShadow: "0px 2px 4px 0px #6BBBE44D",
                    border: "1px solid #BABABA0D"
                }}>

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
                </Accordion>
            ))}</>

    )

    const Evaluaciones = (cursosDatas: any) => (
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

    const ListaPendientes = (lista: any) => (

        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                <TituloIcon key={5} Titulo={'Lista de pendientes'} Icon={ListaTareas} />
            </Box>

            {lista.map((listado: string, i: number) => (
                <>
                    <Divider textAlign="center">
                        <Typography component="span" variant="body2" color="primary">{listado.lista}</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center' }}>

                        {[...Array(4)].map((_, index) => {
                            let auxTitulo = '';
                            let auxChec = false;
                            let auxDisabled = false;
                            if (listado.lista == 'Contenido') {
                                auxTitulo = 'Unidad'
                            } else if (listado.lista == 'Actividades') {
                                auxTitulo = 'Actividad'
                            } else if (listado.lista == 'Foros') {
                                auxTitulo = 'Foros'
                            } else if (listado.lista == 'Evaluaciones') {
                                auxTitulo = 'Evaluaciones'
                            }

                            if (index + 1 <= [...Array(listado.hechas)].length) {
                                auxChec = true;
                                auxDisabled = true;
                            } else {
                                auxChec = false;
                                auxDisabled = false;
                            }

                            return (
                                <CheckBoxLabel
                                    key={index}
                                    text={`${auxTitulo} ${index + 1}`}
                                    place="start"
                                    disabled={auxChec}
                                    defaultChecked={auxDisabled}
                                    sxProps={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        color: theme.palette.primary.main,
                                    }}
                                />
                            );
                        })}


                    </Box>
                </>
            ))}
        </>
    )


    return (
        cursosDatas &&
        cursosDatas.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
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
                <TabPanel key={0} value={value} index={0}>
                    {Contenido(item.temas)}
                    {Felicidades()}
                </TabPanel>

                <TabPanel key={1} value={value} index={1}>
                    {Actividades(item.actividades)}
                </TabPanel>

                <TabPanel key={2} value={value} index={2}>
                    {ForosOp(item.foros)}
                </TabPanel>

                <TabPanel key={3} value={value} index={3}>
                    {Tutorias(item.tutorias)}
                </TabPanel>

                <TabPanel key={4} value={value} index={4}>
                    {Evaluaciones(item.evaluaciones)}
                </TabPanel>

                <TabPanel key={5} value={value} index={5}>
                    {ListaPendientes(item.lista)}
                </TabPanel>
            </Box>
        ))
    );
};

export default CursosActivosDetalles;
