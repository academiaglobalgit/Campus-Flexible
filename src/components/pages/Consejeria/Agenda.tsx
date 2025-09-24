import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import { agendaCitaSchema, type AgendaCitaFormData } from '../../../schemas/agendaCitaSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../atoms/Button/Button';
import { useCreateCita, useGetMotivos } from '../../../services/ConsejeriaEstudiantilService';
import { useAuth } from '../../../hooks';
import { formatWithIMask } from '../../../utils/Helpers';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../../providers/NotificationProvider';
import { flexRows } from '@styles';

export const AgendaConsejeria: React.FC = () => {
    const theme = useTheme();
    const {user} = useAuth();
    const {showNotification} = useNotification();
    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = React.useState(false);
    const {data: motivos} = useGetMotivos();
    
    
    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<AgendaCitaFormData>({
            resolver: zodResolver(
                agendaCitaSchema(
                    (motivos?.map((m) => m.id_motivo)) ?? [0],
                )
            ),
            defaultValues: {            
                matricula: user?.perfil?.matricula ?? '',
                nombre: user?.name ?? '',
                telefono: user?.phone ? formatWithIMask(`${user?.phone}`,'phone') : '',
                id_tema: 0,
                mensaje: '',
            },
    });

    const onSubmit = async (data: AgendaCitaFormData) => {
        setLoading(true);
        createMutation.mutate({id_motivo: data.id_tema, mensaje: data.mensaje});
    };

    const createMutation = useMutation({
        mutationFn: useCreateCita,
        onSuccess: () => {            
            showNotification(`Cita agendada satisfactoriamente`,"success");
            // Resetear el formulario
            reset();
            setLoading(false);
        },
        onError: (error) => {
            showNotification(`Error al registrar: ${error.message}`, 'error');
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    const ButtonSection = () => {
        const limpiar = (<Button fullWidth onClick={reset} variant='outlined'>Limpiar</Button>);
        const guardar = (<Button fullWidth onClick={handleSubmit(onSubmit)} isLoading={loading} disabled={!isValid}>Enviar</Button>);
        return(
            isMobile
            ?
                <Box sx={{...flexRows, width: '100%', gap: '20px' }}>
                    {limpiar}
                    {guardar}
                </Box>
            :
                <Box sx={{...flexRows, justifyContent: 'flex-end', width: '100%', gap: '20px' }}>
                    <Box sx={[{width: '283px'}]}>
                        {limpiar}
                    </Box>
                    <Box sx={{width: '283px'}}>
                        {guardar}
                    </Box>
                </Box>
        )
    }

    return (
        <>
            <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pb: '20px' }}>
                    <Controller
                        name="matricula"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="matricula"
                                label="Matricula"
                                fullWidth
                                disabled
                                sx={{mb:0}}
                            />
                        )}
                    />
                    <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="nombre"
                                label="Nombre completo"
                                fullWidth
                                disabled
                                sx={{mb:0}}
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
                                fullWidth
                                disabled
                                sx={{mb:0}}
                            />
                        )}
                    />                    
                    <Controller
                        name="id_tema"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.id_tema}>
                                <InputLabel id="asunto-label">¿En que podemos ayudarte?</InputLabel>
                                <Select
                                    labelId="asunto-label"
                                    label="¿En que podemos ayudarte?"
                                    {...field}
                                >
                                    {
                                        motivos && motivos.map((item) => (
                                            <MenuItem key={item.id_motivo} value={item.id_motivo}>
                                                {item.nombre_motivo}
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
                                label="Cuentanos un poco sobre la situación"
                                placeholder="Cuentanos un poco sobre la situación"
                                multiline
                                rows={5}
                                error={!!errors.mensaje}
                                helperText={errors.mensaje?.message}
                                sx={{mb:0}}
                            />
                        )}
                    />
                </Box>
                {ButtonSection()}
            </Box>
        </>
    );
};
