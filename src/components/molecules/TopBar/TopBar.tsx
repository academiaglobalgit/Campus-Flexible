import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Typography } from "../../atoms/Typography/Typography";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { LeftCircle } from "../../../assets/icons";

import { useAuth } from "../../../hooks";
import { useState } from "react";
import { PerfilMenu } from "../Menu/PerfilMenu/PerfilMenu";
import { IconsTopBar } from "../IconsTopBar/IconsTopBar";

type TopBarProps = {
  titleScreen?: string;
  isExternal?: boolean;
  onBack?: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({titleScreen, isExternal, onBack}) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
        setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  
  return (
    <AppBar
        position="fixed"
        elevation={0}
        sx={{ borderBottom: "1px solid #C7C7C7", bgcolor: "#fff" }}
      >
        {
          isExternal ? (
            <Toolbar sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
              <IconButton onClick={onBack}>
                <DsSvgIcon component={LeftCircle} color='primary' />
              </IconButton>
              <Typography component="h4" variant="h4" sxProps={{ ml: '2px' }}>
                { titleScreen }
              </Typography>
            </Toolbar>
          ) : (
            <Toolbar sx={{ justifyContent: "space-between", paddingLeft: '8px', paddingRight: '8px' }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar alt={ user?.name } src="" width={48} height={48} onClick={(event) => handleMenuClick(event)} />
                <Typography component="h4" variant="h4" sxProps={{ ml: 1 }}>
                  { user?.name }
                </Typography>
              </Box>
              <IconsTopBar />
              <PerfilMenu anchorEl={anchorEl} onClose={handleMenuClose} />
            </Toolbar>
          )
        }
      </AppBar>
  );
}