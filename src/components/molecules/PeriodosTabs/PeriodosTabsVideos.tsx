import React, { useEffect } from "react";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";

type PeriodosTabsProps = {
    periodos: any;
    tabSelected?: number;
    tabChange?: (newValue: number) => void;
}

const PeriodosTabsVideos: React.FC<PeriodosTabsProps> = ({ periodos, tabSelected = 0, tabChange }) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (tabChange) {
            tabChange(newValue);
        }
    };

    useEffect(() => {
        setValue(tabSelected);
    }, [tabSelected]);

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="basic tabs example"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                    },
                }}
            >
                {
                    periodos.map((periodoId: any, i: number) => {
                        return (
                            <Tab
                                label={periodoId.seccion}
                                value={i}
                                key={periodoId.periodo}
                                sx={{ minWidth: "108px", padding: "0px" }}
                            />
                        );
                    })
                }
            </Tabs>
        </Box>
    )
}

export default PeriodosTabsVideos;