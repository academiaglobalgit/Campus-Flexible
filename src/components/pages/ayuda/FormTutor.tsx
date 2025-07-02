import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../atoms/Button/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ayudaTutorSchema, type AyudaTutorFormData } from "../../../schemas/ayudaTutorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useCreateAyuda } from "../../../services/AyudaService";

export const FormTutor: React.FC = () => {
    const [loading, _setLoading] = React.useState(false);
    const materias = [{ id: 0, label: 'Seleccionar' }, { id: 1, label: 'matemáticas' }];
    const tutores = [{ id: 0, label: 'Seleccionar' },{ id: 10, label: 'Juan Pérez' }];
    
    const { control, register, handleSubmit, formState: { errors } } = useForm<AyudaTutorFormData>({
            resolver: zodResolver(ayudaTutorSchema(materias.map((m) => m.id), tutores.map((t) => t.id))),
            defaultValues: {
                materia: 0,
                tutor: 0,
                message: '',
            },
    });

    const onSubmit = async (data: AyudaTutorFormData) => {
        console.log(data);
        // setLoading(true);
        // createMutation.mutate({...data, id_plan_estudios: "1"});
    };

    // const createMutation = useMutation({
    //     mutationFn: useCreateAyuda,
    //     onSuccess: () => {            

    //         // Resetear el formulario
    //         reset();
    //         setLoading(false);
    //     },
    //     onError: (error) => {
    //         alert(`Error al registrar: ${error.message}`);
    //     },
    //     onSettled: () => {
    //         console.log('La mutación ha finalizado');
    //     }
    // });

    return(
        <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pb: '20px' }}>
                <Controller
                    name="materia"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.materia}>
                        <InputLabel id="materia-label">Materia</InputLabel>
                        <Select
                            labelId="materia-label"
                            label="Materia"
                            {...field}
                        >
                            {materias.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="tutor"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.tutor}>
                        <InputLabel id="tutor-label">Tutor</InputLabel>
                        <Select
                            labelId="tutor-label"
                            label="Tutor"
                            {...field}
                        >
                            {tutores.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    )}
                />
            </Box>
            <TextField
                id="email"
                label="Correo del alumno"
                placeholder="Ingresa tu Correo electrónico"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{pb:'4px'}}
            />
            <TextField
                placeholder="Mensaje"
                label="Mensaje"
                multiline
                rows={5}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={{pb:'4px'}}
            />
            <Button
                fullWidth
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
            >
                ENVIAR
            </Button>
        </Box>
    );
}
