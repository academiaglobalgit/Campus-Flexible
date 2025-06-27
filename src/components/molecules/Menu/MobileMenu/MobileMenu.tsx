import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Typography } from "../../../atoms/Typography/Typography";

import { MenuRoutes as MenuItems, MenuInformacion, type MenuType } from "@constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DsSvgIcon from "../../../atoms/Icon/Icon";

type MobileMenuProps = {
    anchorEl: HTMLElement | null;
    menuType?: MenuType,
    onClose?: () => void;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({anchorEl, onClose, menuType = 'menuRoutes'}) => {
    const navigate = useNavigate();
    const menuOpen = Boolean(anchorEl); 
    const [maxWidth, setMaxWidth] = useState(335);
    const [menuItemStyle, setMenuItemStyle] = useState({});
    const [menuRootStyle, setMenuRootStyle] = useState({});
    const [menuBordersStyle, setMenuBordersStyle] = useState({});
    
    const menuRoutes = [...MenuItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const menuInformacion = [...MenuInformacion].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const items = menuType === 'menuRoutes' ? menuRoutes : menuInformacion;

    const handleNavigation = (item: any) => {
        navigate(item.path);
        if (onClose) {
            onClose();
        }
    };
    
    useEffect(() => {
        if(menuType === 'menuRoutes') {
            setMaxWidth(335);
            setMenuItemStyle({ 
                justifyContent: 'center',
                border: '1px solid #AAB1B6',
                borderRadius: '15px'
            });
            setMenuRootStyle({});
            setMenuBordersStyle({
                borderRadius: '20px'
            });
        }else{
            setMaxWidth(278);
            setMenuItemStyle({
                border: (theme: any) => `1px solid ${theme.palette.primary[300]}`,
                borderRadius: '4px',
                color: (theme: any) => `${theme.palette.primary[300]}`
            });
            setMenuRootStyle({
                sx:{ left:'15px' }
            });
            setMenuBordersStyle({
                borderBottomLeftRadius: '20px',
                borderTopLeftRadius: '20px',
            });
        }
    },[menuType]);

    return (
        <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={onClose}
            slotProps={{
                root: {...menuRootStyle},
                paper: {
                    sx: {...menuBordersStyle, width: '100%', maxWidth, margin: 'auto', mt: 1, padding: '8px' }
                }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            {
                menuType === 'menuRoutes'
                &&
                <Typography component="h3" variant="h3" sxProps={{ px: 2, py: 1, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                    TU PLATAFORMA
                </Typography>
            }
            
            {
                items.filter((item) => item.visible === 1).map((item, index) => (
                    <MenuItem 
                        key={index}
                        onClick={() => handleNavigation(item)}
                        sx={{...menuItemStyle, mt: index === 0 ? 0 : 2,}}
                    >
                        {
                            menuType === 'menuRoutes' 
                            ?
                                item.text
                            :
                            <>
                                <ListItemIcon>
                                    <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: (theme: any) => theme.palette.primary[300]}} />
                                </ListItemIcon>
                                <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                            </>
                        }
                    </MenuItem>
                ))
            }
        </Menu>
    );
}