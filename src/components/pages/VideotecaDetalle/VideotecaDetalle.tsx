import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { VideoCard } from "../../molecules/VideoCard/VideoCard";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import PeriodosTabs from "../../molecules/PeriodosTabs/PeriodosTabs";
import { Typography } from "../../atoms/Typography/Typography";
import { useGetListadoVideoteca } from "../../../services/BibliotecaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

const VideotecaDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);

    const {data: Listado, isLoading} = useGetListadoVideoteca();
    
    const handleValue = (val: number) => {
        setValue(val);
    }

    const ListadoVideoteca = () => {
        let mat = '';        

        return(
            Listado.periodos.map((periodo, indexPanel) => (
                <TabPanel value={value} index={indexPanel} key={indexPanel}>
                    <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                        {
                            Listado.materias
                                .filter((item) => item.id_periodo === periodo)
                                .map((item, index) => {
                                    const showDivider = mat !== item.nombre_curso;
                                    mat = item.nombre_curso;

                                    return (
                                        <React.Fragment key={`group-${index}`}>
                                            {showDivider && (
                                                <Divider textAlign="center" sx={{ my: 2 }}>
                                                    <Typography component="span" variant="subtitle1" color="primary" >
                                                        {item.nombre_curso}
                                                    </Typography>
                                                </Divider>
                                            )}
                                            {
                                                !isMobile
                                                ?
                                                    <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                                        <Box
                                                            display="grid"
                                                            gridTemplateColumns={{
                                                                xs: '1fr',
                                                                sm: '1fr 1fr',
                                                                md: '1fr 1fr 1fr'
                                                            }}
                                                            gap={2}
                                                        >
                                                            {item.recursos.map((materia, i) => (
                                                                <VideoCard
                                                                    key={i}
                                                                    urlVideo={materia.url_recurso}
                                                                    controls={true}
                                                                    autoPlay={false}
                                                                    muted={false}
                                                                    title={`Panel ${indexPanel + 1} - Video ${index + 1}`}
                                                                    description={`Descripción del video ${index + 1}`}
                                                                    fontSizeTitle="h4"
                                                                    type={materia.id_tipo_recurso === 2 ? 'Video' : 'PDF'}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                :
                                                    <>
                                                        {item.recursos.map((materia, i) => (
                                                                <VideoCard
                                                                    key={i}
                                                                    urlVideo={materia.url_recurso}
                                                                    controls={true}
                                                                    autoPlay={false}
                                                                    muted={false}
                                                                    title={`Panel ${indexPanel + 1} - Video ${index + 1}`}
                                                                    description={`Descripción del video ${index + 1}`}
                                                                    fontSizeTitle="h4"
                                                                    type={materia.id_tipo_recurso === 2 ? 'Video' : 'PDF'}
                                                                />
                                                            ))}
                                                    </>
                                            }
                                            
                                        </React.Fragment>
                                    );
                                })
                        }
                    </Box>
                </TabPanel>
            ))
        )
    }

    return (
        isLoading 
        ?
            <LoadingCircular Text="Cargando Videoteca..."/>
        :
            <>
                <PeriodosTabs periodos={Object.keys(Listado.periodos).length} tabChange={(newValue) => handleValue(newValue)} />
                {ListadoVideoteca()}
            </>
    )
};

export default VideotecaDetalle;