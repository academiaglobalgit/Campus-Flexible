import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MobileMenu } from "../Menu/MobileMenu/MobileMenu";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, type MenuType } from "@constants";
import { useAuth } from "../../../hooks";

export const BottomBar: React.FC = () => {
    const navigate = useNavigate();
    const { configPlataforma } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<MenuType>("menuRoutes");
  
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuType: MenuType) => {
        setMenuType(menuType);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHome = () => navigate(AppRoutingPaths.PLAN_ESTUDIOS);

  return (
    <React.Fragment>
        <BottomNavigation
            showLabels
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #ddd",
              zIndex: 1
            }}
        >
            {
              configPlataforma?.id_plan_estudio !== 17 &&
                <BottomNavigationAction 
                  icon={<HomeOutlinedIcon />} 
                  onClick={handleHome}
                /> 
            }
            <BottomNavigationAction 
              icon={<AddCircleOutlineIcon color="primary" sx={{ fontSize: 40 }} />}
              onClick={(event) => handleMenuClick(event, "menuRoutes")}
            />
        </BottomNavigation>
        <MobileMenu anchorEl={anchorEl} onClose={handleMenuClose} menuType={menuType} />
    </React.Fragment>
  );
};