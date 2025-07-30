import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton, Menu, useTheme } from "@mui/material";
import { Ayuda, Notificaciones as NotificacionesIcon, PreguntasFrecuentes } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { AppRoutingPaths, type Notificaciones } from "@constants";
import { useGetNotificaciones } from "../../../services/NotificacionesService";
import { LoadingCircular } from "../LoadingCircular/LoadingCircular";
import { CardNotification } from "../CardNotification/CardNotification";

export const IconsTopBar: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { data: notifications, isLoading } = useGetNotificaciones();
    
    const handleClose = () => setAnchorEl(null);

    const [filteredNotifications, setFilteredNotifications] = React.useState<Notificaciones[]>([]);
    const [loadingIds, setLoadingIds] = React.useState<Set<number>>(new Set());

    useEffect(() => {
        if (notifications?.data) {
            setFilteredNotifications(notifications.data);
        }
    }, [notifications]);

    const handleAllNotifications = () => {
        navigate(AppRoutingPaths.NOTIFICACIONES);
        handleClose();
    }

    const handleFaqs = () => navigate(AppRoutingPaths.PREGUNTAS_FRECUENTES_INT);
    const handleHelp = () => navigate(AppRoutingPaths.AYUDA_INTERIOR);

    const getTextCountNotification = (total: number) => {
        if(total === 1) return 'Tienes una notificación sin leer';
        if(total > 1) return `Tienes ${total} notificaciones no leídas`;
    }

    const handleMarkedRead = (id: number) => {
        setFilteredNotifications(prev => prev.filter(n => n.id_notificacion !== id));
    }

    return(
        <>
            <Box>
                <IconButton onClick={handleFaqs}>
                    <PreguntasFrecuentes />
                </IconButton>
                <IconButton  onClick={handleHelp}>
                    <Ayuda />
                </IconButton>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <Badge 
                        onClick={handleClick} sx={{cursor: 'pointer'}}
                        badgeContent={ filteredNotifications?.filter((item) => item.leida === 0).length } color="error"
                    >
                        <NotificacionesIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        p:'15px',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '11px'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <Typography component="h4" variant="h4">Notificaciones</Typography>
                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100]}}>{getTextCountNotification(filteredNotifications?.filter((item) => item.leida === 0).length)}</Typography>
                    </Box>
                    <Box>
                        {
                            isLoading
                            ?
                                <LoadingCircular />
                            :
                                filteredNotifications?.slice(0,5).map((item, i) => (
                                    <CardNotification 
                                        key={i} 
                                        item={item} 
                                        index={i} 
                                        loadingItems={loadingIds} 
                                        setLoadingItems={setLoadingIds}
                                        setMarkedRead={(id) => handleMarkedRead(id)}
                                    />
                                ))
                        }
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', pt: '16px', cursor: 'pointer'}} onClick={handleAllNotifications}>
                            <Typography component="span" variant="body2" color="primary">Ver todas las notificaciones</Typography>
                        </Box>
                    </Box>
                </Box>
                
            </Menu>
        </>
        
    );
}