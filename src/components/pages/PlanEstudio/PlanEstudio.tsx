import React, { useEffect } from "react";

import { Box, Grid, useMediaQuery, useTheme, Typography } from "@mui/material";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Home } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { VideoBienvenidaDialog } from "../../molecules/Dialogs/VideoBienvenidaDialog/VideoBienvenidaDialog";
import { InscribirmeDialog } from "../../molecules/Dialogs/InscribirmeDialog/InscribirmeDialog";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetVideoMapa, useGetPlanEstudio } from "../../../services/PlanEstudioService";
import { toRoman } from "../../../utils/Helpers";
import type { Materia, PlanEstudioMateriasResponse } from "../../../types/plan-estudio.interface";
import PeriodosTabs from "../../molecules/PeriodosTabs/PeriodosTabs";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { getTabSelected, setCursoSelected, setTabSelected } from "../../../hooks/useLocalStorage";
// import { useDocumentos } from "../../../context/DocumentosContext";
// import type { Documento } from "../../../types/Documentos.interface";

const PlanEstudio: React.FC = () => {
    const theme = useTheme();
    // const { documentos } = useDocumentos();
    const navigate = useNavigate();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const { refetchMapeado } = useGetPlanEstudio({ enabled: false });
    const [isLoading, setIsLoading] = React.useState(false);

    const { mapaCurricular, video, dataModulo: planEstudioData } = useGetVideoMapa();
    const [materiaData, setMateriaData] = React.useState<PlanEstudioMateriasResponse[]>([]);

    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const [videoStatus, setDisableVideo] = React.useState(true);
    const [mapaStatus, setDisableMapa] = React.useState(true);
    const [urlVideo, setUrlVideo] = React.useState("");

    const [isOpenInscribirmeDialog, setIsOpenInscribirmeDialog] = React.useState(false);

    const goToInformacion = (id_curso: number) => navigate(AppRoutingPaths.PLAN_ESTUDIO_INFORMACION.replace(":id", `${id_curso}`));

    const [value, setValue] = React.useState(0);
    const [tabPreviewSelected, setPreviewTabSelected] = React.useState(0);
    const [idCursoSelected, setIdCursoSelected] = React.useState(0);

    // const [videoBienvenida, setVideoBienvenida] = React.useState<Documento | undefined>(undefined);
    // const [mapaCurricular, setMapaCurricular] = React.useState<Documento | undefined>(undefined);

    useEffect(() => {
        const indexTab = getTabSelected('plan-estudio');
        setValue(indexTab);
        setPreviewTabSelected(indexTab);
    }, []);

    // useEffect(() => {
    //     if (documentos && documentos.length > 0) {
    //         setMapaCurricular(documentos.find(doc => doc.id_tipo_manual === 5));
    //         setVideoBienvenida(documentos.find(doc => doc.id_tipo_manual === 6));
    //     }
    // }, [documentos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await refetchMapeado();

                setMateriaData(response ?? []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

useEffect(() => {
    const fetchStatus = async () => {
        try {
            // Re-fetch de video
            const videoResult = await video.refetch();
            if (!(videoResult.error as any)?.response?.data?.message) {
                setDisableVideo(false);
            }

            // Re-fetch de mapa curricular
            const mapaResult = await mapaCurricular.refetch();
            if (!(mapaResult.error as any)?.response?.data?.message) {
                setDisableMapa(false);
            }
        } catch (error) {
            console.error("Error refetching video/mapa:", error);
        }
    };

    fetchStatus();
}, []); 




    const handleVideoBienvenida = () => {

        console.log()

        setUrlVideo(video.data?.url ?? "");
        setIsOpenVideo(true);
    }

    const handleAction = (materia: Materia) => {
        if (materia.status === "Inscribirme") {
            setIdCursoSelected(materia.id_curso);
            setIsOpenInscribirmeDialog(true);
        } else if (materia.status === "Cursando") {
            setCursoSelected(JSON.stringify(materia));
            navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", `${materia.id_curso}`));
        }
    }

    const handleMapaCurricular = () => {
        if (mapaCurricular) window.open(mapaCurricular.data?.url, "_blank");
    };

    const handleConfirmar = async (isConfirmar: boolean) => {
        if (isConfirmar) {
            const response = await refetchMapeado();
            setMateriaData(response ?? []);
            setIsOpenInscribirmeDialog(false);
        } else {
            setIsOpenInscribirmeDialog(false);
        }
    }

    const InformacionStatusButtons = (materia: Materia, color: "success" | "primary" | "info" | "warning" | undefined) => (
        <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
            <>
                <Button onClick={() => goToInformacion(materia.id_curso)} fullWidth variant="outlined">Información</Button>
            </>
            <>
                <Button
                    fullWidth
                    onClick={() => handleAction(materia)}
                    color={color}
                >{materia.status}</Button>
            </>
        </Box>
    );

    const materiaItem = (materia: Materia, isDesktop = true) => {
        let color: "success" | "primary" | "info" | "warning" | undefined;
        if (materia.status === 'Finalizada') {
            color = "success";
        } else if (materia.status === "Cursando") {
            color = "warning";
        } else {
            color = undefined;
        }

        return (
            isDesktop ?
                <Box sx={{ borderBottom: '2px solid #AAB1B6' }}>
                    <Grid container sx={{ display: 'flex', alignItems: 'center', height: '80px' }}>
                        <Grid size={{ md: 6 }}>
                            <Typography component="span" variant="body2">
                                {materia.titulo}
                            </Typography>
                        </Grid>
                        <Grid size={{ md: 6 }}>
                            {InformacionStatusButtons(materia, color)}
                        </Grid>
                    </Grid>
                </Box>
                :
                <Box>
                    <Typography component="span" variant="body2">
                        {materia.titulo}
                    </Typography>
                    {InformacionStatusButtons(materia, color)}
                </Box>
        )
    };

    const BotonesVideoMapa = (flexDirection: string = "row") => (
        <Box sx={{ paddingTop: '32px', paddingBottom: '8px', display: 'flex', flexDirection, gap: '15px', justifyContent: 'space-between' }}>
            <>
                <Button
                    onClick={handleVideoBienvenida}
                    fullWidth
                    icon={!isMobile ? <OndemandVideoIcon /> : undefined}
                    iconPosition={!isMobile ? "start" : undefined}
                    disabled={videoStatus}

                >
                    Video de Bienvenida
                </Button>
            </>
            <>
                <Button onClick={handleMapaCurricular} disabled={mapaStatus}
                    fullWidth variant="outlined" >Mapa Curricular</Button>
            </>
        </Box >
    );

    const handleTabChange = (val: number) => {
        setValue(val);
        setTabSelected({ tab: 'plan-estudio', index: val });
    }

    const TabsSection = (periodos: number[]) => (
        <PeriodosTabs periodos={periodos.length} tabChange={handleTabChange} tabSelected={tabPreviewSelected} />
    );

    const ListadoMateriaVistaMobil = (data: PlanEstudioMateriasResponse[], periodos: number[]) => (
        <Grid container>
            <Grid size={{ md: 12 }} sx={{ width: '100%' }}>
                {
                    TabsSection(periodos)
                }
                {
                    data &&
                    data.map((item, index) => (
                        <TabPanel value={value} index={index} key={index}>
                            <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                                <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {item.materias.map((materia: Materia, idx: number) => (
                                        <Box key={idx}>
                                            {materiaItem(materia, false)}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </TabPanel>
                    ))
                }
            </Grid>
        </Grid>
    );

    const ListadoMateriasVistaDesktop = (data: PlanEstudioMateriasResponse[], periodos: number[]) => (
        <Grid container>
            <Grid size={{ md: 12 }} sx={{ width: '100%' }}>
                {
                    !betweenDevice ?
                        <>
                            {
                                TabsSection(periodos)
                            }
                            {
                                periodos.map((_, i) => (
                                    <TabPanel value={value} index={i} key={i}>
                                        <Box sx={{ p: 4 }}>
                                            <TituloIcon Titulo={`Periodo ${toRoman(i + 1)} - Tus materias`} fontSize="h3" />
                                            {
                                                data && data.filter((item) => item.id === i).map((item, kix) => (
                                                    <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
                                                        {item.materias.map((materia: Materia, idx: number) => (
                                                            <Box key={idx}>
                                                                {materiaItem(materia, true)}
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </TabPanel>
                                ))
                            }
                        </>
                        :
                        ListadoMateriaVistaMobil(data, periodos)
                }
            </Grid>
        </Grid>
    );

    const Listado = () => {
        const data = materiaData || [];

        if (data.length > 0) {
            if (isMobile) {
                return ListadoMateriaVistaMobil(data, data.map((item) => item.periodo));
            } else {
                return ListadoMateriasVistaDesktop(data, data.map((item) => item.periodo));
            }
        }
    };

    return (
        <>
            {
                isLoading
                    ?
                    <LoadingCircular Text="Cargando Plan de Estudio..." />
                    :
                    isMobile
                        ?
                        <>
                            <TituloIcon Titulo={TitleScreen.PLAN_ESTUDIOS} Icon={Home} />
                            <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: planEstudioData?.data?.data.descripcion_html ?? '' }}>
                            </Typography>
                            {BotonesVideoMapa()}
                            {Listado()}
                        </>
                        :
                        <ContainerDesktop
                            title={TitleScreen.PLAN_ESTUDIOS}
                            description={planEstudioData?.data?.data.descripcion_html ?? ''}
                            actions={
                                BotonesVideoMapa(!betweenDevice ? "column" : "row")
                            }
                        >
                            {
                                Listado()
                            }
                        </ContainerDesktop>
            }
            <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => setIsOpenVideo(false)} urlVideo={urlVideo} />
            <InscribirmeDialog idCurso={idCursoSelected} isOpen={isOpenInscribirmeDialog} close={(isConfirmar: boolean) => handleConfirmar(isConfirmar)} />
        </>

    );
};

export default PlanEstudio;