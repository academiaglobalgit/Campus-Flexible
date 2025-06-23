import { Box, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";
import Button from "../../atoms/Button/Button";
import Logo from '../../../assets/logo_ag.svg';
import { useForm } from "react-hook-form";
import { ayudaSchema, type AyudaFormData } from "../../../schemas/ayudaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCreateAyuda } from "../../../services/AyudaService";
import React from "react";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";

const FormAyuda: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AyudaFormData>({
        resolver: zodResolver(ayudaSchema),
    });

    const onSubmit = async (data: AyudaFormData) => {
        setLoading(true);
        createMutation.mutate({...data, id_plan_estudios: "1"});
    };

    const createMutation = useMutation({
        mutationFn: useCreateAyuda,
        onSuccess: () => {            

            // Resetear el formulario
            reset();
            setLoading(false);
        },
        onError: (error) => {
            alert(`Error al registrar: ${error.message}`);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

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
                    id="nombre"
                    label="Nombre completo"
                    placeholder="Ingresa tu nombre completo"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    id="email"
                    label="Correo electrónico"
                    placeholder="Ingresa tu Correo electrónico"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                
                <TextField
                    id="telefono"
                    label="Teléfono"
                    placeholder="Ingresa tu Teléfono"
                    slotProps={{
                      input: {
                        inputComponent: TextMaskCustom as any,
                      },
                    }}
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />

                <TextField
                    placeholder="Mensaje"
                    label="Mensaje"
                    multiline
                    rows={5}
                    {...register("message")}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                />            
            </Box>
            <Button
                fullWidth
                sxProps={{
                    py: 1.5,
                }}
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
            >
                ENVIAR
            </Button>
        </Box>
    );
};

export default FormAyuda;