import React from "react";
import type { Notificaciones } from "@constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NOTIFICATIONS_ENDPOINTS } from "../../../types/endpoints";
import { MarkReadNotification } from "../../../services/NotificacionesService";
import { Box, LinearProgress, useTheme } from "@mui/material";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { Typography } from "../../atoms/Typography/Typography";
import { tiempoTranscurrido } from "../../../utils/Helpers";

type NotificacionProps = {
    item: Notificaciones;
    index: number;
}

export const CardNotification: React.FC<NotificacionProps> = ({item, index}) => {
    const theme = useTheme();
    const queryClient = useQueryClient();
    
    const [loadingItems, setLoadingItems] = React.useState<Set<number>>(new Set());    
    const startLoading = (id: number) => {
        setLoadingItems(prev => new Set(prev).add(id));
    };

    const hasLoading = (id: number) => loadingItems.has(id);

    const handleNotifications = async (item: Notificaciones) => {
        // console.log(item);
        const id = item.id_notificacion;
        startLoading(id); // ← inicia loading por item
        try {
            await createMutation.mutateAsync(id); // ← usa mutateAsync para esperar

            // setFilteredNotifications(prev => prev.filter(n => n.id_notificacion !== id));
            
            queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.key] });

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingItems(prev => {
                const updated = new Set(prev);
                updated.delete(id); // ← termina loading por item
                return updated;
            });
        }
    };

    const createMutation = useMutation({
        mutationFn: MarkReadNotification,
    });

    const IconsNotification = (item: Notificaciones) => {
        switch (item.tipo_notificacion) {
            case 'anuncio': return <NotificationsNoneIcon color="primary" sx={[item.leida === 1 && MarkedRead()]} />;
            case 'tarea_nueva': return <ThumbsUpDownOutlinedIcon color="primary" sx={[item.leida === 1 && MarkedRead()]} />;
            case 'mensaje': return <BusinessCenterOutlinedIcon color="primary" sx={[item.leida === 1 && MarkedRead()]} />;
        }
    };

    const MarkedRead = () => ({color: theme.palette.grey[100]})

    return(
        <Box>
            {hasLoading(item.id_notificacion) && <LinearProgress /> }
            <Box onClick={() => item.leida === 0 && handleNotifications(item)}
                sx={[{ 
                    width: '305px', 
                    height: '138px', 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '25px',
                    borderBottom: '1px solid #AAB1B6',
                    backgroundColor: item.leida ? '#F6FAFD' : '#FFFFFF',
                    cursor: item.leida === 0 ? 'pointer' : ''
                }, index === 0 && { borderTop: '1px solid #AAB1B6' } ]}
            >
                <Box sx={{pl: 1}}>
                    {IconsNotification(item)}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Typography component="span" variant="body2" color="primary" >{item.titulo}</Typography>
                        {
                            item.leida === 0 && <Box sx={{width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2'}}></Box>
                        }
                    </Box>
                    <Typography component="span" variant="body1">{item.mensaje}</Typography>
                    <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100]}}>{tiempoTranscurrido(item.fecha_envio)}</Typography>
                </Box>
            </Box>
        </Box>
    );
}