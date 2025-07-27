import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton, Menu, useTheme } from "@mui/material";
import { Ayuda, Notificaciones, PreguntasFrecuentes } from "@iconsCustomizeds";
import StarIcon from '@mui/icons-material/Star';
import { Typography } from "../../atoms/Typography/Typography";
import { AppRoutingPaths } from "@constants";

export const IconsTopBar: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotifications = () => {
        alert("Notificaciones");
        handleClose();
    }

    const handleAllNotifications = () => {
        navigate(AppRoutingPaths.NOTIFICACIONES);
        handleClose();
    }

    const handleFaqs = () => navigate(AppRoutingPaths.PREGUNTAS_FRECUENTES_INT);
    const handleHelp = () => navigate(AppRoutingPaths.AYUDA_INTERIOR);

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
                        badgeContent={17} color="error"
                    >
                        <Notificaciones />
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
                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100]}}>Tienes 2 notificaciones no leídas</Typography>
                    </Box>
                    <Box>
                        {
                            Array.from({length: 3}).map((_, i) => (
                                <Box onClick={handleNotifications}
                                    key={i}
                                    sx={[{ 
                                        width: '305px', 
                                        height: '138px', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        gap: '30px',
                                        borderBottom: '1px solid #AAB1B6',
                                        backgroundColor: '#F6FAFD',
                                        cursor: 'pointer'
                                    }, i === 0 && { borderTop: '1px solid #AAB1B6' } ]}
                                >
                                    <StarIcon />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <Typography component="span" variant="body2" color="primary" >Graduación Generación 2025</Typography>
                                            <Box sx={{width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2'}}></Box>
                                        </Box>
                                        <Typography component="span" variant="body1">Acto académico de Graduación de Egresados el Miércoles 28 de junio del 2025</Typography>
                                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100]}} >Hace 1 hora</Typography>
                                    </Box>
                                </Box>
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