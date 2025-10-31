import React from "react";
import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { MisLogros as iconLogros } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Card, CircularProgress, Divider, LinearProgress, Tab, Tabs, tabsClasses, useMediaQuery } from "@mui/material";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { innerHTMLStyle } from "@styles";
import medallaOro from "../../../assets/medalla_oro.png";
import medallaPlata from "../../../assets/medalla_plata.png";
import medallaBronce from "../../../assets/medalla_bronce.png";
import Button from "../../atoms/Button/Button";
import theme from '../../../themes/theme';
//import themeCoppel from '../../../themes/coppel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetCalificaciones } from '../../../services/CalificacionesService';
import InsigniaBasica from '../../../assets/IconsCustomize/insignia_basica.svg';
import Clasificacion from '../../../assets/clasificacion.svg';
//import { loadConfig } from "../../../config/configStorage";
import { styled } from '@mui/material/styles';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { formatFechaBonita } from "../../../utils/Helpers";
import { DescripcionesPantallas } from '@constants';
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

interface MedallaProps {
    nivel: string;
    progreso: string | number;
}

type statsCard = {
    title: string,
    description: string,
    color?: string,
}

const Logros: React.FC = () => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: Logros, isLoading } = useGetDatosModulos(ModulosCampusIds.LOGROS);
    const { data: calificacionData, isLoading: isLoadingCertis } = useGetCalificaciones();
    //const [config, setConfig] = React.useState<any>(null);
    const [value, setValue] = React.useState(0);

    /* React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []); */

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

    const Medalla: React.FC<MedallaProps> = ({ nivel, progreso }) => {
        const puntos = Number(progreso);

        let medallaSrc = medallaBronce;
        let mensaje = "";

        if (puntos <= 3000) {
            mensaje = "¡Sigue asi, estas a pocos pasos de llegar al siguiente nivel!";
        }
        if (puntos > 3000) {
            medallaSrc = medallaOro;
            mensaje = "¡Increíble! Has alcanzado el nivel Avanzado";
        } else if (puntos > 1500) {
            medallaSrc = medallaPlata;
            mensaje = "¡Excelente! Estás en el nivel Intermedio";
        }

        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: isMobile ? '90%' : "386px",
                    textAlign: "center",
                }}
            >
                <Box component="img" src={medallaSrc} alt="medalla" sx={{ marginBottom: '10px' }} />

                <Typography component="h2" variant="h5" color="primary">
                    Nivel: {nivel}
                </Typography>

                <Typography component="span" variant="body2" color="text">
                    {mensaje}
                </Typography>

                <Box sx={{ width: "100%", mt: 2 }}>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(puntos / 4600 * 100, 100)}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#AAB1B6",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#D9A514",
                                borderRadius: 5,
                            },
                        }}
                    />
                </Box>
            </Box>
        );
    };

    const Insignia = (racha: string, fecha: string) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '276px', padding: '10px', }}>
                <Box
                    component="img"
                    src={medallaBronce}
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

    const Certificaciones = (title: string, fecha: string, download: string) => (
        <>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 2 }}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    {
                        fecha === null ? <Typography component="span" variant={isMobile ? 'body2' : 'h4'} color={'disabled'} >
                            Sin iniciar
                        </Typography> :
                            <Typography component="span" variant="body3" color="text"> {formatFechaBonita(fecha)} </Typography>
                    }
                    <Typography component="h5" variant="h5" color="primary"> Certificación en {title} </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: '350px' }}>

                    <Button disabled={download === null || download === '' ? true : false} onClick={() => handleDescargar(download)} sxProps={{ width: '140px' }}>
                        Ver detalles
                    </Button>
                </Box>
            </Box>

            <Divider />
        </>
    );

    const handleDescargar = (download: string) => {
        if (!download) return;

        const link = document.createElement("a");
        link.href = download;
        link.setAttribute("download", "");
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = (recursos: any) => {
        return <>
            <Box sx={{ display: 'flex' }}>
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
                {isLoadingCertis ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            width: '100%',
                            height: '50vh',
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress />
                        <Typography component="h4" variant="h4" color="primary">
                            Cargando Certificaciones...
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            width: '100%',
                            gap: '10px',
                        }}
                    >
                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Typography component="h5" variant="h5" sxProps={{ color: `${theme.palette.text.secondary}` }}>
                                Mis Certificaciones ({calificacionData?.cursos?.length})
                            </Typography>
                            <ArrowForwardIosIcon />
                        </Box>

                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 2 }}>
                            {calificacionData?.cursos?.flatMap(periodo =>
                                periodo.cursos.map(curso =>
                                    Certificaciones(curso.nombre_curso, curso.fecha_registro, curso.url_accredible ?? '')
                                )
                            )}
                        </Box>
                    </Box>
                )}
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F4F6', borderRadius: '20px' }}>

                    {isMobile && <Medalla nivel="Principiante" progreso="100" />}

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

                        {!isMobile && <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2, backgroundColor: 'black', padding: '10px 30px', borderRadius: '10px' }}>
                            <Typography component="span" variant="body3" sxProps={{ color: '#fff' }}>No. 123</Typography>
                            <Box
                                component="img"
                                src={Clasificacion}
                                alt="medalla"
                                sx={{ width: '25px', height: '25px' }}
                            />
                        </Box>}

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

    const Stats: statsCard[] = [
        { title: '125 horas', description: 'En plataforma', color: 'primary.300' },
        { title: '3 de 10', description: 'Certificaciones', color: 'warning.main' },
        { title: '5 cursos', description: 'Concluidos', color: 'warning.main' },
    ]

    const StatsCard = ({
        title,
        description,
        color
    }: statsCard): React.ReactNode => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '16px',
                maxWidth: isMobile ? '100%' : '188px',
                width: '100%',
            }}
        >
            <Card
                sx={{
                    backgroundColor: `${color}`,
                    borderRadius: '12px',
                    padding: '12px 22px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography
                    variant="h5"
                    component="span"
                    sxProps={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginBottom: '4px',
                    }}
                // sx={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    sxProps={{
                        color: '#fff',
                        opacity: 0.9
                    }}
                // sx={{ color: '#fff', opacity: 0.9 }}
                >
                    {description}
                </Typography>
            </Card>

        </Box>
    );

    const Insignias = (
        <Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '60px' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: Logros?.data?.descripcion_html ?? DescripcionesPantallas.LOGROS }} />
                    {!isMobile && <Typography component="h4" variant="h4" color="primary">
                        Mi progreso en plataforma
                    </Typography>}
                    <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', gap: '30px' } : { display: 'flex', gap: '30px' }}>
                        {
                            Stats.map((item, index) => (
                                <StatsCard
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    color={item.color}
                                />
                            ))
                        }
                    </Box>
                </Box>

                {!isMobile && <Medalla nivel="Principiante" progreso="100" />}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Box sx={
                    [
                        { display: 'flex' },
                        !isMobile && { gap: '30px', flexDirection: 'row' },
                        isMobile && { flexDirection: 'column', justifyContent: 'center', width: '345px' }
                    ]
                }>
                </Box>
            </Box>
        </Box>
    );

    return (

        isLoading
            ?
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                height: '50vh',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress />
                <Typography component="h4" variant="h4" color="primary">
                    Cargando logros...
                </Typography>
            </Box> :
            isMobile
                ?
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <TituloIcon Titulo={TitleScreen.LOGROS} Icon={isMobile && iconLogros} fontSize="h2" />
                        {Insignias}
                        {tabs(recursos)}
                    </Box>
                </>
                :
                <>
                    <ContainerDesktop title={TitleScreen.LOGROS} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto', gap: '15px' }}>
                            <Box sx={{ display: 'flex' }}>
                                {Insignias}
                            </Box>
                            {tabs(recursos)}
                        </Box>
                    </ContainerDesktop>
                </>
    );
};

export default Logros;