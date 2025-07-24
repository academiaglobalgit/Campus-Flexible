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
    const [value, setValue] = React.useState(0);
    const { data: interno, isLoading } = useContactoInterno();

    const seccionesMap = new Map();

    if (interno?.data) {

        const images = {
            "Admisiones": CampusDigital,
            "Académica": ServiciosEscolares,
            "Prospectos": Prospectos
        }

        interno.data.forEach((item: { nombre_seccion: any; id_tipo_contacto: any; descripcion_seccion: any; valor_contacto: any; }) => {
            if (!seccionesMap.has(item.nombre_seccion)) {
                seccionesMap.set(item.nombre_seccion, {
                    label: item.nombre_seccion,
                    value: item.id_tipo_contacto,
                    imgSrc: images[item.nombre_seccion],
                    data: {
                        description: item.descripcion_seccion,
                        horarios: null,
                        telefonos: null,
                        email: null,
                    },
                });
            }

            const seccion = seccionesMap.get(item.nombre_seccion);

            switch (item.id_tipo_contacto) {
                case 1:
                    seccion.data.telefonos = seccion.data.telefonos
                        ? `${seccion.data.telefonos}/${item.valor_contacto}`
                        : item.valor_contacto;
                    break;
                case 2:
                    seccion.data.email = item.valor_contacto;
                    break;
                case 3:
                    seccion.data.horarios = item.valor_contacto;
                    break;
            }
        });
    }

    const resultadoFinal = Array.from(seccionesMap.values());

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Image = () => {
        const src = resultadoFinal[value].imgSrc;

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
                        resultadoFinal.map((section, index) => (
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
                resultadoFinal.map((section, index) => (
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

    const ConstentsDesktop = () => (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '260px', gap: '52px' }}>
            {
                resultadoFinal.map((section, index) => (

                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', width: '260px', height: '100%', gap: '55px' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '260px', minHeight: '285px', objectFit: 'cover' }}>

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
                            isLoading ? <LoadingCircular Text="Cargando contactos" /> :
                                <ConstentsDesktop />
                        }
                    </ContainerDesktop>
            }

        </>
    );
}

export default ContactoInterno;