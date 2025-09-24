import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Avatar } from "../../atoms/Avatar/Avatar";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { LeftCircle } from "../../../assets/icons";

import { useAuth } from "../../../hooks";
import { useState } from "react";
import { PerfilMenu } from "../Menu/PerfilMenu/PerfilMenu";
import { IconsTopBar } from "../IconsTopBar/IconsTopBar";
import { ShowBackMenuRoutes } from "../../../utils/Helpers";
import { useLocation } from "react-router-dom";

type TopBarProps = {
  titleScreen?: string;
  isExternal?: boolean;
  onBack?: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({titleScreen = "Regresar", isExternal, onBack}) => {
  const location = useLocation();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const name = user?.name;
  const avatar = user?.photo;

  const showBackMenuRoutes = ShowBackMenuRoutes;
  titleScreen = "Regresar"
    
  const showBackMenu = showBackMenuRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleBack = () => {
    if (!isExternal) {
      window.history.back();
    }else{
      if(onBack) onBack();
    }
  }
  
  const ToolbarBackTo = () => (
    <Toolbar sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
      <IconButton onClick={handleBack}>
        <DsSvgIcon component={LeftCircle} color='primary' />
      </IconButton>
      <Typography component="h4" variant="h4" sx={{ ml: '2px' }} color="textPrimary">
        {titleScreen}
      </Typography>
    </Toolbar>
  );

  return (
    <AppBar
        position="fixed"
        elevation={0}
        sx={{ borderBottom: "1px solid #C7C7C7", bgcolor: "#fff" }}
      >
        {
          isExternal ? (
            <ToolbarBackTo />
          ) : (
            !showBackMenu 
            ?
              <Toolbar sx={{ justifyContent: "space-between", paddingLeft: '8px', paddingRight: '8px' }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt={ name } src={avatar} width={48} height={48} onClick={(event) => handleMenuClick(event)} />
                  <Typography component="h4" variant="h4" color="textPrimary" sx={{ ml: 1, width: '160px' }} className="truncate-text">
                    { name }
                  </Typography>
                </Box>
                <IconsTopBar />
                <PerfilMenu anchorEl={anchorEl} onClose={handleMenuClose} />
              </Toolbar>
            :
            <ToolbarBackTo />
          )
        }
      </AppBar>
  );
}