import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  ButtonBase,
  Fade,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { ElementType, FC } from "react";
import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { AppRoutingPaths } from "@constants";

type ActionItem = {
  icon: ElementType;
  label: string;
  uri?: string;
  match?: (pathname: string) => boolean;
};

const actionItems: ActionItem[] = [
  {
    icon: CigBarSearch,
    label: "Buscar",
    uri: AppRoutingPaths.CENTRO_INFORMACION_GLOBAL,
    match: (pathname) => pathname === AppRoutingPaths.CENTRO_INFORMACION_GLOBAL,
  },
  {
    icon: CigBarFav,
    label: "Favoritos",
    uri: AppRoutingPaths.CIG_FAVORITOS,
  },
  {
    icon: CigBarHistory,
    label: "Visto Recientemente",
  },
  {
    icon: CigBarLibrary,
    label: "Recursos de Investigación",
    uri: AppRoutingPaths.CIG_RECURSOS_INVESTIGACION,
  },
  {
    icon: CigBarVideo,
    label: "Recursos Multimedia",
    uri: AppRoutingPaths.CIG_MULTIMEDIA,
  },
  {
    icon: CigBarDownload,
    label: "Recursos Digitales",
    uri: AppRoutingPaths.CIG_RECURSOS_DIGITALES,
  },
  {
    icon: CigBarCalendar,
    label: "Eventos Formativos",
    uri: AppRoutingPaths.CALENDARIO,
  },
];

const RightActionsBar = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  if (isDownMd) return null; // hide on small screens

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: isHovered ? 248 : 60,
        py: 3,
        px: isHovered ? 1.5 : 1,
        display: "grid",
        gap: 0.75,
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        boxShadow: "0 10px 30px rgba(6, 46, 92, 0.35)",
        zIndex: (t) => t.zIndex.drawer + 2,
        transition: "width 0.25s ease, padding 0.25s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {actionItems.map((item, idx) => {
        const isActive = item.match
          ? item.match(location.pathname)
          : Boolean(item.uri && location.pathname === item.uri);
        const disabled = !item.uri;

        return (
          <ButtonBase
            key={`action-item-${idx}`}
            onClick={() => item.uri && navigate(item.uri)}
            disableRipple
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isHovered ? "flex-start" : "center",
              flexDirection: isHovered ? "row" : "column",
              gap: 1.5,
              // gap: isHovered ? 1.5 : 0,
              // px: isHovered ? 1.5 : 0,
              // py: isHovered ? 1.2 : 0.8,
              px: 1.5,
              py: 1.5,
              borderRadius: isHovered ? 2 : 999,
              color: "#fff",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "default" : "pointer",
              backgroundColor: isActive ? "rgba(255,255,255,0.16)" : "transparent",
              boxShadow: isActive ? "0 8px 18px rgba(0,0,0,0.25)" : "none",
              // border:
              //   isHovered && isActive ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
              transition: "background-color 0.2s ease, transform 0.2s ease",
              "&:hover": !disabled
                ? {
                    backgroundColor: "rgba(255,255,255,0.22)",
                    // transform: isHovered ? "translateX(-4px)" : "scale(1.08)",
                    transform: isHovered ? "translateX(-4px)" : "none",
                  }
                : undefined,
            }}
          >
            <DsSvgIcon component={item.icon} color="white" sxProps={{ fontSize: 20 }} />
            {isHovered && (
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }}
              >
                {item.label}
              </Typography>
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

const LayoutCIG: FC = () => {
  const location = useLocation();

  const isRootCig = location.pathname === AppRoutingPaths.CENTRO_INFORMACION_GLOBAL;

  return (
    <>
      <Fade in={!isRootCig} timeout={800} mountOnEnter unmountOnExit>
        <div>
          <RightActionsBar />
        </div>
      </Fade>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default LayoutCIG;
