import React, { useEffect } from 'react';
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Button, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import TabPanel from '../../molecules/TabPanel/TabPanel';

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { ReadAllNotificaciones } from "../../../services/NotificacionesService";

import { useGetNotificaciones } from "../../../services/NotificacionesService";
import { CardNotification } from "../../molecules/CardNotification/CardNotification";
import { NOTIFICATIONS_ENDPOINTS } from "../../../types/endpoints";
import LoadingDialog from '../../molecules/Dialogs/LoadingDialog/LoadingDialog';


const tabList = [{ id: 0, label: 'Recientes' }, { id: 1, label: 'Antiguas' },]

const NotificacionesDesktop: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryClient = useQueryClient();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);
    const { data: notiData, isLoading } = useGetNotificaciones();
    const [recientes, setRecientes] = React.useState<any[]>([]);
    const [antiguas, setAntiguas] = React.useState<any[]>([]);
    const [loadingIds, setLoadingIds] = React.useState<Set<number>>(new Set());
    const [isOpenLoading, setIsOpenLoading] = React.useState(false);
    const [textoLoading, setTextoLoading] = React.useState("");
    const refetch = () => queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.key] })

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

    const handleReadALLNotifications = async () => {

        setIsOpenLoading(true);
        setTextoLoading("Cargando...");

        try {
            await createMutation.mutateAsync();
        } catch (error) {
            console.error(error);
        } finally {
            await refetch()
            setIsOpenLoading(false);
        }
    };

    const createMutation = useMutation({
        mutationFn: ReadAllNotificaciones,
    });

    const renderCardNotification = (item: any, i: number) => (
        <CardNotification
            key={i}
            item={item}
            index={i}
            loadingItems={loadingIds}
            setLoadingItems={setLoadingIds}
            setMarkedRead={() => refetch()}
        />
    );


    const notificaciones = () => {
        const totalNoLeidas = [...recientes, ...antiguas].filter(n => n.leida === 0).length;

        return isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: '20px' }}>
                <Typography component="h4" variant="h4">Nuevas</Typography>
                <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>
                    Tienes {totalNoLeidas} notificaciones no leídas
                </Typography>
                {
                    <>
                        {[...antiguas, ...recientes].map((item, i) => (
                            renderCardNotification(item, i)
                        ))}
                    </>

                }
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
                    <Button variant="contained" onClick={() => { handleReadALLNotifications() }}>Limpiar todas las notificaciones</Button>
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
                            : item.id === 0 ? <>
                                {recientes?.map((item, i) => (
                                    renderCardNotification(item, i)
                                ))}
                            </> : <>
                                {antiguas?.map((item, i) => (
                                    renderCardNotification(item, i)
                                ))}
                            </>
                        }
                    </TabPanel>
                ))}
                <LoadingDialog isOpen={isOpenLoading} Text={textoLoading} />
            </>
        );
    };

    return isLoading ? <LoadingCircular Text="Cargando Notificaciones" /> : notificaciones();

};

export default NotificacionesDesktop;