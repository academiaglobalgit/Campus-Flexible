import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen, type CursoActivo } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetCursos } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { accordionStyle } from "@styles";

const CursoActivo: React.FC = () => {
    const theme = useTheme();
    const { data: cursosData, isLoading } = useGetCursos();
    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();
    const goToInformacion = (idCurso: number) => navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", `${ idCurso }`));

    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Box sx={{ display: 'flex' }}>
            <Typography component="span" variant="body2" sxProps={{fontWeight: 'bold'}}>
                { label }
            </Typography>
            <Typography component="span" variant="body2" sxProps={{ color: theme.palette.grey[100], ml: 1 }}>
                { value }
            </Typography>
        </Box>
    );

    const BoxInfoRow = (children: React.ReactNode) => (
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>{ children }</Box>
    );

    const AccordionHeader = (item: CursoActivo) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'  }}>
            <Typography component="span" variant="subtitle1">
              {item.titulo_curso}
            </Typography>
            <Box sx={{pr: 2}}>
                <StatusIcon estado={item.estatus} />
            </Box>
        </Box>
    );

    const materiaItem = (item: CursoActivo, index: number) => {
        return (
            <Accordion 
                key={index} 
                title={item.titulo_curso} 
                sxProps={accordionStyle}
                customHeader={AccordionHeader(item)}
            >

                <Box sx={{ display: 'flex', width: '100%', flexFlow: 'column wrap' }}>

                    <Box sx={isMobile ? { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', } : { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', justifyContent: 'space-between' }}>
                        { 
                            BoxInfoRow(
                                <>
                                    <InfoRow label="Inicio:" value={item.fecha_inicio} />
                                    <InfoRow label="Fin:" value={item.fecha_fin} />
                                </>
                            )
                        }
                        { 
                            BoxInfoRow(
                                <>
                                    <InfoRow label="Tutor Asignado:" value={item.nombre_tutor} />
                                    <InfoRow label="Correo:" value={item.correo} />
                                </>
                            )
                        }
                    </Box>

                    <Typography component="span" variant="h5" sxProps={{ color: theme.palette.primary.main, marginTop: '44px', paddingInline: 'clamp(0rem, 5vw, 2rem)' }}>
                        Tu Progreso
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

                        <Box sx={isMobile ? { width: '100%', maxWidth: '320px' } : { display: 'flex', flexDirection: 'column', gap: '24px', width: '50%' }}>
                            <Box sx={{ padding: '5px 0 5px 0' }}>
                                <LinearProgressWithLabel
                                    value={item.progreso}
                                    barColor={item.progreso == 100 ? '#2e7d32' : '#D9A514'}
                                    trackColor="#AAB1B6"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
                            <Button onClick={() => goToInformacion(item.id_curso)} fullWidth variant="contained">Ir al Curso</Button>
                        </Box>

                    </Box>
                </Box>

            </Accordion>
        )
    };

    const Materias = (
        <>
            <Divider textAlign="center">
                <Typography component="span" variant="body2" color="primary">Materias</Typography>
            </Divider>
            {
                isLoading
                ?
                    <LoadingCircular Text="Cargando Cursos Activos..." />
                :
                    cursosData?.data.map((item, index) => (
                        materiaItem(item, index)
                    ))
            }
        </>
    );

    return (
        isMobile
            ?
            <>
                <TituloIcon Titulo={TitleScreen.CURSOS_ACTIVOS} Icon={CursosActivos} />
                <Typography component="span" variant="body1">
                    {DescripcionesPantallas.CURSOS_ACTIVOS}
                </Typography>
                {Materias}
            </>
            :
            <ContainerDesktop title={TitleScreen.CURSOS_ACTIVOS} description={DescripcionesPantallas.CURSOS_ACTIVOS}>
                {Materias}
            </ContainerDesktop>
    );
};

export default CursoActivo;
