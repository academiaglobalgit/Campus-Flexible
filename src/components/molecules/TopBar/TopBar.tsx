import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Typography } from "../../atoms/Typography/Typography";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { LeftCircle } from "../../../assets/icons";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useAuth } from "../../../hooks";
import { useNavigate } from "react-router-dom";

type TopBarProps = {
  titleScreen?: string;
  isExternal?: boolean;
  onBack?: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({titleScreen, isExternal, onBack}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    // console.log("click");
    navigate('/mi-perfil');
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
                <Avatar alt={ user?.name } src="" width={48} height={48} onClick={() => handleClick()} />
                <Typography component="h4" variant="h4" sxProps={{ ml: 1 }}>
                  { user?.name }
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
                <IconButton>
                  <NotificationsNoneIcon />
                </IconButton>
              </Box>
            </Toolbar>
          )
        }
      </AppBar>
  );
}