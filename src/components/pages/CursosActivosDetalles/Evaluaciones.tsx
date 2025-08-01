import { accordionStyle } from "@styles";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useGetCursosTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { useParams } from "react-router-dom";
import { toRoman } from "../../../utils/Helpers";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";

export const Evaluaciones: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetCursosTabs(Number(id!), "Evaluaciones");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        isLoading ?
            <LoadingCircular Text="Cargando Evaluaciones..." />
            :

            Object.entries(contenido).map(([unidad, contenidos], index) =>
                <Accordion key={index}
                    title={`Unidad ${toRoman(Number(unidad))}`}
                    customHeader={!isMobile ? <AccordionStatus tittle={`Unidad ${toRoman(Number(unidad))}`} status={contenidos?.[0]?.estatus} /> : undefined}
                    sxProps={accordionStyle}>
                    <Box sx={{ display: isMobile ? 'block' : 'none', padding: '10px' }}>
                        <StatusIcon estado={contenidos?.[0]?.estatus} />
                    </Box>
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
}