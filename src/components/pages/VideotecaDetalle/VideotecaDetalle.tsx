import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { VideoCard } from "../../molecules/VideoCard/VideoCard";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import PeriodosTabs from "../../molecules/PeriodosTabs/PeriodosTabs";
import { Typography } from "../../atoms/Typography/Typography";
import { useGetListadoVideoteca } from "../../../services/BibliotecaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Lectura } from "@iconsCustomizeds";
import type { ListadoVideotecaRecursos } from "../../../types/BibliotecaVideoteca.interface";
import { flexColumn } from "@styles";

const VideotecaDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);
    const { data: Listado, isLoading } = useGetListadoVideoteca();

    const handleValue = (val: number) => {
        setValue(val);
    }

    const Documento = (item: ListadoVideotecaRecursos) => {
        return (
            <Box sx={{ ...flexColumn, alignItems: 'flex-start', height: '120px', borderTop: '1px solid #AAB1B6', borderBottom: '1px solid #AAB1B6', cursor: 'pointer' }}
                onClick={() => window.open(item.url_recurso, '_blank')}>
                <TituloIcon Titulo={item.titulo} Icon={Lectura} />
                <Typography component="span" variant="body1" >
                    {item.curso}
                </Typography>
            </Box>
        )
    }

    const ListadoVideoteca = () => {
        let mat = '';

        return (
            Listado.periodos.map((_periodo, indexPanel) => (
                <TabPanel value={value} index={indexPanel} key={indexPanel}>
                    <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                        {
                            Listado.materias[indexPanel].grupos.map((grupo, groupIndex) => {
                                // cada grupo es un array de recursos
                                const seccion = grupo[0]?.curso ?? "";
                                const showDivider = mat !== seccion;
                                mat = seccion;

                                return (
                                    <React.Fragment key={`group-${groupIndex}`}>
                                        {showDivider && (
                                            <Divider textAlign="center" sx={{ my: 2 }}>
                                                <Typography component="span" variant="subtitle1" color="primary">
                                                    {seccion.replace("Descripción del curso de ", "")}
                                                </Typography>
                                            </Divider>
                                        )}

                                        {!isMobile ? (
                                            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                                                <Box
                                                    display="grid"
                                                    gridTemplateColumns={{
                                                        xs: "1fr",
                                                        sm: "1fr 1fr",
                                                        md: "1fr 1fr 1fr",
                                                    }}
                                                    gap={2}
                                                >
                                                    {grupo.map((materia, i) =>
                                                        materia.id_recurso === 2 ? (
                                                            <VideoCard
                                                                key={i}
                                                                urlVideo={materia.url_recurso}
                                                                controls={true}
                                                                autoPlay={false}
                                                                muted={false}
                                                                title={materia.titulo}
                                                                description={materia.descripcion}
                                                                fontSizeTitle="h4"
                                                            />
                                                        ) : (
                                                            <Documento {...materia} key={i} />
                                                        )
                                                    )}
                                                </Box>
                                            </Box>
                                        ) : (
                                            <>
                                                {grupo.map((materia, i) =>
                                                    materia.id_recurso === 1 ? (
                                                        <VideoCard
                                                            key={i}
                                                            urlVideo={materia.url_recurso}
                                                            controls={true}
                                                            autoPlay={false}
                                                            muted={false}
                                                            title={materia.titulo ?? "Titulo del video"}
                                                            description={materia.descripcion}
                                                            fontSizeTitle="h4"
                                                        />
                                                    ) : (
                                                        <Documento {...materia} key={i} />
                                                    )
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        }
                    </Box>
                </TabPanel>
            ))
        );
    }

    return (
        isLoading
            ?
            <LoadingCircular Text="Cargando Videoteca..." />
            :
            <>
                <PeriodosTabs periodos={Object.keys(Listado.periodos).length} tabChange={(newValue) => handleValue(newValue)} />
                {ListadoVideoteca()}
            </>
    )
};

export default VideotecaDetalle;