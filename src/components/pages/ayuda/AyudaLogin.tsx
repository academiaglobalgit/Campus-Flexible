import { Box, Container,  Grid, useMediaQuery, useTheme } from "@mui/material";
import { Footer } from '../../atoms/Footer/Footer';
import { TopBar } from "../../molecules/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, TitleScreen } from "@constants";
import FormAyuda from "./FormAyuda";

import Home from "../../../assets/ayuda_ext.png";

const AyudaLogin: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const onBack = () => navigate(AppRoutingPaths.LOGIN);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Container component="main" maxWidth={isMobile ? 'xs' : 'lg'}>
      <TopBar isExternal={true} onBack={onBack} titleScreen={isMobile ? TitleScreen.AYUDA : TitleScreen.BACK_HOME_EXT} />
      {
        isMobile
        ?
          <>
            <FormAyuda />
            <Footer />
          </>
        :
        <Grid container sx={{ height: '100vh', width: '100%' }} spacing={2}>
          <Grid
            size={{ xs:false, md:5 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',          
              backgroundColor: 'white',
            }}
          >
            <Box>
              <FormAyuda />
              <Footer />
            </Box>
          </Grid>
          {
            !showImage &&
              <Grid
                size={{ xs:false, md:7 }}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
            >
              <Box
                  component="img"
                  src={Home}
                  sx={{
                    height: '760px'
                  }}
              />
            </Grid>
          }
        </Grid>
      }
      
    </Container>
  );
};

export default AyudaLogin;