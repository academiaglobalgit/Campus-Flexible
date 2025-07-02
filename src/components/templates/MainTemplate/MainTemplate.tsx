import React from "react";
import Sidenav from "../../organisms/Sidenav/Sidenav";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const MainTemplate: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     
    return (
        !isMobile
        ?
            <Container fixed sx={{ padding:'0px !important'}}>
                <Sidenav />
            </Container>
        :
            <>
                <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }}>
                    <TopBar />
                    <Outlet />
                    <ScrollRestoration />
                </Container>
                <BottomBar />
            </>
    );
};

export default MainTemplate;