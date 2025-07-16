import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme, type SelectChangeEvent } from "@mui/material";
import Button from '../../atoms/Button/Button';


const ConsejeriaAgendaCita: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


                            <TextField id="outlined-basic" label="Número de empleado" variant="outlined" />
                            <TextField id="outlined-basic" label="Nombre completo" variant="outlined" />
                            <TextField id="outlined-basic" label="Plan de estudios" variant="outlined" />

                            <FormControl fullWidth>
                                <InputLabel id="motivo-label">Age</InputLabel>
                                <Select
                                    labelId="motivo-label"
                                    id="demo-simple-select"
                                    label="Selecciona una opción"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Motivos personales que afectan mis estudios</MenuItem>
                                    <MenuItem value={2}>Equilibrar mis tiempos (trabajo-estudio)</MenuItem>
                                    <MenuItem value={3}>Manejar el estrés</MenuItem>
                                    <MenuItem value={4}>Mejorar mis hábitos y estrategias de estudio</MenuItem>
                                    <MenuItem value={5}>Establecer metas, plan de vida</MenuItem>
                                    <MenuItem value={6}>Otros (espacio de captura para comentarios)</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => { }}
                            >
                                Capturar nuevo Número
                            </Button>

                            <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}>
                                ¿En qué horario podemos contactarte?
                            </Typography>

                            <FormControl fullWidth>
                                <InputLabel id="motivo-label">Age</InputLabel>
                                <Select
                                    value={age}
                                    labelId="motivo-label"
                                    id="demo-simple-select"
                                    label="Selecciona una opción"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Selecciona una opción</MenuItem>
                                    <MenuItem value={1}>De 9 a.m a 12 p.m (Centro de México)</MenuItem>
                                    <MenuItem value={2}>De 1 p.m a 3 p.m  (Centro de México)</MenuItem>
                                    <MenuItem value={3}>De 4 p.m a 6 p.m  (Centro de México)</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                                OPCIONAL: Cuéntanos un poco sobre la situación
                            </Typography>
                            <TextField
                                placeholder="Text"
                                label="Cuéntanos un poco sobre la situación"
                                multiline
                                rows={5}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: '10PX' }}>
                                <Button

                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    Enviar
                                </Button>  <Button

                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    limpiar
                                </Button>
                            </Box>
                        </Box>


                    </>
                    :
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                        <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                            Esta Sala de Conversación es un espacio que ponemos a disposición de todas y todos nuestros estudiantes, con el propósito de que entables diálogos productivos, generen redes de contactos y amigos, compartan información, experiencias y aporten ideas que enriquezcan sus conocimientos.
                        </Typography>
                    </>
            }
        </>

    );
};

export default ConsejeriaAgendaCita;