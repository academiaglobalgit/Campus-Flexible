import { Box, Button, Divider } from "@mui/material";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";

const cursosDatas = [
    {
        titulo: "Práctica y Colaboración Ciudadana I",
        fechaActivo: "Agosto 23 , 2025",
        proceso: 80,
        status: "Cursando",
        idcurso: 800,
        tareas: "",
    },
    {
        titulo: "Ciencias sociales I",
        fechaActivo: "Agosto 23 , 2025",
        proceso: 100,
        status: "Cursando",
        idcurso: 800,
        tareas: "",
    }

];

const CursoActivo: React.FC = () => {

    const navigate = useNavigate();
    const goToInformacion = () => navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES + 1);

    const materiaItem = (status: 'Finalizada' | 'Cursando' | 'Inscribirme') => {
        let color: "success" | "primary" | "info" | "warning" | undefined;
        if (status === 'Finalizada') {
            color = "success";
        } else if (status === "Cursando") {
            color = "warning";
        } else {
            color = undefined;
        }

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box sx={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' }}>
                    <>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => { }}
                            color={color}
                        >{status}</Button>
                    </>
                    <>
                        <Button onClick={goToInformacion} fullWidth variant="contained">Ir al Curso</Button>
                    </>
                </Box>
                <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={goToInformacion} fullWidth variant="contained">Pendientes</Button>
                </Box>

            </Box>
        )
    };

    return (
        <>
            <TituloIcon Titulo={TitleScreen.CURSOS_ACTIVOS} Icon={CursosActivos} />
            <Typography component="span" variant="body1">
                En esta sección te presentamos los cursos en los que estás inscrito y en cada uno tienes la opción de ingresar, a través de los diferentes botones de acceso, a Material en Línea, Actividades Integradoras, Presentar Exámenes, Exámenes Presentados, Material Descargable y Foros.
            </Typography>
            <Divider textAlign="center">
                <Typography component="span" variant="body2" color="primary">Materias</Typography>
            </Divider>
            {

                cursosDatas &&
                cursosDatas.map((item, index) => (

                    <Accordion key={index} title={item.titulo} sxProps={{
                        backgroundColor: "#F8F8F9",
                        boxShadow: "0px 2px 4px 0px #6BBBE44D",
                        border: "1px solid #BABABA0D"
                    }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            <Typography component="span" variant="body1">
                                Curso Activo Hasta: {item.fechaActivo}
                            </Typography>

                            <Typography component="span" variant="body1">
                                Tu progreso
                            </Typography>
                            <Box sx={{ padding: '10px 0 10px 0' }}>

                                <LinearProgressWithLabel
                                    value={item.proceso}
                                    barColor={item.proceso == 100 ? '#2e7d32' : '#D9A514'}
                                    trackColor="#7B8186" />

                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                            {materiaItem(item.status as 'Finalizada' | 'Cursando' | 'Inscribirme')}
                        </Box>

                    </Accordion>
                ))
            }
        </>
    );
};

export default CursoActivo;
