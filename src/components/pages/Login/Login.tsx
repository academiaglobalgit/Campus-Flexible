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
import LogoLogin from "../../../assets/logo_ag_login.svg";
import ContactoDialog from '../../molecules/Dialogs/ContactoDialog/ContactoDialog';
import { useGetContacto } from '../../../services/ContactoService';
import { useGetManuales } from '../../../services/ManualesService';
import { loadConfig } from '../../../config/configStorage';

const LoginPage: React.FC = () => {
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

  React.useEffect(() => {
      loadConfig().then(cfg => {
          setConfig(cfg);
          switch (cfg?.data?.id_plan_estudio) {
            case 17: // Diplomado
              setBackgroundImage(HomeDiplomado);
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
  const { data: manual } = useGetManuales('Inducción','', config?.data?.id_plan_estudio);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isOpen, setIsOpen] = React.useState(false);

  const accessLogin = [
    { id: 'manual-induccion', icon: ManualInduccion, label: 'Manual de Inducción', action: () => window.open(manual?.url, '_blank'), isDisabled: manual?.url === null ? true : false },
    { id: 'faqs', icon: FAQS, label: 'Preguntas frecuentes', action: () => Navigation(AppRoutingPaths.PREGUNTAS_FRECUENTES), isDisabled: false },
    { id: 'contacto', icon: Contacto, label: 'Contacto', action: () => setIsOpen(true), isDisabled: isLoading },
    { id: 'ayuda', icon: Help, label: 'Ayuda', action: () => Navigation(AppRoutingPaths.AYUDA_EXTERIOR), isDisabled: false },
  ];

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
            <Grid size={{ md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
              <Box sx={{ paddingLeft: '24px', paddingRight: '24px', maxWidth: !showImage ? '469px' : undefined}}>
                <MobileLogin accessLogin={accessLogin} />
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
      <ContactoDialog isOpen={isOpen} close={() => setIsOpen(false)} data={contacto} />
    </>
  );
};

export default LoginPage;