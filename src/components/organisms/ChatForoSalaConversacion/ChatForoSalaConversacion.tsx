import React from "react";
import { DeleteMensaje, GetMensajesForo, SaveComentarioForo } from "../../../services/ForosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { CardMensajeForoSala } from "../../molecules/CardMensajeForoSala/CardMensajeForoSala";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { DividerSection } from "../../molecules/DividerSection/DividerSection";
import { Controller, useForm } from "react-hook-form";
import { foroSchema, type ForoData } from "../../../schemas/foroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { flexRows } from "@styles";
import { ComentariosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import { EliminarComentarioDialog } from "../../molecules/Dialogs/EliminarComentarioDialog/EliminarComentarioForosDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ForosSaveResponse } from "@constants";
import { SALA_CONVERSACION } from "../../../types/endpoints";
import { useNotification } from "../../../providers/NotificationProvider";
import LoadingDialog from "../../molecules/Dialogs/LoadingDialog/LoadingDialog";

type ChatForoSalaConversacionProps = {
    idRecurso: number;
    showFiltros: boolean;
    showPagination: boolean;
    showComentarDialog: boolean;
    onCloseComentarDialog?: () => void;
}

const Filtros = {
    comentarios: [{ id: 0, label: 'Todos los comentarios' }, { id: 1, label: 'Mis comentarios' }],
    order: [{ id: 0, label: 'Más actuales' }, { id: 1, label: 'Más antigüos' }],
    limite: [{ id: 5, label: '5' }, { id: 10, label: '10' }, { id: 15, label: '15' }]
}

const GetTipoOrden = (orden: number): string => (orden === 0 ? 'DESC' : 'ASC');


export const ChatForoSalaConversacion: React.FC<ChatForoSalaConversacionProps> = ({idRecurso, showFiltros, showPagination, showComentarDialog, onCloseComentarDialog}) => {
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();
    
    const [paginaActual, setPaginaActual] = React.useState(1);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [todosComentarios, setTodosComentarios] = React.useState(1);
    const [orden, setOrden] = React.useState(0);
    const [paginaSize, setPaginaSize] = React.useState(5);
    const [idMensaje, setIdMensaje] = React.useState(0);

    const { data: Mensajes, isLoading } = GetMensajesForo(idRecurso, paginaActual, todosComentarios, GetTipoOrden(orden), paginaSize);

    const [textComentario, setTextComentario] = React.useState<{ autor: string, mensaje: string } | null>(null);

    const [typeDialog, setTypeDialog] = React.useState<any>("Comentar");
    const [isOpenForosDialog, setIsOpenForosDialog] = React.useState(false);
    const [isOpenEliminarComentarioDialog, setIsOpenEliminarComentarioDialog] = React.useState(false);
    const [isOpenLoading, setIsOpenLoading] = React.useState(false);
    const [textoLoading, setTextoLoading] = React.useState("");

    const { control, formState: { errors } } = useForm<ForoData>({
        resolver: zodResolver(foroSchema(Filtros.comentarios.map((m) => m.id), Filtros.order.map((t) => t.id), Filtros.limite.map((t) => t.id))),
        defaultValues: {
            comentarios: 0,
            ordenar: 0,
            limite: 5,
        },
    });

    React.useEffect(() => {
        if (showComentarDialog) {
            handleOpenComentariosDialog('Comentar', undefined);
        }
    }, [showComentarDialog]);

    React.useEffect(() => {
        if (Mensajes?.data?.totalPaginas) {
            setTotalPaginas(Mensajes.data.totalPaginas);
        }
    }, [Mensajes]);
    
    const handleComentar = (val: { htmlContent: string, type: string }) => {
        setIsOpenForosDialog(false);

        if(onCloseComentarDialog) onCloseComentarDialog();

        setIsOpenLoading(true);
        setTextoLoading("Guardando...");
        if(val.type === 'Editar' || val.type === 'Comentar') {
            createMutation.mutate({ id_mensaje: val.type === 'Comentar' ? null : idMensaje, id_recurso: idRecurso, mensaje: val.htmlContent, id_mensaje_respuesta: null });
        }else{
            createMutation.mutate({ id_mensaje: null, id_recurso: idRecurso, mensaje: val.htmlContent, id_mensaje_respuesta: idMensaje });
        }
    }
    
    const createMutation = useMutation({
        mutationFn: SaveComentarioForo,
        onSuccess: async (newComment: ForosSaveResponse) => {
            console.log(newComment);
            setIdMensaje(0);

            const keys = [SALA_CONVERSACION.GET_MENSAJES.key, idRecurso, paginaActual, todosComentarios, GetTipoOrden(orden), paginaSize];
            
            await queryClient.invalidateQueries({
                queryKey: keys,
                exact: true
            });

            showNotification(`Comentario guardado satisfactorimente`,"success");
            setIsOpenLoading(false);
        },
        onError: (error) => {
            console.log(error)
            setIsOpenLoading(false);
            showNotification(`Error al registrar: ${error.message}`, "error");
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });
    
    const handleEliminarComentario = (isDelete: boolean) => {
            setIsOpenEliminarComentarioDialog(false);
        if(isDelete) {
            setIsOpenLoading(true);
            setTextoLoading("Eliminando comentario");
            deleteMutation.mutate(idMensaje);
        }
    }
    
    const deleteMutation = useMutation({
        mutationFn: DeleteMensaje,
        onSuccess: async (_data) => {
            // await queryClient.invalidateQueries({ queryKey: [SALA_CONVERSACION.GET_MENSAJES.key] });
            const keys = [SALA_CONVERSACION.GET_MENSAJES.key, idRecurso, paginaActual, todosComentarios, GetTipoOrden(orden), paginaSize];
            await queryClient.cancelQueries({ queryKey: keys });
            
            await queryClient.invalidateQueries({
                queryKey: keys,
                exact: true
            });
            
            showNotification(`Comentario eliminado satisfactorimente`,"success");
            setIsOpenLoading(false);
            
            setIdMensaje(0);
        },
        onError: (error) => {
            showNotification(`Error al registrar: ${error.message}`, "error");
            setIsOpenLoading(false);
        },
        onSettled: () => {
            // Invalidar para asegurar datos frescos
            // queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    const handleOpenComentariosDialog = (type: string, mensaje: any) => {
        setTypeDialog(type);
        setIsOpenForosDialog(true);

        if(mensaje) {
            setTextComentario({ mensaje: mensaje.mensaje, autor: mensaje.autor || '' });
            setIdMensaje(mensaje.id_mensaje);
        }
    };

    const handleOpenEliminarComentarioDialog = (id_mensaje: number) => {
        setIsOpenEliminarComentarioDialog(true);
        setIdMensaje(id_mensaje);
    };

    const handleCloseComentarDialog = () => {
         setIsOpenForosDialog(false);
         if(onCloseComentarDialog) onCloseComentarDialog();
    }

    const ComentarioCard = (item: any) => (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                pb: '20px',
            }}
        >
            <CardMensajeForoSala 
                item={item} 
                onComentar={ (e)=> handleOpenComentariosDialog(e.type, e.mensaje)} 
                onDelete={ (e)=> handleOpenEliminarComentarioDialog(e)} 
            />
            {
                item.respuestas && item.respuestas.length > 0 && (
                    <Box 
                        sx={{ 
                            ml: '20px', 
                            mt: 2,
                            borderLeft: '2px solid #e0e0e0',
                            paddingLeft: '20px',
                            paddingTop: '20px',
                        }}
                    >
                        {
                            item.respuestas.map((reply: any) => (
                                <ComentarioCard key={reply.id_mensaje} {...reply} />
                            ))
                        }
                    </Box>
                )
            }
        </Box>
    )


    const ComentariosCard = () => {
        return (
            isLoading 
            ?
                <LoadingCircular Text="Cargando Mensajes..." sxProps={{ height: undefined, py: 5 }} />
            :
            Mensajes && Mensajes.data?.mensajes.map((item, index) => (
                <ComentarioCard key={index} {...item} />
            ))
        );
    }

    const FiltrosSection = (flexDirection = 'column') => {
        return(
            <Box sx={{ mt: '46px' }}>
                <DividerSection Title="Discusión" />
                <Box sx={{ display: 'flex', flexDirection, gap: '20px', pb: '20px' }}>
                    <Controller
                        name="comentarios"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.comentarios}
                            >
                            <InputLabel id="mostrar-label">Mostrar</InputLabel>
                            <Select
                                labelId="mostrar-label"
                                label="Mostrar"
                                {...field}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    field.onChange(value);
                                    setTodosComentarios(value);
                                }}
                            >
                                {Filtros.comentarios.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="ordenar"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.ordenar}
                            >
                            <InputLabel id="ordenar-label">Ordenar por</InputLabel>
                            <Select
                                labelId="ordenar-label"
                                label="Ordenar por"
                                {...field}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    field.onChange(value);
                                    setOrden(value);
                                }}
                            >
                                {Filtros.order.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="limite"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.limite}
                            >
                            <InputLabel id="limite-label">Limite de resultados</InputLabel>
                            <Select
                                labelId="limite-label"
                                label="Limite de resultados"
                                {...field}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    field.onChange(value);
                                    setPaginaSize(value);
                                }}
                            >
                                {Filtros.limite.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />
                </Box>
            </Box>
        )
    }

    const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPaginaActual(value);
    };

    const PaginationSection = () => {
        return (
            <Box sx={{...flexRows, pb: 3 }}>
                <Pagination 
                    count={totalPaginas}
                    page={paginaActual}
                    shape="rounded" 
                    onChange={handlePagination} 
                />
            </Box>
        );
    }

    return(
        <>
            <>
                { showFiltros && FiltrosSection('row') }
                <ComentariosCard />
                { showPagination && PaginationSection() }
            </>
            
            <ComentariosDialog 
                isOpen={isOpenForosDialog} 
                close={handleCloseComentarDialog} 
                type={typeDialog} 
                save={(val) => handleComentar(val)}
                textAccion={textComentario ?? undefined}
            />
            <EliminarComentarioDialog 
                isOpen={isOpenEliminarComentarioDialog} 
                close={(val: boolean) => handleEliminarComentario(val)} 
            />
            <LoadingDialog isOpen={isOpenLoading} Text={textoLoading} />
        </>
    )
}