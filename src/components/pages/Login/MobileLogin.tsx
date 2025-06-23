import React from "react";
import { Box, Grid, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from '../../atoms/Button/Button';
import { IconLabel } from "../../molecules/IconLabel/IconLabel";
import { useAuth } from "../../../hooks";

import Logo from '../../../assets/logo_ag.svg';
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../providers/NotificationProvider";
import { loginSchema, type LoginFormData } from "../../../schemas/authSchema";
import { Footer } from "../../atoms/Footer/Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AppRoutingPaths } from "@constants";

interface AccessLoginItem {
    id: string;
    icon: any;
    label: string;
    action?: () => void;
}

export type AccessLogin = {
    accessLogin: AccessLoginItem[];
};

export const MobileLogin: React.FC<AccessLogin> = ({ accessLogin }) => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [showPassword, setShowPassword] = React.useState(false);
            
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await login(data.username, data.password);

        if (result.success) {
            navigate(AppRoutingPaths.PLAN_ESTUDIOS);
        } else {
            showNotification(result.message ?? "Ocurrió un error inesperado", "warning");
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
                        placeholder="Ingresa tu contraseña"
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
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
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

            <Footer />
        </>
    );
};
