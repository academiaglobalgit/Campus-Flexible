import { Box, Divider } from "@mui/material";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { Home } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const materiaData = [
    {
        periodo: "Primer Periodo", materias: [
            { titulo: "Práctica y Colaboración Ciudadana I", status: "Finalizada" },
            { titulo: "Ciencias sociales I", status: "Cursando" },
            { titulo: "Pensamiento Matemático I", status: "Inscribirme" },
            { titulo: "Desarrollo de Software I", status: "Inscribirme" },
        ]
    },
    {
        periodo: "Segundo Periodo", materias: [
            { titulo: "Práctica y Colaboración Ciudadana II", status: "Inscribirme" },
            { titulo: "Ciencias sociales II", status: "Inscribirme" },
            { titulo: "Pensamiento Matemático II", status: "Inscribirme" },
            { titulo: "Desarrollo de Software II", status: "Inscribirme" },
        ]
    },
];

const PlanEstudio: React.FC = () => {
    const navigate = useNavigate();

    const goToInformacion = () => navigate(AppRoutingPaths.PLAN_ESTUDIO_INFORMACION);

    const materiaItem = (materia: string, status: 'Finalizada' | 'Cursando' | 'Inscribirme') => {
        let color: "success" | "primary" | "info" | "warning" | undefined;
        if (status === 'Finalizada') {
            color = "success";
        } else if (status === "Cursando") {
            color = "warning";
        } else {
            color = undefined;
        }

        return (
            <Box>
                <Typography component="span" variant="body1" sxProps={{ fontSize: '18px', lineHeight: '24px' }} >
                    {materia}
                </Typography>
                <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                    <>
                        <Button onClick={goToInformacion} fullWidth variant="outlined">Información</Button>
                    </>
                    <>
                        <Button
                            fullWidth
                            onClick={() => { }}
                            color={color}
                        >{status}</Button>
                    </>
                </Box>
            </Box>
        )
    };

    return (
        <>
            <TituloIcon Titulo={TitleScreen.PLAN_ESTUDIOS} Icon={Home} />
            <Typography component="span" variant="body1">
                En esta sección encontrarás todos los cursos, agrupados por períodos, que integran el Programa de Prepa Coppel. En la columna derecha observamos dos botones. En Información tienes a tu disposición la descripción de objetivos, estructura y recursos que integran cada material académico. El segundo botón, te permitirá solicitar la activación de cada curso.
            </Typography>
            <Box sx={{ paddingTop: '32px', paddingBottom: '8px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                <>
                    <Button onClick={() => { }} fullWidth>Video de Bienvenida</Button>
                </>
                <>
                    <Button onClick={() => { }} fullWidth variant="outlined" >Mapa Curricular</Button>
                </>
            </Box>
            <Box>
                {
                    materiaData &&
                    materiaData.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: '24px' }}>
                            <Divider textAlign="center">
                                <Typography component="span" variant="body2" color="primary">{item.periodo}</Typography>
                            </Divider>
                            <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {item.materias.map((materia, idx) => (
                                    <Box key={idx}>
                                        {materiaItem(materia.titulo, materia.status as 'Finalizada' | 'Cursando' | 'Inscribirme')}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </>
    );
};

export default PlanEstudio;