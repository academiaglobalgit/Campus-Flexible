import React from "react";
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { ServiciosEscolares as IconServiciosEscolares } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Card, CardMedia, Grid, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import Button from "../../atoms/Button/Button";
import { accordionStyle, flexColumn } from "@styles";
import { InformacionServiciosEscolaresDialog } from "../../molecules/Dialogs/InformacionServiciosEscolaresDialog/InformacionServiciosEscolaresDialog";

import { CardDuracion } from "../../molecules/CardDuracion/CardDuracion";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { useGetServiciosEscolares } from "../../../services/ServiciosEscolaresService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

import type { Servicios, ServicioSeccion } from "../../../types/ServiciosEscolares.interface";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { useNavigate } from "react-router-dom";

const ServiciosEscolares: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenInformacionDialog, setIsOpenInformacionDialog] = React.useState(false);
    const { data: cardData, isLoading } = useGetServiciosEscolares();
    const [value, setValue] = React.useState(0);

    const handleInformacion = () => {
        navigate(AppRoutingPaths.CONTACTO);
    };

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // const handlePagar = () => {
    //     // navigate('/servicios-escolares/pagar');
    //     window.open('https://academiaglobal.mx/servicios-escolares/pagar', '_blank');
    // };

    const ImageSection = (image: string) => (
        <Card sx={{ borderRadius: '5px' }}>
            <CardMedia
                component="img"
                height={isMobile ? 120 : 165}
                width={isMobile ? 346 : 425}
                image={image}
                sx={[
                    isMobile && { objectFit: 'cover' },
                ]}
            />
        </Card>
    );

    const ButtonsSection = () => (
        <Box sx={[
            { ...flexColumn, width: '100%', gap: '10px', pt: isMobile ? 2 : 0 }
        ]}>
            {/* <>
                <Button
                    onClick={handlePagar}
                    fullWidth
                >
                    Pagar Aquí
                </Button>
            </> */}
            <>
                <Button onClick={handleInformacion} fullWidth variant="outlined" >Más Información</Button>
            </>
        </Box>
    );

    const InformationSection = (item: Servicios) => (

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container sx={{ justifyContent: 'space-between', paddingInline: isMobile ? '0px' : '75px' }}>
                <Grid size={isMobile ? 12 : 5}>
                    <Typography
                        component="span"
                        variant="body3"
                    >
                        {item.descripcion}
                    </Typography>
                </Grid>
                <Grid size={isMobile ? 12 : 5} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isMobile && ImageSection(item.imagen)}
                    <CardDuracion label="Costo" description={`$${item.precio} MNX`} sxProps={{ justifyContent: isMobile ? 'center' : 'flex-start', paddingInline: '10px', mt: isMobile ? 2.5 : 0 }} />
                    {ButtonsSection()}
                </Grid>
            </Grid>
        </Box >
    )

    const AccordionInformation = (items: Servicios[]) =>
    (
        items.map((item: Servicios, index) => (
            <Accordion
                key={index}
                title={item.nombre}
                sxProps={{
                    ...accordionStyle
                }}
                isExpanded={index === 0}
            >
                {InformationSection(item)}
            </Accordion>
        ))
    )

    const ContentCard = (servicios: ServicioSeccion) =>
    (
        <Box sx={{ mb: 4, mt: isMobile ? 2 : 5 }}>
            <>
                {isMobile && ImageSection(servicios.imagen)}
                <Box sx={{ ...flexColumn, pt: 2, width: '100%', alignItems: isMobile ? 'center' : 'flex-start' }}>
                    <Typography component="h3" variant="h3" color="primary">
                        {servicios.nombre_seccion}
                    </Typography>
                </Box>
                {AccordionInformation(servicios.servicios)}
            </>
        </Box>
    );


    const TabsServicios = () => {
        return (
            <>
                <Box sx={{ width: "100%" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="basic tabs example"
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                "&.Mui-disabled": { opacity: 0.3 },
                            },
                        }}
                    >
                        {
                            cardData && cardData.map((item, i) => (
                                <Tab
                                    label={item.nombre_seccion}
                                    value={i}
                                    key={i}
                                    sx={{ minWidth: isMobile ? '158px' : '108px', padding: '0px' }}
                                />
                            ))
                        }
                    </Tabs>
                </Box>
                {
                    cardData && cardData.map((item, i) => (
                        <TabPanel value={value} index={i} key={i}>
                            {ContentCard(item)}
                        </TabPanel>
                    ))
                }
            </>
        )
    }

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.SERVICIOS_ESCOLORES} Icon={IconServiciosEscolares} />
                        <Typography component="span" variant="body1">
                            {DescripcionesPantallas.SERVICIOS_ESCOLARES}
                        </Typography>
                        {
                            isLoading ? <LoadingCircular Text="Cargando Servicios Escolares" /> : <TabsServicios />
                        }
                    </>
                    :
                    <ContainerDesktop title={TitleScreen.SERVICIOS_ESCOLORES} description={DescripcionesPantallas.SERVICIOS_ESCOLARES}>
                        {
                            isLoading ? <LoadingCircular Text="Cargando Servicios Escolares" /> : <TabsServicios />
                        }
                    </ContainerDesktop>
            }
            <InformacionServiciosEscolaresDialog isOpen={isOpenInformacionDialog} close={() => setIsOpenInformacionDialog(false)} />
        </>
    );
};

export default ServiciosEscolares;