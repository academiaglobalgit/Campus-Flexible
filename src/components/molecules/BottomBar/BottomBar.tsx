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
      console.log(menuType);
        setMenuType(menuType);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHome = () => navigate(AppRoutingPaths.BLANK);

  return (
    <React.Fragment>
        <BottomNavigation
            showLabels
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #ddd",
            }}
        >
            <BottomNavigationAction 
              icon={<HomeOutlinedIcon />} 
              onClick={handleHome}
            />
            <BottomNavigationAction
              icon={<AddCircleOutlineIcon sx={{ fontSize: 40 }} />}
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