import React from "react";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { CursamientoAutoridad } from "./CursamientoAutoridad";
import { useGetInformacion } from "../../../services/PlanEstudioService";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

const PlanEstudioInformacion: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { id } = useParams<{ id: string }>();
    const { data: informacion, isLoading } = useGetInformacion(Number(id!));

    const [value, setValue] = React.useState(0);
    const [title, setTitle] = React.useState("");

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue > 0) {
            setTitle(InformacionTabs[newValue]?.tab ?? "")
        } else {
            setTitle(informacion?.data.informacion.nombre_curso ?? "");
        }
    };

    const InformacionTabs = [
        {
            tab: "Evaluación",
            content: informacion?.data.cursamiento
                ? <CursamientoAutoridad data={informacion.data.cursamiento} descripcion={informacion?.data.informacion.descripcion ?? ""} />
                : null
        },
        /*    {
            tab: "Información",
            content: informacion?.data.informacion
                ? <Informacion data={informacion.data.informacion} />
                : null
        },
        {
            tab: "Cursamiento",
            content: informacion?.data.cursamiento
                ? <Cursamiento data={informacion.data.cursamiento} />
                : null
        },
        {
            tab: "Tutor",
            content: informacion?.data.tutor
                ? <Tutor data={informacion.data.tutor} />
                : null
        }, */
    ];

    const Contents = () => (
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
                        {tab.content}
                    </TabPanel>
                ))
            }
        </>
    );

    const Loading = () => <LoadingCircular Text="Cargando Informacion..." />

    return (
        isMobile
            ?
            isLoading
                ? <Loading />
                : <Contents />
            :
            isLoading
                ? <Loading />
                : <ContainerDesktop title={title !== "" ? title : informacion?.data.informacion.nombre_curso ?? ""}>
                    <Contents />
                </ContainerDesktop>
    );
}

export default PlanEstudioInformacion;