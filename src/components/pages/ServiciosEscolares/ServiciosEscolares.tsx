import React from "react";
import { DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {ServiciosEscolares as IconServiciosEscolares} from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Card, CardMedia, Grid, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import Button from "../../atoms/Button/Button";
import { flexColumn, flexRows } from "@styles";
import { InformacionServiciosEscolaresDialog } from "../../molecules/Dialogs/InformacionServiciosEscolaresDialog/InformacionServiciosEscolaresDialog";
import { DividerSection } from "../../molecules/DividerSection/DividerSection";
import { CardDuracion } from "../../molecules/CardDuracion/CardDuracion";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { useGetServiciosEscolares } from "../../../services/ServiciosEscolares";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

const ServiciosEscolares: React.FC = () => {
    // const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenInformacionDialog, setIsOpenInformacionDialog] = React.useState(false);
    const { data: cardData, isLoading } = useGetServiciosEscolares();
    
    const handleInformacion = () => {
        setIsOpenInformacionDialog(true);
    };

    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handlePagar = () => {
        // navigate('/servicios-escolares/pagar');
        window.open('https://academiaglobal.mx/servicios-escolares/pagar', '_blank');
    };

    const ImageSection = (image: string) => (
        <Card sx={{ borderRadius: '5px' }}>
            <CardMedia
                component="img"
                height={ isMobile ? 120 : 418 }
                image={ image }
                sx={[ 
                    isMobile &&  { objectFit: 'initial' },
                ]}
            />
        </Card>
    );

    const ButtonsSection = () => (
        <Box sx={[
                { width: '100%', gap: '10px' },
                isMobile && {...flexColumn },
                !isMobile && {...flexRows, flexDirection: 'row-reverse' },
            ]}>
            <>
                <Button
                    onClick={handlePagar}
                    fullWidth
                >
                    Pagar Aquí
                </Button>
            </>
            <>
                <Button onClick={handleInformacion} fullWidth variant="outlined" >Más Información</Button>
            </>
        </Box>
    );

    const InformationSection = (item: any) => (
        <Box sx={{ display: 'flex', flexDirection:'column', gap: '30px' }}>
            {
                isMobile && <>
                    <Box sx={{...flexRows, width: '100%', mt: '30px' }}>
                        <Typography component="h3" variant="h3" color="primary">
                            {item.nombre_servicio}
                        </Typography>
                    </Box>
                    <DividerSection Title="Información" marginTB={0} />   
                </>
            }
            <Typography 
                component="span" 
                variant="body2"
            >                                    
                { item.descripcion }
            </Typography>
            <CardDuracion label="Costo" description={`$${item.precio} MNX`} />
            <Box>
                <Typography 
                    component="span" 
                    variant="body2"
                    color="primary"
                >
                    Para más información:
                </Typography>
                <Typography 
                    component="span" 
                    variant="body1"
                >
                    <ul>
                        <li>
                            Horarios de atención: Lunes a viernes de 08:00 a 20:00 Horas (Tiempo del centro) y sábados de 10:00 a 14:00 Horas (Tiempo del Centro.)    
                        </li>    
                        <li>
                            Teléfonos: 667 716 3059/ 667 713 6996<br />Correo: contacto@academiaglobal.mx       
                        </li>    
                    </ul> 
                </Typography>
            </Box>
            {ButtonsSection()}
        </Box>
    )

    const ContentCard = (item: any) =>         
        (
        <Box sx={{ mb:4, mt: isMobile ? 2 : 5 }}>
            {
                isMobile
                ?
                    <>
                        { ImageSection(item.image) }
                        { InformationSection(item) }
                    </>
                :
                    <>
                        <Grid container spacing={2}>
                            <Grid size={{md: 4 }}>
                                { ImageSection(item.image) }
                            </Grid>
                            <Grid size={{md: 8 }}>
                                { InformationSection(item) }
                            </Grid>
                        </Grid>
                    </>
            }
        </Box>
    );
    

    const TabsServicios = () => {
        return(
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
                            cardData && cardData.data.map((item, i) => (
                                <Tab
                                    label={item.nombre_servicio}
                                    value={i}
                                    key={i}
                                    sx={{ minWidth: '108px', padding: '0px' }}
                                />
                            ))
                        }
                    </Tabs>
                </Box>
                {
                    cardData && cardData.data.map((item, i) => (
                        <TabPanel value={value} index={i} key={i}>
                            { ContentCard(item) }
                        </TabPanel>
                    ))
                }
            </>
        )
    }


    return(
        <>
            {
                isMobile
                        ?
                            <>
                                <TituloIcon Titulo={TitleScreen.SERVICIOS_ESCOLORES} Icon={ IconServiciosEscolares } />
                                <Typography component="span" variant="body1">
                                    {DescripcionesPantallas.SERVICIOS_ESCOLARES}
                                </Typography>
                                {
                                    isLoading ? <LoadingCircular Text="Cargando Servicios Escolares"/> : <TabsServicios />
                                }
                            </>
                        :
                            <ContainerDesktop title={TitleScreen.SERVICIOS_ESCOLORES} description={DescripcionesPantallas.SERVICIOS_ESCOLARES}>
                                {
                                    isLoading ? <LoadingCircular Text="Cargando Servicios Escolares"/> : <TabsServicios />
                                }
                            </ContainerDesktop>
            }
            <InformacionServiciosEscolaresDialog isOpen={isOpenInformacionDialog} close={() => setIsOpenInformacionDialog(false)} />
        </>
    );
};

export default ServiciosEscolares;