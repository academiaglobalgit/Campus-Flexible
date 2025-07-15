import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import imgConsejeria from "../../../assets/consejeriaEstudiantil.png";
import Button from '../../atoms/Button/Button';



const Consejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />

                        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <Box component="img" src={imgConsejeria} />
                        </Box>

                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                            Bienvenido (a)                        </Typography>
                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mb: '20px', textAlign: 'center' }}>
                            ¡Estamos para apoyarte!
                        </Typography>



                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20PX' }}>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { }}
                            >
                                Nosotros
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { }}
                            >
                                Encuestas
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { }}
                            >
                                Blog
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { }}
                            >
                                Recursos
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => { }}
                                icon={<ArrowRightAltIcon />}
                                iconPosition={'end'}
                            >
                                Agenda una cita
                            </Button>
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

export default Consejeria;