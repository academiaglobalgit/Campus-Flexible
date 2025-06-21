import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { MobileLogin, type AccessLogin } from "./MobileLogin";

import Home from "../../../assets/home.png";

const DesktopLogin: React.FC<AccessLogin> = ({ accessLogin }) => {
  const theme = useTheme();
  const showImage = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return(
    <Grid container sx={{ height: '100vh' }}>
      {/* Lado izquierdo: formulario */}
      <Grid
        size={{ xs:12, md:5 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',          
          backgroundColor: '#ffffff',
        }}
      >
        <MobileLogin accessLogin={accessLogin} />
      </Grid>

      {/* Lado derecho: imagen */}
      {
        !showImage && <Grid size={{ md:7 }} sx={{ position: 'relative' }}>
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
  );
}
export default DesktopLogin;