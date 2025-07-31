import { accordionStyle } from "@styles";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box } from "@mui/material"
import { useGetCursosTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { useParams } from "react-router-dom";
import { toRoman } from "../../../utils/Helpers";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";

export const Evaluaciones: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetCursosTabs(Number(id!), "Evaluaciones");


    return (
        isLoading ?
            <LoadingCircular Text="Cargando Evaluaciones..." />
            :

            Object.entries(contenido).map(([unidad, contenidos], index) =>
                <Accordion key={index}
                    customHeader={<AccordionStatus tittle={`Unidad ${toRoman(Number(unidad))}`} status={'Cursando'} />}
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
}