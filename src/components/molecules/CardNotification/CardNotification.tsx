import React from "react";
import type { Notificaciones } from "@constants";
import { useMutation } from "@tanstack/react-query";
import { MarkReadNotification } from "../../../services/NotificacionesService";
import { Box, LinearProgress, useMediaQuery, useTheme } from "@mui/material";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { Typography } from "../../atoms/Typography/Typography";
import { tiempoTranscurrido } from "../../../utils/Helpers";

type NotificacionProps = {
    item: Notificaciones;
    index: number;
    loadingItems: Set<number>;
    setLoadingItems: React.Dispatch<React.SetStateAction<Set<number>>>;
    setMarkedRead: (id: number) => void;
}

export const CardNotification: React.FC<NotificacionProps> = ({ item, index, loadingItems, setLoadingItems, setMarkedRead }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const startLoading = (id: number) => {
        setLoadingItems(prev => new Set(prev).add(id));
    };

    const hasLoading = (id: number) => loadingItems.has(id);

    const handleNotifications = async (item: Notificaciones) => {
        const id = item.id_notificacion;
        startLoading(id);
        try {
            await createMutation.mutateAsync(id);
            setMarkedRead(id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingItems(prev => {
                const updated = new Set(prev);
                updated.delete(id);
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

    const MarkedRead = () => ({ color: theme.palette.grey[100] })

    return (
        <Box>
            {hasLoading(item.id_notificacion) && <LinearProgress />}
            <Box onClick={() => item.leida === 0 && handleNotifications(item)}
                sx={[isMobile ? { width: '350px%', } : { width: '100%' }, {
                    height: '138px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    borderBottom: '1px solid #AAB1B6',
                    backgroundColor: item.leida === 0 ? '#F6FAFD' : '#FFFFFF',
                    cursor: item.leida === 0 ? 'pointer' : ''
                }, index === 0 && { borderTop: '1px solid #AAB1B6' }]}


            >
                <Box sx={{ pl: 1 }}>
                    {IconsNotification(item)}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Typography component="span" variant="body2" color="primary" >{item.titulo}</Typography>
                        {
                            item.leida === 0 && <Box sx={{ width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2' }}></Box>
                        }
                    </Box>
                    <Typography component="span" variant="body1">{item.mensaje}</Typography>
                    <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>{tiempoTranscurrido(item.fecha_envio)}</Typography>
                </Box>
            </Box>
        </Box>
    );
}