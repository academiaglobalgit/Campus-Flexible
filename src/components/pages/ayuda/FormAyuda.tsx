import { Box, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";
import Button from "../../atoms/Button/Button";
import Logo from '../../../assets/logo_ag.svg';

const FormAyuda: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box
            sx={{
                marginTop: 13,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: '20px'
            }}
        >
            <LogoBox
                src={Logo}
                alt="AG College Logo"
                sx={{
                    width: '212px'
                }}
            />
            <Typography
                color='primary.main'
                component="h4"
                variant='h4'
                sx={{
                    mt: '20px',
                    mb: '12px',
                    textAlign: isMobile ? 'center' : 'left',
                    textWrap: 'balance'
                }}
                >
                Déjanos tu mensaje y nos contactaremos a la brevedad posible.
            </Typography>
            <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <TextField
                    id="username"
                    label="Nombre completo"
                    placeholder="Ingresa tu nombre completo"
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
            </Box>
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
    );
};

export default FormAyuda;