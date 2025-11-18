import React from "react";
import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { MisLogros as iconLogros } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, CircularProgress, Divider, Tab, Tabs, tabsClasses, useMediaQuery } from "@mui/material";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { innerHTMLStyle } from "@styles";
import medallaOro from "../../../assets/medalla_oro.png";
import medallaPlata from "../../../assets/medalla_plata.png";
import medallaBronce from "../../../assets/medalla_bronce.png";
import Button from "../../atoms/Button/Button";
import theme from '../../../themes/theme';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetCalificaciones } from '../../../services/CalificacionesService';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { formatFechaBonita } from "../../../utils/Helpers";
import { DescripcionesPantallas } from '@constants';
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

interface MedallaProps {
    nivel: string;
    progreso: string | number;
}

type Estatus =
    | "Finalizado"
    | "Entregado"
    | "Cursando"
    | "Sin Iniciar"
    | "Reprobado";

const Logros: React.FC = () => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: Logros, isLoading } = useGetDatosModulos(ModulosCampusIds.LOGROS);
    const { data: calificacionData, isLoading: isLoadingCertis } = useGetCalificaciones();
    const [value, setValue] = React.useState(0);

    const Medalla: React.FC<MedallaProps> = ({ nivel, progreso }) => {
        const puntos = Number(progreso);

        let medallaSrc = medallaBronce;
        let mensaje = "";

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
                    gap: "10px",
                    width: "386px",
                    textAlign: "center",
                }}
            >
                <Box component="img" src={medallaSrc} alt="medalla" />

                <Typography component="h2" variant="h5" color="primary">
                    Nivel: {nivel}
                </Typography>

                <Typography component="span" variant="body1" color="text">
                    {mensaje}
                </Typography>
            </Box>
        );
    };

    const estadoColor = {
        Finalizado: "success",
        Entregado: "warning",
        Cursando: "warning",
        "Sin Iniciar": "disabled",
        Reprobado: "secondary",
    } as const;


    const Certificaciones = (nombre_curso: string, fecha: string, download: string, estatus?: Estatus) => {

        const safeEstatus: Estatus = estatus ?? "Sin Iniciar";
        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        mt: 1,
                        gap: 2
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {fecha === null ? (
                            <Typography
                                component="span"
                                variant={isMobile ? 'body2' : 'h4'}
                                color={estatus ? estadoColor[estatus] : 'disabled'}
                            >
                                {safeEstatus ?? ""}
                            </Typography>
                        ) : (
                            <Typography component="span" variant="body3" color="text">
                                {formatFechaBonita(fecha)}
                            </Typography>
                        )}

                        <Typography component="h5" variant="h5" color="primary">
                            {nombre_curso}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '350px'
                        }}
                    >
                        <Button
                            disabled={!download}
                            onClick={() => handleDescargar(download)}
                            sxProps={{ width: '140px' }}
                        >
                            Ver detalles
                        </Button>
                    </Box>
                </Box>

                <Divider />
            </>
        );
    }


    const handleDescargar = (download: string) => {
        if (!download) return;

        //Los console logs son temporales para detectar un error al remover el script
        try {
            const link = document.createElement("a");
            link.href = download;
            link.setAttribute("download", "");
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            console.error("Error downloading file: antes de removeChild");
            document.body.removeChild(link);
        } catch (error) {
            localStorage.setItem("errorRemovingAvatarScript_logros", String(error));
            console.error("Error downloading file:", error);
        }
    };


    const tabs = () => {
        const toEstatus = (valor: string): Estatus | undefined =>
            valor in estadoColor ? (valor as Estatus) : undefined;
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
                            m: 1,
                            gap: '30px',
                        }}
                    >
                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Typography component="h5" variant="h5" sxProps={{ color: `${theme.palette.text.secondary}` }}>
                                Mis Certificaciones ({calificacionData?.cursos?.length})
                            </Typography>
                            <ArrowForwardIosIcon />
                        </Box>

                        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 4 }}>
                            {calificacionData?.cursos?.flatMap(periodo =>
                                periodo.cursos.map(curso =>
                                    Certificaciones(curso.nombre_curso, curso.fecha_registro, curso.url_accredible ?? '', toEstatus(curso.estatus_curso_alumno))
                                )
                            )}
                        </Box>
                    </Box>
                )}
            </TabPanel>

        </>
    }

    const Insignias = (
        <Box>
            <TituloIcon Titulo={TitleScreen.LOGROS} Icon={isMobile && iconLogros} fontSize="h2" />
            <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: Logros?.data?.descripcion_html ?? DescripcionesPantallas.LOGROS }} />
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

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (

        isLoading
            ?
            <LoadingCircular Text="Cargando logros..." />
            :
            isMobile
                ?
                <>
                    {Insignias}
                    {tabs()}
                </>
                :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
                        <Box sx={{ display: 'flex' }}>
                            {Insignias}
                            <Box>
                                <Medalla nivel="Principiante" progreso="0" />
                            </Box>
                        </Box>
                        {tabs()}
                    </Box>
                </>
    );
};

export default Logros;