import { useRef } from "react";
import { Box, Link, TextField, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Typography } from "../../atoms/Typography/Typography";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { accordionStyle } from "@styles";

const cursosDatas = [
    
    { titulo: "Unidad I", proceso: 80, status: "Finalizado", actividad: "", nombre: "", contenido: "" },
    { titulo: "Unidad II", proceso: 80, status: "Cursando", actividad: "", nombre: "", contenido: "" },
    { titulo: "Unidad III", proceso: 80, status: "No iniciado", actividad: "", nombre: "", contenido: "" },
    { titulo: "Unidad IV", proceso: 80, status: "No iniciado", actividad: "", nombre: "", contenido: "" },
        
];

export const Actividades: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const UploadButton = () => {
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleClick = () => {
            fileInputRef.current?.click();
        };

        return (
            <>
                <Button
                    variant="text"
                    onClick={handleClick}
                    icon={<FileUploadIcon />}
                    iconPosition={'start'}
                >
                    Subir archivo…
                </Button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={(event) => console.log(event.target.files)}
                />
            </>
        );
    };
    
    return (
        <>
            <Box sx={!isMobile ? { display: 'flex', flexDirection: 'row', gap: '18px', marginBottom: '65px' } : { display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '52px' }}>
                <Button onClick={() => { }} variant="contained" fullWidth >Instrumento de Evaluación</Button>
                <Button onClick={() => { }} variant="contained" fullWidth >Portada</Button>
                <Button onClick={() => { }} variant="contained" fullWidth >Manual de Formato APA</Button>
                <Button onClick={() => { }} variant="contained" fullWidth >Manual de Actividades Integradoras</Button>
            </Box>
            {cursosDatas.map((temas, i) => {
                return (
                    <Accordion
                        key={`Act_${i}`}
                        title={temas.titulo}
                        sxProps={accordionStyle}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <Box sx={!isMobile ? { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } : { display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <Box sx={!isMobile ? { display: 'flex', flexDirection: 'column' } : {}}>
                                    <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}>
                                        {temas.actividad}
                                    </Typography>
                                    <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                        {temas.nombre}
                                    </Typography>
                                </Box>

                                <StatusIcon estado={temas.status} />
                            </Box>

                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                Descripción de tu actividad
                            </Typography>

                            <Typography component="p" variant="body2" sxProps={{ color: theme.palette.text.primary }}>
                                {temas.contenido}
                            </Typography>
                            <Typography component="p" variant="body2" sxProps={{ color: theme.palette.text.primary }}>
                                Antes de elaborar tu producto, es necesario que consultes los siguientes archivos:
                            </Typography>

                            <Link href="http://agcollege.edu.mx/literaturas/18/6/Actividad_2_Sistemas_Operativos_I_V4.docx.pdf" target="_blank" rel="noopener" sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%', // o el ancho deseado
                            }}>
                                http://agcollege.edu.mx/literaturas/18/6/Actividad_2_Sistemas_Operativos_I_V4.docx.pdf
                            </Link>

                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                Entrega de actividad
                            </Typography>

                            <Box sx={{ gap: '8px' }}>
                                <TextField
                                    placeholder="Text"
                                    label="Comentario"
                                    multiline
                                    rows={5}
                                />

                                <Typography component="p" variant="body1" sxProps={{ color: theme.palette.grey[200], fontFamily: theme.typography.fontFamily, textAlign: 'right' }}>
                                    0/200
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                                <Typography component="p" variant="body1" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                    Sube tu archivo aquí
                                </Typography>

                                <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, marginLeft: '5px' }}>(pdf. xml. word, ppt)
                                </Typography>
                            </Box>

                            {UploadButton()}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => { }}
                            >
                                Finalizar Actividad
                            </Button>

                        </Box>
                    </Accordion>
                );
            })}
        </>
    );
};