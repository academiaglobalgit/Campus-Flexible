import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import { Box, Grid, docked, styled, useMediaQuery, useTheme } from "@mui/material";
import nosotros from "../../../assets/ILUSTRACION-SOMOS.png";
import btnEstres from "../../../assets/BOTON-ESTRES.png";
import btnGestion from "../../../assets/BOTON-GESTION.png";
import btnAuto from "../../../assets/BOTON-AUTOCUIDADO.png";
import btnHabitos from "../../../assets/BOTON-HABITOS.png";
import btnAlcance from "../../../assets/BOTON-ALCANCE.png";
import btnEstrategias from "../../../assets/BOTON-ESTRATEGIAS.png";

const ConsejeriaNosotros: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const Item = styled(docked)(({ theme }) => ({
        backgroundColor: '#fff',
        padding: theme.spacing(1),
        maxWidth: '200px',
        height: '210px',
        textAlign: 'center',
        
    }));


    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />

                        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <Box component="img" src={nosotros} sx={{ width: '100%' }} />
                        </Box>

                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                            ¿Quiénes somos?
                        </Typography>
                        <Typography component="span" variant="body3" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'justify' }}>
                            Somos un grupo de profesionales del área de la salud mental, con amplia experiencia en el ámbito educativo, comprometidos con el bienestar y el desarrollo de nuestros estudiantes.
                        </Typography>

                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                            ¿Cómo podemos ayudarte?
                        </Typography>

                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid size={4}>
                                    <Item>

                                        <Box component="img" src={btnEstres} sx={{ width: '100%' }} />
                                        Estrés y
                                        Regulación
                                        Emocional
                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Box component="img" src={btnGestion} sx={{ width: '100%' }} />
                                        Gestión del
                                        tiempo</Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Box component="img" src={btnAuto} sx={{ width: '100%' }} />
                                        Autocuidado</Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Box component="img" src={btnHabitos} sx={{ width: '100%' }} />
                                        Hábitos y
                                        motivación
                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Box component="img" src={btnAlcance} sx={{ width: '100%' }} />
                                        Alcance de
                                        metas</Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item>
                                        <Box component="img" src={btnEstrategias} sx={{ width: '100%' }} />
                                        Estrategias
                                        de estudio</Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                    :
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                        <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                            Esta Sala de Conversación es un espacio que ponemos a disposición de todas y todos nuestros estudiantes, con el propósito de que entables diálogos productivos, generen redes de contactos y amigos, compartan información, experiencias y aporten ideas que enriquezcan sus conocimientos.
                        </Typography>
                    </>
            }
        </>

    );
};

export default ConsejeriaNosotros;