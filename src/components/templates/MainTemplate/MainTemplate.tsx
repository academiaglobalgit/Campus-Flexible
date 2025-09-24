import React from "react";
import Sidenav from "../../organisms/Sidenav/Sidenav";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { DocumentosProvider } from "../../../context/DocumentosContext";
import AvatarDid from "../../pages/Avatar/AvatarDid";

const MainTemplate: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     
    return (
        <DocumentosProvider>
            {
            !isMobile
                ?
                    <Container fixed sx={{ pl: { xs: 0, sm: "50px" } }}>
                        <Sidenav />
                        <AvatarDid />
                    </Container>
                :
                    <>
                        <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }} >
                            <TopBar />
                            <Outlet />
                            <AvatarDid />
                            <ScrollRestoration />
                        </Container>
                        <BottomBar />
                    </>
            }
        </DocumentosProvider>
    );
};

export default MainTemplate;