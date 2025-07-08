import React from "react";
import { Box, Skeleton, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Videoteca } from "./Videoteca";
import imgVideoteca from "../../../assets/videoteca.jpg";
import imgBiblioteca from "../../../assets/biblioteca.jpg";
import { Biblioteca } from "./Biblioteca";
import TabPanel from "../../molecules/TabPanel/TabPanel";

import { DescripcionesPantallas, TitleScreen } from "@constants";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetBiblioteca, useGetBibliotecaById } from "../../../services/BibliotecaService";

const BibliotecaVideoteca: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);
    const { data: biblioteca, isLoading } = useGetBiblioteca();

    const id = biblioteca?.data?.id_modulo_campus;

    const { data: detalle, isLoading: loadingDetalle } = useGetBibliotecaById(id!, {
        enabled: !!id
    });

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Image = () => {
        const src = value === 0 ? imgVideoteca : imgBiblioteca;
        return(
            <Box
                component="img"
                src={src}
                maxHeight={isMobile ? 138 : 320}
                width="100%"
            />
        );
    };

    const SkeletonContents = () => (
        <Box>
            <Skeleton animation="wave" height={50} width={350} />
            <br />
            {
                Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        animation="wave"
                        height={20}
                        width={index % 2 === 0 ? '100%' : '90%'}
                        sx={{ marginBottom: '10px' }}
                    />
                ))
            }
        </Box>
    );

    const Contents = () => (
      <>
        <Image />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                <Tab label="Biblioteca" value={0} />
                <Tab label="Videoteca" value={1} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {isLoading || loadingDetalle ? (
                <SkeletonContents />
            ) : (
                detalle && <Biblioteca data={detalle.data[0]} />
            )}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {isLoading || loadingDetalle ? (
                <SkeletonContents />
            ) : (
                detalle && <Videoteca data={detalle.data[1]} />
            )}
        </TabPanel>
      </>
    );

    return(
        isMobile 
        ? 
            <Box sx={[{ width: '100%', }, isMobile && { paddingTop:'28px', paddingBottom: '28px' }]}>
                <Contents />
            </Box>
        :
            <ContainerDesktop title={TitleScreen.BIBLIOTECA} description={DescripcionesPantallas.BIBLIOTECA}>
                <Box sx={{pt:'12px'}}>
                    <Contents />
                </Box>
            </ContainerDesktop>
    );
};

export default BibliotecaVideoteca;