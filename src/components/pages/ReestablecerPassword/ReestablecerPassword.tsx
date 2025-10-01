import {
    Box,
    Container,
    Grid,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { MobileResetPass } from './MobileResetPass';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutingPaths } from '@constants';
import LogoLogin from "../../../assets/logo_ag_login2.svg";
import Home from "../../../assets/home.png";
import HomeDiplomado from "../../../assets/reestablecer_password.png";
import { loadConfig } from '../../../config/configStorage';
import { useQueryClient } from '@tanstack/react-query';



const PasswordReset: React.FC = () => {
    const theme = useTheme();
    const Navigation = useNavigate();

    const [backgroundImage, setBackgroundImage] = React.useState<string | undefined>(undefined);
    const [config, setConfig] = React.useState<any>(null);
    const [verLogo, setVerLogo] = React.useState<boolean>(false);

    const [imgSettings, setImgSettings] = React.useState<any>({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

    const queryClient = useQueryClient();

    React.useEffect(() => {
        queryClient.clear();
    }, [queryClient]);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
            switch (cfg?.data?.id_plan_estudio) {
                case 17: // Diplomado
                    setBackgroundImage(HomeDiplomado);
                    setImgSettings({ width: '100%', height: '100%', objectFit: 'cover' });
                    setVerLogo(false);
                    break;
                default:
                    setBackgroundImage(Home);
                    break;
            }
        });
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <>
            {
                isMobile
                    ?
                    <Container component="main">
                        <MobileResetPass/>
                    </Container>
                    :
                    <Grid container size={{ md: 12 }} sx={{ height: '100vh' }}>
                        <Grid size={{ md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Box sx={{ paddingLeft: '24px', paddingRight: '24px', maxWidth: !showImage ? '469px' : undefined }}>
                                <MobileResetPass/>
                            </Box>
                        </Grid>
                        {
                            !showImage &&
                            <Grid size={{ md: 8 }} >
                                <Box
                                    sx={{
                                        ...imgSettings,
                                        backgroundImage: `url(${backgroundImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {verLogo && (
                                        <Box
                                            component="img"
                                            src={LogoLogin}
                                            alt="Login"
                                            sx={{ position: 'absolute', bottom: 47, left: 43, width: '294px' }}
                                        />
                                    )}
                                </Box>

                            </Grid>
                        }
                    </Grid>
            }
        </>
    );
};

export default PasswordReset;
