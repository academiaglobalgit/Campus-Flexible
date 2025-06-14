import { Box, Container,  TextField, Typography } from "@mui/material";
// InputAdornment,
import { LogoBox } from '../../atoms/logo/LogoBox';
import { Footer } from '../../atoms/Footer/Footer';
import Button from '../../atoms/Button/Button';
import Logo from '../../../assets/logo_ag.svg';
import { TopBar } from "../../molecules/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, TitleScreen } from "@constants";
// import { AccountCircle } from "@mui/icons-material";

const AyudaLogin: React.FC = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(AppRoutingPaths.HOME);
  return (
    // maxWidth={isMobile ? 'xs' : 'lg'}

    <Container maxWidth='xs'>
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
          <TextField
            id="username"
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
            // slotProps={{
            //   input: {
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <AccountCircle />
            //       </InputAdornment>
            //     ),
            //   },
            // }}
          />
          <TextField
            id="correo"
            label="Correo electrónico"
            placeholder="Ingresa tu Correo electrónico"
          />
          <TextField
            id="telefono"
            label="Teléfono"
            placeholder="Ingresa tu Teléfono"
          />

          <TextField
            placeholder="Mensaje"
            label="Mensaje"
            multiline
            rows={5}
          />

          <Button
            fullWidth
            sxProps={{
              py: 1.5,
            }}
            onClick={() => {}}
          >
            ENVIAR
          </Button>
        </Box>
      </Box>

      <Footer />
    </Container>
  );
};

export default AyudaLogin;