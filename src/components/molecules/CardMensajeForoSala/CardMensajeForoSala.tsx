import { Box, Typography as MuiTypography } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Button from "../../atoms/Button/Button";
import type { Mensaje } from "@constants";
import { flexColumn } from "@styles";

type CardMensajeForoSalaProps = {
    item: Mensaje;
    onComentar: (data: { type: string, mensaje: Mensaje}) => void;
    onDelete: (id: number) => void;
}

export const CardMensajeForoSala: React.FC<CardMensajeForoSalaProps> = ({item, onComentar, onDelete}) => {

    const handleOpenComentariosDialog = (type: 'Comentar' | 'Editar' | 'Responder' = 'Comentar') => {
        onComentar({type, mensaje: item});
    };

    const handleOpenEliminarComentarioDialog = () => {
        onDelete(item.id_mensaje);
    };

    return(
        <>
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
                                            handleOpenComentariosDialog('Editar');
                                        }}
                                        variant="outlined"
                                        sxProps={{ height: '26px' }}
                                    >Editar</Button>
                                </>
                                <>
                                    <Button 
                                        fullWidth 
                                        variant="outlined" 
                                        color="error" 
                                        sxProps={{ height: '26px' }}
                                        onClick={handleOpenEliminarComentarioDialog} 
                                    >Eliminar</Button>
                                </>
                            </>
                        :
                        <>
                            <>
                                    <Button 
                                        fullWidth
                                        onClick={() => handleOpenComentariosDialog('Responder')}
                                        variant="outlined"
                                        sxProps={{ height: '26px' }}
                                    >Responder</Button>
                                </>
                        </>
                    }
                </Box>
            </Box>
        </>
    )
}