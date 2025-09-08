import { useParams } from "react-router-dom";
import { useGetContenidoTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { accordionStyle } from "@styles";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";

export const Contenido: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetContenidoTabs(Number(id!), "Contenido");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getLabel = (contenidos: any) => {
        return contenidos?.[0]?.titulo_elemento;
    }

    return (
        isLoading ?
            <LoadingCircular Text="Cargando Contenido..." />
            :
            Object.entries(contenido).map(([unidad, contenidos], index) =>

                <Accordion key={index}
                    title={getLabel(contenidos)}
                    customHeader={!isMobile ? <AccordionStatus tittle={getLabel(contenidos)} status={contenidos?.[0]?.estatus} /> : undefined}
                    sxProps={accordionStyle}>
                    {
                        isMobile && <Box sx={{ padding: '10px' }}>
                            <StatusIcon estado={contenidos?.[0]?.estatus} />
                        </Box>
                    }

                    {
                        contenidos.filter((item) => item.titulo_elemento === unidad).map((item, i) => (
                            <Box key={i}>
                                <iframe
                                    src={item?.url}
                                    style={{
                                        width: "100%",
                                        height: "100vh",
                                        border: "none",
                                    }}
                                />
                            </Box>
                        ))
                    }

                </Accordion>
            )
    )
};