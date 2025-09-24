import { accordionStyle } from "@styles";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useGetCursosTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { useParams } from "react-router-dom";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";
import { usePostMessageListener } from "../../../hooks/usePostMessageListener";
import { useQueryClient } from "@tanstack/react-query";
import type { CursosTabsResponse } from "@constants";
import { CURSOS_ACTIVOS_ENDPOINTS } from "../../../types/endpoints";

export const Evaluaciones: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetCursosTabs(Number(id!), "Evaluaciones");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryClient = useQueryClient();

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

    const changeStatus = (data: { id_curso: number; id_recurso: number; estatus: string }) => {
        queryClient.setQueryData<CursosTabsResponse>(
            [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Evaluaciones", Number(id!)],
            (old) => {
            if (!old) return old;

            return {
                ...old,
                data: old.data.map((item) =>
                item.id_curso === Number(data.id_curso) && item.id_recurso === Number(data.id_recurso)
                    ? { ...item, estatus: data.estatus }
                    : item
                ),
            };
            }
        );
    };

    usePostMessageListener(["*"], (data) => {
        if (!data) return;

        switch (data.accion) {
            case "abierto":
                changeStatus({
                    id_curso: data.id_curso,
                    id_recurso: data.id_recurso,
                    estatus: data.estatus,
                });
                queryClient.resetQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Contenido", Number(id!)], exact: true });
            break;

            case "cerrado":
                changeStatus({
                    id_curso: data.id_curso,
                    id_recurso: data.id_recurso,
                    estatus: data.estatus,
                });
                queryClient.resetQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Contenido", Number(id!)], exact: true });
                queryClient.invalidateQueries({ queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, "Evaluaciones", Number(id!)], exact: true });
            break;
        }
    });

    return (
        isLoading ?
            <LoadingCircular Text="Cargando Evaluaciones..." />
            :
            Object.entries(contenido).map(([_, contenidos], index) => {
                const disabled = getDisabled(contenidos, index);
                // mostrar iframe solo si NO está deshabilitado
                const mostrarContenido = !disabled;

                return (
                    <Accordion
                        key={index}
                        title={contenidos?.[0].titulo_elemento}
                        customHeader={
                            !isMobile ? (
                            <AccordionStatus
                                tittle={contenidos?.[0].titulo_elemento}
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