import {
  Container,
  DialogActions,
  DialogContent,
  useMediaQuery, 
  useTheme 
} from '@mui/material';

import { ManualInduccion, FAQS, Contacto, Help } from '../../../assets/icons';
import { MobileLogin } from './MobileLogin';
// import DesktopLogin from './DesktopLogin';
import React from 'react';
import { Dialog } from '../../atoms/Dialog/Dialog';
import Button from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Typography } from '../../atoms/Typography/Typography';

import contactanos from '../../../assets/contactanos.png';
import { useNavigate } from 'react-router-dom';
import { AppRoutingPaths } from '@constants';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = React.useState(false);
  const Navigation = useNavigate();

  const accessLogin = [
    { id: 'manual-induccion', icon: ManualInduccion, label: 'Manual de Inducción', action: () => console.log('Manual de Inducción') },
    { id: 'faqs', icon: FAQS, label: 'Preguntas frecuentes', action: () => Navigation(AppRoutingPaths.PREGUNTAS_FRECUENTES) },
    { id: 'contacto', icon: Contacto, label: 'Contacto', action: () => setIsOpen(true) },
    { id: 'ayuda', icon: Help, label: 'Ayuda', action: ()=> Navigation(AppRoutingPaths.AYUDA_EXTERIOR) },
  ];

  return (
    // maxWidth={isMobile ? 'xs' : 'lg'}
    <Container component="main" maxWidth='xs'>
      {
        isMobile 
        ?
          <MobileLogin accessLogin={accessLogin} />
        : 
        <MobileLogin accessLogin={accessLogin} />
          // <DesktopLogin />
      }
      <Dialog isOpen={isOpen} >
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', paddingBottom: '12px' }}>
            <Avatar src={contactanos} width={150} height={150} />
            <Typography 
                color='primary'
                component="h3"
                variant='h3'
            >
              CONTACTO
            </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <Typography component="h4" variant='h4'>
                Teléfonos
              </Typography>
              <Typography component="p" variant='body2'>            
                (667) 712 41 72<br />
                (667) 176 09 85
              </Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography component="h4" variant='h4'>
                Correo Electrónico
              </Typography>
              <Typography component="p" variant='body2'>            
                daniela.cazares@umi.edu.mx
              </Typography>
            </div>
          </div>
         
         
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '20px' }}>
          <Button 
              fullWidth
              onClick={() => setIsOpen(false)}
          >
              CERRAR
          </Button>
        </DialogActions>
      </Dialog> 
    </Container> 
  );
};

export default LoginPage;