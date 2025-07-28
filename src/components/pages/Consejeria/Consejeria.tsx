import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { AppRoutingPaths, TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import imgConsejeria from "../../../assets/consejeriaEstudiantil.png";
import Button from '../../atoms/Button/Button';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { useNavigate } from "react-router-dom";
const Consejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const seccionConsejeria = () => {

        return (
            <>
                <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' } : { display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', gap: '75px' }}>

                    <Box sx={isMobile ? { width: '100%' } : { display: 'flex', flexDirection: 'column', gap: '20PX', width: '50%' }}>
                        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <Box component="img" src={imgConsejeria} sx={{ width: '624px', height: '507px' }} />
                        </Box>
                    </Box>

                    <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', gap: '20PX', width: '100%' } : { display: 'flex', flexDirection: 'column', gap: '20PX', width: '50%' }}>
                        <Typography component="h2" variant="h2" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px', textAlign: 'center' }}>
                            Bienvenido (a)                        </Typography>
                        <Typography component="h2" variant="h2" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mb: '20px', textAlign: 'center' }}>
                            ¡Estamos para apoyarte!
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                                navigate(AppRoutingPaths.CONSEJERIAINFO);
                            }}
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
                            onClick={() => {
                                navigate(AppRoutingPaths.VIDEOTECA_DETALLE);
                            }}
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
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                        {seccionConsejeria()}

                    </>
                    :
                    <>

                        <ContainerDesktop title={TitleScreen.CONSEJERIA} >
                            {seccionConsejeria()}
                        </ContainerDesktop>

                    </>
            }
        </>


    );





};

export default Consejeria;