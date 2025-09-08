import React from "react";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Videoteca } from "./Videoteca";
import imgVideoteca from "../../../assets/videoteca.jpg";
import imgBiblioteca from "../../../assets/biblioteca.jpg";
import { Biblioteca } from "./Biblioteca";
import TabPanel from "../../molecules/TabPanel/TabPanel";

import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetBiblioteca, useGetBibliotecaById } from "../../../services/BibliotecaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { loadConfig } from '../../../config/configStorage';

const BibliotecaVideoteca: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);
    const { data: biblioteca, isLoading } = useGetBiblioteca();
    const [config, setConfig] = React.useState<any>(null);

    const id = biblioteca?.data?.id_modulo_campus;

    const { data: detalle, isLoading: loadingDetalle } = useGetBibliotecaById(id!, {
        enabled: !!id
    });

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Image = () => {
        const src = value === 0 ? imgVideoteca : imgBiblioteca;
        return (
            <Box
                component="img"
                src={src}
                maxHeight={isMobile ? 138 : 320}
                width="100%"
            />
        );
    };

    type ContentsProps = {
        idPlanEstudio: number;
    };

    const Contents: React.FC<ContentsProps> = ({ idPlanEstudio }) => (
        <>
            <Image />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {idPlanEstudio !== 17 && <Tab label="Biblioteca" value={0} />}
                    <Tab label="Videoteca" value={idPlanEstudio !== 17 ? 1 : 0} />
                </Tabs>
            </Box>

            {idPlanEstudio !== 17 && (
                <TabPanel value={value} index={0}>
                    {isLoading || loadingDetalle ? (
                        <LoadingCircular Text="Cargando Biblioteca..." />
                    ) : (
                        detalle && <Biblioteca data={detalle.data[0]} />
                    )}
                </TabPanel>
            )}

            <TabPanel value={value} index={idPlanEstudio !== 17 ? 1 : 0}>
                {isLoading || loadingDetalle ? (
                    <LoadingCircular Text="Cargando Videoteca..." />
                ) : (
                    detalle && <Videoteca data={detalle.data[idPlanEstudio !== 17 ? 1 : 0]} />
                )}
            </TabPanel>
        </>
    );



    return (
        isMobile
            ?
            <Box sx={[{ width: '100%', }, isMobile && { paddingTop: '28px', paddingBottom: '28px' }]}>
                <Contents idPlanEstudio={config?.data?.id_plan_estudio} />
            </Box>
            :
            <ContainerDesktop title={""} >
                <Box sx={{ pt: '12px' }}>
                    <Contents idPlanEstudio={config?.data?.id_plan_estudio} />
                </Box>
            </ContainerDesktop>
    );
};

export default BibliotecaVideoteca;