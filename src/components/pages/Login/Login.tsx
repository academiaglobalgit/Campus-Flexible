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
import ContactoDialog from '../../molecules/ContactoDialog/ContactoDialog';
import { useGetContacto } from '../../../services/ContactoService';
import { useGetManuales } from '../../../services/ManualesService';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const Navigation = useNavigate();
  const { data: contacto } = useGetContacto(1);
  const { data: manual } = useGetManuales('Inducción','',1);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isOpen, setIsOpen] = React.useState(false);

  const accessLogin = [
    {
      id: 'manual-induccion', icon: ManualInduccion, label: 'Manual de Inducción', action: () => window.open(manual?.url, '_blank')
    },
    { id: 'faqs', icon: FAQS, label: 'Preguntas frecuentes', action: () => Navigation(AppRoutingPaths.PREGUNTAS_FRECUENTES) },
    { id: 'contacto', icon: Contacto, label: 'Contacto', action: () => setIsOpen(true) },
    { id: 'ayuda', icon: Help, label: 'Ayuda', action: () => Navigation(AppRoutingPaths.AYUDA_EXTERIOR) },
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
            <Grid size={{ md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ paddingLeft: '24px', paddingRight: '24px', maxWidth: !showImage ? '469px' : undefined }}>
                <MobileLogin accessLogin={accessLogin} />
              </Box>
            </Grid>
            {
              !showImage &&
              <Grid size={{ md: 8 }} >
                <Box
                  component="img"
                  src={Home}
                  alt="Login"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            }
          </Grid>
      }
      <ContactoDialog isOpen={isOpen} close={() => setIsOpen(false)} data={contacto} />
    </>
  );
};

export default LoginPage;