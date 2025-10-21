import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { ManualInduccion, FAQS, Contacto, Help } from '../../../assets/icons';
import { MobileLogin } from './MobileLogin';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutingPaths } from '@constants';

import Home from "../../../assets/home.png";
import HomeDiplomado from "../../../assets/login_diplomado.png";
import LogoLogin from "../../../assets/logo_ag_login2.svg";
import ContactoDialog from '../../molecules/Dialogs/ContactoDialog/ContactoDialog';
import DiplomadoCoppel from "../../../assets/reestablecer_password.png";
import { useGetContacto } from '../../../services/ContactoService';
import { useGetManuales } from '../../../services/ManualesService';
import { loadConfig } from '../../../config/configStorage';
import { useQueryClient } from '@tanstack/react-query';
import { VideoBienvenidaDialog } from '../../molecules/Dialogs/VideoBienvenidaDialog/VideoBienvenidaDialog';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const is1366 = useMediaQuery('(width: 1366px)');
  const Navigation = useNavigate();

  const [backgroundImage, setBackgroundImage] = React.useState<string | undefined>(undefined);
  const [config, setConfig] = React.useState<any>(null);
  const [verLogo, setVerLogo] = React.useState<boolean>(false);
  const [isOpenVideo, setIsOpenVideo] = React.useState(false);
  const [tipoVideos, setTipoVideo] = React.useState(1);
  const [urlVideo, setUrlVideo] = React.useState("");
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
          setVerLogo(true);
          break;
        case 19: // Diplomado
          setBackgroundImage(DiplomadoCoppel);
          setImgSettings({ width: '100%', height: '100%', objectFit: 'cover' });
          setVerLogo(true);
          break;
        default:
          setBackgroundImage(Home);
          break;
      }
    });
  }, []);

  const { data: contacto, isLoading } = useGetContacto(config?.data?.id_plan_estudio);
  const { data: manual } = useGetManuales('Inducción', '', config?.data?.id_plan_estudio);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isOpen, setIsOpen] = React.useState(false);

  const accessLogin = [
    {
      id: 'manual-induccion', icon: ManualInduccion, label: 'Inducción', action: () => {
        setUrlVideo('<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1126642176?h=f8faae23b6&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Inducción a la plataforma del Diplomado en Inteligencia Artificial, Liderazgo y Cultura Digital"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>')
        setIsOpenVideo(true)
        setIsOpenVideo(true)
        setTipoVideo(1)
      }, isDisabled: manual?.url === null ? true : false
    },
    { id: 'faqs', icon: FAQS, label: 'Preguntas frecuentes', action: () => Navigation(AppRoutingPaths.PREGUNTAS_FRECUENTES), isDisabled: false },
    { id: 'contacto', icon: Contacto, label: 'Contacto', action: () => setIsOpen(true), isDisabled: isLoading },
    { id: 'ayuda', icon: Help, label: 'Ayuda', action: () => Navigation(AppRoutingPaths.AYUDA_EXTERIOR), isDisabled: false },
  ];

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