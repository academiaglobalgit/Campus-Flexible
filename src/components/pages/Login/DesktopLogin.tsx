import { Box, Typography, Button } from "@mui/material";
// import { InputText } from "../../atoms/Input/Input";

import Logo from '../../../assets/logo_ag.svg';

const DesktopLogin: React.FC = () => {
  return(<><Box sx={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: 8,
    minHeight: '80vh'
  }}>
    {/* Sección izquierda (Branding) */}
    <Box sx={{ textAlign: 'center' }}>
      <img src={Logo} alt="AG College" style={{ width: '60%', maxWidth: 300 }} />
      <Typography variant="h3" sx={{ mt: 4, color: 'primary.main' }}>
        Plataforma Educativa
      </Typography>
    </Box>

    {/* Sección derecha (Formulario) */}
    <Box sx={{ 
      bgcolor: 'background.paper', 
      p: 6, 
      borderRadius: 4,
      boxShadow: 3
    }}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      
      <Box component="form" sx={{ mt: 4 }}>
        {/* <InputText 
          label="Usuario" 
          fullWidth 
        />
        
        <InputText 
          label="Contraseña" 
          type="password"
          fullWidth
        /> */}
        
        <Button 
          fullWidth 
          size="large" 
          sx={{ mt: 4, py: 1.5 }}
        >
          INGRESAR
        </Button>
      </Box>
    </Box>
  </Box>
  </>);
}
export default DesktopLogin;