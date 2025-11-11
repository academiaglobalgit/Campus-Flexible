import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Fade, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import DsSvgIcon from "../../atoms/Icon/Icon";
import {
  CigBarSearch,
  CigBarFav,
  CigBarDownload,
  CigBarCalendar,
  CigBarLibrary,
  CigBarHistory,
  CigBarVideo,
} from "@iconsCustomizeds";


const RightActionsBar = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  

  if (isDownMd) return null; // hide on small screens

  const items = [
    { icon: CigBarSearch, label: "Buscar", uri: '/cig/' },
    { icon: CigBarFav, label: "Favoritos" ,},
    { icon: CigBarHistory, label: "Historial", uri: '/cig/' },
    { icon: CigBarLibrary, label: "Biblioteca", uri: '/cig/recursos-investigacion' },
    { icon: CigBarVideo, label: "Videos", uri: '/cig/' },
    { icon: CigBarDownload, label: "Descargas", uri: '/cig/' },
    { icon: CigBarCalendar, label: "Calendario", uri: '/cig/' },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 56,
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        background: "linear-gradient(180deg, #0E4A84 0%, #0A2E5C 100%)",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        boxShadow: "0 6px 16px rgba(6, 46, 92, 0.35)",
        zIndex: (t) => t.zIndex.drawer + 2,
      }}
    >
      {items.map((item, idx) => (
        <Box key={`item-${idx}`} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Tooltip title={item.label} placement="left">
            <IconButton
                size="small"
                sx={{
                    color: "#fff",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    transform: "scale(1.3)", // <-- hace que crezca
                    },
                }}
                onClick={() => navigate(`${item.uri}`)}
            >
              <DsSvgIcon component={item.icon} color="white" sxProps={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          {idx !== items.length - 1 && (
            <Box
              sx={{
                width: "60%",
                height: 1,
                bgcolor: "rgba(255,255,255,0.25)",
                my: 0.5,
                borderRadius: 1,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

const LayoutCIG = () => {
    const location = useLocation();

    const isRootCig = location.pathname === "/cig";

    return (
        <>
            <Fade in={!isRootCig} timeout={500} mountOnEnter unmountOnExit>
                <div>
                    <RightActionsBar />
                </div>
            </Fade>
            
            <Outlet />
        </>
    )

}

export default LayoutCIG;
