import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MobileMenu } from "../Menu/MobileMenu/MobileMenu";

export const BottomBar: React.FC = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
            <BottomNavigationAction icon={<HomeOutlinedIcon />} />
            <BottomNavigationAction
              icon={<AddCircleOutlineIcon sx={{ fontSize: 40 }} />}
              onClick={handleMenuClick}
            />
            <BottomNavigationAction icon={<MoreVertIcon />} />
        </BottomNavigation>
        <MobileMenu anchorEl={anchorEl} onClose={handleMenuClose} />
    </React.Fragment>
  );
};