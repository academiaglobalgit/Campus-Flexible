import { Box, TextField } from "@mui/material";
import Button from "../../atoms/Button/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { ayudaSchema, type AyudaFormData } from "../../../schemas/ayudaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCreateAyuda } from "../../../services/AyudaService";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";
import { useNotification } from "../../../providers/NotificationProvider";

export const FormAyuda: React.FC = () => {
    const { showNotification } = useNotification();
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<AyudaFormData>({
        resolver: zodResolver(ayudaSchema),
    });

    const onSubmit = async (data: AyudaFormData) => {
        setLoading(true);
        createMutation.mutate({...data, id_plan_estudio: 1});
    };

    const createMutation = useMutation({
        mutationFn: useCreateAyuda,
        onSuccess: () => {
            showNotification(`Solicitud de Ayuda enviada satisfactorimente`,"success");
            reset();
            setLoading(false);
        },
        onError: (error) => {
            showNotification(`Error al registrar: ${error.message}`, "error");
            setLoading(false);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    return(
        <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <TextField
                id="nombre"
                label="Nombre completo"
                placeholder="Ingresa tu nombre completo"
                {...register("nombre")}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
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
                {...register("telefono")}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
            />

            <TextField
                placeholder="Mensaje"
                label="Mensaje"
                multiline
                rows={5}
                {...register("mensaje")}
                error={!!errors.mensaje}
                helperText={errors.mensaje?.message}
            />            
            <Button
                fullWidth
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
                disabled={!isValid}
            >
                ENVIAR
            </Button>
        </Box>
    );
}
