import React from "react";
import Box from "@mui/material/Box";
import Sidenav from "../../organisms/Sidenav/Sidenav";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { Outlet, useLocation } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

const MainTemplate: React.FC = () => {
    const theme = useTheme();
    const location = useLocation();

    const hideTopBarRoutes = [`${AppRoutingPaths.MI_PERFIL_EDIT}`];
    const hideTopBar = hideTopBarRoutes.includes(location.pathname);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     
    return (
        !isMobile
        ?
            <Box sx={{ display: "flex" }}>
                <Sidenav />
            </Box>
        :
            <>
                <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }}>
                    { !hideTopBar && <TopBar /> }
                    <Outlet />
                </Container>
                <BottomBar />
            </>
    );
};

export default MainTemplate;