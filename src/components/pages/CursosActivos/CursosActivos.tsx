import React, { useEffect } from "react";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, TitleScreen, type CursoActivo as ICursoActivo } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetCursos } from "../../../services/CursosActivosService";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { accordionStyle, innerHTMLStyle } from "@styles";
import { setCursoSelected } from "../../../hooks/useLocalStorage";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import { EncuestasModal } from "../../molecules/Dialogs/EncuestasDialog/EncuestasDialog";

const CursoActivo: React.FC = () => {
    const theme = useTheme();
    const { data: cursosData, isLoading } = useGetCursos();
    const { data: cursosDatos } = useGetDatosModulos(ModulosCampusIds.CURSOS_ACTIVOS);
    const [openEncuesta, setOpenEncuesta] = React.useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    useEffect(() => {
        if (cursosData?.data.some(item => item.estatus === "Finalizado")) {
            setOpenEncuesta(true);
        }
    }, [cursosData]);

    const goToInformacion = (item: ICursoActivo) => {
        const curso = {
            id_curso: item.id_curso,
            titulo: item.titulo_curso,
            estatus: item.estatus
        };

        setCursoSelected(JSON.stringify(curso));
        navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", `${item.id_curso}`));
    }

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
                            <Button onClick={() => goToInformacion(item)} fullWidth variant="contained">Ir al Curso</Button>
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

            <EncuestasModal isOpen={openEncuesta} close={() => setOpenEncuesta(false)} />

        </>
    );
};

export default CursoActivo;
