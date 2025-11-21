import { useEffect, useState } from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { accordionStyle, flexColumn, flexRows, innerHTMLStyle } from "@styles";
import { useParams } from "react-router-dom";
import { updateActividad, useGetActividades } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { convertRemoteToPreviewFile } from "../../../utils/Helpers";
import { Typography } from "../../atoms/Typography/Typography";
import { FileUploader } from "../../molecules/FileUploader/FileUploader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../../../providers/NotificationProvider";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";
import { RetroalimentacionDialog } from "../../molecules/Dialogs/RetroalimentacionDialog/RetroalimentacionDialog";
import { GenericDialog } from "../../molecules/Dialogs/GenericDialog/GenericDialog";
import { CURSOS_ACTIVOS_ENDPOINTS } from "../../../types/endpoints";
import { ManualsButton } from "../../molecules/ManualsButton/ManualsButton";
import { TipoManualesIds } from "@constants";
import React from "react";
import { usePlanEstudio } from "../../../context/PlanEstudioContext";

type PreviewFile = {
    file: File;
    preview?: string;
};

export const Actividades: React.FC = () => {
    const theme = useTheme();
    const { config: configPlanEstudio } = usePlanEstudio();

    const queryClient = useQueryClient();
    const { showNotification } = useNotification();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [isSaving, setIsSaving] = useState(false);
    const [totalPalabras, setTotalPalabras] = useState<Record<string, number | boolean>>({});
    const [isOpenAvisoActividad, setIsOpenAvisoActividad] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { dataMapped, isLoading } = useGetActividades(Number(id!), "Actividades");

    const { control, setValue } = useForm();

    const [archivosPorId, setArchivosPorId] = useState<Record<number, PreviewFile[]>>({});
    const [contenido, setContenido] = useState<Record<number, string>>({});
    const [openRetroDialog, setOpenRetroDialog] = useState(false);
    const [idRecursoPending, setIdRecursoPending] = useState(0);
    const [retroalimentacion, setRetroalimentacion] = useState<string>("");

    const [verBotones, setVerBotones] = useState(true);
    const [verCalificacion, setVerCalificacion] = useState(true);
    const [subirArchivos, setSubirArchivos] = useState(true);
    const [notificacionMensaje, setNotificacionMensaje] = useState('Debes dejar un comentario o subir un archivo');

    const manuales = [
        TipoManualesIds.INSTRUMENTO_EVALUACION,
        TipoManualesIds.PORTADA,
        TipoManualesIds.MANUAL_APA,
        TipoManualesIds.ACTIVIDADES_INTEGRATORIAS
    ];

    React.useEffect(() => {
        const config = configPlanEstudio?.getConfiguracionActividades({verBotones: true, verCalificacion: true, subirArchivos: true, notificacionMensaje: 'Debes dejar un comentario o subir un archivo'});
        if(config) {
            setVerBotones(config.verBotones);
            setVerCalificacion(config.verCalificacion);
            setSubirArchivos(config.subirArchivos);
            setNotificacionMensaje(config.notificacionMensaje)
        }
    }, [configPlanEstudio]);

    const handleFilesChange = (id: number, files: PreviewFile[]) => {
        setArchivosPorId((prev) => ({
            ...prev,
            [id]: files,
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, field: any) => {
        const valor = event.target.value;
        const palabras = valor.trim().split(/\s+/).filter(Boolean);
        const total = palabras.length;

        const LIMITE = 5000;
        const ADVERTENCIA = 4800;

        const valorAnterior = contenido[id] ?? "";

        if (total > LIMITE) {
            showNotification("Has alcanzado el límite máximo de 5000 palabras.", "warning");
            field.onChange(valorAnterior);
            return;
        }
        if (total >= ADVERTENCIA && total < LIMITE && !totalPalabras[id + "_alertado"]) {
            showNotification("Estás a punto de llegar al límite de 5000 palabras.", "warning");
            setTotalPalabras((prev) => ({
                ...prev,
                [id + "_alertado"]: true,
            }));
        }

        field.onChange(valor);
        setContenido((prev) => ({ ...prev, [id]: valor }));
        setTotalPalabras((prev) => ({ ...prev, [String(id)]: total }));
    };




    const handleEditActivity = async (id_recurso: number) => {
        const archivos = archivosPorId[id_recurso].map((item) => item.file.name);
        const archivosOriginales: any[] = [];
        let id_entrega: number | null = null;

        setIsSaving(true);

        await Promise.all(
            Object.entries(dataMapped?.agrupadoPorUnidad ?? {}).map(async ([_, contenidos]) => {
                const curso = contenidos.filter((item) => item.id_recurso === id_recurso);

                for (const item of curso) {
                    id_entrega = item.entrega?.id_entrega ?? 0;

                    if (item.entrega?.archivos?.length) {
                        archivosOriginales.push(...item.entrega.archivos);
                    }
                }
            })
        );

        const archivos_eliminar = archivosOriginales
            .filter((archivo) => !archivos.includes(archivo.nombre_original))
            .map((archivo) => ({ id_archivo: archivo.id_archivo }));

        const originalesNombres = new Set(archivosOriginales.map(o => o.nombre_original));

        const archivosNoExistentes = archivos
            .filter(nombre => !originalesNombres.has(nombre))
            .map(nombre => nombre);

        const filesArray = archivosPorId[id_recurso]
            .filter((item) => archivosNoExistentes.includes(item.file.name))
            .map((item) => item);

        const contenidoText = contenido[id_recurso] || '';
        const files = filesArray.map((item) => item.file);
        createMutationActivity.mutate({ id_recurso, contenido: contenidoText, archivos: files, archivos_eliminar, id_entrega });
    };

    const handleShowDialog = (id_recurso: number) => {
        setIsOpenAvisoActividad(true);
        setIdRecursoPending(id_recurso);
    }

    const handleSaveActivity = (id_recurso: number) => {
        setIsSaving(true);
        const contenidoText = contenido[id_recurso] || '';
        const archivos = archivosPorId[id_recurso] || [];
        const files = archivos.map((item) => item.file);

        if (files.length === 0 && contenidoText.length === 0) {
            setIsSaving(false);
            setIsOpenAvisoActividad(false);
            showNotification(notificacionMensaje, "warning");
            return;
        }

        createMutationActivity.mutate({ id_recurso, contenido: contenidoText, archivos: files, archivos_eliminar: [], id_entrega: null });
    }

    const createMutationActivity = useMutation({
        mutationFn: updateActividad,
        onSuccess: async () => {
            showNotification(`La actividad se guardo satisfactoriamente`, "success");

            await queryClient.invalidateQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Actividades", Number(id!)], exact: true });
            await queryClient.resetQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Contenido", Number(id!)], exact: true });
            await queryClient.resetQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_LISTA_PROGRESO.key] });
            setIsSaving(false);
            setIsOpenAvisoActividad(false);

            await queryClient.invalidateQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key] });
        },
        onError: (error) => {
            console.error(error);
            showNotification(`Error al registrar: ${error.message}`, "error");
            setIsSaving(false);
            setIsOpenAvisoActividad(false);

        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    useEffect(() => {
        loadAllArchivos();
        loadComentarios();
    }, [dataMapped]);

    const loadComentarios = () => {
        if (dataMapped?.agrupadoPorUnidad) {
            Object.entries(dataMapped.agrupadoPorUnidad).map(async ([_, contenidos]) => {
                // const curso = contenidos.filter((item) => item.id_recurso === id_recurso);
                contenidos.map((item) => {
                    setValue(`comentario.${item.id_recurso}`, item.entrega?.contenido_entregado ?? '');
                    setContenido((prev) => ({
                        ...prev,
                        [item.id_recurso]: item.entrega?.contenido_entregado ?? ''
                    }));
                })
            });
        }
    }

    const loadAllArchivos = async (id_recurso: number = 0) => {
        const updatedArchivos: Record<number, PreviewFile[]> = {};

        // Recorremos las unidades agrupadas
        await Promise.all(
            Object.entries(dataMapped?.agrupadoPorUnidad ?? {}).map(async ([_, contenidos]) => {
                // Recorremos los contenidos dentro de cada unidad

                const contenidoArray = id_recurso > 0 ? contenidos.filter((item) => item.id_recurso === id_recurso) : contenidos;

                await Promise.all(
                    contenidoArray.map(async (item) => {
                        if (item.entrega?.archivos?.length) {
                            const previewFiles = await Promise.all(
                                item.entrega.archivos.map(convertRemoteToPreviewFile)
                            );
                            updatedArchivos[item.id_recurso] = previewFiles;
                        }
                    })
                );
            })
        );

        setArchivosPorId(updatedArchivos);
    };

    const handleCancel = (id_recurso: number) => {
        loadAllArchivos(id_recurso);
        if (dataMapped?.agrupadoPorUnidad) {
            Object.entries(dataMapped?.agrupadoPorUnidad).map(async ([_, contenidos]) => {
                const curso = contenidos.filter((item) => item.id_recurso === id_recurso);
                curso.map((item) => {
                    setValue(`comentario.${item.id_recurso}`, item.entrega?.contenido_entregado ?? '');
                    setContenido((prev) => ({
                        ...prev,
                        [id_recurso]: item.entrega?.contenido_entregado ?? ''
                    }));
                })
            });
        }
    }

    const handleCloseGenericDialog = (isConfirmar: boolean) => {
        if (isConfirmar) {
            handleSaveActivity(idRecursoPending);
        } else {
            setIsOpenAvisoActividad(false);
        }
    };

    const handleOnPaste = (
        e: React.ClipboardEvent<HTMLElement>,
        id: number,
        contenido: Record<number, string>,
        showNotificationFn: (...args: any[]) => void
    ) => {
        const pastedText = e.clipboardData.getData("text");
        const palabrasPegadas = pastedText.trim().split(/\s+/).filter(Boolean).length;
        const palabrasActuales =
            (contenido[id]?.trim().split(/\s+/).filter(Boolean).length) || 0;
        const LIMITE = 5000;

        if (palabrasActuales + palabrasPegadas > LIMITE) {
            e.preventDefault();
            showNotificationFn("El texto pegado supera el límite de 5000 palabras.", "warning");
        }
    };



    const Files = ({item}: any) => {
        return (
            <>
                <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
                    <Typography component="p" variant="body1" color="primary">
                        Sube tu archivo aquí
                    </Typography>
                    <Typography component="p" variant="body1">
                        (pdf, word)
                    </Typography>
                </Box>
                <FileUploader
                    files={archivosPorId[item.id_recurso] || []}
                    onFilesChange={(files) => handleFilesChange(item.id_recurso, files)}
                    maxFiles={3} maxFileSizeMb={3}
                    canUpload={item.calificacion === null}
                />
                {
                    item.hasEntrega === 1
                        ?
                        item.calificacion === null && <Box sx={{ ...flexRows, gap: '20px', mt: 2 }}>
                            <>
                                <Button
                                    fullWidth
                                    onClick={() => handleEditActivity(item.id_recurso)}
                                    isLoading={isSaving}
                                >
                                    Modificar
                                </Button>
                            </>
                            <>
                                <Button
                                    fullWidth
                                    onClick={() => handleCancel(item.id_recurso)}
                                    variant="outlined"
                                >
                                    Cancelar
                                </Button>
                            </>
                        </Box>
                        :
                        item.calificacion === null && <Button
                            fullWidth
                            onClick={() => handleShowDialog(item.id_recurso)}
                            sxProps={{ mt: 2 }}
                            isLoading={isSaving}
                        >
                            Finalizar Actividad
                        </Button>
                }
            </>
        );
    }

    const ButtonSection = (isDesktop: boolean = true) => (
        <Box
            sx={
                [
                    { width: '100%' },
                    isDesktop && { ...flexRows, gap: '30px', mb: '25px' },
                    !isDesktop && { ...flexColumn, gap: '18px', pb: 4 }
                ]
            }
        >
            <>
                {
                    !isLoading &&
                    manuales.map((item, i) => (
                        <Box sx={{ width: isDesktop ? '300px' : '100%' }} key={i}>
                            <ManualsButton idTipoManual={item} />
                        </Box>
                    ))
                }
            </>

        </Box>
    );

    const handleRetroAlimentacion = (retroalimentacion: string) => {
        setRetroalimentacion(retroalimentacion);
        setOpenRetroDialog(true);
    }

    const getLabel = (contenidos: any) => {
        return contenidos?.[0]?.titulo_elemento;
    }

    return (
        <>
            {isSaving && (
                <LoadingCircular Text="Guardando actividad..." isSaving />
            )}
            {
                isMobile
                    ?
                    verBotones && ButtonSection(!isMobile)
                    :
                    verBotones && ButtonSection(betweenDevice ? false : true)
            }
            {
                isLoading
                    ?
                    <LoadingCircular Text="Cargando Actividades..." />
                    :
                    dataMapped?.agrupadoPorUnidad && Object.entries(dataMapped.agrupadoPorUnidad).map(([unidad, contenidos], index) =>
                        <Accordion
                            key={index}
                            title={getLabel(contenidos)}
                            sxProps={accordionStyle}
                            customHeader={!isMobile ? <AccordionStatus tittle={getLabel(contenidos)} status={contenidos?.[0]?.estatus} /> : undefined}
                        >
                            {
                                isMobile && <Box sx={{ padding: '10px' }}>
                                    <StatusIcon estado={contenidos?.[0]?.estatus} />
                                </Box>
                            }

                            {
                                contenidos?.filter((item) => item.titulo_elemento === unidad).map((item, i) => (
                                    <Box
                                        key={i}
                                    >
                                        {
                                            item.calificacion &&
                                            <Box sx={[
                                                { ...flexRows, justifyContent: 'space-between', pl: 3, pr: 3, borderBottom: `1px solid #E0E0E0`, pb: 1 },
                                                isMobile && { flexDirection: 'column', gap: '10px' }
                                            ]}>
                                                {verCalificacion &&
                                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                                        <Typography component="h3" variant="h3" color="primary">Calificación:</Typography>
                                                        <Typography component="h3" variant="h3" >{item.calificacion}</Typography>
                                                    </Box>}
                                                <Box sx={{ width: '250px' }}>
                                                    {
                                                        item.retroalimentacion && <Button
                                                            fullWidth
                                                            onClick={() => handleRetroAlimentacion(item.retroalimentacion || '')}
                                                            isLoading={isSaving}
                                                        >
                                                            Ver Retroalimentación
                                                        </Button>
                                                    }
                                                </Box>
                                            </Box>
                                        }

                                        <Box
                                            dangerouslySetInnerHTML={{ __html: item.contenido_elemento }}
                                            sx={{ ...innerHTMLStyle }}
                                        />
                                        <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
                                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                                Entrega de actividad
                                            </Typography>

                                            <Box sx={{ pt: 2 }}>
                                                <Typography component="p" variant="body1" color="primary">
                                                    Comentario:
                                                </Typography>
                                                <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.secondary, fontFamily: theme.typography.fontFamily }}>
                                                    Total de palabras: {totalPalabras[String(item.id_recurso)] ?? 0}/5000
                                                </Typography>
                                                <Controller
                                                    name={`comentario.${item.id_recurso}`}
                                                    control={control}
                                                    defaultValue={item.entrega?.contenido_entregado ?? ''}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            placeholder="Ingresa tu comentario"
                                                            multiline
                                                            rows={5}
                                                            fullWidth
                                                            disabled={item.hasEntrega === 1 ? true : false}
                                                            slotProps={{
                                                                input: {
                                                                    inputProps: {
                                                                        maxLength: 9999999
                                                                    },
                                                                },
                                                            }}
                                                            onChange={(event) => handleChange(event, item.id_recurso, field)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter" && !e.shiftKey) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onPaste={(e) => handleOnPaste(e, item.id_recurso, contenido, showNotification)}
                                                        />
                                                    )}
                                                />
                                            </Box>

                                            {
                                                subirArchivos
                                                    ? <Files item={item} />
                                                    : (item.calificacion === null && (
                                                        <Button
                                                            fullWidth
                                                            onClick={() => handleShowDialog(item.id_recurso)}
                                                            sxProps={{ mt: 2 }}
                                                            isLoading={isSaving}
                                                        >
                                                            Finalizar Actividad
                                                        </Button>
                                                    ))
                                            }

                                        </Box>
                                    </Box>
                                ))
                            }
                        </Accordion>
                    )
            }
            <RetroalimentacionDialog isOpen={openRetroDialog} close={() => setOpenRetroDialog(false)} retroalimentacion={retroalimentacion} />
            <GenericDialog mensaje={"¡Atención! Una vez enviada, la actividad no puede modificarse. ¿Deseas enviarla?"} tipo="warning" isOpen={isOpenAvisoActividad} close={(isConfirmar: boolean) => handleCloseGenericDialog(isConfirmar)} />
        </>
    );
};