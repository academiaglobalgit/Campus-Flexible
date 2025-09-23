import React, { useEffect } from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { AppRoutingPaths, TitleScreen, type CursoActivo as ICursoActivo } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetCursos, useGetEncuestas } from "../../../services/CursosActivosService";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { usePromediarCurso } from "../../../services/CalificacionesService";
import { useMutation } from "@tanstack/react-query";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { accordionStyle, innerHTMLStyle } from "@styles";
import { getVervideoBienvenida, setCursoSelected, setVervideoBienvenida } from "../../../hooks/useLocalStorage";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import { EncuestasModal } from "../../molecules/Dialogs/EncuestasDialog/EncuestasDialog";
import type { EncuestasDatosResponse } from "../../../types//Encuestas.interface";
import { GenericDialog } from "../../molecules/Dialogs/GenericDialog/GenericDialog";
import { useAuth } from "../../../hooks";
import { VideoBienvenidaDialog } from "../../molecules/Dialogs/VideoBienvenidaDialog/VideoBienvenidaDialog";
import { useGetManuales } from "../../../services/ManualesService";

const CursoActivo: React.FC = () => {
    const theme = useTheme();
    const { configPlataforma } = useAuth();
    const { data: cursosData, isLoading } = useGetCursos();
    const { data: cursosDatos } = useGetDatosModulos(ModulosCampusIds.CURSOS_ACTIVOS);
    const { refetch } = useGetEncuestas({ enabled: false });
    const { data: manual } = useGetManuales('Video de Bienvenida','alumnos', configPlataforma?.id_plan_estudio);
    const [openEncuesta, setOpenEncuesta] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);
    const [verTutor, setTutorVer] = React.useState(true);
    const [idAsignacion, setIdAsignacion] = React.useState(0);
    const [urlVideo, setUrlVideo] = React.useState("");
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const [tituloCurosACtivos, setTituloCursos] = React.useState('');
    const [mensajeDialog, setMEnsajeDialog] = React.useState('');
    const [isOpenInscribirmeDialog, setIsOpenInscribirmeDialog] = React.useState(false);
    const [cursoId, setCursoId] = React.useState(0);
    const [encuestaData, setEncuestaData] = React.useState<EncuestasDatosResponse[]>([]);
    const [refreshEncuestas, setRefreshEncuestas] = React.useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    React.useEffect(() => {
        switch (configPlataforma?.id_plan_estudio) {
            case 17: // Diplomados
                setTituloCursos('Certificaciones');
                setTutorVer(false);

                if (getVervideoBienvenida() === '') {
                    setUrlVideo(manual?.url ?? '');
                    setIsOpenVideo(true);
                }

                if (cursosData?.data) {
                    const materiasDiplomados = cursosData.data.filter(
                        materia =>
                            materia.estatus.toLowerCase() === 'cursando' &&
                            Number(materia.progreso) === 100
                    );
                    materiasDiplomados.forEach(item => promediarDiplomados(item));
                }

                break;

            default:
                setTituloCursos('Materias');
                break;
        }
    }, [configPlataforma?.id_plan_estudio, cursosData]);

    useEffect(() => {
        console.log('pide la encuesta', refreshEncuestas);
        refetch()
            .then(response => {
                console.log("🚀 ~ CursoActivo ~ response:", response)
                const encuestasActivas = response.data?.data?.filter(encuesta => encuesta.estatus.toLowerCase() === "asignada") ?? [];
                if (encuestasActivas.length > 0 && getVervideoBienvenida() === '1') {
                    setEncuestaData(encuestasActivas);
                    setIdAsignacion(encuestasActivas[0].id_asignacion);
                    setOpenEncuesta(true);
                }
            })
            .catch(error => {
                console.error("Error fetching encuestas:", error);
            });

    }, [cursosData, refreshEncuestas]);

    const goToDetalle = (curso: number) => {
        navigate(
            AppRoutingPaths.CALIFICACIONES_DETALLE.replace(":id", `${curso}`)
        );
    };

    const goToInformacion = (item: ICursoActivo) => {
        const curso = {
            id_curso: item.id_curso,
            titulo: item.titulo_curso,
            estatus: item.estatus ?? ''
        };

        if (item.calificacion_final >= 0 && curso.estatus.toLowerCase() === 'finalizado' && configPlataforma?.id_plan_estudio === 1) {
            goToDetalle(item.id_curso)
        } else if (curso.estatus.toLowerCase() === 'cursando' && Number(item.progreso) === 100 && configPlataforma?.id_plan_estudio === 1) {
            setIsSending(true);
            setIsDisabled(true);
            setCursoId(item.id_curso)
            createMutation.mutate(item.id_curso);
        } else {
            setCursoSelected(JSON.stringify(curso));
            navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", `${item.id_curso}`));
        }
    }

    const promediarDiplomados = (item: ICursoActivo) =>{
        if (item.estatus.toLowerCase() === 'cursando' && Number(item.progreso) === 100 && configPlataforma?.id_plan_estudio === 17) {
            createMutation.mutate(item.id_curso);
        }   
    }

    const handleConfirmar = async (isConfirmar: boolean) => {
        if (isConfirmar) {
            goToDetalle(cursoId)
            setIsOpenInscribirmeDialog(false);
        } else {
            setIsOpenInscribirmeDialog(false);
        }
    }

    const handleCerrarVideo = async () => {
        setVervideoBienvenida('1');
        setIsOpenVideo(false);
        setRefreshEncuestas(prev => !prev);
    };

    const createMutation = useMutation({
        mutationFn: usePromediarCurso,
        onSuccess: (response) => {

            setIsSending(false);
            setIsDisabled(false);
            setRefreshEncuestas(prev => !prev);

            if (response.success && response.data.estado.toLowerCase() === "finalizado" && response.data.calificacion_final >= 0 && configPlataforma?.id_plan_estudio === 1) {
                setIsOpenInscribirmeDialog(true);
                setMEnsajeDialog("Has logrado ciertas competencias")
            }
        },
        onError: (error) => {
            setIsSending(false);
            setIsDisabled(false);
            console.log(`Error al registrar: ${error.message}`, "error");
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Box sx={{ display: 'flex' }}>
            <Typography component="span" variant="body2" sxProps={{ fontWeight: 'bold' }}>
                {label}
            </Typography>
            <Typography component="span" variant="body2" sxProps={{ color: theme.palette.grey[100], ml: 1 }}>
                {value}
            </Typography>
        </Box>
    );

    const BoxInfoRow = (children: React.ReactNode) => (
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>{children}</Box>
    );

    const materiaItem = (item: ICursoActivo, index: number) => {
        return (
            <Accordion
                key={index}
                sxProps={accordionStyle}
                title={item.titulo_curso}
                customHeader={<AccordionStatus tittle={item.titulo_curso} status={item.estatus} sxProps={{ flexDirection: isMobile ? 'column' : 'row' }} />}
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
                            verTutor &&
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
                            <Button onClick={() => goToInformacion(item)} isLoading={isSending} disabled={isDisabled} fullWidth variant="contained">Ir al Curso</Button>
                        </Box>

                    </Box>
                </Box>

            </Accordion>
        )
    };

    const Materias = (
        <>
            <Divider textAlign="center">
                <Typography component="span" variant="body2" color="primary">{tituloCurosACtivos}</Typography>
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
        <>
            {isMobile
                ?
                <>
                    <TituloIcon Titulo={TitleScreen.CURSOS_ACTIVOS} Icon={CursosActivos} />
                    <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: cursosDatos?.data?.descripcion_html ?? '' }} />
                    {Materias}
                </>
                :
                <ContainerDesktop title={TitleScreen.CURSOS_ACTIVOS} description={cursosDatos?.data?.descripcion_html ?? ''}>
                    {Materias}
                </ContainerDesktop>
            }
            {
                <EncuestasModal
                    isOpen={openEncuesta}
                    data={{ encuesta: encuestaData[0], idAsignacion }}
                    onEncuestaEnviada={(enviada) => {
                        if (enviada) {
                            setRefreshEncuestas(prev => !prev);
                        }
                    }}
                />
            }
            {
                <GenericDialog mensaje={mensajeDialog} tipo="info" isOpen={isOpenInscribirmeDialog} close={(isConfirmar: boolean) => handleConfirmar(isConfirmar)} />
            }
            {
                <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => handleCerrarVideo()} urlVideo={urlVideo} />
            }

        </>
    );
};

export default CursoActivo;
