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

const ContactoInterno: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const TabsSections = [
        {
            label: "Campus Digital",
            value: 0,
            imgSrc: CampusDigital,
            data: {
                description: "Resuelve tus dudas académicas y administrativas aquí.",
                horarios: "Lunes a viernes de 08:00 a 20:00<br />Sábados de 10:00 a 14:00",
                telefonos: "55 5259 8120/55 5259 8121",
                email: "contacto@academiaglobal.mx"
            }
        },
        {
            label: "Servicios Escolares",
            value: 1,
            imgSrc: ServiciosEscolares,
            data: {
                description: "En caso de dudas sobre Constancia de estudios, kardex, credenciales, información de fecha de certificado y requisitos, pagos (certificados, credenciales, kardex, credenciales)",
                horarios: "Lunes a viernes de 08:00 a 20:00<br />Sábados de 10:00 a 14:00",
                telefonos: "55 5259 8120/55 5259 8121",
                email: "contacto@academiaglobal.mx"
            }
        },
        {
            label: "Prospectos",
            value: 2,
            imgSrc: Prospectos,
            data: {
                description: "¿Dudas sobre el campus, exámenes, inscripción, estatus o fechas importantes? Aquí encuentras la información.",
                horarios: "Lunes a viernes de 08:00 a 20:00<br />Sábados de 10:00 a 14:00",
                telefonos: "55 5259 8120/55 5259 8121",
                email: "contacto@academiaglobal.mx"
            }
        },
        {
            label: "Asesorias",
            value: 3,
            imgSrc: Asesorias,
            data: {
                description: "¿Dudas sobre constancias, certificados, credenciales, kardex o pagos? Encuentra aquí la información.            ",
                horarios: "Lunes a Viernes de 09:00 a 18:00 Horas",
                telefonos: "55 5259 8120/55 5259 8121",
                email: "contacto@academiaglobal.mx"
            }
        }
    ];

    const Image = () => {
        const src = TabsSections[value].imgSrc;

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
                        TabsSections.map((section, index) => (
                            <Tab
                                key={index}
                                label={section.label}
                                value={section.value}
                                sx={{ minWidth: '150px', padding: '0px' }}
                            />
                        ))
                    }
                </Tabs>
            </Box>
            {
                TabsSections.map((section, index) => (
                    <TabPanel key={index} value={value} index={section.value}>
                        <Box sx={{ mt: 5 }}>
                            <Divider textAlign="center">
                                <Typography component="span" variant="subtitle1" color="primary" sx={{ fontWeight: 400, color: "#005A9BCC" }}>{section.label}</Typography>
                            </Divider>
                            <Box sx={{ ...flexColumn, alignItems: 'flex-start', gap: '20px', mt: 2, mb: 2 }}>
                                <Typography component="span" variant="body1">
                                    {section.data.description}
                                </Typography>
                                <Box sx={{ ...flexColumn, alignItems: 'flex-start', mt: 1, gap: '10px' }}>
                                    <Box sx={{ ...flexColumn, alignItems: 'flex-start', mb: 1 }}>
                                        <Typography component="span" variant="body2" color="primary">
                                            Horarios:
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
                    </TabPanel>
                ))
            }
        </>
    );

    return (
        <>
            {isMobile ?
                <>
                    <Contents />
                </>
                :
                <ContainerDesktop title="Contacto de tu plataforma">

                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '260px', gap: '52px' }}>
                        {
                            TabsSections.map((section, index) => (

                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '55px' }}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '260px', minHeight: '350px', objectFit: 'cover' }}>

                                        <Box component="img" src={section.imgSrc} sx={{ width: '260px', height: '138px' }}>
                                        </Box>
                                        <Divider textAlign="center">
                                            <Typography component="span" variant="subtitle1" color="primary" sx={{ fontWeight: 400, color: "#005A9BCC" }}>
                                                {section.label}
                                            </Typography>
                                        </Divider>
                                        <Typography component="span" variant="subtitle2" color="primary" sx={{ fontWeight: 400, color: theme.palette.text.primary }}>
                                            {section.data.description}
                                        </Typography>

                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '260px', height: '1000%', gap: '17px' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography component="h5" variant="h5" color="primary" sx={{ fontWeight: 400, color: theme.palette.primary.light }}>
                                                Horarios de atención:
                                            </Typography>
                                            <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.horarios }} />


                                            <Typography component="span" variant="subtitle2" color="primary" sx={{ fontWeight: 400, color: theme.palette.primary.light }}>
                                                Tiempo del Centro.
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                            <Typography component="span" variant="subtitle2" color="primary" sx={{ fontWeight: 400, color: theme.palette.primary.light }}>
                                                Teléfonos:
                                            </Typography>
                                            <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.telefonos }} />

                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography component="span" variant="subtitle2" color="primary" sx={{ fontWeight: 400, color: theme.palette.primary.light }}>
                                                Correo:
                                            </Typography>

                                            <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: section.data.email }} />
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </ContainerDesktop>
            }
        </>
    );
}

export default ContactoInterno;