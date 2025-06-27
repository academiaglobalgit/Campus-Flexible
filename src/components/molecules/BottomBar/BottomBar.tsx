import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MobileMenu } from "../Menu/MobileMenu/MobileMenu";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, type MenuType } from "@constants";

export const BottomBar: React.FC = () => {
    const navigate = useNavigate();
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
            <BottomNavigationAction 
              icon={<HomeOutlinedIcon />} 
              onClick={handleHome}
            />
            <BottomNavigationAction 
              icon={<AddCircleOutlineIcon color="primary" sx={{ fontSize: 40 }} />}
              onClick={(event) => handleMenuClick(event, "menuRoutes")}
            />
            <BottomNavigationAction 
              icon={<MoreVertIcon />} 
              onClick={(event) => handleMenuClick(event, "menuInformacion")}
            />
        </BottomNavigation>
        <MobileMenu anchorEl={anchorEl} onClose={handleMenuClose} menuType={menuType} />
    </React.Fragment>
  );
};