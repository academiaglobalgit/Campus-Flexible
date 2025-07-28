import React from 'react';

import { Typography } from "../../atoms/Typography/Typography";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import { flexColumn, flexRows } from '@styles';

export const BlogConsejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    function BasicTable() {
        return (

            <Box sx={{ ...flexColumn, gap: '20px' }}>

                <Box sx={{ ...flexColumn, gap: '20px', width: '100%' }}>
                    <Divider textAlign="center" sx={{ width: '100%' }}>
                        <Typography component="h4" variant="h4" color="primary" >AGENDA</Typography>
                    </Divider>
                    <Box sx={{ ...flexRows, flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: '48px', backgroundColor: theme.palette.primary.main }} >
                        <Typography component="span" variant="body2" sxProps={{ color: '#ffffff' }}>Evento</Typography>
                        <Typography component="span" variant="body2" sxProps={{ color: '#ffffff' }}>Fecha</Typography>
                    </Box>
                    <Box sx={{ ...flexRows, flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <Typography component="span" variant="body2" color="text.primary">Próximamente</Typography>
                        <Typography component="span" variant="body2" color="text.primary">2025-02-05</Typography>
                    </Box>
                </Box>
                <Box sx={{ ...flexColumn, gap: '20px', width: '100%', justifyContent: 'flex-start' }}>

                    <Divider textAlign="center" sx={{ width: '100%' }}>
                        <Typography component="h4" variant="h4" color="primary" >Blog</Typography>
                    </Divider>


                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', justifyContent: 'flex-start' }}>

                        <Typography component="span" variant="subtitle1" color="text" >COMUNICACIÓN ASERTIVA: </Typography>
                        <Typography component="span" variant="subtitle1" color="text" >CLAVE PARA UN CLIMA LABORAL POSITIVO </Typography>



                    </Box>
                </Box>
            </Box>
        );
    }


    return (
        <>
            {
                isMobile
                    ?
                    <>
                        {BasicTable()}
                    </>
                    :
                    <>
                        {BasicTable()}
                    </>
            }
        </>
    );
};