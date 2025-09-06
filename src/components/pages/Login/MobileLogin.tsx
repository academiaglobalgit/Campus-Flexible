import React, { useState } from "react";
import { Box, Grid, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
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
import { ChangePasswordDialog } from "../../molecules/Dialogs/ChangePasswordDialog/ChangePasswordDialog";
import { loadConfig } from "../../../config/configStorage";

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
    const [captchaValido, setCaptchaValido] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [config, setConfig] = React.useState<any>(null);

    const CAPTCHA = import.meta.env.VITE_APP_CAPTCHA;

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    const onSubmit = async (data: LoginFormData) => {

        if (!captchaValido) {
            showNotification("Por favor completa el CAPTCHA", "warning");
            return;
        }

        setUserName(data.username);
        const result = await login(data.username, data.password);
        // enviar formulario
        if (result.success) {
            if (result.aceptoTerminos)
                goToPage();
            else
                navigate(AppRoutingPaths.TERMINOS_CONDICIONES);
        } else {
            if (result.cambiarPassword) {
                setShowChangePassword(true);
            } else {
                showNotification(result.message ?? "Ocurrió un error inesperado", "warning");
            }
        }
    };

    const goToPage = () => {
        switch(config?.data?.id_plan_estudio) {
            case 17: 
                navigate(AppRoutingPaths.CURSOS_ACTIVOS);
            break;
            default:
                navigate(AppRoutingPaths.PLAN_ESTUDIOS);
            break;
        }
    }

    const onCaptchaChange = () => {
        setCaptchaValido(true);
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
                    src={config?.data.logo_url || Logo}
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
                    variant="body3"
                    sx={{
                        mt: '14px',
                        textAlign: 'center',
                        fontSize: '20px'
                    }}
                >
                    {config?.data.nombre_plan || ''}
                </Typography>
                <Typography

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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <ReCAPTCHA
                            sitekey={CAPTCHA}
                            onChange={onCaptchaChange}
                        />
                    </Box>
                    <Button
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        sxProps={{
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
                                <Grid size={{ xs: 6, sm: 6 }} key={access.id}>
                                    <IconLabel icon={access.icon} label={access.label} key={access.id} action={access.action} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>

            <Footer />
            <ChangePasswordDialog isOpen={showChangePassword} userName={userName} />
        </>
    );
};
