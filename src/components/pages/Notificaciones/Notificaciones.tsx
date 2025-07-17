import React from 'react';
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

//import { useParams } from "react-router-dom";
import { useGetNotificaciones } from "../../../services/NotificacionesService";
import TabPanel from '../../molecules/TabPanel/TabPanel';

const SalaConversacion: React.FC = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);

    const { data: notiData, isLoading } = useGetNotificaciones();

    function iconsNoti(tipo: string) {
        let IconComponent: React.ElementType | undefined;

        if (tipo === 'anuncio') {
            IconComponent = NotificationsNoneIcon;
        } else if (tipo === 'tarea_nueva') {
            IconComponent = ThumbsUpDownOutlinedIcon;
        } else if (tipo === 'mensaje') {
            IconComponent = BusinessCenterOutlinedIcon;
        }

        return IconComponent ? <IconComponent color={"primary"} /> : null;
    }

    function tiempoTranscurrido(fechaISO: string): string {
        const fecha = new Date(fechaISO);
        const ahora = new Date();

        const segundos = Math.floor((ahora.getTime() - fecha.getTime()) / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const semanas = Math.floor(dias / 7);
        const meses = Math.floor(dias / 30);
        const años = Math.floor(dias / 365);

        if (segundos < 60) {
            return 'Hace un momento';
        } else if (minutos < 60) {
            return `Hace ${minutos} min`;
        } else if (horas < 24) {
            return `Hace ${horas} h`;
        } else if (dias < 7) {
            return `Hace ${dias} día${dias === 1 ? '' : 's'}`;
        } else if (semanas < 5) {
            return `Hace ${semanas} sem`;
        } else if (meses < 12) {
            return `Hace ${meses} mes${meses === 1 ? '' : 'es'}`;
        } else {
            return `Hace ${años} año${años === 1 ? '' : 's'}`;
        }
    }

    function dataNoti(data: any) {

        return (
            <Box sx={isMobile ? { width: '100%' } : { width: '100%', mt: '20px' }}>
                {
                    data.map((notis: any, i: number) => (
                        <Box
                            key={i}
                            sx={[{
                                width: '100%',
                                height: '138px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '30px',
                                cursor: 'pointer'
                            },
                            notis.leida == '1' ? { backgroundColor: '#F6FAFD', borderBottom: '1px solid #AAB1B6' } : { backgroundColor: '#ffffffff', borderBottom: '1px solid #ffffffff' },
                            i === 0 && { borderTop: '1px solid #AAB1B6' }]}
                        >
                            {iconsNoti(notis.tipo_notificacion)}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <Typography component="span" variant="body2" color="primary" >{notis.titulo}</Typography>

                                    {
                                        notis.leida == '1' ? <Box sx={{ width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2' }}></Box> : ''
                                    }

                                </Box>
                                <Typography component="span" variant="body1">{notis.mensaje}</Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }} >{tiempoTranscurrido(notis.fecha_envio)}</Typography>
                            </Box>
                        </Box>
                    ))
                }
            </Box >
        )
    }

    function obtenerNotificacionesAntiguasOrdenadas(data: any[]): any[] {
        const ahora = new Date();
        const unaSemanaEnMs = 7 * 24 * 60 * 60 * 1000;

        return data
            .filter(noti => {
                const fechaEnvio = new Date(noti.fecha_envio);
                return ahora.getTime() - fechaEnvio.getTime() > unaSemanaEnMs;
            })
            .sort((a, b) => {
                const fechaA = new Date(a.fecha_envio).getTime();
                const fechaB = new Date(b.fecha_envio).getTime();

                // Primero por fecha (más reciente primero)
                if (fechaB !== fechaA) {
                    return fechaB - fechaA;
                }

                // Luego por estado de lectura (leídos primero)
                return b.leida - a.leida;
            });
    }

    const notificaciones = (notiData: any) => {
        const totalNoLeidas = notiData.filter((n: { leida: number; }) => n.leida === 1).length;
        const notificacionesAntiguas = obtenerNotificacionesAntiguasOrdenadas(notiData);

        return (
            <>
                {
                    isMobile ? <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: '20px' }}>
                        <Typography component="h4" variant="h4">Nuevas</Typography>
                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>Tienes {totalNoLeidas} notificaciones no leídas</Typography>
                        {dataNoti(notiData)}
                    </Box>
                        : <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: '20px' }}>
                                <Typography component="h3" variant="h3" sxProps={{ color: theme.palette.primary.main }}>Inbox({totalNoLeidas})</Typography>
                                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>Tienes {totalNoLeidas} notificaciones no leídas</Typography>
                            </Box>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    aria-label="visible arrows tabs example"
                                    sx={{
                                        [`& .${tabsClasses.scrollButtons}`]: {
                                            '&.Mui-disabled': { opacity: 0.3 },
                                        },
                                    }}
                                >
                                    <Tab label="Recientes" key={0} sx={{ minWidth: '150px', padding: '0px' }} />
                                    <Tab label="Antiguas" key={1} sx={{ minWidth: '150px', padding: '0px' }} />
                                </Tabs>
                            </Box>

                            <TabPanel key={0} value={value} index={0}>
                                {
                                    isLoading ? <LoadingCircular Text="Cargando Notificaciones" /> : dataNoti(notiData)
                                }
                            </TabPanel>
                            <TabPanel key={1} value={value} index={1}>
                                {
                                    isLoading ? <LoadingCircular Text="Cargando Notificaciones" /> : dataNoti(notificacionesAntiguas)
                                }
                            </TabPanel>
                        </>
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
                        {notificaciones(notiData?.data)}
                    </>
                    :
                    <>
                        {notificaciones(notiData?.data)}
                    </>
            }
        </>
    );
};

export default SalaConversacion;