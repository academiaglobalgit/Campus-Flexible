import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { AppRoutingPaths, TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import imgConsejeria from "../../../assets/consejeriaEstudiantil.png";
import Button from '../../atoms/Button/Button';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { useNavigate } from "react-router-dom";
import { flexColumn, flexRows } from '@styles';
import { setTabSelected } from '../../../hooks/useLocalStorage';

const Consejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const navigate = useNavigate();

    const Buttons = [
        { label: 'Nosotros', url: AppRoutingPaths.CONSEJERIAINFO, tabIndex: 0 },
        { label: 'Encuestas', url: '' },
        { label: 'Blog', url: AppRoutingPaths.CONSEJERIAINFO, tabIndex: 1 },
        { label: 'Recursos', url: '' },
        { label: 'Agenda una cita', url: AppRoutingPaths.CONSEJERIAINFO, tabIndex: 2 },
    ];

    const handleAction = (item: any) => {
        setTabSelected({ tab: 'consejeria-info', index: item.tabIndex });
        navigate(item.url);
    }

    const BienvenidoText = () => {
        const fontSize = isMobile ? 'h4' : 'h2';
        return (
            <Box>
                <Typography component={fontSize} variant={fontSize} color='primary' sxProps={{ mt: '32px', textAlign: 'center' }}>
                    Bienvenido (a)
                </Typography>
                <Typography component={fontSize} variant={fontSize} color='primary' sxProps={{ mb: '20px', textAlign: 'center' }}>
                    ¡Estamos para apoyarte!
                </Typography>
            </Box>
        )
    }

    const ButtonSection = () => {
        return (
            <>
                {
                    Buttons.map((item, i) => {

                        if (i === 4) {
                            return (<Button key={i}
                                fullWidth
                                variant="contained"
                                onClick={() => handleAction(item)}
                                icon={<ArrowRightAltIcon />}
                                iconPosition={'end'}
                            >
                                {item.label}
                            </Button>)
                        } else {
                            return (
                                <Button
                                    key={i}
                                    fullWidth
                                    variant="outlined"
                                    disabled={item.url?.length === 0}
                                    onClick={() => handleAction(item)}
                                >
                                    {item.label}
                                </Button>
                            )
                        }
                    })
                }
            </>
        )
    }

    const imagen = () => (
        <Box sx={{ ...flexRows }}>
            <Box
                component="img"
                src={imgConsejeria}
                sx={[
                    isMobile && { width: '100%', maxWidth: '100%' },
                    !isMobile && { width: '100%', height: '500px' }
                ]}
            />
        </Box>
    )

    return (
        isMobile
            ?
            <>
                <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                <Box sx={{ ...flexColumn, width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                src={imgConsejeria}
                                sx={[
                                    !isMobile && { width: '624px', height: '507px' }
                                ]}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', pb: 3 }}>
                        {BienvenidoText()}
                        {ButtonSection()}
                    </Box>
                </Box>
            </>
            :
            <>
                <ContainerDesktop title={TitleScreen.CONSEJERIA} >
                    <Grid container spacing={2}>
                        <Grid
                            size={{ md: 6 }}
                            order={{ xs: 2, md: 1 }}
                            sx={[
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                betweenDevice && { width: '100%' }
                            ]}
                        >
                            <Box sx={{ ...flexColumn, gap: '20px', width: '100%' }}>
                                {BienvenidoText()}
                                {ButtonSection()}
                            </Box>
                        </Grid>
                        <Grid
                            size={{ md: 6 }}
                            order={{ xs: 1, md: 2 }}
                            sx={[
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                betweenDevice && { width: '100%' }
                            ]}
                        >
                            <Box sx={{ width: '100%', maxWidth: '600px' }}>
                                {imagen()}
                            </Box>
                        </Grid>
                    </Grid>
                </ContainerDesktop>
            </>
    );
};

export default Consejeria;