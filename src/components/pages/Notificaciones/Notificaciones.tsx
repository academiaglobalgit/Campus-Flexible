import React, { useEffect } from 'react';
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Button, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

//import { useParams } from "react-router-dom";
import { useGetNotificaciones } from "../../../services/NotificacionesService";
import TabPanel from '../../molecules/TabPanel/TabPanel';
import { flexColumn } from '@styles';

import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';

const tabList = [{id: 0, label: 'Recientes'},{id: 1, label: 'Antiguas'},]

const SalaConversacion: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);
    const { data: notiData, isLoading } = useGetNotificaciones();
    const [recientes, setRecientes] = React.useState<any[]>([]);
    const [antiguas, setAntiguas] = React.useState<any[]>([]);    

    useEffect(() => {
        if (notiData?.data) {
            const recientesFiltradas = ordenarNotificaciones(filtrarPorAntiguedad(notiData.data, true));
            const antiguasFiltradas = ordenarNotificaciones(filtrarPorAntiguedad(notiData.data, false));

            setRecientes(recientesFiltradas);
            setAntiguas(antiguasFiltradas);
        }
    }, [notiData]);

    const computedTabValue = React.useMemo(() => {
        if (recientes.length === 0 && antiguas.length === 0) return 0;
        if (antiguas.length > 0 && recientes.length === 0) return 1;
        return 0;
    }, [recientes, antiguas]);

    useEffect(() => {
        setValue(computedTabValue);
    }, [computedTabValue]);

    const iconsNoti = (tipo: string) => {
        switch (tipo) {
            case 'anuncio': return <NotificationsNoneIcon color="primary" />;
            case 'tarea_nueva': return <ThumbsUpDownOutlinedIcon color="primary" />;
            case 'mensaje': return <BusinessCenterOutlinedIcon color="primary" />;
            default: return null;
        }
    };

     const tiempoTranscurrido = (fechaISO: string): string => {
        const fecha = new Date(fechaISO);
        const ahora = new Date();
        const diff = Math.floor((ahora.getTime() - fecha.getTime()) / 1000);
        const min = Math.floor(diff / 60), h = Math.floor(min / 60), d = Math.floor(h / 24);
        const sem = Math.floor(d / 7), mes = Math.floor(d / 30), year = Math.floor(d / 365);

        if (diff < 60) return 'Hace un momento';
        if (min < 60) return `Hace ${min} min`;
        if (h < 24) return `Hace ${h} h`;
        if (d < 7) return `Hace ${d} día${d === 1 ? '' : 's'}`;
        if (sem < 5) return `Hace ${sem} sem`;
        if (mes < 12) return `Hace ${mes} mes${mes === 1 ? '' : 'es'}`;
        return `Hace ${year} año${year === 1 ? '' : 's'}`;
    };

    function dataNoti(data: any) {

        return (
            <Box sx={isMobile ? { width: '100%' } : { width: '100%', mt: '20px' }}>
                {
                    data.length > 0
                    ? 
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
                    :
                    <Box sx={{...flexColumn, minHeight: '250px' }}>
                        <NotificationsOffOutlinedIcon sx={{ fontSize: '3.5rem', color: theme.palette.grey[100] }} />
                        <Typography component='h3' variant='h3' color='disabled'>
                            No tienes notificaciones por ahora...
                        </Typography>
                    </Box>
                }
            </Box >
        )
    }

    const filtrarPorAntiguedad = (data: any[], reciente: boolean): any[] => {
        const ahora = Date.now();
        const unaSemanaEnMs = 7 * 24 * 60 * 60 * 1000;

        return data.filter(noti => {
            const fechaEnvio = new Date(noti.fecha_envio).getTime();
            return reciente
                ? ahora - fechaEnvio < unaSemanaEnMs
                : ahora - fechaEnvio >= unaSemanaEnMs;
        });
    };

    const ordenarNotificaciones = (data: any[]): any[] => {
        return [...data].sort((a, b) => {
            const fechaA = new Date(a.fecha_envio).getTime();
            const fechaB = new Date(b.fecha_envio).getTime();

            // Ordenar por fecha descendente (más reciente primero)
            if (fechaB !== fechaA) {
                return fechaB - fechaA;
            }

            // Luego por estado de lectura (leídos primero)
            return Number(b.leida) - Number(a.leida);
        });
    };


    const notificaciones = () => {
        const totalNoLeidas = recientes.filter(n => n.leida === 1).length;

        return isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: '20px' }}>
                <Typography component="h4" variant="h4">Nuevas</Typography>
                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                    Tienes {totalNoLeidas} notificaciones no leídas
                </Typography>
                {dataNoti([...recientes, ...antiguas])}
            </Box>
        ) : (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Typography component="h3" variant="h3" color="primary">
                            Inbox({totalNoLeidas})
                        </Typography>
                        <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                            Tienes {totalNoLeidas} notificaciones no leídas
                        </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => {}}>Limpiar todas las notificaciones</Button>
                </Box>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {tabList.map(item => (
                        <Tab key={item.id} label={item.label} sx={{ minWidth: '150px', padding: '0px' }} />
                    ))}
                </Tabs>

                {tabList.map(item => (
                    <TabPanel key={item.id} value={value} index={item.id}>
                        {isLoading
                            ? <LoadingCircular Text="Cargando Notificaciones" />
                            : dataNoti(item.id === 0 ? recientes : antiguas)}
                    </TabPanel>
                ))}
            </>
        );
    };

    return isLoading ? <LoadingCircular Text="Cargando Notificaciones" /> : notificaciones();
};

export default SalaConversacion;