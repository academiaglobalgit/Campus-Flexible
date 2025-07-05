import React from "react";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Informacion } from "./Informacion";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Cursamiento } from "./Cursamiento";
import { Tutor } from "./Tutor";

const PlanEstudioInformacion: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const InformacionTabs = [
        {tab: "Información", content: <Informacion />}, 
        {tab: "Cursamiento", content: <Cursamiento />}, 
        {tab: "Tutor", content: <Tutor />}
    ];
    
    return (
        <>
            {
                isMobile 
                ?
                    <>
                        <Box>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    InformacionTabs.map((item, i) => <Tab label={item.tab} value={i} key={i} />)
                                }
                            </Tabs>
                        </Box>
                        {
                            InformacionTabs.map((tab, i) => (
                                <TabPanel value={value} index={i} key={i}>
                                    { tab.content }
                                </TabPanel>
                            ))
                        }
                    </>
                :
                <>
                </>
            }
        </>
    );
}

export default PlanEstudioInformacion;