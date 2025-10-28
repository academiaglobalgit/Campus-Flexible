import React from "react";
import type { Notificaciones } from "@constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkReadNotification } from "../../../services/NotificacionesService";
import { Box, LinearProgress, useMediaQuery, useTheme } from "@mui/material";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { Typography } from "../../atoms/Typography/Typography";
import { tiempoTranscurrido } from "../../../utils/Helpers";
import { NOTIFICATIONS_ENDPOINTS } from "../../../types/endpoints";
import { useNavigate } from "react-router-dom";

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
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const startLoading = (id: number) => {
        setLoadingItems(prev => new Set(prev).add(id));
    };

    const hasLoading = (id: number) => loadingItems.has(id);

    const handleNotifications = async (item: Notificaciones) => {
        const id = item.id_notificacion;
        startLoading(id);
        try {
            await createMutation.mutateAsync(id);
            await queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS_TOP_BAR.key] });
            setMarkedRead(id);
            goTo(item);
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

    const goTo = (_item: Notificaciones) => {
        //console.log(item);
        //FALTA NAVEGAR

        if (_item.enlace_accion) {
            const enlaceAccion = item.enlace_accion.split("$")[0];
            const params = item.enlace_accion.split("$")[1];

            if (params?.includes("tab=")) {
                const tabIndex = parseInt(params.split("tab=")[1], 10);
                navigate(`${enlaceAccion}`, { state: { tab: tabIndex } });
            } else {
                console.log("Navegar a:", _item.enlace_accion);
                navigate(_item.enlace_accion);
            }
        }

        
    }

    return (
        <Box>
            {hasLoading(item.id_notificacion) && <LinearProgress />}
            <Box onClick={() => item.leida === 0 ? handleNotifications(item) : goTo(item)}
                sx={[{
                    width: isMobile ? '350px' : '100%',
                    // height: '138px',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    borderBottom: '1px solid #AAB1B6',
                    backgroundColor: item.leida === 0 ? '#F6FAFD' : '#FFFFFF',
                    cursor: 'pointer'
                }, index === 0 && { borderTop: '1px solid #AAB1B6' }]}


            >
                <Box sx={{ pl: 1 }}>
                    {IconsNotification(item)}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Typography component="span" variant="h5" color="primary" >{item.titulo}</Typography>
                        {
                            item.leida === 0 && <Box sx={{ width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2' }}></Box>
                        }
                    </Box>
                    <Box dangerouslySetInnerHTML={{ __html: item.mensaje }}/>
                    <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>{tiempoTranscurrido(item.fecha_envio)}</Typography>
                </Box>
            </Box>
        </Box>
    );
}