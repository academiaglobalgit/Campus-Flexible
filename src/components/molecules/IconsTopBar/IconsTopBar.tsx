import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Ayuda, InfoSquare, Notificaciones as NotificacionesIcon, PreguntasFrecuentes } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { AppRoutingPaths, MenuInformacion, TitleScreen, type Notificaciones } from "@constants";
import { useGetNotificacionesTopBar } from "../../../services/NotificacionesService";
import { LoadingCircular } from "../LoadingCircular/LoadingCircular";
import { CardNotification } from "../CardNotification/CardNotification";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { useAuth } from "../../../hooks";
import { ManualesUsuarioDialog } from "../Dialogs/ManualesUsuarioDialog/ManualesUsuarioDialog";
import { VideoBienvenidaDialog } from "../Dialogs/VideoBienvenidaDialog/VideoBienvenidaDialog";
import { useDocumentos } from "../../../context/DocumentosContext";
import { usePlanEstudio } from "../../../context/PlanEstudioContext";


export const IconsTopBar: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { configPlataforma } = useAuth();
    const { config: configPlanEstudio } = usePlanEstudio();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElMasInfo, setAnchorElMasInfo] = React.useState<null | HTMLElement>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuItemStyle, setMenuItemStyle] = React.useState({});
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const [tipoVideos, setTipoVideo] = React.useState(1);
    const [urlVideo, setUrlVideo] = React.useState("");
    const { documentos } = useDocumentos();

    const open = Boolean(anchorEl);
    const openMasInfo = Boolean(anchorElMasInfo);

    const sortedMenuInformacion = React.useMemo(
        () => [...MenuInformacion].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        []
    );

    const menuInformacion = React.useMemo(() => {
        return configPlanEstudio?.getSortedMenuInformacionIconTopBar(sortedMenuInformacion);
    }, [sortedMenuInformacion, configPlanEstudio]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { data: notifications, isLoading } = useGetNotificacionesTopBar();

    const handleClose = () => setAnchorEl(null);
    const handleCloseMoreInfo = () => setAnchorElMasInfo(null);

    const [filteredNotifications, setFilteredNotifications] = React.useState<Notificaciones[]>([]);
    const [loadingIds, setLoadingIds] = React.useState<Set<number>>(new Set());

    const [isOpenManualesDialog, setIsOpenManualesDialog] = React.useState(false);
    const [menuTypeDialog, setMenuTypeDialog] = React.useState('manuales');

    useEffect(() => {
        if (notifications?.data) {
            setFilteredNotifications(notifications.data);
        }
    }, [notifications]);

    useEffect(() => {
        setMenuItemStyle({
            border: `1px solid ${configPlataforma?.color_primary}`,
            borderRadius: '4px',
            color: `${configPlataforma?.color_primary}`
        });
    }, []);

    const handleCerrarVideo = async () => {
        setIsOpenVideo(false);
    };


    const handleAllNotifications = () => {
        navigate(AppRoutingPaths.NOTIFICACIONES);
        handleClose();
    }

    const handleFaqs = () => navigate(AppRoutingPaths.PREGUNTAS_FRECUENTES_INT);
    const handleHelp = () => navigate(AppRoutingPaths.AYUDA_INTERIOR);

    const getTextCountNotification = (total: number) => {
        if (total === 1) return 'Tienes una notificación sin leer';
        if (total > 1) return `Tienes ${total} notificaciones no leídas`;
    }

    const handleMarkedRead = (id: number) => {
        setFilteredNotifications(prev => prev.filter(n => n.id_notificacion !== id));
    }

    const handleMoreInfo = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMasInfo(event.currentTarget);
    }

    const handleNavigation = (item: any) => {
        if (item.text === TitleScreen.LINEAMIENTOS) {
            setMenuTypeDialog(item.text === TitleScreen.LINEAMIENTOS ? 'lineamientos' : 'manuales');
            setIsOpenManualesDialog(true);
        } else if (item.text === TitleScreen.MANUALES_USUARIOS) {
            const urlVideoInduccion = documentos.filter(item => item.nombre_tipo === "Manual de Inducción")
            setIsOpenVideo(true)
            setUrlVideo(urlVideoInduccion[0].url_archivo ?? '')
            setTipoVideo(1)
        } else {
            navigate(item.path);
        }

        handleCloseMoreInfo();
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Tooltip title="Preguntas Frecuentes">
                    <IconButton onClick={handleFaqs}>
                        <PreguntasFrecuentes />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ayuda">
                    <IconButton onClick={handleHelp}>
                        <Ayuda />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Notificaciones">
                    <IconButton>
                        <Badge
                            onClick={handleClick} sx={{ cursor: 'pointer' }}
                            badgeContent={filteredNotifications?.filter((item) => item.leida === 0).length} color="error"
                        >
                            <NotificacionesIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Información">
                    <IconButton onClick={handleMoreInfo}>
                        <InfoSquare />
                    </IconButton>
                </Tooltip>
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
                            p: '15px',
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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    maxWidth: isMobile ? '350px' : '420px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', flexShrink: 0 }}>
                        <Typography component="h4" variant="h4">Notificaciones</Typography>
                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>{getTextCountNotification(filteredNotifications?.filter((item) => item.leida === 0).length)}</Typography>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            px: 2
                        }}>
                        {
                            isLoading
                                ?
                                <LoadingCircular />
                                :
                                filteredNotifications?.slice(0, 5).map((item, i) => (
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
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '16px', cursor: 'pointer', flexShrink: 0 }} onClick={handleAllNotifications}>
                        <Typography component="span" variant="body2" color="primary">Ver todas las notificaciones</Typography>
                    </Box>
                </Box>

            </Menu>

            <Menu
                anchorEl={anchorElMasInfo}
                id="account-menu"
                open={openMasInfo}
                onClose={handleCloseMoreInfo}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            p: '15px',
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
                <Typography component="h3" variant="h3" sxProps={{ py: 1, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                    Más información
                </Typography>
                {
                    menuInformacion?.filter((item) => item.visible === 1).map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                onClick={() => handleNavigation(item)}
                                sx={[
                                    { ...menuItemStyle, mt: index === 0 ? 0 : 2 },
                                    !isMobile && { width: '100%', maxWidth: '232px' }
                                ]}
                            >
                                <ListItemIcon>
                                    <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: configPlataforma?.color_primary }} />
                                </ListItemIcon>
                                <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                            </MenuItem>);
                    })
                }
            </Menu>
            <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => handleCerrarVideo()} urlVideo={urlVideo} tipo={tipoVideos} />
            <ManualesUsuarioDialog isOpen={isOpenManualesDialog} close={() => setIsOpenManualesDialog(false)} menutype={menuTypeDialog} />
        </>

    );
}