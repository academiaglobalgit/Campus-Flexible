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
import type { ListadoVideoteca } from "../../../types/BibliotecaVideoteca.interface";
import { flexColumn } from "@styles";

const VideotecaDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);

    const {data: Listado, isLoading} = useGetListadoVideoteca();

    console.log(Listado)
    
    const handleValue = (val: number) => {
        setValue(val);
    }

    const Documento = (item: ListadoVideoteca) => {
        return(
            <Box sx={{...flexColumn, alignItems: 'flex-start', height: '120px', borderTop: '1px solid #AAB1B6', borderBottom: '1px solid #AAB1B6'}}>
                <TituloIcon Titulo={item.titulo} Icon={Lectura} />
                <Typography component="span" variant="body1" >
                    { item.descripcion }
                </Typography>
            </Box>
        )
    }

    const ListadoVideoteca = () => {
        let mat = '';        

        return(
            Listado.periodos.map((periodo, indexPanel) => (
                <TabPanel value={value} index={indexPanel} key={indexPanel}>
                    <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                        {
                            Listado.materias
                                .filter((item) => item.orden_seccion === Number(periodo))
                                .map((item, index) => {
                                    const showDivider = mat !== item.seccion;
                                    mat = item.seccion;

                                    return (
                                        <React.Fragment key={`group-${index}`}>
                                            {showDivider && (
                                                <Divider textAlign="center" sx={{ my: 2 }}>
                                                    <Typography component="span" variant="subtitle1" color="primary" >
                                                        {item.seccion.replace("Descripción del curso de ", "")}
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
                                                                materia.id_tipo_recurso === 2
                                                                ?
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
                                                                :
                                                                <Documento {...materia } key={i} />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                :
                                                    <>
                                                        {item.recursos.map((materia, i) => (
                                                                materia.id_tipo_recurso === 2
                                                                ?
                                                                    <VideoCard
                                                                        key={i}
                                                                        urlVideo={materia.url_recurso}
                                                                        controls={true}
                                                                        autoPlay={false}
                                                                        muted={false}
                                                                        title={materia.titulo ?? 'Titulo del video'}
                                                                        description={materia.descripcion}
                                                                        fontSizeTitle="h4"
                                                                    />
                                                                :
                                                                <Documento {...materia } key={i} />
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