import { useEffect, useState } from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { accordionStyle, flexColumn, flexRows } from "@styles";
import { useParams } from "react-router-dom";
import { updateActividad, useGetActividades } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { convertRemoteToPreviewFile, toRoman } from "../../../utils/Helpers";
import { Typography } from "../../atoms/Typography/Typography";
import { FileUploader } from "../../molecules/FileUploader/FileUploader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../../../providers/NotificationProvider";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";

type PreviewFile = {
    file: File;
    preview?: string;
};

export const Actividades: React.FC = () => {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const { showNotification } = useNotification();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [isSaving, setIsSaving] = useState(false);

    const { id } = useParams<{ id: string }>();
    const { dataMapped, isLoading } = useGetActividades(Number(id!), "Actividades");

    const { control, setValue } = useForm();

    const [archivosPorId, setArchivosPorId] = useState<Record<number, PreviewFile[]>>({});
    const [contenido, setContenido] = useState<Record<number, string>>({});

    const handleFilesChange = (id: number, files: PreviewFile[]) => {
        setArchivosPorId((prev) => ({
            ...prev,
            [id]: files,
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setContenido((prev) => ({
            ...prev,
            [id]: event.target.value
        }));
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

    const handleSaveActivity = (id_recurso: number) => {
        setIsSaving(true);
        const contenidoText = contenido[id_recurso] || '';
        const archivos = archivosPorId[id_recurso] || [];
        const files = archivos.map((item) => item.file);
        createMutationActivity.mutate({ id_recurso, contenido: contenidoText, archivos: files, archivos_eliminar: [], id_entrega: null });
    }

    const createMutationActivity = useMutation({
        mutationFn: updateActividad,
        onSuccess: async () => {
            showNotification(`La actividades se guardo satisfactoriamente`, "success");

            await queryClient.invalidateQueries({ queryKey: ["Actividades"] });
            setIsSaving(false);
        },
        onError: (error) => {
            console.error(error);
            showNotification(`Error al registrar: ${error.message}`, "error");
            setIsSaving(false);
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

    const handleLink = (link: string) => {
        window.open(link, '_blank');
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
            {
                !isLoading &&
                <>
                    {
                        dataMapped?.manuales && Object.entries(dataMapped.manuales).map(([_, item], index) =>
                            <Box sx={{ width: isDesktop ? '300px' : '100%' }} key={index}>
                                <Button onClick={() => handleLink(item.url_archivo)} fullWidth >{item.titulo}</Button>
                            </Box>
                        )
                    }
                </>
            }
        </Box>
    );


    return (
        <>
            {
                isMobile
                    ?
                    ButtonSection(!isMobile)
                    :
                    ButtonSection(betweenDevice ? false : true)
            }
            {
                isLoading
                    ?
                    <LoadingCircular Text="Cargando Actividades..." />
                    :
                    dataMapped?.agrupadoPorUnidad && Object.entries(dataMapped.agrupadoPorUnidad).map(([unidad, contenidos], index) =>
                        <Accordion
                            key={index}
                            title={`Unidad ${toRoman(Number(unidad))}`}
                            sxProps={accordionStyle}
                            customHeader={!isMobile ? <AccordionStatus tittle={`Unidad ${toRoman(Number(unidad))}`} status={contenidos?.[0]?.estatus} /> : undefined}
                        >
                            {
                                contenidos?.filter((item) => item.unidad === Number(unidad)).map((item, i) => (
                                    <Box
                                        key={i}
                                    >
                                        <Box
                                            dangerouslySetInnerHTML={{ __html: item.contenido_elemento }}
                                            sx={{
                                                '& h1, h2': {
                                                    font: theme.typography.h4
                                                },
                                                '& h1, h2, h3': {
                                                    color: 'primary.main',
                                                },
                                                '& p': {
                                                    marginBottom: '1rem',
                                                    lineHeight: 1.6,
                                                    color: 'text.primary'
                                                },
                                                '& ul': {
                                                    paddingLeft: '1.5rem',
                                                    listStyleType: 'disc',
                                                },
                                                pl: 3, pr: 3
                                            }}
                                        />
                                        <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
                                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                                Entrega de actividad
                                            </Typography>
                                            <Box sx={{ pt: 2 }}>
                                                <Controller
                                                    name={`comentario.${item.id_recurso}`}
                                                    control={control}
                                                    defaultValue={item.entrega?.contenido_entregado ?? ''}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Comentario"
                                                            placeholder="Ingresa tu comentario"
                                                            multiline
                                                            rows={5}
                                                            fullWidth
                                                            slotProps={{
                                                                input: {
                                                                    inputProps: {
                                                                        maxLength: 200
                                                                    },
                                                                },
                                                            }}
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                field.onChange(event); // necesario para que React Hook Form actualice el valor
                                                                handleChange(event, item.id_recurso); // ← si tú quieres manejar algo extra
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>

                                            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
                                                <Typography component="p" variant="body1" color="primary">
                                                    Sube tu archivo aquí
                                                </Typography>
                                                <Typography component="p" variant="body1">
                                                    (pdf. xml. word, ppt)
                                                </Typography>
                                            </Box>
                                            <FileUploader
                                                files={archivosPorId[item.id_recurso] || []}
                                                onFilesChange={(files) => handleFilesChange(item.id_recurso, files)}
                                                maxFiles={3} maxFileSizeMb={3}
                                            />
                                            {
                                                item.hasEntrega === 1
                                                    ?
                                                    <Box sx={{ ...flexRows, gap: '20px', mt: 2 }}>
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
                                                    <Button
                                                        fullWidth
                                                        onClick={() => handleSaveActivity(item.id_recurso)}
                                                        sxProps={{ mt: 2 }}
                                                        isLoading={isSaving}
                                                    >
                                                        Finalizar Actividad
                                                    </Button>
                                            }

                                        </Box>
                                    </Box>
                                ))
                            }

                        </Accordion>
                    )
            }
        </>
    );
};