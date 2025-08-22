import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { VideoCard } from "../../molecules/VideoCard/VideoCard";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import PeriodosTabs from "../../molecules/PeriodosTabs/PeriodosTabs";
import { Typography } from "../../atoms/Typography/Typography";
import { useGetListadoVideoteca } from "../../../services/BibliotecaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Lectura } from "@iconsCustomizeds";
import type { ListadoVideotecaRecursos } from "../../../types/BibliotecaVideoteca.interface";
import { flexColumn } from "@styles";

const VideotecaDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);
    const { data: Listado, isLoading } = useGetListadoVideoteca();

    console.log(Listado)

    const handleValue = (val: number) => {
        setValue(val);
    }

    const Documento = (item: ListadoVideotecaRecursos) => {
        return (
            <Box sx={{ ...flexColumn, alignItems: 'flex-start', height: '120px', borderTop: '1px solid #AAB1B6', borderBottom: '1px solid #AAB1B6', cursor: 'pointer' }}
                onClick={() => window.open(item.url_recurso, '_blank')}>
                <TituloIcon Titulo={item.titulo} Icon={item.id_tipo_recurso === 1 ? Lectura : AudiotrackIcon} />
                <Typography component="span" variant="body1" >
                    {item.curso}
                </Typography>
            </Box>
        )
    }


    const Recursos = (materia: any, key: number) => {
        switch (materia.id_tipo_recurso) {
            case 1:
                return <Documento {...materia} key={key} />;
            case 2:
                return (

                    isMobile ? <VideoCard
                        key={key}
                        urlVideo={materia.url_recurso}
                        controls={true}
                        autoPlay={false}
                        muted={false}
                        title={materia.titulo}
                        description={materia.descripcion}
                        fontSizeTitle="h4"
                    /> :
                        <VideoCard
                            key={key}
                            urlVideo={materia.url_recurso}
                            controls={true}
                            autoPlay={false}
                            muted={false}
                            title={materia.titulo ?? "Titulo del video"}
                            description={materia.descripcion}
                            fontSizeTitle="h4"
                        />
                );
            case 3:
                return <Documento {...materia} key={key} />;
            case 4:
                return <Box dangerouslySetInnerHTML={{ __html: materia.descripcion }}></Box>;

            default:
                return <Box > Por el momento no se cuenta con recursos. </Box>;
        }
    }

    const ListadoVideoteca = () => {
        let mat = '';

        return (
            Listado.periodos.map((_periodo, indexPanel) => (
                <TabPanel value={value} index={indexPanel} key={indexPanel}>
                    <Box sx={{ marginBottom: "24px", pt: "16px" }}>
                        {Listado.materias
                            .filter(m => m.periodo === _periodo) // solo materias de este periodo
                            .map((materia, materiaIndex) => {
                                const seccion = materia.seccion ?? "";
                                const showDivider = mat !== seccion;
                                mat = seccion;

                                return (
                                    <React.Fragment key={`materia-${materiaIndex}`}>
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
                                                    {materia.grupos.length > 0 ? (
                                                        materia.grupos.map((grupo, i) =>
                                                            grupo.length > 0 ? (
                                                                grupo.map((recurso, j) => (
                                                                    <React.Fragment key={`${materiaIndex}-${i}-${j}`}>
                                                                        {Recursos(recurso, j)}
                                                                    </React.Fragment>
                                                                ))
                                                            ) : (
                                                                <Typography
                                                                    key={`no-recursos-${materiaIndex}-${i}`}
                                                                    variant="body2"
                                                                    color="primary"
                                                                    component={"span"}                                                                >
                                                                    No hay recursos por el momento
                                                                </Typography>
                                                            )
                                                        )
                                                    ) : (
                                                        <Typography
                                                            key={`no-recursos-${materiaIndex}`}
                                                            variant="body2"
                                                            color="primary"
                                                            component={"span"}
                                                        >
                                                            No hay recursos por el momento
                                                        </Typography>
                                                    )}


                                                </Box>
                                            </Box>
                                        ) : (
                                            <>
                                                {materia.grupos.length > 0 ? (
                                                    materia.grupos.map((grupo, i) =>
                                                        grupo.length > 0 ? (
                                                            grupo.map((recurso, j) => (
                                                                <React.Fragment key={`${materiaIndex}-${i}-${j}`}>
                                                                    {Recursos(recurso, j)}
                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <Typography
                                                                key={`no-recursos-${materiaIndex}-${i}`}
                                                                variant="body2"
                                                                color="primary"
                                                                component={"span"}                                                                >
                                                                No hay recursos por el momento
                                                            </Typography>
                                                        )
                                                    )
                                                ) : (
                                                    <Typography
                                                        key={`no-recursos-${materiaIndex}`}
                                                        variant="body2"
                                                        color="primary"
                                                        component={"span"}
                                                    >
                                                        No hay recursos por el momento
                                                    </Typography>
                                                )}

                                            </>
                                        )}
                                    </React.Fragment>
                                );
                            })}
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
                <PeriodosTabs periodos={Listado.periodos} tabChange={(newValue) => handleValue(newValue)} />
                {ListadoVideoteca()}
            </>
    )
};

export default VideotecaDetalle;