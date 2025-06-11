import { Box, Grid, Typography } from "@mui/material";

import Button from '../../atoms/Button/Button';
import { InputText } from '../../atoms/Input/Input';
import { IconLabel } from "../../molecules/IconLabel/IconLabel";
import { useAuth } from "../../../hooks";

import Logo from '../../../assets/logo_ag.svg';
import { InputPassword } from "../../molecules/InputPassword/InputPassword";
import { useNavigate } from "react-router-dom";

interface AccessLoginItem {
    id: string;
    icon: any;
    label: string;
    action?: () => void;
}

type AccessLogin = {
    accessLogin: AccessLoginItem[];
}

export const MobileLogin: React.FC<AccessLogin> = ({ accessLogin }) => {
    const { email, setEmail, password, setPassword, login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async() => {
        const result = await login();
        
        if(result.success) {            
            navigate('/');
        }else{
            console.error(result.message);
        }
    };

    // const handleOpenDialog = () => {
    //     console.log('Open FAQs dialog');
    //     // setIsOpen(true); // Uncomment if you have a dialog to open
    // };

    return (
        <>
            <Box
                sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Box 
                    component="img"
                    src={Logo} 
                    alt="AG College Logo"
                    sx={{
                        mt: 4,
                        mb: '49px'
                    }}
                />

                <Typography 
                    color='primary.main'
                    component="h4"
                    variant='h4'
                >
                BIENVENIDO/A
                </Typography>

                <Typography
                    color='primary.main' 
                    component="p"
                    variant="body2"
                    sx={{
                        mt: '8px',
                        mb: '6px',
                        textAlign: 'center',
                    }}
                >
                Para iniciar sesión,<br />ingresa tu usuario y contraseña
                </Typography>
                
                <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <InputText 
                        id="username"
                        label="Usuario"
                        placeholder="Ingresa tu usuario"
                        onChange={(value) => setEmail(value)}
                        value={email}
                    />
                    <InputPassword 
                        id="password"
                        label="Contraseña"
                        placeholder="Ingresa tu Contraseña"
                        onChange={(value) => setPassword(value)}
                        value={password}
                    />
                    
                    <Button 
                        fullWidth
                        onClick={handleSubmit}
                        sxProps={{
                        mt: 3,
                        mb: '30px',
                        py: 1.5,
                        }}
                    >
                        INGRESAR
                    </Button>
                    <Grid container spacing={2}>
                        {
                        accessLogin.map((access) => (
                            <Grid size={{xs:6, sm:6}} key={access.id}>
                            <IconLabel icon={access.icon} label={access.label} key={access.id} action={access.action} />
                            </Grid>
                        ))
                        }
                    </Grid>
                </Box>
            </Box>
            
            <Box sx={{ mt: 2.5, mb: 4 }}>
                <Typography variant="body1" sx={{ color: '#231F20'}}>
                Derechos Reservados © AG COLLEGE;<br />
                Manuel Romero 96-A, Colonia Chapultepec C.P. 80040, Culiacán, Sinaloa, México; todo el material, imágenes y textos incluidos en esta página web, son propiedad de AG COLLEGE, y se encuentran protegidos por la legislación internacional y mexicana en materia de derechos de autor. Ninguna parte de esta página web podrá ser citada, copiada ni reproducida, en forma o medio alguno, sin el previo consentimiento por escrito de AG COLLEGE.
                </Typography>
            </Box>
        </>
    );
};