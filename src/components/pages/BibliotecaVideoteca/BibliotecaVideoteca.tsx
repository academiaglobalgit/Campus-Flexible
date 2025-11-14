import React from "react";
import { Box, CircularProgress, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Videoteca } from "./Videoteca";
import imgVideoteca from "../../../assets/videoteca.jpg";
import imgBiblioteca from "../../../assets/biblioteca.jpg";
import { Biblioteca } from "./Biblioteca";
import TabPanel from "../../molecules/TabPanel/TabPanel";

import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetBiblioteca, useGetBibliotecaById } from "../../../services/BibliotecaService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { Typography } from "../../atoms/Typography/Typography";

const BibliotecaVideoteca: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);
    const { data: biblioteca, isLoading } = useGetBiblioteca();

    const id = biblioteca?.data?.id_modulo_campus;

    const { data: detalle, isLoading: isLoadingDetalle } = useGetBibliotecaById(id!, {
        enabled: !!id
    });

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

    const Loading = (text: string) => (
        <Box
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '20px', 
                width: '100%', 
                height: '300px' 
            }}
        >
            <CircularProgress sx={{ color: 'primary.main' }} />
            <Typography component="h4" variant="h4" color="primary">{text}</Typography>
        </Box>
    );


    const Contents = () => (
        isLoading ? (<LoadingCircular Text="Cargando..." />)
        :
        <>            
            <Image />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Biblioteca" value={0} />
                    <Tab label="Videoteca" value={1} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {
                    isLoadingDetalle ? Loading("Cargando Biblioteca...")
                    :
                    detalle && <Biblioteca data={detalle.data[0]} />
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    isLoadingDetalle ? Loading("Cargando Videoteca...")
                    :
                    detalle && <Videoteca data={detalle.data[1]} />
                }
            </TabPanel>
        </>
    );

    return (
        isMobile
            ?
            <Box sx={[{ width: '100%', }, isMobile && { paddingTop: '28px', paddingBottom: '28px' }]}>
                <Contents />
            </Box>
            :
            <ContainerDesktop title={""} >
                <Box sx={{ pt: '12px' }}>
                    <Contents />
                </Box>
            </ContainerDesktop>
    );
};

export default BibliotecaVideoteca;