import React from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../../atoms/Typography/Typography";

import { MenuRoutes as MenuItems, MenuInformacion, type MenuType, TitleScreen } from "@constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { ManualesUsuarioDialog } from "../../Dialogs/ManualesUsuarioDialog/ManualesUsuarioDialog";
import { useAuth } from "../../../../hooks";

type MobileMenuProps = {
    anchorEl: HTMLElement | null;
    menuType?: MenuType,
    onClose?: () => void;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ anchorEl, onClose, menuType = 'menuRoutes' }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { configPlataforma } = useAuth();

    const menuOpen = Boolean(anchorEl);
    const [maxWidth, setMaxWidth] = useState(370);
    const [menuItemStyle, setMenuItemStyle] = useState({});
    const [menuRootStyle, setMenuRootStyle] = useState({});
    const [menuBordersStyle, setMenuBordersStyle] = useState({});
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenManualesDialog, setIsOpenManualesDialog] = React.useState(false);
    const [menuTypeDialog, setMenuTypeDialog] = React.useState('manuales');

    let menuRoutes = [...MenuItems.filter((item) => item.menu === "main")].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const menuInformacion = [...MenuInformacion].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    let items = (menuType === 'menuRoutes' ? menuRoutes : menuInformacion) as any[];

    switch (configPlataforma?.id_plan_estudio) {
        case 17: // Diplomados
            menuRoutes = menuRoutes.filter(item => item.id !== 1 && item.id !== 7); // Remover Plan de estudios y Sala de conversacion
            items = items.filter(item => item.id !== 1 && item.id !== 7 && item.id !== 6);
            break;
        case 19: // Diplomados Coppel
            menuRoutes = menuRoutes.filter(item => item.id !== 1 && item.id !== 7); // Remover Plan de estudios y Sala de conversacion
            items = items.filter(item => item.id !== 1 && item.id !== 7 && item.id !== 6);
            break;
    }

    const handleNavigation = (item: any) => {
        if (item.text === TitleScreen.MANUALES_USUARIOS || item.text === TitleScreen.LINEAMIENTOS) {
            setMenuTypeDialog(item.text === TitleScreen.LINEAMIENTOS ? 'lineamientos' : 'manuales');
            setIsOpenManualesDialog(true);
        } else {
            navigate(item.path);
        }

        if (onClose) {
            onClose();
        }
    };

    useEffect(() => {
        if (menuType === 'menuRoutes') {
            setMaxWidth(335);
            setMenuItemStyle({
                justifyContent: 'center',
                border: '1px solid #AAB1B6',
                borderRadius: '15px'
            });
            setMenuRootStyle({});
            setMenuBordersStyle({
                borderRadius: '20px',
                '& .MuiMenu-list': {
                    width: '100%',
                }
            });
        } else {
            setMaxWidth(isMobile ? 278 : 370);
            setMenuItemStyle({
                border: `1px solid ${configPlataforma?.color_primary}`,
                borderRadius: '4px',
                color: `${configPlataforma?.color_primary}`
            });
            setMenuRootStyle({
                sx: { left: '15px' }
            });
            setMenuBordersStyle({
                borderBottomLeftRadius: '20px',
                borderTopLeftRadius: '20px',
            });
        }
    }, [menuType]);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={onClose}
                slotProps={{
                    root: { ...menuRootStyle },
                    paper: {
                        sx: {
                            ...menuBordersStyle,
                            mt: isMobile ? 1 : -3,
                            width: '100%',
                            maxWidth,
                            padding: '8px',
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={
                    isMobile ? { vertical: 'top', horizontal: 'center' } : { vertical: 'bottom', horizontal: 'center' }
                }
            >
                <Typography component="h3" variant="h3" sxProps={{ py: 1, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                    {menuType === 'menuRoutes' ? 'Menú' : 'Más información'}
                </Typography>
                {
                    items.filter((item) => item.visible === 1).map((item, index) => {
                        return (<MenuItem key={index} disabled={item.text === 'Inducción' && (configPlataforma?.id_plan_estudio === 17 || configPlataforma?.id_plan_estudio === 19) ? true : false} onClick={() => handleNavigation(item)} sx={[
                            { ...menuItemStyle, mt: index === 0 ? 0 : 2 },
                            !isMobile && { width: '100%', maxWidth: '232px' }
                        ]}>
                            {menuType === 'menuRoutes'
                                ?
                                item.text
                                :
                                <>
                                    <ListItemIcon>
                                        <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: configPlataforma?.color_primary }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                                </>}
                        </MenuItem>);
                    })
                }
            </Menu>
            <Box sx={{ height: '50px', width: '100%' }}></Box>
            <ManualesUsuarioDialog isOpen={isOpenManualesDialog} close={() => setIsOpenManualesDialog(false)} menutype={menuTypeDialog} />
        </>
    );
}