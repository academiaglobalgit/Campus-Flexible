import React from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../organisms";
import Sidenav from "../../organisms/Sidenav/Sidenav";

const MainTemplate: React.FC = () => {
    const [isSidenavOpen, setIsSidenavOpen] = React.useState(false);

    return (
        <>
            <Navbar onMenuClick={() => setIsSidenavOpen(!isSidenavOpen)} />
            <Box sx={{ display: "flex" }}>
                <Sidenav isOpen={!isSidenavOpen} onClose={() => setIsSidenavOpen(false)} />
            </Box>
        </>
    );
};

export default MainTemplate;