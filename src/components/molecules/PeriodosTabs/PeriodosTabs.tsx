import React, { useEffect } from "react";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import { toRoman } from "../../../utils/Helpers";
import { useAuth } from "../../../hooks";

type PeriodosTabsProps = {
    periodos: number;
    tabSelected?: number;
    tabChange?: (newValue: number) => void;
}

const PeriodosTabs: React.FC<PeriodosTabsProps> = ({periodos, tabSelected = 0, tabChange}) => {
    const { configPlataforma } = useAuth();
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

    const getLabel = (index: number) => {
        switch(configPlataforma?.id_plan_estudio) {
            case 17:
            case 19:
                return `Certificaciones`;
            default:
                return `Periodo ${toRoman(index + 1)}`;
        }
    }

    return(
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
                    Array.from({length: periodos}).map((_, i) => (
                        <Tab
                            label={getLabel(i)}
                            value={i}
                            key={i}
                            sx={{ minWidth: '108px', padding: '0px' }}
                        />
                    ))
                }
            </Tabs>
        </Box>
    )
}

export default PeriodosTabs;