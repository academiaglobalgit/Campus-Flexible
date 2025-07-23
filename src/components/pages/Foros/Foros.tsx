import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme, Typography as MuiTypography } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {Foros as ForosIcon, Edit1 } from "@iconsCustomizeds";
import { DividerSection } from "../../molecules/DividerSection/DividerSection";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { foroSchema, type ForoData } from "../../../schemas/foroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { flexColumn, flexRows, innerHTMLStyle } from "@styles";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { ComentariosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import { EliminarComentarioDialog } from "../../molecules/Dialogs/EliminarComentarioDialog/EliminarComentarioForosDialog";
import { GetMensajesForo, GetTemaForoById, SaveComentarioForo } from "../../../services/ForosService";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ForosSaveResponse } from "@constants";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { getForoSelected } from "../../../hooks/useLocalStorage";

const comentarios = [{ id: 0, label: 'Todos los comentarios' }, { id: 1, label: 'Mis comentarios' }];
const ordenar = [{ id: 0, label: 'Más actuales' }, { id: 1, label: 'Más antigüos' }];
const limite = [{ id: 5, label: '5' }, { id: 10, label: '10' }, { id: 15, label: '15' }];

const Foros: React.FC = () => {
    const theme = useTheme();
    
    const { id } = useParams<{id:string}>();
    const { refetch } = GetTemaForoById(Number(id!), {enabled: false});
    
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [paginaActual, setPaginaActual] = React.useState(1);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [todosComentarios, setTodosComentarios] = React.useState(1);
    const [orden, setOrden] = React.useState(0);
    const [paginaSize, setPaginaSize] = React.useState(5);
    const GetTipoOrden = (orden: number): string => (orden === 0 ? 'DESC' : 'ASC');
    const [textComentario, setTextComentario] = React.useState<{ autor: string, mensaje: string } | null>(null);
    const [idMensajeRespuesta, setIdMensajeRespuesta] = React.useState(0);

    const { data: Mensajes, isLoading } = GetMensajesForo(Number(id!), paginaActual, todosComentarios, GetTipoOrden(orden), paginaSize);

    const [typeDialog, setTypeDialog] = React.useState<'Comentar' | 'Editar' | 'Responder'>("Comentar");
    const [isOpenForosDialog, setIsOpenForosDialog] = React.useState(false);
    const [isOpenEliminarComentarioDialog, setIsOpenEliminarComentarioDialog] = React.useState(false);
    const [temaData, setTemaData] = React.useState<any>();    

    const { control, formState: { errors } } = useForm<ForoData>({
            resolver: zodResolver(foroSchema(comentarios.map((m) => m.id), ordenar.map((t) => t.id), limite.map((t) => t.id))),
            defaultValues: {
                comentarios: 0,
                ordenar: 0,
                limite: 5,
            },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foroSelected = getForoSelected();
                if(foroSelected !== "") {
                    setTemaData(JSON.parse(foroSelected));
                }else{
                    const response = await refetch();
                    const dataArray = response.data?.data[0];
                    setTemaData(dataArray);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, refetch]);

    useEffect(() => {
        if (Mensajes?.data?.totalPaginas) {
            setTotalPaginas(Mensajes.data.totalPaginas);
        }
    }, [Mensajes]);

    const handleComentar = (val: any) => {
        console.log(val);
        setIsOpenForosDialog(false);
        createMutation.mutate({ id_mensaje: null, id_recurso: Number(id!), mensaje: val.htmlContent, id_mensaje_respuesta: null });
    }

    const createMutation = useMutation({
        mutationFn: SaveComentarioForo,
        onSuccess: (newComment: ForosSaveResponse) => {
            console.log(newComment);
            // showNotification(`Perfil actualizado satisfactorimente`,"success");
            // setLoading(false);
        },
        onError: (error) => {
            console.log(error)
            // showNotification(`Error al registrar: ${error.message}`, "error");
            // setLoading(false);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    const ComentarButtonSection = () => {
        return( temaData && 
            <Box>
                <DividerSection Title={ temaData.titulo_elemento } />
                <Box sx={{...innerHTMLStyle}} dangerouslySetInnerHTML={{__html: temaData.contenido_elemento}} />
                <Box sx={{ width: '100%', mt: '32px' }}>
                    <Button 
                        fullWidth
                        onClick={() => handleOpenComentariosDialog()}
                        icon={<Edit1 />}
                    >
                        Comentar
                    </Button>
                </Box>
            </Box>
        );
    }

    const handleOpenComentariosDialog = (type: 'Comentar' | 'Editar' | 'Responder' = 'Comentar') => {
        setTypeDialog(type);
        setIsOpenForosDialog(true)
    };

    const ComentariosCard = () => {
        return (
            isLoading 
            ?
                <LoadingCircular Text="Cargando Mensajes..." sxProps={{ height: undefined, py: 5 }} />
            :
            Mensajes && Mensajes.data?.mensajes.map((item) => (
                <Comentario key={item.id_mensaje} {...item} />
            ))
        );
    }

    const Comentario = (item: any) => (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                pb: '20px',
            }}>
            <Box 
                sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F1F4F6', padding: '8px 15px 8px 15px', borderBottom: '1px solid #AAB1B6', borderRadius: '4px 4px 0px 0px' }}>
                <Avatar
                    src={item.foto_perfil_url}
                    alt={item.autor}
                    width={48}
                    height={48}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component="span" variant="body2">
                        {item.autor}
                    </Typography>
                    <Typography component="span" variant="body1" color="disabled">
                        {item.fecha_envio}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    ...flexColumn, 
                    alignItems: 'flex-start', 
                    gap: '10px', 
                    p: '15px', 
                    backgroundColor: '#F8F8F9', 
                    width: '100%', 
                    height: '100px', 
                    borderRadius: '0px 0px 4px 4px' 
                }}
            >
                <MuiTypography component="span" variant="body2" dangerouslySetInnerHTML={{__html: item.mensaje}} />
                <Box sx={{ display:'flex', gap: '15px', width: '100%', pb: 2 }}>
                    {
                        item.creador === 1 
                        ?
                            <>
                                <>
                                    <Button 
                                        fullWidth
                                        onClick={() => {
                                            console.log(item);
                                            setTextComentario({ mensaje: item.mensaje, autor: item.autor || '' });
                                            setIdMensajeRespuesta(item.id_mensaje);
                                            handleOpenComentariosDialog('Editar');
                                        }}
                                        variant="outlined"
                                        sxProps={{ height: '26px' }}
                                    >Editar</Button>
                                </>
                                <>
                                    <Button fullWidth onClick={() => setIsOpenEliminarComentarioDialog(true)} 
                                    variant="outlined" color="error" sxProps={{ height: '26px' }}>Eliminar</Button>
                                </>
                            </>
                        :
                        <>
                            <>
                                    <Button 
                                        fullWidth
                                        onClick={() => {
                                            console.log(item);
                                            setTextComentario({ mensaje: item.mensaje, autor: item.autor || '' });
                                            setIdMensajeRespuesta(item.id_mensaje);
                                            handleOpenComentariosDialog('Editar');
                                        }}
                                        variant="outlined"
                                        sxProps={{ height: '26px' }}
                                    >Editar</Button>
                                </>
                        </>
                    }
                </Box>
            </Box>
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
                                <Comentario key={reply.id_mensaje} {...reply} />
                            ))
                        }
                    </Box>
                )
             }
        </Box>
    );

    const DiscusionSection = (flexDirection = 'column') => {
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
                                {comentarios.map((item) => (
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
                                {ordenar.map((item) => (
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
                                {limite.map((item) => (
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

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
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

  return (
    <>
        {
            isMobile 
                ?
                    <>
                        <TituloIcon Titulo="Foros" Icon={ForosIcon} />
                        <ComentarButtonSection />
                        {DiscusionSection()}
                        <ComentariosCard />
                        <PaginationSection />
                    </>
                :
                    <ContainerDesktop title="Foros">
                        <ComentarButtonSection />
                        {DiscusionSection('row')}
                        <ComentariosCard />
                        <PaginationSection />
                    </ContainerDesktop>
        }
        <ComentariosDialog 
            isOpen={isOpenForosDialog} 
            close={() => setIsOpenForosDialog(false)} 
            type={typeDialog} 
            save={(val) => handleComentar(val)}
            textAccion={textComentario ?? undefined}
        />
        <EliminarComentarioDialog isOpen={isOpenEliminarComentarioDialog} close={() => setIsOpenEliminarComentarioDialog(false)} />
    </>
    
  );
}

export default Foros;