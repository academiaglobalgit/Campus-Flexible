import React from 'react';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ManualInduccion, FAQS, Contacto, Help } from '../../../assets/icons';
import { MobileLogin } from './MobileLogin';
import { useNavigate } from 'react-router-dom';
import { AppRoutingPaths } from '@constants';

import Home from "../../../assets/home.png";
import LogoLogin from "../../../assets/logo_ag_login2.svg";
import ContactoDialog from '../../molecules/Dialogs/ContactoDialog/ContactoDialog';
import { useGetContacto } from '../../../services/ContactoService';
import { useGetManuales } from '../../../services/ManualesService';
import { loadConfig } from '../../../config/configStorage';
import { useQueryClient } from '@tanstack/react-query';
import { VideoBienvenidaDialog } from '../../molecules/Dialogs/VideoBienvenidaDialog/VideoBienvenidaDialog';
import { usePlanEstudio } from '../../../context/PlanEstudioContext';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const { config: configPlanEstudio } = usePlanEstudio();
  
  const is1366 = useMediaQuery('(width: 1366px)');
  const Navigation = useNavigate();

  const [backgroundImage, setBackgroundImage] = React.useState<string | undefined>(undefined);
  const [config, setConfig] = React.useState<any>(null);
  const [verLogo, setVerLogo] = React.useState<boolean>(false);
  const [isOpenVideo, setIsOpenVideo] = React.useState(false);
  const [tipoVideos, setTipoVideo] = React.useState(1);
  const [urlVideo, setUrlVideo] = React.useState("");

  const imgSettings = { width: '100%', height: '100%', objectFit: 'cover', };

  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.clear();

    loadConfig().then(cfg => {
      setConfig(cfg);
      const configPlan = configPlanEstudio?.getConfiguracionLogin({background: Home, verLogo: false});
      if(configPlan){
          setBackgroundImage(configPlan?.background);
          setVerLogo(configPlan?.verLogo);
      }
    });
  }, [queryClient, configPlanEstudio]);

  const { data: contacto, isLoading: isLoadingContacto } = useGetContacto(config?.data?.id_plan_estudio);
  const { data: manual, isLoading: isLoadingInduccion } = useGetManuales('Inducción', '', config?.data?.id_plan_estudio);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isOpen, setIsOpen] = React.useState(false);

  const access = [
    {
      id: 'manual-induccion', 
      icon: ManualInduccion, 
      label: 'Inducción', 
      action: () => handleVideoInduccion(''), 
      isDisabled: true
    },
    { id: 'faqs', icon: FAQS, label: 'Preguntas frecuentes', action: () => Navigation(AppRoutingPaths.PREGUNTAS_FRECUENTES), isDisabled: false },
    { id: 'contacto', icon: Contacto, label: 'Contacto', action: () => setIsOpen(true), isDisabled: true },
    { id: 'ayuda', icon: Help, label: 'Ayuda', action: () => Navigation(AppRoutingPaths.AYUDA_EXTERIOR), isDisabled: false },
  ];

  const [accessLogin, setAccessLogin] = React.useState<Array<any>>(access);

  const handleVideoInduccion = (url: string) => {
    setUrlVideo(url);
    setIsOpenVideo(true);
    setTipoVideo(1);
  }


  React.useEffect(() => {
    if (!isLoadingContacto && !isLoadingInduccion) {
      setAccessLogin(prev => 
        prev.map(item => {
          if (item.id === 'manual-induccion') {
            return {
              ...item,
              action: () => handleVideoInduccion(manual?.url ?? ''),
              isDisabled: !manual?.url // false si hay URL, true si no hay
            };
          }
          if (item.id === 'contacto') {
            return {
              ...item,
              isDisabled: false
            };
          }
          return item;
        })
      );
    }
  }, [isLoadingContacto, isLoadingInduccion, manual]);

  const handleCerrarVideo = async () => {
    setIsOpenVideo(false);
  };

  return (
    <>
      {
        isMobile
          ?
          <Container component="main">
            <MobileLogin accessLogin={accessLogin} />
          </Container>
          :
          <Grid container size={{ md: 12 }} sx={{ height: '100vh' }}>
            <Grid 
                size={{ md: !is1366 ? 4 : 3 }} 
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
              <Box sx={{ paddingLeft: '24px', paddingRight: '24px', maxWidth: !showImage ? '469px' : undefined }}>
                <MobileLogin accessLogin={accessLogin} />
              </Box>
            </Grid>
            {
              !showImage &&
              <Grid size={{ md: !is1366 ? 8 : 9 }} >
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
      <ContactoDialog isOpen={isOpen} close={() => setIsOpen(false)} data={contacto} />
      <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => handleCerrarVideo()} urlVideo={urlVideo} tipo={tipoVideos} />
    </>
  );
};

export default LoginPage;