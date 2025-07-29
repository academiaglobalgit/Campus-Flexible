import React from 'react';
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import nosotros from "../../../assets/ILUSTRACION-SOMOS.png";
import { flexColumn } from '@styles';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Estrategias, Alcance, Estres, Autocuidado, Gestion, Habitos } from "@iconsCustomizeds";

export const InformacionConsejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const HelpsArraySection = [
        {label: 'Estrés y Regulación Emocional', icon: Estres},
        {label: 'Gestión del tiempo', icon: Gestion},
        {label: 'Autocuidado', icon: Autocuidado},
        {label: 'Hábitos y motivación', icon: Habitos},
        {label: 'Alcance de metas', icon: Alcance},
        {label: 'Estrategias de estudio', icon: Estrategias},
    ];

    const HelpsSection = (item: any) => (
        <Box sx={{...flexColumn}}>
            <DsSvgIcon component={item.icon} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
            <Typography component='span' variant='body2'>{item.label}</Typography>
        </Box>
    )

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
                <Box sx={{ ...flexColumn, alignItems: 'flex-start', gap: '5px', width: '100%' }}>
                    <Typography component={!isMobile ? "h2" : "h4"} variant={!isMobile ? "h2" : "h4"} color='primary' sxProps={{ mt: '32px' }}>
                        ¿Quiénes somos?
                    </Typography>
                    <Typography component="span" variant={!isMobile ? "body2" : "body1"} sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'justify' }}>
                        Somos un grupo de profesionales del área de la salud mental, con amplia experiencia en el ámbito educativo, comprometidos con el bienestar y el desarrollo de nuestros estudiantes.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <Box component="img" src={nosotros} sx={{ width: '100%' }} />
                    </Box>
                </Box>
            </Grid>
            <Grid 
                size={{xs: 12, md: 6}}
                sx={[
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    betweenDevice && {width: '100%'}
                ]}
            >
                <Box sx={{ ...flexColumn, gap: '5px', backgroundColor: '#F8F8F9', width: '100%', borderRadius: '10px', padding: '30px' }} >

                    <Typography component="h4" variant="h4" color='primary'>
                        ¿Cómo podemos ayudarte?
                    </Typography>

                    <Box sx={{ width: '100%', pt: 2 }}>
                        <Grid container spacing={2} sx={{mb: 2}}>
                            {
                                HelpsArraySection.map((item, i) => (
                                    <Grid size={{ xs: 6, sm: 6 }} key={i}>
                                        {HelpsSection(item)}
                                    </Grid>
                                ))
                            }
                        </Grid>                        
                    </Box>
                </Box>
            </Grid>           
        </Grid>
    )
};