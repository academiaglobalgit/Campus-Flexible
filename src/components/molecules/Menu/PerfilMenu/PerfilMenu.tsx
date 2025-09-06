import { AppRoutingPaths, TitleScreen } from "@constants";
import { Menu, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";

type PerfilMenuProps = {
    anchorEl: HTMLElement | null;
    onClose?: () => void;
};

export const PerfilMenu: React.FC<PerfilMenuProps> = ({anchorEl, onClose}) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const menuOpen = Boolean(anchorEl);
    
    const items = [
        {label: TitleScreen.MI_PERFIL, path: AppRoutingPaths.MI_PERFIL},
        {label: 'Cerrar Sesión', path: 'logout'}
    ];

    const handleNavigation = (item: any) => {
        if(item.path === "logout") {
            logout();
            navigate("/");
        }else{
            navigate(item.path);
            if (onClose) {
                onClose();
            }
        }
    };

    return(
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={menuOpen}
            onClose={onClose}
            >
                {
                    items.map((item, index) => (
                        <MenuItem 
                            key={index}
                            onClick={() => handleNavigation(item)}
                        >
                            { item.label }
                        </MenuItem>
                    ))
                }
        </Menu>
    )
}