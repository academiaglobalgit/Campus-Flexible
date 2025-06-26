import { Box, Divider } from "@mui/material";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivosDetalle } from "@iconsCustomizeds";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, TitleScreen } from "@constants";
import Button from "../../atoms/Button/Button";

//import { useParams } from "react-router-dom";
//import { useGetCursos, useGetCursosById } from "../../../services/CursosActivosService";

const cursosDatas = [
    {
        materia: "Práctica y Colaboración Ciudadana I", temas: [
            { titulo: "Tema 1", proceso: 80, status: "Finalizado" },
            { titulo: "Tema 2", proceso: 80, status: "Cursando" },
            { titulo: "Tema 3", proceso: 80, status: "No iniciado" },
            { titulo: "Tema 4", proceso: 80, status: "No iniciado" },
        ]
    },
];



const materiaItem = (status: 'Finalizado' | 'Cursando' | 'No iniciado') => {
    let color: "success" | "primary" | "info" | "warning" | "disabled" | undefined;
    let variant: "outlined" | "contained";

    if (status === 'Finalizado') {
        color = "success";
        variant = "contained";
    } else if (status === "Cursando") {
        color = "warning";
        variant = "contained";
    } else if (status === "No iniciado") {
        color = "disabled";
        variant = "outlined";
    } else {
        color = undefined;

    }

    function MultiColorBar() {
        return (
            <Box sx={{
                display: 'flex',
                height: 5,
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden',
                marginBottom: '10px'
            }}>
                <Box sx={{ flex: 2, bgcolor: '#b0b5bb' }} />
                <Box sx={{ flex: 2, bgcolor: '#d49e04' }} />
                <Box sx={{ flex: 2, bgcolor: '#20755b' }} />
            </Box>
        );
    }


    return (
        <>
            {MultiColorBar()}

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', width: '100%', marginBottom: '23px' }}>

                <Typography component="span" variant="body2">
                    No iniciado
                </Typography>
                <Typography component="span" variant="body2">
                    En Curso
                </Typography>
                <Typography component="span" variant="body2">
                    Finalizado
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box sx={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' }}>

                    <>
                        <Button
                            onClick={() => { }}
                            fullWidth
                            variant={variant}
                            color={color}>Foro</Button>
                    </>
                    <>
                        <Button
                            variant={variant}
                            fullWidth
                            onClick={() => { }}
                            color={color}
                        >Actividad</Button>
                    </>
                </Box>
                <>
                    <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'center', width: '100%' }}>
                        <Button onClick={() => { }} color={color} fullWidth variant={variant}>Evaluación</Button>
                    </Box>
                </>
            </Box>
        </>
    )
};

const CursosActivosDetalles: React.FC = () => {

    //const {id} = useParams<{id:string}>();
    //const {data} = useGetCursosById(Number(id!));
    const navigate = useNavigate();
    const onBack = () => navigate(AppRoutingPaths.CURSOS_ACTIVOS);

    return (
        <>
            <TopBar isExternal onBack={onBack} titleScreen={TitleScreen.CURSOS_ACTIVOS} />

            {

                cursosDatas &&
                cursosDatas.map((item, index) => (

                    <>
                        <TituloIcon key={index} Titulo={item.materia} Icon={CursosActivosDetalle} />
                        <Box sx={{ paddingLeft: '30px' }}>
                            <Typography component="span" variant="body1" color="text.primary">Ver lectura de la materia</Typography>
                        </Box>

                        <Divider textAlign="center">
                            <Typography component="span" variant="body2" color="primary">Materias</Typography>
                        </Divider>

                        {item.temas.map((temas) => (
                            <Accordion title={temas.titulo} sxProps={{
                                backgroundColor: "#F8F8F9",
                                boxShadow: "0px 2px 4px 0px #6BBBE44D",
                                border: "1px solid #BABABA0D"
                            }}>

                                <Divider textAlign="center">
                                    <Typography component="span" variant="body2" color="primary">Control de avance</Typography>
                                </Divider>
                                <Typography component="p" variant="body1" sxProps={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                    El estado de tu progreso dependerá de los elementos que hayas completado y se representará mediante uno de los siguientes colores:
                                </Typography>

                                {materiaItem(temas.status as 'Finalizado' | 'Cursando' | 'No iniciado')}


                                <Divider textAlign="center">
                                    <Typography component="span" variant="body2" color="primary">Tutorias</Typography>
                                </Divider>
                                <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'center', width: '100%' }}>
                                    <Button onClick={() => { }} fullWidth variant="contained">Ver Tutorias</Button>
                                </Box>
                            </Accordion>
                        ))}
                    </>
                ))
            }

            {/* <Box>
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
            </Box> */}
        </>
    );
};

export default CursosActivosDetalles;