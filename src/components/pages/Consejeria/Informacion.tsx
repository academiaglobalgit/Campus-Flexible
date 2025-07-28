import React from 'react';
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Grid, styled } from "@mui/material";
import nosotros from "../../../assets/ILUSTRACION-SOMOS.png";
import { flexColumn, flexRows } from '@styles';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Estrategias, Alcance, Estres, Autocuidado, Gestion, Habitos } from "@iconsCustomizeds";
import theme from '../../../theme';

export const InformacionConsejeria: React.FC = () => {
    const Item = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'none',
        padding: theme.spacing(1),
        maxWidth: '486px',
        height: '144px'
    }));
    return (
        <>
            <Box sx={{ ...flexRows, flexDirection: 'row', gap: '20px' }}>
                <Box sx={{ ...flexColumn, gap: '5px', width: '586px' }}>
                    <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                        ¿Quiénes somos?
                    </Typography>
                    <Typography component="span" variant="body3" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'justify' }}>
                        Somos un grupo de profesionales del área de la salud mental, con amplia experiencia en el ámbito educativo, comprometidos con el bienestar y el desarrollo de nuestros estudiantes.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <Box component="img" src={nosotros} sx={{ width: '443px', height: '300px' }} />
                    </Box>
                </Box>

                <Box sx={{ ...flexColumn, gap: '5px', backgroundColor: '#F8F8F9', width: '586px' }} >

                    <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                        ¿Cómo podemos ayudarte?
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                            <Grid size={6}>
                                <Item>

                                    <DsSvgIcon component={Estres} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
                                    Estrés y
                                    Regulación
                                    Emocional
                                </Item>
                            </Grid>
                            <Grid size={6}>
                                <Item>
                                    <DsSvgIcon component={Gestion} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
                                    Gestión del
                                    tiempo</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item>
                                    <DsSvgIcon component={Autocuidado} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
                                    Autocuidado</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item>
                                    <DsSvgIcon component={Habitos} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
                                    Hábitos y
                                    motivación
                                </Item>
                            </Grid>
                            <Grid size={6}>
                                <Item>
                                    <DsSvgIcon component={Alcance} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />
                                    Alcance de
                                    metas</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item>

                                    <DsSvgIcon component={Estrategias} sxProps={{ width: '80px', height: '80px', mb: '10px' }} />

                                    Estrategias
                                    de estudio</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>

    )
};