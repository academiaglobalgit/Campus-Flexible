import React from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../../atoms/Typography/Typography";

import { MenuRoutes as MenuItems, MenuInformacion, type MenuType, TitleScreen } from "@constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DsSvgIcon from "../../../atoms/Icon/Icon";
// import ContactoDialog from "../../Dialogs/ContactoDialog/ContactoDialog";
import { ManualesUsuarioDialog } from "../../Dialogs/ManualesUsuarioDialog/ManualesUsuarioDialog";
// import { ForosDialog } from "../../Dialogs/ForosDialog/ForosDialog";

type MobileMenuProps = {
    anchorEl: HTMLElement | null;
    menuType?: MenuType,
    onClose?: () => void;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ anchorEl, onClose, menuType = 'menuRoutes' }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const menuOpen = Boolean(anchorEl);
    const [maxWidth, setMaxWidth] = useState(370);
    const [menuItemStyle, setMenuItemStyle] = useState({});
    const [menuRootStyle, setMenuRootStyle] = useState({});
    const [menuBordersStyle, setMenuBordersStyle] = useState({});
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const [isOpenContactoDialog, setIsOpenContactoDialog] = React.useState(false);
    const [isOpenManualesDialog, setIsOpenManualesDialog] = React.useState(false);

    const menuRoutes = [...MenuItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const menuInformacion = [...MenuInformacion].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const items = menuType === 'menuRoutes' ? menuRoutes : menuInformacion;

    const handleNavigation = (item: any) => {
        if (item.text === TitleScreen.MANUALES_USUARIOS) {
            setIsOpenManualesDialog(true);
        } else if (item.text === TitleScreen.LINEAMIENTOS) { 
            window.open('https://academiaglobal.mx/resources/assets/files/lineamientos/lineamientosPrueba.pdf', '_blank');
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
                border: (theme: any) => `1px solid ${theme.palette.primary[300]}`,
                borderRadius: '4px',
                color: (theme: any) => `${theme.palette.primary[300]}`
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
                    items.filter((item) => item.visible === 1).map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleNavigation(item)}
                            sx={[
                                { ...menuItemStyle, mt: index === 0 ? 0 : 2 },
                                !isMobile && { width: '100%', maxWidth: '232px' }
                            ]}
                        >
                            {
                                menuType === 'menuRoutes'
                                    ?
                                    item.text
                                    :
                                    <>
                                        <ListItemIcon>
                                            <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: (theme: any) => theme.palette.primary[300] }} />
                                        </ListItemIcon>
                                        <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                                    </>
                            }
                        </MenuItem>
                    ))
                }
            </Menu>
            {/* <ContactoDialog isOpen={isOpenContactoDialog} close={() => setIsOpenContactoDialog(false)} data={{ telefono: ["(667) 712 41 72"], email: ["daniela.cazares@umi.edu.mx"] }} /> */}
            <ManualesUsuarioDialog isOpen={isOpenManualesDialog} close={() => setIsOpenManualesDialog(false)} />
            {/* <ForosDialog isOpen={isOpenManualesDialog} close={() => setIsOpenManualesDialog(false)} /> */}
        </>
    );
}