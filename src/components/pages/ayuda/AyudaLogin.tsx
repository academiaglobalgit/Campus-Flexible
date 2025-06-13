import { Box, Container, TextareaAutosize, Typography } from "@mui/material";

import { InputText } from '../../atoms/Input/Input';
import { LogoBox } from '../../atoms/logo/LogoBox';
import { Footer } from '../../atoms/Footer/Footer';
import Button from '../../atoms/Button/Button';
import Logo from '../../../assets/logo_ag.svg';
import { TopBar } from "../../molecules/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, TitleScreen } from "@constants";

const AyudaLogin: React.FC = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(AppRoutingPaths.HOME);
  return (
    // maxWidth={isMobile ? 'xs' : 'lg'}

    <Container component="main" maxWidth='xs'>
      <TopBar isExternal={true} onBack={onBack} titleScreen={TitleScreen.AYUDA} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          mb: 2,
        }}
      ></Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoBox
          src={Logo}
          alt="AG College Logo"
          sx={{
            mt: '49px'
          }}
        />

        <Typography
          color='primary.main'
          component="h4"
          variant='h4'
          sx={{
            mt: '40px',
            mb: '40px',
            textAlign: 'center',
            textWrap: 'balance'
          }}
        >
          Déjanos tu mensaje y nos contactaremos a la brevedad posible.
        </Typography>

        <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputText
            id="username"
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
            value={''}
          />
          <InputText
            id="correo"
            label="Correo electrónico"
            placeholder="Ingresa tu Correo electrónico"
            value={''}
          />
          <InputText
            id="telefono"
            label="Teléfono"
            placeholder="Ingresa tu Teléfono"
            value={''}
          />

          <TextareaAutosize

            minRows={5}
            placeholder="Mensaje"
            style={{ width: '100%' }}
          />

          <Button
            fullWidth
            sxProps={{
              py: 1.5,
            }}
          >
            ENVIAR
          </Button>
        </Box>
      </Box>

      <Footer
        
        sxTypo={{ color: '#231F20', mt: 2.5, mb: 4  }}
        text="Derechos Reservados © AG COLLEGE; <br />
          Manuel Romero 96-A, Colonia Chapultepec C.P. 80040, Culiacán, Sinaloa, México; todo el material, imágenes y textos incluidos en esta página web, son propiedad de AG COLLEGE, y se encuentran protegidos por la legislación internacional y mexicana en materia de derechos de autor. Ninguna parte de esta página web podrá ser citada, copiada ni reproducida, en forma o medio alguno, sin el previo consentimiento por escrito de AG COLLEGE.
        "
      />
    </Container>
  );
};

export default AyudaLogin;