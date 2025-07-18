import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import RichText from '../../molecules/RichText/RichText';
import { Box, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import Button from '../../atoms/Button/Button';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { SalaConversacion as sala } from "@iconsCustomizeds";
import { ComentariosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import { EliminarComentarioDialog } from "../../molecules/Dialogs/EliminarComentarioDialog/EliminarComentarioForosDialog";
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';

import { useGetSalaConversacion } from "../../../services/SalaConversacionService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";


const SalaConversacion: React.FC = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [typeDialog, setTypeDialog] = React.useState<'Comentar' | 'Editar' | 'Responder'>("Comentar");
    const [isOpenForosDialog, setIsOpenForosDialog] = React.useState(false);
    const [isOpenEliminarComentarioDialog, setIsOpenEliminarComentarioDialog] = React.useState(false);
    const { data: conversationData, isLoading } = useGetSalaConversacion(4);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleOpenComentariosDialog = (type: 'Comentar' | 'Editar' | 'Responder' = 'Comentar') => {
        setTypeDialog(type);
        setIsOpenForosDialog(true)
    };
    const [value, setValue] = React.useState(0);

    const SalaConversacion = () => {

        return (
            <>

                <Box sx={isMobile ? {} : { width: '90%' }}>

                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, width: '90%' }}>
                        La Sala es de uso libre, el único requisito para participar en ella, es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global, así como expresarse siempre con respeto hacia todos sus compañeros y compañeras.
                    </Typography>

                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mt: '20px', width: '90%' }}>
                        Si tienes alguna duda o inquietud respecto del programa en el que estás participando, comunícala a través de los demás medios diseñados para ello.
                    </Typography>

                    <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'row', mt: '50px', ml: '50px', gap: '84px' }} >

                        <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'column', width: '50%', backgroundColor: '#F8F8F9', paddingInline: '38px', borderRadius: '20px' }}>
                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px' }}>
                                Inicia un nuevo chat
                            </Typography>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '281px',
                                    backgroundColor: '#FFF',
                                    mt: '20px'
                                }}
                            >
                                <RichText />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    marginTop: '10px'

                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    Enviar                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => { }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={isMobile ? { mt: '23px' } : { display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                aria-label="visible arrows tabs example"
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}
                            >
                                <Tab label="Más Recientes" key={1} sx={{ minWidth: '150px', padding: '0px' }} />
                                <Tab label="Más Antiguos" key={2} sx={{ minWidth: '150px', padding: '0px' }} />

                            </Tabs>

                            <TabPanel key={0} value={value} index={0}>
                                {ConversationRoomMUI()}
                            </TabPanel>
                            <TabPanel key={1} value={value} index={1}>
                                {ConversationRoomMUI()}
                            </TabPanel>
                        </Box>
                    </Box >
                </Box>

            </>
        )
    }

    // Componente para renderizar un solo mensaje y sus respuestas
    const Message = ({ message, depth = 0 }) => {
        // Ajusta el margen para anidar las respuestas
        const marginLeft = depth * 20; // 20px por cada nivel de anidamiento

        const formatDate = (dateString: string | number | Date) => {
            const date = new Date(dateString);

            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();

            const monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            const month = monthNames[date.getMonth()];

            let hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12; // La hora '0' debe ser '12'
            const formattedHours = String(hours).padStart(2, '0'); // Asegura dos dígitos para las horas

            return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds}${ampm}`;
        };

        const isCurrentUserAuthor = message.id_usuario === 1;

        return (
            <Box key={message.id_mensaje} sx={{
                display: 'flex',
                flexDirection: 'column',
                pb: '20px',
                marginLeft: `${marginLeft}px`, // Aplicamos la indentación aquí
                borderLeft: depth > 0 ? '2px solid #e0e0e0' : 'none', // Borde para anidación
                paddingLeft: depth > 0 ? '10px' : '0', // Espaciado después del borde
                mt: depth > 0 ? '10px' : '0' // Un pequeño margen superior para separar respuestas
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: '#F1F4F6',
                        padding: '8px 15px',
                        borderBottom: '1px solid #AAB1B6',
                        borderRadius: '4px 4px 0px 0px'
                    }}
                >
                    <Avatar
                        src={`https://i.pravatar.cc/150?img=${message.id_usuario}`} // Avatar dinámico por ID de usuario
                        alt="Avatar"
                        width={48}
                        height={48}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="span" variant="body2">
                            {message.autor || `Usuario ${message.id_usuario}`}
                        </Typography>
                        <Typography component="span" variant="body1" color="disabled">
                            {formatDate(message.fecha_envio)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                        p: '15px',
                        backgroundColor: '#F8F8F9',
                        width: '100%',
                        minHeight: '80px', // Usamos minHeight en lugar de height fijo
                        borderRadius: '0px 0px 4px 4px'
                    }}
                >
                    <Typography component="span" variant="body1">
                        {message.mensaje}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '15px', width: '100%', mt: 'auto' }}> {/* mt: 'auto' empuja los botones hacia abajo */}
                        {/* Los botones de Editar y Eliminar pueden mostrarse condicionalmente según el usuario logueado */}
                        {isCurrentUserAuthor ? (
                            <>
                                <Button
                                    fullWidth
                                    onClick={() => handleOpenComentariosDialog('Editar')}
                                    variant="outlined"
                                    sxProps={{ height: '26px' }}
                                >Editar</Button>

                                <Button
                                    fullWidth
                                    onClick={() => setIsOpenEliminarComentarioDialog(true)}
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    sxProps={{ height: '26px' }}
                                >
                                    Eliminar
                                </Button>
                            </>) :
                            (

                                <Button
                                    fullWidth
                                    onClick={() => handleOpenComentariosDialog('Responder')}
                                    variant="outlined"
                                    sxProps={{ height: '26px' }}
                                >Reponder
                                </Button>
                            )
                        }
                    </Box>
                </Box >
                {/* Recursivamente renderiza las respuestas */}
                {
                    message.respuestas && message.respuestas.length > 0 && (
                        <Box sx={{ mt: '10px' }}> {/* Margen superior para separar las respuestas del mensaje padre */}
                            {message.respuestas.map((reply: any) => (
                                <Message key={reply.id_mensaje} message={reply} depth={depth + 1} />
                            ))}
                        </Box>
                    )
                }
            </Box >
        );
    };

    // Componente principal de la sala de conversación
    const ConversationRoomMUI = () => {
        // Filtra los mensajes de nivel superior (aquellos sin id_mensaje_respuesta)
        const topLevelMessages = conversationData.data.filter(msg => msg.id_mensaje_respuesta === null);

        return (
            <Box sx={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                height:'500px',
                overflowY:'auto'
            }}>

                {topLevelMessages.length > 0 ? (
                    topLevelMessages.map((message) => (
                        <Message key={message.id_mensaje} message={message} />
                    ))
                ) : (
                    <Typography component="span" variant="body2">
                        No hay mensajes para mostrar.
                    </Typography>
                )}
            </Box>
        );
    };


    return (

        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.SALA_CONVERSACIONES} Icon={sala} />
                        <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                            Esta Sala de Conversación es un espacio que ponemos a disposición de todas y todos nuestros estudiantes, con el propósito de que entables diálogos productivos, generen redes de contactos y amigos, compartan información, experiencias y aporten ideas que enriquezcan sus conocimientos.
                        </Typography>
                        {
                            isLoading ? <LoadingCircular Text="Cargando Sala de Conversación" /> : SalaConversacion()
                        }
                    </>
                    :
                    <ContainerDesktop title={TitleScreen.SALA_CONVERSACIONES} description={DescripcionesPantallas.SALA_CONVERSACION}>
                        {
                            isLoading ? <LoadingCircular Text="Cargando Sala de Conversación" /> : SalaConversacion()
                        }
                    </ContainerDesktop>
            }
            <ComentariosDialog isOpen={isOpenForosDialog} close={() => setIsOpenForosDialog(false)} type={typeDialog} />
            <EliminarComentarioDialog isOpen={isOpenEliminarComentarioDialog} close={() => setIsOpenEliminarComentarioDialog(false)} />
        </>
    );
};

export default SalaConversacion;