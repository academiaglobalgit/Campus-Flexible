import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../atoms/Button/Button";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ayudaTutorSchema, type AyudaTutorFormData } from "../../../schemas/ayudaTutorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAyudaTutor, useGetMaterias, useGetTemas, useGetTutores } from "../../../services/AyudaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AYUDA_ENDPOINTS } from "../../../types/endpoints";
import { useNotification } from "../../../providers/NotificationProvider";

export const FormTutor: React.FC = () => {
    const { showNotification } = useNotification();
    const [loading, setLoading] = React.useState(false);
    const { data: asuntoData }= useGetTemas();
    const { data: materias, isLoading: isLoadingMateria } = useGetMaterias();
    const [selectedMateria, setSelectedMateria] = React.useState<number>(0);
    const queryClient = useQueryClient();

    const { data: tutores, refetch: fetchTutores, isLoading: isLoadingTutores } = useGetTutores(selectedMateria, {enabled: false});

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<AyudaTutorFormData>({
            resolver: zodResolver(
                ayudaTutorSchema(
                    (materias?.map((m) => m.id_curso)) ?? [],
                    (tutores?.map((t) => t.id_tutor)) ?? [],
                    (asuntoData?.map((m) => m.id_tema_ayuda)) ?? [0],
                )
            ),
            defaultValues: {
                id_curso: 0,
                id_profesor: 0,
                id_tema_ayuda: 0,
                mensaje: '',
            },
    });

    const onSubmit = async (data: AyudaTutorFormData) => {
        setLoading(true);
        createMutation.mutate({...data, nombre: '123'});
    };

    useEffect(() => {
        if(selectedMateria > 0) {
            fetchTutores();
        }
    },[selectedMateria, fetchTutores]);

    const createMutation = useMutation({
        mutationFn: useCreateAyudaTutor,
        onSuccess: () => {
            showNotification(`Hemos recibido tu solicitud. Nuestro equipo te responderá lo antes posible.`,"success");
            // Resetear el formulario
            reset();
            setLoading(false);
            queryClient.invalidateQueries({ queryKey: [AYUDA_ENDPOINTS.GET_AYUDA.key] });
        },
        onError: (error) => {
            alert(`Error al registrar: ${error.message}`);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    return(
        <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pb: '20px' }}>
                <Controller
                    name="id_curso"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.id_curso}>
                        <InputLabel id="materia-label">Materia</InputLabel>
                        <Select
                            disabled={isLoadingMateria}
                            labelId="materia-label"
                            label="Materia"
                            {...field}
                            onChange={(event) => {
                                const value = event.target.value;
                                field.onChange(value);
                                setSelectedMateria(value);
                            }}
                        >
                            {
                               materias && materias.map((item) => (
                                    <MenuItem key={item.id_curso} value={item.id_curso}>
                                        {item.nombre_curso}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="id_profesor"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.id_profesor}>
                        <InputLabel id="tutor-label">Tutor</InputLabel>
                        <Select
                            disabled={isLoadingTutores}
                            labelId="tutor-label"
                            label="Tutor"
                            {...field}
                        >
                            {tutores.map((item) => (
                            <MenuItem key={item.id_tutor} value={item.id_tutor}>
                                {item.nombre_tutor}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
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
                <Controller
                    name="mensaje"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Mensaje"
                            placeholder="Mensaje"
                            multiline
                            rows={5}
                            error={!!errors.mensaje}
                            helperText={errors.mensaje?.message}
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
