import React from "react";
import { Box, Typography, TextField, IconButton, Toolbar, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from '../../atoms/Button/Button';
import Logo from '../../../assets/logo_ag.svg';
import Verificacion from '../../../assets/verificacion_contra.svg';
import { useNotification } from "../../../providers/NotificationProvider";
import { useMutation } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { loadConfig } from "../../../config/configStorage";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { LeftCircle } from "../../../assets/icons";
import { resetPasswordschema, usernameSchema, type ResetPasswordschemaFormData, type UsernameFormData } from "../../../schemas/resetPasswordSchema";
import { forgotPassword, resetPassword } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";
interface RestablecerUsuarioProps {
    onNext: () => void;
}
interface IngresarCodigoProps {
    onNext: () => void;
}

export const MobileResetPass: React.FC = () => {
    const [userName, setUserName] = React.useState('');
    const { showNotification } = useNotification();
    const [config, setConfig] = React.useState<any>(null);
    const [step, setStep] = React.useState<"restablecer" | "codigo" | "actualizada">("restablecer");
    const [verRegresar, setVerRegresar] = React.useState(true);
    const [validarRecarga, setValidarRecarga] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    React.useEffect(() => {

        if (validarRecarga) {
            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                event.preventDefault();
                event.returnValue = '';
            };

            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }

    }, [validarRecarga]);

    const handleBack = () => {
        window.history.back();
    }

    const ToolbarBackTo = () => (
        <Toolbar sx={{ position: 'relative', width: '100%', paddingLeft: '0px !important' }}>
            <IconButton onClick={handleBack}>
                <DsSvgIcon component={LeftCircle} color='primary' />
            </IconButton>
            <Typography component="h4" variant="h4" sx={{ ml: '2px' }} color="textPrimary">
                Regresar
            </Typography>
        </Toolbar>
    );

    const RestablecerUsuario: React.FC<RestablecerUsuarioProps> = ({ onNext }) => {
        const [loading, setLoading] = React.useState(false);

        const {
            control,
            handleSubmit,
            formState: { errors, isValid },
        } = useForm<UsernameFormData>({
            resolver: zodResolver(usernameSchema),
            defaultValues: {
                username: "",
            },
            mode: "onChange",
        });

        const onSubmit = async (data: UsernameFormData) => {
            const usuario = data.username;

            if (usuario.length < 8) {
                showNotification("El código debe tener al menos 8 digitos", "warning");
                return;
            }
            setUserName(usuario)
            setLoading(true);
            createMutation.mutate(usuario);

        };

        const createMutation = useMutation({
            mutationFn: forgotPassword,
            onSuccess: async () => {
                setValidarRecarga(true)
                setLoading(false);
                onNext();
            },
            onError: (error) => {

                showNotification(`Error al registrar: ${error.message}`, "error");
            },
            onSettled: () => {
                console.log('La mutación ha finalizado');
            }
        });

        return (
            <>
                <Typography
                    color="primary.main"
                    component="h2"
                    variant="h2"
                    sx={{ textAlign: "center" }}
                >
                    Reestablece tu contraseña
                </Typography>

                <Typography
                    color="text.main"
                    component="p"
                    variant="body2"
                    sx={{ textAlign: "center" }}
                >
                    Para restablecer tu contraseña, introduce el nombre de usuario que
                    utilizaste al crear tu cuenta. Te enviaremos un enlace para que puedas
                    recuperar el acceso.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        mt: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="username"
                                label="Escribe tu nombre de usuario"
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                autoComplete="off"
                                type="text"
                            />
                        )}
                    />

                    <Button
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        isLoading={loading}
                        disabled={!isValid}
                    >
                        Enviar Codigo
                    </Button>

                    <Typography
                        color="text.main"
                        component="p"
                        variant="body2"
                        sx={{ textAlign: "center" }}
                    >
                        Si necesitas ayuda contacta con nuestro equipo de soporte
                    </Typography>
                </Box>
            </>
        );
    };

    const IngresarCodigo: React.FC<IngresarCodigoProps> = ({ onNext }) => {
        const [loading, setLoading] = React.useState(false);
        setVerRegresar(false)

        const { control, handleSubmit, formState: { errors, isValid } } = useForm<ResetPasswordschemaFormData>({
            resolver: zodResolver(resetPasswordschema),
            defaultValues: {
                username: userName
            },
        });

        const onSubmit = async (data: ResetPasswordschemaFormData) => {
            const password = data.new_password;
            const usuario = data.username;
            const codigo = data.codigo;
            console.log("🚀 ~ onSubmit ~ password:", password)
            console.log("🚀 ~ onSubmit ~ usuario:", usuario)
            console.log("🚀 ~ onSubmit ~ codigo:", codigo)

            if (codigo.length < 6) {
                showNotification("El código debe tener al menos 6 digitos", "warning");
                return;
            }

            if (password.length < 6) {
                showNotification("La contraseña debe tener al menos 6 caracteres", "warning");
                return;
            }

            if (!/[A-Z]/.test(password)) {
                showNotification("La contraseña debe contener al menos una letra mayúscula", "warning");
                return;
            }

            if (!/[a-z]/.test(password)) {
                showNotification("La contraseña debe contener al menos una letra minúscula", "warning");
                return;
            }

            if (!/\d/.test(password)) {
                showNotification("La contraseña debe contener al menos un número", "warning");
                return;
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                showNotification("La contraseña debe contener al menos un carácter especial", "warning");
                return;
            }

            if (data.new_password !== data.confirm_password) {
                showNotification("La nueva contraseña y la confirmación deben ser iguales", "warning");
                return;
            }

            setLoading(true);

            createMutation.mutate({ username: usuario, code: codigo, newPassword: password });
        };

        const createMutation = useMutation({
            mutationFn: resetPassword,
            onSuccess: async () => {
                setLoading(false);
                setValidarRecarga(true)
                onNext();
            },
            onError: (error) => {
                showNotification(`Error al registrar: ${error.message}`, "error");
                setLoading(false);
            },
            onSettled: () => {
                console.log('La mutación ha finalizado');
            }
        });

        return (
            <>
                <Typography
                    color="primary.main"
                    component="h2"
                    variant="h2"
                    sx={{ textAlign: "center" }}
                >
                    Te hemos enviado un email con un código
                </Typography>

                <Typography
                    color="text.main"
                    component="p"
                    variant="body2"
                    sx={{ textAlign: "center" }}
                >
                    Si no encuentras el mensaje en tu bandeja principal, revisa las bandejas
                    de spam y promociones.
                </Typography>

                <Box
                    component="form"
                    sx={{
                        mt: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <Controller
                        name="codigo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="codigo_verificacion"
                                label="Código de verificación"
                                fullWidth
                                error={!!errors.codigo}
                                helperText={errors.codigo?.message}
                                autoComplete="off"
                                type="text"
                            />
                        )}
                    />

                    <Controller
                        name="new_password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="new-password"
                                label="Ejemplo: UnaClaveSegura456!"
                                fullWidth
                                error={!!errors.new_password}
                                helperText={errors.new_password?.message}
                                autoComplete="new-password"
                                type="password"
                            />
                        )}
                    />
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="confirm-password"
                                label="Confirmar Contraseña"
                                fullWidth
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                                autoComplete="new-password"
                                type="password"
                            />
                        )}
                    />
                    <Button
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        isLoading={loading}
                        disabled={!isValid}
                    >
                        Restablecer Contraseña
                    </Button>

                    <Typography
                        color="text.main"
                        component="p"
                        variant="body2"
                        sx={{ textAlign: "center" }}
                    >
                        Si necesitas ayuda contacta con nuestro equipo de soporte
                    </Typography>
                </Box>
            </>
        );
    };

    const ContraActualizada = () => {

        const handleLogin = () => {
            navigate(AppRoutingPaths.HOME);
        };

        return (
            <>

                <Box
                    component="img"
                    src={Verificacion}
                    alt="Logo"
                />

                <Typography
                    color='primary.main'
                    component="h2"
                    variant='h2'
                    sx={{ textAlign: 'center' }}
                >
                    Contraseña actualizada
                </Typography>

                <Typography
                    color='text.main'
                    component="p"
                    variant='body2'
                    sx={{ textAlign: 'center' }}
                >
                    Tu contraseña se ha cambiado exitosamente. Ahora puedes acceder de forma segura con tus nuevas credenciales.
                </Typography>

                <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <Button
                        fullWidth
                        onClick={handleLogin}
                        sxProps={{
                            mb: '30px',
                            py: 1.5,
                        }}

                    >
                        Iniciar Sesión
                    </Button>

                    <Typography
                        color='text.main'
                        component="p"
                        variant='body2'
                        sx={{ textAlign: 'center' }}
                    >
                        Si necesitas ayudacontacta con nuestro equipo de soporte
                    </Typography>
                </Box>
            </>

        )
    }

    let content: React.ReactNode;

    switch (step) {
        case "restablecer":
            content = <RestablecerUsuario onNext={() => setStep("codigo")} />;
            break;
        case "codigo":
            content = <IngresarCodigo onNext={() => setStep("actualizada")} />;
            break;
        case "actualizada":
            content = <ContraActualizada />;
            break;
        default:
            content = null;
    }

    return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

            {verRegresar && <ToolbarBackTo />}

            <Box sx={{ width: '250px', height: '200px' }}>
                <Box
                    component="img"
                    src={config?.data.logo_url || Logo}
                    alt="AG College Logo"
                    sx={{
                        mt: 2,
                        width: '100%',
                        height: '170px'
                    }}
                />
            </Box>

            {content}

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href={config?.data.url_pdf} target="_blank">Ver aviso de privacidad</Link>
            </Box>
        </Box>
    );

};
