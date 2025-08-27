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

    // detectar si hay alguno en "Cursando"
    const indexCursando = Object.entries(contenido).findIndex(([_, cursos]) => cursos[0].estatus === "Cursando");

    // si no hay cursando, buscar primer "Sin Iniciar"
    const indexSinIniciar =
        indexCursando === -1
        ? Object.entries(contenido).findIndex(([_, cursos]) => cursos[0].estatus === "Sin Iniciar")
        : -1;

    const getDisabled = (curso: any, index: number) => {
        if (curso.estatus === "Finalizado") return true; // siempre deshabilitado

        if (indexCursando !== -1) {
            // si existe alguno en "Cursando", solo ese se habilita
            return index !== indexCursando;
        }

        if (indexSinIniciar !== -1) {
            // habilitar solo el primer "Sin Iniciar"
            return index !== indexSinIniciar;
        }

        // si no hay ninguno cursando: solo el primero habilitado
        return index !== 0;
    };

    const setTitleAccordion = (unidad: string, index: number) => {
        const totalUnidades = Object.keys(contenido).length;

        if ((index + 1) === totalUnidades) {
            return "Examen Final";
        }

        return `Unidad ${toRoman(Number(unidad))}`;
    }

    return (
        isLoading ?
            <LoadingCircular Text="Cargando Evaluaciones..." />
            :
            Object.entries(contenido).map(([unidad, contenidos], index) => {
                const disabled = getDisabled(contenidos, index);
                // mostrar iframe solo si NO está deshabilitado
                const mostrarContenido = !disabled;

                return (
                    <Accordion
                        key={index}
                        title={`Unidad ${toRoman(Number(unidad))}`}
                        customHeader={
                            !isMobile ? (
                            <AccordionStatus
                                tittle={setTitleAccordion(unidad, index)}
                                status={contenidos?.[0]?.estatus}
                            />
                            ) : undefined
                        }
                        sxProps={accordionStyle}
                        isDisabled={disabled}
                    >
                        {isMobile && (
                            <Box sx={{ padding: "10px" }}>
                            <StatusIcon estado={contenidos?.[0]?.estatus} />
                            </Box>
                        )}

                        {mostrarContenido &&
                            contenidos.map((item, i) => (
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
                            ))}
                    </Accordion>
                );
            })
    )
}