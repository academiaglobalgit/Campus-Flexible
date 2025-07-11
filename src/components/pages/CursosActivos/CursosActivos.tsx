import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";


const cursosDatas = [
    {
        titulo: "Práctica y Colaboración Ciudadana I",
        fechaActivo: "Agosto 23 , 2025",
        fechaFin: "Agosto 23 , 2025",
        tutor: "Juan Antonio Perez Hernandez",
        correo: "correo@academiaglobal.mx",
        proceso: 80,
        status: "Cursando",
        idcurso: 800,
        tareas: "",
    },
    {
        titulo: "Ciencias sociales I",
        fechaActivo: "Agosto 23 , 2025",
        fechaFin: "Agosto 23 , 2025",
        tutor: "Juan Antonio Perez Hernandez",
        correo: "correo@academiaglobal.mx",
        proceso: 100,
        status: "Finalizado",
        idcurso: 800,
        tareas: "",
    },
    {
        titulo: "Ciencias Naturales I",
        fechaActivo: "Agosto 23 , 2025",
        fechaFin: "Agosto 23 , 2025",
        tutor: "Juan Antonio Perez Hernandez",
        correo: "correo@academiaglobal.mx",
        proceso: 0,
        status: "Sin iniciar",
        idcurso: 900,
        tareas: "",
    }

];

const CursoActivo: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();
    const goToInformacion = () => navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", "1"));

    const materiaItem = (item: any, index: number) => {
        return (
            <Accordion key={index} title={item.titulo} sxProps={{
                backgroundColor: "#F8F8F9",
                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                border: "1px solid #BABABA0D",
            }}
                opcion={<StatusIcon estado={item.status} sxProps={{ color: theme.palette.primary.dark, display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'start' }} />}>

                <Box sx={{ display: 'flex', width: '100%', flexFlow: 'column wrap' }}>

                    <Box sx={isMobile ? { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', } : { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', justifyContent: 'space-between' }}>

                        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>

                            <Box sx={{ display: 'flex' }}>
                                <Typography component="span" variant="body1">
                                    Inicio:
                                </Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                                    {item.fechaActivo}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex' }}>
                                <Typography component="span" variant="body1">
                                    Fin:
                                </Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                                    {item.fechaFin}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>

                            <Box sx={{ display: 'flex' }}>
                                <Typography component="span" variant="body1">
                                    Tutor Asignado:
                                </Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                                    {item.tutor}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex' }}>
                                <Typography component="span" variant="body1">
                                    Correo:
                                </Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                                    {item.correo}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography component="span" variant="h5" sxProps={{ color: theme.palette.primary.main, marginTop: '44px', paddingInline: 'clamp(0rem, 5vw, 2rem)' }}>
                        Tu Progreso
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

                        <Box sx={isMobile ? { width: '100%', maxWidth: '320px' } : { display: 'flex', flexDirection: 'column', gap: '24px', width: '50%' }}>
                            <Box sx={{ padding: '5px 0 5px 0' }}>
                                <LinearProgressWithLabel
                                    value={item.proceso}
                                    barColor={item.proceso == 100 ? '#2e7d32' : '#7B8186'}
                                    trackColor="#D9A514" />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
                            <Button onClick={goToInformacion} fullWidth variant="contained">Ir al Curso</Button>
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

                cursosDatas &&
                cursosDatas.map((item, index) => (
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
