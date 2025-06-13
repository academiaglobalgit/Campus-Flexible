import React from "react";
import { Box, Grid, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from '../../atoms/Button/Button';
import { IconLabel } from "../../molecules/IconLabel/IconLabel";
import { useAuth } from "../../../hooks";

import Logo from '../../../assets/logo_ag.svg';
import { useNavigate } from "react-router-dom";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { Eye, Hide } from "../../../assets/icons";
import { useNotification } from "../../../providers/NotificationProvider";

interface AccessLoginItem {
    id: string;
    icon: any;
    label: string;
    action?: () => void;
}

type AccessLogin = {
    accessLogin: AccessLoginItem[];
};

const loginSchema = z.object({
    username: z.string().nonempty("El usuario es requerido"),
    password: z.string().nonempty("La contraseña es requerida")
});

type LoginFormData = z.infer<typeof loginSchema>;

export const MobileLogin: React.FC<AccessLogin> = ({ accessLogin }) => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const [showPassword, setShowPassword] = React.useState(false);
            
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await login(data.username, data.password);

        if (result.success) {
            navigate('/');
        } else {
            showNotification(result.message ?? "Ocurrió un error inesperado", "warning");
            console.error(result.message);
        }
    };

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
                    <TextField
                        label="Usuario"
                        placeholder="Ingresa tu usuario"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Contraseña"
                        placeholder="Contraseña"
                        autoComplete="new-password"
                        type={showPassword ? 'text' : 'password'}
                         {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            <DsSvgIcon 
                                                component={showPassword ? Hide : Eye}
                                                color="inherit"
                                            />    
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <Button 
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        sxProps={{
                            mt: 3,
                            mb: '30px',
                            py: 1.5,
                        }}
                        isLoading={isLoading}
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
