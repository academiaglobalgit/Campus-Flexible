import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../atoms/Button/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ayudaSchema, type AyudaFormData } from "../../../schemas/ayudaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateAyuda, useCreateAyudaAlumnos, useGetTemas } from "../../../services/AyudaService";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";
import { useNotification } from "../../../providers/NotificationProvider";
import { AYUDA_ENDPOINTS } from "../../../types/endpoints";

type FormAyudaProps = {
    isLogin?: boolean;
}

export const FormAyuda: React.FC<FormAyudaProps> = ({isLogin = true}) => {
    const { showNotification } = useNotification();
    const [loading, setLoading] = React.useState(false);
    const { data: asuntoData, isLoading }= useGetTemas();
    const queryClient = useQueryClient();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<AyudaFormData>({
        resolver: zodResolver(
            ayudaSchema(
                (asuntoData?.map((m) => m.id_tema_ayuda)) ?? [0],
                isLogin
            )
        ),
        defaultValues: {
            id_tema_ayuda: 0,
            correo: '',
            nombre: '',
            telefono: '',
            mensaje: '',
        },
    });

    const onSubmit = async (data: AyudaFormData) => {
        setLoading(true);
        if(isLogin){
            createMutationLogin.mutate({...data, id_plan_estudio: 1});
        }else{
            createMutationAlumnos.mutate({...data, id_plan_estudio: 1});
        }
    };

    const createMutationLogin = useMutation({
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

    const createMutationAlumnos = useMutation({
        mutationFn: useCreateAyudaAlumnos,
        onSuccess: () => {
            showNotification(`Solicitud de Ayuda enviada satisfactorimente`,"success");
            reset();
            setLoading(false);
            queryClient.invalidateQueries({ queryKey: [AYUDA_ENDPOINTS.GET_AYUDA.key] });
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
            <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="nombre"
                        label="Nombre completo"
                        placeholder="Ingresa tu nombre completo"
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                        fullWidth
                        sx={[!isLogin && { display: 'none'}]}
                    />
                )}
            />

            <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="email"
                        label="Correo electrónico"
                        placeholder="Ingresa tu Correo electrónico"
                        error={!!errors.correo}
                        helperText={errors.correo?.message}
                        fullWidth
                        sx={[!isLogin && { display: 'none'}]}
                    />
                )}
            />

            <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="telefono"
                        label="Teléfono"
                        placeholder="Ingresa tu Teléfono"
                        slotProps={{
                            input: {
                            inputComponent: TextMaskCustom as any,
                            },
                        }}
                        error={!!errors.telefono}
                        helperText={errors.telefono?.message}
                        fullWidth
                        sx={[!isLogin && { display: 'none'}]}
                    />
                )}
            />

            <Controller
                name="id_tema_ayuda"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.id_tema_ayuda}>
                        <InputLabel id="asunto-label">Asunto</InputLabel>
                        <Select
                            labelId="asunto-label"
                            label="Asunto"
                            {...field}
                            disabled={isLoading}
                        >
                            {
                                asuntoData && asuntoData.map((item) => (
                                    <MenuItem key={item.id_tema_ayuda} value={item.id_tema_ayuda}>
                                        {item.nombre_tema}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )}
            />

            <Box sx={{pt: 2}}>
                <Controller
                    name="mensaje"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Mensaje"
                            label="Mensaje"
                            multiline
                            rows={isLogin ? 5 : 10}
                            error={!!errors.mensaje}
                            helperText={errors.mensaje?.message}
                            fullWidth
                        />
                    )}
                />
            </Box>
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
