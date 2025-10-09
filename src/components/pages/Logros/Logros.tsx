import React from "react";
import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { MisLogros as iconLogros } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, CircularProgress, Divider, Tab, Tabs, tabsClasses, useMediaQuery } from "@mui/material";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { innerHTMLStyle } from "@styles";
import { LinearProgressWithLabel } from '../../molecules/LinearProgress/LinearProgress';
import medalla from "../../../assets/medalla_principal.png";
import Button from "../../atoms/Button/Button";
import theme from '../../../themes/theme';
import themeCoppel from '../../../themes/coppel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsigniaBasica from '../../../assets/IconsCustomize/insignia_basica.svg';
import Clasificacion from '../../../assets/clasificacion.svg';
import { loadConfig } from "../../../config/configStorage";
import { styled } from '@mui/material/styles';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { DescripcionesPantallas } from '@constants';


const Logros: React.FC = () => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: Logros, isLoading } = useGetDatosModulos(ModulosCampusIds.LOGROS);
    const [config, setConfig] = React.useState<any>(null);
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            color: 'black',
            fontWeight: 'bold',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: 'none',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const LogrosCards: React.FC<{ horas: string, tipo: string, color: string }> = ({ horas, tipo, color }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', width: isMobile ? '345px' : '188px', height: '92px', backgroundColor: color, borderRadius: '8px', marginBottom: '32px', marginTop: '36px', boxShadow: '0 4px 8px 0 rgba(107, 187, 228, 0.40)' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <Typography component="h4" variant="h4" sxProps={{ color: '#fff' }}> {horas} </Typography>
                    <Typography component="h4" variant="h4" sxProps={{ color: '#fff' }}> Horas  </Typography>
                </Box>
                <Typography component="h4" variant="h4" sxProps={{ color: '#fff' }}> {tipo} </Typography>
            </Box>
        );
    }

    const Medalla: React.FC<{ nivel: string, progreso: string }> = ({ nivel, progreso }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%' }}>
                <Box
                    component="img"
                    src={medalla}
                    alt="medalla"
                />
                <Typography component="h2" variant="h2" color="primary"> {nivel} </Typography>
                <Typography component="span" variant="body1" color="text" sxProps={{ textAlign: 'center' }}>
                    Nivel: ¡Sigue asi, estas a pocos pasos de llegar al siguiente nivel!
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel
                        value={Number(progreso)}
                        barColor={'#D9A514'}
                        trackColor="#AAB1B6"
                    />
                </Box>
            </Box>
        );
    }

    const Insignia = (racha: string, fecha: string) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', maxWidth: '276px', padding: '10px', }}>
                <Box
                    component="img"
                    src={medalla}
                    alt="medalla"
                    sx={{ width: '59px' }}
                />
                <Typography component="h4" variant="h4" color="primary"> {racha} </Typography>
                <Typography component="span" variant="body1" color="text" sxProps={{ textAlign: 'center' }}>
                    Ganaste esta insignia 3 veces, por tener una racha de 10 días en plataforma.
                </Typography>
                <Typography component="span" variant="body1" color="primary" sxProps={{ textAlign: 'center' }}>
                    Más Reciente: {fecha}
                </Typography>
            </Box>
        );
    }

    const Certificaciones = (cv: string, download: string) => (
        <>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mt: 1, gap: 2 }}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component="span" variant="body3" color="text"> Agosto 27 / 2025 </Typography>
                    <Typography component="h5" variant="h5" color="primary"> Certificación en (Nombre Aquí) </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '350px' }}>
                    <Button onClick={() => handleAddCv(cv)} sxProps={{ width: '165px' }} variant="outlined">
                        Agregar a mi CV
                    </Button>
                    <Button onClick={() => handleDescargar(download)} sxProps={{ width: '140px' }}>
                        Descargar
                    </Button>
                </Box>
            </Box>

            <Divider />
        </>
    );

    const handleAddCv = (cv: string) => {
        console.log(cv)
    }
    const handleDescargar = (download: string) => {
        console.log(download)
    }

    const tabs = (recursos: any) => {
        return <>
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
                    <Tab sx={{ minWidth: '150px', padding: '0px' }} label="Mis Certificaciones" />
                    <Tab sx={{ minWidth: '150px', padding: '0px' }} label="Mis Insignias" />
                    <Tab sx={{ minWidth: '150px', padding: '0px' }} label="Mi Clasificación" />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: '100%', m: 1, gap: '30px' }}>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.secondary }}> Mis Certificaciones  </Typography><ArrowForwardIosIcon />
                    </Box>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 4 }}>
                        {Certificaciones('cv', 'download')}
                        {Certificaciones('cv', 'download')}
                    </Box>
                </Box>

            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#F1F4F6', borderRadius: '20px' }}>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between', gap: 4, m: 2 }}>

                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2 }}>
                            <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.secondary }}> Mis Insignias  </Typography><ArrowForwardIosIcon />
                        </Box>

                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'black', padding: '10px', borderRadius: '10px' }}>
                            <Typography component="span" variant="body3" sxProps={{ color: '#fff' }}> 21  </Typography>
                            <Box
                                component="img"
                                src={InsigniaBasica}
                                alt="medalla"
                                sx={{ width: '25px', height: '25px' }}
                            />
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignContent: 'center', width: '100%', backgroundColor: '#F1F4F6', flexWrap: 'wrap', p: 1, marginBottom: '50px' }}>
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                        {Insignia("Racha de 10", "27/09/25")}
                    </Box>

                </Box>
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#F1F4F6', height: '350px', borderRadius: '20px' }}>
                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, m: 2 }}>
                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2 }}>
                            <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.secondary }}> Clasificación General </Typography><ArrowForwardIosIcon />
                        </Box>

                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2, backgroundColor: 'black', padding: '10px 30px', borderRadius: '10px' }}>
                            <Typography component="span" variant="body3" sxProps={{ color: '#fff' }}>No. 123</Typography>
                            <Box
                                component="img"
                                src={Clasificacion}
                                alt="medalla"
                                sx={{ width: '25px', height: '25px' }}
                            />
                        </Box>

                    </Box>

                    <TableContainer component={Paper} sx={{ backgroundColor: '#F1F4F6' }}>
                        <Table sx={{ minWidth: 313 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Posición</StyledTableCell>
                                    <StyledTableCell align="center">Usuario</StyledTableCell>
                                    <StyledTableCell align="center">Total de insignias</StyledTableCell>
                                    <StyledTableCell align="center">Certificaciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {recursos.map((row: any, i: number) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell align="center">{row.recurso}</StyledTableCell>
                                        <StyledTableCell align="center">{row.valor}</StyledTableCell>
                                        <StyledTableCell align="center">{row.calificacion}</StyledTableCell>
                                        <StyledTableCell align="center">{row.calificacion}</StyledTableCell>
                                    </StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </TabPanel>
        </>
    }

    const recursos = [
        { recurso: 'Video introductorio', valor: 'https://youtu.be/abc123', calificacion: 9.5 },
        { recurso: 'PDF de la unidad 1', valor: 'https://misitio.com/unidad1.pdf', calificacion: 8.0 },
        { recurso: 'Presentación PowerPoint', valor: 'https://misitio.com/slides.pptx', calificacion: 7.3 },
        { recurso: 'Enlace a foro de discusión', valor: 'https://foro.academiaglobal.mx', calificacion: 10 },
        { recurso: 'Quiz de repaso', valor: 'https://misitio.com/quiz', calificacion: 6.5 },
    ];

    const Insignias = (

        isLoading
            ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '50vh', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography component="h4" variant="h4" color="primary">
                    Cargando logros...
                </Typography>
            </Box>
            :
            <Box>
                <TituloIcon Titulo={TitleScreen.LOGROS} fontSize="h2" />
                <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: Logros?.data?.descripcion_html ?? DescripcionesPantallas.LOGROS }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={
                        [
                            { display: 'flex' },
                            !isMobile && { gap: '30px', flexDirection: 'row' },
                            isMobile && { flexDirection: 'column', justifyContent: 'center', width: '345px' }
                        ]
                    }>
                        <LogrosCards horas="125" tipo="En plataforma" color={config?.data.color_primary} />
                        <LogrosCards horas="5" tipo="Certificaciones" color={themeCoppel.palette.primary.main} />
                        <LogrosCards horas="5" tipo="Concluidos" color={themeCoppel.palette.primary.main} />
                    </Box>
                </Box>
            </Box>
    );

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        isMobile
            ?
            <>
                {Insignias}
                {tabs(recursos)}
            </>
            :
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
                    <Box sx={{ display: 'flex' }}>
                        {Insignias}
                        <Box>
                            <Medalla nivel="Nivel: Avanzado" progreso="80" />
                        </Box>
                    </Box>
                    {tabs(recursos)}
                </Box>
            </>
    );
};

export default Logros;