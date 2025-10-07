import React from "react";
import { Box, Divider, Link, Tab, Tabs, tabsClasses, Typography, useMediaQuery, useTheme } from "@mui/material";

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
import { loadConfig } from "../../../config/configStorage";
import { CellPhone, EmailContacto, WhatsAppContacto } from "@iconsCustomizeds";
import { formatWithIMask } from "../../../utils/Helpers";


const ContactoInterno: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(1);

    const [config, setConfig] = React.useState<any>(null);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    const { data: interno, isLoading } = useContactoInterno(config?.data?.id_plan_estudio);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
                                                    value={index + 1}
                                                    sx={{ minWidth: '150px', padding: '0px' }}
                                                />
                                            ))
                                        }
                                    </Tabs>
                                </Box>
                                {
                                    interno.map((section, index) => (
                                        <TabPanel key={index} value={value} index={index + 1}>
                                            {Contenido(section)}
                                        </TabPanel>
                                    ))
                                }
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
        <Box key={section.valor} sx={isMobile ? { mt: 5 } : { display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '57px' }}>
            <Box key={section.valor} sx={isMobile ? { ...flexColumn, alignItems: 'flex-start', gap: '20px', mt: 2, mb: 2 } : { display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '20pxpx' }}>
                {isMobile ?
                    <>
                        <Typography component="span" variant="body1">
                            {section.data.description}
                        </Typography>
                    </>
                    :
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '260px', height: 'auto', objectFit: 'cover' }}>

                            <Box component="img" src={images[section.valor]} sx={{ width: '260px', height: '138px' }}>
                            </Box>
                            <Divider textAlign="center">
                                <Typography component="span" variant="subtitle1" color="primary" sx={{ fontWeight: 400, color: config?.data.color_primary }}>{section.label}</Typography>
                            </Divider>
                            <Typography component="span" variant="body1">
                                {section.data.description}
                            </Typography>
                        </Box>
                    </>
                }

                <Box sx={{ ...flexColumn, alignItems: 'flex-start', mt: 1, gap: '17px' }}>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1 }}>
                        <Typography component="h5" variant="h5" color="primary" sx={{ fontWeight: 400, color: config?.data.color_primary }}>
                            Horarios de atención:
                        </Typography>
                        <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.horarios }} />
                    </Box>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1, gap: '5px' }}>
                        <Typography component="span" variant="body2" color="primary">
                            Teléfonos:
                        </Typography>

                        {section.data.telefonos.map((tel: { numero: string; tipo: string }, index: number) => {
                            if (tel.tipo === "WhatsApp") {
                                return (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <WhatsAppContacto />
                                        <Link
                                            href={'http://wa.link/8hh696'}
                                            target="_blank"
                                            sx={{ textDecoration: "none" }}
                                        >
                                            {formatWithIMask(tel.numero, "phone")}
                                        </Link>
                                    </Box>
                                );
                            } else {
                                return (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <CellPhone />
                                        <Typography component="p" variant="body2">
                                            {formatWithIMask(tel.numero, "phone")}
                                        </Typography>
                                    </Box>
                                );
                            }
                        })}
                        
                    </Box>
                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1, gap: '5px' }}>
                        <Typography component="span" variant="body2" color="primary">
                            Email:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <EmailContacto />
                            <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.email }} />
                        </Box>
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