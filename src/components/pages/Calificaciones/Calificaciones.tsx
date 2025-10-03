import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { AppRoutingPaths, TitleScreen } from '@constants';
import { Calificaciones as CalificacionesIcon } from "@iconsCustomizeds";
import { Typography } from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import { GlosarioTerminosDialog } from '../../molecules/Dialogs/GlosarioTerminosDialog/GlosarioTerminosDialog';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import PeriodosTabs from '../../molecules/PeriodosTabs/PeriodosTabs';
import TabPanel from '../../molecules/TabPanel/TabPanel';
import { flexRows, innerHTMLStyle } from '@styles';
import { useNavigate } from 'react-router-dom';
import { toRoman } from '../../../utils/Helpers';
import StatusIcon from '../../molecules/StatusIcon/StatusIcon';
import { useGetCalificaciones } from '../../../services/CalificacionesService';
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import type { CalificacionCurso } from '../../../types/Calificaciones.interface';
import { LoadingCircular } from '../../molecules/LoadingCircular/LoadingCircular';
import { useQueryClient } from '@tanstack/react-query';
import { CURSOS_ACTIVOS_ENDPOINTS } from '../../../types/endpoints';
import { getTabSelected, setCursoSelected, setTabSelected } from '../../../hooks/useLocalStorage';

import { useAuth } from '../../../hooks';

const Calificaciones: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const queryClient = useQueryClient();
    const { configPlataforma } = useAuth();

    const [isOpen, setIsOpen] = React.useState(false);

    const { data: calificacionData, isLoading } = useGetCalificaciones();
    const { data: CalificacionesDatos } = useGetDatosModulos(ModulosCampusIds.CALIFICACIONES);

    const [value, setValue] = React.useState(0);
    const [tabPreviewSelected, setPreviewTabSelected] = React.useState(0);

    const [ calificacionesConfig, setCalificacionesConfig ] = React.useState({ titulo: TitleScreen.CALIFICACIONES, loading: `Cargando ${TitleScreen.CALIFICACIONES}...`, mostrarPromedio: true, mostrarGlosario: true, mostrarPeriodos: true  });

    React.useEffect(() => {
        switch(configPlataforma?.id_plan_estudio) {
            case 17: // Diplomado
                setCalificacionesConfig({ titulo: TitleScreen.CALIFICACIONES, loading: `Cargando ${TitleScreen.CALIFICACIONES}...`, mostrarPromedio: false, mostrarGlosario: false, mostrarPeriodos: false })
            break;
            case 19: // Diplomado
                setCalificacionesConfig({ titulo: TitleScreen.CALIFICACIONES, loading: `Cargando ${TitleScreen.CALIFICACIONES}...`, mostrarPromedio: false, mostrarGlosario: false, mostrarPeriodos: true })
            break;
        }
    }, [configPlataforma]);

    const handleGlosario = () => (setIsOpen(true));

    React.useEffect(() => {
        const indexTab = getTabSelected('calificaciones');
        setPreviewTabSelected(indexTab);
    }, []);

   const Leyenda = (
        <Box sx={{ ...innerHTMLStyle,pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: CalificacionesDatos?.data?.descripcion_html ?? '' }} />
    );

    const BotonVerGlosario = (variant: 'outlined' | 'contained' = 'contained') => (
        <Button onClick={handleGlosario} fullWidth variant={variant}>Clic para ver el Glosario</Button>
    );

    const handleDetalle = (id_curso: number) => (
        navigate(AppRoutingPaths.CALIFICACIONES_DETALLE.replace(":id", id_curso.toString()))
    );

    const handleIrCurso = (item: CalificacionCurso) => {
        setTabSelected({tab: 'cursos-detalle', index: 0});
        queryClient.invalidateQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, item.id_curso, "Contenido"] });


        const curso = {
            id_curso: item.id_curso,
            titulo: item.nombre_curso,
            estatus: item.estatus_curso_alumno
        };

        setCursoSelected(JSON.stringify(curso));

        setTimeout(() =>
            navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", item.id_curso.toString()))
        ,500);
    };

    const handleTabChange = (val: number) => {
        setValue(val);
        setTabSelected({ tab: 'calificaciones', index: val });
    }

    const MateriaCard = (curso: CalificacionCurso) => {
        return (
            <Box
                sx={[
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingBottom: '30px',
                        borderBottom: '1px solid #E0E0E0',
                        paddingTop: '20px',
                    },
                ]}
            >
                <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' } : { ...flexRows, justifyContent: 'space-between' }}>
                    <Typography component="span" variant="body3">{curso.nombre_curso}</Typography>
                    <StatusIcon estado={curso.estatus_curso_alumno} />
                </Box>
                <Box sx={{ ...flexRows, justifyContent: 'start', gap: '5px' }}>
                    <Typography component={"span"} variant={"body3"} color={
                        curso.estatus_curso_alumno === 'Finalizado'
                            ? (Number(curso.calificacion) === 0 ? 'error' : 'success')
                            : 'disabled'
                    }>Calificación : </Typography>
                    <Typography
                        component={"span"}
                        variant={"body3"}
                        color={
                            curso.estatus_curso_alumno === 'Finalizado'
                                ? (Number(curso.calificacion) === 0 ? 'error' : 'success')
                                : 'disabled'
                        }
                    >
                        {configPlataforma?.id_plan_estudio === 17 || configPlataforma?.id_plan_estudio === 19
                            ? (curso.calificacion === null
                                ? 'Pendiente'
                                : Number(curso.calificacion) === 0
                                    ? 'No aprobado'
                                    : 'Aprobado')
                            : (curso.estatus_curso_alumno === 'Finalizado'
                                ? curso.calificacion
                                : 'Pendiente')}
                    </Typography>


                </Box>
                {
                    (curso.estatus_curso_alumno === 'Finalizado' || curso.estatus_curso_alumno === 'Cursando') &&
                    <Box sx={{ display: 'flex', gap: '15px' }}>
                        {
                            botonesCalificacion(curso)
                        }
                    </Box>
                }
            </Box>
        );
    };

    const botonesCalificacion = (curso: CalificacionCurso) => {
        switch (configPlataforma?.id_plan_estudio) {
            case 17: // Diplomados
                return (
                    <React.Fragment>
                        <Button onClick={() => handleIrCurso(curso)} fullWidth>Ir al Curso</Button>
                    </React.Fragment>
                );
        
            case 19: // Diplomados
                return (
                    <React.Fragment>
                        <Button onClick={() => handleIrCurso(curso)} fullWidth>Ir al Curso</Button>
                    </React.Fragment>
                );

            default:
                return (
                    <React.Fragment>
                        <Button onClick={() => handleDetalle(curso.id_curso)} fullWidth>Detalles Calificación</Button>
                        <Button onClick={() => handleIrCurso(curso)} fullWidth>Ir al Curso</Button>
                    </React.Fragment>
                );
        }
        
    };

    const promedio = () => (
        <Box sx={[{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }, isMobile && { flexDirection: 'column' }]}>
            {
                isMobile
                    ?
                    <>
                        <Typography component="h4" variant="h4" color='primary'>PROMEDIO GENERAL:</Typography>
                        <Typography component="h3" variant="h3" color='primary'>{calificacionData?.promedio_general || ''}</Typography>
                    </>
                    :
                    <Typography
                        color='primary'
                        component={!betweenDevice ? "h2" : "h3"}
                        variant={!betweenDevice ? "h2" : "h3"}
                    >PROMEDIO GENERAL: {calificacionData?.promedio_general || ''}</Typography>
            }
        </Box>
    );

    const TabsSection = (periodos: number[]) => (
        <PeriodosTabs periodos={periodos.length} tabChange={handleTabChange} tabSelected={tabPreviewSelected} />
    );

    const Listado = () => {
        const data = calificacionData?.cursos || [];

        if (isLoading) {
            return <LoadingCircular Text={calificacionesConfig.loading} />;
        } else {
            if (data.length > 0) {
                if (isMobile) {
                    return ListadoMateriaVistaMobil(data, data.map((item) => item.periodo));
                } else {
                    return ListadoMateriasVistaDesktop(data, data.map((item) => item.periodo));
                }
            }
        }
    };

    const ListadoMateriaVistaMobil = (data: any[], periodos: number[]) => (
        <Grid container>
            <Grid size={{ md: 12 }} sx={{ width: '100%' }}>
                {
                    calificacionesConfig.mostrarPeriodos ? TabsSection(periodos) : null
                }
                {
                    data &&
                    data.map((item, index) => (
                        <TabPanel value={value} index={index} key={index}>
                            <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                                <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {item.cursos.map((curso: CalificacionCurso, idx: number) => (
                                        <Box key={idx}>
                                            {MateriaCard(curso)}
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

    const getTituloIconAccordion = (index: number) => {
        switch (configPlataforma?.id_plan_estudio) {
            case 17: // Diplomados
                return `Certificaciones`;
            case 19: // Diplomados Coppel
                return `Certificaciones`;
            default:
                return `Periodo ${toRoman(index + 1)} - Tus materias`;
        }
    }

    const ListadoMateriasVistaDesktop = (data: any[], periodos: number[]) => (
        <Grid container>
            <Grid size={{ md: 12 }} sx={{ width: '100%' }}>
                {
                    !betweenDevice ?
                        <>
                            {
                                calificacionesConfig.mostrarPeriodos ? TabsSection(periodos) : null
                            }
                            {
                                periodos.map((_, i) => (
                                    <TabPanel value={value} index={i} key={i}>
                                        <Box sx={{ p: 4 }}>
                                            <TituloIcon Titulo={getTituloIconAccordion(i)} fontSize="h3" />
                                            {
                                                data && data.filter((item) => item.id === i).map((item, kix) => (
                                                    <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
                                                        {item.cursos.map((curso: CalificacionCurso, idx: number) => (
                                                            <Box key={idx}>
                                                                {MateriaCard(curso)}
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

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={calificacionesConfig.titulo} Icon={CalificacionesIcon} />
                        {Leyenda}
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '30px', paddingTop: '20px' }}>
                            {calificacionesConfig.mostrarGlosario && BotonVerGlosario('contained')}
                            {calificacionesConfig.mostrarPromedio && promedio()}
                            {Listado()}
                        </Box>
                    </>
                    :
                    <ContainerDesktop
                        title={calificacionesConfig.titulo}
                        description={CalificacionesDatos?.data?.descripcion_html ?? ''}
                        actions={
                            calificacionesConfig.mostrarPromedio && promedio()
                        }
                        column1Size={9}
                        column2Size={3}
                        specialButton={
                            calificacionesConfig.mostrarGlosario && BotonVerGlosario('outlined')
                        }
                    >
                        {Listado()}
                    </ContainerDesktop>
            }
            <GlosarioTerminosDialog isOpen={isOpen} close={() => setIsOpen(false)} glosario={calificacionData?.glosario} />
        </>
    );
};

export default Calificaciones;