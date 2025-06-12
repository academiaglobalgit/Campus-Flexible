import React from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../organisms";
import Sidenav from "../../organisms/Sidenav/Sidenav";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { Outlet, useLocation } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

const MainTemplate: React.FC = () => {
    const theme = useTheme();
    const location = useLocation();

    const hideTopBarRoutes = [`${AppRoutingPaths.MI_PERFIL}`];
    const hideTopBar = hideTopBarRoutes.includes(location.pathname);

    const [isSidenavOpen, setIsSidenavOpen] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     
    return (
        !isMobile
        ?
            <>
                <Navbar onMenuClick={() => setIsSidenavOpen(!isSidenavOpen)} />
                <Box sx={{ display: "flex" }}>
                    <Sidenav isOpen={!isSidenavOpen} onClose={() => setIsSidenavOpen(false)} />
                </Box>
            </>
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