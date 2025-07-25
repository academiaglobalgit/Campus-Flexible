import React from "react";
import { Box, Divider, Tab, Tabs, tabsClasses, Typography, useMediaQuery, useTheme } from "@mui/material";

import CampusDigital from "../../../assets/campus_digital.jpg";
import ServiciosEscolares from "../../../assets/servicios_escolares_contacto.jpg";
import Prospectos from "../../../assets/prospectos.jpg";
import Asesorias from "../../../assets/asesorias.jpg";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { flexColumn } from "@styles";
import { useContactoInterno } from "../../../services/ContactoService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";


const ContactoInterno: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(1);
    const { data: interno, isLoading } = useContactoInterno(1);

    console.log(interno)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
    };

    const images: { [key: number]: string } = {
        0: CampusDigital,
        1: Prospectos,
        2: ServiciosEscolares,
        3: Asesorias
    }

    const Image = () => {
        const src = images[value];
        return (
            <Box
                component="img"
                src={src}
                maxHeight={isMobile ? 138 : 320}
                width="100%"
                sx={{ mt: '25px', objectFit: 'cover' }}
            />
        );
    };

    const Contents = () => (

        <>
            {

                <>
                    {
                        isMobile
                            ?
                            <>
                                <Image />
                                <TituloIcon Titulo="CONTACTO DE TU PLATAFORMA" fontSize="h4" />
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                                            interno.map((section, index) => (
                                                <Tab
                                                    key={index}
                                                    label={section.label}
                                                    value={section.valor}
                                                    sx={{ minWidth: '150px', padding: '0px' }}
                                                />
                                            ))
                                        }
                                    </Tabs>
                                </Box>
                                {interno.map((section, index) => (
                                    <TabPanel key={index + 1} value={value} index={index + 1}>
                                        {Contenido(section)}
                                    </TabPanel>))}
                            </>
                            :
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                    {interno.map((section) => (
                                        Contenido(section)
                                    ))}
                                </Box>
                            </>
                    }
                </>

            }
        </>
    );

    const Contenido = (section: any) => (
        <Box sx={isMobile ? { mt: 5 } : { display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '57px' }}>
            <Box sx={isMobile ? { ...flexColumn, alignItems: 'flex-start', gap: '20px', mt: 2, mb: 2 } : { display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '20pxpx' }}>
                {isMobile ?
                    <>
                        <Typography component="span" variant="body1">
                            {section.data.description}
                        </Typography>
                    </>
                    :
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '260px', minHeight: '350px', objectFit: 'cover' }}>

                            <Box component="img" src={images[section.valor]} sx={{ width: '260px', height: '138px' }}>
                            </Box>
                            <Divider textAlign="center">
                                <Typography component="span" variant="subtitle1" color="primary" sx={{ fontWeight: 400, color: "#005A9BCC" }}>{section.label}</Typography>
                            </Divider>
                            <Typography component="span" variant="body1">
                                {section.data.description}
                            </Typography>
                        </Box>
                    </>
                }

                <Box sx={{ ...flexColumn, alignItems: 'flex-start', mt: 1, gap: '17px' }}>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1 }}>
                        <Typography component="h5" variant="h5" color="primary" sx={{ fontWeight: 400, color: theme.palette.primary.light }}>
                            Horarios de atención:
                        </Typography>
                        <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.horarios }} />
                    </Box>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1 }}>
                        <Typography component="span" variant="body2" color="primary">
                            Teléfonos:
                        </Typography>
                        <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.telefonos }} />
                    </Box>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1 }}>
                        <Typography component="span" variant="body2" color="primary">
                            Email:
                        </Typography>
                        <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.email }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        {
                            isLoading ? <LoadingCircular Text="Cargando contactos" /> : <Contents />
                        }
                    </>
                    :
                    <ContainerDesktop title="Contacto de tu plataforma">
                        {
                            isLoading ? <LoadingCircular Text="Cargando contactos" /> : <Contents />
                        }
                    </ContainerDesktop>
            }

        </>
    );
}

export default ContactoInterno;