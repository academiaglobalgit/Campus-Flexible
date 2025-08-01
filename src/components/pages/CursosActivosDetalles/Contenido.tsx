import { useParams } from "react-router-dom";
import { useGetCursosTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { toRoman } from "../../../utils/Helpers";
import { accordionStyle } from "@styles";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";

export const Contenido: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetCursosTabs(Number(id!), "Contenido");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        isLoading ?
            <LoadingCircular Text="Cargando Contenido..." />
            :

            Object.entries(contenido).map(([unidad, contenidos], index) =>

                <Accordion key={index}
                    title={`Unidad ${toRoman(Number(unidad))}`}
                    customHeader={!isMobile ? <AccordionStatus tittle={`Unidad ${toRoman(Number(unidad))}`} status={contenidos?.[0]?.estatus} /> : undefined}
                    sxProps={accordionStyle}>
                    {
                        contenidos.filter((item) => item.unidad === Number(unidad)).map((item, i) => (
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