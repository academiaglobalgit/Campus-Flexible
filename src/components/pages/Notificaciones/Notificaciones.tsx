import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import RichText from '../../molecules/RichText/RichText';
import { Box, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import Button from '../../atoms/Button/Button';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { flexColumn } from "@styles";
import { SalaConversacion as sala } from "@iconsCustomizeds";
import { ComentariosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import { EliminarComentarioDialog } from "../../molecules/Dialogs/EliminarComentarioDialog/EliminarComentarioForosDialog";
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';

import StarIcon from '@mui/icons-material/Star';


const SalaConversacion: React.FC = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const notificaciones = () => {

        return (
            <>

                <Box sx={isMobile ? { width: '100%' } : { width: '100%', mt: '20px' }}>
                    {
                        Array.from({ length: 3 }).map((_, i) => (
                            <Box
                                key={i}
                                sx={[{
                                    width: '100%',
                                    height: '138px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '30px',
                                    borderBottom: '1px solid #AAB1B6',
                                    backgroundColor: '#F6FAFD',
                                    cursor: 'pointer'
                                }, i === 0 && { borderTop: '1px solid #AAB1B6' }]}
                            >
                                <StarIcon />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <Typography component="span" variant="body2" color="primary" >Graduación Generación 2025</Typography>
                                        <Box sx={{ width: '8px', height: '8px', borderRadius: '100px', backgroundColor: '#1976D2' }}></Box>
                                    </Box>
                                    <Typography component="span" variant="body1">Acto académico de Graduación de Egresados el Miércoles 28 de junio del 2025</Typography>
                                    <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }} >Hace 1 hora</Typography>
                                </Box>
                            </Box>
                        ))
                    }

                </Box>
            </>
        )
    }

    return (

        <>
            {
                isMobile
                    ?
                    <>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', mt: '20px' }}>
                            <Typography component="h4" variant="h4">Nuevas</Typography>
                            <Typography component="span" variant="body1" sxProps={{ color: theme.palette.grey[100] }}>Tienes 2 notificaciones no leídas</Typography>
                        </Box>

                        {notificaciones()}

                    </>
                    :
                    <ContainerDesktop title={'Inbox (865)'} description={DescripcionesPantallas.SALA_CONVERSACION}>

                    </ContainerDesktop>
            }

        </>
    );
};

export default SalaConversacion;